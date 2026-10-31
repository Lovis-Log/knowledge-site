import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
};

const bootstrap = `(function(){try{var d=document.documentElement;var l=localStorage.getItem("shufang:lang");if(l==="zh"||l==="en"){d.dataset.lang=l;d.lang=l==="zh"?"zh-CN":"en";}var f=localStorage.getItem("shufang:font-size");if(f==="sm"||f==="md"||f==="lg"){d.dataset.fontSize=f;}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" data-lang="zh" data-font-size="md">
      <body>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
        <a className="skip-link" href="#main">
          跳到正文
        </a>
        <SiteHeader />
        <main id="main" className="site-main">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
