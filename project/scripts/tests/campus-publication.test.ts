import { test } from "node:test";
import assert from "node:assert/strict";
import {
  classifyLink,
  contrastRatio,
  extractMarkdownLinkTargets,
  isDocsPreviewUrl,
  isDriveFilePreviewUrl,
  isGoogleDownloadUrl,
  parseCoverPalettes,
  parseRegisteredCoverThumbnails,
  validateCampusPublication,
  type CampusBookSnapshot,
  type CampusChapterSnapshot,
  type CampusPublicationSnapshot,
} from "../verify-campus-publication";

interface Palette {
  bg: string;
  ink: string;
  accent: string;
}

const CAMPUS_SLUGS = [
  "campus-cpp-programming",
  "campus-linear-algebra-analytic-geometry",
  "campus-discrete-mathematics",
  "campus-mathematical-analysis",
];

const PALETTES: Record<string, Palette> = {
  "campus-cpp-programming": {
    bg: "#5b2b34",
    ink: "#f8ecd8",
    accent: "#e7c38d",
  },
  "campus-linear-algebra-analytic-geometry": {
    bg: "#23372e",
    ink: "#f2e7d2",
    accent: "#c9a468",
  },
  "campus-discrete-mathematics": {
    bg: "#8c4a2c",
    ink: "#f8ecd8",
    accent: "#e7c38d",
  },
  "campus-mathematical-analysis": {
    bg: "#1f2b45",
    ink: "#f2e8d5",
    accent: "#d3b073",
  },
};

function cssFor(palettes: Record<string, Palette>): string {
  return Object.entries(palettes)
    .map(
      ([slug, palette]) =>
        `[data-book="${slug}"] {\n  --cover-bg: ${palette.bg};\n  --cover-ink: ${palette.ink};\n  --cover-accent: ${palette.accent};\n}`,
    )
    .join("\n\n");
}

function covers(slugs = CAMPUS_SLUGS): string[] {
  return slugs.flatMap((slug) => [
    `/covers/${slug}.webp`,
    `/covers/${slug}-240.webp`,
    `/covers/${slug}-480.webp`,
  ]);
}

function driveFile(id: string): string {
  return `https://drive.google.com/file/d/${id}/view`;
}

function laChapters(): CampusChapterSnapshot[] {
  return Array.from({ length: 34 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      slug: `la-${number}`,
      sources: [{ url: driveFile(`laFile${number}`) }],
      bodies: [
        `正文配图 ![figure](/course-materials/campus-linear-algebra-analytic-geometry/figures/fig-${number}.jpg)`,
      ],
    };
  });
}

function makeBook(
  slug: string,
  overrides: Partial<CampusBookSnapshot> = {},
): CampusBookSnapshot {
  return {
    slug,
    category: "campus-courses",
    coverImage: `/covers/${slug}.webp`,
    links: [
      {
        label: "课程资料（Google Drive）",
        url: `https://drive.google.com/drive/folders/${slug.replaceAll("-", "")}`,
      },
    ],
    chapters: [
      {
        slug: "intro",
        sources: [{ url: driveFile(`${slug.replaceAll("-", "")}file`) }],
        bodies: [
          `![课程配图](/course-materials/${slug}/figures/diagram.png)`,
          "参考 [MIT OCW](https://ocw.mit.edu/courses/example/) 与 [官方文档](https://en.cppreference.com/w/cpp)。",
        ],
      },
    ],
    ...overrides,
  };
}

function validSnapshot(): CampusPublicationSnapshot {
  return {
    books: [
      makeBook("campus-cpp-programming"),
      makeBook("campus-linear-algebra-analytic-geometry", {
        chapters: laChapters(),
      }),
      makeBook("campus-discrete-mathematics"),
      makeBook("campus-mathematical-analysis"),
    ],
    css: cssFor(PALETTES),
    coverFiles: covers(),
    registeredThumbnails: [],
  };
}

function findBook(
  snapshot: CampusPublicationSnapshot,
  slug: string,
): CampusBookSnapshot {
  const book = snapshot.books.find((item) => item.slug === slug);
  assert.ok(book, `${slug} fixture exists`);
  return book;
}

test("a valid campus snapshot passes every structural check", () => {
  assert.deepEqual(validateCampusPublication(validSnapshot()), []);
});

test("SVG line drawings are rejected as campus covers", () => {
  const snapshot = validSnapshot();
  findBook(snapshot, "campus-linear-algebra-analytic-geometry").coverImage =
    "/covers/editorial-campus-linear-algebra-analytic-geometry-v1.svg";
  const issues = validateCampusPublication(snapshot);
  assert.ok(issues.some((issue) => issue.includes("SVG line drawing")));
});

