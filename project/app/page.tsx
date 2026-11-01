import { BookCard } from "@/components/book-card";
import Link from "next/link";
import { LibraryNav } from "@/components/library-nav";
import { ContinueReading, type ContinueItem } from "@/components/continue-reading";
import { getAllChapterRefs, getLibrarySections } from "@/content";
import { site } from "@/lib/site";

export default function HomePage() {
  const sections = getLibrarySections();
  const continueItems: ContinueItem[] = getAllChapterRefs().map((ref) => ({
    book: ref.book.slug,
    chapter: ref.chapter.slug,
    bookTitle: ref.bookTitle,
    title: ref.title,
  }));

  return (
    <div className="shell">
      <section className="hero">
        <div className="hero__scene" role="img" aria-label="暖阳下的书与干花" />
        <div className="hero__body">
          <p className="eyebrow">Personal Knowledge Vault</p>
          <h1 className="hero__title">{site.name}</h1>
          <p className="hero__tagline">
            <span className="hero__tagline-en">{site.intro.en}</span>
            <span className="hero__tagline-zh">{site.intro.zh}</span>
          </p>
          <div className="hero__rule" aria-hidden="true" />
          <LibraryNav />
        </div>
      </section>

      <ContinueReading items={continueItems} />

      <div className="library">
        {sections.map((section) => (
          <section
            key={section.slug}
            className="library-preview"
            aria-labelledby={`section-${section.slug}`}
          >
            <div className="section-head library-preview__head">
              <div>
                <h2 id={`section-${section.slug}`} className="section-heading">
                  <Link href={`/categories/${section.slug}/`}>{section.name}</Link>
                </h2>
                <p className="library-preview__desc">{section.description}</p>
              </div>
              <div className="library-preview__actions">
                <span className="section-count">共 {section.books.length} 本</span>
                <Link className="view-all" href={`/categories/${section.slug}/`} aria-label={`查看全部${section.name}`}>
                  查看全部 <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="library__grid">
              {section.preview.map((book, index) => (
                <BookCard key={book.slug} book={book} index={index} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
