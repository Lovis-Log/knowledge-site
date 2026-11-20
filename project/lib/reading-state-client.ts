"use client";

import { useEffect, useState } from "react";
import { api, ApiError } from "./api";
import { readLastRead, readProgress } from "./progress";
import type { ReadingProgressEntry, ReadingState } from "./reading-state-types";

const endpoint = "/api/reading-state";
const legacyOwnerKey = "shufang:reading-state-import-owner";
const migratedKey = "shufang:reading-state-imported";
const pending = new Map<string, ReadingProgressEntry>();
const writes = new Map<string, Promise<void>>();
let migration: Promise<boolean> | undefined;

function keyOf({ book, chapter }: { book: string; chapter: string }) {
  return book + "/" + chapter;
}

function storagePrefix(account: string) {
  return "shufang:reading-pending:" + account + ":";
}

function queueKey(account: string, entry: ReadingProgressEntry) {
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

function flushPosition(account: string, entry: ReadingProgressEntry) {
  const key = queueKey(account, entry);
  if (writes.has(key)) return;
  const write = api(endpoint, "POST", { account, action: "progress", ...entry }, { keepalive: true })
    .then(() => {
      if (pending.get(key) && pending.get(key) !== entry) return;
      pending.delete(key);
      try {
        const stored = parsePosition(localStorage.getItem(key));
        if (stored && stored.observedAt <= entry.observedAt && stored.furthest <= entry.furthest)
          localStorage.removeItem(key);
      } catch { /* Storage is optional. */ }
    })
    .catch(() => { /* Persist until the next reader visit or reconnection. */ })
    .finally(() => {
      writes.delete(key);
      const newest = pending.get(key);
      if (newest && newest !== entry) flushPosition(account, newest);
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
  return { ...state, progress: book ? progress : progress.slice(0, 1) };
}

export function useReadingState(book?: string, chapter?: string) {
  const key = [book, chapter].filter(Boolean).join("/");
  const [snapshot, setSnapshot] = useState<{ key: string; value: ReadingState | null; failed?: boolean }>();
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    let requestId = 0;
    const params = new URLSearchParams();
    if (book) params.set("book", book);
    if (chapter) params.set("chapter", chapter);
    const path = params.size ? endpoint + "?" + params : endpoint;
    const refresh = async () => {
      const id = ++requestId;
      try {
        let value = await api<ReadingState>(path);
        if (!active || requestId !== id) return;
        if (await migrateLegacy(value.account)) value = await api<ReadingState>(path);
        if (active && requestId === id) setSnapshot({ key, value: mergePending(value, book, chapter) });
      } catch (error) {
        const expired = error instanceof ApiError && (error.status === 401 || error.status === 403);
        if (active && requestId === id) setSnapshot((current) => ({
          key, value: !expired && current?.key === key ? current.value : null, failed: true,
        }));
      }
    };
    const onVisible = () => { if (document.visibilityState === "visible") void refresh(); };
    void refresh();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", refresh);
    return () => {
      active = false;
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", refresh);
    };
  }, [book, chapter, key, revision]);
  return {
    state: snapshot?.key === key ? snapshot.value : null,
    failed: snapshot?.key === key && snapshot.failed,
    refresh: () => setRevision((value) => value + 1),
  };
}

export function changeReadingState(account: string, book: string, chapter: string, action: object) {
  return api(endpoint, "POST", { account, book, chapter, ...action });
}
