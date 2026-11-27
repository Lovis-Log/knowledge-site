import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';
import { digest, hashPassword } from '../password';
async function fixture(enabled: boolean | null = true) {
    const mf = new Miniflare(convertV4MiniflareOptions({ modules: true, scriptPath: 'out/_worker.js', compatibilityDate: '2026-11-04', compatibilityFlags: ['nodejs_compat'], d1Databases: { DB: 'features' }, bindings: enabled === null ? {} : { ACCOUNT_CHANGE_PASSWORD_ENABLED: enabled ? '1' : '0', ACCOUNT_DELETE_ENABLED: enabled ? '1' : '0' }, serviceBindings: { ASSETS: () => new Response('PAGE') } }));
    const db = await mf.getD1Database('DB');
    for (const file of ['0001_auth.sql', '0002_content.sql', '0003_reader_interactions.sql', '0004_recoverable_invites.sql', '0005_submissions.sql', '0006_community_replies.sql', '0007_reading_state.sql', '0008_account_thread_and_review_safety.sql', '0009_highlight_anchors_and_donation_records.sql', '0010_password_change_challenges.sql']) {
        const sql = await readFile('backend/migrations/' + file, 'utf8');
        for (const stmt of sql.split(/;(?=\s*(?:CREATE|ALTER|PRAGMA|DROP|$))/))
            if (stmt.trim())
                await db.prepare(stmt).run();
    }
    for (const id of ['reader', 'other', 'admin'])
        await db.prepare("INSERT INTO users(id,username,password_hash,nickname,reason,role,status,created_at) VALUES(?,?,?,?,?,?, 'approved',unixepoch())").bind(id, id, await hashPassword('test123'), id, 'test', id === 'admin' ? 'admin' : 'user').run();
    function client() { let cookie = ''; return { async call(path: string, data?: unknown, method = data ? 'POST' : 'GET') { let headers: Record<string, string> = { Cookie: cookie }; if (data !== undefined) {
            const csrf = await mf.dispatchFetch('https://features.test/api/auth/csrf');
            const token = await csrf.json() as {
                token: string;
            };
            headers = { ...headers, Cookie: cookie + '; ' + csrf.headers.get('set-cookie')!.split(';')[0], Origin: 'https://features.test', 'X-CSRF-Token': token.token, 'Content-Type': 'application/json' };
        } const r = await mf.dispatchFetch('https://features.test' + path, { method, headers, body: data !== undefined ? JSON.stringify(data) : undefined }); const c = r.headers.get('set-cookie'); if (c?.startsWith('__Host-lovismind-session='))
            cookie = c.split(';')[0]; return r; } }; }
    const r = client(), o = client(), a = client();
    for (const [c, name] of [[r, 'reader'], [o, 'other'], [a, 'admin']] as const)
        assert.equal((await c.call('/api/auth/login', { username: name, password: 'test123' })).status, 200);
    return { mf, db, r, o, a, client };
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
                version: number;
            }[];
        };
        assert.equal(mine.items.length, 1);
        assert.equal(mine.items[0].version, 0);
        assert.equal((await (await f.o.call('/api/submissions')).json() as {
            items: unknown[];
        }).items.length, 0);
        assert.equal((await f.o.call('/api/submissions', { action: 'withdraw', id: mine.items[0].id })).status, 404);
        assert.equal((await f.r.call('/api/admin/submissions')).status, 403);
        // Moderation is compare-and-swap: no version or a stale version is refused.
        assert.equal((await f.a.call('/api/admin/submissions', { id: mine.items[0].id, status: 'adopted', note: 'no version' })).status, 400);
        assert.equal((await f.a.call('/api/admin/submissions', { id: mine.items[0].id, status: 'adopted', note: 'stale', version: mine.items[0].version + 1 })).status, 409);
        const reviewed = await f.a.call('/api/admin/submissions', { id: mine.items[0].id, status: 'adopted', note: 'will edit', version: mine.items[0].version });
        assert.equal(reviewed.status, 200);
        assert.deepEqual(await reviewed.json(), { ok: true, version: mine.items[0].version + 1, status: 'adopted' });
        assert.equal((await f.a.call('/api/admin/submissions', { id: mine.items[0].id, status: 'declined', note: 'again', version: mine.items[0].version })).status, 409);
        // A legacy writer during a rolling deployment still advances the version.
        await f.db.prepare("UPDATE submissions SET note='legacy write' WHERE id=?").bind(mine.items[0].id).run();
        assert.equal((await f.db.prepare('SELECT version FROM submissions WHERE id=?').bind(mine.items[0].id).first<{ version: number }>())!.version, 2);
        assert.equal((await f.a.call('/api/admin/submissions', { id: mine.items[0].id, status: 'declined', note: 'stale after legacy', version: 1 })).status, 409);
        assert.equal((await f.r.call('/api/submissions', { action: 'withdraw', id: mine.items[0].id })).status, 404);
        // A reader withdrawal that wins before moderation leaves a clean 404.
        const withdrawn = await f.o.call('/api/submissions', { ...payload, requestId: crypto.randomUUID() });
        assert.equal(withdrawn.status, 201);
        const withdrawnId = (await withdrawn.json() as { id: number }).id;
        assert.equal((await f.o.call('/api/submissions', { action: 'withdraw', id: withdrawnId })).status, 200);
        assert.equal((await f.a.call('/api/admin/submissions', { id: withdrawnId, status: 'adopted', note: 'late', version: 0 })).status, 404);
        assert.equal((await f.o.call('/api/submissions', { ...payload, requestId: crypto.randomUUID(), url: 'javascript:alert(1)' })).status, 400);
        for (let i = 0; i < 2; i++)
            assert.equal((await f.r.call('/api/submissions', { ...payload, requestId: crypto.randomUUID() })).status, 201);
        assert.equal((await f.r.call('/api/submissions', { ...payload, requestId: crypto.randomUUID() })).status, 429);
        // Two reviewers starting from the same version: exactly one write applies.
        const pending = (await (await f.r.call('/api/submissions')).json() as { items: { id: number; status: string; version: number }[] })
            .items.find((item) => item.status === 'pending')!;
        const raced = await Promise.all([
            f.a.call('/api/admin/submissions', { id: pending.id, status: 'adopted', note: 'race a', version: pending.version }),
            f.a.call('/api/admin/submissions', { id: pending.id, status: 'declined', note: 'race b', version: pending.version }),
        ]);
        assert.deepEqual(raced.map((response) => response.status).sort(), [200, 409]);
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
test('administrators see donation notes with their authors and can record exact amounts once', async () => {
    const f = await fixture();
    try {
        const endpoint = '/api/admin/donations';
        const record = { requestId: crypto.randomUUID(), donor: '小伟', amount: '12.05' };
        assert.equal((await f.r.call(endpoint)).status, 403);
        assert.equal((await f.r.call(endpoint, record)).status, 403);
        assert.equal((await f.a.call(endpoint, { ...record, amount: '1.001' })).status, 400);
        assert.equal((await f.a.call(endpoint, record)).status, 201);
        assert.equal((await f.a.call(endpoint, record)).status, 200);
        const ledger = await (await f.a.call(endpoint)).json() as { items: { donor: string; amountFen: number }[] };
        assert.deepEqual(ledger.items.map(({ donor, amountFen }) => ({ donor, amountFen })), [
            { donor: '小伟', amountFen: 1205 },
        ]);
        for (const source of ['', 'donation'])
            assert.equal((await f.r.call('/api/submissions', {
                requestId: crypto.randomUUID(), source, message: 'example', url: '',
            })).status, 201);
        const notes = await (await f.a.call('/api/admin/submissions?source=donation')).json() as {
            items: { id: number; author: string; source: string; version: number }[];
        };
        assert.deepEqual(notes.items.map(({ author, source }) => ({ author, source })), [{ author: 'reader', source: 'donation' }]);
        const [{ id, version }] = notes.items;
        const annotation = { action: 'donation-note', id, version, note: 'Internal donation note' };
        assert.equal((await f.r.call('/api/admin/submissions', annotation)).status, 403);
        assert.equal((await f.a.call('/api/admin/submissions', { id, version, status: 'adopted' })).status, 404);
        assert.equal((await f.a.call('/api/admin/submissions', annotation)).status, 200);
        assert.equal((await f.a.call('/api/admin/submissions', annotation)).status, 409);
        const saved = await f.db.prepare('SELECT note,status FROM submissions WHERE id=?').bind(id).first();
        assert.deepEqual(saved, { note: annotation.note, status: 'pending' });
        const member = await (await f.r.call('/api/submissions')).json() as { items: { id: number; note: string }[] };
        assert.equal(member.items.find((item) => item.id === id)?.note, '');
        const submissions = await (await f.a.call('/api/admin/submissions?source=submission')).json() as { items: { source: string }[] };
        assert.deepEqual(submissions.items.map(({ source }) => source), ['']);
    } finally {
        await f.mf.dispose();
    }
});
test('password changes require a fresh one-use challenge from the same session and revoke credentials', async () => {
    const f = await fixture();
    try {
        const id = 'reader';
        const verify = '/api/account/password/verify';
        const save = '/api/account/password';
        const password = { password: 'new123', confirmPassword: 'new123' };
        const otherSession = f.client();
        assert.equal((await otherSession.call('/api/auth/login', { username: id, password: 'test123' })).status, 200);
        await f.db.prepare("INSERT INTO reset_tokens VALUES('token',?,unixepoch()+100,NULL)").bind(id).run();
        assert.equal((await f.r.call(verify, { currentPassword: 'wrong' })).status, 400);
        assert.equal((await f.r.call(save, { ...password, currentPassword: 'test123' })).status, 400);

        async function verifyPassword() {
            const response = await f.r.call(verify, { currentPassword: 'test123' });
            assert.equal(response.status, 200);
            return (await response.json() as { challenge: string }).challenge;
        }
        const expired = await verifyPassword();
        await f.db.prepare('UPDATE password_change_challenges SET expires_at=unixepoch()').run();
        assert.equal((await f.r.call(save, { ...password, challenge: expired })).status, 409);

        const challenge = await verifyPassword();
        const accountLimit = await digest('account:reader');
        // No other operation changes these counters during the three verify calls.
        const ipCount = () => f.db.prepare('SELECT sum(count) AS total FROM rate_limits WHERE key!=?')
            .bind(accountLimit).first<number>('total');
        const before = (await ipCount())!;
        for (let attempt = 0; attempt < 2; attempt++)
            assert.equal((await f.r.call(verify, { currentPassword: 'wrong' })).status, 400);
        assert.equal((await f.r.call(verify, { currentPassword: 'wrong' })).status, 429);
        assert.equal(await ipCount(), before + 2);
        const payload = { ...password, challenge };
        assert.equal((await otherSession.call(save, payload)).status, 409);
        const changes = await Promise.all([f.r.call(save, payload), f.r.call(save, payload)]);
        assert.equal(changes.filter((response) => response.status === 200).length, 1);
        assert.ok(changes.some((response) => response.status === 409 || response.status === 401));
        assert.equal((await f.db.prepare('SELECT count(*) AS n FROM password_change_challenges').first<{ n: number }>())!.n, 0);
        assert.equal((await f.db.prepare('SELECT count(*) AS n FROM sessions WHERE user_id=?').bind(id).first<{ n: number }>())!.n, 0);
        assert.equal((await f.db.prepare('SELECT count(*) AS n FROM reset_tokens WHERE user_id=?').bind(id).first<{ n: number }>())!.n, 0);
        assert.equal((await f.r.call('/api/auth/login', { username: id, password: 'test123' })).status, 401);
        assert.equal((await f.r.call('/api/auth/login', { username: id, password: 'new123' })).status, 200);
    } finally {
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
        assert.equal((await f.r.call('/api/account/delete', { currentPassword: 'test123' })).status, 200);
        for (const table of ['users', 'sessions', 'favorites', 'guestbook_entries'])
            assert.equal((await f.db.prepare(`SELECT count(*) AS n FROM ${table} WHERE ${table === 'users' ? 'id' : 'user_id'}='reader'`).first<{
                n: number;
            }>())!.n, 0);
        // No preserved thread means no reserved placeholder account is created.
        assert.equal((await f.db.prepare("SELECT count(*) AS n FROM users WHERE id='deleted-reader'").first<{ n: number }>())!.n, 0);
    }
    finally {
        await f.mf.dispose();
    }
    const off = await fixture(false);
    try {
        assert.equal((await off.r.call('/api/account/password/verify', { currentPassword: 'test123' })).status, 503);
        assert.equal((await off.r.call('/api/account/delete', { currentPassword: 'test123', username: 'reader' })).status, 503);
    }
    finally {
        await off.mf.dispose();
    }
});

