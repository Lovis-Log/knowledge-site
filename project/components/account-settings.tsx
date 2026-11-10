"use client";
import { useEffect, useState, useRef, type FormEvent } from 'react';
import { api } from '@/lib/api';
type Settings = {
    username: string;
    role: string;
    features: {
        changePassword: boolean;
        deleteAccount: boolean;
    };
};
export function AccountSettings() {
    const [settings, setSettings] = useState<Settings | null>(null), [error, setError] = useState(''), [busy, setBusy] = useState(false);
    const lock = useRef(false);
    useEffect(() => { let live = true; api<Settings>('/api/account/settings').then(s => { if (live)
        setSettings(s); }).catch(e => { if (live)
        setError(e.message); }); return () => { live = false; }; }, []);
    async function submit(e: FormEvent<HTMLFormElement>, deleting: boolean) { e.preventDefault(); if (lock.current)
        return; if (deleting && !confirm('永久删除账号与个人内容，无法撤销。继续？ / Permanently delete your account and personal content?'))
        return; lock.current = true; setBusy(true); setError(''); try {
        await api('/api/account/' + (deleting ? 'delete' : 'password'), 'POST', Object.fromEntries(new FormData(e.currentTarget)));
        if (deleting) {
            try {
                localStorage.removeItem('shufang:progress');
                localStorage.removeItem('shufang:last-read');
            }
            catch { }
        }
        location.assign('/login/');
    }
    catch (e) {
        setError((e as Error).message);
    }
    finally {
        lock.current = false;
        setBusy(false);
    } }
    return <section className="shell feature-page"><h1>账号设置 / Account settings</h1>{error && <p role="alert">{error}</p>}{!settings ? <p>加载中 / Loading…</p> : <><p>{settings.username}</p><h2>修改密码 / Change password</h2>{settings.features.changePassword ? <form onSubmit={e => void submit(e, false)}><fieldset disabled={busy}><label>当前密码 / Current password<input name="currentPassword" type="password" autoComplete="current-password" required maxLength={128}/></label><label>新密码 / New password<input name="password" type="password" autoComplete="new-password" required minLength={6} maxLength={128}/></label><label>确认密码 / Confirm password<input name="confirmPassword" type="password" autoComplete="new-password" required minLength={6} maxLength={128}/></label><p>保存后所有设备退出登录。 / All sessions will be signed out.</p><button>保存新密码 / Save password</button></fieldset></form> : <p>免费额度 CPU 验证尚未完成，此功能暂未开放。需要重置密码请联系管理员。 / Awaiting CPU validation; contact the administrator for a password reset.</p>}
 <h2>永久注销 / Delete account</h2><p>注销将删除账号、收藏、留言及投稿；已独立整理发布的笔记保留。无法撤销。 / Deletes your account, favorites, messages and submissions. Independently published notes remain. This cannot be undone.</p>{settings.role === 'admin' ? <p>管理员不能自助注销。 / Administrators cannot delete themselves.</p> : settings.features.deleteAccount ? <form onSubmit={e => void submit(e, true)}><fieldset disabled={busy}><label>当前密码 / Current password<input name="currentPassword" type="password" autoComplete="current-password" required maxLength={128}/></label><label>再次输入用户名 / Confirm username<input name="username" required autoComplete="off"/></label><button>永久注销 / Permanently delete</button></fieldset></form> : <p>免费额度 CPU 验证尚未完成，此功能暂未开放。 / Awaiting CPU validation; not yet available.</p>}</>}</section>;
}
