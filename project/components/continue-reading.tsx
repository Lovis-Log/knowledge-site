"use client";

import { UiText } from "@/components/ui-text";

import { uiLabel } from "@/lib/ui-language";
import { ReaderLink as Link } from "./navigation-feedback";
import { useReadingState } from "@/lib/reading-state-client";

export interface ContinueItem {
  book: string;
  chapter: string;
  bookTitle: string;
  title: string;
}

export function ContinueReading({ items }: { items: ContinueItem[] }) {
  const { state } = useReadingState();
  // The server sends a bounded recent list. Skip chapters that are no longer
  // published instead of hiding the whole continue-reading entry.
  const index = new Map(items.map((item) => [item.book + "/" + item.chapter, item]));
  const item = state?.progress
    .map((entry) => index.get(entry.book + "/" + entry.chapter))
    .find((candidate) => candidate);

  if (!item) return null;

  return (
    <section className="continue" {...uiLabel("继续阅读")}>
      <p className="continue__kicker" id="continue-heading" {...uiLabel("继续阅读")}>
        <UiText zh="继续阅读" />
      </p>
      <Link href={`/books/${item.book}/${item.chapter}/`} className="continue__link">
        <span className="continue__book">{item.bookTitle}</span>
        <span className="continue__title">{item.title}</span>
        <span className="continue__arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </section>
  );
}