test('profile changes verify credentials, enforce uniqueness and preserve identity and sessions', async () => {
    const f = await fixture();
    try {
        const payload = { username: 'NewReader', nickname: '新名字', currentPassword: 'test123' };
        await f.db.prepare("INSERT INTO favorites(user_id,book) VALUES('reader','sample')").run();
        assert.equal((await f.r.call('/api/account/profile', { ...payload, currentPassword: 'wrong' })).status, 400);
        assert.equal((await f.r.call('/api/account/profile', { ...payload, username: 'OTHER' })).status, 409);
        assert.equal((await f.r.call('/api/account/profile', { ...payload, username: 'invalid-name' })).status, 400);
        assert.equal((await f.r.call('/api/account/profile', { ...payload, username: ' ' })).status, 400);
        assert.equal((await f.r.call('/api/account/profile', payload)).status, 200);
        const account = await (await f.r.call('/api/auth/me')).json() as { user: { id: string; username: string; nickname: string } };
        assert.deepEqual({ id: account.user.id, username: account.user.username, nickname: account.user.nickname }, { id: 'reader', username: 'NewReader', nickname: 'NewReader' });
        const managed = await (await f.a.call('/api/admin/users')).json() as { users: { id: string; username: string }[] };
        assert.equal(managed.users.find(user => user.id === 'reader')?.username, 'NewReader');
        assert.equal((await f.db.prepare("SELECT count(*) AS n FROM favorites WHERE user_id='reader'").first<{ n: number }>())!.n, 1);
        assert.equal((await f.r.call('/api/auth/login', { username: 'reader', password: 'test123' })).status, 401);
        assert.equal((await f.r.call('/api/auth/login', { username: 'newreader', password: 'test123' })).status, 200);
    } finally { await f.mf.dispose(); }
});

