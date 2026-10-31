import Link from "next/link";
import type { Book } from "@/content/types";
import { pickVersion } from "@/lib/language";
import { formatDate, paddedNumber } from "@/lib/format";

export function ChapterList({ book }: { book: Book }) {
  return (
    <ol className="chapter-list">
      {book.chapters.map((chapter) => {
        const version = pickVersion(chapter.versions);
        const bilingual = Boolean(chapter.versions.zh && chapter.versions.en);
        return (
          <li key={chapter.slug} className="chapter-list__item">
            <Link href={`/books/${book.slug}/${chapter.slug}/`} className="chapter-row">
              <span className="chapter-row__num">{paddedNumber(chapter.number)}</span>
              <span className="chapter-row__body">
                <span className="chapter-row__title">
                  {version.title}
                  {bilingual && <span className="badge">中 / EN</span>}
                </span>
                {version.summary && (
                  <span className="chapter-row__summary">{version.summary}</span>
                )}
              </span>
              <span className="chapter-row__meta">{formatDate(chapter.updatedAt)}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
