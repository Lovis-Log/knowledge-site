import type { Book } from "@/content/types";
import type { LibrarySection } from "@/content";
import { pickVersion } from "@/lib/language";

export type Crumb = { label: string; labelEn?: string; href: string };

/** 以去掉尾部斜杠的路径为键，供页头按当前路由取面包屑 */
export function buildBreadcrumbs(
  books: Book[],
  sections: LibrarySection[],
  taxonomyEnglish: Record<string, { name: string }>,
): Record<string, Crumb[]> {
  const map: Record<string, Crumb[]> = {
    "/about": [
      { label: "书库", labelEn: "Library", href: "/library/" },
      { label: "关于", labelEn: "About", href: "/about/" },
    ],
  };

  for (const section of sections) {
    map[`/categories/${section.slug}`] = [
      { label: "书库", labelEn: "Library", href: "/library/" },
      {
        label: section.name,
        labelEn: taxonomyEnglish[section.slug]?.name,
        href: `/categories/${section.slug}/`,
      },
    ];
  }

  for (const book of books) {
    const section = sections.find((item) =>
      item.books.some((itemBook) => itemBook.slug === book.slug),
    );
    const parentCrumbs: Crumb[] = [
      { label: "书库", labelEn: "Library", href: "/library/" },
      ...(section
        ? [
            {
              label: section.name,
              labelEn: taxonomyEnglish[section.slug]?.name,
              href: `/categories/${section.slug}/`,
            },
          ]
        : []),
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
