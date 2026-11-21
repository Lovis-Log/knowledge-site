import { test } from "node:test";
import assert from "node:assert/strict";

import { groupHighlightBands } from "../../lib/highlight-geometry";

// Measured rects for `t = \sqrt{\frac{L}{g\sin\theta}}\ln\frac{L+\sqrt{L^2-l^2}}{l}`
// at 21.78px: the selection runs from `ln` to the end of the formula, so the
// numerator, `ln` and the denominator sit on three different math rows.
const ln = { top: 110.4, bottom: 134.4, left: 467.4, right: 484.4, size: 21.78 };
const numerator = [
  { top: 89.7, bottom: 120.7, left: 490.6, right: 502.4, size: 21.78 }, // L
  { top: 95.7, bottom: 119.7, left: 507.2, right: 519.5, size: 21.78 }, // +
  { top: 89.7, bottom: 120.7, left: 542.5, right: 554.3, size: 21.78 }, // L under the root
  { top: 94.4, bottom: 111.4, left: 554.3, right: 561.9, size: 15.25 }, // superscript 2
];
const denominator = { top: 119.3, bottom: 150.3, left: 542.1, right: 548.3, size: 21.78 };

function close(actual: number, expected: number) {
  assert.ok(Math.abs(actual - expected) < 0.01, `${actual} ≈ ${expected}`);
}

test("formula selection bands stay continuous per math row", () => {
  const bands = groupHighlightBands([ln, ...numerator, denominator]);

  // One band per row: numerator, baseline `ln`, denominator.
  assert.equal(bands.length, 3);
  assert.ok(bands.every((band) => band.height <= 31.01), "rows never merge into one tall block");

  const top = bands.find((band) => band.top === 89.7);
  const log = bands.find((band) => band.left === 467.4);
  const bottom = bands.find((band) => band.top === 119.3);
  assert.ok(top && log && bottom);

  // The numerator band bridges KaTeX's spacing and reaches the superscript
  // instead of leaving a strip per glyph.
  close(top.left, 490.6);
  close(top.width, 71.3);
  close(top.height, 31);
  close(log.width, 17);
  close(log.height, 24);
  close(bottom.left, 542.1);
  close(bottom.width, 6.2);
  close(bottom.height, 31);

  // A single selected symbol keeps the exact selected bounds.
  const [glyph] = groupHighlightBands([{ top: 10, bottom: 34, left: 5, right: 11.2, size: 21.78 }]);
  assert.equal(glyph.top, 10);
  assert.equal(glyph.left, 5);
  assert.equal(glyph.height, 24);
  close(glyph.width, 6.2);

  // Zero-width fragments (KaTeX's hidden spacing) never become bands.
  assert.deepEqual(groupHighlightBands([{ top: 10, bottom: 34, left: 5, right: 5, size: 21.78 }]), []);
});
