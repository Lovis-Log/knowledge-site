import { build } from "esbuild";
import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { getAllBooks } from "../content/index";
import { pickVersion } from "../lib/language";
import { execFileSync } from "node:child_process";
import { exportContent } from "./export-content";
import { bookTitle } from "../lib/book-titles";

const { version } = await exportContent();
const commit = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();

const titles: Record<string, { zh: string; en: string }> = {};
// Next's segment-prefetch URLs flatten segment paths with dots, while the
// static exporter writes those segments into nested __next.* directories.
const rscPaths: Record<string, string> = {};
async function collectRscPaths(directory: string, relative = "") {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = relative ? `${relative}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      await collectRscPaths(join(directory, entry.name), file);
    } else if (file.endsWith(".txt")) {
      const parts = file.split("/");
      const start = parts.findIndex((part) => part.startsWith("__next."));
      if (start >= 0 && start < parts.length - 1) {
        const alias = [...parts.slice(0, start), parts.slice(start).join(".")].join("/");
        rscPaths[`/${alias}`] = `/${file}`;
      }
    }
  }
}
await collectRscPaths("out");
for (const book of getAllBooks()) {
  const href = `/books/${book.slug}/`;
  titles[href] = bookTitle(book);
  for (const chapter of book.chapters) {
    const zh = pickVersion(chapter.versions).title;
    titles[href + chapter.slug + "/"] = { zh, en: chapter.versions.en?.title ?? chapter.translation?.title ?? zh };
  }
}
// Keep older saved favorites readable after the two books were merged.
for (const [href, title] of Object.entries(titles)) {
  if (href.startsWith('/books/agent-engineering/'))
    titles[href.replace('/books/agent-engineering/', '/books/image-generation-workflows/')] = title;
}
await build({
  define: { FAVORITE_TITLES: JSON.stringify(titles), RSC_PATHS: JSON.stringify(rscPaths), CONTENT_VERSION: JSON.stringify(version), RELEASE_COMMIT: JSON.stringify(commit) },
  entryPoints: ["backend/index.ts"],
  outfile: "out/_worker.js",
  bundle: true,
  format: "esm",
  platform: "neutral",
  target: "es2022",
  external: ["node:*"],
  minify: true,
});
// Every request enters the Worker; attachments must never bypass access checks.
await writeFile(
  "out/_routes.json",
  JSON.stringify({ version: 1, include: ["/*"], exclude: [] }),
);
await writeFile(
  "out/_headers",
  "/_next/static/*\n  X-Content-Type-Options: nosniff\n  Cache-Control: public, max-age=31536000, immutable\n",
);
console.log("Pages Worker built; all routes pass through authentication.");
