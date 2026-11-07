"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { UiText } from "@/components/ui-text";
import { PasswordInput } from "@/components/password-input";
import { api, ApiError, safeNext } from "@/lib/api";
import { startNavigation } from "../navigation-feedback";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/password-policy";
import { uiLabel } from "@/lib/ui-language";
import styles from "./landing.module.css";

export type AuthView = "login" | "register";

const statuses: Record<string, [string, string]> = {
  pending: [
    "申请正在等待审核，请稍后再来登录。",
    "Your application is awaiting review. Please check back later.",
  ],
  rejected: ["申请未通过审核。", "Your application was declined."],
  disabled: [
    "账号已被禁用，请联系管理员。",
    "Your account is disabled. Please contact the administrator.",
  ],
};

export function AuthModal({
  view,
  onClose,
}: {
  view: AuthView;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<AuthView>(view);
  const [done, setDone] = useState<"" | "pending" | "approved">("");
  const [accountStatus, setAccountStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [entering, setEntering] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const resume = (event: PageTransitionEvent) => {
      if (event.persisted) { setBusy(false); setEntering(false); }
    };
    window.addEventListener("pageshow", resume);
    return () => window.removeEventListener("pageshow", resume);
  }, []);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    document.documentElement.classList.add("lm-modal-open");
    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus();
      if (!dialogRef.current?.querySelector("input")) closeRef.current?.focus();
    }, 0);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [
        ...dialogRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]),input:not([disabled]),textarea:not([disabled]),a[href]",
        ),
      ].filter((node) => node.getClientRects().length > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("lm-modal-open");
      previous?.focus?.();
    };
  }, [onClose]);

  function go(next: AuthView) {
    setMode(next);
    setError("");
    setAccountStatus("");
    setDone("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const values = Object.fromEntries(
      new FormData(event.currentTarget),
    ) as Record<string, string>;
    if (mode === "register") {
      if (!/^[a-zA-Z0-9_]{3,32}$/.test(values.username ?? "")) {
        setError(
          "用户名需为 3–32 位字母、数字或下划线。 / Username must be 3–32 letters, digits or underscores.",
        );
        return;
      }
      if ((values.password ?? "").length < PASSWORD_MIN_LENGTH) {
        setError(
          `密码至少需要 ${PASSWORD_MIN_LENGTH} 个字符。 / Use at least ${PASSWORD_MIN_LENGTH} characters.`,
        );
        return;
      }
      if (values.password !== values.confirmPassword) {
        setError("两次输入的密码不一致。 / Passwords do not match.");
        return;
      }
      if (!values.reason?.trim()) {
        setError("请填写申请理由。 / Please describe why you are applying.");
        return;
      }
    }
    setBusy(true);
    setError("");
    setAccountStatus("");
    let leaving = false;
    try {
      if (mode === "login") {
        await api("/api/auth/login", "POST", {
          username: values.username,
          password: values.password,
        });
        const target = safeNext(new URLSearchParams(window.location.search).get("next"));
        setEntering(true);
        startNavigation(target, { fullDocument: true });
        window.location.assign(target);
        leaving = true;
        return;
      }
      const result = await api<{ status: string }>("/api/auth/register", "POST", {
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
        reason: values.reason,
        inviteCode: values.inviteCode ?? "",
      });
      setDone(result.status === "approved" ? "approved" : "pending");
    } catch (caught) {
      setEntering(false);
      if (caught instanceof ApiError && caught.accountStatus) {
        setAccountStatus(caught.accountStatus);
      } else {
        setError(
          caught instanceof Error ? caught.message : "请求失败 / Request failed",
        );
      }
    } finally {
      if (!leaving) setBusy(false);
    }
  }

  function statusScreen(key: "pending" | "approved") {
    const pending = key === "pending";
    return (
      <>
        <div className={styles.statusSymbol}>{pending ? "⌛" : "✓"}</div>
        <div className={styles.authOverline}>
          {pending ? "APPLICATION / PENDING" : "MEMBERSHIP / APPROVED"}
        </div>
        <h2 className={styles.authTitle} id="authHeading">
          <UiText
            zh={pending ? "申请正在审核中。" : "欢迎加入 LovisMind。"}
            en={
              pending
                ? "Your request is in review."
                : "Welcome to LovisMind."
            }
          />
        </h2>
        <p className={styles.authSub}>
          <UiText
            zh={
              pending
                ? "账号已经创建，但管理员审核通过前，知识库内容暂不可访问。"
                : "邀请码验证成功，你的账户已通过审核。"
            }
            en={
              pending
                ? "Your account exists, but the library stays locked until an administrator approves it."
                : "Your invitation has been accepted and your account is approved."
            }
          />
        </p>
        <div className={styles.statusCard}>
          <UiText
            zh={
              pending
                ? "你仍可以使用用户名密码登录查看审核状态；审核期间无法阅读知识库。"
                : "请使用刚设置的用户名和密码登录，进入你的书库。"
            }
            en={
              pending
                ? "You can still sign in to check your account status. No reading content is available while approval is pending."
                : "Sign in with the username and password you just set to open the library."
            }
          />
        </div>
        <button
          className={styles.fullButton}
          type="button"
          onClick={() => {
            setDone("");
            go("login");
          }}
        >
          <UiText zh="前往登录" en="Go to sign in" />
          <span aria-hidden="true">→</span>
        </button>
      </>
    );
  }

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.auth}
        role="dialog"
        aria-modal="true"
        aria-labelledby="authHeading"
      >
        <div className={styles.authArt}>
          <span className={styles.authOverline}>LOVISMIND / PRIVATE LIBRARY</span>
          <div>
            <div className={styles.authArtTitle}>
              <UiText
                zh="给思想一处安静的归所。"
                en="Where ideas find a home."
              />
            </div>
            <p>
              <UiText
                zh="在这里阅读、联想，并记住值得珍藏的事物。"
                en="A quiet space to read, connect and remember."
              />
            </p>
          </div>
          <small>PERSONAL KNOWLEDGE VAULT · 2026</small>
        </div>
        <div className={styles.authPane}>
          {done ? (
            statusScreen(done)
          ) : accountStatus ? (
            <>
              <div className={styles.statusSymbol}>!</div>
              <div className={styles.authOverline}>APPLICATION / STATUS</div>
              <h2 className={styles.authTitle} id="authHeading">
                <UiText zh="账号暂时无法登录。" en="This account cannot sign in yet." />
              </h2>
              <div className={styles.statusCard}>
                <UiText
                  zh={statuses[accountStatus]?.[0] ?? "账号不可用。"}
                  en={statuses[accountStatus]?.[1] ?? "Account unavailable."}
                />
              </div>
              <button
                className={styles.fullButton}
                type="button"
                onClick={() => {
                  setAccountStatus("");
                  go("login");
                }}
              >
                <UiText zh="返回登录" en="Back to sign in" />
                <span aria-hidden="true">→</span>
              </button>
            </>
          ) : (
            <>
              <div className={styles.authOverline}>
                {mode === "login"
                  ? "MEMBER ACCESS / SIGN IN"
                  : "MEMBER ACCESS / APPLICATION"}
              </div>
              <h2 className={styles.authTitle} id="authHeading">
                <UiText
                  zh={mode === "login" ? "欢迎回来。" : "创建你的账号。"}
                  en={mode === "login" ? "Welcome back." : "Create your account."}
                />
              </h2>
              <p className={styles.authSub}>
                <UiText
                  zh={
                    mode === "login"
                      ? "登录后进入属于你的知识空间。"
                      : "填写有效邀请码即可自动通过，留空则进入人工审核。"
                  }
                  en={
                    mode === "login"
                      ? "Enter your credentials to access the knowledge vault."
                      : "Use an invitation code for instant access, or leave it blank to request approval."
                  }
                />
              </p>
              {error && (
                <p className={styles.formError} role="alert">
                  {error}
                </p>
              )}
              <form onSubmit={submit} noValidate>
                <div className={styles.field}>
                  <label htmlFor="lm-username">
                    <UiText zh="用户名" en="Username" />
                  </label>
                  <input
                    id="lm-username"
                    name="username"
                    required
                    minLength={3}
                    maxLength={32}
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder={
                      mode === "login" ? "Your username" : "Choose a username"
                    }
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="lm-password">
                    <UiText zh="密码" en="Password" />
                  </label>
                  <PasswordInput
                    id="lm-password"
                    name="password"
                    required
                    minLength={mode === "login" ? 1 : PASSWORD_MIN_LENGTH}
                    maxLength={PASSWORD_MAX_LENGTH}
                    autoComplete={
                      mode === "login" ? "current-password" : "new-password"
                    }
                    placeholder="••••••••"
                  />
                </div>
                {mode === "register" && (
                  <>
                    <p className={styles.fieldHint}>
                      <UiText
                        zh={`密码至少 ${PASSWORD_MIN_LENGTH} 个字符。`}
                        en={`Use at least ${PASSWORD_MIN_LENGTH} characters.`}
                      />
                    </p>
                    <div className={styles.field}>
                      <label htmlFor="lm-confirm">
                        <UiText zh="确认密码" en="Confirm password" />
                      </label>
                      <PasswordInput
                        id="lm-confirm"
                        name="confirmPassword"
                        required
                        minLength={PASSWORD_MIN_LENGTH}
                        maxLength={PASSWORD_MAX_LENGTH}
                        autoComplete="new-password"
                        placeholder="Repeat your password"
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="lm-reason">
                        <UiText zh="申请理由" en="Reason for applying" />
                      </label>
                      <input
                        id="lm-reason"
                        name="reason"
                        required
                        maxLength={2000}
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="lm-invite">
                        <UiText
                          zh="邀请码（选填）"
                          en="Invitation code (optional)"
                        />
                      </label>
                      <input
                        id="lm-invite"
                        name="inviteCode"
                        maxLength={128}
                        autoComplete="off"
                        spellCheck={false}
                        placeholder="LOVIS-XXXX"
                      />
                    </div>
                    <p className={styles.micro}>
                      <UiText
                        zh="没有邀请码？留空即可提交人工审核。"
                        en="No invitation? Leave this blank to request manual review."
                      />
                    </p>
                  </>
                )}
                <button className={styles.fullButton} type="submit" disabled={busy}>
                  <UiText
                    zh={
                      entering ? "正在进入书库…" : busy
                        ? "处理中…"
                        : mode === "login"
                          ? "登录"
                          : "创建账号"
                    }
                    en={
                      entering ? "Opening your library…" : busy
                        ? "Please wait…"
                        : mode === "login"
                          ? "Sign in"
                          : "Create account"
                    }
                  />
                  <span aria-hidden="true">→</span>
                </button>
              </form>
              <div className={styles.switch}>
                <UiText
                  zh={mode === "login" ? "第一次来到 LovisMind？" : "已经有账号？"}
                  en={
                    mode === "login"
                      ? "New to LovisMind?"
                      : "Already have an account?"
                  }
                />{" "}
                <button
                  type="button"
                  onClick={() => go(mode === "login" ? "register" : "login")}
                >
                  <UiText
                    zh={mode === "login" ? "创建账号" : "返回登录"}
                    en={mode === "login" ? "Create an account" : "Back to sign in"}
                  />
                </button>
                {mode === "login" && (
                  <>
                    <span aria-hidden="true"> · </span>
                    <a href="/reset-password/">
                      <UiText zh="使用重置凭据" en="Use a reset credential" />
                    </a>
                  </>
                )}
              </div>
            </>
          )}
        </div>
        <button
          ref={closeRef}
          type="button"
          className={styles.authClose}
          onClick={onClose}
          {...uiLabel("关闭", "Close")}
        >
          ×
        </button>
      </div>
    </div>
  );
}
