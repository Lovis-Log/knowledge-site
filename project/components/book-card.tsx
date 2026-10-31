import Link from "next/link";
import type { CSSProperties } from "react";
import { BookCover } from "@/components/book-cover";
import type { Book } from "@/content/types";
import { contentTypeLabel } from "@/lib/content-labels";
import { formatAuthors } from "@/lib/format";

export function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  const href = `/books/${book.slug}/`;
  const badge = book.collection
    ? "多来源"
    : book.contentType
      ? contentTypeLabel(book.contentType)
      : "";
  const links = book.links ?? [];
  const byline = book.author ? formatAuthors(book.author) : "";

  return (
    <article className="book-card" style={{ "--i": index } as CSSProperties}>
      <Link href={href} className="book-card__cover">
        <BookCover book={book} heading />
      </Link>
      <div className="book-card__body">
        {(badge || byline) && (
          <div className="book-card__top">
            {badge && <span className="book-card__badge">{badge}</span>}
            {byline && <span className="book-card__author">{byline}</span>}
          </div>
        )}
        <p className="book-card__desc">{book.description}</p>
        <p className="book-card__meta">{book.chapters.length} 章</p>
        {links.length > 0 && (
          <ul className="book-card__links">
            {links.slice(0, 2).map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noreferrer noopener">
                  {link.label} ↗
                </a>
              </li>
            ))}
            {links.length > 2 && <li className="book-card__links-more">等</li>}
          </ul>
        )}
      </div>
    </article>
  );
}
