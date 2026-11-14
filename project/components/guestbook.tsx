"use client";
import { PageHeading } from "./page-heading";

import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { api, ApiError } from "@/lib/api";
import { UiText } from "./ui-text";
import { uiPlaceholder } from "@/lib/ui-language";
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
  useLayoutEffect(() => {
    const input = composing.current;
    if (!input || CSS.supports("field-sizing", "content")) return;
    input.style.height = "auto";
    input.style.height = (input.scrollHeight + input.offsetHeight - input.clientHeight) + "px";
  }, [message, hidden]);
  useEffect(() => {
    if (replyingTo) composing.current?.focus();
  }, [replyingTo]);
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
        <div className="guestbook-byline">
          <strong>{entry.nickname}</strong>
          <time dateTime={date.toISOString()}>{date.toLocaleString()}</time>
        </div>
        <p className="guestbook-message">{entry.message}</p>
        <div className={`guestbook-actions ${styles.entryActions}`}>
          {!hidden && (
            <button className="reader-action" type="button" disabled={blocked}
              onClick={() => setReplyingTo(entry)}>
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
      <PageHeading kind="guestbook" zh="留言板" en="Guestbook" />
      <p id="guestbook-description" className="guestbook-description"><UiText
        zh="这里可以畅所欲言：反馈网站 Bug 和内容问题，分享阅读心得，或聊聊你的想法。遇到问题时，附上相关书名、文章或操作步骤，会更方便排查。"
        en="Feel free to report website bugs or content issues, share your reading experiences, or simply leave a thought. If something goes wrong, include the relevant book, article, or steps so we can look into it."
      /></p>
      {canModerate && <button className="reader-action" type="button" disabled={blocked}
        aria-pressed={hidden} onClick={() => { setHidden(!hidden); setPages([]); setReplyingTo(null); reload(true); }}>
        {hidden ? <UiText zh="返回公开留言" en="Show visible messages" /> :
          <UiText zh="查看已隐藏留言" en="Show hidden messages" />}
      </button>}
      {!hidden && <>
        {replyingTo && (
          <div className={styles.replyBanner} role="status">
            <span className={styles.replyBannerText}>
              <UiText zh={`正在回复 @${replyingTo.nickname}`} en={`Replying to @${replyingTo.nickname}`} />
            </span>
            <button type="button" className={styles.replyBannerAction} disabled={blocked}
              onClick={() => setReplyingTo(null)}>
              <UiText zh="取消回复" en="Cancel reply" />
            </button>
          </div>
        )}
        <form onSubmit={publish} className="guestbook-form">
          <label className={replyingTo ? "guestbook-form__label" : "reader-sr-only"} htmlFor="guestbook-message">
            {replyingTo
              ? <UiText zh={`回复 @${replyingTo.nickname}`} en={`Reply to @${replyingTo.nickname}`} />
              : <UiText zh="写下你的想法" en="Leave a thought" />}
          </label>
          <textarea ref={composing} id="guestbook-message" aria-describedby="guestbook-description guestbook-limit" rows={2} required maxLength={1000}
            {...uiPlaceholder(
              replyingTo ? "写下你的回复……" : "阅读心得、内容建议，或使用时遇到的问题，都可以写在这里……",
              replyingTo ? "Write your reply…" : "Share a reading experience, suggest an improvement, or tell us what went wrong…",
            )}
            value={message} readOnly={busy === "publish"} onChange={(event) => setMessage(event.target.value)} />
          <div className="guestbook-form__footer">
            <span id="guestbook-limit" className="guestbook-form__count"><span>{message.length}</span> / 1000 <UiText zh="字" en="characters" /></span>
            <button className="reader-action guestbook-form__submit" type="submit" disabled={blocked || cooling || !message.trim()}>
              {busy === "publish"
                ? <UiText zh={replyingTo ? "回复中…" : "发布中…"} en={replyingTo ? "Replying…" : "Posting…"} />
                : <UiText zh={replyingTo ? "发布回复" : "发布留言"} en={replyingTo ? "Post reply" : "Post message"} />}
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 14 0m-5-5 5 5-5 5" /></svg>
            </button>
          </div>
        </form>
      </>}
      {cooling && <p className="guestbook-cooldown" role="status"><UiText
        zh={`留言发送较频繁，请在 ${cooldown} 秒后重试。草稿已保留。`}
        en={`Please wait ${cooldown} seconds before posting again. Your draft has been kept.`}
      /></p>}
      {busy && <span className="reader-sr-only" role="status"><UiText zh="正在提交…" en="Submitting…" /></span>}
      {error && <p role="alert">{error}{" "}
        <button type="button" className="reader-action" disabled={blocked} onClick={() => reload()}><UiText zh="刷新留言" en="Refresh messages" /></button>
      </p>}
      {loading && !board ? <p role="status"><UiText zh="正在加载留言…" en="Loading messages…" /></p> :
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
