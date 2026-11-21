import type { Book } from "@/content/types";

/**
 * The campus grade label is deliberately scoped to the five published course
 * books; other books keep their existing studyPeriod/date presentation.
 */
const GRADE_SCOPED_BOOKS = new Set([
  "campus-cpp-programming",
  "campus-discrete-mathematics",
  "campus-mathematical-analysis",
  "campus-linear-algebra-analytic-geometry",
  "campus-basic-physics",
]);

export interface StudyPeriodLabel {
  zh: string;
  en: string;
}

const YEAR_LABELS: Record<string, StudyPeriodLabel> = {
  一: { zh: "大一", en: "Year 1" },
  二: { zh: "大二", en: "Year 2" },
  三: { zh: "大三", en: "Year 3" },
  四: { zh: "大四", en: "Year 4" },
};

/**
 * Normalise the course metadata once for the card, chapter list and chapter
 * header. `大一上` and `大一` both read as 大一 / Year 1.
 */
export function studyPeriodLabel(
  book: Pick<Book, "slug" | "studyPeriod">,
): StudyPeriodLabel | undefined {
  if (!book.studyPeriod || !GRADE_SCOPED_BOOKS.has(book.slug)) return undefined;
  const year = /大\s*([一二三四])/.exec(book.studyPeriod)?.[1];
  return year ? YEAR_LABELS[year] : { zh: book.studyPeriod, en: book.studyPeriod };
}
