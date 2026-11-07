"use client";
import { ReaderLink as Link, startNavigation } from "./navigation-feedback";
import { useEffect, useState, type FormEvent } from "react";
import { api, ApiError, safeNext } from "@/lib/api";
import { UiText } from "./ui-text";
import { PasswordInput } from "./password-input";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "@/lib/password-policy";
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
export function AuthPage({ mode }: { mode: "login" | "register" | "reset" }) {
  const [busy, setBusy] = useState(false),
    [entering, setEntering] = useState(false),
    [error, setError] = useState(""),
    [status, setStatus] = useState(""),
    [done, setDone] = useState("");
  useEffect(() => {
    const resume = (event: PageTransitionEvent) => {
      if (event.persisted) { setBusy(false); setEntering(false); }
    };
    window.addEventListener("pageshow", resume);
    return () => window.removeEventListener("pageshow", resume);
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setStatus("");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    let leaving = false;
    try {
      if (mode === "login") {
        await api("/api/auth/login", "POST", values);
        const target = safeNext(new URLSearchParams(window.location.search).get("next"));
        setEntering(true);
        startNavigation(target, { fullDocument: true });
        window.location.assign(target);
        leaving = true;
      } else if (mode === "register") {
        const result = await api<{ status: string }>(
          "/api/auth/register",
          "POST",
          values,
        );
        setDone(result.status);
      } else {
        await api("/api/auth/reset-password", "POST", values);
        setDone("reset");
      }
    } catch (error) {
      setEntering(false);
      if (error instanceof ApiError && error.accountStatus)
        setStatus(error.accountStatus);
      else
        setError(
          error instanceof Error ? error.message : "请求失败 / Request failed",
        );
    } finally {
      if (!leaving) setBusy(false);
    }
  }
  const title =
    mode === "login"
      ? ["欢迎回来", "Welcome back"]
      : mode === "register"
        ? ["申请阅读账号", "Request reading access"]
        : ["重置密码", "Reset password"];
  return (
    <div className="shell auth-shell">
      <section className="auth-card">
        <p className="eyebrow">LovisMind</p>
        <h1>
          <UiText zh={title[0]} en={title[1]} />
        </h1>
        <p className="auth-lede">
          <UiText
            zh={
              mode === "register"
                ? "无需邮箱或手机号。有效邀请码可直接通过，否则由管理员审核。"
                : mode === "login"
                  ? "登录后，继续你的阅读。"
                  : "请使用管理员核实身份后提供的短期凭据。"
            }
            en={
              mode === "register"
                ? "No email or phone required. A valid invite grants access immediately; otherwise an administrator reviews your application."
                : mode === "login"
                  ? "Sign in to continue reading."
                  : "Use the short-lived credential provided by your administrator."
            }
          />
        </p>
        {done ? (
          <div className="auth-result" role="status">
            <UiText
              zh={
                done === "pending"
                  ? "申请已保存，等待管理员审核。请稍后登录查看状态。"
                  : done === "approved"
                    ? "注册成功，你现在可以登录阅读。"
                    : "密码已重置，请使用新密码登录。"
              }
              en={
                done === "pending"
                  ? "Application saved. Sign in later to check your review status."
                  : done === "approved"
                    ? "Registration complete. You can now sign in."
                    : "Password updated. Sign in with your new password."
              }
            />
            <p>
              <Link href="/login/">
                <UiText zh="前往登录" en="Go to sign in" />
              </Link>
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="auth-form">
            {mode === "reset" ? (
              <label>
                <UiText zh="重置凭据" en="Reset credential" />
                <input
                  name="token"
                  required
                  minLength={64}
                  maxLength={64}
                  autoComplete="off"
                  spellCheck={false}
                />
              </label>
            ) : (
              <label>
                <UiText zh="用户名" en="Username" />
                <input
                  name="username"
                  required
                  minLength={3}
                  maxLength={32}
                  pattern="[a-zA-Z0-9_]+"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                />
              </label>
            )}
            <label>
              <UiText zh="密码" en="Password" />
              <PasswordInput
                name="password"
                required
                minLength={mode === "login" ? 1 : PASSWORD_MIN_LENGTH}
                maxLength={mode === "login" ? 128 : PASSWORD_MAX_LENGTH}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
              />
            </label>
            {mode !== "login" && (
              <>
                <label>
                  <UiText zh="确认密码" en="Confirm password" />
                  <PasswordInput
                    name="confirmPassword"
                    required
                    minLength={PASSWORD_MIN_LENGTH}
                    maxLength={PASSWORD_MAX_LENGTH}
                    autoComplete="new-password"
                  />
                </label>
                <p className="form-hint">
                  <UiText
                    zh="密码长度为 6–128 个字符。"
                    en="Use 6–128 characters."
                  />
                </p>
              </>
            )}
            {mode === "register" && (
              <>
                <label>
                  <UiText zh="申请理由" en="Reason for applying" />
                  <textarea name="reason" required maxLength={2000} rows={4} />
                </label>
                <label>
                  <UiText zh="邀请码（可选）" en="Invite code (optional)" />
                  <input
                    name="inviteCode"
                    maxLength={128}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </label>
                <p className="form-hint">
                  <UiText
                    zh="邀请码不可用时，可清空此项申请人工审核。"
                    en="If your invite is unavailable, clear it to apply for manual review."
                  />
                </p>
              </>
            )}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            {status && (
              <p className="auth-result" role="alert">
                <UiText
                  zh={statuses[status]?.[0] ?? "账号不可用"}
                  en={statuses[status]?.[1] ?? "Account unavailable"}
                />
              </p>
            )}
            <button className="auth-button" disabled={busy}>
              <UiText
                zh={
                  entering ? "正在进入书库…" : busy
                    ? "处理中…"
                    : mode === "login"
                      ? "登录"
                      : mode === "register"
                        ? "提交申请"
                        : "设置新密码"
                }
                en={
                  entering ? "Opening your library…" : busy
                    ? "Please wait…"
                    : mode === "login"
                      ? "Sign in"
                      : mode === "register"
                        ? "Submit application"
                        : "Set new password"
                }
              />
            </button>
          </form>
        )}
        <div className="auth-links">
          <Link href={mode === "register" ? "/login/" : "/register/"}>
            <UiText
              zh={mode === "register" ? "已有账号？登录" : "申请账号"}
              en={
                mode === "register"
                  ? "Already registered? Sign in"
                  : "Request an account"
              }
            />
          </Link>
          {mode === "login" && (
            <Link href="/reset-password/">
              <UiText zh="使用重置凭据" en="Use a reset credential" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
