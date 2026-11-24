import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { noteEmphasis } from "../../lib/note-emphasis";

test("supplemental proof labels reuse the campus blockquote chrome", () => {
  assert.equal(noteEmphasis("补充证明"), "proof");
  assert.equal(noteEmphasis("补充证明："), "proof");
  assert.equal(noteEmphasis("补充证明:"), "proof");
  assert.equal(noteEmphasis("关键结论"), "key");
  assert.equal(noteEmphasis("易错点"), "key");
});

test("a standalone problem label gets the filled campus blockquote", () => {
  assert.equal(noteEmphasis("题目"), "key");
  assert.equal(noteEmphasis("题目解析"), undefined);
});

test("ordinary labels stay ordinary quotes", () => {
  assert.equal(noteEmphasis("证明"), undefined);
  assert.equal(noteEmphasis("补充证明与说明"), undefined);
  assert.equal(noteEmphasis(""), undefined);
});

test("proof block CSS keeps a theme-aware vertical rule", async () => {
  const css = await readFile(new URL("../../app/campus-notes.css", import.meta.url), "utf8");
  assert.match(
    css,
    /\[data-reading-preset="campus-notes"\] \.prose blockquote\[data-note-emphasis="proof"\] \{/,
  );
  assert.match(css, /border-left: 3px double/);
  assert.match(
    css,
    /html\[data-theme="dark"\] \[data-reading-preset="campus-notes"\] \.prose blockquote\[data-note-emphasis="proof"\] \{/,
  );
});
