"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { api, ApiError } from "./api";
import { classifyReadingFailure, readingRetryDelay } from "./reading-queue-policy";
import type { ReadingHighlight } from "./reading-state-types";

type HighlightAction =
  | { action: "highlight"; mark: ReadingHighlight }
  | { action: "remove-highlight"; id: string };
type Write = { key: string; at: number; change: HighlightAction };
type ChapterQueue = { account: string; book: string; chapter: string };
type View = {
  pending: readonly Write[];
  confirmed: readonly HighlightAction[];
  problem?: "retry" | "auth" | "rejected" | "full";
  revision: number;
};
const prefix = "shufang:highlight-write:";
const empty: View = { pending: [], confirmed: [], revision: 0 };
const viewers = new Set<() => void>();
const views = new Map<string, View>();
const memory = new Map<string, Write>();
const active = new Set<string>();
const timers = new Map<string, ReturnType<typeof setTimeout>>();
const attempts = new Map<string, number>();

const chapterKey = ({ account, book, chapter }: ChapterQueue) => `${prefix}${account}:${book}/${chapter}:`;
const markId = (change: HighlightAction) => change.action === "highlight" ? change.mark.id : change.id;
const notify = () => viewers.forEach((listener) => listener());
function subscribe(listener: () => void) {
  viewers.add(listener);
  return () => { viewers.delete(listener); };
}

function readKeys(prefix: string) {
  const keys = new Set<string>();
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(prefix)) keys.add(key);
    }
  } catch { /* Memory fallback remains usable. */ }
  for (const key of memory.keys()) if (key.startsWith(prefix)) keys.add(key);
  return keys;
}

function readWrites(key: string): Write[] {
  const writes: Write[] = [];
  for (const storedKey of readKeys(key)) {
    const cached = memory.get(storedKey);
    if (cached) {
      writes.push(cached);
      continue;
    }
    try {
      const data = JSON.parse(localStorage.getItem(storedKey) ?? "null") as Write | null;
      if (data?.key === storedKey && Number.isSafeInteger(data.at) && data.change &&
        ((data.change.action === "highlight" && typeof data.change.mark?.id === "string") ||
          (data.change.action === "remove-highlight" && typeof data.change.id === "string"))) writes.push(data);
    } catch { /* Ignore unreadable local records. */ }
  }
  return writes.sort((a, b) => a.at - b.at || a.key.localeCompare(b.key));
}

function viewOf(key: string) {
  let view = views.get(key);
  if (!view) {
    view = { ...empty, pending: readWrites(key) };
    views.set(key, view);
  }
  return view;
}

function update(key: string, patch: Partial<View> = {}) {
  views.set(key, { ...viewOf(key), ...patch, pending: readWrites(key) });
  notify();
}

function remove(write: Write) {
  memory.delete(write.key);
  try { localStorage.removeItem(write.key); } catch { /* Storage is optional. */ }
}

function clearRetry(key: string) {
  clearTimeout(timers.get(key));
  timers.delete(key);
}

export async function replayHighlightWrites(target: ChapterQueue, immediately = false) {
  const key = chapterKey(target);
  if (immediately) clearRetry(key);
  if (timers.has(key) || active.has(key)) return;
  active.add(key);
  const drain = async () => {
    for (;;) {
      const [write] = readWrites(key);
      if (!write) return;
      try {
        await api("/api/reading-state", "POST", { ...target, ...write.change }, { keepalive: true });
      } catch (error) {
        const failure = classifyReadingFailure(error);
        if (failure === "terminal") {
          remove(write);
          update(key, { problem: "rejected" });
          continue;
        }
        if (failure === "auth" || failure === "account") {
          update(key, { problem: "auth" });
          return;
        }
        const attempt = (attempts.get(key) ?? 0) + 1;
        attempts.set(key, attempt);
        const retryAfter = error instanceof ApiError ? error.retryAfter ?? 0 : 0;
        timers.set(key, setTimeout(() => {
          timers.delete(key);
          void replayHighlightWrites(target);
        }, Math.max(readingRetryDelay(attempt), retryAfter * 1000)));
        update(key, { problem: "retry" });
        return;
      }

      remove(write);
      attempts.delete(key);
      const current = viewOf(key);
      const id = markId(write.change);
      update(key, {
        confirmed: [...current.confirmed.filter((change) => markId(change) !== id), write.change],
        revision: current.revision + 1,
        problem: current.problem === "retry" || current.problem === "auth" ? undefined : current.problem,
      });
    }
  };
  try {
    // One tab per chapter replays writes in storage order. Individual storage keys let
    // other tabs append concurrently without replacing unsent writes.
    if (navigator.locks) await navigator.locks.request(key, drain);
    else await drain();
  } finally {
    active.delete(key);
  }
}

export function enqueueHighlight(target: ChapterQueue, change: HighlightAction) {
  const key = chapterKey(target);
  const pending = readWrites(key);
  if (pending.length >= 250) {
    update(key, { problem: "full" });
    return false;
  }
  const write: Write = {
    key: key + crypto.randomUUID(),
    at: Math.max(Date.now() * 1000, (pending.at(-1)?.at ?? 0) + 1),
    change,
  };
  try { localStorage.setItem(write.key, JSON.stringify(write)); } catch { memory.set(write.key, write); }
  update(key);
  void replayHighlightWrites(target);
  return true;
}

export function flushAccountHighlights(account: string) {
  const scope = prefix + account + ":";
  const chapters = new Set<string>();
  for (const key of readKeys(scope)) chapters.add(key.slice(scope.length, key.lastIndexOf(":")));
  for (const path of chapters) {
    const [book, chapter] = path.split("/");
    if (book && chapter) void replayHighlightWrites({ account, book, chapter });
  }
}

export function useHighlightQueue(account: string | undefined, book: string, chapter: string) {
  const key = account ? chapterKey({ account, book, chapter }) : "";
  const snapshot = useCallback(() => key ? viewOf(key) : empty, [key]);
  const view = useSyncExternalStore(subscribe, snapshot, () => empty);
  useEffect(() => {
    if (!account) return;
    const target = { account, book, chapter };
    const onStorage = (event: StorageEvent) => {
      if (!event.key?.startsWith(key)) return;
      const current = viewOf(key);
      update(key, { revision: current.revision + (event.newValue === null ? 1 : 0) });
      void replayHighlightWrites(target);
    };
    const onOnline = () => { void replayHighlightWrites(target, true); };
    window.addEventListener("storage", onStorage);
    window.addEventListener("online", onOnline);
    void replayHighlightWrites(target);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("online", onOnline);
    };
  }, [account, book, chapter, key]);

  return {
    ...view,
    enqueue: (change: HighlightAction) => account ? enqueueHighlight({ account, book, chapter }, change) : false,
    retry: () => { if (account) void replayHighlightWrites({ account, book, chapter }, true); },
    dismiss: () => { if (key) update(key, { problem: undefined }); },
    acknowledge: (saved: readonly ReadingHighlight[]) => {
      if (!key) return;
      const current = viewOf(key);
      if (!current.confirmed.length) return;
      const ids = new Set(saved.map(({ id }) => id));
      const remaining = current.confirmed.filter((change) =>
        ids.has(markId(change)) !== (change.action === "highlight"));
      if (remaining.length !== current.confirmed.length) update(key, { confirmed: remaining });
    },
  };
}

export type HighlightQueueHandle = ReturnType<typeof useHighlightQueue>;
