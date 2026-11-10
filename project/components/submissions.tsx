"use client";
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { api } from '@/lib/api';
import { UiText } from './ui-text';
type Item = {
    id: number;
    title: string;
    summary: string;
    message: string;
    url: string;
    status: string;
    note: string;
};
type Board = {
    items: Item[];
    next: number | null;
    canModerate: boolean;
};
const names: Record<string, string> = { pending: '待处理 / Pending', adopted: '已采用 / Adopted', declined: '未采用 / Not adopted' };
export function Submissions() {
    const [board, setBoard] = useState<Board | null>(null), [admin, setAdmin] = useState(false), [pages, setPages] = useState<number[]>([]), [revision, setRevision] = useState(0), [busy, setBusy] = useState(false), [error, setError] = useState('');
    const lock = useRef(false), requestId = useRef(''), form = useRef<HTMLFormElement>(null);
    const before = pages.at(-1), endpoint = admin ? '/api/admin/submissions' : '/api/submissions';
    useEffect(() => { let live = true; setBoard(null); api<Board>(endpoint + (before ? '?before=' + before : '')).then(b => { if (live)
        setBoard(b); }).catch(e => { if (live)
        setError(e.message); }); return () => { live = false; }; }, [endpoint, before, revision]);
    async function act(endpoint: string, data: unknown, done?: () => void) { if (lock.current)
        return; lock.current = true; setBusy(true); setError(''); try {
        await api(endpoint, 'POST', data);
        done?.();
        setPages([]);
        setRevision(n => n + 1);
    }
    catch (e) {
        setError((e as Error).message);
    }
    finally {
        lock.current = false;
        setBusy(false);
    } }
    function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const data = Object.fromEntries(new FormData(e.currentTarget)); requestId.current ||= crypto.randomUUID(); void act('/api/submissions', { ...data, requestId: requestId.current }, () => { form.current?.reset(); requestId.current = ''; }); }
    return <section className="feature-page"><h2><UiText zh="投稿" en="Submissions"/></h2><p><UiText zh="投稿仅本人和管理员可见。已采用表示决定使用素材，不会自动发布；管理员将另行整理与复核。" en="Only you and administrators can view your submissions. Adoption is a decision to use material, not automatic publication."/></p>
 <form ref={form} onSubmit={submit} onChange={() => { requestId.current = ''; }}><fieldset disabled={busy}><legend>提交文字或链接 / Submit text or a link</legend><label>标题 / Title<input name="title" required maxLength={100}/></label><label>简介 / Summary<textarea name="summary" maxLength={300}/></label><label>正文 / Text<textarea name="message" maxLength={2000}/></label><label>来源链接 / Source URL<input name="url" type="url" maxLength={2048}/></label><p>正文与链接至少填一项；每天最多 3 次，最多 5 条待处理。 / Add text or a URL. Three submissions daily, five pending maximum.</p><button type="submit">{busy ? '提交中 / Submitting' : '提交投稿 / Submit'}</button></fieldset></form>
 {board?.canModerate && <button disabled={busy} onClick={() => { setAdmin(!admin); setPages([]); }}>{admin ? '我的投稿 / My submissions' : '审核全部投稿 / Review all'}</button>}
 {error && <p role="alert">{error} <button onClick={() => setRevision(n => n + 1)}>重试 / Retry</button></p>}{!board ? <p role="status">加载中 / Loading…</p> : <><ul className="reader-items">{board.items.map(i => <li className="reader-item" key={i.id}><h3>{i.title}</h3><p>{names[i.status]}</p><p className="submission-text">{i.summary}</p><p className="submission-text">{i.message}</p>{i.url && <a href={i.url} target="_blank" rel="noopener noreferrer">{i.url}</a>}{i.note && <p className="submission-text">处理说明 / Review note: {i.note}</p>}{admin ? <form onSubmit={e => { e.preventDefault(); const d = Object.fromEntries(new FormData(e.currentTarget)); void act('/api/admin/submissions', { id: i.id, ...d }); }}><select name="status" defaultValue={i.status}>{Object.entries(names).map(([v, n]) => <option key={v} value={v}>{n}</option>)}</select><label>处理说明 / Note<textarea name="note" defaultValue={i.note} maxLength={300}/></label><button disabled={busy}>保存 / Save</button></form> : i.status !== 'adopted' && <button disabled={busy} onClick={() => { if (confirm('撤回此投稿？ / Withdraw submission?'))
        void act('/api/submissions', { action: 'withdraw', id: i.id }); }}>撤回 / Withdraw</button>}</li>)}</ul>{!board.items.length && <p>暂无投稿 / No submissions</p>}<button disabled={busy || !pages.length} onClick={() => setPages(p => p.slice(0, -1))}>上一页 / Previous</button><button disabled={busy || !board.next} onClick={() => setPages(p => [...p, board.next!])}>下一页 / Next</button></>}
 </section>;
}
