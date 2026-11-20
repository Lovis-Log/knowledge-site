"use client";

import { UiText } from "@/components/ui-text";
import { uiLabel } from "@/lib/ui-language";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { Lang } from "@/content/types";
import { LANG_STORAGE_KEY } from "@/lib/language";

export type SegmentedOption<T extends string> = {
  value: T;
  label: ReactNode;
  attrs: Record<string, string>;
};

type Pill = { x: number; y: number; width: number; height: number };

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function dataAttribute(preference: string) {
  return "data-" + preference.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase());
}

function readPreference<T extends string>(
  preference: string,
  options: readonly SegmentedOption<T>[],
  fallback: T,
): T {
  const value = document.documentElement.dataset[preference];
  return options.some((option) => option.value === value) ? (value as T) : fallback;
}

/**
 * A single pill slides between options of different widths. Until hydration the
 * existing html[data-*] selectors paint the selected option, so a stored
 * preference is visible in the first frame; the pill replaces that fill as soon
 * as it can be measured.
 */
export function Segmented<T extends string>({
  preference,
  fallback,
  options,
  onChange,
}: {
  preference: string;
  fallback: T;
  options: readonly SegmentedOption<T>[];
  onChange: (value: T) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<T | null>(null);
  const [pill, setPill] = useState<Pill | null>(null);
  const [settled, setSettled] = useState(false);
  const attribute = dataAttribute(preference);
  const values = options.map((option) => option.value).join("|");

  useIsomorphicLayoutEffect(() => {
    setSelected(readPreference(preference, options, fallback));
  }, [preference, fallback, values]);

  const measure = useCallback(() => {
    const element = container.current;
    if (!element) return;
    // Read the live preference rather than a render value: the html attribute
    // changes in the same tick as the click, before the observer callback.
    const value = readPreference(preference, options, fallback);
    const button = element.querySelector<HTMLElement>(`[data-segmented-value="${value}"]`);
    if (!button) return;
    // Fractional rects keep the pill aligned with variable-width labels that
    // land on subpixel boundaries.
    const containerRect = element.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const next: Pill = {
      x: buttonRect.left - containerRect.left,
      y: buttonRect.top - containerRect.top,
      width: buttonRect.width,
      height: buttonRect.height,
    };
    setPill((current) =>
      current &&
      current.x === next.x &&
      current.y === next.y &&
      current.width === next.width &&
      current.height === next.height
        ? current
        : next,
    );
  }, [preference, fallback, values]);

  useIsomorphicLayoutEffect(() => {
    measure();
  }, [measure, selected]);

  // Enable sliding only after the pill has been placed once, so hydration
  // never animates it in from the corner or from zero width.
  useEffect(() => {
    if (!pill) return;
    setSettled(true);
  }, [pill]);

  useEffect(() => {
    if (selected === null) return;
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    element
      .querySelectorAll<HTMLElement>(".segmented__btn")
      .forEach((button) => observer.observe(button));
    const sync = () => {
      setSelected(readPreference(preference, options, fallback));
      measure();
    };
    const rootObserver = new MutationObserver(sync);
    rootObserver.observe(document.documentElement, { attributes: true, attributeFilter: [attribute] });
    window.addEventListener("resize", measure);
    let live = true;
    document.fonts?.ready.then(() => { if (live) measure(); }).catch(() => {});
    return () => {
      live = false;
      observer.disconnect();
      rootObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [selected, measure, preference, fallback, attribute, values]);

  const style = pill
    ? ({
        "--segmented-pill-x": `${pill.x}px`,
        "--segmented-pill-y": `${pill.y}px`,
        "--segmented-pill-w": `${pill.width}px`,
        "--segmented-pill-h": `${pill.height}px`,
      } as CSSProperties)
    : undefined;

  return (
    <div
      ref={container}
      className="segmented"
      data-pill={pill ? (settled ? "ready" : "static") : undefined}
      style={style}
    >
      <span className="segmented__pill" aria-hidden="true" />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="segmented__btn"
          {...option.attrs}
          data-segmented-value={option.value}
          aria-pressed={selected === null ? undefined : selected === option.value}
          onClick={() => {
            setSelected(option.value);
            onChange(option.value);
          }}
        >
          <span className="segmented__label">{option.label}</span>
        </button>
      ))}
    </div>
  );
}

function setLanguage(lang: Lang) {
  document.documentElement.dataset.lang = lang;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // 隐私模式下忽略
  }
}

const LANGUAGE_OPTIONS: SegmentedOption<Lang>[] = [
  { value: "zh", label: <>中文</>, attrs: { "data-lang": "zh" } },
  { value: "en", label: <>EN</>, attrs: { "data-lang": "en" } },
];

export function LanguageToggle({ langs }: { langs: Lang[] }) {
  if (langs.length < 2) return null;

  return (
    <div className="control-group" role="group" {...uiLabel("正文语言")}>
      <span className="control-label"><UiText zh="语言" /></span>
      <Segmented
        preference="lang"
        fallback="zh"
        options={LANGUAGE_OPTIONS}
        onChange={setLanguage}
      />
    </div>
  );
}
