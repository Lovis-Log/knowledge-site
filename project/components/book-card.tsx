import Link from "next/link";
import type { CSSProperties } from "react";
import { BookCover } from "@/components/book-cover";
import type { Book } from "@/content/types";
import { formatDate } from "@/lib/format";

export function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  return (
    <Link
      href={`/books/${book.slug}/`}
      className="book-card"
      style={{ "--i": index } as CSSProperties}
    >
      <BookCover book={book} heading />
      <p className="book-card__desc">{book.description}</p>
      <p className="book-card__meta">
        {book.chapters.length} 章 · 更新于 {formatDate(book.updatedAt)}
      </p>
      <span className="book-card__more">进入书本 →</span>
    </Link>
  );
}
