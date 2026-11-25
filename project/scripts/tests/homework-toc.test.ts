import { test } from "node:test";
import assert from "node:assert/strict";
import { getAllBooks } from "../../content/index";
import {
  dropHomeworkTopicComments,
  isHomeworkTopicComment,
  parseHomeworkTopic,
} from "../../lib/homework-topic";
import { buildHomeworkToc, buildToc } from "../../lib/toc";

function anchorsOf(markdown: string): Map<string, string> {
  return new Map(buildToc(markdown, "zh").map((item) => [item.text, item.id]));
}

function stripTopics(markdown: string): string {
  return markdown.replace(/^\s*<!--\s*homework-topic\s*[:：].*?-->\s*$/gm, "");
}

test("math homework outlines show each topic at its original question anchor", () => {
  const book = getAllBooks().find((item) => item.slug === "campus-mathematical-analysis")!;
  const homework = book.chapters.filter((chapter) => chapter.group === "homework" && chapter.slug !== "31-classroom-quiz");
  assert.equal(homework.length, 8);
  for (const chapter of homework) {
    const body = chapter.versions.zh!.body;
    const originalIds = new Set(buildToc(body, "zh").map((item) => item.id));
    const items = buildHomeworkToc(body, "zh");
    assert.ok(items.length > 0, chapter.slug);
    assert.deepEqual(items.map((item) => item.text.split(" · ")[0]), items.map((_, index) => `题目 ${index + 1}`));
    assert.ok(items.every((item) => item.depth === 2 && originalIds.has(item.id)));
    assert.ok(items.every((item) => / · .+/.test(item.text)));
  }
  assert.equal(buildHomeworkToc(homework[0].versions.zh!.body, "zh").length, 10);
  assert.equal(buildHomeworkToc(homework[1].versions.zh!.body, "zh").length, 5);
  assert.equal(buildHomeworkToc(homework[2].versions.zh!.body, "zh").length, 9);
  assert.equal(buildHomeworkToc(homework[6].versions.zh!.body, "zh").length, 15);
  assert.equal(buildHomeworkToc(homework[7].versions.zh!.body, "zh").length, 7);

  const quiz = book.chapters.find((chapter) => chapter.slug === "31-classroom-quiz")!;
  assert.equal(quiz.group, "homework");
  const quizOutline = buildHomeworkToc(quiz.versions.zh!.body, "zh");
  assert.deepEqual(quizOutline.filter((item) => item.depth === 2).map((item) => item.text), ["一、填空题", "二、计算与证明"]);
  assert.equal(quizOutline.filter((item) => item.depth === 3 && / · .+/.test(item.text)).length, 9);
});

test("linear algebra homework outlines keep the original numbering and include topics", () => {
  const book = getAllBooks().find((item) => item.slug === "campus-linear-algebra-analytic-geometry")!;
  const homework = book.chapters.filter((chapter) => chapter.group === "homework");
  assert.equal(homework.length, 9);
  const labels: string[][] = [];
  for (const chapter of homework) {
    const body = chapter.versions.zh!.body;
    const originalIds = new Set(buildToc(body, "zh").map((item) => item.id));
    const items = buildHomeworkToc(body, "zh");
    assert.ok(items.length > 0, chapter.slug);
    assert.ok(items.every((item) => item.depth === 2 && originalIds.has(item.id)));
    assert.ok(items.every((item) => /^题目 \d+(（\d+）)? · .+/.test(item.text)), chapter.slug);
    labels.push(items.map((item) => item.text.split(" · ")[0]));
  }
  assert.deepEqual(labels[0], ["题目 1", "题目 2", "题目 3", "题目 5", "题目 6", "题目 10"]);
  assert.deepEqual(labels[1], ["题目 11", "题目 12", "题目 14", "题目 18", "题目 20"]);
  assert.deepEqual(labels[2], ["题目 1（5）", "题目 3（1）", "题目 4", "题目 6", "题目 9", "题目 11", "题目 14（1）", "题目 20"]);
  assert.deepEqual(labels[4].slice(5, 7), ["题目 27（1）", "题目 27（3）"]);
  assert.deepEqual(labels[7], ["题目 1（2）", "题目 1（4）", "题目 2（1）", "题目 3", "题目 5", "题目 10", "题目 11"]);
  assert.deepEqual(labels[8], ["题目 14（1）", "题目 14（3）", "题目 15", "题目 17", "题目 19", "题目 21（1）", "题目 21（2）", "题目 23"]);
  for (const chapterLabels of labels) {
    assert.equal(new Set(chapterLabels).size, chapterLabels.length, "question labels stay unique");
  }
});

