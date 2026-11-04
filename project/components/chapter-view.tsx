"use client";
import { UiText } from "@/components/ui-text";
import { notFound } from "next/navigation";
import { ChapterPager } from "@/components/chapter-pager";
import { InlineMarkdown, Markdown } from "@/components/markdown";
import { ReadingLayout } from "@/components/reading-layout";
import { ReadingProgress } from "@/components/reading-progress";
import { ReadingToolbar } from "@/components/reading-toolbar";
import { SourceList } from "@/components/source-list";
import { TableOfContents } from "@/components/table-of-contents";
import { useContent } from "@/content/client";
import type { Lang } from "@/content/types";
import { contentTypeLabel } from "@/lib/content-labels";
import { tagLabel } from "@/lib/tag-labels";
import { formatDate, paddedNumber } from "@/lib/format";
import { availableLangs, pickVersion } from "@/lib/language";
import { buildToc } from "@/lib/toc";

export default function ChapterView({
  bookSlug,
  chapterSlug,
}: {
  bookSlug: string;
  chapterSlug: string;
}) {
  const { getBook, getChapter, getAdjacentChapters } = useContent();
  const book = getBook(bookSlug);
  const chapter = getChapter(bookSlug, chapterSlug);
  if (!book || !chapter) notFound();

  const langs = availableLangs(chapter.versions);
  if (!langs.length) notFound();

  const bilingual = langs.length > 1;
  const hasTranslation = Boolean(chapter.translation) && !bilingual;
  const translationToc = hasTranslation
    ? buildToc(chapter.translation!.body, "en")
    : [];
  const adjacent = getAdjacentChapters(bookSlug, chapterSlug);
  const tocs = langs.map((lang) => ({
    lang,
    items: buildToc(chapter.versions[lang]!.body, lang),
  }));

  const langBlock = (lang: Lang): Record<string, string> =>
    bilingual
      ? { "data-lang-block": lang, lang: lang === "zh" ? "zh-CN" : "en" }
      : { lang: lang === "zh" ? "zh-CN" : "en" };

  return (
    <div className="shell shell--reading">
      <ReadingProgress bookSlug={book.slug} chapterSlug={chapter.slug} />

      <ReadingLayout
        aside={
          <>
            <div data-reading-block="notes">
              {tocs.map(({ lang, items }) => (
                <div key={lang} {...langBlock(lang)}>
                  <TableOfContents items={items} />
                </div>
              ))}
            </div>
            {hasTranslation && (
              <div data-reading-block="translation">
                <TableOfContents items={translationToc} />
              </div>
            )}
          </>
        }
      >
        <header className="chapter-header">
          <p className="eyebrow">
            <UiText
              zh={`第 ${paddedNumber(chapter.number)} 章`}
              en={`Chapter ${paddedNumber(chapter.number)}`}
            />
          </p>
          {langs.map((lang) => {
            const version = chapter.versions[lang]!;
            return (
              <div key={lang} {...langBlock(lang)}>
                <h1 className="chapter-title">{version.title}</h1>
                {version.summary && (
                  <div className="chapter-lede">
                    <InlineMarkdown>{version.summary}</InlineMarkdown>
                  </div>
                )}
              </div>
            );
          })}
          {(chapter.publishedAt || bilingual) && (
            <div className="chapter-meta">
              {chapter.publishedAt && (
                <span>
                  <UiText
                    zh={`首发于 ${formatDate(chapter.publishedAt)}`}
                    en={`Published ${formatDate(chapter.publishedAt)}`}
                  />
                </span>
              )}
              {bilingual && <span className="badge">中 / EN</span>}
            </div>
          )}
          {(chapter.contentType || chapter.tags?.length) && (
            <div className="chapter-tags">
              {chapter.contentType && (
                <span className="tag tag--type">
                  <UiText zh={contentTypeLabel(chapter.contentType)} />
                </span>
              )}
              {chapter.tags?.map((tag) => {
                const label = tagLabel(tag);
                return (
                  <span key={tag} className="tag">
                    <UiText zh={label.zh} en={label.en} />
                  </span>
                );
              })}
            </div>
          )}
          <ReadingToolbar langs={langs} hasTranslation={hasTranslation} />
        </header>

        <details className="toc-inline">
          <summary>
            <UiText zh="篇内目录" />
          </summary>
          <div data-reading-block="notes">
            {tocs.map(({ lang, items }) => (
              <div key={lang} {...langBlock(lang)}>
                <ul className="toc-inline__list">
                  {items.map((item) => (
                    <li key={item.id} className={`toc__item--h${item.depth}`}>
                      <a
                        href={`#${item.id}`}
                        aria-label={item.text}
                        dangerouslySetInnerHTML={{ __html: item.html }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {hasTranslation && (
            <div data-reading-block="translation">
              <ul className="toc-inline__list">
                {translationToc.map((item) => (
                  <li key={item.id} className={`toc__item--h${item.depth}`}>
                    <a
                      href={`#${item.id}`}
                      aria-label={item.text}
                      dangerouslySetInnerHTML={{ __html: item.html }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </details>

        <div data-reading-block="notes">
          {langs.map((lang) => (
            <div key={lang} className="prose lang-block" {...langBlock(lang)}>
              <Markdown markdown={chapter.versions[lang]!.body} lang={lang} />
            </div>
          ))}
        </div>
        {hasTranslation && (
          <div
            data-reading-block="translation"
            className="prose lang-block"
            lang="zh-CN"
          >
            <Markdown markdown={chapter.translation!.body} lang="en" />
          </div>
        )}
        <SourceList sources={chapter.sources} />
        <ChapterPager
          bookSlug={book.slug}
          prev={adjacent.prev}
          next={adjacent.next}
        />
      </ReadingLayout>
    </div>
  );
}
