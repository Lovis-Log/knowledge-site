"use client";

import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { api } from "@/lib/api";
import { UiText } from "./ui-text";

type Entry = { id: number; nickname: string; message: string; created_at: number; own: boolean };
type Board = { items: Entry[]; next: number | null; canModerate: boolean };

export function GuestbookView() {
  const [board, setBoard] = useState<Board | null>(null);
  const [canModerate, setCanModerate] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pages, setPages] = useState<number[]>([]);
  const [revision, refresh] = useState(0);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const writing = useRef(false);
  const composing = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const input = composing.current;
    if (!input || CSS.supports("field-sizing", "content")) return;
    input.style.height = "auto";
    input.style.height = (input.scrollHeight + input.offsetHeight - input.clientHeight) + "px";
  }, [message, hidden]);
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
    if (writing.current || loading) return;
    writing.current = true;
    setBusy(action);
    setError("");
    try {
      const moderation = action === "hide" || action === "restore";
      if (action === "publish") {
        const { item } = await api<{ item: Entry }>("/api/guestbook", "POST", { action, message });
        setMessage("");
        if (pages.length === 0 && board) {
          const items = [item, ...board.items].slice(0, 20);
          setBoard({ ...board, items, next: board.items.length === 20 ? items[19].id : null });
          return;
        }
        setPages([]);
        reload(true);
      } else {
        await api(moderation ? "/api/admin/guestbook" : "/api/guestbook", "POST", { action, id });
        setBoard((current) => current && { ...current, items: current.items.filter((item) => item.id !== id) });
        reload();
      }
    } catch (caught) {
      setError((caught as Error).message);
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
  return (
    <div className="shell reader-interactions">
      <h1><UiText zh="留言板" en="Guestbook" /></h1>
      {canModerate && <button className="reader-action" type="button" disabled={blocked}
        aria-pressed={hidden} onClick={() => { setHidden(!hidden); setPages([]); reload(true); }}>
        {hidden ? <UiText zh="返回公开留言" en="Show visible messages" /> :
          <UiText zh="查看已隐藏留言" en="Show hidden messages" />}
      </button>}
      {!hidden && <form onSubmit={publish} className="guestbook-form">
        <label className="reader-sr-only" htmlFor="guestbook-message"><UiText zh="写留言" en="Write a message" /></label>
        <textarea ref={composing} id="guestbook-message" rows={1} required maxLength={1000}
          value={message} readOnly={busy === "publish"} onChange={(event) => setMessage(event.target.value)} />
        <button className="reader-action" type="submit" disabled={blocked || !message.trim()}>
          {busy === "publish" ? <UiText zh="发布中…" en="Posting…" /> : <UiText zh="发布留言" en="Post message" />}
        </button>
      </form>}
      {busy && <span className="reader-sr-only" role="status"><UiText zh="正在提交…" en="Submitting…" /></span>}
      {error && <p role="alert">{error}{" "}
        <button type="button" className="reader-action" disabled={blocked} onClick={() => reload()}><UiText zh="刷新留言" en="Refresh messages" /></button>
      </p>}
      {loading && !board ? <p role="status"><UiText zh="正在加载留言…" en="Loading messages…" /></p> :
        board && <>
          {board.items.length === 0 && <p><UiText zh="暂无留言" en="No messages yet" /></p>}
          <ul className="reader-items">
            {board.items.map((entry) => {
              const date = new Date(entry.created_at * 1000);
              return (
                <li className="reader-item" key={entry.id}>
                  <div className="guestbook-byline">
                    <strong>{entry.nickname}</strong>
                    <time dateTime={date.toISOString()}>{date.toLocaleString()}</time>
                  </div>
                  <p className="guestbook-message">{entry.message}</p>
                  <div className="guestbook-actions">
                    {entry.own && <button className="reader-action" type="button" disabled={blocked} onClick={() => {
                      if (window.confirm("删除这条留言？ / Delete this message?")) void act("delete", entry.id);
                    }}><UiText zh="删除" en="Delete" /></button>}
                    {board.canModerate && <button className="reader-action" type="button" disabled={blocked}
                      onClick={() => void act(hidden ? "restore" : "hide", entry.id)}>
                      {hidden ? <UiText zh="恢复" en="Restore" /> : <UiText zh="隐藏" en="Hide" />}
                    </button>}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="guestbook-actions">
            {pages.length > 0 && <button className="reader-action" type="button" disabled={blocked}
              onClick={() => { setPages(pages.slice(0, -1)); reload(true); }}><UiText zh="上一页" en="Previous page" /></button>}
            {board.next !== null && <button className="reader-action" type="button" disabled={blocked}
              onClick={() => { setPages([...pages, board.next!]); reload(true); }}><UiText zh="下一页" en="Next page" /></button>}
          </div>
        </>}
    </div>
  );
}
