import {
  digest,
  equal,
  hashPassword,
  randomToken,
  verifyPassword,
  needsPasswordUpgrade,
} from "./password";
import { isValidPassword } from "../lib/password-policy";
import { decryptInvite, importInviteKey, InviteStorageError, normalizeInviteCode, storeInvite } from "./invites";

// Secrets are provisioned separately from Wrangler's generated resource bindings.
type AppEnv = Env & { INVITE_CODE_ENCRYPTION_KEY?: string; ACCOUNT_CHANGE_PASSWORD_ENABLED?: string; ACCOUNT_DELETE_ENABLED?: string };
declare const RSC_PATHS: Record<string, string>;
declare const CONTENT_VERSION: string;
declare const RELEASE_COMMIT: string;

function fetchAsset(request: Request, env: { ASSETS: Fetcher }, path: string) {
  // Resolve only build-recorded aliases, after the caller's normal access check.
  const asset = Object.hasOwn(RSC_PATHS, path) ? RSC_PATHS[path] : undefined;
  if (!asset) return env.ASSETS.fetch(request);
  const url = new URL(request.url);
  url.pathname = asset;
  return env.ASSETS.fetch(new Request(url, request));
}

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
    public headers: Record<string, string> = {},
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
async function limit(db: DB, key: string, max: number, seconds: number,
  error: { code: string; message: string } = { code: "RATE_LIMITED", message: "尝试过多，请稍后再试 / Too many attempts" },
) {
  const time = now();
  const row = await db
    .prepare(
      `INSERT INTO rate_limits(key,count,expires_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN expires_at<=? THEN 1 ELSE count+1 END, expires_at=CASE WHEN expires_at<=? THEN excluded.expires_at ELSE expires_at END RETURNING count,expires_at`,
    )
    .bind(await digest(key), time + seconds, time, time)
    .first<{ count: number; expires_at: number }>();
  if (!row || row.count > max) {
    throw new HttpError(429, error.code, error.message, {
      "Retry-After": String(Math.max(1, (row?.expires_at ?? time + seconds) - time)),
    });
  }
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
      "SELECT json FROM content_entries WHERE version_id=? AND key=?",
    )
    .bind(CONTENT_VERSION, key)
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
type FavoriteTitle = { zh: string; en: string };
declare const FAVORITE_TITLES: Record<string, FavoriteTitle>;

const BOOK_ALIASES: Record<string, string> = {
  "image-generation-workflows": "agent-engineering",
};

function canonicalBook(book: string) {
  return BOOK_ALIASES[book] ?? book;
}

/** Every stored book key that should be read or cleared for a canonical book. */
function favoriteBookKeys(book: string) {
  const canonical = canonicalBook(book);
  return [canonical, ...Object.keys(BOOK_ALIASES).filter((legacy) => BOOK_ALIASES[legacy] === canonical)];
}

function favoritePath(book: string, chapter: string) {
  return `/books/${book}/${chapter ? chapter + "/" : ""}`;
}

function legacyBookRedirect(path: string) {
  const from = "/books/image-generation-workflows";
  if (path !== from && !path.startsWith(from + "/")) return null;
  const rest = path.slice(from.length).replace(/^\/+/, "");
  if (!rest) return "/books/agent-engineering/";
  const target = "/books/agent-engineering/" + rest;
  // Directory routes keep the export's trailing slash; file-like suffixes
  // (index.html, index.txt, prefetch payloads) stay untouched.
  return /\.[a-z0-9]+$/i.test(rest) ? target : target + "/";
}

function favoriteTarget(book: unknown, chapter: unknown) {
  const slug = /^[a-z0-9][a-z0-9-]{0,159}$/;
  if (
    typeof book !== "string" || !slug.test(book) ||
    typeof chapter !== "string" || (chapter !== "" && !slug.test(chapter))
  ) fail(400, "INVALID_TARGET", "收藏目标无效 / Invalid favorite target");
  return { book, chapter };
}

