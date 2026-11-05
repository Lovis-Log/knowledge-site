"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { UiText } from "@/components/ui-text";
import { AccountIcon } from "@/components/account-icon";
import { api } from "@/lib/api";
import { uiLabel } from "@/lib/ui-language";

type Account = {
  id: string;
  username: string;
  nickname: string;
  role: "user" | "admin";
  status: string;
};

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<Account | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let live = true;
    api<{ user: Account | null }>("/api/auth/me")
      .then((result) => {
        if (!live) return;
        setUser(result.user);
        setReady(true);
      })
      .catch(() => {
        if (live) setReady(true);
      });
    return () => {
      live = false;
    };
  }, []);

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

  function activate() {
    if (!ready) return;
    if (!user) {
      const next = encodeURIComponent(
        window.location.pathname + window.location.search,
      );
      window.location.assign(`/login/?next=${next}`);
      return;
    }
    setOpen((current) => !current);
  }

  async function logout() {
    setBusy(true);
    setError("");
    try {
      await api("/api/auth/logout", "POST", {});
      window.location.assign("/");
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "退出失败 / Unable to sign out",
      );
      setBusy(false);
    }
  }

  return (
    <div className="account-menu" ref={rootRef}>
      <button
        type="button"
        ref={triggerRef}
        className="site-nav__account"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={activate}
        {...uiLabel("账号", "Account")}
      >
        <AccountIcon />
        <span className="site-nav__account-label"><UiText zh="账号" en="Account" /></span>
      </button>
      {open && user && (
        <div className="account-pop" role="dialog" {...uiLabel("账号菜单", "Account menu")}>
          <p className="account-pop__name">
            {user.nickname && user.nickname !== user.username
              ? `${user.nickname} · ${user.username}`
              : user.username}
          </p>
          {user.role === "admin" && (
            <Link href="/admin/users/" onClick={() => setOpen(false)}>
              <UiText zh="管理用户" en="Manage users" />
            </Link>
          )}
          {error && (
            <p className="account-pop__error" role="alert">
              {error}
            </p>
          )}
          <button type="button" onClick={logout} disabled={busy}>
            <UiText
              zh={busy ? "退出中…" : "退出登录"}
              en={busy ? "Signing out…" : "Sign out"}
            />
          </button>
        </div>
      )}
    </div>
  );
}
