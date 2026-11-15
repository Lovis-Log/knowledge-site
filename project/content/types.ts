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

/** 书本目录里的分组，如「课程」「作业」；旧书不设置 */
export interface ChapterGroup {
  id: string;
  /** 章节页序号前缀与分组简称，如「课程」「作业」 */
  title: string;
  /** 书本目录中的分组标题，如「课程目录」「作业目录」 */
  heading: string;
}

export interface Chapter {
  slug: string;
  number: number;
  /** 目录与章节页展示的编号；缺省时用 number，作业等分组可独立编号 */
  displayNumber?: string;
  /** 所属分组 id，对应书籍 _book.md 的 groups；缺省时沿用单组目录 */
  group?: string;
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
  /** Localized presentation titles, delivered only with the protected catalog. */
  displayTitle?: { zh: string; en: string };
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
  /** 校内课程的学期/阶段，如「大一」；显示在目录行与章节顶部，旧书不设置 */
  studyPeriod?: string;
  /** 书本目录的分组顺序；不设置时按单组平铺 */
  groups?: ChapterGroup[];
  chapters: Chapter[];
}
