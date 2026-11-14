"use client";
import { UiText, UiCount } from "@/components/ui-text";
import { uiLabel } from "@/lib/ui-language";
import { BookCard } from "@/components/book-card";
import { BookShelf } from "@/components/book-shelf";
import { ReaderLink as Link } from "@/components/navigation-feedback";
import { LibraryNav } from "@/components/library-nav";
import {
  ContinueReading,
  type ContinueItem,
} from "@/components/continue-reading";
import { useContent } from "@/content/client";
import { PageEntry } from "@/components/page-entry";
import { LibrarySearch } from "@/components/library-search";

export default function LibraryView() {
  const { getLibrarySections, getAllChapterRefs, taxonomyEnglish } =
    useContent();
  const sections = getLibrarySections();
  const continueItems: ContinueItem[] = getAllChapterRefs().map((ref) => ({
    book: ref.book.slug,
    chapter: ref.chapter.slug,
    bookTitle: ref.bookTitle,
    title: ref.title,
  }));

  return (
    <div className="shell library-page">
      <h1 className="reader-sr-only"><UiText zh="书库" en="Library" /></h1>
      <LibraryNav />

      <LibrarySearch />
      <ContinueReading items={continueItems} />

      <div className="library">
        {sections.map((section, sectionIndex) => (
          <section
            key={section.slug}
            className="library-preview"
            data-library-section={section.slug}
            {...uiLabel(section.name, taxonomyEnglish[section.slug]?.name)}
          >
            <PageEntry className="section-head library-preview__head">
              <div>
                <h2
                  id={`section-${section.slug}`}
                  className="section-heading"
                  {...uiLabel(
                    section.name,
                    taxonomyEnglish[section.slug]?.name,
                  )}
                >
                  <Link href={`/categories/${section.slug}/`}>
                    <UiText
                      zh={section.name}
                      en={taxonomyEnglish[section.slug]?.name}
                    />
                  </Link>
                </h2>
                <p className="library-preview__desc">
                  <UiText
                    zh={section.description}
                    en={taxonomyEnglish[section.slug]?.description}
                  />
                </p>
              </div>
              <div className="library-preview__actions">
                <span className="section-count">
                  <UiCount count={section.books.length} total />
                </span>
                <Link
                  className="view-all"
                  href={`/categories/${section.slug}/`}
                  {...uiLabel(
                    `查看全部${section.name}`,
                    `View all ${taxonomyEnglish[section.slug]?.name ?? section.name}`,
                  )}
                >
                  <UiText zh="查看全部" /> <span aria-hidden="true">→</span>
                </Link>
              </div>
            </PageEntry>
            <BookShelf headingId={`section-${section.slug}`}>
              {[
                ...section.preview,
                ...section.books.filter(book => !section.preview.some(item => item.slug === book.slug)),
              ].map((book, index) => (
                <BookCard key={book.slug} book={book} index={index} priority={sectionIndex === 0 && index < 2} />
              ))}
            </BookShelf>
          </section>
        ))}
      </div>
    </div>
  );
}
