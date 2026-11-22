"use client";

import { useEffect, useState } from "react";
import { api, ApiError } from "./api";
import { readLastRead, readProgress } from "./progress";
import { flushAccountHighlights } from "./reading-highlight-queue";
import { classifyReadingFailure, readingRetryDelay } from "./reading-queue-policy";
import type { ReadingProgressEntry, ReadingState } from "./reading-state-types";

const endpoint = "/api/reading-state";
const legacyOwnerKey = "shufang:reading-state-import-owner";
const migratedKey = "shufang:reading-state-imported";
const pending = new Map<string, ReadingProgressEntry>();
const writes = new Map<string, Promise<void>>();
const progressAttempts = new Map<string, number>();
const progressTimers = new Map<string, ReturnType<typeof setTimeout>>();
let migration: Promise<boolean> | undefined;

function keyOf({ book, chapter }: { book: string; chapter: string }) {
  return book + "/" + chapter;
}

function storagePrefix(account: string) {
  return "shufang:reading-pending:" + account + ":";
}

function queueKey(account: string, entry: { book: string; chapter: string }) {
  return storagePrefix(account) + keyOf(entry);
}

function parsePosition(raw: string | null): ReadingProgressEntry | undefined {
  try {
    const item = JSON.parse(raw ?? "null");
    if (item && typeof item.book === "string" && typeof item.chapter === "string" &&
      [item.resume, item.furthest, item.observedAt, item.lastReadAt].every(Number.isFinite)) return item;
  } catch { /* Old or malformed entries have no position to restore. */ }
}

function readPending(account: string): ReadingProgressEntry[] {
  const prefix = storagePrefix(account);
  const positions = new Map<string, ReadingProgressEntry>();
  try {
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      if (!key?.startsWith(prefix)) continue;
      const entry = parsePosition(localStorage.getItem(key));
      if (entry) positions.set(key, entry);
    }
  } catch { /* Storage is optional. */ }
  for (const [key, entry] of pending) {
    if (key.startsWith(prefix) && entry.observedAt >= (positions.get(key)?.observedAt ?? 0))
      positions.set(key, entry);
  }
  return [...positions.values()];
}

export function saveReadingPosition(account: string, entry: ReadingProgressEntry) {
  const key = queueKey(account, entry);
  let stored: ReadingProgressEntry | undefined;
  try { stored = parsePosition(localStorage.getItem(key)); } catch { /* In-memory requests still work. */ }
  const current = pending.get(key);
  let latest = entry;
  for (const previous of [stored, current]) {
    if (previous && previous.observedAt > latest.observedAt) latest = previous;
  }
  const next = { ...latest, furthest: Math.max(stored?.furthest ?? 0, current?.furthest ?? 0, entry.furthest) };
  pending.set(key, next);
  try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* In-memory requests still work. */ }
  flushPosition(account, next);
}

function clearProgressRetry(key: string) {
  const timer = progressTimers.get(key);
  if (timer) clearTimeout(timer);
  progressTimers.delete(key);
}

function forgetPosition(account: string, entry: ReadingProgressEntry) {
  const key = queueKey(account, entry);
  pending.delete(key);
  progressAttempts.delete(key);
  clearProgressRetry(key);
  try {
    const stored = parsePosition(localStorage.getItem(key));
    if (!stored || (stored.observedAt <= entry.observedAt && stored.furthest <= entry.furthest))
      localStorage.removeItem(key);
  } catch { /* Storage is optional. */ }
}

function flushPosition(account: string, entry: ReadingProgressEntry) {
  const key = queueKey(account, entry);
  if (writes.has(key)) return;
  pending.set(key, entry);
  clearProgressRetry(key);
  const write = api(endpoint, "POST", { account, action: "progress", ...entry }, { keepalive: true })
    .then(() => {
      progressAttempts.delete(key);
      if (pending.get(key) && pending.get(key) !== entry) return;
      forgetPosition(account, entry);
    })
    .catch((error) => {
      const kind = classifyReadingFailure(error);
      if (kind === "terminal") {
        // A retired chapter or an invalid target must not be replayed forever,
        // but a newer position saved during this request still owns the row.
        if (pending.get(key) && pending.get(key) !== entry) return;
        forgetPosition(account, entry);
        return;
      }
      // Auth/account mismatches stay stored for that verified account only.
      if (kind !== "transient") return;
      const attempt = (progressAttempts.get(key) ?? 0) + 1;
      progressAttempts.set(key, attempt);
      clearProgressRetry(key);
      progressTimers.set(key, setTimeout(() => {
        progressTimers.delete(key);
        const latest = pending.get(key);
        if (latest) flushPosition(account, latest);
      }, Math.max(readingRetryDelay(attempt), (error instanceof ApiError ? error.retryAfter ?? 0 : 0) * 1000)));
    })
    .finally(() => {
      writes.delete(key);
      const newest = pending.get(key);
      // A backoff timer already owns the next attempt; do not bypass it.
      if (newest && newest !== entry && !progressTimers.has(key)) flushPosition(account, newest);
    });
  writes.set(key, write);
}

