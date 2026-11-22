import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync, type SQLInputValue } from "node:sqlite";
import { setImmediate } from "node:timers/promises";

import { ApiError } from "../../lib/api";
import {
  classifyReadingFailure,
  nextObservedAt,
  readingRetryDelay,
} from "../../lib/reading-queue-policy";
import { enqueueHighlight, replayHighlightWrites } from "../../lib/reading-highlight-queue";
import { getReadingState } from "../reading-state";
import type { ReadingProgressEntry } from "../../lib/reading-state-types";

test("highlight and progress failures separate auth, account, terminal and transient", () => {
  assert.equal(classifyReadingFailure(new ApiError(401, "UNAUTHENTICATED", "sign in")), "auth");
  assert.equal(classifyReadingFailure(new ApiError(403, "FORBIDDEN", "no")), "auth");
  assert.equal(classifyReadingFailure(new ApiError(409, "ACCOUNT_CHANGED", "switched")), "account");
  assert.equal(classifyReadingFailure(new ApiError(409, "HIGHLIGHT_LIMIT", "full")), "terminal");
  assert.equal(classifyReadingFailure(new ApiError(404, "NOT_FOUND", "gone")), "terminal");
  assert.equal(classifyReadingFailure(new ApiError(400, "INVALID_READING_STATE", "bad")), "terminal");
  assert.equal(classifyReadingFailure(new ApiError(429, "RESOURCE_LIMITED", "slow")), "transient");
  assert.equal(classifyReadingFailure(new ApiError(503, "SERVICE_UNAVAILABLE", "down")), "transient");
  assert.equal(classifyReadingFailure(new Error("offline")), "transient");
});

test("retry backoff grows and stays bounded", () => {
  const delays = [1, 2, 3, 4, 5, 6, 7].map(readingRetryDelay);
  assert.deepEqual(delays, [2000, 5000, 15000, 30000, 60000, 120000, 120000]);
  assert.equal(readingRetryDelay(0), 2000);
});

test("observed time stays monotonic when the device clock runs behind", () => {
  assert.equal(nextObservedAt(0, 1000), 1000);
  assert.equal(nextObservedAt(5000, 1000), 5001);
  assert.equal(nextObservedAt(5000, 9000), 9000);
});

test("recent reading filters retired chapters before limiting the list", async () => {
  const sqlite = new DatabaseSync(":memory:");
  try {
    sqlite.exec(`CREATE TABLE reading_progress (
      user_id TEXT, book TEXT, chapter TEXT, resume REAL, furthest REAL, observed_at INTEGER, last_read_at INTEGER
    )`);
    const insert = sqlite.prepare("INSERT INTO reading_progress VALUES(?, 'book', ?, 10, 20, ?, ?)");
    for (let i = 0; i < 50; i++) insert.run("account", "retired-" + i, i + 100, i + 100);
    for (let i = 0; i < 10; i++) insert.run("account", "available-" + i, i, i);
    insert.run("other", "available-9", 500, 500);
    const db = {
      prepare(sql: string) {
        return {
          bind(...parameters: SQLInputValue[]) {
            return { async all() { return { results: sqlite.prepare(sql).all(...parameters) }; } };
          },
        };
      },
    };
    const paths = JSON.stringify(Array.from({ length: 10 }, (_, i) => "book/available-" + i));
    const state = await getReadingState(db as never, "account", null, paths);
    assert.equal(state.progress.length, 8);
    assert.equal(state.progress[0]?.chapter, "available-9");
    assert.equal(state.progress[0]?.lastReadAt, 9);
    assert.equal(state.progress.at(-1)?.chapter, "available-2");
  } finally {
    sqlite.close();
  }
});

test("a chapter target is not replaced by recent fallback candidates", async () => {
  const rows: ReadingProgressEntry[] = [{
    book: "book", chapter: "open", resume: 40, furthest: 60, observedAt: 10, lastReadAt: 10,
  }];
  let sql = "";
  const db = {
    prepare(query: string) {
      sql = query;
      return {
        bind() {
          return {
            async all() { return { results: rows }; },
          };
        },
      };
    },
  };
  const state = await getReadingState(db as never, "account", { book: "book", chapter: "open" });
  assert.match(sql, /AND chapter=\?/);
  assert.deepEqual(state.progress, rows);
});

test("highlight writes survive failure and replay in order only for their owner", async () => {
  const originalFetch = globalThis.fetch;
  const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const values = new Map<string, string>();
  const target = { account: "reader", book: "notes", chapter: "one" };
  const mark = { id: "mark", view: "zh", start: 1, quote: "quoted", prefix: "", suffix: "" } as const;
  const applied: string[] = [];
  let session = "reader";
  let online = false;
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      get length() { return values.size; },
      key: (index: number) => [...values.keys()][index] ?? null,
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      removeItem: (key: string) => values.delete(key),
    },
  });
  globalThis.fetch = async (path, init) => {
    if (path === "/api/auth/csrf") return Response.json({ token: "1".repeat(64) });
    const write = JSON.parse(String(init?.body));
    if (!online) return Response.json({ code: "SERVICE_UNAVAILABLE" }, { status: 503 });
    if (write.account !== session) return Response.json({ code: "ACCOUNT_CHANGED" }, { status: 409 });
    applied.push(write.action);
    return Response.json({ ok: true });
  };
  try {
    assert.equal(enqueueHighlight(target, { action: "highlight", mark }), true);
    assert.equal(enqueueHighlight(target, { action: "remove-highlight", id: mark.id }), true);
    await setImmediate();
    assert.equal(values.size, 2);
    online = true;
    session = "different-reader";
    await replayHighlightWrites(target, true);
    assert.equal(values.size, 2);
    assert.deepEqual(applied, []);
    session = target.account;
    await replayHighlightWrites(target, true);
    assert.equal(values.size, 0);
    assert.deepEqual(applied, ["highlight", "remove-highlight"]);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage);
    else Reflect.deleteProperty(globalThis, "localStorage");
  }
});
