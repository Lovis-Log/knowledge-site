import Link from "next/link";
import type { CSSProperties } from "react";
import type { Book } from "@/content/types";
import { pickVersion } from "@/lib/language";
import { formatDate, paddedNumber } from "@/lib/format";
import { UiText } from "@/components/ui-text";

export function ChapterList({ book }: { book: Book }) {
  return (
    <ol className="chapter-list">
      {book.chapters.map((chapter, index) => {
        const zh = pickVersion(chapter.versions);
        const en = chapter.versions.en ?? zh;
        const bilingual = Boolean(chapter.versions.zh && chapter.versions.en);
        return (
          <li
            key={chapter.slug}
            className="chapter-list__item"
            style={{ "--i": index } as CSSProperties}
          >
            <Link href={`/books/${book.slug}/${chapter.slug}/`} className="chapter-row">
              <span className="chapter-row__num">{paddedNumber(chapter.number)}</span>
              <span className="chapter-row__body">
                <span className="chapter-row__title">
                  <UiText zh={zh.title} en={en.title} />
                  {bilingual && <span className="badge">中 / EN</span>}
                </span>
                {(zh.summary || en.summary) && (
                  <span className="chapter-row__summary"><UiText zh={zh.summary ?? ""} en={en.summary ?? ""} /></span>
                )}
              </span>
              <span className="chapter-row__meta">
                {chapter.publishedAt ? formatDate(chapter.publishedAt) : ""}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
