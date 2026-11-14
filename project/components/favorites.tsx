"use client";

import { ReaderLink as Link } from "@/components/navigation-feedback";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
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
  const [error, setError] = useState("");
  const [attempt, retry] = useState(0);
  const writing = useRef(false);

  useEffect(() => {
    let active = true;
    const query = new URLSearchParams({ book, chapter });
    api<{ saved: boolean }>("/api/favorites/status?" + query)
      .then((value) => { if (active) setSaved(value.saved); })
      .catch((caught: Error) => { if (active) setError(caught.message); });
    return () => { active = false; };
  }, [book, chapter, attempt]);

  async function toggle() {
    if (saved === null || writing.current) return;
    writing.current = true;
    const next = !saved;
    setBusy(true);
    setError("");
    setSaved(next);
    try {
      await api("/api/favorites", "POST", { book, chapter, saved: next });
    } catch (caught) {
      setSaved(!next);
      setError((caught as Error).message);
    } finally {
      writing.current = false;
      setBusy(false);
    }
  }

  return (
    <div className="favorite-control">
      <button className="reader-action" type="button" aria-pressed={saved ?? undefined}
        disabled={busy || (saved === null && !error)}
        onClick={saved === null ? () => { setError(""); retry(attempt + 1); } : toggle}>
        <span aria-hidden="true">{saved ? "★" : "☆"} </span>
        {busy ? <UiText zh="保存中…" en="Saving…" /> : saved === null && error ? <UiText zh="重试" en="Retry" /> :
          saved === null ? <UiText zh="读取收藏中…" en="Checking favorite…" /> :
          saved ? <UiText zh="已收藏" en="Saved" /> : <UiText zh="收藏" en="Save" />}
      </button>
      {error && <small role="alert">{error}</small>}
    </div>
  );
}

export function FavoritesView() {
  const [items, setItems] = useState<Favorite[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [attempt, retry] = useState(0);
  const writing = useRef(false);

  useEffect(() => {
    let active = true;
    api<{ items: Favorite[] }>("/api/favorites")
      .then((value) => { if (active) setItems(value.items); })
      .catch((caught: Error) => { if (active) setError(caught.message); });
    return () => { active = false; };
  }, [attempt]);

  async function remove(item: Favorite) {
    if (writing.current) return;
    writing.current = true;
    setBusy(item.book + "/" + item.chapter);
    setError("");
    try {
      await api("/api/favorites", "POST", { book: item.book, chapter: item.chapter, saved: false });
      setItems((current) => current?.filter((entry) => entry !== item) ?? null);
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      writing.current = false;
      setBusy("");
    }
  }

  return (
    <div className="shell reader-interactions">
      <PageHeading kind="favorites" zh="我的收藏" en="My favorites" />
      {error && <p role="alert">{error}</p>}
      {!items && (error ?
        <button type="button" className="reader-action" onClick={() => { setError(""); retry(attempt + 1); }}><UiText zh="重试" en="Retry" /></button> :
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
                    <button type="button" className="reader-action" disabled={Boolean(busy)} onClick={() => void remove(item)}>
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
