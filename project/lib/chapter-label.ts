import type { Chapter, ChapterGroup } from "@/content/types";
import { paddedNumber } from "./format";

/** 目录与章节页展示的编号；分组章节用独立编号，旧书沿用编号补零 */
export function chapterNumberLabel(chapter: Chapter): string {
  return chapter.displayNumber ?? paddedNumber(chapter.number);
}

export function chapterGroupOf(
  chapter: Chapter,
  groups?: ChapterGroup[],
): ChapterGroup | undefined {
  return chapter.group
    ? groups?.find((group) => group.id === chapter.group)
    : undefined;
}

/** 章节页眉：分组章节显示「课程 01」「作业 01」，旧书保持「第 01 章」 */
export function chapterHeading(
  chapter: Chapter,
  groups?: ChapterGroup[],
): string {
  const group = chapterGroupOf(chapter, groups);
  if (!group) return `第 ${paddedNumber(chapter.number)} 章`;
  return `${group.title} ${chapterNumberLabel(chapter)}`;
}

/** 上下篇导航：旧书只显示编号，分组章节补上分组简称避免与课程编号混淆 */
export function chapterPagerLabel(
  chapter: Chapter,
  groups?: ChapterGroup[],
): string {
  const group = chapterGroupOf(chapter, groups);
  return group
    ? `${group.title} ${chapterNumberLabel(chapter)}`
    : chapterNumberLabel(chapter);
}