async function favoritesApi(request: Request, db: DB, path: string) {
  const user = await requireUser(request, db);
  const method = request.method;
  const query = new URL(request.url).searchParams;
  if (method === "GET" && path === "/api/favorites") {
    const { results } = await db.prepare(
      "SELECT book,chapter FROM favorites WHERE user_id=? ORDER BY created_at DESC,rowid DESC",
    ).bind(user.id).all<{ book: string; chapter: string }>();
    const seen = new Set<string>();
    const items: { book: string; chapter: string; href: string | null; title: FavoriteTitle | null }[] = [];
    for (const item of results) {
      const book = canonicalBook(item.book);
      const key = book + "\u0000" + item.chapter;
      if (seen.has(key)) continue;
      seen.add(key);
      // Prefer the canonical route; fall back to the legacy route so a
      // favorite whose chapter was not carried over stays reachable.
      const canonicalHref = favoritePath(book, item.chapter);
      const legacyHref = favoritePath(item.book, item.chapter);
      const href = FAVORITE_TITLES[canonicalHref]
        ? canonicalHref
        : FAVORITE_TITLES[legacyHref] ? legacyHref : null;
      items.push({ book, chapter: item.chapter, href, title: href ? FAVORITE_TITLES[href] : null });
    }
    return json({ items });
  }
  if (method === "GET" && path === "/api/favorites/status") {
    const { book, chapter } = favoriteTarget(query.get("book"), query.get("chapter") ?? "");
    const books = favoriteBookKeys(book);
    const found = await db.prepare(
      `SELECT 1 FROM favorites WHERE user_id=? AND book IN (${books.map(() => "?").join(",")}) AND chapter=?`,
    ).bind(user.id, ...books, chapter).first();
    return json({ saved: Boolean(found) });
  }
  if (method === "POST" && path === "/api/favorites") {
    const data = await body(request);
    const { book: requested, chapter } = favoriteTarget(data.book, data.chapter ?? "");
    const book = canonicalBook(requested);
    if (typeof data.saved !== "boolean")
      fail(400, "INVALID_STATE", "收藏状态无效 / Invalid favorite state");
    if (data.saved) {
      if (!FAVORITE_TITLES[favoritePath(book, chapter)])
        fail(404, "NOT_FOUND", "内容已下架 / Content unavailable");
      await db.prepare(
        "INSERT INTO favorites(user_id,book,chapter) VALUES(?,?,?) ON CONFLICT DO NOTHING",
      ).bind(user.id, book, chapter).run();
    } else {
      // Removing a favorite also clears the pre-merge row when present.
      const books = favoriteBookKeys(requested);
      await db.prepare(
        `DELETE FROM favorites WHERE user_id=? AND book IN (${books.map(() => "?").join(",")}) AND chapter=?`,
      ).bind(user.id, ...books, chapter).run();
    }
    return json({ saved: data.saved });
  }
  return fail(404, "NOT_FOUND", "接口不存在 / Endpoint not found");
}

