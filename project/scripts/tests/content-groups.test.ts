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
  assert.deepEqual(campus.books.map((book) => book.slug), ["campus-basic-physics", "campus-cpp-programming", "campus-engineering-drawing", "campus-linear-algebra-analytic-geometry", "campus-discrete-mathematics", "campus-mathematical-analysis"]);
});

test("linear algebra and analytic geometry keeps 27 course entries and 7 image homework entries", () => {
  const book = getAllBooks().find((item) => item.slug === "campus-linear-algebra-analytic-geometry");
  assert.ok(book, "new campus book is loaded");
  assert.equal(book.studyPeriod, "大一");
  assert.equal(book.category, "campus-courses");
  assert.equal(book.title, "线性代数与解析几何");
  assert.equal(book.contentType, "reference");
  assert.deepEqual(
    book.groups?.map((group) => [group.id, group.heading]),
    [["course", "课程目录"], ["homework", "作业目录"]],
  );
  assert.equal(book.chapters.length, 34);

  const courses = book.chapters.filter((chapter) => chapter.group === "course");
  const homework = book.chapters.filter((chapter) => chapter.group === "homework");
  assert.equal(courses.length, 27);
  assert.equal(homework.length, 7);
  assert.deepEqual(
    courses.map((chapter) => chapter.displayNumber),
    ["1.1-1.2", "1.3", "1.4", "1.5", "2.1", "2.2", "2.3", "2.4", "2.5", "3.1", "3.2", "3.3", "3.4", "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "5.1", "5.2", "5.3", "6.1", "6.2", "6.3", "6.4", "习题"],
  );
  assert.deepEqual(
    homework.map((chapter) => chapterNumberLabel(chapter)),
    ["01", "02", "03", "04", "05", "06", "07"],
  );
  assert.equal(courses.at(-1)?.slug, "exercise-slides");
  assert.equal(courses.at(-1)?.versions.zh?.title, "课件习题");
  assert.equal(chapterHeading(courses.at(-1)!, book.groups), "课程 习题");
  assert.equal(chapterHeading(courses[0], book.groups), "课程 1.1-1.2");
  assert.equal(chapterPagerLabel(homework[0], book.groups), "作业 01");
  assert.ok(book.chapters.every((chapter) => (chapter.versions.zh?.body.length ?? 0) > 0));
  assert.ok(book.chapters.every((chapter) => !/file:\/\/\//.test(chapter.versions.zh?.body ?? "")));
  const slugs = getAllBooks().flatMap((item) => item.chapters.map((chapter) => `${item.slug}/${chapter.slug}`));
  assert.equal(new Set(slugs).size, slugs.length, "chapter slugs stay unique");
});

test("discrete mathematics preserves the supplied chapter numbers and has no homework group", () => {
  const book = getAllBooks().find((item) => item.slug === "campus-discrete-mathematics");
  assert.ok(book);
  assert.equal(book.studyPeriod, "大一");
  assert.deepEqual(book.groups?.map((group) => group.id), ["course"]);
  assert.deepEqual(book.chapters.map((chapter) => chapter.number), [1, 2, 3, 4, 7]);
  assert.deepEqual(book.chapters.map(chapterNumberLabel), ["01", "02", "03", "04", "07"]);
  assert.ok(book.chapters.every((chapter) => chapter.group === "course" && chapter.versions.zh?.body));
});
