import { UiText, UiCount } from "@/components/ui-text";
import {useContent} from "@/content/client";
import { ReaderLink as Link } from "@/components/navigation-feedback";
import type { CSSProperties } from "react";
import { BookCover } from "@/components/book-cover";
import type { Book } from "@/content/types";
import { contentTypeLabel } from "@/lib/content-labels";
import { formatAuthors } from "@/lib/format";
import { bookTitle } from "@/lib/book-titles";
import { uiLabel } from "@/lib/ui-language";

function CollectionIcon() {
  return (
    <svg className="book-card__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2.2 14 5 8 7.8 2 5Z" />
        <path d="m2.9 8 5.1 2.4L13.1 8" />
        <path d="m2.9 11 5.1 2.4 5.1-2.4" />
      </g>
    </svg>
  );
}

function TagIcon() {
  return (
    <svg className="book-card__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.6 7.3V2.8h4.5l6 6a1 1 0 0 1 0 1.4l-3.1 3.1a1 1 0 0 1-1.4 0Z" />
        <circle cx="5.4" cy="5.4" r="0.85" />
      </g>
    </svg>
  );
}

function PenIcon() {
  return (
    <svg className="book-card__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11.2 2.6 13.4 4.8 5.8 12.4l-3.3.9.9-3.3Z" />
        <path d="m9.8 4 2.2 2.2" />
      </g>
    </svg>
  );
}

export function BookCard({ book, index = 0, priority = false }: { book: Book; index?: number; priority?: boolean }) {
  const {bookEnglish}=useContent();
  const href = `/books/${book.slug}/`;
  const title = bookTitle(book);
  const badge = book.collection
    ? "多来源"
    : book.contentType
      ? contentTypeLabel(book.contentType)
      : "";
  const byline = book.author ? formatAuthors(book.author) : "";
  const bylineEn = book.author ? formatAuthors(book.author, 2, "en") : "";

  return (
    <article className="book-card" style={{ "--i": index } as CSSProperties}>
      <Link prefetch={false} href={href} className="book-card__cover" {...uiLabel(title.zh, title.en)}>
        <BookCover book={book} priority={priority} />
      </Link>
      <div className="book-card__body">
        <h3 className="book-card__title"><Link href={href} prefetch={false}><UiText zh={title.zh} en={title.en} /></Link></h3>
        {(badge || byline) && (
          <div className="book-card__top">
            {badge && (
              <span className="book-card__badge">
                {book.collection ? <CollectionIcon /> : <TagIcon />}
                <UiText zh={badge} />
              </span>
            )}
            {byline && (
              <span className="book-card__author">
                <PenIcon />
                <UiText zh={byline} en={bylineEn} />
              </span>
            )}
          </div>
        )}
        <p className="book-card__desc"><UiText zh={book.description} en={bookEnglish[book.slug]?.description} /></p>
        <p className="book-card__meta"><UiCount count={book.chapters.length} kind="chapters" /></p>
      </div>
    </article>
  );
}
