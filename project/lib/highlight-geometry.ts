/** Bounds of a selected text fragment. A nested glyph can inherit its line's center. */
export type HighlightBox = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  size: number;
  rowCenter?: number;
};

export type HighlightBand = { top: number; left: number; width: number; height: number };

/** Fraction rows sit ~0.7em apart, a superscript ~0.2em from its base. */
const rowRatio = 0.35;

/** Join selected fragments horizontally and optionally leave room between rows. */
export function groupHighlightBands(boxes: readonly HighlightBox[], rowGap = 0): HighlightBand[] {
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

  return rows.flatMap((row, index) => {
    const previous = rows[index - 1];
    const next = rows[index + 1];
    let top = Math.min(...row.boxes.map((box) => box.top));
    let bottom = Math.max(...row.boxes.map((box) => box.bottom));
    if (rowGap > 0) {
      if (previous) top = Math.max(top, (previous.center + row.center + rowGap) / 2);
      if (next) bottom = Math.min(bottom, (row.center + next.center - rowGap) / 2);
    }
    const left = Math.min(...row.boxes.map((box) => box.left));
    const right = Math.max(...row.boxes.map((box) => box.right));
    return bottom > top ? [{ top, left, width: right - left, height: bottom - top }] : [];
  });
}

function center(box: HighlightBox) {
  return box.rowCenter ?? (box.top + box.bottom) / 2;
}
