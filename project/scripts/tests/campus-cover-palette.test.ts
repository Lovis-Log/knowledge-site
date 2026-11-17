import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("../..", import.meta.url));
const css = readFileSync(join(root, "app/globals.css"), "utf8");
const coverComponent = readFileSync(join(root, "components/book-cover.tsx"), "utf8");
const contentRoot = join(root, "..", "Knowledge Site");

const CAMPUS_BOOKS = [
  { slug: "campus-cpp-programming", dir: "C++程序设计教程" },
  { slug: "campus-linear-algebra-analytic-geometry", dir: "线性代数与解析几何" },
  { slug: "campus-discrete-mathematics", dir: "离散数学" },
  { slug: "campus-mathematical-analysis", dir: "工科数学分析" },
];

function bookRule(slug: string): Record<string, string> {
  const pattern = new RegExp(`\\[data-book="${slug}"\\]\\s*\\{([^}]*)\\}`, "g");
  const matches = [...css.matchAll(pattern)];
  assert.equal(matches.length, 1, `${slug} needs its own explicit [data-book] rule`);
  const vars: Record<string, string> = {};
  for (const [, name, value] of matches[0][1].matchAll(/(--[\w-]+)\s*:\s*(#[\da-fA-F]{6})\s*;/g)) {
    vars[name] = value.toLowerCase();
  }
  return vars;
}

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255);
  const [r, g, b] = channels.map((value) =>
    value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

test("each campus course declares its own cloth palette", () => {
  const backgrounds = new Set<string>();
  for (const { slug } of CAMPUS_BOOKS) {
    const vars = bookRule(slug);
    for (const name of ["--cover-bg", "--cover-ink", "--cover-accent"]) {
      assert.match(vars[name] ?? "", /^#[\da-f]{6}$/, `${slug} ${name}`);
    }
    assert.ok(!backgrounds.has(vars["--cover-bg"]), `${slug} reuses another campus cover background`);
    backgrounds.add(vars["--cover-bg"]);
  }
});

test("campus cover titles keep at least 4.5:1 contrast", () => {
  for (const { slug } of CAMPUS_BOOKS) {
    const vars = bookRule(slug);
    const ratio = contrast(vars["--cover-bg"], vars["--cover-ink"]);
    assert.ok(ratio >= 4.5, `${slug} title contrast ${ratio.toFixed(2)} < 4.5`);
  }
});

test("campus linear algebra points at a raster v2 cover registered for thumbnails", () => {
  const entry = CAMPUS_BOOKS[1];
  const frontmatter = readFileSync(join(contentRoot, "校内课程", entry.dir, "_book.md"), "utf8");
  const cover = frontmatter.match(/^coverImage:\s*(\S+)$/m)?.[1] ?? "";
  assert.equal(cover, "/covers/editorial-campus-linear-algebra-analytic-geometry-v2.webp");
  assert.doesNotMatch(cover, /\.svg$/);
  assert.match(
    coverComponent,
    /"\/covers\/editorial-campus-linear-algebra-analytic-geometry-v2\.webp"/,
    "v2 cover must be listed in thumbSources",
  );
});
