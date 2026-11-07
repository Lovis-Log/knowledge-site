import { createInterface } from "node:readline/promises";
import { readMaskedPassword } from "./terminal-password";
import { stdin, stdout } from "node:process";
import { writeFile, mkdir, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { hashPassword } from "../backend/password";
import { isValidPassword } from "../lib/password-policy";
const remote = process.argv.includes("--remote");
const environment = process.argv
  .find((arg) => arg.startsWith("--env="))
  ?.split("=")[1];
if (remote && !["preview", "production"].includes(environment ?? ""))
  throw new Error(
    "Remote initialization requires --env=preview or --env=production",
  );
if (!stdin.isTTY)
  throw new Error(
    "Run interactively in a terminal; credentials cannot be passed in arguments or environment variables.",
  );
const input = createInterface({ input: stdin, output: stdout });
const username = (
  await input.question(
    "Administrator username (3–32 letters/digits/underscores): ",
  )
)
  .trim();
input.close();
if (!/^[a-z0-9_]{3,32}$/i.test(username)) throw new Error("Invalid username");
let password = "";
try {
  while (true) {
    password = await readMaskedPassword(
      "Password (6–128 characters, masked): ",
    );
    if (!isValidPassword(password)) {
      console.log(
        "密码长度须为 6–128 个字符，请重新输入。 / Use 6–128 characters; try again.",
      );
      continue;
    }
    const confirmation = await readMaskedPassword(
      "Confirm password (masked): ",
    );
    if (password !== confirmation) {
      console.log(
        "两次密码不一致，请重新输入。 / Passwords do not match; try again.",
      );
      continue;
    }
    break;
  }
} catch (error) {
  if (error instanceof Error && error.message === "Cancelled") {
    console.log("已取消 / Cancelled");
    process.exit(0);
  }
  throw error;
}
const hash = await hashPassword(password),
  quote = (s: string) => "'" + s.replaceAll("'", "''") + "'";
await mkdir(".backend-build", { recursive: true });
const file = ".backend-build/admin-" + crypto.randomUUID() + ".sql";
try {
  await writeFile(
    file,
    `INSERT INTO users(id,username,password_hash,nickname,reason,role,status,created_at) SELECT ${quote(crypto.randomUUID())},${quote(username)},${quote(hash)},${quote(username)},'Deployment bootstrap','admin','approved',unixepoch() WHERE NOT EXISTS(SELECT 1 FROM users WHERE role='admin');`,
    { mode: 0o600 },
  );
  const args = [
    "node_modules/wrangler/bin/wrangler.js",
    "d1",
    "execute",
    "DB",
    remote ? "--remote" : "--local",
    "--file",
    file,
  ];
  if (remote) args.push("--env", environment!);
  const result = spawnSync(process.execPath, args, { stdio: "inherit" });
  if (result.status !== 0) process.exitCode = result.status ?? 1;
  else
    console.log(
      "Bootstrap completed; if an administrator already existed, no account was changed.",
    );
} finally {
  await rm(file, { force: true });
}
