import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterList } from "@/components/chapter-list";
import { getAllBooks, getBook } from "@/content";
import { formatDate } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBooks().map((book) => ({ book: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ book: string }>;
}): Promise<Metadata> {
  const { book: slug } = await params;
  const book = getBook(slug);
  if (!book) return {};
  return { title: book.title, description: book.description };
}

export default async function BookPage({ params }: { params: Promise<{ book: string }> }) {
  const { book: slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  return (
    <div className="shell">
      <nav className="breadcrumb" aria-label="面包屑">
        <Link href="/">书库</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{book.title}</span>
      </nav>

      <header className="book-header">
        {book.subtitle && <p className="eyebrow">{book.subtitle}</p>}
        <h1 className="book-title">{book.title}</h1>
        <p className="book-lede">{book.description}</p>
        <p className="book-meta">
          {book.chapters.length} 章 · 更新于 {formatDate(book.updatedAt)}
        </p>
      </header>

      <section className="book-chapters" aria-labelledby="chapters-heading">
        <h2 id="chapters-heading" className="section-heading">
          目录
        </h2>
        <ChapterList book={book} />
      </section>
    </div>
  );
}
