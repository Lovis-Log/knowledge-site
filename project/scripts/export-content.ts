import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { getPageCatalog } from "../content/catalog";
import { getAllBooks } from "../content/index";
import { contentJson } from "./content-json";

export async function exportContent() {
  const books = getAllBooks();
  const entries: [string, string][] = [
    ["catalog", contentJson(getPageCatalog())],
  ];
  for (const book of books)
    for (const chapter of book.chapters)
      entries.push([
        `chapters/${book.slug}/${chapter.slug}`,
        contentJson(chapter),
      ]);
  const version =
    createHash("sha256")
      .update(JSON.stringify(entries))
      .digest("hex")
      .slice(0, 32);
  const quote = (s: string) => "'" + s.replaceAll("'", "''") + "'";
  const sql = [
    `INSERT OR IGNORE INTO content_versions(id,created_at) VALUES(${quote(version)},unixepoch());`,
  ];
  // Large JSON values are assembled in bounded statements, staying below D1's SQL length limit.
  for (const [key, value] of entries) {
    sql.push(
      `INSERT OR IGNORE INTO content_entries(version_id,key,json) VALUES(${quote(version)},${quote(key)},'');`,
    );
    const characters = Array.from(value);
    for (let i = 0; i < characters.length; i += 6000)
      sql.push(
        `UPDATE content_entries SET json=json||${quote(characters.slice(i, i + 6000).join(""))} WHERE version_id=${quote(version)} AND key=${quote(key)} AND length(json)=${i};`,
      );
  }
  // The active version is switched by a separate command, only after the entire import succeeds.
  await mkdir(".backend-build", { recursive: true });
  await writeFile(".backend-build/content.sql", sql.join("\n"));
  await writeFile(
    ".backend-build/activate.sql",
    `INSERT INTO content_current(id,version_id) VALUES(1,${quote(version)}) ON CONFLICT(id) DO UPDATE SET version_id=excluded.version_id;\n`,
  );
  await writeFile(
    ".backend-build/content-manifest.json",
    JSON.stringify({
      version,
      entries: entries.length,
      books: books.length,
      chapters: entries.length - 1,
    }),
  );
  console.log(
    `Prepared ${books.length} books and ${entries.length - 1} chapters, version ${version}. No content is written to out/.`,
  );
  return { version, books };
}
if (process.argv[1]?.replaceAll("\\", "/").endsWith("/export-content.ts"))
  await exportContent();
