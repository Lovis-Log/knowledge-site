import {
  digest,
  equal,
  hashPassword,
  randomToken,
  verifyPassword,
  needsPasswordUpgrade,
} from "./password";
import { isValidPassword } from "../lib/password-policy";

type DB = D1DatabaseSession;
type User = {
  id: string;
  username: string;
  nickname: string;
  reason: string;
  role: "user" | "admin";
  status: "pending" | "approved" | "rejected" | "disabled";
  created_at: number;
  version: number;
  password_hash: string;
};
type SessionUser = Pick<
  User,
  "id" | "username" | "nickname" | "role" | "status"
>;
class HttpError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
  }
}
const now = () => Math.floor(Date.now() / 1000);
const SESSION = "__Host-lovismind-session";
const CSRF = "__Host-lovismind-csrf";
function cookie(request: Request, name: string) {
  return (
    request.headers
      .get("Cookie")
      ?.split(";")
      .map((x) => x.trim())
      .find((x) => x.startsWith(name + "="))
      ?.slice(name.length + 1) ?? ""
  );
}
function setCookie(name: string, value: string, age: number) {
  return `${name}=${value}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${age}`;
}
function json(
  data: unknown,
  status = 200,
  headers: Record<string, string> = {},
) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });
}
function fail(status: number, code: string, message: string): never {
  throw new HttpError(status, code, message);
}
function text(
  data: Record<string, unknown>,
  key: string,
  min: number,
  max: number,
  trim = true,
) {
  if (typeof data[key] !== "string")
    fail(400, "INVALID_INPUT", `${key} 格式不正确 / Invalid ${key}`);
  const value = trim ? (data[key] as string).trim() : (data[key] as string);
  if (value.length < min || value.length > max)
    fail(
      400,
      "INVALID_INPUT",
      `${key} 长度须为 ${min}–${max} / Invalid length`,
    );
  return value;
}
async function body(request: Request) {
  if (!request.headers.get("Content-Type")?.startsWith("application/json"))
    fail(415, "JSON_REQUIRED", "请发送 JSON / JSON required");
  const reader = request.body?.getReader();
  if (!reader) fail(400, "INVALID_INPUT", "请求为空 / Empty request");
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16384) {
      await reader.cancel();
      fail(413, "BODY_TOO_LARGE", "请求过大 / Request too large");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  try {
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      throw new Error();
    return parsed as Record<string, unknown>;
  } catch {
    return fail(400, "INVALID_JSON", "JSON 格式错误 / Invalid JSON");
  }
}
function newPassword(data: Record<string, unknown>) {
  if (typeof data.password !== "string" || !isValidPassword(data.password))
    fail(
      400,
      "INVALID_PASSWORD",
      "密码长度须为 6–128 个字符 / Password must contain 6–128 characters",
    );
  if (data.password !== data.confirmPassword)
    fail(400, "PASSWORD_MISMATCH", "两次密码不一致 / Passwords do not match");
  return data.password;
}
function csrf(request: Request) {
  const origin = new URL(request.url).origin;
  const token = cookie(request, CSRF);
  if (
    request.headers.get("Origin") !== origin ||
    !/^[a-f0-9]{64}$/.test(token) ||
    !equal(token, request.headers.get("X-CSRF-Token") ?? "")
  )
    fail(403, "CSRF_FAILED", "页面已过期，请刷新 / Refresh the page");
}
async function limit(db: DB, key: string, max: number, seconds: number) {
  const time = now();
  const row = await db
    .prepare(
      `INSERT INTO rate_limits(key,count,expires_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN expires_at<=? THEN 1 ELSE count+1 END, expires_at=CASE WHEN expires_at<=? THEN excluded.expires_at ELSE expires_at END RETURNING count`,
    )
    .bind(await digest(key), time + seconds, time, time)
    .first<{ count: number }>();
  if (!row || row.count > max)
    fail(429, "RATE_LIMITED", "尝试过多，请稍后再试 / Too many attempts");
}
async function session(request: Request, db: DB) {
  const token = cookie(request, SESSION);
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  return db
    .prepare(
      "SELECT u.id,u.username,u.nickname,u.role,u.status FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token_hash=? AND s.expires_at>? AND u.status='approved'",
    )
    .bind(await digest(token), now())
    .first<SessionUser>();
}
function publicUser(u: SessionUser) {
  return {
    id: u.id,
    username: u.username,
    nickname: u.nickname,
    role: u.role,
    status: u.status,
  };
}
async function requireUser(request: Request, db: DB, admin = false) {
  const user = await session(request, db);
  if (!user) fail(401, "UNAUTHENTICATED", "请先登录 / Please sign in");
  if (admin && user.role !== "admin")
    fail(403, "FORBIDDEN", "无管理员权限 / Admin access required");
  return user;
}
async function content(db: DB, key: string) {
  const entry = await db
    .prepare(
      "SELECT json FROM content_entries WHERE version_id=(SELECT version_id FROM content_current WHERE id=1) AND key=?",
    )
    .bind(key)
    .first<{ json: string }>();
  if (!entry)
    fail(404, "NOT_FOUND", "内容不存在或尚未导入 / Content not found");
  return new Response(entry.json, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}
async function api(request: Request, db: DB, path: string) {
  const method = request.method;
  if (method === "GET" && path === "/api/auth/csrf") {
    const token = randomToken();
    return json({ token }, 200, { "Set-Cookie": setCookie(CSRF, token, 3600) });
  }
  if (!["GET", "HEAD"].includes(method)) csrf(request);
  const ip = request.headers.get("CF-Connecting-IP") ?? "local";
  if (method === "POST" && path === "/api/auth/register") {
    await limit(db, `register:${ip}`, 5, 3600);
    const data = await body(request);
    const username = text(data, "username", 3, 32).toLowerCase();
    if (!/^[a-z0-9_]+$/.test(username))
      fail(
        400,
        "INVALID_USERNAME",
        "用户名仅可用字母、数字和下划线 / Letters, digits and underscores only",
      );
    const password = newPassword(data);
    const nickname =
        (typeof data.nickname === "string"
          ? text(data, "nickname", 0, 64)
          : "") || username,
      reason = text(data, "reason", 1, 2000);
    const code =
      data.inviteCode === undefined ? "" : text(data, "inviteCode", 0, 128);
    // Skip the expensive KDF for a name that is already taken. The UNIQUE
    // constraint below remains authoritative for concurrent registrations.
    const taken = await db
      .prepare("SELECT 1 AS found FROM users WHERE username=?")
      .bind(username)
      .first<{ found: number }>();
    if (taken)
      fail(409, "USERNAME_TAKEN", "用户名已存在 / Username already exists");
    let inviteId: string | null = null;
    if (code) {
      await limit(db, `invite:${ip}`, 10, 3600);
      const invite = await db
        .prepare(
          "SELECT id FROM invites WHERE code_hash=? AND revoked=0 AND expires_at>? AND uses<max_uses",
        )
        .bind(await digest(code), now())
        .first<{ id: string }>();
      if (!invite)
        fail(
          400,
          "INVITE_UNAVAILABLE",
          "邀请码无效、过期或已用尽；可移除后申请人工审核 / Remove the unavailable invite to apply for review",
        );
      inviteId = invite.id;
    }
    const hash = await hashPassword(password);
    try {
      await db
        .prepare(
          "INSERT INTO users(id,username,password_hash,nickname,reason,status,invite_id,created_at) VALUES(?,?,?,?,?,?,?,?)",
        )
        .bind(
          crypto.randomUUID(),
          username,
          hash,
          nickname,
          reason,
          inviteId ? "approved" : "pending",
          inviteId,
          now(),
        )
        .run();
    } catch (error) {
      const message = String(error);
      if (message.includes("users.username"))
        fail(409, "USERNAME_TAKEN", "用户名已存在 / Username already exists");
      if (message.includes("INVITE_UNAVAILABLE"))
        fail(
          400,
          "INVITE_UNAVAILABLE",
          "邀请码已不可用，可移除后申请人工审核 / Invite no longer available",
        );
      throw error;
    }
    return json({ status: inviteId ? "approved" : "pending" }, 201);
  }
  if (method === "POST" && path === "/api/auth/login") {
    await limit(db, `login-ip:${ip}`, 20, 900);
    const data = await body(request),
      username = text(data, "username", 3, 32).toLowerCase(),
      password = text(data, "password", 1, 128, false);
    // Registration never permits these names. Valid-looking unknown names
    // still run the dummy KDF, preserving the login timing protection.
    if (!/^[a-z0-9_]+$/.test(username))
      fail(
        401,
        "INVALID_CREDENTIALS",
        "用户名或密码错误 / Incorrect username or password",
      );
    await limit(db, `login-user:${username}`, 10, 900);
    const user = await db
      .prepare("SELECT * FROM users WHERE username=?")
      .bind(username)
      .first<User>();
    if (!(await verifyPassword(password, user?.password_hash)))
      fail(
        401,
        "INVALID_CREDENTIALS",
        "用户名或密码错误 / Incorrect username or password",
      );
    if (!user || user.status !== "approved")
      return json(
        {
          code: "ACCOUNT_STATUS",
          status: user?.status,
          message: "账号尚未获准登录 / Account not approved",
        },
        403,
      );
    if (needsPasswordUpgrade(user.password_hash)) {
      const replacement = await hashPassword(password);
      const updated = await db
        .prepare(
          "UPDATE users SET password_hash=?,version=version+1 WHERE id=? AND password_hash=? AND status='approved'",
        )
        .bind(replacement, user.id, user.password_hash)
        .run();
      if (updated.meta.changes) user.password_hash = replacement;
      else {
        const current = await db
          .prepare("SELECT password_hash,status FROM users WHERE id=?")
          .bind(user.id)
          .first<{ password_hash: string; status: string }>();
        if (
          !current ||
          current.status !== "approved" ||
          !(await verifyPassword(password, current.password_hash))
        )
          fail(
            409,
            "ACCOUNT_CHANGED",
            "账号已更新，请重试 / Account changed; retry",
          );
        user.password_hash = current.password_hash;
      }
    }
    const token = randomToken(),
      tokenHash = await digest(token);
    // Recheck password and status atomically: a concurrent disable/reset cannot create a surviving session.
    const result = await db
      .prepare(
        "INSERT INTO sessions(token_hash,user_id,expires_at,created_at) SELECT ?,id,?,? FROM users WHERE id=? AND password_hash=? AND status='approved'",
      )
      .bind(tokenHash, now() + 604800, now(), user.id, user.password_hash)
      .run();
    if (!result.meta.changes)
      fail(
        409,
        "ACCOUNT_CHANGED",
        "账号已更新，请重试 / Account changed; retry",
      );
    return json({ user: publicUser(user) }, 200, {
      "Set-Cookie": setCookie(SESSION, token, 604800),
    });
  }
  if (method === "GET" && path === "/api/auth/me") {
    const user = await session(request, db);
    return json({ user: user ? publicUser(user) : null });
  }
  if (method === "POST" && path === "/api/auth/logout") {
    await db
      .prepare("DELETE FROM sessions WHERE token_hash=?")
      .bind(await digest(cookie(request, SESSION)))
      .run();
    return json({ ok: true }, 200, { "Set-Cookie": setCookie(SESSION, "", 0) });
  }
  if (method === "POST" && path === "/api/auth/reset-password") {
    await limit(db, `reset:${ip}`, 5, 3600);
    const data = await body(request),
      token = text(data, "token", 64, 64),
      password = newPassword(data);
    const tokenHash = await digest(token);
    const valid = await db
      .prepare(
        "SELECT user_id FROM reset_tokens WHERE token_hash=? AND used_at IS NULL AND expires_at>?",
      )
      .bind(tokenHash, now())
      .first();
    if (!valid)
      fail(
        400,
        "INVALID_RESET",
        "重置凭据无效或已过期 / Invalid or expired reset credential",
      );
    const hash = await hashPassword(password),
      time = now();
    const results = await db.batch([
      db
        .prepare(
          "UPDATE users SET password_hash=?,version=version+1 WHERE id=(SELECT user_id FROM reset_tokens WHERE token_hash=? AND used_at IS NULL AND expires_at>?)",
        )
        .bind(hash, tokenHash, time),
      db
        .prepare(
          "UPDATE reset_tokens SET used_at=? WHERE token_hash=? AND changes()=1",
        )
        .bind(time, tokenHash),
    ]);
    if (!results[0].meta.changes)
      fail(
        400,
        "INVALID_RESET",
        "重置凭据无效或已过期 / Invalid or expired reset credential",
      );
    return json({ ok: true });
  }
  if (path.startsWith("/api/content/")) {
    await requireUser(request, db);
    if (method !== "GET") fail(405, "METHOD_NOT_ALLOWED", "Method not allowed");
    const key = path.slice("/api/content/".length);
    return content(db, key);
  }
  if (path.startsWith("/api/admin/")) {
    const admin = await requireUser(request, db, true);
    if (method === "GET" && path === "/api/admin/users") {
      const url = new URL(request.url),
        status = url.searchParams.get("status") ?? "",
        page = Math.max(
          1,
          Math.min(100000, Number(url.searchParams.get("page")) || 1),
        );
      if (
        status &&
        !["pending", "approved", "rejected", "disabled"].includes(status)
      )
        fail(400, "INVALID_STATUS", "Invalid status");
      const [users, pending, total] = await Promise.all([
        db
          .prepare(
            "SELECT id,username,nickname,reason,role,status,created_at,version FROM users WHERE (?='' OR status=?) ORDER BY created_at DESC,id LIMIT 30 OFFSET ?",
          )
          .bind(status, status, (Math.floor(page) - 1) * 30)
          .all(),
        db
          .prepare("SELECT count(*) AS count FROM users WHERE status='pending'")
          .first<{ count: number }>(),
        db
          .prepare(
            "SELECT count(*) AS count FROM users WHERE (?='' OR status=?)",
          )
          .bind(status, status)
          .first<{ count: number }>(),
      ]);
      return json({
        users: users.results,
        pendingCount: pending?.count ?? 0,
        total: total?.count ?? 0,
        page: Math.floor(page),
      });
    }
    const review = path.match(/^\/api\/admin\/users\/([^/]+)$/);
    if (method === "PATCH" && review) {
      const data = await body(request),
        action = text(data, "action", 1, 20),
        note = text(data, "note", 0, 2000);
      const user = await db
        .prepare("SELECT * FROM users WHERE id=?")
        .bind(review[1])
        .first<User>();
      if (!user) fail(404, "NOT_FOUND", "账号不存在 / User not found");
      if (user.role === "admin")
        fail(
          403,
          "ADMIN_PROTECTED",
          "此入口不可修改管理员 / Administrator protected",
        );
      if (data.version !== user.version)
        fail(
          409,
          "STALE_REVIEW",
          "申请已被更新，请刷新 / Refresh this application",
        );
      const transitions: Record<string, { from: string[]; to: string }> = {
        approve: { from: ["pending", "rejected"], to: "approved" },
        reject: { from: ["pending"], to: "rejected" },
        disable: { from: ["approved"], to: "disabled" },
        enable: { from: ["disabled"], to: "approved" },
      };
      const transition = transitions[action];
      if (!transition || !transition.from.includes(user.status))
        fail(
          409,
          "INVALID_TRANSITION",
          "当前状态不支持此操作 / Invalid status transition",
        );
      const result = await db.batch([
        db
          .prepare(
            "UPDATE users SET status=?,version=version+1 WHERE id=? AND version=? AND status=?",
          )
          .bind(transition.to, user.id, user.version, user.status),
        db
          .prepare(
            "INSERT INTO review_logs(id,user_id,admin_id,action,note,created_at) SELECT ?,?,?,?,?,? WHERE changes()=1",
          )
          .bind(crypto.randomUUID(), user.id, admin.id, action, note, now()),
      ]);
      if (!result[0].meta.changes)
        fail(
          409,
          "STALE_REVIEW",
          "申请已被更新，请刷新 / Refresh this application",
        );
      return json({ ok: true });
    }
    const logs = path.match(/^\/api\/admin\/users\/([^/]+)\/reviews$/);
    if (method === "GET" && logs) {
      const result = await db
        .prepare(
          "SELECT l.*,u.username AS admin_username FROM review_logs l JOIN users u ON u.id=l.admin_id WHERE l.user_id=? ORDER BY l.created_at DESC,l.id DESC LIMIT 100",
        )
        .bind(logs[1])
        .all();
      return json({ logs: result.results });
    }
    const reset = path.match(
      /^\/api\/admin\/users\/([^/]+)\/reset-credential$/,
    );
    if (method === "POST" && reset) {
      await limit(db, `admin-reset:${admin.id}`, 20, 3600);
      const data = await body(request),
        note = text(data, "note", 1, 2000);
      const target = await db
        .prepare("SELECT role FROM users WHERE id=?")
        .bind(reset[1])
        .first<{ role: string }>();
      if (!target) fail(404, "NOT_FOUND", "User not found");
      if (target.role === "admin")
        fail(
          403,
          "ADMIN_PROTECTED",
          "此入口不可重置管理员 / Administrator protected",
        );
      const token = randomToken();
      await db.batch([
        db.prepare("DELETE FROM reset_tokens WHERE user_id=?").bind(reset[1]),
        db
          .prepare(
            "INSERT INTO reset_tokens(token_hash,user_id,expires_at) VALUES(?,?,?)",
          )
          .bind(await digest(token), reset[1], now() + 900),
        db.prepare("DELETE FROM sessions WHERE user_id=?").bind(reset[1]),
        db
          .prepare(
            "INSERT INTO review_logs(id,user_id,admin_id,action,note,created_at) VALUES(?,?,?,?,?,?)",
          )
          .bind(
            crypto.randomUUID(),
            reset[1],
            admin.id,
            "issue_reset",
            note,
            now(),
          ),
      ]);
      return json({ token, expiresAt: now() + 900 }, 201);
    }
    if (method === "GET" && path === "/api/admin/invites") {
      const page = Math.floor(
        Math.max(
          1,
          Math.min(
            100000,
            Number(new URL(request.url).searchParams.get("page")) || 1,
          ),
        ),
      );
      const rows = await db
        .prepare(
          "SELECT id,expires_at,max_uses,uses,revoked,created_at FROM invites ORDER BY created_at DESC,id LIMIT 30 OFFSET ?",
        )
        .bind((page - 1) * 30)
        .all();
      const total = await db
        .prepare("SELECT count(*) AS count FROM invites")
        .first<{ count: number }>();
      return json({ invites: rows.results, total: total?.count ?? 0, page });
    }
    if (method === "POST" && path === "/api/admin/invites") {
      const data = await body(request),
        maxUses = data.maxUses,
        expiresAt = data.expiresAt;
      if (
        typeof maxUses !== "number" ||
        !Number.isInteger(maxUses) ||
        maxUses < 1 ||
        maxUses > 1000 ||
        typeof expiresAt !== "number" ||
        !Number.isInteger(expiresAt) ||
        expiresAt <= now() ||
        expiresAt > now() + 31536000
      )
        fail(
          400,
          "INVALID_INPUT",
          "次数须为 1–1000，有效期不超过一年 / Invalid invite limits",
        );
      const code = randomToken(),
        id = crypto.randomUUID();
      await db
        .prepare(
          "INSERT INTO invites(id,code_hash,expires_at,max_uses,created_by,created_at) VALUES(?,?,?,?,?,?)",
        )
        .bind(id, await digest(code), expiresAt, maxUses, admin.id, now())
        .run();
      return json({ id, code }, 201);
    }
    const invite = path.match(/^\/api\/admin\/invites\/([^/]+)$/);
    if (method === "PATCH" && invite) {
      const data = await body(request);
      if (data.action !== "revoke")
        fail(400, "INVALID_INPUT", "Only revoke is supported");
      const result = await db
        .prepare("UPDATE invites SET revoked=1 WHERE id=?")
        .bind(invite[1])
        .run();
      if (!result.meta.changes) fail(404, "NOT_FOUND", "Invite not found");
      return json({ ok: true });
    }
  }
  return fail(404, "NOT_FOUND", "接口不存在 / Endpoint not found");
}

export default {
  async fetch(
    request: Request,
    env: Env & { ASSETS: Fetcher },
  ): Promise<Response> {
    try {
      const url = new URL(request.url);
      let path: string;
      try {
        path = decodeURIComponent(url.pathname).replace(/\/+$/, "") || "/";
      } catch {
        return json({ code: "INVALID_PATH" }, 400);
      }
      if (
        path.includes("\\") ||
        path
          .split("/")
          .some((segment) => segment === "." || segment === "..") ||
        /[\x00-\x1f]/.test(path)
      )
        return json({ code: "INVALID_PATH" }, 400);
      // The allowlist contains only data-free shells, framework code and decorative assets.
      const publicPath =
        [
          "/",
          "/index.html",
          "/login",
          "/login/index.html",
          "/register",
          "/register/index.html",
          "/reset-password",
          "/reset-password/index.html",
          "/favicon.ico",
          "/icon.png",
        ].includes(path) ||
        (path.startsWith("/_next/static/") && !path.endsWith(".map")) ||
        path.startsWith("/brand/") ||
        [
          "/images/hero-scene.webp",
          "/images/landing-hero.webp",
          "/images/lovismind-cover.png",
          "/images/preface-warm-light.png",
          "/images/vault-preview/agent.png",
          "/images/vault-preview/ai-shelf.png",
          "/images/vault-preview/linear-algebra.png",
          "/images/vault-preview/mobile.jpg",
          "/images/wechat-pay.png",
        ].includes(path) ||
        path === "/index.txt" ||
        path.startsWith("/__next.") ||
        path.startsWith("/__next/") ||
        /^\/(login|register|reset-password)\/(index\.txt|__next[./].*\.txt)$/.test(
          path,
        );
      if (!env.DB) {
        if (publicPath) return env.ASSETS.fetch(request);
        return json(
          {
            code: "BACKEND_UNAVAILABLE",
            message: "后端尚未配置 / Backend unavailable",
          },
          503,
        );
      }
      const db = env.DB.withSession("first-primary");
      if (path.startsWith("/api/")) return await api(request, db, path);
      if (!["GET", "HEAD"].includes(request.method))
        return json({ code: "METHOD_NOT_ALLOWED" }, 405);
      if (publicPath) return env.ASSETS.fetch(request);
      const user = await session(request, db);
      if (!user) {
        if (request.headers.get("Accept")?.includes("text/html"))
          return new Response(null, {
            status: 303,
            headers: {
              Location: "/login/?next=" + encodeURIComponent(url.pathname),
              "Cache-Control": "no-store",
            },
          });
        return json({ code: "UNAUTHENTICATED" }, 401);
      }
      if (path.startsWith("/admin") && user.role !== "admin")
        return json({ code: "FORBIDDEN" }, 403);
      const response = await env.ASSETS.fetch(request);
      const headers = new Headers(response.headers);
      headers.set("Cache-Control", "private, no-store");
      headers.set("X-Content-Type-Options", "nosniff");
      return new Response(response.body, { status: response.status, headers });
    } catch (error) {
      if (error instanceof HttpError)
        return json({ code: error.code, message: error.message }, error.status);
      // Do not log request bodies, hashes, credentials or database error text.
      console.error(
        JSON.stringify({
          event: "request_failed",
          requestId: crypto.randomUUID(),
        }),
      );
      return json(
        {
          code: "INTERNAL_ERROR",
          message: "服务暂时不可用，请稍后再试 / Service unavailable",
        },
        500,
      );
    }
  },
};
