import type { ReactNode } from "react";
import { englishText } from "@/lib/ui-language";

/** Both variants are exported as HTML; CSS selects the interface language before hydration. */
export function UiText({ zh, en }: { zh: string; en?: string }) {
  return <UiPair zh={zh} en={en ?? englishText(zh)} />;
}

export function UiPair({ zh, en }: { zh: ReactNode; en: ReactNode }) {
  return <><span data-ui-block="zh" lang="zh-CN">{zh}</span><span data-ui-block="en" lang="en">{en}</span></>;
}

export function UiCount({ count, kind = "books", total = false }: { count: number; kind?: "books" | "chapters"; total?: boolean }) {
  const unit = kind === "books" ? "本" : "章";
  const word = kind === "books" ? "book" : "chapter";
  return <UiText zh={`${total ? "共 " : ""}${count} ${unit}`} en={`${count} ${word}${count === 1 ? "" : "s"}`} />;
}
