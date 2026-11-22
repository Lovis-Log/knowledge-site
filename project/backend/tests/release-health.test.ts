import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";

test("release health returns unavailable when the catalog exists but the schema is incomplete", async () => {
  const { version } = JSON.parse(await readFile(".backend-build/content-manifest.json", "utf8"));
  const mf = new Miniflare(convertV4MiniflareOptions({
    modules: true,
    scriptPath: "out/_worker.js",
    compatibilityDate: "2026-11-04",
    compatibilityFlags: ["nodejs_compat"],
    d1Databases: { DB: "incomplete-release" },
  }));
  try {
    const db = await mf.getD1Database("DB");
    const schema = await readFile("backend/migrations/0002_content.sql", "utf8");
    for (const sql of schema.split(";").filter((sql) => sql.trim())) await db.prepare(sql).run();
    await db.batch([
      db.prepare("INSERT INTO content_versions VALUES(?,unixepoch())").bind(version),
      db.prepare("INSERT INTO content_entries VALUES(?,'catalog','{}')").bind(version),
    ]);

    const response = await mf.dispatchFetch("https://lovismind.test/api/release");
    assert.equal(response.status, 503);
    assert.equal((await response.json() as { ready: boolean }).ready, false);
  } finally {
    await mf.dispose();
  }
});
