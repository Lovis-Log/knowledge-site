import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  decryptInvite,
  hashInviteCode,
  importInviteKeys,
  isShortInviteCode,
  normalizeInviteCode,
} from "../backend/invites";
import { digest } from "../backend/password";

const usage =
  "Usage: tsx scripts/migrate-invite-hashes.ts [--apply] [--remote --env=preview|production] [--key-file=<path>]";

async function main() {
  // Backfill keyed invite hashes for short codes whose encrypted copy is still
  // recoverable. The default is a read-only check.
  const invocationCwd = process.cwd();
  process.chdir(resolve(dirname(fileURLToPath(import.meta.url)), ".."));

  const args = process.argv.slice(2);
  for (const arg of args) {
    if (
      arg !== "--apply" &&
      arg !== "--remote" &&
      !arg.startsWith("--env=") &&
      !arg.startsWith("--key-file=")
    )
      throw new Error(usage);
  }
  const apply = args.includes("--apply");
  const remote = args.includes("--remote");
  const environment = args.find((arg) => arg.startsWith("--env="))?.slice("--env=".length);
  const keyFile = args.find((arg) => arg.startsWith("--key-file="))?.slice("--key-file=".length);
  if (remote && !["preview", "production"].includes(environment ?? ""))
    throw new Error("Remote migration requires --env=preview or --env=production.");
  if (!remote && environment !== undefined)
    throw new Error("--env is only valid together with --remote.");

  function readKey(contents: string) {
    const lines = contents
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"));
    const named = lines.find((line) => line.startsWith("INVITE_CODE_ENCRYPTION_KEY="));
    if (named) return named.slice("INVITE_CODE_ENCRYPTION_KEY=".length).trim();
    // A dedicated key file may contain only the Base64 value.
    if (lines.length === 1) return lines[0];
    throw new Error(
      "Key file must contain INVITE_CODE_ENCRYPTION_KEY=... or a single Base64 value.",
    );
  }

  const secret = keyFile
    ? readKey(await readFile(resolve(invocationCwd, keyFile), "utf8"))
    : process.env.INVITE_CODE_ENCRYPTION_KEY?.trim();
  if (!secret)
    throw new Error("Provide --key-file=<path> or set INVITE_CODE_ENCRYPTION_KEY; the key is never printed.");

  async function query(sql: string) {
    await mkdir(".backend-build", { recursive: true });
    const id = randomUUID();
    const file = `.backend-build/invite-hash-${id}.sql`;
    const log = resolve(`.backend-build/invite-hash-${id}.log`);
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
        maxBuffer: 16 * 1024 * 1024,
        env: {
          ...process.env,
          WRANGLER_LOG_PATH: log,
          WRANGLER_SEND_METRICS: "false",
        },
      });
      if (result.status !== 0)
        throw new Error("Database operation failed; credential-bearing output suppressed.");
      return JSON.parse(result.stdout) as {
        results?: Record<string, unknown>[];
        meta?: { changes?: number };
      }[];
    } finally {
      await rm(file, { force: true });
      await rm(log, { force: true });
    }
  }

  const quote = (value: string) => "'" + value.replaceAll("'", "''") + "'";
  const keys = await importInviteKeys(secret);
  const rows =
    (
      await query(
        "SELECT id,code_hash,code_ciphertext FROM invites;",
      )
    )[0]?.results ?? [];

  type Planned = { id: string; oldHash: string; newHash: string };
  const planned: Planned[] = [];
  let alreadyKeyed = 0;
  let withoutCiphertext = 0;

  // Decrypt and validate every recoverable row before the first write. Any
  // failure aborts the whole migration with no hash changed.
  for (const row of rows) {
    const { id, code_hash: oldHash, code_ciphertext: ciphertext } = row;
    if (typeof id !== "string" || typeof oldHash !== "string")
      throw new Error("Unexpected invite row; aborting before any write.");
    if (ciphertext === null || ciphertext === undefined) {
      // Legacy long codes (and any short code stored without its encrypted
      // copy) cannot be re-hashed; they keep their SHA-256 lookup.
      withoutCiphertext++;
      continue;
    }
    if (typeof ciphertext !== "string")
      throw new Error("Unexpected invite ciphertext; aborting before any write.");
    const code = normalizeInviteCode(await decryptInvite(ciphertext, id, keys.encryption));
    if (!isShortInviteCode(code))
      throw new Error(
        "An encrypted invite does not contain a valid short code; aborting before any write.",
      );
    const newHash = await hashInviteCode(code, keys);
    if (oldHash === newHash) {
      alreadyKeyed++;
      continue;
    }
    if (oldHash !== (await digest(code)))
      throw new Error(
        "An invite hash is neither the legacy SHA-256 nor the keyed hash; aborting before any write.",
      );
    planned.push({ id, oldHash, newHash });
  }

  console.log(
    `${apply ? "Applying" : "Dry run"}: ${rows.length} invite(s) read; ` +
      `${planned.length} short code(s) to migrate; ${alreadyKeyed} already keyed; ` +
      `${withoutCiphertext} without ciphertext left on the compatible SHA-256 lookup.`,
  );
  if (!apply) {
    console.log(
      "No database writes performed. Re-run with --apply to migrate the listed short codes.",
    );
    return;
  }

  let migrated = 0;
  for (const item of planned) {
    // The old hash is the compare-and-swap guard: a concurrently changed row
    // is never overwritten. Re-running resumes safely. RETURNING reports
    // whether the guard matched without relying on wrangler's change counts.
    const result = await query(
      `UPDATE invites SET code_hash=${quote(item.newHash)} WHERE id=${quote(item.id)} AND code_hash=${quote(item.oldHash)} RETURNING id;`,
    );
    if (result[0]?.results?.length !== 1)
      throw new Error(
        "An invite changed during migration; the check is safe to re-run.",
      );
    migrated++;
  }
  console.log(`Migrated ${migrated} invite hash(es). Re-run without --apply to confirm.`);
}

await main().catch((error: unknown) => {
  console.error(
    error instanceof Error ? error.message : "Invite hash migration failed.",
  );
  process.exit(1);
});