type GuestbookRow = {
  id: number; user_id: string; message: string; created_at: number; nickname: string;
  parent_id: number | null; reply_to_nickname: string;
};
type GuestbookItem = {
  id: number; message: string; created_at: number; nickname: string; own: boolean;
  parentId: number | null; replyTo: string; replies: GuestbookItem[];
};
function guestbookItem(row: GuestbookRow, viewerId: string): GuestbookItem {
  return {
    id: row.id,
    message: row.message,
    created_at: row.created_at,
    nickname: row.nickname,
    own: row.user_id === viewerId,
    parentId: row.parent_id,
    replyTo: row.reply_to_nickname,
    replies: [],
  };
}
async function guestbookApi(request: Request, db: DB, path: string) {
  const moderation = path === "/api/admin/guestbook";
  const user = await requireUser(request, db, moderation);
  const method = request.method;
  if (method === "GET") {
    const before = Number(new URL(request.url).searchParams.get("before") ?? Number.MAX_SAFE_INTEGER);
    if (!Number.isSafeInteger(before) || before < 1)
      fail(400, "INVALID_CURSOR", "分页参数无效 / Invalid page cursor");
    // Public pages list roots newest-first; hidden-site moderation lists every
    // hidden entry flat, so a hidden reply stays actionable on its own.
    const { results } = await db.prepare(
      moderation
        ? "SELECT g.id,g.user_id,g.message,g.created_at,g.parent_id,g.reply_to_nickname,u.nickname FROM guestbook_entries g JOIN users u ON u.id=g.user_id WHERE g.hidden=1 AND g.id<? ORDER BY g.id DESC LIMIT 21"
        : "SELECT g.id,g.user_id,g.message,g.created_at,g.parent_id,g.reply_to_nickname,u.nickname FROM guestbook_entries g JOIN users u ON u.id=g.user_id WHERE g.parent_id IS NULL AND g.hidden=0 AND g.id<? ORDER BY g.id DESC LIMIT 21",
    ).bind(before).all<GuestbookRow>();
    const items = results.slice(0, 20).map((row) => guestbookItem(row, user.id));
    if (!moderation && items.length) {
      const placeholders = items.map(() => "?").join(",");
      const { results: replies } = await db.prepare(
        `SELECT g.id,g.user_id,g.message,g.created_at,g.parent_id,g.reply_to_nickname,u.nickname FROM guestbook_entries g JOIN users u ON u.id=g.user_id WHERE g.parent_id IN (${placeholders}) AND g.hidden=0 ORDER BY g.id ASC`,
      ).bind(...items.map((item) => item.id)).all<GuestbookRow>();
      const threads = new Map(items.map((item) => [item.id, item]));
      for (const row of replies)
        threads.get(row.parent_id!)?.replies.push(guestbookItem(row, user.id));
    }
    return json({ items, next: results.length > 20 ? items[19].id : null, canModerate: user.role === "admin" });
  }
  if (method === "POST") {
    const data = await body(request);
    if (path === "/api/guestbook" && data.action === "publish") {
      const message = text(data, "message", 1, 1000);
      // Replies always attach to the thread root. Replying to a reply records
      // that reply's author as the visible target, keeping one level of depth.
      let parentId: number | null = null, replyTo = "";
      if (data.parentId !== undefined && data.parentId !== null) {
        const targetId = data.parentId;
        if (typeof targetId !== "number" || !Number.isSafeInteger(targetId) || targetId < 1)
          fail(400, "INVALID_PARENT", "回复目标无效 / Invalid reply target");
        const target = await db.prepare(
          "SELECT g.id,g.parent_id,g.hidden,u.nickname FROM guestbook_entries g JOIN users u ON u.id=g.user_id WHERE g.id=?",
        ).bind(targetId).first<{
          id: number; parent_id: number | null; hidden: number; nickname: string;
        }>();
        if (!target || target.hidden)
          fail(404, "NOT_FOUND", "留言不存在或已隐藏 / Message unavailable");
        const rootId = target.parent_id ?? target.id;
        if (rootId !== target.id) {
          const root = await db.prepare("SELECT hidden FROM guestbook_entries WHERE id=?")
            .bind(rootId).first<{ hidden: number }>();
          if (!root || root.hidden)
            fail(404, "NOT_FOUND", "留言不存在或已隐藏 / Message unavailable");
        }
        parentId = rootId;
        replyTo = target.nickname;
      }
      await limit(db, `guestbook:v2:${user.id}`, 20, 60, {
        code: "GUESTBOOK_RATE_LIMITED",
        message: "留言发送较频繁，请稍后再试 / Posting too frequently; please try again shortly",
      });
      const createdAt = now();
      const entry = await db.prepare(
        "INSERT INTO guestbook_entries(user_id,message,parent_id,reply_to_nickname,created_at) VALUES(?,?,?,?,?) RETURNING id",
      ).bind(user.id, message, parentId, replyTo, createdAt).first<{ id: number }>();
      if (!entry) fail(500, "SAVE_FAILED", "留言保存失败 / Could not save message");
      return json({
        item: {
          id: entry.id, message, created_at: createdAt, nickname: user.nickname, own: true,
          parentId, replyTo, replies: [],
        } satisfies GuestbookItem,
      }, 201);
    }
    const id = data.id;
    if (typeof id !== "number" || !Number.isSafeInteger(id) || id < 1)
      fail(400, "INVALID_ID", "留言编号无效 / Invalid message ID");
    if (moderation && (data.action === "hide" || data.action === "restore")) {
      const result = await db.prepare("UPDATE guestbook_entries SET hidden=? WHERE id=?")
        .bind(data.action === "hide" ? 1 : 0, id).run();
      if (!result.meta.changes) fail(404, "NOT_FOUND", "留言不存在 / Message not found");
      return json({ ok: true });
    }
    if (!moderation && data.action === "delete") {
      const result = await db.prepare("DELETE FROM guestbook_entries WHERE id=? AND user_id=?")
        .bind(id, user.id).run();
      if (!result.meta.changes) fail(404, "NOT_FOUND", "留言不存在 / Message not found");
      return json({ ok: true });
    }
  }
  return fail(404, "NOT_FOUND", "接口不存在 / Endpoint not found");
}


