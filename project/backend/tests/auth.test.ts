import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";
import { digest, hashPassword } from "../password";
import { scrypt } from "@noble/hashes/scrypt.js";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils.js";
import { randomBytes } from "node:crypto";
import { decryptInvite, importInviteKey, storeInvite } from "../invites";

const origin = "https://lovismind.test";
const password = "Test password with sufficient length!";
const legacyAdminPassword = "Test password with sufficient length!";
const inviteEncryptionKey = randomBytes(32).toString("base64");
let legacyEncoded = "";
const mf = new Miniflare(
  convertV4MiniflareOptions({
    modules: true,
    scriptPath: "out/_worker.js",
    compatibilityDate: "2026-11-04",
    compatibilityFlags: ["nodejs_compat"],
    d1Databases: { DB: "auth-tests" },
    bindings: { INVITE_CODE_ENCRYPTION_KEY: inviteEncryptionKey },
    serviceBindings: { ASSETS: (request: Request) => new Response("STATIC SHELL", { headers: { "X-Asset-Path": new URL(request.url).pathname } }) },
  }),
);
let db: Awaited<ReturnType<typeof mf.getD1Database>>;
let serial = 1;
function client() {
  let session = "",
    csrf = "",
    token = "";
  const ip = `192.0.2.${serial++}`;
  return {
    async call(
      path: string,
      method = "GET",
      data?: unknown,
      options: { badOrigin?: boolean; noCsrf?: boolean } = {},
    ) {
      if (method !== "GET" && !options.noCsrf) {
        const r = await mf.dispatchFetch(origin + "/api/auth/csrf");
        token = ((await r.json()) as { token: string }).token;
        csrf = r.headers.get("Set-Cookie")!.split(";")[0];
      }
      const response = await mf.dispatchFetch(origin + path, {
        method,
        redirect: "manual",
        headers: {
          "CF-Connecting-IP": ip,
          Cookie: [session, csrf].filter(Boolean).join("; "),
          ...(method !== "GET"
            ? {
                "Content-Type": "application/json",
                Origin: options.badOrigin ? "https://evil.example" : origin,
                "X-CSRF-Token": token,
              }
            : {}),
        },
        body: data === undefined ? undefined : JSON.stringify(data),
      });
      const set = response.headers.get("Set-Cookie");
      if (set?.startsWith("__Host-lovismind-session="))
        session = set.split(";")[0];
      return response;
    },
    get sessionCookie() {
      return session;
    },
  };
}
function registration(username: string, inviteCode?: string) {
  return {
    username,
    password,
    confirmPassword: password,
    nickname: "测试读者",
    reason: "想阅读知识库。",
    ...(inviteCode ? { inviteCode } : {}),
  };
}
const admin = client();
async function invite(
  maxUses = 1,
  expiresAt = Math.floor(Date.now() / 1000) + 3600,
) {
  const response = await admin.call("/api/admin/invites", "POST", {
    maxUses,
    expiresAt,
  });
  assert.equal(response.status, 201);
  return (await response.json()) as { id: string; code: string };
}
async function user(username: string) {
  return db
    .prepare("SELECT * FROM users WHERE username=?")
    .bind(username)
    .first<{ id: string; version: number; status: string; role: string }>();
}
async function review(username: string, action: string) {
  const u = (await user(username))!;
  return admin.call("/api/admin/users/" + u.id, "PATCH", {
    action,
    note: "Reviewed identity and application",
    version: u.version,
  });
}
before(async () => {
  db = await mf.getD1Database("DB");
  for (const file of ["0001_auth.sql", "0002_content.sql", "0003_reader_interactions.sql", "0004_recoverable_invites.sql"]) {
    const sql = await readFile("backend/migrations/" + file, "utf8");
    for (const statement of sql.split(/;(?=\s*(?:CREATE|PRAGMA|$))/)) {
      if (statement.trim()) await db.prepare(statement.trim()).run();
    }
  }
  const salt = "000102030405060708090a0b0c0d0e0f";
  const hash = `scrypt-v1$${salt}$${bytesToHex(scrypt(legacyAdminPassword, hexToBytes(salt), { N: 32768, r: 8, p: 3, dkLen: 32, maxmem: 64 * 1024 * 1024 }))}`;
  legacyEncoded = hash;
  await db
    .prepare(
      "INSERT INTO users(id,username,password_hash,nickname,reason,role,status,created_at) VALUES('admin-id','admin',?,'Admin','Bootstrap','admin','approved',unixepoch())",
    )
    .bind(hash)
    .run();
  assert.equal(
    (
      await admin.call("/api/auth/login", "POST", {
        username: "admin",
        password: legacyAdminPassword,
      })
    ).status,
    200,
  );
  await db.batch([
    db.prepare("INSERT INTO content_versions VALUES('test',unixepoch())"),
    db
      .prepare("INSERT INTO content_entries VALUES('test','catalog',?)")
      .bind(JSON.stringify({ secret: "CATALOG_ONLY_FOR_APPROVED" })),
    db
      .prepare(
        "INSERT INTO content_entries VALUES('test','chapters/book/chapter',?)",
      )
      .bind(JSON.stringify({ body: "PRIVATE_CHAPTER_SENTINEL" })),
    db.prepare("INSERT INTO content_current VALUES(1,'test')"),
  ]);
});
after(async () => {
  await mf.dispose();
});

