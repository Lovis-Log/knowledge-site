"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { Book, Chapter } from "./types";
import type { LibrarySection } from "./index";
import { api, ApiError } from "@/lib/api";
import { UiText } from "@/components/ui-text";

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
  book,
  chapter,
}: {
  children: ReactNode;
  book?: string;
  chapter?: string;
}) {
  const path = usePathname();
  const [state, setState] = useState<{
    key: string;
    data: Catalog | null;
    error: string;
  }>({ key: "", data: null, error: "" });
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [catalog, entry] = await Promise.all([
          api<Catalog>("/api/content/catalog"),
          book && chapter
            ? api<Chapter>(
                `/api/content/chapters/${encodeURIComponent(book)}/${encodeURIComponent(chapter)}`,
              )
            : Promise.resolve(null),
        ]);
        if (entry)
          catalog.books = catalog.books.map((item) =>
            item.slug === book
              ? {
                  ...item,
                  chapters: item.chapters.map((c) =>
                    c.slug === chapter ? entry : c,
                  ),
                }
              : item,
          );
        if (active) {
          setState({ key: path, data: catalog, error: "" });
          window.dispatchEvent(
            new CustomEvent("lovismind:catalog", { detail: catalog }),
          );
        }
      } catch (error) {
        if (!active) return;
        if (error instanceof ApiError && error.status === 401) {
          window.location.replace("/login/?next=" + encodeURIComponent(path));
          return;
        }
        setState({
          key: path,
          data: null,
          error:
            error instanceof Error
              ? error.message
              : "读取失败 / Unable to load",
        });
      }
    }
    void load();
    // Revalidate when a suspended tab returns; a disabled session must not keep fetching data.
    const revalidate = () => {
      if (document.visibilityState === "visible") void load();
    };
    document.addEventListener("visibilitychange", revalidate);
    return () => {
      active = false;
      document.removeEventListener("visibilitychange", revalidate);
    };
  }, [path, book, chapter]);
  if (state.key !== path || !state.data)
    return (
      <div className="shell auth-status" role="status">
        {state.error || (
          <UiText zh="正在验证账号并加载…" en="Checking access and loading…" />
        )}
      </div>
    );
  return <Context.Provider value={state.data}>{children}</Context.Provider>;
}
