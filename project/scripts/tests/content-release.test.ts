import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import { contentJson } from "../content-json";
import { assertContentFitsD1 } from "../export-content";
import { catalogResponseBody } from "../../content/catalog-storage";
import { getPageCatalog } from "../../content/catalog";

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
    const catalog = String(rows.find((row) => row.key === "catalog")?.json);
    const expanded = catalogResponseBody(catalog);
    assert.deepEqual(JSON.parse(expanded), JSON.parse(contentJson(getPageCatalog())));
    assert.ok(Buffer.byteLength(catalog) < Buffer.byteLength(expanded) / 2);
    db.exec(await readFile(".backend-build/activate.sql", "utf8"));
    db.exec(sql);
    assert.deepEqual(db.prepare("SELECT key,json FROM content_entries WHERE version_id=? ORDER BY key").all(version), rows);
    assert.equal(db.prepare("SELECT version_id FROM content_current WHERE id=1").get()?.version_id, version);
  } finally { db.close(); }
});

test("catalog API preserves previously stored JSON and the D1 limit counts UTF-8 bytes", () => {
  const previous = '{"books":[],"sections":[]}';
  assert.equal(catalogResponseBody(previous), previous);
  assert.doesNotThrow(() => assertContentFitsD1("catalog", "数".repeat(100), "1".repeat(32)));
  assert.throws(() => assertContentFitsD1("catalog", "数".repeat(666_667), "1".repeat(32)), /catalog.*2000000/);
});
