import { getAllBooks, getLibrarySections } from "./index";
import type { Catalog } from "./client";
import type { Chapter } from "./types";
import { bookEnglish, taxonomyEnglish } from "@/lib/content-translations";

function metadata(chapter: Chapter): Chapter {
  return {
    ...chapter,
    versions: Object.fromEntries(
      Object.entries(chapter.versions).map(([lang, v]) => [
        lang,
        { ...v, body: "" },
      ]),
    ),
    translation: chapter.translation
      ? { ...chapter.translation, body: "" }
      : undefined,
  };
}
export function getPageCatalog({
  book,
  chapter,
  category,
}: { book?: string; chapter?: string; category?: string } = {}): Catalog {
  const allBooks = getAllBooks();
  const sections = getLibrarySections();
  const selected = book
    ? allBooks.filter((item) => item.slug === book)
    : category
      ? sections.find((section) => section.slug === category)?.books ?? []
      : allBooks;
  const books = selected.map((item) => ({
    ...item,
    chapters: item.chapters.map((entry) =>
      entry.slug === chapter ? entry : metadata(entry),
    ),
  }));
  const bySlug = new Map(books.map((item) => [item.slug, item]));
  const pickBooks = (items: typeof books) =>
    items.flatMap((item) => bySlug.get(item.slug) ?? []);
  return {
    books,
    sections: sections.map((section) => ({
      ...section,
      books: pickBooks(section.books),
      preview: book ? [] : pickBooks(section.preview),
      groups: book ? [] : section.groups.map((group) => ({
        ...group,
        books: pickBooks(group.books),
      })),
    })),
    taxonomyEnglish,
    bookEnglish: Object.fromEntries(
      books.flatMap(({ slug }) => bookEnglish[slug] ? [[slug, bookEnglish[slug]]] : []),
    ),
  };
}
