import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

// Exercise the actual filesystem loader twice in one process. A module-level
// snapshot used to keep old titles/categories after an external Markdown edit.
const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(projectDir, "package.json"));
const modules = new Map();
function loadModule(relativePath) {
  if (modules.has(relativePath)) return modules.get(relativePath).exports;
  const file = path.join(projectDir, `${relativePath}.ts`);
  const compiled = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const module = { exports: {} };
  modules.set(relativePath, module);
  const resolve = (specifier) => specifier.startsWith("@/") ? loadModule(specifier.slice(2)) : require(specifier);
  new Function("require", "module", "exports", compiled)(resolve, module, module.exports);
  return module.exports;
}

const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "lovismind-content-refresh-"));
const previousDir = process.env.KNOWLEDGE_SITE_DIR;
try {
  process.env.KNOWLEDGE_SITE_DIR = fixture;
  const folder = path.join(fixture, "book");
  fs.mkdirSync(folder);
  const metadata = path.join(folder, "_book.md");
  fs.writeFileSync(metadata, "---\nslug: example\ntitle: Old title\ncategory: old-category\n---\n");
  fs.writeFileSync(path.join(folder, "01 - chapter.zh.md"), "---\nslug: chapter\ntitle: Chapter\n---\nContent\n");
  const taxonomyFile = path.join(fixture, "taxonomy.json");
  const taxonomy = (slug) => JSON.stringify({
    sections: [{ slug: "ai-era", name: "AI Era", description: "" }],
    categories: [{ slug, section: "ai-era", name: slug }],
  });
  fs.writeFileSync(taxonomyFile, taxonomy("old-category"));
  const content = loadModule("content/index");
  assert.equal(content.getBook("example").title, "Old title");
  assert.equal(content.getLibrarySections()[0].books.length, 1);

  // No module reload or server restart between the old and new reads.
  fs.writeFileSync(metadata, "---\nslug: example\ntitle: New title\ncategory: new-category\n---\n");
  fs.writeFileSync(taxonomyFile, taxonomy("new-category"));
  assert.equal(content.getBook("example").title, "New title");
  assert.equal(content.getAllBooks()[0].category, "new-category");
  const section = content.getLibrarySections()[0];
  assert.equal(section.books.length, 1, "Category migration must not hide the book");
  assert.equal(section.groups[0].slug, "new-category");
  assert.equal(section.preview[0].title, "New title");
  assert.equal(content.getAllChapterRefs()[0].bookTitle, "New title");
  const nestedParent = path.join(fixture, "AI Era", "AI principles");
  fs.mkdirSync(nestedParent, { recursive: true });
  fs.renameSync(folder, path.join(nestedParent, "New title"));
  assert.equal(content.getBook("example").title, "New title", "Nested folder moves must preserve stable slugs");
  assert.equal(content.getLibrarySections()[0].books.length, 1);
  assert.equal(content.getChapter("example", "chapter").slug, "chapter");
  console.log("Content refresh passed: external title/category edits appear without reloading the module.");
  console.log("Nested folder migration passed: book and chapter links retain their slugs.");
} finally {
  if (previousDir === undefined) delete process.env.KNOWLEDGE_SITE_DIR;
  else process.env.KNOWLEDGE_SITE_DIR = previousDir;
  const tempRoot = path.resolve(os.tmpdir()) + path.sep;
  if (!path.resolve(fixture).startsWith(tempRoot) || !path.basename(fixture).startsWith("lovismind-content-refresh-")) {
    throw new Error("Unexpected fixture cleanup path");
  }
  fs.rmSync(fixture, { recursive: true, force: true });
}
