export type SourceKind = "video" | "blog" | "podcast" | "article";
export type Lang = "zh" | "en";

export interface Source {
  kind: SourceKind;
  title: string;
  url: string;
  author?: string;
  publishedAt?: string;
}

export interface ChapterVersion {
  title: string;
  summary?: string;
  body: string;
}

export interface Chapter {
  slug: string;
  number: number;
  versions: Partial<Record<Lang, ChapterVersion>>;
  updatedAt: string;
  sources: Source[];
}

export interface Book {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  updatedAt: string;
  chapters: Chapter[];
}
