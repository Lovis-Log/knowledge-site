import Link from "next/link";
import type { Chapter } from "@/content/types";
import { pickTitle } from "@/lib/language";
import { paddedNumber } from "@/lib/format";

interface ChapterPagerProps {
  bookSlug: string;
  prev?: Chapter;
  next?: Chapter;
}

export function ChapterPager({ bookSlug, prev, next }: ChapterPagerProps) {
  if (!prev && !next) return null;

  return (
    <nav className="pager" aria-label="章节导航">
      {prev ? (
        <Link href={`/books/${bookSlug}/${prev.slug}/`} className="pager__link pager__link--prev">
          <span className="pager__label">← 上一篇</span>
          <span className="pager__title">
            {paddedNumber(prev.number)} · {pickTitle(prev)}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/books/${bookSlug}/${next.slug}/`} className="pager__link pager__link--next">
          <span className="pager__label">下一篇 →</span>
          <span className="pager__title">
            {paddedNumber(next.number)} · {pickTitle(next)}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
