"use client";

import { UiText } from "@/components/ui-text";
import { uiLabel } from "@/lib/ui-language";

import type { Lang } from "@/content/types";
import { LANG_STORAGE_KEY } from "@/lib/language";

function setLanguage(lang: Lang) {
  document.documentElement.dataset.lang = lang;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // 隐私模式下忽略
  }
}

export function LanguageToggle({ langs }: { langs: Lang[] }) {
  if (langs.length < 2) return null;

  return (
    <div className="control-group" role="group" {...uiLabel("正文语言")}>
      <span className="control-label"><UiText zh="语言" /></span>
      <div className="segmented">
        <button type="button" className="segmented__btn" data-lang="zh" onClick={() => setLanguage("zh")}>
          中文
        </button>
        <button type="button" className="segmented__btn" data-lang="en" onClick={() => setLanguage("en")}>
          EN
        </button>
      </div>
    </div>
  );
}
