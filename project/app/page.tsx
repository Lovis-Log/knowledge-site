import { BookCard } from "@/components/book-card";
import { ContinueReading, type ContinueItem } from "@/components/continue-reading";
import { getAllBooks, getAllChapterRefs } from "@/content";
import { site } from "@/lib/site";

export default function HomePage() {
  const books = getAllBooks();
  const continueItems: ContinueItem[] = getAllChapterRefs().map((ref) => ({
    book: ref.book.slug,
    chapter: ref.chapter.slug,
    bookTitle: ref.bookTitle,
    title: ref.title,
  }));

  return (
    <div className="shell">
      <section className="hero">
        <p className="eyebrow">个人知识书库</p>
        <h1 className="hero__title">{site.name}</h1>
        <p className="hero__intro">{site.intro}</p>
      </section>

      <ContinueReading items={continueItems} />

      <section className="library" aria-labelledby="library-heading">
        <div className="section-head">
          <h2 id="library-heading" className="section-heading">
            书库
          </h2>
          <span className="section-count">{books.length} 本书</span>
        </div>
        <div className="library__grid">
          {books.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