test('account mutation validation leaves credentials and personal records intact', async () => {
    const f = await fixture();
    try {
        const settings = await (await f.r.call('/api/account/settings')).json() as { features: { changePassword: boolean; deleteAccount: boolean } };
        assert.deepEqual(settings.features, { changePassword: true, deleteAccount: true });
        const verified = await f.r.call('/api/account/password/verify', { currentPassword: 'test123' });
        const { challenge } = await verified.json() as { challenge: string };
        assert.equal(verified.status, 200);
        assert.equal((await f.r.call('/api/account/password', { challenge, password: 'new123', confirmPassword: 'different' })).status, 400);
        assert.equal((await f.r.call('/api/account/password', { challenge, password: 'short', confirmPassword: 'short' })).status, 400);
        assert.equal((await f.db.prepare('SELECT count(*) AS n FROM password_change_challenges WHERE expires_at>unixepoch()').first<{ n: number }>())!.n, 1);
        assert.equal((await f.r.call('/api/account/delete', { currentPassword: 'wrong', username: 'reader' })).status, 400);
        assert.equal((await f.r.call('/api/account/delete', { currentPassword: '' })).status, 400);
        assert.equal((await f.r.call('/api/auth/me')).status, 200);
        const csrf = await f.mf.dispatchFetch('https://features.test/api/account/profile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: 'Forged', nickname: 'Forged', currentPassword: 'test123' }) });
        assert.equal(csrf.status, 403);
    } finally { await f.mf.dispose(); }
});

test('account switches stay off unless the environment explicitly enables them', async () => {
    const f = await fixture(null);
    try {
        const settings = await (await f.r.call('/api/account/settings')).json() as { features: { changePassword: boolean; deleteAccount: boolean } };
        assert.deepEqual(settings.features, { changePassword: false, deleteAccount: false });
        assert.equal((await f.r.call('/api/account/password', { currentPassword: 'test123', password: 'new123', confirmPassword: 'new123' })).status, 503);
        assert.equal((await f.r.call('/api/account/delete', { currentPassword: 'test123' })).status, 503);
        // Profile editing is not gated by the two CPU-measured account switches.
        assert.equal((await f.r.call('/api/account/profile', { currentPassword: 'test123', username: 'still_allowed' })).status, 200);
    } finally { await f.mf.dispose(); }
});

test('a note-only review keeps the member session and returns the new version', async () => {
    const f = await fixture();
    try {
        assert.equal((await f.r.call('/api/favorites')).status, 200);
        const note = await f.a.call('/api/admin/users/reader', { action: 'note', note: 'called the reader', version: 0 }, 'PATCH');
        assert.equal(note.status, 200);
        assert.deepEqual(await note.json(), { ok: true, version: 1, status: 'approved' });
        assert.equal((await f.r.call('/api/favorites')).status, 200);
        assert.equal((await f.a.call('/api/admin/users/reader', { action: 'note', note: 'stale', version: 0 }, 'PATCH')).status, 409);
        const disable = await f.a.call('/api/admin/users/other', { action: 'disable', note: 'pause', version: 0 }, 'PATCH');
        assert.equal(disable.status, 200);
        assert.deepEqual(await disable.json(), { ok: true, version: 1, status: 'disabled' });
        assert.equal((await f.o.call('/api/favorites')).status, 401);
    } finally { await f.mf.dispose(); }
});

test('renaming an account keeps existing reply mentions pointing at the same reader', async () => {
    const f = await fixture();
    try {
        const root = (await (await f.r.call('/api/guestbook', { action: 'publish', message: 'root' })).json() as { item: { id: number } }).item.id;
        assert.equal((await f.o.call('/api/guestbook', { action: 'publish', message: 'reply', parentId: root })).status, 201);
        assert.equal((await f.r.call('/api/account/profile', { username: 'RenamedReader', currentPassword: 'test123' })).status, 200);
        const board = await (await f.o.call('/api/guestbook')).json() as { items: { id: number; replies: { replyTo: string }[] }[] };
        assert.equal(board.items.find((entry) => entry.id === root)!.replies[0].replyTo, 'RenamedReader');
    } finally { await f.mf.dispose(); }
});

test('0008 migration upgrades existing thread rows and submission versions in place', async () => {
    const mf = new Miniflare(convertV4MiniflareOptions({ modules: true, scriptPath: 'out/_worker.js', compatibilityDate: '2026-11-04', compatibilityFlags: ['nodejs_compat'], d1Databases: { DB: 'migration-0008' }, serviceBindings: { ASSETS: () => new Response('PAGE') } }));
    try {
        const db = await mf.getD1Database('DB');
        const apply = async (file: string) => {
            const sql = await readFile('backend/migrations/' + file, 'utf8');
            for (const stmt of sql.split(/;(?=\s*(?:CREATE|ALTER|PRAGMA|DROP|$))/))
                if (stmt.trim()) await db.prepare(stmt).run();
        };
        for (const file of ['0001_auth.sql', '0002_content.sql', '0003_reader_interactions.sql', '0004_recoverable_invites.sql', '0005_submissions.sql', '0006_community_replies.sql', '0007_reading_state.sql'])
            await apply(file);
        await db.prepare("INSERT INTO users(id,username,password_hash,nickname,reason,status,created_at) VALUES('legacy','legacy','x','legacy','','approved',1)").run();
        const root = await db.prepare("INSERT INTO guestbook_entries(user_id,message) VALUES('legacy','root') RETURNING id").first<{ id: number }>();
        const reply = await db.prepare("INSERT INTO guestbook_entries(user_id,message,parent_id,reply_to_nickname) VALUES('legacy','reply',?,'legacy') RETURNING id").bind(root!.id).first<{ id: number }>();
        const submission = await db.prepare("INSERT INTO submissions(user_id,request_id,title,message) VALUES('legacy','request','title','message') RETURNING id").first<{ id: number }>();
        await apply('0008_account_thread_and_review_safety.sql');
        // Existing ids, the self-reference and autoincrement continue unchanged.
        assert.equal((await db.prepare('SELECT id,parent_id,placeholder FROM guestbook_entries WHERE id=?').bind(reply!.id)
            .first<{ id: number; parent_id: number; placeholder: number }>())?.parent_id, root!.id);
        assert.equal((await db.prepare('SELECT placeholder FROM guestbook_entries WHERE id=?').bind(root!.id).first<{ placeholder: number }>())?.placeholder, 0);
        assert.equal((await db.prepare('SELECT version FROM submissions WHERE id=?').bind(submission!.id).first<{ version: number }>())?.version, 0);
        const next = await db.prepare("INSERT INTO guestbook_entries(user_id,message) VALUES('legacy','next') RETURNING id").first<{ id: number }>();
        assert.ok(next!.id > reply!.id);
        const indexes = (await db.prepare("SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='guestbook_entries'").all<{ name: string }>()).results.map((row) => row.name);
        for (const name of ['guestbook_visibility_id', 'guestbook_author', 'guestbook_replies'])
            assert.ok(indexes.includes(name), name);
        // The migration trigger covers writes from a still-running old Worker.
        await db.prepare("UPDATE submissions SET note='legacy write' WHERE id=?").bind(submission!.id).run();
        assert.equal((await db.prepare('SELECT version FROM submissions WHERE id=?').bind(submission!.id).first<{ version: number }>())?.version, 1);
    } finally {
        await mf.dispose();
    }
});
test('account deletion keeps replied roots as anonymized placeholders', async () => {
    const f = await fixture();
    try {
        const publish = async (client: { call: (path: string, data?: unknown) => Promise<Response> }, message: string, parentId?: number) => {
            const response = await client.call('/api/guestbook', { action: 'publish', message, ...(parentId === undefined ? {} : { parentId }) });
            return { status: response.status, item: (await response.json() as { item?: { id: number; parentId: number | null; replyTo: string } }).item };
        };
        const root = (await publish(f.r, 'reader root')).item!.id;
        const reply = (await publish(f.o, 'other reply', root)).item!.id;
        const ownReply = (await publish(f.r, 'own reply in kept thread', reply)).item!.id;
        const lonely = (await publish(f.r, 'reader lonely root')).item!.id;
        const ownOnly = (await publish(f.r, 'reader own-only root')).item!.id;
        const ownOnlyReply = (await publish(f.r, 'reader own-only reply', ownOnly)).item!.id;
        const hiddenRoot = (await publish(f.r, 'reader hidden root')).item!.id;
        const hiddenReply = (await publish(f.o, 'other reply under hidden root', hiddenRoot)).item!.id;
        assert.equal((await f.a.call('/api/admin/guestbook', { action: 'hide', id: hiddenRoot })).status, 200);
        const otherRoot = (await publish(f.o, 'other root')).item!.id;
        const readerReplyElsewhere = (await publish(f.r, 'reader reply elsewhere', otherRoot)).item!.id;
        const mentionElsewhere = (await publish(f.o, 'other reply to reader elsewhere', readerReplyElsewhere)).item!.id;
        assert.equal((await f.r.call('/api/account/delete', { currentPassword: 'test123' })).status, 200);

        const kept = await f.db.prepare('SELECT user_id,message,hidden,parent_id,placeholder FROM guestbook_entries WHERE id=?').bind(root)
            .first<{ user_id: string; message: string; hidden: number; parent_id: number | null; placeholder: number }>();
        assert.equal(kept?.user_id, 'deleted-reader');
        assert.equal(kept?.hidden, 0);
        assert.equal(kept?.parent_id, null);
        assert.equal(kept?.placeholder, 1);
        assert.notEqual(kept?.message, 'reader root');
        const row = async (id: number) => await f.db.prepare('SELECT user_id,hidden,placeholder,reply_to_nickname FROM guestbook_entries WHERE id=?')
            .bind(id).first<{ user_id: string; hidden: number; placeholder: number; reply_to_nickname: string }>();
        assert.equal((await row(reply))?.user_id, 'other');
        assert.equal((await row(reply))?.reply_to_nickname, '');
        assert.equal((await row(hiddenReply))?.user_id, 'other');
        assert.equal((await row(mentionElsewhere))?.reply_to_nickname, '');
        assert.equal((await row(hiddenRoot))?.hidden, 1);
        assert.equal((await row(hiddenRoot))?.placeholder, 1);
        for (const removed of [ownReply, lonely, ownOnly, ownOnlyReply, readerReplyElsewhere])
            assert.equal(await row(removed), null);
        assert.equal((await f.db.prepare("SELECT count(*) AS n FROM users WHERE id='deleted-reader'").first<{ n: number }>())!.n, 1);

        const board = await (await f.o.call('/api/guestbook')).json() as {
            items: { id: number; message: string; nickname: string; placeholder: boolean; replies: { id: number; replyTo: string }[] }[];
        };
        const thread = board.items.find((entry) => entry.id === root)!;
        assert.equal(thread.placeholder, true);
        assert.equal(thread.message, '');
        assert.equal(thread.nickname, '');
        assert.deepEqual(thread.replies.map((entry) => entry.id), [reply]);
        assert.equal(thread.replies[0].replyTo, '');
        assert.ok(!board.items.some((entry) => entry.id === hiddenRoot));
        assert.ok(board.items.some((entry) => entry.id === otherRoot));
        assert.equal(board.items.find((entry) => entry.id === otherRoot)!.replies.find((entry) => entry.id === mentionElsewhere)?.replyTo, '');
        const hiddenList = await (await f.a.call('/api/admin/guestbook')).json() as { items: { id: number; message: string; placeholder: boolean }[] };
        assert.equal(hiddenList.items.find((entry) => entry.id === hiddenRoot)?.placeholder, true);
        assert.equal(hiddenList.items.find((entry) => entry.id === hiddenRoot)?.message, '');

        const after = await publish(f.o, 'reply after deletion', root);
        assert.equal(after.status, 201);
        assert.equal(after.item!.parentId, root);
        assert.equal(after.item!.replyTo, '');
        const users = await (await f.a.call('/api/admin/users')).json() as {
            users: { id: string }[]; accountCount: number; statusCounts: Record<string, number>;
        };
        assert.ok(!users.users.some((entry) => entry.id === 'deleted-reader'));
        assert.equal(users.accountCount, Object.values(users.statusCounts).reduce((sum, count) => sum + count, 0));
    } finally { await f.mf.dispose(); }
});
