"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readLastRead, type LastRead } from "@/lib/progress";

export interface ContinueItem {
  book: string;
  chapter: string;
  bookTitle: string;
  title: string;
}

export function ContinueReading({ items }: { items: ContinueItem[] }) {
  const [entry, setEntry] = useState<(LastRead & { item: ContinueItem }) | null>(null);

  useEffect(() => {
    const last = readLastRead();
    if (!last) return;
    const item = items.find(
      (candidate) => candidate.book === last.book && candidate.chapter === last.chapter,
    );
    if (item) setEntry({ ...last, item });
  }, [items]);

  if (!entry) return null;

  return (
    <section className="continue" aria-labelledby="continue-heading">
      <p className="continue__kicker" id="continue-heading">
        继续阅读
      </p>
      <Link href={`/books/${entry.item.book}/${entry.item.chapter}/`} className="continue__link">
        <span className="continue__book">{entry.item.bookTitle}</span>
        <span className="continue__title">{entry.item.title}</span>
        <span className="continue__arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </section>
  );
}
