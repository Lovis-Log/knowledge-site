"use client";

import { useEffect, useState, useRef, type FormEvent } from 'react';
import { api, ApiError } from '@/lib/api';
import { UiText } from '@/components/ui-text';
import { AccountAvatar } from '@/components/account-avatar';
import { PageHeading } from '@/components/page-heading';
import { PasswordInput } from '@/components/password-input';

type Settings = { username: string; role: string; features: { changePassword: boolean; deleteAccount: boolean } };
type Action = 'profile' | 'password' | 'delete';

function FreshPassword({ id }: { id: string }) {
  return <PasswordInput id={id} name="currentPassword" required maxLength={128} autoComplete="new-password" fresh />;
}

export function AccountSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState<Action | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [editing, setEditing] = useState(false);
  const [securityPanel, setSecurityPanel] = useState<'password' | 'delete' | null>(null);
  const renameButton = useRef<HTMLButtonElement>(null);
  const passwordButton = useRef<HTMLButtonElement>(null);
  const deleteButton = useRef<HTMLButtonElement>(null);
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
      const result = await api<{ username: string }>('/api/account/' + action, 'POST', values);
      if (action === 'profile') {
        setSettings(previous => previous && ({ ...previous, username: result.username }));
        setEditing(false);
        renameButton.current?.focus();
        window.dispatchEvent(new Event('account:updated'));
        setNotice('用户名已修改 / Username updated');
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
    <PageHeading kind="settings" zh="账号设置" en="Account settings" />
    {error && <p role="alert">{error}</p>}{notice && <p role="status">{notice}</p>}
    {!settings ? error ? <button type="button" onClick={() => { setError(''); setAttempt(value => value + 1); }}><UiText zh="重新加载" en="Retry" /></button> : <p role="status"><UiText zh="加载中…" en="Loading…" /></p> : <>
      <div className="account-settings__identity"><AccountAvatar username={settings.username} large /><strong>{settings.username}</strong>
        <button ref={renameButton} type="button" className="account-settings__rename" disabled={busy !== null} aria-expanded={editing} aria-controls="account-rename" onClick={() => { setEditing(value => !value); setSecurityPanel(null); setError(''); setNotice(''); }}><UiText zh="修改用户名" en="Change username" /></button>
      </div>
      {editing && <form id="account-rename" className="account-settings__editor" onSubmit={event => void submit(event, 'profile')} autoComplete="off"><fieldset disabled={busy !== null}>
        <label><UiText zh="新用户名" en="New username" /><input name="username" autoComplete="off" required minLength={3} maxLength={32} pattern="[a-zA-Z0-9_]{3,32}" defaultValue={settings.username} autoFocus /></label>
        <label htmlFor="rename-password"><UiText zh="当前密码" en="Current password" /></label><FreshPassword id="rename-password" />
        <div className="account-settings__actions"><button type="submit"><UiText zh={busy === 'profile' ? '保存中…' : '保存'} en={busy === 'profile' ? 'Saving…' : 'Save'} /></button><button type="button" onClick={() => { setEditing(false); setError(''); renameButton.current?.focus(); }}><UiText zh="取消" en="Cancel" /></button></div>
      </fieldset></form>}
      <div className="account-settings__security-controls">
        <button ref={passwordButton} type="button" disabled={busy !== null || !settings.features.changePassword} aria-expanded={securityPanel === 'password'} aria-controls="account-password" onClick={() => { setSecurityPanel(value => value === 'password' ? null : 'password'); setEditing(false); setError(''); setNotice(''); }}><UiText zh="修改密码" en="Change password" /></button>
        <button ref={deleteButton} type="button" className="account-settings__delete-trigger" disabled={busy !== null || settings.role === 'admin' || !settings.features.deleteAccount} title={settings.role === 'admin' ? '管理员不能自助注销 / Administrators cannot delete themselves' : undefined} aria-expanded={securityPanel === 'delete'} aria-controls="account-delete" onClick={() => { setSecurityPanel(value => value === 'delete' ? null : 'delete'); setEditing(false); setError(''); setNotice(''); }}><UiText zh="注销账号" en="Delete account" /></button>
      </div>
      {securityPanel === 'password' && <section id="account-password" className="account-settings__section account-settings__panel">
        <h2><UiText zh="修改密码" en="Change password" /></h2>
        {settings.features.changePassword ? <form onSubmit={event => void submit(event, 'password')}><fieldset disabled={busy !== null}>
          <label htmlFor="change-password-current"><UiText zh="当前密码" en="Current password" /></label><FreshPassword id="change-password-current" />
          <label><UiText zh="新密码" en="New password" /><PasswordInput name="password" autoComplete="new-password" required minLength={6} maxLength={128} /></label>
          <label><UiText zh="确认新密码" en="Confirm new password" /><PasswordInput name="confirmPassword" autoComplete="new-password" required minLength={6} maxLength={128} /></label>
          <div className="account-settings__actions"><button type="submit"><UiText zh={busy === 'password' ? '保存中…' : '保存新密码'} en={busy === 'password' ? 'Saving…' : 'Save password'} /></button><button type="button" onClick={() => { setSecurityPanel(null); setError(''); passwordButton.current?.focus(); }}><UiText zh="取消" en="Cancel" /></button></div>
        </fieldset></form> : <p><UiText zh="修改密码暂时不可用，请稍后重试或联系管理员。" en="Password changes are temporarily unavailable. Try later or contact the administrator." /></p>}
      </section>}
      {securityPanel === 'delete' && <section id="account-delete" className="account-settings__section account-settings__panel account-settings__danger">
        <h2><UiText zh="永久注销账号" en="Delete account permanently" /></h2>
        <p><UiText zh="账号及个人内容将被永久删除，无法撤销。" en="Your account and personal content will be permanently deleted. This cannot be undone." /></p>
        {settings.role === 'admin' ? <p><UiText zh="管理员不能自助注销。" en="Administrators cannot delete themselves." /></p> : settings.features.deleteAccount ? <form onSubmit={event => void submit(event, 'delete')} autoComplete="off"><fieldset disabled={busy !== null}>
          <label htmlFor="delete-password"><UiText zh="输入密码确认注销" en="Enter password to delete account" /></label><FreshPassword id="delete-password" />
          <div className="account-settings__actions"><button type="submit"><UiText zh={busy === 'delete' ? '注销中…' : '确认永久注销'} en={busy === 'delete' ? 'Deleting…' : 'Confirm deletion'} /></button><button type="button" onClick={() => { setSecurityPanel(null); setError(''); deleteButton.current?.focus(); }}><UiText zh="取消" en="Cancel" /></button></div>
        </fieldset></form> : <p><UiText zh="注销暂时不可用，请稍后重试或联系管理员。" en="Account deletion is temporarily unavailable. Try later or contact the administrator." /></p>}
      </section>}
    </>}
  </section>;
}
