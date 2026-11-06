"use client";
import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { Book, Chapter } from "./types";
import type { LibrarySection } from "./index";
import { api } from "@/lib/api";

export type Catalog = {
  books: Book[];
  sections: LibrarySection[];
  taxonomyEnglish: Record<string, { name: string; description: string }>;
  bookEnglish: Record<string, { description: string; longDescription: string }>;
};
const Context = createContext<Catalog | null>(null);
export function useContent() {
  const data = useContext(Context);
  if (!data) throw new Error("Protected content provider required");
  const getBook = (slug: string) =>
    data.books.find((book) => book.slug === slug);
  return {
    ...data,
    getLibrarySections: () => data.sections,
    getSections: () => data.sections,
    getBook,
    getChapter: (book: string, chapter: string) =>
      getBook(book)?.chapters.find((item) => item.slug === chapter),
    getAdjacentChapters: (book: string, chapter: string) => {
      const items = getBook(book)?.chapters ?? [];
      const i = items.findIndex((item) => item.slug === chapter);
      return { prev: items[i - 1], next: items[i + 1] };
    },
    getAllChapterRefs: () =>
      data.books.flatMap((book) =>
        book.chapters.map((chapter) => ({
          book,
          chapter,
          bookTitle: book.title,
          title: chapter.versions.zh?.title ?? chapter.versions.en?.title ?? "",
        })),
      ),
  };
}
export function ProtectedContent({
  children,
  catalog,
}: {
  children: ReactNode;
  catalog: Catalog;
}) {
  const path = usePathname();
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("lovismind:catalog", { detail: catalog }),
    );
  }, [catalog]);

  useEffect(() => {
    let active = true;
    const revalidate = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const { user } = await api<{ user: unknown }>("/api/auth/me");
        if (active && !user) {
          window.location.replace("/login/?next=" + encodeURIComponent(path));
        }
      } catch {
        // A temporary connection failure can be retried on the next foreground visit.
      }
    };
    document.addEventListener("visibilitychange", revalidate);
    return () => {
      active = false;
      document.removeEventListener("visibilitychange", revalidate);
    };
  }, [path]);

  return <Context.Provider value={catalog}>{children}</Context.Provider>;
}
