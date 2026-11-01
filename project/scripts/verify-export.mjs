#!/usr/bin/env node
import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const here = dirname(fileURLToPath(import.meta.url));
const projectDir = join(here, "..");
const outDir = process.argv[2] ? resolve(process.argv[2]) : join(projectDir, "out");
const siteDir = join(projectDir, "..", "Knowledge Site");

const failures = [];
const htmlCache = new Map();

async function readHtml(relativePath) {
  if (!htmlCache.has(relativePath)) {
    htmlCache.set(relativePath, await readFile(join(outDir, relativePath), "utf8"));
  }
  return htmlCache.get(relativePath);
}

// ---- derive expectations from Knowledge Site ----

const taxonomy = JSON.parse(await readFile(join(siteDir, "taxonomy.json"), "utf8"));
const categorySlugs = new Set((taxonomy.categories ?? []).map((item) => item.slug));
const categoryNames = new Map((taxonomy.categories ?? []).map((item) => [item.slug, item.name]));
const sections = taxonomy.sections ?? [];
const sectionSlugs = new Set(sections.map((item) => item.slug));
const bookCategories = new Map();
for (const category of taxonomy.categories ?? []) {
  if (!sectionSlugs.has(category.section)) failures.push(`分类 ${category.slug} 缺少有效的大类`);
}
const contentTypes = new Set([
  "video-course",
  "technical-tutorial",
  "science-explainer",
  "news",
  "opinion",
  "podcast-interview",
  "reference",
  "social-post",
]);

const books = new Map();
const chapterLangs = new Map();

async function findBookDirs(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  if (entries.some((entry) => entry.isFile() && entry.name === "_book.md")) return [directory];
  const nested = await Promise.all(entries.filter((entry) => entry.isDirectory() && !entry.name.startsWith(".")).map((entry) => findBookDirs(join(directory, entry.name))));
  return nested.flat();
}

const bookDirs = await findBookDirs(siteDir);
for (const bookDir of bookDirs) {
  const bookPath = relative(siteDir, bookDir);
  let bookMeta;
  try {
    bookMeta = matter(await readFile(join(bookDir, "_book.md"), "utf8")).data;
  } catch {
    failures.push(`缺少 _book.md：Knowledge Site/${bookPath}`);
    continue;
  }
  const slug = String(bookMeta.slug ?? "");
  if (!slug) {
    failures.push(`_book.md 缺少 slug：Knowledge Site/${bookPath}`);
    continue;
  }
  if (!bookMeta.category || !categorySlugs.has(String(bookMeta.category))) {
    failures.push(`书 ${slug} 的 category 未在 taxonomy.json 中声明：${bookMeta.category}`);
  }
  bookCategories.set(slug, String(bookMeta.category));

  const chapters = new Set();
  for (const file of await readdir(bookDir)) {
    const match = /^(\d{2,3}) - .+?\.(zh|en)\.md$/.exec(file);
    if (!match) continue;
    const meta = matter(await readFile(join(bookDir, file), "utf8")).data;
    if (!meta.slug) {
      failures.push(`章节缺少 slug：Knowledge Site/${bookPath}/${file}`);
      continue;
    }
    if (!meta.content_type || !contentTypes.has(String(meta.content_type))) {
      failures.push(`章节 content_type 无效：Knowledge Site/${bookPath}/${file}`);
    }
    chapters.add(String(meta.slug));
    const key = `${slug}/${meta.slug}`;
    if (!chapterLangs.has(key)) chapterLangs.set(key, new Set());
    chapterLangs.get(key).add(match[2]);
  }

  if (!chapters.size) {
    failures.push(`书 ${slug} 没有章节文件`);
  }
  books.set(slug, [...chapters].sort());
}

const expected = [
  "index.html",
  "404.html",
  "about/index.html",
  ...sections.map((section) => `categories/${section.slug}/index.html`),
  ...[...books.entries()].flatMap(([book, chapters]) => [
    `books/${book}/index.html`,
    ...chapters.map((chapter) => `books/${book}/${chapter}/index.html`),
  ]),
  "images/agent-loop.svg",
  "images/linear-map.svg",
  "images/vibe-loop.svg",
];

for (const relativePath of expected) {
  try {
    await stat(join(outDir, relativePath));
  } catch {
    failures.push(`缺少文件：out/${relativePath}`);
  }
}

const htmlFiles = expected.filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  let html;
  try {
    html = await readHtml(file);
  } catch {
    continue;
  }

  if (!/<h1[\s>]/.test(html)) {
    failures.push(`缺少 h1：out/${file}`);
  }
  if (html.includes("/_next/image")) {
    failures.push(`出现默认图片优化请求：out/${file}`);
  }
}

try {
  const mathChapter = await readHtml("books/mit-linear-algebra/01-geometry-of-equations/index.html");
  if (!mathChapter.includes('class="katex"')) {
    failures.push("KaTeX 未渲染：out/books/mit-linear-algebra/01-geometry-of-equations/index.html");
  }
  const codeChapter = await readHtml("books/mit-linear-algebra/02-elimination-with-matrices/index.html");
  if (!codeChapter.includes("hljs")) {
    failures.push("代码高亮未渲染：out/books/mit-linear-algebra/02-elimination-with-matrices/index.html");
  }
} catch {
  // 文件缺失已在上方报告
}

for (const [key, langs] of chapterLangs) {
  if (langs.size < 2) continue;
  const [book, chapter] = key.split("/");
  try {
    const html = await readHtml(`books/${book}/${chapter}/index.html`);
    if (!html.includes('data-lang-block="zh"') || !html.includes('data-lang-block="en"')) {
      failures.push(`双语章节缺少中英两份正文：out/books/${book}/${chapter}/index.html`);
    }
    if (!html.includes('id="en-')) {
      failures.push(`双语章节的英文锚点未加语言前缀：out/books/${book}/${chapter}/index.html`);
    }
  } catch {
    // 文件缺失已在上方报告
  }
}

try {
  const home = await readHtml("index.html");
  const usedCategories = new Set(bookCategories.values());
  for (const section of sections) {
    if (!home.includes(`id="section-${section.slug}"`) || !home.includes(`href="/categories/${section.slug}/"`)) {
      failures.push(`首页缺少大类及入口：${section.name}`);
    }
    const categoryHtml = await readHtml(`categories/${section.slug}/index.html`);
    const ownCategories = new Set(taxonomy.categories.filter((item) => item.section === section.slug).map((item) => item.slug));
    for (const category of usedCategories) {
      if (ownCategories.has(category) && !categoryHtml.includes(`id="category-${category}"`)) {
        failures.push(`大类页缺少子分类：${categoryNames.get(category)}`);
      }
    }
    for (const [book, category] of bookCategories) {
      const present = categoryHtml.includes(`href="/books/${book}/"`);
      if (present !== ownCategories.has(category)) failures.push(`大类页书籍归属错误：${section.slug}/${book}`);
    }
    const preview = home.split(`aria-labelledby="section-${section.slug}"`)[1]?.split("</section>")[0] ?? "";
    const count = (preview.match(/class="book-card"/g) ?? []).length;
    const total = [...bookCategories.values()].filter((category) => ownCategories.has(category)).length;
    if (count !== Math.min(4, total)) {
      failures.push(`首页大类预览数量错误：${section.name} (${count})`);
    }
  }
} catch {
  // 文件缺失已在上方报告
}

if (failures.length) {
  console.error(`verify-export 失败（${failures.length} 项）：`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`verify-export 通过：${expected.length} 个产物文件，${htmlFiles.length} 个页面。`);
