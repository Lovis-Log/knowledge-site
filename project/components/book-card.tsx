import Link from "next/link";
import type { Book } from "@/content/types";
import { formatDate } from "@/lib/format";

export function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.slug}/`} className="book-card">
      <p className="book-card__kicker">{book.subtitle ?? `${book.chapters.length} 章`}</p>
      <h2 className="book-card__title">{book.title}</h2>
      <p className="book-card__desc">{book.description}</p>
      <p className="book-card__meta">
        {book.chapters.length} 章 · 更新于 {formatDate(book.updatedAt)}
      </p>
      <span className="book-card__more">进入书本 →</span>
    </Link>
  );
}
