"use client";

import type { Lang } from "@/content/types";
import { FONT_SIZE_STORAGE_KEY, FONT_SIZES, type FontSize } from "@/lib/reading-preferences";
import { LanguageToggle } from "./language-toggle";

function setFontSize(size: FontSize) {
  document.documentElement.dataset.fontSize = size;
  try {
    localStorage.setItem(FONT_SIZE_STORAGE_KEY, size);
  } catch {
    // 隐私模式下忽略
  }
}

export function ReadingToolbar({ langs }: { langs: Lang[] }) {
  return (
    <div className="reading-toolbar">
      <LanguageToggle langs={langs} />
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
    </div>
  );
}
