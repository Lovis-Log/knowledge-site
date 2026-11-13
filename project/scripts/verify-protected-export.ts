import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { getAllBooks } from "../content/index";
import { bookEnglish } from "../lib/content-translations";
async function files(directory: string): Promise<string[]> {
  const items = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      items.map((item) =>
        item.isDirectory()
          ? files(join(directory, item.name))
          : Promise.resolve([join(directory, item.name)]),
      ),
    )
  ).flat();
}
const books = getAllBooks();
const paths = await files("out");
// These pages, including the about-page changelog, require Worker authorization.
const privatePage = /^(?:books|categories|library|search|about)\/.*\.(?:html|txt)$/;
const texts = await Promise.all(
  paths
    .filter(
      (path) =>
        /\.(html|txt|js|json|map)$/.test(path) &&
        !path.endsWith("_worker.js") &&
        !privatePage.test(path.replaceAll("\\", "/").slice("out/".length)),
    )
    .map(async (path) => ({ path, text: await readFile(path, "utf8") })),
);
for (const book of books) {
  const needles = [book.title, ...Object.values(book.displayTitle ?? {}), bookEnglish[book.slug]?.longDescription].filter(
    (value): value is string => Boolean(value && value.length > 8),
  );
  for (const chapter of book.chapters) {
    for (const version of [
      ...Object.values(chapter.versions),
      chapter.translation,
    ]) {
      if (!version) continue;
      const paragraph = version.body
        .split(/\n\s*\n/)
        .find((text) => text.length > 100 && !text.startsWith("```"));
      if (paragraph) needles.push(paragraph.slice(0, 100));
    }
  }
  for (const { path, text } of texts)
    for (const needle of needles)
      assert.ok(
        !text.includes(needle) &&
          !text.includes(JSON.stringify(needle).slice(1, -1)),
        `Protected content leaked into ${path}: ${book.slug}`,
      );
  const bookHtml = await readFile(`out/books/${book.slug}/index.html`, "utf8");
  assert.match(bookHtml, /class="book-title"/);
  for (const chapter of book.chapters)
    assert.match(
      await readFile(`out/books/${book.slug}/${chapter.slug}/index.html`, "utf8"),
      /class="chapter-title"/,
    );
}
for (const route of [
  "index.html",
  "library/index.html",
  "submissions/index.html",
  "login/index.html",
  "register/index.html",
  "reset-password/index.html",
  "guestbook/index.html",
  "favorites/index.html",
  "admin/users/index.html",
  "admin/invites/index.html",
])
  assert.ok((await stat("out/" + route)).isFile());
const routes = JSON.parse(await readFile("out/_routes.json", "utf8"));
assert.deepEqual(routes, { version: 1, include: ["/*"], exclude: [] });
assert.ok(
  !(await files("out")).some(
    (path) =>
      path.includes("content.sql") ||
      path.includes("content-manifest") ||
      path.endsWith(".map"),
  ),
);
console.log(
  `Protected export verified: ${texts.length} text assets scanned; ${books.length} books, ${books.reduce((sum, b) => sum + b.chapters.length, 0)} pre-rendered chapters; no sampled editorial content found outside the protected routes.`,
);
