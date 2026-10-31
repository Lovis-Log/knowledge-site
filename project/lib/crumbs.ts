import { getAllBooks } from "@/content";
import { pickVersion } from "@/lib/language";

export type Crumb = { label: string; href: string };

/** 以去掉尾部斜杠的路径为键，供页头按当前路由取面包屑 */
export function buildBreadcrumbs(): Record<string, Crumb[]> {
  const map: Record<string, Crumb[]> = {
    "/about": [
      { label: "书库", href: "/" },
      { label: "关于", href: "/about/" },
    ],
  };

  for (const book of getAllBooks()) {
    const bookCrumb = { label: book.title, href: `/books/${book.slug}/` };
    map[`/books/${book.slug}`] = [{ label: "书库", href: "/" }, bookCrumb];

    for (const chapter of book.chapters) {
      map[`/books/${book.slug}/${chapter.slug}`] = [
        { label: "书库", href: "/" },
        bookCrumb,
        {
          label: pickVersion(chapter.versions).title,
          href: `/books/${book.slug}/${chapter.slug}/`,
        },
      ];
    }
  }

  return map;
}
