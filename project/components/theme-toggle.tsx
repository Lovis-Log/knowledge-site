"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { uiLabel } from "@/lib/ui-language";

export const THEME_STORAGE_KEY = "shufang:theme";

type Theme = "light" | "dark";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  try {
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

function applyTheme(theme: Theme, persist = false) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute("content", theme === "dark" ? "#101112" : "#fbf9f5");
  });
  if (!persist) return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The chosen theme still applies for this page when storage is unavailable.
  }
}

export function ThemeToggle() {
  const button = useRef<HTMLButtonElement>(null);

  // The inline head script normally paints the right theme before hydration.
  // React's development remount can reset <html> attributes, so re-apply here.
  useLayoutEffect(() => {
    const theme = storedTheme() ?? systemTheme();
    applyTheme(theme);
    button.current?.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    let media: MediaQueryList | null = null;
    try {
      media = matchMedia("(prefers-color-scheme: dark)");
    } catch {
      // Keep the current theme when the browser cannot report a preference.
    }
    const followSystem = () => {
      if (!storedTheme()) applyTheme(systemTheme());
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) applyTheme(storedTheme() ?? systemTheme());
    };
    const syncPressed = () => {
      button.current?.setAttribute("aria-pressed", root.dataset.theme === "dark" ? "true" : "false");
    };
    const observer = new MutationObserver(syncPressed);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    media?.addEventListener("change", followSystem);
    window.addEventListener("storage", onStorage);
    syncPressed();
    return () => {
      observer.disconnect();
      media?.removeEventListener("change", followSystem);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  function toggle() {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true);
  }

  return (
    <button
      ref={button}
      type="button"
      className="theme-toggle"
      {...uiLabel("切换深浅色主题", "Toggle color theme")}
      onClick={toggle}
    >
      <svg className="theme-toggle__moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.4 14.3A8.5 8.5 0 0 1 9.7 3.6 8.5 8.5 0 1 0 20.4 14.3Z" />
      </svg>
      <svg className="theme-toggle__sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
      </svg>
    </button>
  );
}
