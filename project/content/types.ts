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
  translation?: ChapterVersion;
  updatedAt: string;
  /** 原资源首发日期；缺省时取 sources 中最早的 publishedAt */
  publishedAt?: string;
  sources: Source[];
  contentType?: string;
  tags?: string[];
}

export interface BookLink {
  label: string;
  url: string;
  /** 该链接对应的章节号，目录页用来区分同一本书里的多个来源 */
  chapterNumber?: number;
}

export interface Book {
  slug: string;
  title: string;
  subtitle?: string;
  /** 卡片上的一句话简介 */
  description: string;
  /** 书本详情页的详细简介；缺省时回退到 description */
  longDescription?: string;
  /** 自备封面图，放在 public/covers/ 下；留空则用内置 SVG 主题封面 */
  coverImage?: string;
  category: string;
  updatedAt: string;
  /** 单一作者或机构；多来源合集留空 */
  author?: string;
  /** 原文 / 官方入口 */
  links?: BookLink[];
  /** 多来源汇编，卡片显示「多来源」 */
  collection?: boolean;
  /** 书本级内容类型，取 content_type */
  contentType?: string;
  chapters: Chapter[];
}
