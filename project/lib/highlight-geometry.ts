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

const tableRow = ".mtable > [class^='col-align-'] > .vlist-t > .vlist-r > .vlist > span";
const leftFence = ":scope > .mopen:not(.nulldelimiter)";
const rightFence = ":scope > .mclose:not(.nulldelimiter)";

function matrixFrame(table: Element) {
  // KaTeX also uses .mtable for aligned equations and cases. In particular,
  // cases has a null right delimiter and keeps its independent rows.
  const fenced = table.closest(".minner");
  if (fenced?.querySelector(leftFence) && fenced.querySelector(rightFence)) return fenced;
  const centered = !table.querySelector(":scope > .col-align-l, :scope > .col-align-r");
  return centered && table.querySelector(":scope > .arraycolsep, :scope > .vertical-separator") ? table : null;
}

function coversMatrix(table: Element, selected: ReadonlyMap<Node, Range>) {
  const cells = document.createTreeWalker(table, NodeFilter.SHOW_TEXT);
  let hasText = false;
  for (let node = cells.nextNode(); node instanceof Text; node = cells.nextNode()) {
    if (!node.data.trim()) continue;
    const range = selected.get(node);
    if (!range || range.startOffset !== 0 || range.endOffset !== node.length) return false;
    hasText = true;
  }
  return hasText;
}

function measureMathBands(container: HTMLElement, fragments: readonly Range[]) {
  const area = container.getBoundingClientRect();
  if (!area.width || !area.height) return [];

  const matrices = new Map<Element, Element>();
  let hasMathRows = false;
  for (const table of container.querySelectorAll(".katex-html .mtable")) {
    const frame = matrixFrame(table);
    if (frame) matrices.set(table, frame);
    else hasMathRows = true;
  }
  const equationCenter = hasMathRows ? undefined : (area.top + area.bottom) / 2;
  const font = container.querySelector(".katex") ?? container;
  const size = Number.parseFloat(getComputedStyle(font).fontSize) || 16;

  const boxes: HighlightBox[] = [];
  const delimiters: HighlightBox[] = [];
  const compactBands: HighlightBand[] = [];
  const lineCenters = new Map<Element, number>();
  const addBox = (selected: HighlightBox[], rect: DOMRect, rowCenter?: number) => {
    if (rect.width > 0 && rect.height > 0) {
      const { top, left, right, bottom } = rect;
      selected.push({ top, left, right, bottom, size, rowCenter });
    }
  };
  if (matrices.size) {
    const selected = new Map(fragments.map((range) => [range.startContainer, range]));
    for (const [table, frame] of matrices) {
      if (!coversMatrix(table, selected)) continue;
      const outline = [table, frame.querySelector(leftFence), frame.querySelector(rightFence)];
      const target = hasMathRows ? [] : boxes;
      for (const part of outline) {
        if (part) addBox(target, part.getBoundingClientRect(), equationCenter ?? 0);
      }
      if (hasMathRows) compactBands.push(...groupHighlightBands(target));
    }
  }
  for (const range of fragments) {
    const parent = range.startContainer.parentElement;
    let row = hasMathRows ? parent?.closest(tableRow) : null;
    for (let table = row?.closest(".mtable"); table && matrices.has(table); table = row?.closest(".mtable")) {
      row = table.parentElement?.closest(tableRow);
    }
    const anchor = row?.querySelector(":scope > .pstrut");
    let rowCenter = equationCenter;
    if (anchor) {
      rowCenter = lineCenters.get(anchor);
      if (rowCenter === undefined) {
        // The KaTeX strut ends at the row baseline plus its descender offset.
        const offset = parseFloat(getComputedStyle(anchor).verticalAlign) || 0;
        rowCenter = anchor.getBoundingClientRect().bottom + offset - size * 0.34;
        lineCenters.set(anchor, rowCenter);
      }
    }

    const selected = hasMathRows && parent?.closest(".delimsizing.mult") ? delimiters : boxes;
    for (const rect of range.getClientRects()) addBox(selected, rect, rowCenter);
  }

  const bands = groupHighlightBands(boxes.length ? boxes : delimiters, hasMathRows ? Math.max(2, size * 0.15) : 0);
  if (!boxes.length || !delimiters.length) return [...bands, ...compactBands];

  // Pieces of a tall brace can extend a selected row, but cannot join two rows.
  const extended = bands.map((band) => {
    const y = band.top + band.height / 2;
    let left = band.left;
    let right = band.left + band.width;
    for (const piece of delimiters) {
      if (piece.top <= y && piece.bottom >= y) {
        left = Math.min(left, piece.left);
        right = Math.max(right, piece.right);
      }
    }
    return { ...band, left, width: right - left };
  });
  return [...extended, ...compactBands];
}

export type FormulaLayers = Map<HTMLElement, SVGSVGElement>;

const svgNamespace = "http://www.w3.org/2000/svg";

export function drawFormulaHighlights(layers: FormulaLayers, marks: readonly (readonly Range[])[]) {
  const formulas = new Map<HTMLElement, Range[][]>();
  for (const ranges of marks) {
    const byFormula = new Map<HTMLElement, Range[]>();
    for (const range of ranges) {
      const node = range.startContainer;
      const element = node instanceof Element ? node : node.parentElement;
      const formula = element?.closest<HTMLElement>(".katex-display");
      if (!formula) continue;
      if (!byFormula.has(formula)) byFormula.set(formula, []);
      const fragments = byFormula.get(formula)!;
      if (node instanceof Text) {
        fragments.push(range);
        continue;
      }
      // The historical whole-formula format selects all rendered glyphs.
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
      for (let glyph = walker.nextNode(); glyph instanceof Text; glyph = walker.nextNode()) {
        if (!glyph.data.trim() || glyph.parentElement?.closest(".vlist-s")) continue;
        const fragment = new Range();
        fragment.selectNodeContents(glyph);
        fragments.push(fragment);
      }
    }
    for (const [formula, fragments] of byFormula) {
      if (!formulas.has(formula)) formulas.set(formula, []);
      formulas.get(formula)!.push(fragments);
    }
  }
  const drawings = Array.from(formulas, ([formula, selections]) => {
    const bounds = formula.getBoundingClientRect();
    const x = formula.scrollLeft - bounds.left - formula.clientLeft;
    const y = formula.scrollTop - bounds.top - formula.clientTop;
    const path = selections.flatMap((fragments) => measureMathBands(formula, fragments)).map(({ left, top, width, height }) =>
      `M${left + x},${top + y}h${width}v${height}h${-width}Z`).join("");
    return { formula, path };
  });
  for (const [formula, layer] of layers) {
    if (formulas.has(formula)) continue;
    layer.remove();
    layers.delete(formula);
  }
  for (const { formula, path } of drawings) {
    let layer = layers.get(formula);
    if (!layer) {
      layer = document.createElementNS(svgNamespace, "svg");
      layer.classList.add("reading-math-highlight");
      layer.setAttribute("aria-hidden", "true");
      layer.append(document.createElementNS(svgNamespace, "path"));
      formula.prepend(layer);
      layers.set(formula, layer);
    }
    const shape = layer.firstElementChild!;
    if (shape.getAttribute("d") !== path) shape.setAttribute("d", path);
  }
}
