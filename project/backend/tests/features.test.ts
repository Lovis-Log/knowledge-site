import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';
import { hashPassword } from '../password';
async function fixture(enabled = true) {
    const mf = new Miniflare(convertV4MiniflareOptions({ modules: true, scriptPath: 'out/_worker.js', compatibilityDate: '2026-11-04', compatibilityFlags: ['nodejs_compat'], d1Databases: { DB: 'features' }, bindings: enabled ? { ACCOUNT_CHANGE_PASSWORD_ENABLED: '1', ACCOUNT_DELETE_ENABLED: '1' } : {}, serviceBindings: { ASSETS: () => new Response('PAGE') } }));
    const db = await mf.getD1Database('DB');
    for (const file of ['0001_auth.sql', '0002_content.sql', '0003_reader_interactions.sql', '0004_recoverable_invites.sql', '0005_submissions.sql', '0006_community_replies.sql']) {
        const sql = await readFile('backend/migrations/' + file, 'utf8');
        for (const stmt of sql.split(/;(?=\s*(?:CREATE|ALTER|PRAGMA|$))/))
            if (stmt.trim())
                await db.prepare(stmt).run();
    }
    for (const id of ['reader', 'other', 'admin'])
        await db.prepare("INSERT INTO users(id,username,password_hash,nickname,reason,role,status,created_at) VALUES(?,?,?,?,?,?, 'approved',unixepoch())").bind(id, id, await hashPassword('test123'), id, 'test', id === 'admin' ? 'admin' : 'user').run();
    function client() { let cookie = ''; return { async call(path: string, data?: unknown) { let headers: Record<string, string> = { Cookie: cookie }; if (data) {
            const csrf = await mf.dispatchFetch('https://features.test/api/auth/csrf');
            const token = await csrf.json() as {
                token: string;
            };
            headers = { ...headers, Cookie: cookie + '; ' + csrf.headers.get('set-cookie')!.split(';')[0], Origin: 'https://features.test', 'X-CSRF-Token': token.token, 'Content-Type': 'application/json' };
        } const r = await mf.dispatchFetch('https://features.test' + path, { method: data ? 'POST' : 'GET', headers, body: data ? JSON.stringify(data) : undefined }); const c = r.headers.get('set-cookie'); if (c?.startsWith('__Host-lovismind-session='))
            cookie = c.split(';')[0]; return r; } }; }
    const r = client(), o = client(), a = client();
    for (const [c, name] of [[r, 'reader'], [o, 'other'], [a, 'admin']] as const)
        assert.equal((await c.call('/api/auth/login', { username: name, password: 'test123' })).status, 200);
    return { mf, db, r, o, a };
}
test('private submissions: idempotency, access, moderation, withdrawal and limits', async () => {
    const f = await fixture();
    try {
        const payload = { requestId: crypto.randomUUID(), title: '<script>test</script>', summary: '', message: 'hello', url: '' };
        assert.equal((await f.r.call('/api/submissions', payload)).status, 201);
        assert.equal((await f.r.call('/api/submissions', payload)).status, 200);
        const mine = await (await f.r.call('/api/submissions')).json() as {
            items: {
                id: number;
            }[];
        };
        assert.equal(mine.items.length, 1);
        assert.equal((await (await f.o.call('/api/submissions')).json() as {
            items: unknown[];
        }).items.length, 0);
        assert.equal((await f.o.call('/api/submissions', { action: 'withdraw', id: mine.items[0].id })).status, 404);
        assert.equal((await f.r.call('/api/admin/submissions')).status, 403);
        assert.equal((await f.a.call('/api/admin/submissions', { id: mine.items[0].id, status: 'adopted', note: 'will edit' })).status, 200);
        assert.equal((await f.r.call('/api/submissions', { action: 'withdraw', id: mine.items[0].id })).status, 404);
        assert.equal((await f.o.call('/api/submissions', { ...payload, requestId: crypto.randomUUID(), url: 'javascript:alert(1)' })).status, 400);
        for (let i = 0; i < 2; i++)
            assert.equal((await f.r.call('/api/submissions', { ...payload, requestId: crypto.randomUUID() })).status, 201);
        assert.equal((await f.r.call('/api/submissions', { ...payload, requestId: crypto.randomUUID() })).status, 429);
        assert.equal((await f.r.call('/api/submissions?before=bad')).status, 400);
        await f.db.batch(Array.from({length:21},(_,i)=>f.db.prepare("INSERT INTO submissions(user_id,request_id,title,message,status) VALUES('other',?,?,'fixture','declined')").bind(crypto.randomUUID(),'Page '+i)));
        const page=await (await f.o.call('/api/submissions')).json() as {items:{id:number}[];next:number|null};
        assert.equal(page.items.length,20);assert.ok(page.next);
        const next=await (await f.o.call('/api/submissions?before='+page.next)).json() as {items:{id:number}[]};assert.equal(next.items.length,1);
        await f.db.batch(Array.from({length:5},()=>f.db.prepare("INSERT INTO submissions(user_id,request_id,title,message) VALUES('other',?,'Pending','fixture')").bind(crypto.randomUUID())));
        const blocked=await f.o.call('/api/submissions',{...payload,requestId:crypto.randomUUID()});assert.equal(blocked.status,429);assert.equal((await blocked.json() as {code:string}).code,'PENDING_LIMIT');

    }
    finally {
        await f.mf.dispose();
    }
});
test('guestbook replies attach to the root, record the target and guard hidden threads', async () => {
    const f = await fixture();
    try {
        const publish = (c: { call: (path: string, data?: unknown) => Promise<Response> }, message: string, parentId?: number) =>
            c.call('/api/guestbook', { action: 'publish', message, ...(parentId === undefined ? {} : { parentId }) });
        const rootResponse = await publish(f.r, 'Root message');
        assert.equal(rootResponse.status, 201);
        const root = (await rootResponse.json() as { item: { id: number; parentId: number | null; replyTo: string } }).item;
        assert.equal(root.parentId, null);
        assert.equal(root.replyTo, '');
        const replyResponse = await publish(f.o, 'First reply', root.id);
        assert.equal(replyResponse.status, 201);
        const reply = (await replyResponse.json() as { item: { id: number; parentId: number | null; replyTo: string } }).item;
        assert.equal(reply.parentId, root.id);
        assert.equal(reply.replyTo, 'reader');
        const nestedResponse = await publish(f.a, 'Reply to the reply', reply.id);
        assert.equal(nestedResponse.status, 201);
        const nested = (await nestedResponse.json() as { item: { id: number; parentId: number | null; replyTo: string } }).item;
        assert.equal(nested.parentId, root.id);
        assert.equal(nested.replyTo, 'other');
        const board = await (await f.r.call('/api/guestbook')).json() as {
            items: { id: number; replies: { id: number; message: string; parentId: number; replyTo: string }[] }[];
        };
        const thread = board.items.find((item) => item.id === root.id)!;
        assert.deepEqual(thread.replies.map((item) => item.message), ['First reply', 'Reply to the reply']);
        assert.ok(thread.replies.every((item) => item.parentId === root.id));
        assert.equal(thread.replies[1].replyTo, 'other');
        // Replying to a hidden reply or a visible child of a hidden root must fail.
        assert.equal((await f.a.call('/api/admin/guestbook', { action: 'hide', id: nested.id })).status, 200);
        assert.equal((await publish(f.r, 'to hidden reply', nested.id)).status, 404);
        assert.equal((await f.a.call('/api/admin/guestbook', { action: 'hide', id: root.id })).status, 200);
        assert.equal((await publish(f.o, 'to child of hidden root', reply.id)).status, 404);
        assert.equal((await publish(f.r, 'to hidden root', root.id)).status, 404);
        const publicBoard = await (await f.r.call('/api/guestbook')).json() as { items: { id: number }[] };
        assert.ok(!publicBoard.items.some((item) => item.id === root.id));
        assert.ok((await (await f.a.call('/api/admin/guestbook')).json() as { items: { id: number }[] }).items.some((item) => item.id === root.id));
        assert.equal((await f.a.call('/api/admin/guestbook', { action: 'restore', id: nested.id })).status, 200);
        assert.equal((await f.a.call('/api/admin/guestbook', { action: 'restore', id: root.id })).status, 200);
        // Nonexistent targets fail; owner deletion and root cascade keep old rules.
        assert.equal((await publish(f.r, 'to nowhere', 999999)).status, 404);
        assert.equal((await f.o.call('/api/guestbook', { action: 'delete', id: reply.id })).status, 200);
        assert.equal((await f.r.call('/api/guestbook', { action: 'delete', id: root.id })).status, 200);
        assert.equal((await f.db.prepare('SELECT count(*) AS n FROM guestbook_entries WHERE parent_id=?').bind(root.id).first<{ n: number }>())!.n, 0);
        // Legacy rows created without the new columns still list as roots.
        await f.db.prepare("INSERT INTO guestbook_entries(user_id,message) VALUES('reader','legacy row')").run();
        const legacy = await (await f.r.call('/api/guestbook')).json() as {
            items: { message: string; parentId: number | null; replyTo: string; replies: unknown[] }[];
        };
        const old = legacy.items.find((item) => item.message === 'legacy row')!;
        assert.equal(old.parentId, null);
        assert.equal(old.replyTo, '');
        assert.deepEqual(old.replies, []);
    }
    finally {
        await f.mf.dispose();
    }
});
test('donation notes stay private, carry a server title and source marker, and ignore client titles', async () => {
    const f = await fixture();
    try {
        const payload = { requestId: crypto.randomUUID(), message: '想推荐一本关于记忆的书。', url: '', source: 'donation' };
        const created = await f.r.call('/api/submissions', payload);
        assert.equal(created.status, 201);
        const id = (await created.json() as { id: number }).id;
        const row = await f.db.prepare('SELECT title,source,message FROM submissions WHERE id=?').bind(id).first<{
            title: string; source: string; message: string;
        }>();
        assert.equal(row!.source, 'donation');
        assert.equal(row!.title, '打赏捎信 · 想推荐一本关于记忆的书。');
        assert.equal((await f.r.call('/api/submissions', payload)).status, 200);
        const mine = await (await f.r.call('/api/submissions')).json() as { items: { id: number; source: string }[] };
        assert.equal(mine.items[0].source, 'donation');
        assert.equal((await (await f.o.call('/api/submissions')).json() as { items: unknown[] }).items.length, 0);
        assert.ok((await (await f.a.call('/api/admin/submissions')).json() as { items: { id: number; source: string }[] })
            .items.some((item) => item.id === id && item.source === 'donation'));
        // Link-only submissions derive their title from the URL; client titles are ignored.
        const linked = await f.o.call('/api/submissions', {
            requestId: crypto.randomUUID(), message: '', url: 'https://example.com/notes/memory', title: 'FAKE TITLE', source: '',
        });
        assert.equal(linked.status, 201);
        const linkRow = await f.db.prepare('SELECT title,source FROM submissions WHERE id=?')
            .bind((await linked.json() as { id: number }).id).first<{ title: string; source: string }>();
        assert.equal(linkRow!.title, 'example.com/notes/memory');
        assert.equal(linkRow!.source, '');
        assert.equal((await f.o.call('/api/submissions', { requestId: crypto.randomUUID(), message: 'x', url: '', source: 'other' })).status, 400);
        assert.equal((await f.o.call('/api/submissions', { requestId: crypto.randomUUID(), message: '', url: '', source: 'donation' })).status, 400);
    }
    finally {
        await f.mf.dispose();
    }
});
test('password changes revoke all sessions and invalidate reset credentials', async () => {
    const f = await fixture();
    try {
        const id = 'reader';
        await f.db.prepare("INSERT INTO reset_tokens VALUES('token',?,unixepoch()+100,NULL)").bind(id).run();
        assert.equal((await f.r.call('/api/account/password', { currentPassword: 'wrong', password: 'new123', confirmPassword: 'new123' })).status, 400);
        assert.equal((await f.r.call('/api/account/password', { currentPassword: 'test123', password: 'new123', confirmPassword: 'new123' })).status, 200);
        assert.equal((await f.db.prepare('SELECT count(*) AS n FROM sessions WHERE user_id=?').bind(id).first<{
            n: number;
        }>())!.n, 0);
        assert.equal((await f.db.prepare('SELECT count(*) AS n FROM reset_tokens WHERE user_id=?').bind(id).first<{
            n: number;
        }>())!.n, 0);
        assert.equal((await f.r.call('/api/auth/login', { username: id, password: 'test123' })).status, 401);
        assert.equal((await f.r.call('/api/auth/login', { username: id, password: 'new123' })).status, 200);
    }
    finally {
        await f.mf.dispose();
    }
});
test('deletion removes personal records, rolls back failures, protects admins and honors defaults', async () => {
    const f = await fixture();
    try {
        assert.equal((await f.a.call('/api/account/delete', { currentPassword: 'test123', username: 'admin' })).status, 403);
        await f.db.prepare("INSERT INTO favorites(user_id,book) VALUES('reader','sample')").run();
        await f.db.prepare("INSERT INTO guestbook_entries(user_id,message) VALUES('reader','hi')").run();
        await f.db.prepare("CREATE TRIGGER reject_delete BEFORE DELETE ON users WHEN OLD.id='reader' BEGIN SELECT RAISE(ABORT,'test'); END").run();
        assert.equal((await f.r.call('/api/account/delete', { currentPassword: 'test123', username: 'reader' })).status, 500);
        assert.equal((await f.db.prepare("SELECT count(*) AS n FROM favorites WHERE user_id='reader'").first<{
            n: number;
        }>())!.n, 1);
        await f.db.prepare('DROP TRIGGER reject_delete').run();
        assert.equal((await f.r.call('/api/account/delete', { currentPassword: 'test123', username: 'reader' })).status, 200);
        for (const table of ['users', 'sessions', 'favorites', 'guestbook_entries'])
            assert.equal((await f.db.prepare(`SELECT count(*) AS n FROM ${table} WHERE ${table === 'users' ? 'id' : 'user_id'}='reader'`).first<{
                n: number;
            }>())!.n, 0);
    }
    finally {
        await f.mf.dispose();
    }
    const off = await fixture(false);
    try {
        assert.equal((await off.r.call('/api/account/password', { currentPassword: 'test123', password: 'new123', confirmPassword: 'new123' })).status, 503);
        assert.equal((await off.r.call('/api/account/delete', { currentPassword: 'test123', username: 'reader' })).status, 503);
    }
    finally {
        await off.mf.dispose();
    }
});
