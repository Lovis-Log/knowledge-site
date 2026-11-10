import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import { contentJson } from "../content-json";

test("Windows and Linux payloads share a version despite line endings and object key order", () => {
  assert.equal(contentJson({ zh: { body: "甲\r\n乙", title: "中文" }, en: "a\nb" }),
    contentJson({ en: "a\nb", zh: { title: "中文", body: "甲\n乙" } }));
});

test("content import resumes partial chunks and is safe to repeat after activation", async () => {
  const sql = await readFile(".backend-build/content.sql", "utf8");
  const { version, entries } = JSON.parse(await readFile(".backend-build/content-manifest.json", "utf8"));
  const db = new DatabaseSync(":memory:");
  try {
    db.exec(await readFile("backend/migrations/0002_content.sql", "utf8"));
    // Stop between statements, then replay the whole file (including multi-chunk chapters).
    db.exec(sql.split("\n").slice(0, 15).join("\n"));
    db.exec(sql);
    const rows = db.prepare("SELECT key,json FROM content_entries WHERE version_id=? ORDER BY key").all(version);
    assert.equal(rows.length, entries);
    for (const row of rows) assert.doesNotThrow(() => JSON.parse(String(row.json)));
    db.exec(await readFile(".backend-build/activate.sql", "utf8"));
    db.exec(sql);
    assert.deepEqual(db.prepare("SELECT key,json FROM content_entries WHERE version_id=? ORDER BY key").all(version), rows);
    assert.equal(db.prepare("SELECT version_id FROM content_current WHERE id=1").get()?.version_id, version);
  } finally { db.close(); }
});
