"use client";

import { ApiError } from "@/lib/api";
import { useEffect, useState } from "react";
import { UiText } from "./ui-text";

export function isAuthError(error: unknown) {
  return error instanceof ApiError && error.status === 401;
}

export function isNotFoundError(error: unknown) {
  return error instanceof ApiError && (error.status === 404 || error.code === "NOT_FOUND");
}

export function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "请求失败 / Request failed";
}

export function toError(error: unknown) {
  return error instanceof Error ? error : new Error(errorMessage(error));
}

export function loginRedirectHref(location: { pathname: string; search?: string; hash?: string }) {
  const next = location.pathname + (location.search ?? "") + (location.hash ?? "");
  return "/login/?next=" + encodeURIComponent(next);
}

/**
 * Shared 401 recovery: keep the current page and its draft, sign in through a
 * new tab, then return here and retry explicitly. Nothing is written to storage.
 */
export function SessionRecovery({ error, onRetry }: { error?: string; onRetry?: () => void }) {
  const [href, setHref] = useState("/login/");

  useEffect(() => {
    setHref(loginRedirectHref(window.location));
  }, []);

  return (
    <section
      className="session-recovery"
      role="alert"
      style={{
        display: "grid",
        gap: ".5rem",
        margin: "1rem 0",
        padding: ".75rem 1rem",
        border: "1px solid color-mix(in srgb, currentColor 25%, transparent)",
        borderRadius: ".5rem",
      }}
    >
      {error && <p style={{ margin: 0 }}>{error}</p>}
      <p style={{ margin: 0 }}>
        <UiText
          zh="登录状态已失效，请在新标签页重新登录。本页内容和草稿会保留，登录后回到本页重试。"
          en="Your sign-in has expired. Sign in again in a new tab; this page and its draft stay as they are, then return here and retry."
        />
      </p>
      <p style={{ margin: 0 }}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          <UiText zh="在新标签页重新登录" en="Sign in again in a new tab" />
        </a>
      </p>
      {onRetry && (
        <p style={{ margin: 0 }}>
          <button type="button" className="reader-action" onClick={onRetry}>
            <UiText zh="已重新登录，重试" en="Signed in — retry" />
          </button>
        </p>
      )}
    </section>
  );
}
