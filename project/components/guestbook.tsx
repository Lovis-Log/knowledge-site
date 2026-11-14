"use client";
import { PageHeading } from "./page-heading";
import { RocketLoader } from "./rocket-loader";
import { AccountAvatar } from "./account-avatar";

import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { api, ApiError } from "@/lib/api";
import { UiText, UiPair } from "./ui-text";
import { uiLabel, uiPlaceholder } from "@/lib/ui-language";
import { PageEntry } from "./page-entry";
import styles from "./guestbook.module.css";

type Entry = {
  id: number;
  nickname: string;
  message: string;
  created_at: number;
  own: boolean;
  parentId: number | null;
  replyTo: string;
  replies?: Entry[];
};
type Board = { items: Entry[]; next: number | null; canModerate: boolean };

function withEntryRemoved(board: Board, id: number): Board {
  return {
    ...board,
    items: board.items
      .filter((entry) => entry.id !== id)
      .map((entry) => ({
        ...entry,
        replies: (entry.replies ?? []).filter((reply) => reply.id !== id),
      })),
  };
}

export function GuestbookView() {
  const [board, setBoard] = useState<Board | null>(null);
  const [canModerate, setCanModerate] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pages, setPages] = useState<number[]>([]);
  const [revision, refresh] = useState(0);
  const [message, setMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<Entry | null>(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const [username, setUsername] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const cooldownUntil = useRef(0);
  const cooling = cooldown > 0;
  useEffect(() => {
    if (!cooling) return;
    const tick = () => setCooldown(Math.max(0, Math.ceil((cooldownUntil.current - Date.now()) / 1000)));
    tick();
    const timer = window.setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    return () => { window.clearInterval(timer); document.removeEventListener("visibilitychange", tick); };
  }, [cooling]);
  const writing = useRef(false);
  const composing = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    let live = true;
    api<{ user: { username: string } | null }>('/api/auth/me')
      .then(({ user }) => { if (live && user) setUsername(user.username); }).catch(() => { /* Publishing still verifies the session. */ });
    return () => { live = false; };
  }, []);
  useEffect(() => {
    if (!composerOpen) return;
    const panel = dialog.current;
    if (!panel) return;
    panel.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    composing.current?.focus();
    return () => {
      panel.close();
      document.body.style.overflow = previousOverflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, [composerOpen]);
  function openComposer(target: Entry | null) {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setReplyingTo(target);
    setError('');
    setComposerOpen(true);
  }
  function closeComposer() {
    if (writing.current) return;
    setComposerOpen(false);
    setReplyingTo(null);
  }
  useLayoutEffect(() => {
    const input = composing.current;
    if (!composerOpen || !input || CSS.supports("field-sizing", "content")) return;
    input.style.height = "auto";
    input.style.height = (input.scrollHeight + input.offsetHeight - input.clientHeight) + "px";
  }, [message, hidden, composerOpen]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const before = pages.at(-1);
  const endpoint = hidden ? "/api/admin/guestbook" : "/api/guestbook";

  useEffect(() => {
    let active = true;
    api<Board>(endpoint + (before ? "?before=" + before : ""))
      .then((value) => {
        if (active) {
          setBoard(value);
          setCanModerate(value.canModerate);
          setReplyingTo(null);
        }
      })
      .catch((caught: Error) => { if (active) setError(caught.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [endpoint, before, revision]);

  function reload(clear = false) {
    if (clear) setBoard(null);
    setLoading(true);
    setError("");
    refresh((value) => value + 1);
  }

  async function act(action: "publish" | "delete" | "hide" | "restore", id?: number) {
    if (writing.current || loading || (action === "publish" && cooling)) return;
    writing.current = true;
    setBusy(action);
    setError("");
    try {
      const moderation = action === "hide" || action === "restore";
      if (action === "publish") {
        const target = replyingTo;
        const { item } = await api<{ item: Entry }>("/api/guestbook", "POST", {
          action,
          message,
          ...(target ? { parentId: target.id } : {}),
        });
        setMessage("");
        setReplyingTo(null);
        setComposerOpen(false);
        if (target) {
          // Replies attach to the root the reader was looking at.
          setBoard((current) => {
            if (!current) return current;
            const rootId = target.parentId ?? target.id;
            let placed = false;
            const items = current.items.map((entry) => {
              if (entry.id !== rootId) return entry;
              placed = true;
              return { ...entry, replies: [...(entry.replies ?? []), item] };
            });
            return placed ? { ...current, items } : current;
          });
          return;
        }
        if (pages.length === 0 && board) {
          const items = [item, ...board.items].slice(0, 20);
          setBoard({ ...board, items, next: board.items.length === 20 ? items[19].id : null });
          return;
        }
        setPages([]);
        reload(true);
      } else {
        await api(moderation ? "/api/admin/guestbook" : "/api/guestbook", "POST", { action, id });
        setBoard((current) => current && withEntryRemoved(current, id!));
        setReplyingTo((current) => (current?.id === id ? null : current));
        reload();
      }
    } catch (caught) {
      if (action === "publish" && caught instanceof ApiError && caught.code === "GUESTBOOK_RATE_LIMITED") {
        const seconds = caught.retryAfter ?? 60;
        cooldownUntil.current = Date.now() + seconds * 1000;
        setCooldown(seconds);
      } else {
        setError((caught as Error).message);
        if (action === "publish" && caught instanceof ApiError && caught.code === "NOT_FOUND")
          reload();
      }
    } finally {
      writing.current = false;
      setBusy(null);
    }
  }

  function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (message.trim()) void act("publish");
  }

  const blocked = Boolean(busy) || loading;

  function renderEntry(entry: Entry, nested = false) {
    const date = new Date(entry.created_at * 1000);
    const hasReplies = !nested && (entry.replies?.length ?? 0) > 0;
    return (
      <li className={nested ? styles.reply : styles.thread} key={entry.id}>
        {entry.parentId !== null && entry.replyTo && (
          <p className={styles.replyTarget}>
            <UiText zh={`回复 @${entry.replyTo}`} en={`Reply to @${entry.replyTo}`} />
          </p>
        )}
        <div className={styles.entryHeader}>
          <AccountAvatar username={entry.nickname} />
          <div className="guestbook-byline">
            <strong>{entry.nickname}</strong>
            <time dateTime={date.toISOString()}>{date.toLocaleString()}</time>
          </div>
        </div>
        <p className={`guestbook-message ${styles.entryMessage}`}>{entry.message}</p>
        <div className={`guestbook-actions ${styles.entryActions}`}>
          {!hidden && (
            <button className="reader-action" type="button" disabled={blocked}
              onClick={() => openComposer(entry)}>
              <UiText zh="回复" en="Reply" />
            </button>
          )}
          {entry.own && <button className="reader-action" type="button" disabled={blocked} onClick={() => {
            if (window.confirm(hasReplies
              ? "删除这条留言及其全部回复？ / Delete this message and all replies?"
              : "删除这条留言？ / Delete this message?")) void act("delete", entry.id);
          }}><UiText zh="删除" en="Delete" /></button>}
          {board?.canModerate && <button className="reader-action" type="button" disabled={blocked}
            onClick={() => void act(hidden ? "restore" : "hide", entry.id)}>
            {hidden ? <UiText zh="恢复" en="Restore" /> : <UiText zh="隐藏" en="Hide" />}
          </button>}
        </div>
        {hasReplies && (
          <ol className={styles.replies}>
            {(entry.replies ?? []).map((reply) => renderEntry(reply, true))}
          </ol>
        )}
      </li>
    );
  }

  return (
    <PageEntry className="shell reader-interactions guestbook-page">
      <div className={styles.header}>
        <PageHeading kind="guestbook" zh="留言板" en="Guestbook" />
        {!hidden && <button type="button" className={styles.writeButton} disabled={blocked} onClick={() => openComposer(null)}>
          <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14v6Z" /></svg>
          <UiText zh="写留言" en="Write a message" />
        </button>}
      </div>
      <p id="guestbook-description" className="guestbook-description"><UiText
        zh="留下阅读心得、内容建议，或使用网站时遇到的问题。"
        en="Share a reading experience, suggest an improvement, or tell us what went wrong."
      /></p>
      {canModerate && <button className="reader-action" type="button" disabled={blocked}
        aria-pressed={hidden} onClick={() => { setHidden(!hidden); setPages([]); setReplyingTo(null); reload(true); }}>
        {hidden ? <UiText zh="返回公开留言" en="Show visible messages" /> :
          <UiText zh="查看已隐藏留言" en="Show hidden messages" />}
      </button>}
      <dialog ref={dialog} className={styles.composer} aria-labelledby="guestbook-compose-title"
        onCancel={event => { event.preventDefault(); closeComposer(); }}
        onClick={event => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeComposer();
        }}>
        <header className={styles.composerHeader}>
          <div><h2 id="guestbook-compose-title"><UiText zh={replyingTo ? '写下你的回复' : '写下你的留言'} en={replyingTo ? 'Write your reply' : 'Leave a message'} /></h2>
            <p className={styles.identity}><AccountAvatar username={username || '?'} /><UiPair zh={<>以 <strong>{username || '当前账号'}</strong> 身份发布</>} en={<>Posting as <strong>{username || 'your account'}</strong></>} /></p>
          </div>
          <button type="button" className={styles.close} disabled={busy === 'publish'} onClick={closeComposer} {...uiLabel('关闭留言窗口', 'Close message dialog')}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </header>
        <form onSubmit={publish} className={styles.composerForm}>
          <label className={replyingTo ? styles.replyTarget : 'reader-sr-only'} htmlFor="guestbook-message">
            {replyingTo
              ? <UiText zh={`回复 @${replyingTo.nickname}`} en={`Reply to @${replyingTo.nickname}`} />
              : <UiText zh="写下你的想法" en="Leave a thought" />}
          </label>
          <div className={styles.inputArea}><textarea ref={composing} id="guestbook-message" aria-describedby="guestbook-limit" rows={5} required maxLength={1000}
            {...uiPlaceholder(
              replyingTo ? "写下你的回复……" : "写下你想说的话……",
              replyingTo ? "Write your reply…" : "Write what’s on your mind…",
            )}
            value={message} readOnly={busy === "publish"} onChange={(event) => setMessage(event.target.value)} />
          <span id="guestbook-limit" className={styles.counter}>{message.length} / 1000</span></div>
          {composerOpen && error && <p role="alert" className={styles.error}>{error}</p>}
          {cooling && <p role="status" className={styles.error}><UiText zh={`请在 ${cooldown} 秒后重试，草稿已保留。`} en={`Try again in ${cooldown} seconds. Your draft has been kept.`} /></p>}
          <div className={styles.composerActions}>
            <button type="button" className="reader-action" disabled={busy === 'publish'} onClick={closeComposer}><UiText zh="取消" en="Cancel" /></button>
            <button className={styles.publish} type="submit" disabled={blocked || cooling || !message.trim()}>
              {busy === "publish"
                ? <UiText zh={replyingTo ? "回复中…" : "发布中…"} en={replyingTo ? "Replying…" : "Posting…"} />
                : <UiText zh={replyingTo ? "发布回复" : "发布留言"} en={replyingTo ? "Post reply" : "Post message"} />}
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 14 0m-5-5 5 5-5 5" /></svg>
            </button>
          </div>
        </form>
      </dialog>
      {!composerOpen && cooling && <p className="guestbook-cooldown" role="status"><UiText
        zh={`留言发送较频繁，请在 ${cooldown} 秒后重试。草稿已保留。`}
        en={`Please wait ${cooldown} seconds before posting again. Your draft has been kept.`}
      /></p>}
      {busy && <span className="reader-sr-only" role="status"><UiText zh="正在提交…" en="Submitting…" /></span>}
      {!composerOpen && error && <p role="alert">{error}{" "}
        <button type="button" className="reader-action" disabled={blocked} onClick={() => reload()}><UiText zh="刷新留言" en="Refresh messages" /></button>
      </p>}
      {loading && !board ? <RocketLoader /> :
        board && <>
          {board.items.length === 0 && <p><UiText zh="暂无留言" en="No messages yet" /></p>}
          <ul className="reader-items">
            {board.items.map((entry) => renderEntry(entry))}
          </ul>
          <div className="guestbook-actions">
            {pages.length > 0 && <button className="reader-action" type="button" disabled={blocked}
              onClick={() => { setPages(pages.slice(0, -1)); setReplyingTo(null); reload(true); }}><UiText zh="上一页" en="Previous page" /></button>}
            {board.next !== null && <button className="reader-action" type="button" disabled={blocked}
              onClick={() => { setPages([...pages, board.next!]); setReplyingTo(null); reload(true); }}><UiText zh="下一页" en="Next page" /></button>}
          </div>
        </>}
    </PageEntry>
  );
}
