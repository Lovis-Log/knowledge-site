import type { Book, Chapter } from "@/content/types";
import { cmuAiAgents } from "@/content/books/cmu-ai-agents";
import { mitLinearAlgebra } from "@/content/books/mit-linear-algebra";
import { vibeCoding } from "@/content/books/vibe-coding";

const books: Book[] = [cmuAiAgents, mitLinearAlgebra, vibeCoding];

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
