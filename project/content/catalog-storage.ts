import type { Book, Catalog, CategoryGroup, LibrarySection } from "./types";

type StoredGroup = Omit<CategoryGroup, "books"> & { books: string[] };
type StoredSection = Omit<LibrarySection, "books" | "preview" | "groups"> & {
  books: string[];
  preview: string[];
  groups: StoredGroup[];
};
type StoredCatalog = Omit<Catalog, "sections"> & {
  storageVersion: 1;
  sections: StoredSection[];
};

export function packCatalog(catalog: Catalog): StoredCatalog {
  const slugs = (books: Book[]) => books.map((book) => book.slug);
  return {
    ...catalog,
    storageVersion: 1,
    sections: catalog.sections.map((section) => ({
      ...section,
      books: slugs(section.books),
      preview: slugs(section.preview),
      groups: section.groups.map((group) => ({ ...group, books: slugs(group.books) })),
    })),
  };
}

export function catalogResponseBody(body: string): string {
  const stored = JSON.parse(body) as StoredCatalog | Catalog | null;
  if (typeof stored !== "object" || !stored || !("storageVersion" in stored) || stored.storageVersion !== 1) return body;

  // Keep the HTTP contract unchanged while storing each book only once in D1.
  const { storageVersion: _storageVersion, ...catalog } = stored;
  const books = new Map(catalog.books.map((book) => [book.slug, book]));
  const resolve = (slugs: string[]) => slugs.map((slug) => {
    const book = books.get(slug);
    if (!book) throw new Error(`Unknown book in stored catalog: ${slug}`);
    return book;
  });
  return JSON.stringify({
    ...catalog,
    sections: catalog.sections.map((section) => ({
      ...section,
      books: resolve(section.books),
      preview: resolve(section.preview),
      groups: section.groups.map((group) => ({ ...group, books: resolve(group.books) })),
    })),
  } satisfies Catalog);
}
