import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';
import { hashPassword } from '../password';
async function fixture(enabled = true) {
    const mf = new Miniflare(convertV4MiniflareOptions({ modules: true, scriptPath: 'out/_worker.js', compatibilityDate: '2026-11-04', compatibilityFlags: ['nodejs_compat'], d1Databases: { DB: 'features' }, bindings: enabled ? { ACCOUNT_CHANGE_PASSWORD_ENABLED: '1', ACCOUNT_DELETE_ENABLED: '1' } : {}, serviceBindings: { ASSETS: () => new Response('PAGE') } }));
    const db = await mf.getD1Database('DB');
    for (const file of ['0001_auth.sql', '0002_content.sql', '0003_reader_interactions.sql', '0004_recoverable_invites.sql', '0005_submissions.sql']) {
        const sql = await readFile('backend/migrations/' + file, 'utf8');
        for (const stmt of sql.split(/;(?=\s*(?:CREATE|PRAGMA|$))/))
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
