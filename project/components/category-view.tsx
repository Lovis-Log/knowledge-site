"use client";
import { UiText, UiCount } from "@/components/ui-text";
import { uiLabel } from "@/lib/ui-language";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/book-card";
import { LibraryNav } from "@/components/library-nav";
import { useContent } from "@/content/client";

export default function CategoryView({ category }: { category: string }) {
  const { getLibrarySections, taxonomyEnglish } = useContent();
  const section = getLibrarySections().find((item) => item.slug === category);
  if (!section) notFound();

  return (
    <div className="shell category-page">
      <LibraryNav active={section.slug} />
      <header className="section-head category-page__head">
        <div>
          <h1 className="category-page__title">
            <UiText
              zh={section.name}
              en={taxonomyEnglish[section.slug]?.name}
            />
          </h1>
          <p className="library-preview__desc">
            <UiText
              zh={section.description}
              en={taxonomyEnglish[section.slug]?.description}
            />
          </p>
        </div>
        <span className="section-count">
          <UiCount count={section.books.length} total />
        </span>
      </header>
      {section.groupByCategory === false ? (
        <div className="library__grid">
          {section.books.map((book, index) => (
            <BookCard key={book.slug} book={book} index={index} priority={index < 2} />
          ))}
        </div>
      ) : (
        section.groups.map((group, index) => (
          <section
            key={group.slug}
            className="library-group"
            {...uiLabel(group.name, taxonomyEnglish[group.slug]?.name)}
          >
            <div className="library-group__head">
              <span className="library-group__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2
                id={`category-${group.slug}`}
                className="library-group__title"
                {...uiLabel(group.name, taxonomyEnglish[group.slug]?.name)}
              >
                <UiText
                  zh={group.name}
                  en={taxonomyEnglish[group.slug]?.name}
                />
              </h2>
              <span className="library-group__count">
                <UiCount count={group.books.length} />
              </span>
            </div>
            {group.description && (
              <p className="library-group__desc">
                <UiText
                  zh={group.description}
                  en={taxonomyEnglish[group.slug]?.description}
                />
              </p>
            )}
            <div className="library__grid">
              {group.books.map((book, bookIndex) => (
                <BookCard key={book.slug} book={book} index={bookIndex} priority={index === 0 && bookIndex < 2} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
