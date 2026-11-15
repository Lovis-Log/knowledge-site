import { ReaderLink as Link } from "@/components/navigation-feedback";
import type { CSSProperties } from "react";
import type { Book, Chapter } from "@/content/types";
import { pickVersion } from "@/lib/language";
import { formatDate } from "@/lib/format";
import { chapterNumberLabel } from "@/lib/chapter-label";
import { UiPair, UiText } from "@/components/ui-text";
import { InlineMarkdown } from "@/components/markdown";

export function ChapterList({
  book,
  chapters = book.chapters,
}: {
  book: Book;
  chapters?: Chapter[];
}) {
  return (
    <ol className="chapter-list">
      {chapters.map((chapter, index) => {
        const zh = pickVersion(chapter.versions);
        const en = chapter.versions.en ?? zh;
        const bilingual = Boolean(chapter.versions.zh && chapter.versions.en);
        const meta = book.studyPeriod ?? (chapter.publishedAt ? formatDate(chapter.publishedAt) : "");
        return (
          <li
            key={chapter.slug}
            className="chapter-list__item"
            style={{ "--i": index } as CSSProperties}
          >
            <Link prefetch={false} href={`/books/${book.slug}/${chapter.slug}/`} className="chapter-row">
              <span className="chapter-row__num">{chapterNumberLabel(chapter)}</span>
              <span className="chapter-row__body">
                <span className="chapter-row__title">
                  <UiText zh={zh.title} en={en.title} />
                  {bilingual && <span className="badge">中 / EN</span>}
                </span>
                {(zh.summary || en.summary) && (
                  <span className="chapter-row__summary"><UiPair zh={<InlineMarkdown>{zh.summary ?? ""}</InlineMarkdown>} en={<InlineMarkdown>{en.summary ?? ""}</InlineMarkdown>} /></span>
                )}
              </span>
              <span className="chapter-row__meta">
                {meta}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
