import { UiText } from "@/components/ui-text";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>{site.name} · <UiText zh="课程笔记与来源链接" /></p>
        <p className="site-footer__note"><UiText zh="正文为个人理解，引用请回到原始来源。" /></p>
      </div>
    </footer>
  );
}
