import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import {
  hashPassword,
  verifyPassword,
  needsPasswordUpgrade,
} from "../backend/password";
import { readMaskedPassword } from "./terminal-password";

const remote = process.argv.includes("--remote");
const environment = process.argv
  .find((arg) => arg.startsWith("--env="))
  ?.split("=")[1];
if (remote && !["preview", "production"].includes(environment ?? ""))
  throw new Error(
    "Remote migration requires --env=preview or --env=production",
  );
if (!stdin.isTTY)
  throw new Error("Run interactively; do not pass passwords as arguments.");
const input = createInterface({ input: stdin, output: stdout });
const username = (await input.question("Username to migrate: "))
  .trim()
  .toLowerCase();
input.close();
if (!/^[a-z0-9_]{3,32}$/.test(username)) throw new Error("Invalid username");
const quote = (value: string) => "'" + value.replaceAll("'", "''") + "'";
await mkdir(".backend-build", { recursive: true });
async function query(
  sql: string,
): Promise<
  { results: Record<string, unknown>[]; meta?: { changes?: number } }[]
> {
  const id = crypto.randomUUID(),
    file = `.backend-build/migrate-password-${id}.sql`,
    log = resolve(`.backend-build/migrate-password-${id}.log`);
  try {
    await writeFile(file, sql, { mode: 0o600 });
    const args = [
      "node_modules/wrangler/bin/wrangler.js",
      "d1",
      "execute",
      "DB",
      remote ? "--remote" : "--local",
      "--file",
      file,
      "--json",
    ];
    if (remote) args.push("--env", environment!);
    const result = spawnSync(process.execPath, args, {
      encoding: "utf8",
      maxBuffer: 1024 * 1024,
      env: {
        ...process.env,
        WRANGLER_LOG_PATH: log,
        WRANGLER_SEND_METRICS: "false",
      },
    });
    if (result.status !== 0)
      throw new Error(
        "Database operation failed; credential-bearing output suppressed.",
      );
    return JSON.parse(result.stdout);
  } finally {
    await rm(file, { force: true });
    await rm(log, { force: true });
  }
}
const result = await query(
  `SELECT password_hash FROM users WHERE username=${quote(username)};`,
);
const encoded = result[0]?.results[0]?.password_hash;
if (typeof encoded !== "string") throw new Error("Account not found");
if (!needsPasswordUpgrade(encoded)) {
  console.log(
    "该账号已经使用低成本哈希，无需迁移。 / Account already migrated.",
  );
  process.exit(0);
}
let password: string;
try {
  password = await readMaskedPassword("Current password (masked): ");
} catch (error) {
  if (error instanceof Error && error.message === "Cancelled") {
    console.log("已取消 / Cancelled");
    process.exit(0);
  }
  throw error;
}
if (!(await verifyPassword(password, encoded))) {
  console.error(
    "密码不正确，未修改账号。 / Incorrect password; no changes made.",
  );
  process.exit(1);
}
const replacement = await hashPassword(password);
const updated = await query(
  `UPDATE users SET password_hash=${quote(replacement)},version=version+1 WHERE username=${quote(username)} AND password_hash=${quote(encoded)} RETURNING username;`,
);
if (updated[0]?.results[0]?.username !== username)
  throw new Error(
    "Account changed concurrently; rerun without overwriting another update.",
  );
console.log(
  "迁移完成，密码保持不变。旧会话已撤销，请重新登录。 / Password unchanged; sign in again.",
);
