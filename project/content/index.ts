import type { Book, Chapter } from "@/content/types";
import { getTaxonomy, loadBooks } from "@/lib/notes";

const books: Book[] = loadBooks();

/**
 * 唯一数据接缝：页面只通过这些函数取数据。
 * 未来改成 Markdown 加载器时，只改本文件。
 */
export function getAllBooks(): Book[] {
  return [...books].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getBook(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getChapter(bookSlug: string, chapterSlug: string): Chapter | undefined {
  return getBook(bookSlug)?.chapters.find((chapter) => chapter.slug === chapterSlug);
}

export function getAdjacentChapters(
  bookSlug: string,
  chapterSlug: string,
): { prev?: Chapter; next?: Chapter } {
  const chapters = getBook(bookSlug)?.chapters ?? [];
  const index = chapters.findIndex((chapter) => chapter.slug === chapterSlug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? chapters[index - 1] : undefined,
    next: index < chapters.length - 1 ? chapters[index + 1] : undefined,
  };
}

export interface ChapterRef {
  book: Book;
  bookTitle: string;
  chapter: Chapter;
  title: string;
}

export function getAllChapterRefs(): ChapterRef[] {
  return getAllBooks().flatMap((book) =>
    book.chapters.map((chapter) => ({
      book,
      bookTitle: book.title,
      chapter,
      title: chapter.versions.zh?.title ?? chapter.versions.en?.title ?? "",
    })),
  );
}

export interface CategoryGroup {
  slug: string;
  name: string;
  description?: string;
  books: Book[];
}

export function getCategoryGroups(): CategoryGroup[] {
  const categories = getTaxonomy();
  const order = new Map(categories.map((category, index) => [category.slug, index]));
  const groups = new Map<string, CategoryGroup>();

  for (const book of getAllBooks()) {
    const slug = book.category || "uncategorized";
    if (!groups.has(slug)) {
      const known = categories.find((category) => category.slug === slug);
      groups.set(slug, {
        slug,
        name: known?.name ?? (slug === "uncategorized" ? "未分类" : slug),
        description: known?.description,
        books: [],
      });
    }
    groups.get(slug)!.books.push(book);
  }

  return [...groups.values()].sort(
    (a, b) =>
      (order.get(a.slug) ?? Number.MAX_SAFE_INTEGER) -
      (order.get(b.slug) ?? Number.MAX_SAFE_INTEGER),
  );
}
