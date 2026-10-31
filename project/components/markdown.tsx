import ReactMarkdown, { type Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import type { Lang } from "@/content/types";
import { ZoomImage } from "./zoom-image";

/**
 * 给标题 id 加语言前缀：双语章节两版正文同时在 DOM 中，
 * 不加前缀会出现重复锚点。
 */
function rehypeLangIds(options: { lang: string }) {
  return (tree: unknown) => {
    const prefix = `${options.lang}-`;
    const walk = (node: unknown) => {
      if (!node || typeof node !== "object") return;
      const element = node as {
        type?: string;
        tagName?: string;
        properties?: Record<string, unknown>;
        children?: unknown[];
      };
      if (
        element.type === "element" &&
        typeof element.tagName === "string" &&
        /^h[1-6]$/.test(element.tagName) &&
        element.properties &&
        typeof element.properties.id === "string"
      ) {
        element.properties.id = `${prefix}${element.properties.id}`;
      }
      if (Array.isArray(element.children)) element.children.forEach(walk);
    };
    walk(tree);
  };
}

const components: Options["components"] = {
  img: ({ node: _node, src, alt, title }) => (
    <ZoomImage src={typeof src === "string" ? src : undefined} alt={alt} title={title} />
  ),
  a: ({ node: _node, href, children, ...props }) => {
    const external = typeof href === "string" && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...props}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {children}
      </a>
    );
  },
  table: ({ node: _node, ...props }) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
};

export function Markdown({ markdown, lang }: { markdown: string; lang: Lang }) {
  const rehypePlugins: Options["rehypePlugins"] = [
    rehypeSlug,
    [rehypeLangIds, { lang }],
    [rehypeHighlight, { detect: false, ignoreMissing: true }],
    rehypeKatex,
  ];

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={rehypePlugins}
      components={components}
    >
      {markdown}
    </ReactMarkdown>
  );
}
