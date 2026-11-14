"use client";

import { useEffect, useState, useRef, type FormEvent } from 'react';
import { api, ApiError } from '@/lib/api';
import { UiText } from '@/components/ui-text';
import { AccountAvatar } from '@/components/account-avatar';

type Settings = { username: string; nickname: string; role: string; features: { changePassword: boolean; deleteAccount: boolean } };
type Action = 'profile' | 'password' | 'delete';

export function AccountSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState<Action | null>(null);
  const [attempt, setAttempt] = useState(0);
  const lock = useRef(false);
  useEffect(() => {
    let live = true;
    api<Settings>('/api/account/settings').then(value => {
      if (live) { setSettings(value); setError(''); }
    }).catch(caught => {
      if (!live) return;
      if (caught instanceof ApiError && caught.status === 401) {
        window.location.replace('/login/?next=%2Fsettings%2F');
        return;
      }
      setError(caught.message);
    });
    return () => { live = false; };
  }, [attempt]);

  async function submit(event: FormEvent<HTMLFormElement>, action: Action) {
    event.preventDefault();
    if (lock.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setError(''); setNotice('');
    if (action === 'password' && values.password !== values.confirmPassword) {
      setError('两次密码不一致 / Passwords do not match'); return;
    }
    if (action === 'delete' && !window.confirm('永久删除账号与个人内容，无法撤销。继续？ / Permanently delete your account and personal content? This cannot be undone.')) return;
    lock.current = true; setBusy(action);
    try {
      const result = await api<{ username: string; nickname: string }>('/api/account/' + action, 'POST', values);
      if (action === 'profile') {
        setSettings(previous => previous && ({ ...previous, username: result.username, nickname: result.nickname }));
        form.reset();
        window.dispatchEvent(new Event('account:updated'));
        setNotice('账号资料已保存，下次请使用更新后的用户名登录。 / Profile saved. Use the updated username next time you sign in.');
      } else {
        if (action === 'delete') {
          try { localStorage.removeItem('shufang:progress'); localStorage.removeItem('shufang:last-read'); } catch { /* Storage may be unavailable. */ }
        }
        window.location.assign('/login/');
      }
    } catch (caught) { setError((caught as Error).message); }
    finally { lock.current = false; setBusy(null); }
  }

  return <section className="shell feature-page account-settings">
    <h1><UiText zh="账号设置" en="Account settings" /></h1>
    {error && <p role="alert">{error}</p>}{notice && <p role="status">{notice}</p>}
    {!settings ? error ? <button type="button" onClick={() => { setError(''); setAttempt(value => value + 1); }}><UiText zh="重新加载" en="Retry" /></button> : <p role="status"><UiText zh="加载中…" en="Loading…" /></p> : <>
      <div className="account-settings__identity"><AccountAvatar username={settings.username} large /><div><strong>{settings.nickname}</strong><p>@{settings.username}</p></div></div>
      <p><UiText zh="默认头像使用用户名首位字符，英文字母自动大写。" en="Your default avatar uses the first character of your username, capitalized." /></p>
      <section className="account-settings__section">
        <h2><UiText zh="个人资料" en="Profile" /></h2>
        <form key={settings.username + ':' + settings.nickname} onSubmit={event => void submit(event, 'profile')}><fieldset disabled={busy !== null}>
          <label><UiText zh="用户名" en="Username" /><input name="username" autoComplete="username" required minLength={3} maxLength={32} pattern="[a-zA-Z0-9_]{3,32}" defaultValue={settings.username} aria-describedby="username-help" /></label>
          <p id="username-help"><UiText zh="3–32 位字母、数字或下划线，用于登录。修改后收藏和留言仍保留。" en="3–32 letters, digits or underscores. Used to sign in. Your favorites and messages stay with your account." /></p>
          <label><UiText zh="显示名称" en="Display name" /><input name="nickname" autoComplete="nickname" required maxLength={64} defaultValue={settings.nickname} /></label>
          <label><UiText zh="当前密码" en="Current password" /><input name="currentPassword" type="password" autoComplete="current-password" required maxLength={128} /></label>
          <button type="submit"><UiText zh={busy === 'profile' ? '保存中…' : '保存资料'} en={busy === 'profile' ? 'Saving…' : 'Save profile'} /></button>
        </fieldset></form>
      </section>
      <section className="account-settings__section">
        <h2><UiText zh="修改密码" en="Change password" /></h2>
        {settings.features.changePassword ? <form onSubmit={event => void submit(event, 'password')}><fieldset disabled={busy !== null}>
          <label><UiText zh="当前密码" en="Current password" /><input name="currentPassword" type="password" autoComplete="current-password" required maxLength={128} /></label>
          <label><UiText zh="新密码" en="New password" /><input name="password" type="password" autoComplete="new-password" required minLength={6} maxLength={128} /></label>
          <label><UiText zh="确认新密码" en="Confirm new password" /><input name="confirmPassword" type="password" autoComplete="new-password" required minLength={6} maxLength={128} /></label>
          <p><UiText zh="密码须为 6–128 个字符。保存后所有设备退出登录，请使用新密码重新登录。" en="Use 6–128 characters. Saving signs out all devices; sign in again with your new password." /></p>
          <button type="submit"><UiText zh={busy === 'password' ? '保存中…' : '保存新密码'} en={busy === 'password' ? 'Saving…' : 'Save password'} /></button>
        </fieldset></form> : <p><UiText zh="修改密码暂时不可用，请稍后重试或联系管理员。" en="Password changes are temporarily unavailable. Try later or contact the administrator." /></p>}
      </section>
      <section className="account-settings__section account-settings__danger">
        <h2><UiText zh="永久注销账号" en="Delete account permanently" /></h2>
        <p><UiText zh="注销将删除账号、收藏、留言及投稿；已独立整理发布的笔记保留。此操作无法撤销。" en="This deletes your account, favorites, messages and submissions. Independently published notes remain. This cannot be undone." /></p>
        {settings.role === 'admin' ? <p><UiText zh="管理员不能自助注销。" en="Administrators cannot delete themselves." /></p> : settings.features.deleteAccount ? <form onSubmit={event => void submit(event, 'delete')}><fieldset disabled={busy !== null}>
          <label><UiText zh="当前密码" en="Current password" /><input name="currentPassword" type="password" autoComplete="current-password" required maxLength={128} /></label>
          <label><UiText zh="再次输入用户名确认注销" en="Enter your username to confirm deletion" /><input name="username" required autoComplete="off" maxLength={32} /></label>
          <button type="submit"><UiText zh={busy === 'delete' ? '注销中…' : '永久注销账号'} en={busy === 'delete' ? 'Deleting…' : 'Delete account permanently'} /></button>
        </fieldset></form> : <p><UiText zh="注销暂时不可用，请稍后重试或联系管理员。" en="Account deletion is temporarily unavailable. Try later or contact the administrator." /></p>}
      </section>
    </>}
  </section>;
}
