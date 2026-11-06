import { build } from "esbuild";
import { writeFile } from "node:fs/promises";
import { getAllBooks } from "../content/index";
import { pickVersion } from "../lib/language";

const titles: Record<string, { zh: string; en: string }> = {};
for (const book of getAllBooks()) {
  const href = `/books/${book.slug}/`;
  titles[href] = { zh: book.title, en: book.title };
  for (const chapter of book.chapters) {
    const zh = pickVersion(chapter.versions).title;
    titles[href + chapter.slug + "/"] = { zh, en: chapter.versions.en?.title ?? chapter.translation?.title ?? zh };
  }
}
await build({
  define: { FAVORITE_TITLES: JSON.stringify(titles) },
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
