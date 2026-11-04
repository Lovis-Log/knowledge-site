import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import matter from "gray-matter";
import { englishText } from "../lib/ui-language.ts";
import { bookEnglish, taxonomyEnglish } from "../lib/content-translations.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const content = join(root, "..", "Knowledge Site");
const layout = await readFile(join(root, "app/layout.tsx"), "utf8");
const bootstrap = layout.match(/const bootstrap = `([^`]+)`;/)?.[1];
assert(bootstrap, "Language bootstrap must be available for the static export");

for (const test of [
  { browser: "zh-CN", expected: "zh" },
  { browser: "zh-TW", expected: "zh" },
  { browser: "en-US", expected: "en" },
  { browser: "fr-FR", expected: "en" },
  { browser: "en-US", saved: "zh", expected: "zh" },
  { browser: "zh-CN", saved: "en", expected: "en" },
  { browser: "zh-CN", saved: "invalid", expected: "zh" },
  { browser: "en-US", blocked: true, expected: "en" },
]) {
  const html = { dataset: { lang: "zh" }, lang: "zh-CN" };
  runInNewContext(bootstrap, {
    document: { documentElement: html },
    navigator: { languages: [test.browser], language: test.browser },
    localStorage: { getItem(key) {
      if (test.blocked) throw new Error("Storage unavailable");
      if (key === "shufang:ui-lang") return test.saved ?? null;
      if (key === "shufang:lang") return "en";
      return null;
    } },
  });
  assert.equal(html.dataset.uiLang, test.expected);
  assert.equal(html.lang, test.expected === "zh" ? "zh-CN" : "en");
  assert.equal(html.dataset.lang, test.blocked ? "zh" : "en", "System language must not override the content preference");
}

const taxonomy = JSON.parse(await readFile(join(content, "taxonomy.json"), "utf8"));
for (const item of [...taxonomy.sections, ...taxonomy.categories]) {
  assert(taxonomyEnglish[item.slug]?.name, `Missing category name: ${item.slug}`);
  assert(taxonomyEnglish[item.slug]?.description, `Missing category description: ${item.slug}`);
}

let bookCount = 0;
async function checkBooks(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await checkBooks(path);
    else if (entry.name === "_book.md") {
      const { data } = matter(await readFile(path, "utf8"));
      const english = bookEnglish[data.slug];
      assert(english?.description && english?.longDescription, `Missing book translation: ${data.slug}`);
      bookCount++;
    }
  }
}
await checkBooks(content);
assert.equal(englishText("原文"), "Original");
console.log(`UI language verification passed: 8 preference scenarios, ${taxonomy.sections.length + taxonomy.categories.length} categories, ${bookCount} book translations.`);
