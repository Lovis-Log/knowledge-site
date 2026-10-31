import { PROGRESS_STORAGE_KEY, LAST_READ_STORAGE_KEY } from "@/lib/language";

export interface LastRead {
  book: string;
  chapter: string;
  updatedAt: string;
}

type ProgressMap = Record<string, number>;

export function readProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    const map: ProgressMap = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof value === "number" && Number.isFinite(value)) {
        map[key] = Math.min(100, Math.max(0, value));
      }
    }
    return map;
  } catch {
    return {};
  }
}

export function writeProgress(key: string, percent: number): void {
  try {
    const map = readProgress();
    map[key] = Math.min(100, Math.max(0, percent));
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // localStorage 不可用时静默降级，不影响阅读
  }
}

export function readLastRead(): LastRead | null {
  try {
    const raw = localStorage.getItem(LAST_READ_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LastRead>;
    if (typeof parsed.book !== "string" || typeof parsed.chapter !== "string") return null;
    return {
      book: parsed.book,
      chapter: parsed.chapter,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return null;
  }
}

export function writeLastRead(entry: LastRead): void {
  try {
    localStorage.setItem(LAST_READ_STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // 忽略
  }
}
