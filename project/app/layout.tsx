import { UiText } from "@/components/ui-text";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
};

const bootstrap = `(function(){var d=document.documentElement;var l;try{l=localStorage.getItem("shufang:ui-lang");}catch(e){}if(l!=="zh"&&l!=="en"){l=/^zh(?:-|$)/i.test(navigator.languages?.[0]||navigator.language||"en")?"zh":"en";}d.dataset.uiLang=l;d.lang=l==="zh"?"zh-CN":"en";})();(function(){try{var d=document.documentElement;var l=localStorage.getItem("shufang:lang");if(l==="zh"||l==="en"){d.dataset.lang=l;}var f=localStorage.getItem("shufang:font-size");if(f==="sm"||f==="md"||f==="lg"){d.dataset.fontSize=f;}var t=localStorage.getItem("shufang:toc");if(t==="0"){d.dataset.toc="closed";}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const crumbs = {};
  return (
    <html
      lang="zh-CN"
      data-lang="zh"
      data-ui-lang="zh"
      data-font-size="md"
      data-toc="open"
      className={jakarta.variable}
      suppressHydrationWarning
    >
      <body>
        <div className="atmosphere" aria-hidden="true">
          <div className="atmosphere__grid" />
          <div className="atmosphere__glow" />
          <i className="atmosphere__blob atmosphere__blob--a" />
          <i className="atmosphere__blob atmosphere__blob--b" />
          <div className="atmosphere__noise" />
        </div>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
        <a className="skip-link" href="#main">
          <UiText zh="跳到正文" />
        </a>
        <SiteHeader crumbs={crumbs} />
        <main id="main" className="site-main">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
