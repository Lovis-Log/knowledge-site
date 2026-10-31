import type { Chapter, ChapterVersion, Lang } from "@/content/types";

export const LANGS: Lang[] = ["zh", "en"];

export const LANG_STORAGE_KEY = "shufang:lang";
export const PROGRESS_STORAGE_KEY = "shufang:progress";
export const LAST_READ_STORAGE_KEY = "shufang:last-read";

export function isLang(value: unknown): value is Lang {
  return value === "zh" || value === "en";
}

/** 章节实际存在的语言，按 中文 → 英文 排序 */
export function availableLangs(versions: Partial<Record<Lang, ChapterVersion>>): Lang[] {
  return LANGS.filter((lang) => Boolean(versions[lang]));
}

/** 构建期决定列表里显示哪个标题：中文优先，缺失回落英文 */
export function pickVersion(versions: Partial<Record<Lang, ChapterVersion>>): ChapterVersion {
  return versions.zh ?? versions.en ?? { title: "", body: "" };
}

export function pickTitle(chapter: Chapter): string {
  return pickVersion(chapter.versions).title;
}

export function chapterPath(bookSlug: string, chapterSlug: string): string {
  return `/books/${bookSlug}/${chapterSlug}/`;
}
