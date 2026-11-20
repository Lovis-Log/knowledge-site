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
  const last = state?.progress[0];
  const item = last && items.find((candidate) => candidate.book === last.book && candidate.chapter === last.chapter);

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
