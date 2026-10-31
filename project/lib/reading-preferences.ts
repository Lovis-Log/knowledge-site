export type FontSize = "sm" | "md" | "lg";

export const FONT_SIZE_STORAGE_KEY = "shufang:font-size";
export const TOC_STORAGE_KEY = "shufang:toc";

export const FONT_SIZES: Array<{ value: FontSize; label: string }> = [
  { value: "sm", label: "小" },
  { value: "md", label: "中" },
  { value: "lg", label: "大" },
];

export function isFontSize(value: unknown): value is FontSize {
  return value === "sm" || value === "md" || value === "lg";
}
