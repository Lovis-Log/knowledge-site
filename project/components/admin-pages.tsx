"use client";
import { ReaderLink as Link } from "@/components/navigation-feedback";
import { useEffect, useState, useRef, type FormEvent } from "react";
import { api, ApiError } from "@/lib/api";
import { UiText } from "./ui-text";
import { CopyButton } from "./copy-button";
type User = {
  id: string;
  username: string;
  nickname: string;
  reason: string;
  role: string;
  status: string;
  created_at: number;
  version: number;
};
type Invite = {
  id: string;
  code: string | null;
  expires_at: number;
  max_uses: number;
  uses: number;
  revoked: number;
  created_at: number;
};
type Review = {
  id: string;
  action: string;
  note: string;
  admin_username: string;
  created_at: number;
};
const labels: Record<string, [string, string]> = {
  pending: ["待审核", "Pending"],
  approved: ["已通过", "Approved"],
  rejected: ["已拒绝", "Rejected"],
  disabled: ["已禁用", "Disabled"],
};
function errorMessage(e: unknown) {
  return e instanceof Error ? e.message : "操作失败 / Request failed";
}
function date(seconds: number) {
  return new Date(seconds * 1000).toLocaleString();
}
export function AdminPage({ mode }: { mode: "users" | "invites" }) {
  const [users, setUsers] = useState<User[]>([]),
    [invites, setInvites] = useState<Invite[]>([]),
    [pending, setPending] = useState(0),
    [total, setTotal] = useState(0),
    [page, setPage] = useState(1),
    [status, setStatus] = useState("");
  const [summary, setSummary] = useState<{ accountCount: number; statusCounts: Record<string, number> } | null>(null);
  const [selected, setSelected] = useState<User | null>(null),
    [logs, setLogs] = useState<Review[]>([]),
    [note, setNote] = useState(""),
    [secret, setSecret] = useState(""),
    [secretKind, setSecretKind] = useState<"invite" | "reset">("invite");
  const [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [loaded, setLoaded] = useState(false);
  const loadSequence = useRef(0),
    reviewSequence = useRef(0);
  function handleError(e: unknown) {
    if (e instanceof ApiError && e.status === 401) {
      window.location.replace(
        "/login/?next=" + encodeURIComponent(window.location.pathname),
      );
      return;
    }
    setError(errorMessage(e));
  }
  async function load() {
    const sequence = ++loadSequence.current;
    if (mode === "users") {
      const result = await api<{
        users: User[];
        pendingCount: number;
        accountCount: number;
        statusCounts: Record<string, number>;
        total: number;
      }>(`/api/admin/users?status=${status}&page=${page}`);
      if (sequence !== loadSequence.current) return;
      setUsers(result.users);
      setSummary({ accountCount: result.accountCount, statusCounts: result.statusCounts });
      setPending(result.pendingCount);
      setTotal(result.total);
    } else {
      const [result, counts] = await Promise.all([
        api<{ invites: Invite[]; total: number }>(
          `/api/admin/invites?page=${page}`,
        ),
        api<{ pendingCount: number }>("/api/admin/users?status=pending"),
      ]);
      if (sequence !== loadSequence.current) return;
      setInvites(result.invites);
      setTotal(result.total);
      setPending(counts.pendingCount);
    }
    setLoaded(true);
  }
  useEffect(() => {
    let active = true;
    setSecret("");
    setLoaded(false);
    setSelected(null);
    setError("");
    void load().catch((e) => {
      if (active) handleError(e);
    });
    return () => {
      active = false;
      loadSequence.current++;
      reviewSequence.current++;
    };
  }, [mode, status, page]); // Every query is independently authorized by the backend.
  async function inspect(user: User) {
    const sequence = ++reviewSequence.current;
    setSelected(user);
    setNote("");
    setLogs([]);
    setError("");
    try {
      const result = await api<{ logs: Review[] }>(
        `/api/admin/users/${user.id}/reviews`,
      );
      if (sequence !== reviewSequence.current) return;
      setLogs(result.logs);
    } catch (e) {
      handleError(e);
    }
  }
  async function act(action: string) {
    if (!selected) return;
    setBusy(true);
    setError("");
    try {
      await api(`/api/admin/users/${selected.id}`, "PATCH", {
        action,
        note,
        version: selected.version,
      });
      setSelected(null);
      setNote("");
      await load();
    } catch (e) {
      handleError(e);
    } finally {
      setBusy(false);
    }
  }
  async function issueReset() {
    if (!selected) return;
    setBusy(true);
    setError("");
    try {
      const result = await api<{ token: string }>(
        `/api/admin/users/${selected.id}/reset-credential`,
        "POST",
        { note },
      );
      setSecretKind("reset");
      setSecret(result.token);
      await inspect(selected);
    } catch (e) {
      handleError(e);
    } finally {
      setBusy(false);
    }
  }
  async function createInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      const result = await api<{ code: string }>("/api/admin/invites", "POST", {
        maxUses: Number(values.get("maxUses")),
        expiresAt: Math.floor(
          new Date(String(values.get("expiresAt"))).getTime() / 1000,
        ),
      });
      setSecretKind("invite");
      setSecret(result.code);
      await load();
    } catch (e) {
      handleError(e);
    } finally {
      setBusy(false);
    }
  }
  async function revoke(id: string) {
    setBusy(true);
    setError("");
    try {
      await api(`/api/admin/invites/${id}`, "PATCH", { action: "revoke" });
      await load();
    } catch (e) {
      handleError(e);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="shell admin-shell">
      <header className="admin-heading">
        <div>
          <p className="eyebrow">
            LovisMind · <UiText zh="管理后台" en="Administration" />
          </p>
          <h1>
            <UiText
              zh={mode === "users" ? "申请与用户" : "邀请码"}
              en={mode === "users" ? "Applications & users" : "Invites"}
            />
          </h1>
        </div>
        {mode === "invites" && <span className="badge">
          <UiText zh={`待审核 ${pending}`} en={`${pending} pending`} />
        </span>}
      </header>
      <nav className="admin-nav">
        <Link href="/admin/users/">
          <UiText zh="用户审核" en="User reviews" />
        </Link>
        <Link href="/admin/invites/">
          <UiText zh="邀请码" en="Invites" />
        </Link>
        <Link href="/library/">
          <UiText zh="返回书库" en="Back to library" />
        </Link>
      </nav>
      {mode === "users" && summary && (
        <div className="admin-account-counts" aria-live="polite">
          <span className="badge"><UiText zh={`账号总数 ${summary.accountCount}`} en={`Total accounts ${summary.accountCount}`} /></span>
          {Object.entries(labels).map(([state, [zh, en]]) => (
            <span className="badge" key={state}><UiText zh={`${zh} ${summary.statusCounts[state]}`} en={`${en} ${summary.statusCounts[state]}`} /></span>
          ))}
        </div>
      )}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {secret && (
        <section className="secret-result" role="status">
          <h2>
            <UiText
              zh={
                secretKind === "invite"
                  ? "邀请码已生成"
                  : "一次性重置凭据 · 15 分钟有效"
              }
              en={
                secretKind === "invite"
                  ? "Invite code created"
                  : "One-use reset credential · expires in 15 minutes"
              }
            />
          </h2>
          <p>
            <UiText
              zh={
                secretKind === "invite"
                  ? "可随时在下方列表中查看和复制。"
                  : "请在核实身份后安全转交用户，在 /reset-password/ 使用。签发已撤销旧会话。"
              }
              en={
                secretKind === "invite"
                  ? "You can view and copy this code from the list at any time."
                  : "Verify identity before sharing. Redeem at /reset-password/. Existing sessions have been revoked."
              }
            />
          </p>
          <input
            aria-label={secretKind === "invite" ? "邀请码 / Invite code" : "一次性凭据 / One-time credential"}
            readOnly
            value={secret}
            onFocus={(e) => e.currentTarget.select()}
          />
          <div className="admin-actions">
            <CopyButton value={secret} />
            <button onClick={() => setSecret("")}>
              {secretKind === "invite" ? <UiText zh="关闭" en="Dismiss" /> : <UiText zh="已保存，关闭" en="Saved, dismiss" />}
            </button>
          </div>
        </section>
      )}
      {mode === "users" ? (
        <>
          <label className="admin-filter">
            <UiText zh="状态筛选" en="Filter by status" />
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="">全部 / All</option>
              {Object.entries(labels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label.join(" / ")}
                </option>
              ))}
            </select>
          </label>
          {!loaded && !error && (
            <p role="status">
              <UiText zh="正在加载…" en="Loading…" />
            </p>
          )}
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>
                    <UiText zh="账号" en="Account" />
                  </th>
                  <th>
                    <UiText zh="状态" en="Status" />
                  </th>
                  <th>
                    <UiText zh="申请时间" en="Applied" />
                  </th>
                  <th>
                    <UiText zh="操作" en="Actions" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <strong>{user.username}</strong>
                      <br />
                      {user.nickname}
                      {user.role === "admin" && " · admin"}
                    </td>
                    <td>{labels[user.status]?.join(" / ")}</td>
                    <td>{date(user.created_at)}</td>
                    <td>
                      <button
                        disabled={busy}
                        onClick={() => void inspect(user)}
                      >
                        <UiText zh="查看" en="Review" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {loaded && !users.length && (
            <p>
              <UiText zh="暂无符合条件的账号。" en="No matching accounts." />
            </p>
          )}
          <div className="admin-actions">
            <button
              disabled={page <= 1 || busy}
              onClick={() => setPage((p) => p - 1)}
            >
              <UiText zh="上一页" en="Previous" />
            </button>
            <span>
              {page} / {Math.max(1, Math.ceil(total / 30))}
            </span>
            <button
              disabled={page * 30 >= total || busy}
              onClick={() => setPage((p) => p + 1)}
            >
              <UiText zh="下一页" en="Next" />
            </button>
          </div>
          {selected && (
            <section className="review-panel">
              <h2>
                {selected.nickname && selected.nickname !== selected.username
                  ? `${selected.username} · ${selected.nickname}`
                  : selected.username}
              </h2>
              <h3>
                <UiText zh="申请理由" en="Application reason" />
              </h3>
              <p className="review-reason">{selected.reason}</p>
              <label>
                <UiText
                  zh="审核备注（仅管理员可见）"
                  en="Review note (administrators only)"
                />
                <textarea
                  rows={3}
                  maxLength={2000}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </label>
              {selected.role !== "admin" && (
                <div className="admin-actions">
                  {(selected.status === "pending" ||
                    selected.status === "rejected") && (
                    <button disabled={busy} onClick={() => void act("approve")}>
                      <UiText zh="通过申请" en="Approve" />
                    </button>
                  )}
                  {selected.status === "pending" && (
                    <button disabled={busy} onClick={() => void act("reject")}>
                      <UiText zh="拒绝申请" en="Decline" />
                    </button>
                  )}
                  {selected.status === "approved" && (
                    <button disabled={busy} onClick={() => void act("disable")}>
                      <UiText zh="禁用账号" en="Disable" />
                    </button>
                  )}
                  {selected.status === "disabled" && (
                    <button disabled={busy} onClick={() => void act("enable")}>
                      <UiText zh="重新启用" en="Enable" />
                    </button>
                  )}
                  <button
                    disabled={busy || !note.trim()}
                    onClick={() => void issueReset()}
                  >
                    <UiText
                      zh="已核实身份，签发重置凭据"
                      en="Identity verified: issue reset credential"
                    />
                  </button>
                </div>
              )}
              <h3>
                <UiText zh="审核记录" en="Review history" />
              </h3>
              {logs.length ? (
                logs.map((log) => (
                  <div className="review-log" key={log.id}>
                    <small>
                      {date(log.created_at)} · {log.admin_username} ·{" "}
                      {log.action}
                    </small>
                    <p>{log.note || "—"}</p>
                  </div>
                ))
              ) : (
                <p>
                  <UiText zh="暂无记录" en="No reviews yet" />
                </p>
              )}
            </section>
          )}
        </>
      ) : (
        <>
          <form className="invite-form auth-form" onSubmit={createInvite}>
            <h2>
              <UiText zh="创建邀请码" en="Create invite" />
            </h2>
            <label>
              <UiText zh="最大使用次数" en="Maximum uses" />
              <input
                name="maxUses"
                type="number"
                min={1}
                max={1000}
                defaultValue={1}
                required
              />
            </label>
            <label>
              <UiText zh="有效期至（本地时间）" en="Expires at (local time)" />
              <input name="expiresAt" type="datetime-local" required />
            </label>
            <button className="auth-button" disabled={busy}>
              <UiText zh="生成邀请码" en="Generate invite" />
            </button>
          </form>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th><UiText zh="邀请码" en="Invite code" /></th>
                  <th>
                    <UiText zh="已用 / 上限" en="Used / limit" />
                  </th>
                  <th>
                    <UiText zh="有效期" en="Expires" />
                  </th>
                  <th>
                    <UiText zh="操作" en="Action" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {invites.map((invite) => (
                  <tr key={invite.id}>
                    <td>
                      <div className="invite-code">
                        {invite.code ? <><code>{invite.code}</code><CopyButton value={invite.code} /></> :
                          <span className="invite-code__legacy"><UiText zh="旧邀请码无法回显" en="Legacy code cannot be recovered" /></span>}
                      </div>
                      <small className="invite-code__id"><UiText zh="管理编号" en="Management ID" />：<span title={invite.id}>{invite.id.slice(0, 8)}</span></small>
                    </td>
                    <td>
                      {invite.uses} / {invite.max_uses}
                    </td>
                    <td>{date(invite.expires_at)}</td>
                    <td>
                      <div className="invite-state">
                        <small>{invite.revoked ? <UiText zh="已撤销" en="Revoked" /> :
                          invite.expires_at <= Date.now() / 1000 ? <UiText zh="已过期" en="Expired" /> :
                          invite.uses >= invite.max_uses ? <UiText zh="已用尽" en="Exhausted" /> : <UiText zh="有效" en="Active" />}</small>
                      {!invite.revoked && (
                        <button
                          disabled={busy}
                          onClick={() => void revoke(invite.id)}
                        >
                          <UiText zh="撤销" en="Revoke" />
                        </button>
                      )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="admin-actions">
            <button
              disabled={page <= 1 || busy}
              onClick={() => setPage((p) => p - 1)}
            >
              <UiText zh="上一页" en="Previous" />
            </button>
            <span>
              {page} / {Math.max(1, Math.ceil(total / 30))}
            </span>
            <button
              disabled={page * 30 >= total || busy}
              onClick={() => setPage((p) => p + 1)}
            >
              <UiText zh="下一页" en="Next" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
