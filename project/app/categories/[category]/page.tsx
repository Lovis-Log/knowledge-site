import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/book-card";
import { LibraryNav } from "@/components/library-nav";
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
      <LibraryNav active={section.slug} />
      <header className="section-head category-page__head">
        <div>
          <h1 className="category-page__title">{section.name}</h1>
          <p className="library-preview__desc">{section.description}</p>
        </div>
        <span className="section-count">共 {section.books.length} 本</span>
      </header>
      {section.groups.map((group, index) => (
        <section key={group.slug} className="library-group" aria-labelledby={`category-${group.slug}`}>
          <div className="library-group__head">
            <span className="library-group__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h2 id={`category-${group.slug}`} className="library-group__title">{group.name}</h2>
            <span className="library-group__count">{group.books.length} 本</span>
          </div>
          {group.description && <p className="library-group__desc">{group.description}</p>}
          <div className="library__grid">
            {group.books.map((book, bookIndex) => <BookCard key={book.slug} book={book} index={bookIndex} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
