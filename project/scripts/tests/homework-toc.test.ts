import { test } from "node:test";
import assert from "node:assert/strict";
import { getAllBooks } from "../../content/index";
import { buildHomeworkToc, buildToc } from "../../lib/toc";

test("real homework outlines contain questions only and preserve their body anchors", () => {
  const book = getAllBooks().find((item) => item.slug === "campus-mathematical-analysis")!;
  const homework = book.chapters.filter((chapter) => chapter.group === "homework");
  assert.equal(homework.length, 7);
  for (const chapter of homework) {
    const body = chapter.versions.zh!.body;
    const originalIds = new Set(buildToc(body, "zh").map((item) => item.id));
    const items = buildHomeworkToc(body, "zh");
    assert.ok(items.length > 0, chapter.slug);
    assert.deepEqual(items.map((item) => item.text), items.map((_, index) => `题目 ${index + 1}`));
    assert.ok(items.every((item) => item.depth === 2 && originalIds.has(item.id)));
  }
  assert.equal(buildHomeworkToc(homework[0].versions.zh!.body, "zh").length, 10);
  assert.equal(buildHomeworkToc(homework[1].versions.zh!.body, "zh").length, 5);
  assert.equal(buildHomeworkToc(homework[2].versions.zh!.body, "zh").length, 9);
  assert.equal(buildHomeworkToc(homework[6].versions.zh!.body, "zh").length, 15);
});

test("ordinary course outlines retain their detailed headings", () => {
  const book = getAllBooks().find((item) => item.slug === "campus-mathematical-analysis")!;
  const lecture = book.chapters.find((chapter) => chapter.number === 15)!;
  const items = buildToc(lecture.versions.zh!.body, "zh");
  assert.ok(items.some((item) => item.depth === 3));
  assert.ok(items.some((item) => item.text.includes("证明")));
});
