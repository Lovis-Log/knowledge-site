"use client";
import { ReaderLink as Link, startNavigation } from "./navigation-feedback";
import { useEffect, useState, type FormEvent } from "react";
import { api, ApiError, safeNext } from "@/lib/api";
import { UiText } from "./ui-text";
import { PasswordInput } from "./password-input";
import accessStyles from "./register-choice.module.css";
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
    [access, setAccess] = useState<"" | "invite" | "apply">(""),
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
    const values = Object.fromEntries(new FormData(event.currentTarget));
    if (mode === "register") {
      if (!access) {
        setError("请选择是否有邀请码。 / Choose whether you have an invite code.");
        return;
      }
      if (access === "invite" && !String(values.inviteCode ?? "").trim()) {
        setError("请输入邀请码。 / Enter your invite code.");
        return;
      }
      if (access === "apply" && !String(values.reason ?? "").trim()) {
        setError("请填写申请理由。 / Describe why you are applying.");
        return;
      }
    }
    setBusy(true);
    setError("");
    setStatus("");
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
          {
            username: values.username,
            password: values.password,
            confirmPassword: values.confirmPassword,
            ...(access === "invite"
              ? { inviteCode: values.inviteCode }
              : { reason: values.reason }),
          },
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
                ? "无需邮箱或手机号。使用邀请码可直接通过，或提交申请由管理员审核。"
                : mode === "login"
                  ? "登录后，继续你的阅读。"
                  : "请使用管理员核实身份后提供的短期凭据。"
            }
            en={
              mode === "register"
                ? "No email or phone required. Use an invite code for immediate access, or apply for administrator review."
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
                <fieldset className={accessStyles.group}>
                  <legend className={accessStyles.legend}>
                    <UiText zh="注册方式" en="Registration type" />
                  </legend>
                  <div className={accessStyles.options}>
                    <label className={accessStyles.option}>
                      <input
                        type="radio"
                        name="accessMode"
                        value="invite"
                        checked={access === "invite"}
                        onChange={() => { setAccess("invite"); setError(""); }}
                      />
                      <span className={accessStyles.marker} aria-hidden="true" />
                      <span className={accessStyles.copy}>
                        <strong><UiText zh="我有邀请码" en="I have an invite code" /></strong>
                        <small><UiText zh="填写邀请码，验证后直接通过。" en="Enter it for immediate access." /></small>
                      </span>
                    </label>
                    <label className={accessStyles.option}>
                      <input
                        type="radio"
                        name="accessMode"
                        value="apply"
                        checked={access === "apply"}
                        onChange={() => { setAccess("apply"); setError(""); }}
                      />
                      <span className={accessStyles.marker} aria-hidden="true" />
                      <span className={accessStyles.copy}>
                        <strong><UiText zh="我没有邀请码" en="I have no invite code" /></strong>
                        <small><UiText zh="填写申请理由，由管理员审核。" en="Apply and an administrator will review." /></small>
                      </span>
                    </label>
                  </div>
                </fieldset>
                {access === "invite" && (
                  <label>
                    <UiText zh="邀请码" en="Invite code" />
                    <input
                      name="inviteCode"
                      required
                      maxLength={128}
                      autoComplete="off"
                      spellCheck={false}
                    />
                  </label>
                )}
                {access === "apply" && (
                  <label>
                    <UiText zh="申请理由" en="Reason for applying" />
                    <textarea name="reason" required maxLength={2000} rows={4} />
                  </label>
                )}
                <p className="form-hint">
                  <UiText
                    zh={
                      access === "invite"
                        ? "邀请码无效时，可改选“我没有邀请码”提交人工审核。"
                        : access === "apply"
                          ? "请简要说明希望阅读的内容与用途。"
                          : "请选择一种注册方式。"
                    }
                    en={
                      access === "invite"
                        ? "If your code is unavailable, choose “I have no invite code” to apply for review."
                        : access === "apply"
                          ? "Briefly describe what you hope to read and why."
                          : "Choose one registration path."
                    }
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
