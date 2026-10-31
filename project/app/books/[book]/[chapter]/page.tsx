import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterPager } from "@/components/chapter-pager";
import { Markdown } from "@/components/markdown";
import { ReadingLayout } from "@/components/reading-layout";
import { ReadingProgress } from "@/components/reading-progress";
import { ReadingToolbar } from "@/components/reading-toolbar";
import { SourceList } from "@/components/source-list";
import { TableOfContents } from "@/components/table-of-contents";
import { getAllBooks, getAdjacentChapters, getBook, getChapter } from "@/content";
import type { Lang } from "@/content/types";
import { formatDate, paddedNumber } from "@/lib/format";
import { availableLangs, pickVersion } from "@/lib/language";
import { buildToc } from "@/lib/toc";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBooks().flatMap((book) =>
    book.chapters.map((chapter) => ({ book: book.slug, chapter: chapter.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ book: string; chapter: string }>;
}): Promise<Metadata> {
  const { book: bookSlug, chapter: chapterSlug } = await params;
  const book = getBook(bookSlug);
  const chapter = getChapter(bookSlug, chapterSlug);
  if (!book || !chapter) return {};
  const version = pickVersion(chapter.versions);
  return {
    title: `${paddedNumber(chapter.number)} · ${version.title}`,
    description: version.summary ?? book.description,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ book: string; chapter: string }>;
}) {
  const { book: bookSlug, chapter: chapterSlug } = await params;
  const book = getBook(bookSlug);
  const chapter = getChapter(bookSlug, chapterSlug);
  if (!book || !chapter) notFound();

  const langs = availableLangs(chapter.versions);
  if (!langs.length) notFound();

  const bilingual = langs.length > 1;
  const adjacent = getAdjacentChapters(bookSlug, chapterSlug);
  const tocs = langs.map((lang) => ({
    lang,
    items: buildToc(chapter.versions[lang]!.body, lang),
  }));

  const langBlock = (lang: Lang): Record<string, string> =>
    bilingual ? { "data-lang-block": lang } : {};

  return (
    <div className="shell shell--reading">
      <ReadingProgress bookSlug={book.slug} chapterSlug={chapter.slug} />

      <ReadingLayout
        aside={
          <>
            {tocs.map(({ lang, items }) => (
              <div key={lang} {...langBlock(lang)}>
                <TableOfContents items={items} />
              </div>
            ))}
          </>
        }
      >
        <header className="chapter-header">
          <p className="eyebrow">第 {paddedNumber(chapter.number)} 章</p>
          {langs.map((lang) => {
            const version = chapter.versions[lang]!;
            return (
              <div key={lang} {...langBlock(lang)}>
                <h1 className="chapter-title">{version.title}</h1>
                {version.summary && <p className="chapter-lede">{version.summary}</p>}
              </div>
            );
          })}
          <div className="chapter-meta">
            <span>更新于 {formatDate(chapter.updatedAt)}</span>
            {bilingual && <span className="badge">中 / EN</span>}
          </div>
          <ReadingToolbar langs={langs} />
        </header>

        <details className="toc-inline">
          <summary>篇内目录</summary>
          {tocs.map(({ lang, items }) => (
            <div key={lang} {...langBlock(lang)}>
              <ul className="toc-inline__list">
                {items.map((item) => (
                  <li key={item.id} className={`toc__item--h${item.depth}`}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </details>

        {langs.map((lang) => (
          <div key={lang} className="prose lang-block" {...langBlock(lang)}>
            <Markdown markdown={chapter.versions[lang]!.body} lang={lang} />
          </div>
        ))}
        <SourceList sources={chapter.sources} />
        <ChapterPager bookSlug={book.slug} prev={adjacent.prev} next={adjacent.next} />
      </ReadingLayout>
    </div>
  );
}
