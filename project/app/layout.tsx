import { NavigationFeedback } from "@/components/navigation-feedback";
import { UiText } from "@/components/ui-text";
import type { Metadata, Viewport } from "next";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";
import "./fonts/plus-jakarta-sans/font.css";
import "./globals.css";
import "./reader-refinements.css";
import "./campus-notes.css";
import "./theme.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
  ],
};

const bootstrap = `(function(){var d=document.documentElement;var l;try{l=localStorage.getItem("shufang:ui-lang-v2");}catch(e){}if(l!=="zh"&&l!=="en"){l="en";}d.dataset.uiLang=l;d.lang=l==="zh"?"zh-CN":"en";})();(function(){try{var d=document.documentElement;var l=localStorage.getItem("shufang:lang");if(l==="zh"||l==="en"){d.dataset.lang=l;}var f=localStorage.getItem("shufang:font-size");if(f==="sm"||f==="md"||f==="lg"){d.dataset.fontSize=f;}var t=localStorage.getItem("shufang:toc");if(t==="0"){d.dataset.toc="closed";}}catch(e){}})();`;

const themeBootstrap = `(function(){var d=document.documentElement;var t;try{t=localStorage.getItem("shufang:theme");}catch(e){}if(t!=="dark"&&t!=="light"){try{t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}catch(e){t="light";}}d.dataset.theme=t;d.style.colorScheme=t;})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const crumbs = {};
  return (
    <html
      lang="en"
      data-lang="zh"
      data-ui-lang="en"
      data-theme="light"
      data-font-size="md"
      data-scroll-behavior="smooth"
      data-toc="open"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      </head>
      <body>
        <div className="atmosphere" aria-hidden="true">
          <div className="atmosphere__grid" />
          <div className="atmosphere__glow" />
          <i className="atmosphere__blob atmosphere__blob--a" />
          <i className="atmosphere__blob atmosphere__blob--b" />
          <div className="atmosphere__noise" />
        </div>
        <a className="skip-link" href="#main">
          <UiText zh="跳到正文" />
        </a>
        <SiteHeader crumbs={crumbs} />
        <NavigationFeedback />
        <main id="main" className="site-main">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
