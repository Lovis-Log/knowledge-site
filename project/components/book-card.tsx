import { UiText, UiCount } from "@/components/ui-text";
import {useContent} from "@/content/client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BookCover } from "@/components/book-cover";
import type { Book } from "@/content/types";
import { contentTypeLabel } from "@/lib/content-labels";
import { formatAuthors } from "@/lib/format";

export function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  const {bookEnglish}=useContent();
  const href = `/books/${book.slug}/`;
  const badge = book.collection
    ? "多来源"
    : book.contentType
      ? contentTypeLabel(book.contentType)
      : "";
  const byline = book.author ? formatAuthors(book.author) : "";
  const bylineEn = book.author ? formatAuthors(book.author, 2, "en") : "";

  return (
    <article className="book-card" style={{ "--i": index } as CSSProperties}>
      <Link href={href} className="book-card__cover">
        <BookCover book={book} heading />
      </Link>
      <div className="book-card__body">
        {(badge || byline) && (
          <div className="book-card__top">
            {badge && <span className="book-card__badge"><UiText zh={badge} /></span>}
            {byline && <span className="book-card__author"><UiText zh={byline} en={bylineEn} /></span>}
          </div>
        )}
        <p className="book-card__desc"><UiText zh={book.description} en={bookEnglish[book.slug]?.description} /></p>
        <p className="book-card__meta"><UiCount count={book.chapters.length} kind="chapters" /></p>
      </div>
    </article>
  );
}