function submissionTitle(message: string, url: string, source: string) {
    let base = message.split(/\r?\n/).map((line) => line.trim()).find(Boolean) ?? '';
    if (!base && url) {
        try {
            const path = decodeURIComponent(new URL(url).pathname).replace(/\/+$/, '');
            base = new URL(url).hostname + (path && path !== '/' ? path : '');
        }
        catch {
            base = url;
        }
    }
    base = (base || '投稿 / Submission').slice(0, 100);
    if (source === 'donation') {
        const prefix = '打赏捎信 · ';
        base = (base.startsWith(prefix) ? base : prefix + base).slice(0, 100);
    }
    return base;
}

async function submissionsApi(request: Request, db: DB, path: string) {
    const admin = path === '/api/admin/submissions', user = await requireUser(request, db, admin);
    if (request.method === 'GET') {
        const params = new URL(request.url).searchParams, before = Number(params.get('before') ?? Number.MAX_SAFE_INTEGER), status = params.get('status') ?? '';
        if (!Number.isSafeInteger(before) || before < 1 || !['', 'pending', 'adopted', 'declined'].includes(status))
            fail(400, 'INVALID_FILTER', '筛选无效 / Invalid filter');
        const where = admin ? "id<? AND (?='' OR status=?)" : "user_id=? AND id<?";
        const query = db.prepare(`SELECT id,title,summary,message,url,status,note,source,created_at FROM submissions WHERE ${where} ORDER BY id DESC LIMIT 21`);
        const { results } = await (admin ? query.bind(before, status, status) : query.bind(user.id, before)).all();
        const items = results.slice(0, 20);
        return json({ items, next: results.length > 20 ? items[19].id : null, canModerate: user.role === 'admin' });
    }
    if (request.method !== 'POST')
        fail(405, 'METHOD_NOT_ALLOWED', '不支持此操作 / Method not allowed');
    const data: Record<string, unknown> = { summary: '', message: '', url: '', note: '', ...await body(request) };
    if (admin) {
        if (!Number.isSafeInteger(data.id) || !['pending', 'adopted', 'declined'].includes(String(data.status)))
            fail(400, 'INVALID_STATUS', '状态无效 / Invalid status');
        const result = await db.prepare('UPDATE submissions SET status=?,note=? WHERE id=?').bind(data.status, text(data, 'note', 0, 300), data.id).run();
        if (!result.meta.changes)
            fail(404, 'NOT_FOUND', '投稿不存在 / Submission not found');
        return json({ ok: true });
    }
    if (data.action === 'withdraw') {
        if (!Number.isSafeInteger(data.id))
            fail(400, 'INVALID_ID', '编号无效 / Invalid ID');
        const result = await db.prepare("DELETE FROM submissions WHERE id=? AND user_id=? AND status!='adopted'").bind(data.id, user.id).run();
        if (!result.meta.changes)
            fail(404, 'NOT_FOUND', '投稿不存在或不能撤回 / Cannot withdraw');
        return json({ ok: true });
    }
    const requestId = text(data, 'requestId', 36, 36);
    if (!/^[a-f0-9-]{36}$/i.test(requestId))
        fail(400, 'INVALID_ID', '请求编号无效 / Invalid request ID');
    const old = await db.prepare('SELECT id FROM submissions WHERE user_id=? AND request_id=?').bind(user.id, requestId).first();
    if (old)
        return json({ ok: true, id: old.id });
    const summary = text(data, 'summary', 0, 300), message = text(data, 'message', 0, 2000), url = text(data, 'url', 0, 2048);
    // `source` is a server-side marker only. No payment state is checked or
    // stored; the donation dialog merely chooses the note's provenance label.
    const source = data.source === undefined || data.source === '' ? '' : data.source;
    if (source !== '' && source !== 'donation')
        fail(400, 'INVALID_SOURCE', '来源无效 / Invalid source');
    if (!message && !url)
        fail(400, 'EMPTY_SUBMISSION', '请填写正文或链接 / Add text or a link');
    if (url) {
        try {
            if (!['http:', 'https:'].includes(new URL(url).protocol))
                throw new Error();
        }
        catch {
            fail(400, 'INVALID_URL', '仅支持 HTTP/HTTPS 链接 / HTTP(S) links only');
        }
    }
    // Titles are derived here so callers cannot inject a misleading label.
    const title = submissionTitle(message, url, source);
    await limit(db, `submission-user:${user.id}`, 3, 86400);
    await limit(db, `submission-ip:${request.headers.get('CF-Connecting-IP') ?? 'local'}`, 20, 86400);
    const row = await db.prepare("INSERT OR IGNORE INTO submissions(user_id,request_id,title,summary,message,url,source) SELECT ?,?,?,?,?,?,? WHERE (SELECT count(*) FROM submissions WHERE user_id=? AND status='pending')<5 RETURNING id").bind(user.id, requestId, title, summary, message, url, source, user.id).first();
    if (!row) {
        const prior = await db.prepare('SELECT id FROM submissions WHERE user_id=? AND request_id=?').bind(user.id, requestId).first();
        if (prior)
            return json({ ok: true, id: prior.id });
        fail(429, 'PENDING_LIMIT', '最多保留五条待处理投稿 / Five pending submissions maximum');
    }
    return json({ ok: true, id: row.id }, 201);
}
async function accountApi(request: Request, db: DB, path: string, env: AppEnv) {
    const features = { changePassword: env.ACCOUNT_CHANGE_PASSWORD_ENABLED === '1', deleteAccount: env.ACCOUNT_DELETE_ENABLED === '1' };
    const user = await requireUser(request, db);
    if (request.method === 'GET' && path === '/api/account/settings')
        return json({ features, username: user.username, role: user.role });
    const deleting = path === '/api/account/delete';
    if (request.method !== 'POST' || !['/api/account/delete', '/api/account/password'].includes(path))
        fail(404, 'NOT_FOUND', '接口不存在 / Not found');
    if (!(deleting ? features.deleteAccount : features.changePassword))
        fail(503, 'FEATURE_UNAVAILABLE', '此功能尚未通过免费额度验证，请联系管理员 / Feature awaiting CPU validation; contact the administrator');
    if (deleting && user.role === 'admin')
        fail(403, 'ADMIN_DELETE_FORBIDDEN', '管理员不能自助注销 / Administrators cannot delete themselves');
    await limit(db, `account:${user.id}`, 5, 3600);
    await limit(db, `account-ip:${request.headers.get('CF-Connecting-IP') ?? 'local'}`, 20, 3600);
    const data = await body(request), current = await db.prepare('SELECT password_hash FROM users WHERE id=?').bind(user.id).first<{
        password_hash: string;
    }>();
    if (!current || needsPasswordUpgrade(current.password_hash))
        fail(409, 'MIGRATION_REQUIRED', '请先联系管理员迁移密码 / Password migration required');
    if (!await verifyPassword(text(data, 'currentPassword', 1, 128, false), current.password_hash))
        fail(400, 'INVALID_PASSWORD', '当前密码不正确 / Incorrect current password');
    if (deleting) {
        if (data.username !== user.username)
            fail(400, 'CONFIRMATION_REQUIRED', '请准确输入用户名 / Enter your username exactly');
        const guard = "EXISTS(SELECT 1 FROM users WHERE id=? AND password_hash=? AND status='approved' AND role='user')";
        const statements = ['reset_tokens', 'review_logs', 'submissions', 'favorites', 'guestbook_entries', 'sessions'].map(table => db.prepare(`DELETE FROM ${table} WHERE ${table === 'review_logs' ? '(user_id=? OR admin_id=?)' : 'user_id=?'} AND ${guard}`).bind(...(table === 'review_logs' ? [user.id, user.id] : [user.id]), user.id, current.password_hash));
        const results = await db.batch([...statements, db.prepare("DELETE FROM users WHERE id=? AND password_hash=? AND status='approved' AND role='user'").bind(user.id, current.password_hash)]);
        if (!results.at(-1)?.meta.changes)
            fail(409, 'STALE_ACCOUNT', '账号已变化，请重新登录 / Account changed; sign in again');
    }
    else {
        const hash = await hashPassword(newPassword(data));
        const results = await db.batch([db.prepare("UPDATE users SET password_hash=?,version=version+1 WHERE id=? AND password_hash=? AND status='approved'").bind(hash, user.id, current.password_hash), db.prepare('DELETE FROM reset_tokens WHERE user_id=? AND EXISTS(SELECT 1 FROM users WHERE id=? AND password_hash=?)').bind(user.id, user.id, hash)]);
        if (!results[0].meta.changes)
            fail(409, 'STALE_ACCOUNT', '账号已变化，请重新登录 / Account changed; sign in again');
    }
    return json({ ok: true }, 200, { 'Set-Cookie': setCookie(SESSION, '', 0) });
}