test("restored password rules accept letters, symbols and spaces", async () => {
  for (const [i, candidate] of [
    "abc123",
    "12!456",
    "12345 ",
    "１２３４５６",
    "a".repeat(128),
  ].entries()) {
    const response = await client().call("/api/auth/register", "POST", {
      ...registration("restored_password_" + i),
      password: candidate,
      confirmPassword: candidate,
    });
    assert.equal(response.status, 201);
  }
  for (const candidate of ["12345", "a".repeat(129), 123456]) {
    const response = await client().call("/api/auth/register", "POST", {
      ...registration("invalid_password_length"),
      password: candidate,
      confirmPassword: candidate,
    });
    assert.equal(response.status, 400);
  }
});

test("legacy administrator is migrated to the lower-cost hash after login", async () => {
  const row = await db
    .prepare("SELECT password_hash FROM users WHERE id='admin-id'")
    .first<{ password_hash: string }>();
  assert.match(row!.password_hash, /^scrypt-v2\$/);
});

test("concurrent legacy logins migrate once without losing successful sessions", async () => {
  await db
    .prepare(
      "INSERT INTO users(id,username,password_hash,nickname,reason,role,status,created_at) VALUES('legacy-race','legacy_race',?,'Legacy','Migration test','user','approved',unixepoch())",
    )
    .bind(legacyEncoded)
    .run();
  const oldTokenHash = await digest("old-legacy-session");
  await db
    .prepare(
      "INSERT INTO sessions(token_hash,user_id,expires_at,created_at) VALUES(?,'legacy-race',unixepoch()+3600,unixepoch())",
    )
    .bind(oldTokenHash)
    .run();
  const responses = await Promise.all(
    [client(), client()].map((c) =>
      c.call("/api/auth/login", "POST", {
        username: "legacy_race",
        password: legacyAdminPassword,
      }),
    ),
  );
  assert.equal(
    responses.filter((response) => response.status === 200).length,
    2,
  );
  const row = await db
    .prepare("SELECT password_hash FROM users WHERE id='legacy-race'")
    .first<{ password_hash: string }>();
  assert.match(row!.password_hash, /^scrypt-v2\$/);
  assert.equal(
    await db
      .prepare("SELECT token_hash FROM sessions WHERE token_hash=?")
      .bind(oldTokenHash)
      .first(),
    null,
  );
  const sessions = await db
    .prepare(
      "SELECT count(*) AS count FROM sessions WHERE user_id='legacy-race'",
    )
    .first<{ count: number }>();
  assert.equal(sessions?.count, 2);
});

test("existing longer passwords remain valid for login", async () => {
  const response = await client().call("/api/auth/login", "POST", {
    username: "admin",
    password: legacyAdminPassword,
  });
  assert.equal(response.status, 200);
  const account = ((await response.json()) as { user: { role: string } }).user;
  assert.equal(account.role, "admin");
});

