"use client";

import { ReaderLink as Link } from "@/components/navigation-feedback";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { isAuthError, SessionRecovery, toError } from "./session-recovery";
import { UiText } from "./ui-text";
import { PageHeading } from "./page-heading";
import { RocketLoader } from "./rocket-loader";

type Target = { book: string; chapter?: string };
type Favorite = Required<Target> & {
  href: string | null;
  title: { zh: string; en: string } | null;
};

export function FavoriteButton({ book, chapter = "" }: Target) {
  return <FavoriteToggle key={book + "/" + chapter} book={book} chapter={chapter} />;
}

function FavoriteToggle({ book, chapter }: Required<Target>) {
  const [saved, setSaved] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [authExpired, setAuthExpired] = useState(false);
  const [attempt, retry] = useState(0);
  const writing = useRef(false);

  useEffect(() => {
    let active = true;
    const query = new URLSearchParams({ book, chapter });
    api<{ saved: boolean }>("/api/favorites/status?" + query)
      .then((value) => {
        if (!active) return;
        setSaved(value.saved);
        setError(null);
        setAuthExpired(false);
      })
      .catch((caught: unknown) => {
        if (!active) return;
        setError(toError(caught));
        setAuthExpired(isAuthError(caught));
      });
    return () => { active = false; };
  }, [book, chapter, attempt]);

  function retryStatus() {
    setError(null);
    setAuthExpired(false);
    retry(attempt + 1);
  }

  async function toggle() {
    if (saved === null || writing.current || authExpired) return;
    writing.current = true;
    const next = !saved;
    setBusy(true);
    setError(null);
    setAuthExpired(false);
    setSaved(next);
    try {
      await api("/api/favorites", "POST", { book, chapter, saved: next });
    } catch (caught: unknown) {
      setSaved(!next);
      setError(toError(caught));
      setAuthExpired(isAuthError(caught));
    } finally {
      writing.current = false;
      setBusy(false);
    }
  }

  return (
    <div className="favorite-control">
      <button className="reader-action" type="button" aria-pressed={saved ?? undefined}
        disabled={busy || authExpired || (saved === null && !error)}
        onClick={saved === null ? retryStatus : toggle}>
        <span aria-hidden="true">{saved ? "★" : "☆"} </span>
        {busy ? <UiText zh="保存中…" en="Saving…" /> : authExpired ? <UiText zh="需要重新登录" en="Sign in again" /> :
          saved === null && error ? <UiText zh="重试" en="Retry" /> :
          saved === null ? <UiText zh="读取收藏中…" en="Checking favorite…" /> :
          saved ? <UiText zh="已收藏" en="Saved" /> : <UiText zh="收藏" en="Save" />}
      </button>
      {error && !authExpired && <small role="alert">{error.message}</small>}
      {authExpired && <SessionRecovery error={error?.message} onRetry={retryStatus} />}
    </div>
  );
}

export function FavoritesView() {
  const [items, setItems] = useState<Favorite[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [authExpired, setAuthExpired] = useState(false);
  const [failed, setFailed] = useState<Favorite | null>(null);
  const [busy, setBusy] = useState("");
  const [attempt, retry] = useState(0);
  const writing = useRef(false);

  useEffect(() => {
    let active = true;
    api<{ items: Favorite[] }>("/api/favorites")
      .then((value) => {
        if (!active) return;
        setItems(value.items);
        setError(null);
        setAuthExpired(false);
      })
      .catch((caught: unknown) => {
        if (!active) return;
        setError(toError(caught));
        setAuthExpired(isAuthError(caught));
      });
    return () => { active = false; };
  }, [attempt]);

  async function remove(item: Favorite) {
    if (writing.current) return;
    writing.current = true;
    setBusy(item.book + "/" + item.chapter);
    setError(null);
    setAuthExpired(false);
    setFailed(null);
    try {
      await api("/api/favorites", "POST", { book: item.book, chapter: item.chapter, saved: false });
      setItems((current) => current?.filter((entry) => entry !== item) ?? null);
    } catch (caught: unknown) {
      setError(toError(caught));
      setAuthExpired(isAuthError(caught));
      setFailed(item);
    } finally {
      writing.current = false;
      setBusy("");
    }
  }

  function retryFailed() {
    if (failed) void remove(failed);
    else {
      setError(null);
      setAuthExpired(false);
      retry(attempt + 1);
    }
  }

  return (
    <div className="shell reader-interactions">
      <PageHeading kind="favorites" zh="我的收藏" en="My favorites" />
      {error && authExpired ? <SessionRecovery error={error.message} onRetry={retryFailed} /> :
        error && <p role="alert">{error.message}{failed && <>{" "}
          <button type="button" className="reader-action" onClick={retryFailed}><UiText zh="重试取消收藏" en="Retry removal" /></button>
        </>}</p>}
      {!items && (error ? (authExpired ? null :
        <button type="button" className="reader-action" onClick={retryFailed}><UiText zh="重试" en="Retry" /></button>) :
        <RocketLoader />)}
      {items && [false, true].map((chapters) => {
        const entries = items.filter((item) => Boolean(item.chapter) === chapters);
        return (
          <section key={String(chapters)}>
            <h2>{chapters ? <UiText zh="文章" en="Articles" /> : <UiText zh="书籍" en="Books" />}</h2>
            {entries.length === 0 ? <p><UiText zh="暂无收藏" en="No favorites yet" /></p> :
              <ul className="reader-items">
                {entries.map((item) => (
                  <li key={item.book + "/" + item.chapter} className="reader-item reader-item--favorite">
                    {item.href && item.title ?
                      <Link className="favorite-title-link" href={item.href} prefetch={false}><UiText {...item.title} /><span aria-hidden="true"> →</span></Link> :
                      <span><UiText zh="内容已下架" en="Content unavailable" /> · {item.chapter || item.book}</span>}
                    <button type="button" className="reader-action" disabled={Boolean(busy) || authExpired} onClick={() => void remove(item)}>
                      {busy === item.book + "/" + item.chapter ? <UiText zh="取消中…" en="Removing…" /> : <UiText zh="取消收藏" en="Remove" />}
                    </button>
                  </li>
                ))}
              </ul>}
          </section>
        );
      })}
    </div>
  );
}
