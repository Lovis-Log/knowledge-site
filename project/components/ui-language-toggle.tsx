"use client";

import { useEffect } from "react";
import { UI_LANG_STORAGE_KEY, uiLabel } from "@/lib/ui-language";
import { UiText } from "./ui-text";

export function UiLanguageToggle() {
  useEffect(() => {
    const syncLabels = () => {
      const lang = document.documentElement.dataset.uiLang === "en" ? "en" : "zh";
      document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
      document.querySelectorAll<HTMLElement>("[data-ui-aria-en]").forEach((node) => {
        node.setAttribute("aria-label", (lang === "en" ? node.dataset.uiAriaEn : node.dataset.uiAriaZh) ?? "");
      });
      document.querySelectorAll<HTMLImageElement>("[data-ui-alt-en]").forEach((node) => {
        node.alt = (lang === "en" ? node.dataset.uiAltEn : node.dataset.uiAltZh) ?? "";
      });
    };
    const rootObserver = new MutationObserver(syncLabels);
    rootObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-ui-lang"] });
    const contentObserver = new MutationObserver(syncLabels);
    contentObserver.observe(document.body, { childList: true, subtree: true });
    const onStorage = (event: StorageEvent) => {
      if (event.key === UI_LANG_STORAGE_KEY && (event.newValue === "zh" || event.newValue === "en")) {
        document.documentElement.dataset.uiLang = event.newValue;
      }
    };
    window.addEventListener("storage", onStorage);
    syncLabels();
    return () => {
      rootObserver.disconnect();
      contentObserver.disconnect();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const lang = root.dataset.uiLang === "en" ? "zh" : "en";
    root.dataset.uiLang = lang;
    root.lang = lang === "en" ? "en" : "zh-CN";
    try { localStorage.setItem(UI_LANG_STORAGE_KEY, lang); } catch { /* Use the current page preference when storage is unavailable. */ }
  };

  return (
    <button type="button" className="ui-language-toggle" {...uiLabel("Switch to English", "切换为中文")} onClick={toggle}>
      <UiText zh="EN" en="中" />
    </button>
  );
}
