"use client";
import { UiText, UiCount } from "@/components/ui-text";
import { uiLabel } from "@/lib/ui-language";
import { ReaderLink as Link } from "@/components/navigation-feedback";
import { notFound } from "next/navigation";
import { BookCover } from "@/components/book-cover";
import { ChapterList } from "@/components/chapter-list";
import { FavoriteButton } from "@/components/favorites";
import { useContent } from "@/content/client";
import { formatAuthors, paddedNumber } from "@/lib/format";
import { bookTitle } from "@/lib/book-titles";

export default function BookView({ slug }: { slug: string }) {
  const { getBook, getLibrarySections, taxonomyEnglish, bookEnglish } =
    useContent();
  const book = getBook(slug);
  if (!book) notFound();
  const section = getLibrarySections().find((item) =>
    item.books.some((itemBook) => itemBook.slug === book.slug),
  );
  const groups = book.groups?.flatMap((group) => {
    const chapters = book.chapters.filter((chapter) => chapter.group === group.id);
    return chapters.length ? [{ ...group, chapters }] : [];
  });
  const ungrouped = groups?.length
    ? book.chapters.filter((chapter) => !groups.some((group) => group.id === chapter.group))
    : [];

  return (
    <div className="shell">
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
        <div className="book-header__heading">
          {book.subtitle && <p className="eyebrow">{book.subtitle}</p>}
          <h1 className="book-title"><UiText {...bookTitle(book)} /></h1>
        </div>
        <div className="book-header__body">
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
          <div className="book-header__actions">
            <p className="book-meta"><UiCount count={book.chapters.length} kind="chapters" /></p>
            <FavoriteButton book={book.slug} />
          </div>
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
        {groups?.length ? (
          <>
            {groups.map((group) => (
              <div className="chapter-group" key={group.id}>
                <h3 className="chapter-group__title">{group.heading}</h3>
                <ChapterList book={book} chapters={group.chapters} />
              </div>
            ))}
            {ungrouped.length > 0 && (
              <div className="chapter-group">
                <ChapterList book={book} chapters={ungrouped} />
              </div>
            )}
          </>
        ) : (
          <ChapterList book={book} />
        )}
      </section>
    </div>
  );
}
