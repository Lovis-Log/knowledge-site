import { UiText } from "@/components/ui-text";
import { uiLabel } from "@/lib/ui-language";
import { ReaderLink as Link } from "@/components/navigation-feedback";
import type { Chapter, ChapterGroup } from "@/content/types";
import { pickTitle } from "@/lib/language";
import { chapterPagerLabel } from "@/lib/chapter-label";

interface ChapterPagerProps {
  bookSlug: string;
  groups?: ChapterGroup[];
  prev?: Chapter;
  next?: Chapter;
}

export function ChapterPager({ bookSlug, groups, prev, next }: ChapterPagerProps) {
  return (
    <nav className={`pager${!prev && !next ? " pager--single" : ""}`} {...uiLabel("章节导航")}>
      <Link href={`/books/${bookSlug}/#chapters-heading`} className="pager__contents">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" focusable="false">
          <path d="M9 6h12M9 12h12M9 18h12M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
        <UiText zh="返回目录" />
      </Link>
      {prev ? (
        <Link href={`/books/${bookSlug}/${prev.slug}/`} className="pager__link pager__link--prev">
          <span className="pager__label"><UiText zh="← 上一篇" /></span>
          <span className="pager__title">
            {chapterPagerLabel(prev, groups)} · {pickTitle(prev)}
          </span>
        </Link>
      ) : (
        <span className="pager__empty" aria-hidden="true" />
      )}
      {next ? (
        <Link href={`/books/${bookSlug}/${next.slug}/`} className="pager__link pager__link--next">
          <span className="pager__label"><UiText zh="下一篇 →" /></span>
          <span className="pager__title">
            {chapterPagerLabel(next, groups)} · {pickTitle(next)}
          </span>
        </Link>
      ) : (
        <span className="pager__empty" aria-hidden="true" />
      )}
    </nav>
  );
}