async function api(request: Request, db: DB, path: string, env: AppEnv) {
  const method = request.method;
  if (method === "GET" && path === "/api/auth/csrf") {
    const token = randomToken();
    return json({ token }, 200, { "Set-Cookie": setCookie(CSRF, token, 3600) });
  }
  if (!["GET", "HEAD"].includes(method)) csrf(request);
  if (path === "/api/submissions" || path === "/api/admin/submissions") return submissionsApi(request,db,path);
  if (path.startsWith("/api/account/")) return accountApi(request,db,path,env);
  if (path === "/api/guestbook" || path === "/api/admin/guestbook")
    return guestbookApi(request, db, path);
  if (path === "/api/favorites" || path === "/api/favorites/status")
    return favoritesApi(request, db, path);
  const ip = request.headers.get("CF-Connecting-IP") ?? "local";
  if (method === "POST" && path === "/api/auth/register") {
    await limit(db, `register:${ip}`, 5, 3600);
    const data = await body(request);
    const username = text(data, "username", 3, 32);
    if (!/^[a-z0-9_]+$/i.test(username))
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
      code =
        data.inviteCode === undefined ? "" : text(data, "inviteCode", 0, 128),
      reason = data.reason === undefined ? "" : text(data, "reason", 0, 2000);
    // The form offers two explicit paths. A blank invite is only an application
    // when it carries a reason; neither value must not pass as either path.
    if (!code && !reason)
      fail(
        400,
        "REASON_REQUIRED",
        "没有邀请码时请填写申请理由 / Describe why you are applying when you have no invite",
      );
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
        .bind(await digest(normalizeInviteCode(code)), now())
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
      const [users, counts] = await Promise.all([
        db
          .prepare(
            "SELECT id,username,nickname,reason,role,status,created_at,version FROM users WHERE (?='' OR status=?) ORDER BY created_at DESC,id LIMIT 30 OFFSET ?",
          )
          .bind(status, status, (Math.floor(page) - 1) * 30)
          .all(),
        db
          .prepare("SELECT status,count(*) AS count FROM users GROUP BY status")
          .all<{ status: User["status"]; count: number }>(),
      ]);
      const statusCounts = { pending: 0, approved: 0, rejected: 0, disabled: 0 };
      for (const row of counts.results) statusCounts[row.status] = row.count;
      const accountCount = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);
      return json({
        users: users.results,
        pendingCount: statusCounts.pending,
        total: status ? statusCounts[status as User["status"]] : accountCount,
        accountCount,
        statusCounts,
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
          "SELECT id,code_ciphertext,expires_at,max_uses,uses,revoked,created_at FROM invites ORDER BY created_at DESC,id LIMIT 30 OFFSET ?",
        )
        .bind((page - 1) * 30)
        .all<{ id: string; code_ciphertext: string | null; expires_at: number; max_uses: number; uses: number; revoked: number; created_at: number }>();
      const key = rows.results.some((row) => row.code_ciphertext)
        ? await importInviteKey(env.INVITE_CODE_ENCRYPTION_KEY) : null;
      const invites = await Promise.all(rows.results.map(async ({ code_ciphertext, ...row }) => ({
        ...row,
        code: code_ciphertext && key ? await decryptInvite(code_ciphertext, row.id, key) : null,
      })));
      const total = await db
        .prepare("SELECT count(*) AS count FROM invites")
        .first<{ count: number }>();
      return json({ invites, total: total?.count ?? 0, page });
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
      const key = await importInviteKey(env.INVITE_CODE_ENCRYPTION_KEY);
      return json(await storeInvite(db, { maxUses, expiresAt, adminId: admin.id, createdAt: now() }, key), 201);
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
    env: AppEnv & { ASSETS: Fetcher },
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
      // The submissions page and its prefetch payloads are member-only. Keep
      // this negative guard so widening the public allowlist can never expose it.
      const memberOnlyPath = path === "/submissions" || path.startsWith("/submissions/");
      const publicPath = !memberOnlyPath && (
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
          "/images/lovismind-cover.webp",
          "/images/preface-warm-light.png",
          "/images/preface-warm-light.webp",
          "/images/preface-book-cutout-v1.webp",
          "/images/vault-preview/agent.png",
          "/images/vault-preview/agent.webp",
          "/images/vault-preview/ai-shelf.png",
          "/images/vault-preview/ai-shelf.webp",
          "/images/vault-preview/linear-algebra.png",
          "/images/vault-preview/linear-algebra.webp",
          "/images/vault-preview/mobile.jpg",
          "/images/vault-preview/mobile.webp",
          "/images/wechat-pay.png",
          "/images/alipay.jpg",
        ].includes(path) ||
        path === "/index.txt" ||
        path.startsWith("/__next.") ||
        path.startsWith("/__next/") ||
        /^\/(login|register|reset-password)\/(index\.txt|__next[./].*\.txt)$/.test(
          path,
        )
      );
      if (!env.DB) {
        if (publicPath) return fetchAsset(request, env, path);
        return json(
          {
            code: "BACKEND_UNAVAILABLE",
            message: "后端尚未配置 / Backend unavailable",
          },
          503,
        );
      }
      if ((path === "/account" || path === "/account/index.html") && ["GET", "HEAD"].includes(request.method)) {
        return new Response(null, { status: 308, headers: { Location: "/library/", "Cache-Control": "no-store" } });
      }
      const db = env.DB.withSession("first-primary");
      if (path === "/api/release" && ["GET", "HEAD"].includes(request.method)) {
        const entry = await db.prepare("SELECT json_valid(json) AS ready FROM content_entries WHERE version_id=? AND key='catalog'")
          .bind(CONTENT_VERSION).first<{ ready: number }>();
        return json({ commit: RELEASE_COMMIT, contentVersion: CONTENT_VERSION, ready: entry?.ready === 1 }, entry?.ready === 1 ? 200 : 503);
      }
      if (path.startsWith("/api/")) return await api(request, db, path, env);
      if (!["GET", "HEAD"].includes(request.method))
        return json({ code: "METHOD_NOT_ALLOWED" }, 405);
      if (publicPath) return fetchAsset(request, env, path);
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
      // The image-generation-workflows book was merged into agent-engineering.
      // Authenticated readers keep stable links while old bookmarks resolve.
      const movedBook = legacyBookRedirect(path);
      if (movedBook)
        return new Response(null, { status: 308, headers: { Location: movedBook, "Cache-Control": "no-store" } });
      if (path.startsWith("/admin") && user.role !== "admin")
        return json({ code: "FORBIDDEN" }, 403);
      const response = await fetchAsset(request, env, path);
      const headers = new Headers(response.headers);
      const coverThumbnail = /^\/covers\/[^/]+-(?:240|480)\.webp$/.test(path);
      headers.set("Cache-Control", coverThumbnail ? "private, no-cache" : "private, no-store");
      headers.set("X-Content-Type-Options", "nosniff");
      return new Response(response.body, { status: response.status, headers });
    } catch (error) {
      if (error instanceof InviteStorageError) {
        return json({
          code: error.message,
          message: error.message === "INVITE_GENERATION_BUSY"
            ? "邀请码生成繁忙，请重试 / Invite generation busy; please retry"
            : "邀请码加密配置不可用，请联系管理员检查密钥 / Invite encryption unavailable; check the configured key",
        }, 503);
      }
      if (error instanceof HttpError)
        return json({ code: error.code, message: error.message }, error.status, error.headers);
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