test("raster covers must exist under public/covers", () => {
  const snapshot = validSnapshot();
  snapshot.coverFiles = snapshot.coverFiles.filter(
    (file) => file !== "/covers/campus-cpp-programming.webp",
  );
  const issues = validateCampusPublication(snapshot);
  assert.ok(
    issues.some((issue) =>
      issue.includes("cover file public/covers/campus-cpp-programming.webp"),
    ),
  );
});

test("registered responsive covers need both 240 and 480 variants", () => {
  const snapshot = validSnapshot();
  snapshot.registeredThumbnails = ["/covers/campus-cpp-programming.webp"];
  snapshot.coverFiles = snapshot.coverFiles.filter(
    (file) => file !== "/covers/campus-cpp-programming-480.webp",
  );
  assert.ok(
    validateCampusPublication(snapshot).some((issue) =>
      issue.includes("campus-cpp-programming-480.webp is registered but missing"),
    ),
  );

  // A half-published pair is caught even when the component allowlist is stale.
  const fallback = validSnapshot();
  fallback.coverFiles = fallback.coverFiles.filter(
    (file) => file !== "/covers/campus-discrete-mathematics-480.webp",
  );
  assert.ok(
    validateCampusPublication(fallback).some((issue) =>
      issue.includes(
        "campus-discrete-mathematics-480.webp is registered but missing",
      ),
    ),
  );
});

test("every campus book needs an explicit palette, and backgrounds stay distinct", () => {
  const missing = validSnapshot();
  const withoutDiscrete: Record<string, Palette> = { ...PALETTES };
  delete withoutDiscrete["campus-discrete-mathematics"];
  missing.css = cssFor(withoutDiscrete);
  assert.ok(
    validateCampusPublication(missing).some((issue) =>
      issue.includes(
        'add an explicit [data-book="campus-discrete-mathematics"] cover palette',
      ),
    ),
  );

  const duplicate = validSnapshot();
  duplicate.css = cssFor({
    ...PALETTES,
    "campus-mathematical-analysis": {
      ...PALETTES["campus-mathematical-analysis"],
      bg: PALETTES["campus-cpp-programming"].bg,
    },
  });
  assert.ok(
    validateCampusPublication(duplicate).some((issue) =>
      issue.includes("share the cover background"),
    ),
  );
});

test("cover text below the 4.5 contrast floor is rejected", () => {
  const snapshot = validSnapshot();
  snapshot.css = cssFor({
    ...PALETTES,
    "campus-cpp-programming": {
      bg: "#777777",
      ink: "#8a8a8a",
      accent: "#e7c38d",
    },
  });
  assert.ok(
    validateCampusPublication(snapshot).some((issue) =>
      issue.includes("--cover-ink/--cover-bg contrast"),
    ),
  );
});

test("every strict course chapter needs a normal Drive preview link", () => {
  const snapshot = validSnapshot();
  const chapter = findBook(
    snapshot,
    "campus-linear-algebra-analytic-geometry",
  ).chapters[5];
  chapter.sources = [{ url: "https://example.edu/slides/5.pdf" }];
  chapter.bodies = ["本章没有原始资料链接。"];
  assert.ok(
    validateCampusPublication(snapshot).some((issue) =>
      issue.includes(
        "campus-linear-algebra-analytic-geometry/la-06: missing Google Drive preview link",
      ),
    ),
  );
});

test("the strict course needs a book-level Drive course folder", () => {
  const snapshot = validSnapshot();
  findBook(snapshot, "campus-linear-algebra-analytic-geometry").links = [];
  assert.ok(
    validateCampusPublication(snapshot).some((issue) =>
      issue.includes("needs a Google Drive course-folder link"),
    ),
  );
});

test("Drive download endpoints are rejected in source and body links", () => {
  const snapshot = validSnapshot();
  const cpp = findBook(snapshot, "campus-cpp-programming");
  cpp.chapters[0].sources = [
    ...(cpp.chapters[0].sources ?? []),
    {
      url: "https://drive.google.com/uc?export=download&id=abc123",
    },
  ];
  assert.ok(
    validateCampusPublication(snapshot).some((issue) =>
      issue.includes("Google Drive download link is not a preview"),
    ),
  );
});

