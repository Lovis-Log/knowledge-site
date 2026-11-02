import { taxonomyEnglish } from "@/lib/ui-language";
import { getAllBooks, getLibrarySections } from "@/content";
import { pickVersion } from "@/lib/language";

export type Crumb = { label: string; labelEn?: string; href: string };

/** 以去掉尾部斜杠的路径为键，供页头按当前路由取面包屑 */
export function buildBreadcrumbs(): Record<string, Crumb[]> {
  const map: Record<string, Crumb[]> = {
    "/about": [
      { label: "书库", labelEn: "Library", href: "/" },
      { label: "关于", labelEn: "About", href: "/about/" },
    ],
  };

  const sections = getLibrarySections();
  for (const section of sections) {
    map[`/categories/${section.slug}`] = [
      { label: "首页", labelEn: "Home", href: "/" },
      { label: section.name, labelEn: taxonomyEnglish[section.slug]?.name, href: `/categories/${section.slug}/` },
    ];
  }

  for (const book of getAllBooks()) {
    const section = sections.find((item) => item.books.some((itemBook) => itemBook.slug === book.slug));
    const parentCrumbs: Crumb[] = [
      { label: "首页", labelEn: "Home", href: "/" },
      ...(section ? [{ label: section.name, labelEn: taxonomyEnglish[section.slug]?.name, href: `/categories/${section.slug}/` }] : []),
    ];
    const bookCrumb = { label: book.title, href: `/books/${book.slug}/` };
    map[`/books/${book.slug}`] = [...parentCrumbs, bookCrumb];

    for (const chapter of book.chapters) {
      map[`/books/${book.slug}/${chapter.slug}`] = [
        ...parentCrumbs,
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
