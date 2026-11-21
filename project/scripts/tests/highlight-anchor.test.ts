import { test } from "node:test";
import assert from "node:assert/strict";

import { highlightAnchor, orderedRange, resolveHighlight } from "../../lib/highlight-anchor";

type FakeNode = { compareDocumentPosition(other: FakeNode): number };

function orderedPair() {
  const before: FakeNode = { compareDocumentPosition: (other) => (other === before ? 0 : 4) };
  const after: FakeNode = { compareDocumentPosition: (other) => (other === before ? 2 : 0) };
  return { before, after };
}

class FakeRange {
  constructor(
    public startContainer: FakeNode,
    public startOffset: number,
    public endContainer: FakeNode,
    public endOffset: number,
  ) {}
  get collapsed() { return this.startContainer === this.endContainer && this.startOffset === this.endOffset; }
  cloneRange() { return new FakeRange(this.startContainer, this.startOffset, this.endContainer, this.endOffset); }
  setStart(node: FakeNode, offset: number) { this.startContainer = node; this.startOffset = offset; }
  setEnd(node: FakeNode, offset: number) { this.endContainer = node; this.endOffset = offset; }
}

test("backward selections are read in document order", () => {
  const { before, after } = orderedPair();

  const same = new FakeRange(before, 12, before, 5);
  const ordered = orderedRange(same as unknown as Range) as unknown as FakeRange;
  assert.equal(ordered.startOffset, 5);
  assert.equal(ordered.endOffset, 12);

  const crossed = new FakeRange(after, 3, before, 8);
  const fixed = orderedRange(crossed as unknown as Range) as unknown as FakeRange;
  assert.equal(fixed.startContainer, before);
  assert.equal(fixed.startOffset, 8);
  assert.equal(fixed.endContainer, after);
  assert.equal(fixed.endOffset, 3);
});

test("a partial rendered-formula selection keeps a one-symbol anchor", () => {
  const text = "The force F = ma acts";
  const at = text.indexOf("ma");
  const mark = highlightAnchor("en", text, at, at + 1);
  assert.ok(mark);
  assert.equal(mark.quote, "m");
  assert.equal(mark.start, at);
  assert.equal(mark.prefix, "The force F = ");
  assert.equal(resolveHighlight(text, mark), at);
});

test("mixed text and rendered formula selections stay a single quote", () => {
  const text = "The value x2 + y2 is fixed";
  const from = text.indexOf("value");
  const to = text.indexOf(" is fixed");
  const mark = highlightAnchor("zh", text, from, to);
  assert.ok(mark);
  assert.equal(mark.quote, "value x2 + y2");
  assert.equal(resolveHighlight(text, mark), from);
});

test("repeated formula symbols resolve from their surrounding glyphs", () => {
  const text = "x1 + x2 + x3";
  const at = text.indexOf("x3");
  const mark = highlightAnchor("zh", text, at, at + 2);
  assert.ok(mark);
  assert.equal(mark.quote, "x3");
  assert.equal(resolveHighlight(text, mark), at);
  assert.equal(resolveHighlight("插入 " + text, mark), at + 3);
});

test("persisted whole-formula anchors still resolve against the formula index", () => {
  const boundary = String.fromCharCode(0xfffc);
  const text = `before ${boundary}x^2${boundary} after`;
  const anchor = { start: 7, quote: `${boundary}x^2${boundary}`, prefix: "before ", suffix: " after" };
  assert.equal(resolveHighlight(text, anchor), 7);
});

test("plain anchors saved beside a formula keep their marker context", () => {
  const boundary = String.fromCharCode(0xfffc);
  const text = `Text before ${boundary}x+y${boundary} after formula`;
  const at = text.indexOf("after formula");
  const mark = highlightAnchor("zh", text, at, at + "after formula".length);
  assert.ok(mark);
  assert.ok(mark.prefix.includes(boundary));
  assert.equal(resolveHighlight(text, mark), at);
});

test("anchor quotes trim surrounding whitespace without losing context", () => {
  const text = "alpha beta gamma";
  const mark = highlightAnchor("en", text, 5, 11);
  assert.ok(mark);
  assert.equal(mark.quote, "beta");
  assert.equal(mark.start, 6);
  assert.equal(mark.prefix, "alpha ");
  assert.equal(mark.suffix, " gamma");
});
