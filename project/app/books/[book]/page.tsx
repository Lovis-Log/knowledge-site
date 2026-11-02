import { UiText, UiCount } from "@/components/ui-text";
import { bookEnglish, uiLabel } from "@/lib/ui-language";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookCover } from "@/components/book-cover";
import { ChapterList } from "@/components/chapter-list";
import { getAllBooks, getBook } from "@/content";
import { formatAuthors, paddedNumber } from "@/lib/format";

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
      <header className="book-header">
        <BookCover book={book} size="sm" />
        <div className="book-header__body">
          {book.subtitle && <p className="eyebrow">{book.subtitle}</p>}
          <h1 className="book-title">{book.title}</h1>
          <p className="book-lede"><UiText zh={book.longDescription ?? book.description} en={bookEnglish[book.slug] ? `${bookEnglish[book.slug].longDescription} Each chapter ends with links to the original sources.` : undefined} /></p>
          {book.author && <p className="book-byline"><UiText zh={formatAuthors(book.author)} en={formatAuthors(book.author, 2, "en")} /></p>}
          {book.links && book.links.length > 0 && (
            <ul className="book-links">
              {book.links.slice(0, 2).map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noreferrer noopener">
                    {link.chapterNumber !== undefined && (
                      <span className="book-links__num">{paddedNumber(link.chapterNumber)}</span>
                    )}{" "}
                    {link.label} ↗
                  </a>
                </li>
              ))}
              {book.links.length > 2 && <li className="book-links__more"><UiText zh="等" /></li>}
            </ul>
          )}
          <p className="book-meta"><UiCount count={book.chapters.length} kind="chapters" /></p>
        </div>
      </header>

      <section className="book-chapters" {...uiLabel("目录")}>
        <h2 id="chapters-heading" className="section-heading" {...uiLabel("目录")}>
          <UiText zh="目录" />
        </h2>
        <ChapterList book={book} />
      </section>
    </div>
  );
}
