import { test } from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";
import { digest } from "../password";
import { importInviteKey, storeInvite } from "../invites";

async function fixture(secret?: string) {
  const mf = new Miniflare(convertV4MiniflareOptions({
    modules: true, scriptPath: "out/_worker.js", compatibilityDate: "2026-11-04", compatibilityFlags: ["nodejs_compat"],
    d1Databases: { DB: "invite-storage" },
    bindings: secret === undefined ? {} : { INVITE_CODE_ENCRYPTION_KEY: secret },
    serviceBindings: { ASSETS: () => new Response("STATIC SHELL") },
  }));
  const db = await mf.getD1Database("DB");
  for (const file of ["0001_auth.sql", "0004_recoverable_invites.sql"]) {
    for (const sql of (await readFile("backend/migrations/" + file, "utf8")).split(/;(?=\s*(?:CREATE|PRAGMA|$))/)) {
      if (sql.trim()) await db.prepare(sql.trim()).run();
    }
  }
  await db.prepare("INSERT INTO users(id,username,password_hash,nickname,reason,role,status,created_at) VALUES('storage-admin','storage_admin','unused','QA','QA','admin','approved',unixepoch())").run();
  const session = randomBytes(32).toString("hex");
  await db.prepare("INSERT INTO sessions(token_hash,user_id,expires_at,created_at) VALUES(?,'storage-admin',unixepoch()+3600,unixepoch())").bind(await digest(session)).run();
  const origin = "https://lovismind.test";
  const csrf = await mf.dispatchFetch(origin + "/api/auth/csrf");
  const token = (await csrf.json() as { token: string }).token;
  const cookie = `__Host-lovismind-session=${session}; ${csrf.headers.get("Set-Cookie")!.split(";")[0]}`;
  return { mf, db, call: (method: "GET" | "POST") => mf.dispatchFetch(origin + "/api/admin/invites", {
    method, headers: { Cookie: cookie, Origin: origin, "X-CSRF-Token": token, "Content-Type": "application/json" },
    body: method === "POST" ? JSON.stringify({ maxUses: 1, expiresAt: Math.floor(Date.now() / 1000) + 3600 }) : undefined,
  }) };
}

for (const secret of [undefined, "invalid-key"]) {
  test(`missing or malformed invite key fails clearly without inserting a code (${secret === undefined ? "missing" : "malformed"})`, async () => {
    const f = await fixture(secret);
    try {
      const response = await f.call("POST");
      assert.equal(response.status, 503);
      assert.equal((await response.json() as { code: string }).code, "INVITE_KEY_UNAVAILABLE");
      assert.equal((await f.db.prepare("SELECT count(*) AS count FROM invites").first<{ count: number }>())?.count, 0);
      const key = await importInviteKey(randomBytes(32).toString("base64"));
      await storeInvite(f.db, { maxUses: 1, expiresAt: Math.floor(Date.now() / 1000) + 3600, createdAt: Math.floor(Date.now() / 1000), adminId: "storage-admin" }, key);
      assert.equal((await f.call("GET")).status, 503);
    } finally { await f.mf.dispose(); }
  });
}

test("tampered encrypted invite does not leak storage details", async () => {
  const secret = randomBytes(32).toString("base64");
  const f = await fixture(secret);
  try {
    const created = await storeInvite(f.db, { maxUses: 1, expiresAt: Math.floor(Date.now() / 1000) + 3600, createdAt: Math.floor(Date.now() / 1000), adminId: "storage-admin" }, await importInviteKey(secret));
    await f.db.prepare("UPDATE invites SET code_ciphertext='v1:invalid:invalid' WHERE id=?").bind(created.id).run();
    const response = await f.call("GET");
    assert.equal(response.status, 503);
    const result = await response.text();
    assert.ok(result.includes("INVITE_DECRYPT_FAILED"));
    assert.ok(!result.includes(created.code));
    assert.ok(!result.includes(secret));
    assert.ok(!result.includes("ciphertext"));
  } finally { await f.mf.dispose(); }
});
