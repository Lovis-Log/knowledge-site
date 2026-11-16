import { test } from "node:test";
import assert from "node:assert/strict";
import { getAllBooks, getLibrarySections } from "../../content/index";
import { chapterHeading, chapterNumberLabel, chapterPagerLabel } from "../../lib/chapter-label";

test("campus course keeps explicit course and homework groups with independent numbering", () => {
  const book = getAllBooks().find((item) => item.slug === "campus-mathematical-analysis");
  assert.ok(book, "campus book is loaded");
  assert.equal(book.studyPeriod, "大一");
  assert.equal(book.author, undefined, "cloud storage is not the course author");
  assert.equal(book.contentType, "reference");
  assert.deepEqual(
    book.groups?.map((group) => group.heading),
    ["课程目录", "作业目录"],
  );
  assert.equal(book.chapters.length, 31);

  const courses = book.chapters.filter((chapter) => chapter.group === "course");
  const homework = book.chapters.filter((chapter) => chapter.group === "homework");
  assert.equal(courses.length, 24);
  assert.equal(homework.length, 7);
  assert.equal(courses[0].slug, "00-course-introduction");
  assert.equal(chapterNumberLabel(courses[0]), "00");
  assert.deepEqual(
    homework.map((chapter) => chapterNumberLabel(chapter)),
    ["01", "02", "03", "04", "05", "06", "07"],
  );
  // The file order stays stable in `number`, but homework never reads as chapter 24.
  assert.deepEqual(
    homework.map((chapter) => chapter.number),
    [24, 25, 26, 27, 28, 29, 30],
  );
  assert.equal(chapterHeading(homework[0], book.groups), "作业 01");
  assert.equal(chapterHeading(courses[1], book.groups), "课程 01");
  assert.equal(chapterPagerLabel(homework[0], book.groups), "作业 01");
});

test("books without groups keep their original single list and numbering", () => {
  const book = getAllBooks().find((item) => item.slug === "mit-linear-algebra");
  assert.ok(book);
  assert.equal(book.studyPeriod, undefined);
  assert.equal(book.groups, undefined);
  assert.equal(chapterNumberLabel(book.chapters[0]), "00");
  assert.equal(chapterHeading(book.chapters[0]), "第 00 章");
  assert.equal(chapterPagerLabel(book.chapters[0]), "00");
  assert.ok(book.chapters.every((chapter) => !chapter.group && !chapter.displayNumber));
});

test("campus section sorts first and shows no subcategories", () => {
  const sections = getLibrarySections();
  assert.deepEqual(
    sections.map((section) => section.slug),
    ["campus-courses", "courses", "ai-era", "curated"],
  );
  const campus = sections[0];
  assert.equal(campus.groupByCategory, false);
  assert.deepEqual(campus.books.map((book) => book.slug), ["campus-mathematical-analysis"]);
});