test("ordinary course outlines retain their detailed headings", () => {
  const book = getAllBooks().find((item) => item.slug === "campus-mathematical-analysis")!;
  const lecture = book.chapters.find((chapter) => chapter.number === 15)!;
  const items = buildToc(lecture.versions.zh!.body, "zh");
  assert.ok(items.some((item) => item.depth === 3));
  assert.ok(items.some((item) => item.text.includes("证明")));
});

test("C++ OJ outlines retain all lettered questions and their anchors", () => {
  const book = getAllBooks().find((item) => item.slug === "campus-cpp-programming")!;
  const homework = book.chapters.filter((chapter) => chapter.group === "homework");
  assert.equal(homework.length, 9);

  const counts = [6, 8, 6, 7, 6, 10, 10, 6, 6];
  const chapterAnchors = new Map<string, Set<string>>();
  for (const [index, chapter] of homework.entries()) {
    const body = chapter.versions.zh!.body;
    const items = buildHomeworkToc(body, "zh");
    const letters = "ABCDEFGHIJ".slice(0, counts[index]).split("");
    assert.deepEqual(items.map((item) => item.text.split(" · ")[0]), letters, chapter.slug);
    assert.ok(items.every((item) => / · .+/.test(item.text)), chapter.slug);
    const ids = items.map((item) => item.id);
    assert.deepEqual(ids, letters.map((letter) => "zh-" + letter.toLowerCase()));
    chapterAnchors.set(chapter.slug, new Set(ids));
    assert.equal(chapter.sources.length, 1);
    assert.match(chapter.sources[0].url, /^https:\/\/drive\.google\.com\/drive\/folders\/[\w-]+$/);
    const questions = body.split(/^## [A-Z]\r?$/m).slice(1);
    assert.equal(questions.length, letters.length, chapter.slug);
    for (const [questionIndex, question] of questions.entries()) {
      assert.match(question, /^> \*\*题目\*\*　\*\*.+\*\*\r?\n>\r?\n> \S/m, chapter.slug);
      assert.match(question, /\]\(https:\/\/drive\.google\.com\/file\/d\/[\w-]+\/view(?:\?[^)]*)?\)/, chapter.slug);
      assert.match(
        question,
        /\*\*原始代码\*\*\s*\x60{3}cpp\r?\n[\s\S]*?\bmain\s*\([\s\S]*?\x60{3}/,
        chapter.slug + " question " + letters[questionIndex],
      );
    }
    assert.match(body, /\*\*来源\*\*　课后作业/);
  }

  for (const chapter of homework) {
    const body = chapter.versions.zh!.body;
    for (const [, slug, anchor] of body.matchAll(/\/books\/campus-cpp-programming\/([^/]+)\/#([^)\s]+)/g)) {
      assert.ok(chapterAnchors.get(slug)?.has(anchor), chapter.slug + " links to " + slug + "#" + anchor);
    }
  }
});

test("physics homework groups questions with topics and retains every body anchor", () => {
  const book = getAllBooks().find((item) => item.slug === "campus-basic-physics")!;
  const homework = book.chapters.filter((chapter) => chapter.group === "homework");
  assert.equal(homework.length, 9);

  const counts = [15, 8, 12, 9, 17, 16, 14, 15, 15];
  for (const [index, chapter] of homework.entries()) {
    const body = chapter.versions.zh!.body;
    const originalIds = new Set(buildToc(body, "zh").map((item) => item.id));
    const items = buildHomeworkToc(body, "zh");
    const groups = items.filter((item) => item.depth === 2);
    assert.ok(groups.length > 0 && groups.every((item) => /^[一二三四五六七]、/.test(item.text)), chapter.slug);
    const questions = items.filter((item) => item.depth === 3);
    assert.equal(questions.length, counts[index], chapter.slug);
    assert.ok(questions.every((item) => / · .+/.test(item.text)), chapter.slug);
    assert.deepEqual(
      questions.map((item) => item.text.split(" · ")[0]),
      questions.map((_, index) => `题目 ${index + 1}`),
      chapter.slug,
    );
    assert.ok(items.every((item) => originalIds.has(item.id)), chapter.slug);
  }
});

test("homework topics attach to existing heading anchors, not new slugs", () => {
  const markdown = [
    "## 题目 1",
    "<!-- homework-topic: 上确界与下确界 -->",
    "",
    "### 解",
    "",
    "略。",
    "",
    "## 第 2 题",
    "",
    "<!-- homework-topic：复合函数与迭代 -->",
    "",
    "### (1)",
    "",
    "略。",
  ].join("\n");
  const items = buildHomeworkToc(markdown, "zh");

  assert.deepEqual(items.map((item) => item.text), [
    "题目 1 · 上确界与下确界",
    "题目 2 · 复合函数与迭代",
  ]);
  assert.ok(items.every((item) => item.depth === 2));

  const anchors = anchorsOf(markdown);
  assert.deepEqual(items.map((item) => item.id), [anchors.get("题目 1"), anchors.get("第 2 题")]);
  assert.deepEqual(
    buildToc(markdown, "zh").map((item) => item.id),
    buildToc(stripTopics(markdown), "zh").map((item) => item.id),
    "topic comments do not shift heading slugs",
  );
});

test("grouped physics outlines keep type headings and list each question below them", () => {
  const markdown = [
    "## 选择题",
    "",
    "### 题目 1 质点运动",
    "<!-- homework-topic: 加速度方向 -->",
    "",
    "**答案：C**",
    "",
    "### 解",
    "",
    "略。",
    "",
    "### 第 2 题",
    "",
    "<!-- homework-topic: 位移与路程 -->",
    "",
    "## 填空题",
    "### 3. 单位换算",
    "<!-- homework-topic：量纲与单位 -->",
    "",
    "## 本章要点",
    "",
    "这里没有编号题目。",
    "",
    "## 解",
    "### 4. 不应进入目录",
  ].join("\n");
  const items = buildHomeworkToc(markdown, "zh");

  assert.deepEqual(items.map((item) => [item.text, item.depth]), [
    ["选择题", 2],
    ["题目 1 · 加速度方向", 3],
    ["题目 2 · 位移与路程", 3],
    ["填空题", 2],
    ["题目 3 · 量纲与单位", 3],
  ]);
  assert.ok(!items.some((item) => item.text === "解"), "solution substeps stay out");
  assert.ok(!items.some((item) => item.text === "本章要点"), "headings without questions stay out");
  assert.ok(!items.some((item) => item.text === "题目 4"), "solution sections never become groups");

  const anchors = anchorsOf(markdown);
  assert.deepEqual(items.map((item) => item.id), [
    anchors.get("选择题"),
    anchors.get("题目 1 质点运动"),
    anchors.get("第 2 题"),
    anchors.get("填空题"),
    anchors.get("3. 单位换算"),
  ]);
});

test("lettered homework topics keep the C++ letter anchors", () => {
  const markdown = [
    "## A",
    "<!-- homework-topic: 两数之和 -->",
    "",
    "## B",
    "",
    "## 待确认清单",
  ].join("\n");
  const items = buildHomeworkToc(markdown, "zh");

  assert.deepEqual(items.map((item) => item.text), ["A · 两数之和", "B"]);
  assert.deepEqual(items.map((item) => item.id), ["zh-a", "zh-b"]);
  assert.ok(!items.some((item) => item.text.includes("待确认")));
});

test("homework topic comments share one parser for the TOC and prose cleanup", () => {
  assert.equal(parseHomeworkTopic("<!-- homework-topic: 求数列极限 -->"), "求数列极限");
  assert.equal(parseHomeworkTopic("<!-- homework-topic：求数列极限 -->"), "求数列极限");
  assert.equal(parseHomeworkTopic("<!-- homework-topic:   -->"), undefined);
  assert.equal(parseHomeworkTopic("<!-- note -->"), undefined);
  assert.equal(isHomeworkTopicComment("<!-- homework-topic: 求数列极限 -->"), true);
  assert.equal(isHomeworkTopicComment("<!-- note -->"), false);
});

test("topic comments are removed before the prose renders", () => {
  const tree = {
    type: "root",
    children: [
      { type: "element", tagName: "h2", children: [{ type: "text", value: "题目 1" }] },
      { type: "raw", value: "<!-- homework-topic: 求数列极限 -->" },
      { type: "element", tagName: "p", children: [{ type: "text", value: "正文" }] },
    ],
  };
  dropHomeworkTopicComments(tree);
  assert.deepEqual(tree.children.map((node) => node.type), ["element", "element"]);
  assert.equal((tree.children[0] as { children: { value?: string }[] }).children[0].value, "题目 1");
});
