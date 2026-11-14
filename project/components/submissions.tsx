"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { api } from "@/lib/api";
import { UiText } from "./ui-text";
import { uiPlaceholder } from "@/lib/ui-language";
import { PageEntry } from "./page-entry";
import styles from "./submissions.module.css";
import { PageHeading } from "./page-heading";

type Item = {
  id: number;
  title: string;
  summary: string;
  message: string;
  url: string;
  status: string;
  note: string;
  source: string;
  created_at: number;
};
type Board = {
  items: Item[];
  next: number | null;
  canModerate: boolean;
};
const statuses: Record<string, [string, string]> = {
  pending: ["待处理", "Pending"],
  adopted: ["已采用", "Adopted"],
  declined: ["未采用", "Not adopted"],
};

export function Submissions() {
  const [board, setBoard] = useState<Board | null>(null);
  const [admin, setAdmin] = useState(false);
  const [pages, setPages] = useState<number[]>([]);
  const [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(false);
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const lock = useRef(false);
  const requestId = useRef("");
  const form = useRef<HTMLFormElement>(null);

  const before = pages.at(-1);
  const endpoint = admin ? "/api/admin/submissions" : "/api/submissions";

  useEffect(() => {
    let live = true;
    setLoading(true);
    setBoard(null);
    api<Board>(endpoint + (before ? "?before=" + before : ""))
      .then((value) => { if (live) { setBoard(value); setError(""); } })
      .catch((caught: Error) => { if (live) setError(caught.message); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [endpoint, before, revision]);

  async function act(path: string, data: unknown, done?: () => void) {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    setNotice(false);
    try {
      await api(path, "POST", data);
      done?.();
      setPages([]);
      setRevision((value) => value + 1);
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  function edit(value: string, update: (next: string) => void) {
    update(value);
    requestId.current = "";
    setNotice(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    const body = message.trim();
    const link = url.trim();
    if (!body && !link) {
      setError("请填写正文或链接 / Add text or a link");
      return;
    }
    lock.current = true;
    setBusy(true);
    setError("");
    setNotice(false);
    requestId.current ||= crypto.randomUUID();
    try {
      await api("/api/submissions", "POST", {
        message: body,
        url: link,
        requestId: requestId.current,
      });
      requestId.current = "";
      form.current?.reset();
      setMessage("");
      setUrl("");
      setNotice(true);
      setPages([]);
      setRevision((value) => value + 1);
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  return (
    <PageEntry className={`shell reader-interactions submissions-page ${styles.page}`}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>LOVISMIND / SUBMISSIONS</p>
        <PageHeading kind="submissions" zh="投稿" en="Submissions" />
        <p className={styles.lede}><UiText
          zh="留下想分享的文字或链接。投稿仅你和管理员可见；已采用表示决定使用素材，不会自动发布，管理员会另行整理与复核。"
          en="Leave a note or a link you would like to share. Only you and administrators can see submissions. Adoption means the material will be used, not published automatically; an administrator will review it separately."
        /></p>
      </header>

      <form ref={form} onSubmit={submit} onChange={() => { requestId.current = ""; setNotice(false); }} className={styles.form} noValidate>
        <label className={styles.field} htmlFor="submission-message">
          <span className={styles.label}>
            <UiText zh="正文" en="Text" />
            <span className={styles.optional}><UiText zh="可选" en="Optional" /></span>
          </span>
          <textarea id="submission-message" name="message" rows={5} maxLength={2000} disabled={busy}
            {...uiPlaceholder("想分享的内容、推荐理由，或希望补充的资料……", "Something worth sharing, why you recommend it, or material we could add…")}
            value={message} onChange={(event) => edit(event.target.value, setMessage)} />
        </label>
        <label className={styles.field} htmlFor="submission-url">
          <span className={styles.label}>
            <UiText zh="来源链接" en="Source link" />
            <span className={styles.optional}><UiText zh="可选" en="Optional" /></span>
          </span>
          <input id="submission-url" name="url" type="url" inputMode="url" maxLength={2048} disabled={busy}
            placeholder="https://" value={url} onChange={(event) => edit(event.target.value, setUrl)} />
        </label>
        <div className={styles.footer}>
          <button className={styles.submit} type="submit" disabled={busy || (!message.trim() && !url.trim())}>
            {busy
              ? <UiText zh="提交中…" en="Sending…" />
              : <UiText zh="提交投稿" en="Send submission" />}
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12 14 0m-5-5 5 5-5 5" />
            </svg>
          </button>
        </div>
      </form>
      {notice && <p className={styles.notice} role="status"><UiText
        zh="已收到投稿，仅你和管理员可见。"
        en="Submission received. Only you and administrators can see it."
      /></p>}
      {error && <p className={styles.error} role="alert">{error}{" "}
        <button type="button" className={styles.inlineAction} onClick={() => { setError(""); setRevision((value) => value + 1); }}>
          <UiText zh="重试" en="Retry" />
        </button>
      </p>}

      <section className={styles.listSection} aria-labelledby="submission-list-title">
        <div className={styles.listHeader}>
          <h2 id="submission-list-title"><UiText zh={admin ? "全部投稿" : "我的投稿"} en={admin ? "All submissions" : "My submissions"} /></h2>
          {board?.canModerate && (
            <button type="button" className={styles.toggle} disabled={busy}
              aria-pressed={admin}
              onClick={() => { setAdmin(!admin); setPages([]); }}>
              {admin
                ? <UiText zh="查看我的投稿" en="My submissions" />
                : <UiText zh="审核全部投稿" en="Review all" />}
            </button>
          )}
        </div>
        {loading && !board
          ? <p className={styles.loading} role="status"><UiText zh="正在加载投稿…" en="Loading submissions…" /></p>
          : board && <>
            {board.items.length === 0 && <p className={styles.empty}><UiText zh="暂无投稿" en="No submissions yet" /></p>}
            <ul className={styles.list}>
              {board.items.map((item) => (
                <li className={styles.item} key={item.id}>
                  <div className={styles.itemTop}>
                    <h3>{item.title}</h3>
                    <span className={styles.status} data-status={item.status}>
                      <UiText zh={statuses[item.status]?.[0] ?? "待处理"} en={statuses[item.status]?.[1] ?? "Pending"} />
                    </span>
                  </div>
                  <div className={styles.itemMeta}>
                    {item.source === "donation" && (
                      <span className={styles.sourceBadge}><UiText zh="来自打赏入口" en="From the donation entry" /></span>
                    )}
                    <time dateTime={new Date(item.created_at * 1000).toISOString()}>
                      {new Date(item.created_at * 1000).toLocaleString()}
                    </time>
                  </div>
                  {item.summary && <p className={styles.body}>{item.summary}</p>}
                  {item.message && <p className={styles.body}>{item.message}</p>}
                  {item.url && <a className={styles.link} href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>}
                  {item.note && <p className={styles.note}><UiText zh="处理说明" en="Review note" />: {item.note}</p>}
                  {admin ? (
                    <form className={styles.review} onSubmit={(event) => {
                      event.preventDefault();
                      const data = Object.fromEntries(new FormData(event.currentTarget));
                      void act("/api/admin/submissions", { id: item.id, ...data });
                    }}>
                      <label>
                        <UiText zh="状态" en="Status" />
                        <select name="status" defaultValue={item.status} disabled={busy}>
                          {Object.keys(statuses).map((value) => (
                            <option key={value} value={value}>{statuses[value][0]} / {statuses[value][1]}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <UiText zh="处理说明" en="Review note" />
                        <textarea name="note" defaultValue={item.note} maxLength={300} rows={2} disabled={busy} />
                      </label>
                      <button type="submit" className={styles.inlineAction} disabled={busy}>
                        <UiText zh="保存" en="Save" />
                      </button>
                    </form>
                  ) : item.status !== "adopted" && (
                    <div className={styles.actions}>
                      <button type="button" className={styles.inlineAction} disabled={busy}
                        onClick={() => {
                          if (window.confirm("撤回此投稿？ / Withdraw this submission?"))
                            void act("/api/submissions", { action: "withdraw", id: item.id });
                        }}>
                        <UiText zh="撤回" en="Withdraw" />
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className={styles.pager}>
              <button type="button" className={styles.inlineAction} disabled={busy || pages.length === 0}
                onClick={() => setPages((value) => value.slice(0, -1))}>
                <UiText zh="上一页" en="Previous" />
              </button>
              <button type="button" className={styles.inlineAction} disabled={busy || board.next === null}
                onClick={() => setPages((value) => [...value, board.next!])}>
                <UiText zh="下一页" en="Next" />
              </button>
            </div>
          </>}
      </section>
    </PageEntry>
  );
}
