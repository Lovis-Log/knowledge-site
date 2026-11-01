"use client";

import { useEffect } from "react";
import type { Lang } from "@/content/types";
import {
  FONT_SIZE_STORAGE_KEY,
  FONT_SIZES,
  TOC_STORAGE_KEY,
  type FontSize,
} from "@/lib/reading-preferences";
import { LanguageToggle } from "./language-toggle";

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

export function ReadingToolbar({ langs, hasTranslation = false }: { langs: Lang[]; hasTranslation?: boolean }) {
  useEffect(() => {
    if (!hasTranslation) return;
    document.documentElement.dataset.readingView = "notes";
    return () => { delete document.documentElement.dataset.readingView; };
  }, [hasTranslation]);
  return (
    <div className="reading-toolbar">
      {hasTranslation ? (
        <div className="control-group" role="group" aria-label="阅读视图">
          <span className="control-label">阅读</span>
          <div className="segmented">
            <button type="button" className="segmented__btn" data-view="notes" onClick={() => { document.documentElement.dataset.readingView = "notes"; }}>原文与精读</button>
            <button type="button" className="segmented__btn" data-view="translation" onClick={() => { document.documentElement.dataset.readingView = "translation"; }}>原文翻译</button>
          </div>
        </div>
      ) : <LanguageToggle langs={langs} />}
      <div className="control-group" role="group" aria-label="正文字号">
        <span className="control-label">字号</span>
        <div className="segmented">
          {FONT_SIZES.map((item) => (
            <button
              key={item.value}
              type="button"
              className="segmented__btn"
              data-size={item.value}
              onClick={() => setFontSize(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="control-group toc-toggle" role="group" aria-label="目录显示">
        <span className="control-label">目录</span>
        <div className="segmented">
          <button
            type="button"
            className="segmented__btn"
            data-toc="open"
            onClick={() => setTocOpen(true)}
          >
            显示
          </button>
          <button
            type="button"
            className="segmented__btn"
            data-toc="closed"
            onClick={() => setTocOpen(false)}
          >
            隐藏
          </button>
        </div>
      </div>
    </div>
  );
}