function migrateLegacy(account: string) {
  if (migration) return migration;
  migration = (async () => {
    if (localStorage.getItem(migratedKey)) return false;
    const owner = localStorage.getItem(legacyOwnerKey);
    if (owner && owner !== account) return false;
    const last = readLastRead();
    const entries = Object.entries(readProgress()).map(([key, percent]) => {
      const [book, chapter] = key.split("/");
      return { book, chapter, percent, openedAt: last && keyOf(last) === key ? Date.parse(last.updatedAt) || 0 : 0 };
    });
    if (last && !entries.some((entry) => keyOf(entry) === keyOf(last)))
      entries.push({ book: last.book, chapter: last.chapter, percent: 0, openedAt: Date.parse(last.updatedAt) || 0 });
    if (!entries.length) return false;
    localStorage.setItem(legacyOwnerKey, account);
    for (let index = 0; index < entries.length; index += 32)
      await api(endpoint, "POST", { account, action: "import", entries: entries.slice(index, index + 32) });
    localStorage.setItem(migratedKey, "1");
    return true;
  })().catch(() => false).finally(() => { migration = undefined; });
  return migration;
}

function mergePending(state: ReadingState, book?: string, chapter?: string) {
  const entries = new Map(state.progress.map((entry) => [keyOf(entry), entry]));
  for (const local of readPending(state.account)) {
    flushPosition(state.account, local);
    if ((book && local.book !== book) || (chapter && local.chapter !== chapter)) continue;
    const remote = entries.get(keyOf(local));
    entries.set(keyOf(local), {
      ...(!remote || local.observedAt >= remote.observedAt ? local : remote),
      furthest: Math.max(local.furthest, remote?.furthest ?? 0),
      lastReadAt: Math.max(local.lastReadAt, remote?.lastReadAt ?? 0),
    });
  }
  const progress = [...entries.values()].sort((a, b) => b.lastReadAt - a.lastReadAt);
  return { ...state, progress };
}

export function useReadingState(book?: string, chapter?: string) {
  const key = [book, chapter].filter(Boolean).join("/");
  const [snapshot, setSnapshot] = useState<{
    key: string;
    value: ReadingState | null;
    account?: string;
    failed?: boolean;
    authExpired?: boolean;
  }>();
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    let requestId = 0;
    let attempts = 0;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    const params = new URLSearchParams();
    if (book) params.set("book", book);
    if (chapter) params.set("chapter", chapter);
    const path = params.size ? endpoint + "?" + params : endpoint;
    const clearRetry = () => {
      if (retryTimer) clearTimeout(retryTimer);
      retryTimer = undefined;
    };
    const refresh = async () => {
      const id = ++requestId;
      clearRetry();
      try {
        let value = await api<ReadingState>(path);
        if (!active || requestId !== id) return;
        attempts = 0;
        if (await migrateLegacy(value.account)) value = await api<ReadingState>(path);
        if (!active || requestId !== id) return;
        setSnapshot({ key, value: mergePending(value, book, chapter), account: value.account });
        flushAccountHighlights(value.account);
      } catch (error) {
        if (!active || requestId !== id) return;
        if (classifyReadingFailure(error) === "auth") {
          setSnapshot({ key, value: null, failed: true, authExpired: true });
          return;
        }
        setSnapshot((current) => current?.key === key
          ? { ...current, failed: true }
          : { key, value: null, failed: true });
        attempts += 1;
        retryTimer = setTimeout(() => {
          if (active && requestId === id) void refresh();
        }, readingRetryDelay(attempts));

        // A failure of reading-state doesn't invalidate a session. Verify the
        // account independently so pending progress may still be saved safely.
        try {
          const { user } = await api<{ user: { id: string } | null }>("/api/auth/me");
          if (!active || requestId !== id) return;
          if (!user) {
            clearRetry();
            setSnapshot({ key, value: null, failed: true, authExpired: true });
            return;
          }
          setSnapshot((current) => ({
            key,
            value: current?.key === key && current.value?.account === user.id ? current.value : null,
            account: user.id,
            failed: true,
          }));
          flushAccountHighlights(user.id);
        } catch { /* The next attempt also rechecks the account. */ }
      }
    };
    const onVisible = () => { if (document.visibilityState === "visible") void refresh(); };
    void refresh();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", refresh);
    return () => {
      active = false;
      clearRetry();
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", refresh);
    };
  }, [book, chapter, key, revision]);
  const current = snapshot?.key === key ? snapshot : undefined;
  return {
    state: current?.value ?? null,
    account: current?.account,
    failed: current?.failed,
    authExpired: current?.authExpired,
    refresh: () => setRevision((value) => value + 1),
  };
}

export function changeReadingState(account: string, book: string, chapter: string, action: object) {
  return api(endpoint, "POST", { account, book, chapter, ...action });
}
