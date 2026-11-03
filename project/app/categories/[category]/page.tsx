import { UiText, UiCount } from "@/components/ui-text";
import { taxonomyEnglish, uiLabel } from "@/lib/ui-language";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/book-card";
import { LibraryNav } from "@/components/library-nav";
import { MobilePageEntryScroll } from "@/components/mobile-page-entry-scroll";
import { getLibrarySections } from "@/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLibrarySections().map((section) => ({ category: section.slug }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const section = getLibrarySections().find((item) => item.slug === category);
  return section ? { title: section.name, description: section.description } : {};
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const section = getLibrarySections().find((item) => item.slug === category);
  if (!section) notFound();

  return (
    <div className="shell category-page">
      <MobilePageEntryScroll pageKey={`category:${section.slug}`} />
      <LibraryNav active={section.slug} />
      <header className="section-head category-page__head">
        <div>
          <h1 className="category-page__title"><UiText zh={section.name} en={taxonomyEnglish[section.slug]?.name} /></h1>
          <p className="library-preview__desc"><UiText zh={section.description} en={taxonomyEnglish[section.slug]?.description} /></p>
        </div>
        <span className="section-count"><UiCount count={section.books.length} total /></span>
      </header>
      {section.groupByCategory === false ? (
        <div className="library__grid">
          {section.books.map((book, index) => <BookCard key={book.slug} book={book} index={index} />)}
        </div>
      ) : section.groups.map((group, index) => (
        <section key={group.slug} className="library-group" {...uiLabel(group.name, taxonomyEnglish[group.slug]?.name)}>
          <div className="library-group__head">
            <span className="library-group__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h2 id={`category-${group.slug}`} className="library-group__title" {...uiLabel(group.name, taxonomyEnglish[group.slug]?.name)}><UiText zh={group.name} en={taxonomyEnglish[group.slug]?.name} /></h2>
            <span className="library-group__count"><UiCount count={group.books.length} /></span>
          </div>
          {group.description && <p className="library-group__desc"><UiText zh={group.description} en={taxonomyEnglish[group.slug]?.description} /></p>}
          <div className="library__grid">
            {group.books.map((book, bookIndex) => <BookCard key={book.slug} book={book} index={bookIndex} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
