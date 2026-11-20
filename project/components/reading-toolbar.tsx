"use client";

import { UiText } from "@/components/ui-text";
import { uiLabel } from "@/lib/ui-language";

import { useEffect, useLayoutEffect } from "react";
import type { Lang } from "@/content/types";
import {
  FONT_SIZE_STORAGE_KEY,
  FONT_SIZES,
  TOC_STORAGE_KEY,
  type FontSize,
} from "@/lib/reading-preferences";
import { LanguageToggle, Segmented, type SegmentedOption } from "./language-toggle";

type ReadingView = "notes" | "translation";
type TocChoice = "open" | "closed";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function setFontSize(size: FontSize) {
  document.documentElement.dataset.fontSize = size;
  try {
    localStorage.setItem(FONT_SIZE_STORAGE_KEY, size);
  } catch {
    // 隐私模式下忽略
  }
}

function setTocOpen(open: boolean) {
  document.documentElement.dataset.toc = open ? "open" : "closed";
  try {
    localStorage.setItem(TOC_STORAGE_KEY, open ? "1" : "0");
  } catch {
    // 隐私模式下忽略
  }
}

function setReadingView(view: ReadingView) {
  document.documentElement.dataset.readingView = view;
}

const READING_VIEW_OPTIONS: SegmentedOption<ReadingView>[] = [
  { value: "notes", label: <UiText zh="原文与精读" />, attrs: { "data-view": "notes" } },
  { value: "translation", label: <UiText zh="原文翻译" />, attrs: { "data-view": "translation" } },
];

const FONT_OPTIONS: SegmentedOption<FontSize>[] = FONT_SIZES.map((item) => ({
  value: item.value,
  label: <UiText zh={item.label} />,
  attrs: { "data-size": item.value },
}));

const TOC_OPTIONS: SegmentedOption<TocChoice>[] = [
  { value: "open", label: <UiText zh="显示" />, attrs: { "data-toc": "open" } },
  { value: "closed", label: <UiText zh="隐藏" />, attrs: { "data-toc": "closed" } },
];

export function ReadingToolbar({ langs, hasTranslation = false }: { langs: Lang[]; hasTranslation?: boolean }) {
  // Commit the default reading view before paint; the cleanup must also run
  // before the next chapter mounts so a closed translation view never leaks in.
  useIsomorphicLayoutEffect(() => {
    if (!hasTranslation) return;
    document.documentElement.dataset.readingView = "notes";
    return () => { delete document.documentElement.dataset.readingView; };
  }, [hasTranslation]);
  return (
    <div className="reading-toolbar">
      {hasTranslation ? (
        <div className="control-group" role="group" {...uiLabel("阅读视图")}>
          <span className="control-label"><UiText zh="阅读" /></span>
          <Segmented
            preference="readingView"
            fallback="notes"
            options={READING_VIEW_OPTIONS}
            onChange={setReadingView}
          />
        </div>
      ) : <LanguageToggle langs={langs} />}
      <div className="control-group" role="group" {...uiLabel("正文字号")}>
        <span className="control-label"><UiText zh="字号" /></span>
        <Segmented
          preference="fontSize"
          fallback="md"
          options={FONT_OPTIONS}
          onChange={setFontSize}
        />
      </div>
      <div className="control-group toc-toggle" role="group" {...uiLabel("目录显示")}>
        <span className="control-label"><UiText zh="目录" /></span>
        <Segmented
          preference="toc"
          fallback="open"
          options={TOC_OPTIONS}
          onChange={(value) => setTocOpen(value === "open")}
        />
      </div>
    </div>
  );
}