test("six-character passwords work for registration and reset, including leading zeros", async () => {
  const c = client(),
    code = await invite();
  const details = registration("six_character_reader", code.code);
  assert.equal(
    (
      await c.call("/api/auth/register", "POST", {
        ...details,
        password: "12345",
        confirmPassword: "12345",
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await c.call("/api/auth/register", "POST", {
        ...details,
        password: "a".repeat(129),
        confirmPassword: "a".repeat(129),
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await c.call("/api/auth/register", "POST", {
        ...details,
        password: "012345",
        confirmPassword: "012345",
      })
    ).status,
    201,
  );
  assert.equal(
    (
      await c.call("/api/auth/login", "POST", {
        username: details.username,
        password: "012345",
      })
    ).status,
    200,
  );
  const account = (await user(details.username))!;
  const issued = await admin.call(
    `/api/admin/users/${account.id}/reset-credential`,
    "POST",
    { note: "Six-digit password acceptance test" },
  );
  assert.equal(issued.status, 201);
  const { token } = (await issued.json()) as { token: string };
  assert.equal(
    (
      await c.call("/api/auth/reset-password", "POST", {
        token,
        password: "12345",
        confirmPassword: "12345",
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await c.call("/api/auth/reset-password", "POST", {
        token,
        password: "098765",
        confirmPassword: "098765",
      })
    ).status,
    200,
  );
  assert.equal(
    (
      await c.call("/api/auth/login", "POST", {
        username: details.username,
        password: "098765",
      })
    ).status,
    200,
  );
});

test("anonymous website, payloads, attachments and content API enforce the public boundary", async () => {
  const c = client();
  const landingCss = await readFile("components/landing/landing.module.css", "utf8");
  for (const [, asset] of landingCss.matchAll(/url\(["']?(\/images\/[^"')]+)["']?\)/g)) {
    assert.equal((await c.call(asset)).status, 200, `Anonymous landing asset: ${asset}`);
  }
  for (const path of [
    "/",
    "/login/",
    "/register/",
    "/login/index.txt",
    "/register/__next.register/__PAGE__.txt",
    "/_next/static/app.js",
    "/images/hero-scene.webp",
    "/images/lovismind-cover.webp",
    "/images/preface-warm-light.webp",
    "/images/preface-book-cutout-v1.webp",
    "/images/vault-preview/agent.webp",
    "/images/vault-preview/ai-shelf.webp",
    "/images/vault-preview/linear-algebra.webp",
    "/images/vault-preview/mobile.webp",
  ])
    assert.equal((await c.call(path)).status, 200, path);
  for (const path of [
    "/library/",
    "/library/index.html",
    "/library/__next._full.txt",
    "/books/book/chapter/",
    "/books/book/chapter/index.html",
    "/books/book/chapter/index.txt",
    "/books/book/chapter/__next._full.txt",
    "/covers/book.webp",
    "/images/projection-error.svg",
    "/images/vault-preview/unlisted.png",
    "/about/",
    "/guestbook/",
    "/favorites/",
    "/admin/users/",
  ])
    assert.equal((await c.call(path)).status, 401, path);
  assert.equal((await c.call("/api/content/catalog")).status, 401);
  const response = await mf.dispatchFetch(origin + "/library/", {
    headers: { Accept: "text/html" },
    redirect: "manual",
  });
  assert.equal(response.status, 303);
  assert.match(response.headers.get("Location")!, /^\/login\/\?next=/);
  const legacyAccount = await c.call("/account/");
  assert.equal(legacyAccount.status, 308);
  assert.equal(legacyAccount.headers.get("Location"), "/library/");
});

test("admin account totals include every status independently of the filter", async () => {
  const response = await admin.call("/api/admin/users?status=pending");
  assert.equal(response.status, 200);
  const data = await response.json() as {
    accountCount: number;
    total: number;
    pendingCount: number;
    statusCounts: Record<string, number>;
  };
  assert.deepEqual(Object.keys(data.statusCounts).sort(), ["approved", "disabled", "pending", "rejected"]);
  assert.equal(data.total, data.statusCounts.pending);
  assert.equal(data.pendingCount, data.statusCounts.pending);
  assert.equal(data.accountCount, Object.values(data.statusCounts).reduce((sum, count) => sum + count, 0));
  assert.ok(data.accountCount > data.total);
  assert.equal((await client().call("/api/admin/users")).status, 401);
});

test("static segment prefetch aliases resolve only after the original route is authorized", async () => {
  const anonymous = client();
  for (const route of ["about", "guestbook", "library"]) {
    const alias = `/${route}/__next.${route}.__PAGE__.txt`;
    assert.equal((await anonymous.call(alias)).status, 401);
    const response = await admin.call(alias + "?_rsc=qa");
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("X-Asset-Path"), `/${route}/__next.${route}/__PAGE__.txt`);
    assert.equal(response.headers.get("Cache-Control"), "private, no-store");
  }
  const unknown = "/about/__next.unknown.__PAGE__.txt";
  assert.equal((await admin.call(unknown)).headers.get("X-Asset-Path"), unknown);
});
test("CSRF rejects missing credentials and foreign origins", async () => {
  const c = client();
  assert.equal(
    (
      await c.call("/api/auth/register", "POST", registration("csrf_missing"), {
        noCsrf: true,
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await c.call("/api/auth/register", "POST", registration("csrf_origin"), {
        badOrigin: true,
      })
    ).status,
    403,
  );
});
test("manual applications are pending, privileged fields ignored, status disclosed only after password verification", async () => {
  const c = client();
  const response = await c.call("/api/auth/register", "POST", {
    ...registration("manual_reader"),
    role: "admin",
    status: "approved",
  });
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { status: "pending" });
  assert.equal((await user("manual_reader"))?.role, "user");
  const wrong = await c.call("/api/auth/login", "POST", {
    username: "manual_reader",
    password: "incorrect password",
  });
  assert.equal(wrong.status, 401);
  assert.equal(((await wrong.json()) as { status?: string }).status, undefined);
  const correct = await c.call("/api/auth/login", "POST", {
    username: "MANUAL_READER",
    password,
  });
  assert.equal(correct.status, 403);
  assert.equal(
    ((await correct.json()) as { status: string }).status,
    "pending",
  );
  assert.equal(c.sessionCookie, "");
  assert.equal((await c.call("/api/content/catalog")).status, 401);
  assert.equal((await c.call("/api/guestbook")).status, 401);
  assert.equal((await c.call("/api/favorites")).status, 401);
});
test("approval grants reading, ordinary users cannot administer, logout revokes session and cookies are secure", async () => {
  assert.equal((await review("manual_reader", "approve")).status, 200);
  const c = client();
  const login = await c.call("/api/auth/login", "POST", {
    username: "manual_reader",
    password,
  });
  assert.equal(login.status, 200);
  const cookie = login.headers.get("Set-Cookie")!;
  for (const flag of [
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Path=/",
    "Max-Age=604800",
  ])
    assert.ok(cookie.includes(flag));
  const catalog = await c.call("/api/content/catalog");
  assert.equal(catalog.status, 200);
  assert.equal(catalog.headers.get("Cache-Control"), "private, no-store");
  assert.equal(
    (await c.call("/api/content/chapters/book/chapter")).status,
    200,
  );
  assert.equal((await c.call("/api/admin/users")).status, 403);
  assert.equal((await c.call("/admin/users/__next.admin.users.__PAGE__.txt")).status, 403);
  assert.equal(
    (
      await c.call("/api/admin/invites", "POST", {
        maxUses: 1,
        expiresAt: 9999999999,
      })
    ).status,
    403,
  );
  const hash = await digest(c.sessionCookie.split("=")[1]);
  assert.ok(
    await db
      .prepare("SELECT token_hash FROM sessions WHERE token_hash=?")
      .bind(hash)
      .first(),
  );
  await c.call("/api/auth/logout", "POST", {});
  assert.equal((await c.call("/api/content/catalog")).status, 401);
  assert.equal(
    await db
      .prepare("SELECT token_hash FROM sessions WHERE token_hash=?")
      .bind(hash)
      .first(),
    null,
  );
});
test("invalid, expired, exhausted and revoked invites fail without creating an applicant", async () => {
  const c = client();
  assert.equal(
    (
      await c.call(
        "/api/auth/register",
        "POST",
        registration("invalid_invite", "not-an-invite"),
      )
    ).status,
    400,
  );
  const expired = await invite();
  await db
    .prepare("UPDATE invites SET expires_at=unixepoch()-1 WHERE id=?")
    .bind(expired.id)
    .run();
  assert.equal(
    (
      await c.call(
        "/api/auth/register",
        "POST",
        registration("expired_invite", expired.code),
      )
    ).status,
    400,
  );
  const revoked = await invite();
  await admin.call("/api/admin/invites/" + revoked.id, "PATCH", {
    action: "revoke",
  });
  assert.equal(
    (
      await c.call(
        "/api/auth/register",
        "POST",
        registration("revoked_invite", revoked.code),
      )
    ).status,
    400,
  );
  assert.equal(await user("expired_invite"), null);
  assert.equal(await user("invalid_invite"), null);
  const cleared = await c.call(
    "/api/auth/register",
    "POST",
    registration("invalid_invite"),
  );
  assert.equal(cleared.status, 201);
});
test("last invitation use cannot be exceeded by concurrent registrations", async () => {
  const code = await invite(1);
  const results = await Promise.all(
    [0, 1, 2, 3].map((i) =>
      client().call(
        "/api/auth/register",
        "POST",
        registration("race_reader_" + i, code.code),
      ),
    ),
  );
  assert.equal(results.filter((r) => r.status === 201).length, 1);
  assert.equal(results.filter((r) => r.status === 400).length, 3);
  const row = await db
    .prepare("SELECT uses FROM invites WHERE id=?")
    .bind(code.id)
    .first<{ uses: number }>();
  assert.equal(row?.uses, 1);
  const winner = await db
    .prepare(
      "SELECT username,status FROM users WHERE username LIKE 'race_reader_%'",
    )
    .first<{ username: string; status: string }>();
  assert.equal(winner?.status, "approved");
  assert.equal(
    (
      await client().call(
        "/api/auth/register",
        "POST",
        registration("exhausted_invite", code.code),
      )
    ).status,
    400,
  );
});
test("duplicate usernames and failed inserts do not consume an invite", async () => {
  const code = await invite(2);
  const response = await client().call(
    "/api/auth/register",
    "POST",
    registration("MANUAL_READER", code.code),
  );
  assert.equal(response.status, 409);
  const row = await db
    .prepare("SELECT uses FROM invites WHERE id=?")
    .bind(code.id)
    .first<{ uses: number }>();
  assert.equal(row?.uses, 0);
  assert.equal(
    (
      await client().call(
        "/api/auth/register",
        "POST",
        registration("invited_reader", code.code),
      )
    ).status,
    201,
  );
  const hashes = await db
    .prepare("SELECT code_hash FROM invites WHERE id=?")
    .bind(code.id)
    .first<{ code_hash: string }>();
  assert.notEqual(hashes?.code_hash, code.code);
  const listing = await admin.call("/api/admin/invites");
  const publicList = JSON.stringify(await listing.json());
  assert.ok(publicList.includes(code.code));
  assert.ok(!publicList.includes(hashes!.code_hash));
  assert.ok(!publicList.includes("code_ciphertext"));
});

test("six-character invites persist encrypted and accept lowercase without changing legacy tokens", async () => {
  const created = await invite(3);
  assert.match(created.code, /^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/);
  const stored = await db.prepare("SELECT code_hash,code_ciphertext FROM invites WHERE id=?")
    .bind(created.id).first<{ code_hash: string; code_ciphertext: string }>();
  assert.equal(stored!.code_hash, await digest(created.code));
  assert.ok(!stored!.code_ciphertext.includes(created.code));
  const key = await importInviteKey(inviteEncryptionKey);
  assert.equal(await decryptInvite(stored!.code_ciphertext, created.id, key), created.code);
  await assert.rejects(decryptInvite(stored!.code_ciphertext, "different-row", key));
  await assert.rejects(decryptInvite(stored!.code_ciphertext, created.id, await importInviteKey(randomBytes(32).toString("base64"))));
  assert.equal((await client().call("/api/auth/register", "POST", registration("lowercase_invite", created.code.toLowerCase()))).status, 201);
  for (let i = 0; i < 2; i++) {
    const list = await admin.call("/api/admin/invites");
    assert.equal(list.headers.get("Cache-Control"), "private, no-store");
    const data = await list.json() as { invites: { id: string; code: string | null }[] };
    assert.equal(data.invites.find((row) => row.id === created.id)?.code, created.code);
  }
  const legacyCode = randomBytes(32).toString("hex");
  await db.prepare("INSERT INTO invites(id,code_hash,expires_at,max_uses,created_by,created_at) VALUES(?,?,unixepoch()+3600,2,'admin-id',unixepoch())")
    .bind("legacy-invite", await digest(legacyCode)).run();
  assert.equal((await client().call("/api/auth/register", "POST", registration("legacy_invite_user", legacyCode))).status, 201);
  const legacyList = await (await admin.call("/api/admin/invites")).json() as { invites: { id: string; code: string | null }[] };
  assert.equal(legacyList.invites.find((row) => row.id === "legacy-invite")?.code, null);
  const unauthorized = client();
  assert.equal((await unauthorized.call("/api/admin/invites")).status, 401);
  await unauthorized.call("/api/auth/login", "POST", { username: "lowercase_invite", password });
  assert.equal((await unauthorized.call("/api/admin/invites")).status, 403);
  await admin.call(`/api/admin/invites/${created.id}`, "PATCH", { action: "revoke" });
  const afterRevoke = await (await admin.call("/api/admin/invites")).json() as { invites: { id: string; code: string | null }[] };
  assert.equal(afterRevoke.invites.find((row) => row.id === created.id)?.code, created.code);
});

test("invite collisions retry at most five times and do not overwrite existing codes", async () => {
  const key = await importInviteKey(inviteEncryptionKey);
  const params = { maxUses: 1, expiresAt: Math.floor(Date.now() / 1000) + 3600, createdAt: Math.floor(Date.now() / 1000), adminId: "admin-id" };
  await storeInvite(db, params, key, () => "KKKKK2");
  let calls = 0;
  const fresh = await storeInvite(db, params, key, () => ++calls < 3 ? "KKKKK2" : "KKKKK3");
  assert.equal(calls, 3);
  assert.equal(fresh.code, "KKKKK3");
  calls = 0;
  await assert.rejects(storeInvite(db, params, key, () => { calls++; return "KKKKK2"; }), /INVITE_GENERATION_BUSY/);
  assert.equal(calls, 5);
  assert.equal((await db.prepare("SELECT count(*) AS count FROM invites WHERE code_hash=?").bind(await digest("KKKKK2")).first<{ count: number }>())?.count, 1);
});

test("concurrent case-insensitive username collisions consume only the successful invite use", async () => {
  const code = await invite(2);
  const responses = await Promise.all([
    client().call(
      "/api/auth/register",
      "POST",
      registration("same_name_race", code.code),
    ),
    client().call(
      "/api/auth/register",
      "POST",
      registration("SAME_NAME_RACE", code.code),
    ),
  ]);
  assert.deepEqual(
    responses.map((response) => response.status).sort(),
    [201, 409],
  );
  const row = await db
    .prepare("SELECT uses FROM invites WHERE id=?")
    .bind(code.id)
    .first<{ uses: number }>();
  assert.equal(row?.uses, 1);
});

test("malformed login usernames fail with the same generic credentials response", async () => {
  const response = await client().call("/api/auth/login", "POST", {
    username: "invalid-name",
    password,
  });
  assert.equal(response.status, 401);
  const result = (await response.json()) as { code: string; status?: string };
  assert.equal(result.code, "INVALID_CREDENTIALS");
  assert.equal(result.status, undefined);
});
test("disable revokes all sessions immediately; stale reviews fail; re-enable does not restore sessions", async () => {
  const a = client(),
    b = client();
  for (const c of [a, b])
    assert.equal(
      (
        await c.call("/api/auth/login", "POST", {
          username: "invited_reader",
          password,
        })
      ).status,
      200,
    );
  const initial = (await user("invited_reader"))!;
  assert.equal((await review("invited_reader", "disable")).status, 200);
  for (const c of [a, b])
    assert.equal((await c.call("/api/content/catalog")).status, 401);
  const denied = await a.call("/api/auth/login", "POST", {
    username: "invited_reader",
    password,
  });
  assert.equal(
    ((await denied.json()) as { status: string }).status,
    "disabled",
  );
  assert.equal(
    (
      await admin.call("/api/admin/users/" + initial.id, "PATCH", {
        action: "enable",
        note: "stale",
        version: initial.version,
      })
    ).status,
    409,
  );
  assert.equal((await review("invited_reader", "enable")).status, 200);
  assert.equal((await a.call("/api/content/catalog")).status, 401);
  const logs = await admin.call("/api/admin/users/" + initial.id + "/reviews");
  assert.equal(((await logs.json()) as { logs: unknown[] }).logs.length, 2);
});
test("one-use password reset revokes sessions, rejects old password and preserves status", async () => {
  const u = (await user("invited_reader"))!,
    c = client();
  await c.call("/api/auth/login", "POST", {
    username: "invited_reader",
    password,
  });
  const issued = await admin.call(
    `/api/admin/users/${u.id}/reset-credential`,
    "POST",
    { note: "Identity verified offline" },
  );
  assert.equal(issued.status, 201);
  const { token } = (await issued.json()) as { token: string };
  assert.equal((await c.call("/api/content/catalog")).status, 401);
  const nextPassword = "654321";
  const reset = () =>
    client().call("/api/auth/reset-password", "POST", {
      token,
      password: nextPassword,
      confirmPassword: nextPassword,
    });
  const results = await Promise.all([reset(), reset()]);
  assert.equal(results.filter((r) => r.status === 200).length, 1);
  assert.equal(results.filter((r) => r.status === 400).length, 1);
  assert.equal(
    (
      await client().call("/api/auth/login", "POST", {
        username: "invited_reader",
        password,
      })
    ).status,
    401,
  );
  assert.equal(
    (
      await client().call("/api/auth/login", "POST", {
        username: "invited_reader",
        password: nextPassword,
      })
    ).status,
    200,
  );
  assert.equal((await user("invited_reader"))?.status, "approved");
  const second = await admin.call(
    `/api/admin/users/${u.id}/reset-credential`,
    "POST",
    { note: "Expiry test" },
  );
  const expired = ((await second.json()) as { token: string }).token;
  await db
    .prepare(
      "UPDATE reset_tokens SET expires_at=unixepoch()-1 WHERE token_hash=?",
    )
    .bind(await digest(expired))
    .run();
  assert.equal(
    (
      await client().call("/api/auth/reset-password", "POST", {
        token: expired,
        password,
        confirmPassword: password,
      })
    ).status,
    400,
  );
});
test("rejection blocks login, only authenticated admins can view reasons and initialize admins through deployment", async () => {
  assert.equal((await review("invalid_invite", "reject")).status, 200);
  const response = await client().call("/api/auth/login", "POST", {
    username: "invalid_invite",
    password,
  });
  assert.equal(
    ((await response.json()) as { status: string }).status,
    "rejected",
  );
  const listing = await admin.call("/api/admin/users?status=pending");
  assert.equal(listing.status, 200);
  const result = (await listing.json()) as {
    pendingCount: number;
    users: unknown[];
  };
  assert.ok(result.pendingCount >= 0);
  assert.equal(
    (
      await admin.call("/api/admin/users/admin-id", "PATCH", {
        action: "disable",
        note: "",
        version: 0,
      })
    ).status,
    403,
  );
  assert.equal(
    (await client().call("/api/auth/bootstrap", "POST", {})).status,
    404,
  );
});
test("session expiry denies access", async () => {
  const c = client();
  await c.call("/api/auth/login", "POST", {
    username: "manual_reader",
    password,
  });
  await db
    .prepare("UPDATE sessions SET expires_at=unixepoch()-1 WHERE token_hash=?")
    .bind(await digest(c.sessionCookie.split("=")[1]))
    .run();
  assert.equal((await c.call("/api/content/catalog")).status, 401);
});

test("missing backend binding fails closed and malformed asset paths do not bypass authorization", async () => {
  const missing = new Miniflare(
    convertV4MiniflareOptions({
      modules: true,
      scriptPath: "out/_worker.js",
      compatibilityDate: "2026-11-04",
      compatibilityFlags: ["nodejs_compat"],
      serviceBindings: { ASSETS: () => new Response("STATIC SHELL") },
    }),
  );
  try {
    assert.equal((await missing.dispatchFetch(origin + "/")).status, 200);
    for (const path of [
      "/api/content/catalog",
      "/books/book/",
      "/images/projection-error.svg",
    ])
      assert.equal((await missing.dispatchFetch(origin + path)).status, 503);
  } finally {
    await missing.dispose();
  }
  for (const path of [
    "/_next/static/%2f..%2f..%2fimages/projection-error.svg",
    "/_next/static/%5c..%5cimages/projection-error.svg",
  ])
    assert.equal((await client().call(path)).status, 400);
});

test("invite list pagination keeps older invites manageable without exposing code hashes", async () => {
  const statements = Array.from({ length: 35 }, (_, i) =>
    db
      .prepare(
        "INSERT INTO invites(id,code_hash,expires_at,max_uses,created_by,created_at) VALUES(?,?,unixepoch()+3600,1,'admin-id',unixepoch())",
      )
      .bind("pagination-" + i, "pagination-hash-" + i),
  );
  await db.batch(statements);
  const first = (await (
    await admin.call("/api/admin/invites?page=1")
  ).json()) as { invites: { id: string }[]; total: number };
  const second = (await (
    await admin.call("/api/admin/invites?page=2")
  ).json()) as { invites: { id: string }[] };
  assert.equal(first.invites.length, 30);
  assert.ok(first.total > 30);
  assert.ok(second.invites.length > 0);
  assert.ok(
    !second.invites.some((a) => first.invites.some((b) => b.id === a.id)),
  );
  assert.ok(!JSON.stringify(first).includes("code_hash"));
});
test("registration rate limits are persistent and input validation runs on the backend", async () => {
  const c = client();
  for (let i = 0; i < 5; i++)
    assert.equal(
      (
        await c.call("/api/auth/register", "POST", {
          ...registration("short"),
          password: "short",
          confirmPassword: "short",
        })
      ).status,
      400,
    );
  assert.equal(
    (await c.call("/api/auth/register", "POST", registration("limited_reader")))
      .status,
    429,
  );
  const mismatch = await client().call("/api/auth/register", "POST", {
    ...registration("mismatch"),
    confirmPassword: "different password",
  });
  assert.equal(mismatch.status, 400);
});

test("guestbook enforces authorship, moderation, visibility and per-user posting limits", async () => {
  const anonymous = client();
  assert.equal((await anonymous.call("/api/guestbook")).status, 401);
  assert.equal((await anonymous.call("/api/favorites")).status, 401);
  const reader = client();
  const access = await invite();
  assert.equal((await reader.call("/api/auth/register", "POST", registration("guestbook_reader", access.code))).status, 201);
  assert.equal((await reader.call("/api/auth/login", "POST", { username: "guestbook_reader", password })).status, 200);
  const publish = (message: string) => reader.call("/api/guestbook", "POST", { action: "publish", message });
  assert.equal((await publish(" ".repeat(12))).status, 400);
  assert.equal((await publish("x".repeat(1001))).status, 400);
  assert.equal((await publish("<script>plain text</script>")).status, 201);
  const list = async (c: ReturnType<typeof client>, path = "/api/guestbook") =>
    ((await (await c.call(path)).json()) as { items: { id: number; own: boolean; message: string }[] }).items;
  const [posted] = await list(admin);
  assert.equal(posted.message, "<script>plain text</script>");
  assert.equal(posted.own, false);
  assert.equal((await list(reader))[0].own, true);
  assert.equal((await reader.call("/api/admin/guestbook")).status, 403);
  assert.equal((await reader.call("/api/admin/guestbook", "POST", { action: "hide", id: posted.id })).status, 403);
  assert.equal((await admin.call("/api/guestbook", "POST", { action: "delete", id: posted.id })).status, 404);
  assert.equal((await admin.call("/api/admin/guestbook", "POST", { action: "hide", id: posted.id })).status, 200);
  assert.equal((await list(reader)).length, 0);
  assert.equal((await list(admin, "/api/admin/guestbook"))[0].id, posted.id);
  assert.equal((await admin.call("/api/admin/guestbook", "POST", { action: "restore", id: posted.id })).status, 200);
  assert.equal((await list(reader))[0].id, posted.id);
  assert.equal((await reader.call("/api/guestbook", "POST", { action: "delete", id: posted.id })).status, 200);
  // The deleted first post still counts; twenty posts per minute permits a
  // conversation while bounding bursts. Rejected posts never reach the table.
  for (let i = 0; i < 19; i++) assert.equal((await publish("Post " + i)).status, 201);
  const limited = await publish("Rate limited");
  assert.equal(limited.status, 429);
  assert.equal((await limited.json() as { code: string }).code, "GUESTBOOK_RATE_LIMITED");
  assert.ok(Number(limited.headers.get("Retry-After")) >= 1);
  assert.ok(Number(limited.headers.get("Retry-After")) <= 60);
  assert.ok(!(await list(reader)).some((entry) => entry.message === "Rate limited"));
  const readerId = (await user("guestbook_reader"))!.id;
  await db.prepare("UPDATE rate_limits SET expires_at=unixepoch()-1 WHERE key=?")
    .bind(await digest(`guestbook:v2:${readerId}`)).run();
  assert.equal((await publish("After the window expires")).status, 201);
  for (let i = 0; i < 20; i++)
    await db.prepare("INSERT INTO guestbook_entries(user_id,message) VALUES(?,?)").bind(readerId, "Pagination " + i).run();
  const first = await (await reader.call("/api/guestbook")).json() as { items: { id: number }[]; next: number };
  assert.equal(first.items.length, 20);
  const second = await list(reader, "/api/guestbook?before=" + first.next);
  assert.equal(second.length, 20);
  assert.ok(second.every((item) => item.id < first.next));
});

test("username casing is preserved while login and uniqueness remain case insensitive", async () => {
  const access = await invite(2);
  const reader = client();
  const original = "CasePreserved";
  assert.equal((await reader.call("/api/auth/register", "POST", {
    ...registration(original, access.code), nickname: "",
  })).status, 201);
  for (const username of [original.toLowerCase(), original.toUpperCase()]) {
    assert.equal((await reader.call("/api/auth/login", "POST", { username, password })).status, 200);
    const { user: account } = await (await reader.call("/api/auth/me")).json() as { user: { username: string; nickname: string } };
    assert.equal(account.username, original);
    assert.equal(account.nickname, original);
  }
  assert.equal((await client().call("/api/auth/register", "POST", registration(original.toUpperCase(), access.code))).status, 409);
});

test("favorites are account scoped, idempotent and removable after content is unavailable", async () => {
  const access = await invite();
  const deviceA = client(), deviceB = client();
  assert.equal((await deviceA.call("/api/auth/register", "POST", registration("favorite_reader", access.code))).status, 201);
  for (const device of [deviceA, deviceB])
    assert.equal((await device.call("/api/auth/login", "POST", { username: "favorite_reader", password })).status, 200);
  const book = "llm-knowledge-base", chapter = "01-karpathy-llm-wiki";
  const save = (target: { book: string; chapter?: string; saved: boolean }) =>
    deviceA.call("/api/favorites", "POST", target);
  const results = await Promise.all([save({ book, saved: true }), save({ book, saved: true })]);
  assert.ok(results.every((result) => result.status === 200));
  assert.equal((await save({ book, chapter, saved: true })).status, 200);
  assert.deepEqual(await (await deviceB.call("/api/favorites/status?book=" + book)).json(), { saved: true });
  assert.deepEqual(await (await admin.call("/api/favorites")).json(), { items: [] });
  assert.equal((await save({ book: "removed-book", saved: true })).status, 404);
  await db.prepare("INSERT INTO favorites(user_id,book,chapter) VALUES(?,?,'')")
    .bind((await user("favorite_reader"))!.id, "removed-book").run();
  const data = await (await deviceB.call("/api/favorites")).json() as { items: { book: string; chapter: string; href: string | null }[] };
  assert.equal(data.items.length, 3);
  assert.equal(data.items.find((item) => item.chapter === chapter)?.href, `/books/${book}/${chapter}/`);
  assert.equal(data.items.find((item) => item.book === "removed-book")?.href, null);
  assert.equal((await save({ book: "removed-book", saved: false })).status, 200);
  assert.equal((await save({ book, saved: false })).status, 200);
  assert.deepEqual(await (await deviceB.call("/api/favorites/status?book=" + book)).json(), { saved: false });
});
