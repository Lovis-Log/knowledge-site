/**
 * One visible piece of a selected formula glyph: a text fragment's client rect
 * plus the font size of its formula, which tells rows apart inside a fraction.
 */
export type HighlightBox = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  size: number;
};

export type HighlightBand = { top: number; left: number; width: number; height: number };

/** Fraction rows sit ~0.7em apart, a superscript ~0.2em from its base. */
const rowRatio = 0.35;

/**
 * Turns the glyph boxes of a selection into continuous bands.
 *
 * KaTeX lays every symbol out as its own inline block: a selection returns one
 * rect per fragment, with gaps where its invisible spacing sits and with the
 * numerator and denominator of a fraction at different heights. Painting those
 * rects one by one produces the disconnected strips. Grouping them into math
 * rows and merging each row keeps the highlight on the selected glyphs while
 * staying visually continuous; a partial selection still starts and ends at the
 * selected symbols instead of growing to the whole formula.
 */
export function groupHighlightBands(boxes: readonly HighlightBox[]): HighlightBand[] {
  const ordered = boxes
    .filter((box) => box.right > box.left && box.bottom > box.top && box.size > 0)
    .sort((first, second) => center(first) - center(second));

  const rows: { center: number; size: number; boxes: HighlightBox[] }[] = [];
  for (const box of ordered) {
    const middle = center(box);
    let row: (typeof rows)[number] | undefined;
    let nearest = Infinity;
    for (const candidate of rows) {
      const distance = Math.abs(candidate.center - middle);
      if (distance <= rowRatio * Math.max(box.size, candidate.size) && distance < nearest) {
        nearest = distance;
        row = candidate;
      }
    }
    if (row) {
      row.boxes.push(box);
      row.size = Math.max(row.size, box.size);
    } else {
      rows.push({ center: middle, size: box.size, boxes: [box] });
    }
  }

  return rows.map((row) => {
    const top = Math.min(...row.boxes.map((box) => box.top));
    const bottom = Math.max(...row.boxes.map((box) => box.bottom));
    const left = Math.min(...row.boxes.map((box) => box.left));
    const right = Math.max(...row.boxes.map((box) => box.right));
    return { top, left, width: right - left, height: bottom - top };
  });
}

function center(box: HighlightBox) {
  return (box.top + box.bottom) / 2;
}