test("in-site lecture and homework downloads are rejected when originals exist", () => {
  const snapshot = validSnapshot();
  const cpp = findBook(snapshot, "campus-cpp-programming");
  cpp.chapters[0].sources = [
    ...(cpp.chapters[0].sources ?? []),
    {
      url: "/course-materials/campus-cpp-programming/lectures/chapter-1.pptx",
    },
  ];
  cpp.chapters[0].bodies = [
    "[作业原图](/site/course-materials/campus-cpp-programming/homework/1.jpg)",
  ];
  const issues = validateCampusPublication(snapshot);
  assert.ok(
    issues.some(
      (issue) =>
        issue.includes("in-site course-materials download") &&
        issue.includes("/lectures/"),
    ),
  );
  assert.ok(
    issues.some(
      (issue) =>
        issue.includes("in-site course-materials download") &&
        issue.includes("/homework/"),
    ),
  );
});

test("file URLs and machine paths are rejected anywhere", () => {
  const snapshot = validSnapshot();
  const cpp = findBook(snapshot, "campus-cpp-programming");
  cpp.chapters[0].sources = [
    ...(cpp.chapters[0].sources ?? []),
    { url: "file:///C:/Users/teacher/linear-algebra.pptx" },
  ];
  cpp.chapters[0].bodies = ["[本地课件](C:\\lectures\\linear-algebra.pptx)"];
  const issues = validateCampusPublication(snapshot);
  assert.equal(
    issues.filter((issue) => issue.includes("local machine path or file URL"))
      .length,
    2,
  );
});

test("body figures and ordinary external references are not misjudged", () => {
  assert.equal(
    classifyLink(
      "/course-materials/campus-cpp-programming/figures/flow.png",
    ),
    "figure",
  );
  assert.equal(
    classifyLink(
      "/site/course-materials/campus-cpp-programming/figures/flow.png",
    ),
    "figure",
  );
  assert.equal(classifyLink("https://ocw.mit.edu/courses/example/"), "external");
  assert.equal(
    classifyLink("https://en.cppreference.com/w/cpp/language/pointer"),
    "external",
  );

  const snapshot = validSnapshot();
  const cpp = findBook(snapshot, "campus-cpp-programming");
  cpp.chapters[0].bodies = [
    "![图](/course-materials/campus-cpp-programming/figures/flow.png)",
    "![站点图](/images/campus-cpp-programming/flow.png)",
    "[MIT OCW](https://ocw.mit.edu/courses/example/)",
    "[官方文档](https://en.cppreference.com/w/cpp/language/pointer)",
  ];
  assert.deepEqual(validateCampusPublication(snapshot), []);
});

test("Drive file and docs preview URLs are recognised; folder and uc links are not chapter previews", () => {
  assert.equal(
    isDriveFilePreviewUrl(
      "https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/view?usp=drivesdk",
    ),
    true,
  );
  assert.equal(
    isDocsPreviewUrl(
      "https://docs.google.com/presentation/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/preview",
    ),
    true,
  );
  assert.equal(
    isDriveFilePreviewUrl("https://drive.google.com/open?id=abc123"),
    false,
  );
  assert.equal(
    isDriveFilePreviewUrl("https://drive.google.com/uc?id=abc123&export=download"),
    false,
  );
  assert.equal(
    isGoogleDownloadUrl(
      "https://drive.google.com/file/d/abc123/view?confirm=t",
    ),
    true,
  );
});

test("link extraction handles angle-bracket targets and ignores code samples", () => {
  assert.deepEqual(
    extractMarkdownLinkTargets(
      '![x](</course-materials/a b/figures/x.jpg>) [y](https://example.com) `[z](C:\\notes)`',
    ),
    ["/course-materials/a b/figures/x.jpg", "https://example.com"],
  );
  assert.deepEqual(
    extractMarkdownLinkTargets(
      "示例：\n\n```cpp\npfun[i](x);\n```\n\n正文 [资料](https://example.com/slides)\n",
    ),
    ["https://example.com/slides"],
  );
});

test("palette and thumbnail registration parsing stay locked to the source", () => {
  const palettes = parseCoverPalettes(cssFor(PALETTES));
  assert.equal(
    palettes.get("campus-cpp-programming")?.bg,
    PALETTES["campus-cpp-programming"].bg,
  );
  assert.equal(
    palettes.get("campus-cpp-programming")?.ink,
    PALETTES["campus-cpp-programming"].ink,
  );
  assert.deepEqual(
    parseRegisteredCoverThumbnails(
      'const thumbSources = new Set([\n  "/covers/a.webp",\n  "/covers/b.webp",\n]);',
    ),
    ["/covers/a.webp", "/covers/b.webp"],
  );
});

test("contrast ratio uses the WCAG luminance formula", () => {
  assert.ok(Math.abs(contrastRatio("#000000", "#ffffff") - 21) < 0.01);
  assert.ok(Math.abs(contrastRatio("#ffffff", "#000000") - 21) < 0.01);
  assert.equal(Number.isFinite(contrastRatio("#23372e", "#f2e7d2")), true);
});