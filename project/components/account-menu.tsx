"use client";

import { ReaderLink as Link } from "@/components/navigation-feedback";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { UiText } from "@/components/ui-text";
import { AccountIcon } from "@/components/account-icon";
import { AccountAvatar } from "@/components/account-avatar";
import { DestinationIcon } from "@/components/page-heading";
import { RocketLoader } from "@/components/rocket-loader";
import { api } from "@/lib/api";
import { uiLabel } from "@/lib/ui-language";

type Account = {
  id: string;
  username: string;
  nickname: string;
  role: "user" | "admin";
  status: string;
};

export function AccountMenu({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<Account | null>(null);
  const [ready, setReady] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const signingOut = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const refresh = () => setAttempt(value => value + 1);
    window.addEventListener('account:updated', refresh);
    return () => window.removeEventListener('account:updated', refresh);
  }, []);

  useEffect(() => {
    let live = true;
    api<{ user: Account | null }>("/api/auth/me")
      .then((result) => {
        if (!live) return;
        setUser(result.user);
        setReady(true);
      })
      .catch(() => {
        if (live) setLookupError("无法读取登录状态 / Unable to check sign-in");
      });
    return () => {
      live = false;
    };
  }, [attempt]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  async function logout() {
    if (signingOut.current) return;
    signingOut.current = true;
    setBusy(true);
    setError("");
    try {
      await api("/api/auth/logout", "POST", {});
      window.location.assign("/");
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "退出失败 / Unable to sign out",
      );
      signingOut.current = false;
      setBusy(false);
    }
  }

  return (
    <>
      {user && (
        <Link href="/guestbook/" prefetch={false} className="site-nav__guestbook" {...uiLabel("留言板", "Guestbook")}>
          <svg className="site-nav__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 4h16v12H9l-5 4zM8 8h8m-8 4h8" />
          </svg>
          <UiText zh="留言板" en="Guestbook" />
        </Link>
      )}
      {children}
      <div className="account-menu" ref={rootRef}>
        <button
          type="button"
          ref={triggerRef}
          className="site-nav__account"
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          {...uiLabel("账号", "Account")}
        >
          {user ? <AccountAvatar username={user.username} /> : <AccountIcon />}
        </button>
        {open && !ready && (
          <div className="account-pop" role="dialog" {...uiLabel("账号菜单", "Account menu")}>
            {lookupError ? <>
              <p className="account-pop__error" role="alert">{lookupError}</p>
              <button type="button" onClick={() => { setLookupError(""); setAttempt((value) => value + 1); }}>
                <UiText zh="重试" en="Retry" />
              </button>
            </> : <RocketLoader compact />}
          </div>
        )}
        {open && ready && !user && (
          <div className="account-pop" role="dialog" {...uiLabel("账号菜单", "Account menu")}>
            <Link href={"/login/?next=" + encodeURIComponent(window.location.pathname + window.location.search)} onClick={() => setOpen(false)}><UiText zh="登录" en="Sign in" /></Link>
            <Link href="/about/" onClick={() => setOpen(false)}><UiText zh="关于" en="About" /></Link>
          </div>
        )}
        {open && user && (
          <div className="account-pop" role="dialog" {...uiLabel("账号菜单", "Account menu")}>
            <p className="account-pop__name">
              {user.username}
            </p>
            <Link href="/favorites/" prefetch={false} onClick={() => setOpen(false)}>
              <DestinationIcon kind="favorites" />
              <UiText zh="我的收藏" en="My favorites" />
            </Link>
            {user.role === "admin" && (
              <Link href="/admin/users/" onClick={() => setOpen(false)}>
                <DestinationIcon kind="users" />
                <UiText zh="管理用户" en="Manage users" />
              </Link>
            )}
            <Link href="/settings/" prefetch={false} onClick={() => setOpen(false)}><DestinationIcon kind="settings" /><UiText zh="账号设置" en="Account settings" /></Link>
            <Link href="/about/" onClick={() => setOpen(false)}><DestinationIcon kind="about" /><UiText zh="关于" en="About" /></Link>
            {error && (
              <p className="account-pop__error" role="alert">
                {error}
              </p>
            )}
            <button type="button" onClick={logout} disabled={busy}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 4H4v16h5M10 12h10m-4-4 4 4-4 4" /></svg>
              <UiText
                zh={busy ? "退出中…" : "退出登录"}
                en={busy ? "Signing out…" : "Sign out"}
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
