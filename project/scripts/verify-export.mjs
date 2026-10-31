#!/usr/bin/env node
import { readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "out");

const books = {
  "cmu-ai-agents": ["01-what-is-an-agent", "02-tool-use", "03-long-context"],
  "mit-linear-algebra": [
    "01-geometry-of-equations",
    "02-elimination-with-matrices",
    "03-multiplication-and-inverses",
  ],
  "vibe-coding": ["01-the-loop", "02-my-ai-workflow"],
};

const expected = [
  "index.html",
  "404.html",
  "about/index.html",
  ...Object.entries(books).flatMap(([book, chapters]) => [
    `books/${book}/index.html`,
    ...chapters.map((chapter) => `books/${book}/${chapter}/index.html`),
  ]),
  "images/agent-loop.svg",
  "images/linear-map.svg",
  "images/vibe-loop.svg",
];

const failures = [];
const htmlCache = new Map();

async function readHtml(relativePath) {
  if (!htmlCache.has(relativePath)) {
    htmlCache.set(relativePath, await readFile(join(outDir, relativePath), "utf8"));
  }
  return htmlCache.get(relativePath);
}

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
  if (!mathChapter.includes("class=\"katex\"")) {
    failures.push("KaTeX 未渲染：out/books/mit-linear-algebra/01-geometry-of-equations/index.html");
  }
  const codeChapter = await readHtml("books/mit-linear-algebra/02-elimination-with-matrices/index.html");
  if (!codeChapter.includes("hljs")) {
    failures.push("代码高亮未渲染：out/books/mit-linear-algebra/02-elimination-with-matrices/index.html");
  }
} catch {
  // 文件缺失已在上方报告
}

try {
  const bilingual = await readHtml("books/cmu-ai-agents/01-what-is-an-agent/index.html");
  if (!bilingual.includes('data-lang-block="zh"') || !bilingual.includes('data-lang-block="en"')) {
    failures.push("双语章节缺少中英两份正文：out/books/cmu-ai-agents/01-what-is-an-agent/index.html");
  }
  if (!bilingual.includes('id="en-')) {
    failures.push("双语章节的英文锚点未加语言前缀：out/books/cmu-ai-agents/01-what-is-an-agent/index.html");
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
