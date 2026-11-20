export type ReadingProgressEntry = {
  book: string;
  chapter: string;
  resume: number;
  furthest: number;
  observedAt: number;
  lastReadAt: number;
};

export type HighlightView = "zh" | "en" | "translation";

export type ReadingHighlight = {
  id: string;
  view: HighlightView;
  start: number;
  quote: string;
  prefix: string;
  suffix: string;
};

export type ReadingState = {
  account: string;
  progress: ReadingProgressEntry[];
  highlights: ReadingHighlight[];
};
