import { BookCard } from "@/components/book-card";
import { ContinueReading, type ContinueItem } from "@/components/continue-reading";
import { getAllBooks, getAllChapterRefs, getCategoryGroups } from "@/content";
import { site } from "@/lib/site";

export default function HomePage() {
  const books = getAllBooks();
  const groups = getCategoryGroups();
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
        </div>
      </section>

      <ContinueReading items={continueItems} />

      <section className="library" aria-labelledby="library-heading">
        <div className="section-head">
          <h2 id="library-heading" className="section-heading">
            书库
          </h2>
          <span className="section-count">{books.length} 本书</span>
        </div>
        {groups.map((group) => (
          <section
            key={group.slug}
            className="library-group"
            aria-labelledby={`category-${group.slug}`}
          >
            <div className="library-group__head">
              <h3 id={`category-${group.slug}`} className="library-group__title">
                {group.name}
              </h3>
              <span className="library-group__count">{group.books.length} 本</span>
            </div>
            {group.description && <p className="library-group__desc">{group.description}</p>}
            <div className="library__grid">
              {group.books.map((book, index) => (
                <BookCard key={book.slug} book={book} index={index} />
              ))}
            </div>
          </section>
        ))}
      </section>
    </div>
  );
}
