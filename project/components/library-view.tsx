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
import { site } from "@/lib/site";
import { PageEntry } from "@/components/page-entry";

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
      <section className="hero">
        <div
          className="hero__scene"
          role="img"
          {...uiLabel("暖阳下的书与干花")}
        />
        <PageEntry className="hero__body" stagger>
          <p className="eyebrow" data-entry-item>
            <UiText zh="个人知识库" en="Personal Knowledge Vault" />
          </p>
          <h1 className="hero__title" data-entry-item>{site.name}</h1>
          <p className="hero__tagline" data-entry-item>
            <span className="hero__tagline-en">{site.intro.en}</span>
            <span className="hero__tagline-zh">{site.intro.zh}</span>
          </p>
          <div className="hero__rule" aria-hidden="true" />
          <LibraryNav />
        </PageEntry>
      </section>

      <p><Link href="/search/" prefetch={false}><UiText zh="搜索笔记 →" en="Search notes →" /></Link></p>
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
              {section.preview.slice(0, 4).map((book, index) => (
                <BookCard key={book.slug} book={book} index={index} priority={sectionIndex === 0 && index < 2} />
              ))}
            </BookShelf>
          </section>
        ))}
      </div>
    </div>
  );
}
