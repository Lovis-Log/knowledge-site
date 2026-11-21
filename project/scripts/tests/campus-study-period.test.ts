import { test } from "node:test";
import assert from "node:assert/strict";
import { getAllBooks } from "../../content/index";
import { studyPeriodLabel } from "../../lib/study-period";

const scoped = [
  "campus-cpp-programming",
  "campus-discrete-mathematics",
  "campus-mathematical-analysis",
  "campus-linear-algebra-analytic-geometry",
  "campus-basic-physics",
];

test("the five campus courses share one normalized grade label", () => {
  for (const slug of scoped) {
    const book = getAllBooks().find((item) => item.slug === slug);
    assert.ok(book, slug);
    assert.deepEqual(studyPeriodLabel(book), { zh: "大一", en: "Year 1" }, slug);
  }
});

test("books outside the five-course scope keep their existing grade presentation", () => {
  const engineering = getAllBooks().find((item) => item.slug === "campus-engineering-drawing")!;
  const mit = getAllBooks().find((item) => item.slug === "mit-linear-algebra")!;
  assert.equal(studyPeriodLabel(engineering), undefined);
  assert.equal(studyPeriodLabel(mit), undefined);
});

test("semester suffixes collapse to the year label", () => {
  assert.deepEqual(studyPeriodLabel({ slug: "campus-cpp-programming", studyPeriod: "大一上" }), {
    zh: "大一",
    en: "Year 1",
  });
  assert.deepEqual(studyPeriodLabel({ slug: "campus-basic-physics", studyPeriod: "大一" }), {
    zh: "大一",
    en: "Year 1",
  });
  assert.deepEqual(studyPeriodLabel({ slug: "campus-basic-physics", studyPeriod: "大二下" }), {
    zh: "大二",
    en: "Year 2",
  });
  assert.equal(studyPeriodLabel({ slug: "campus-basic-physics" }), undefined);
});
