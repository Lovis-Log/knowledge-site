"use client";
import { UiText, UiCount } from "@/components/ui-text";
import { uiLabel } from "@/lib/ui-language";
import { ReaderLink as Link } from "@/components/navigation-feedback";
import { notFound } from "next/navigation";
import { BookCover } from "@/components/book-cover";
import { ChapterList } from "@/components/chapter-list";
import { MobilePageEntryScroll } from "@/components/mobile-page-entry-scroll";
import { FavoriteButton } from "@/components/favorites";
import { useContent } from "@/content/client";
import { formatAuthors, paddedNumber } from "@/lib/format";

export default function BookView({ slug }: { slug: string }) {
  const { getBook, getLibrarySections, taxonomyEnglish, bookEnglish } =
    useContent();
  const book = getBook(slug);
  if (!book) notFound();
  const section = getLibrarySections().find((item) =>
    item.books.some((itemBook) => itemBook.slug === book.slug),
  );

  return (
    <div className="shell">
      <MobilePageEntryScroll pageKey={`book:${book.slug}`} />
      {section && (
        <Link className="book-back" href={`/categories/${section.slug}/`}>
          <span aria-hidden="true">←</span>
          <UiText
            zh={`返回${section.name}`}
            en={`Back to ${taxonomyEnglish[section.slug]?.name ?? section.name}`}
          />
        </Link>
      )}
      <header className="book-header">
        <BookCover book={book} size="sm" priority />
        <div className="book-header__body">
          {book.subtitle && <p className="eyebrow">{book.subtitle}</p>}
          <h1 className="book-title">{book.title}</h1>
          <p className="book-lede">
            <UiText
              zh={book.longDescription ?? book.description}
              en={
                bookEnglish[book.slug]
                  ? `${bookEnglish[book.slug].longDescription} Each chapter ends with links to the original sources.`
                  : undefined
              }
            />
          </p>
          {book.author && (
            <p className="book-byline">
              <UiText
                zh={formatAuthors(book.author)}
                en={formatAuthors(book.author, 2, "en")}
              />
            </p>
          )}
          {book.links && book.links.length > 0 && (
            <ul className="book-links">
              {book.links.slice(0, 2).map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noreferrer noopener">
                    {link.chapterNumber !== undefined && (
                      <span className="book-links__num">
                        {paddedNumber(link.chapterNumber)}
                      </span>
                    )}{" "}
                    {link.label} ↗
                  </a>
                </li>
              ))}
              {book.links.length > 2 && (
                <li className="book-links__more">
                  <UiText zh="等" />
                </li>
              )}
            </ul>
          )}
          <p className="book-meta">
            <UiCount count={book.chapters.length} kind="chapters" />
          </p>
          <FavoriteButton book={book.slug} />
        </div>
      </header>

      <section className="book-chapters" {...uiLabel("目录")}>
        <h2
          id="chapters-heading"
          className="section-heading"
          {...uiLabel("目录")}
        >
          <UiText zh="目录" />
        </h2>
        <ChapterList book={book} />
      </section>
    </div>
  );
}
