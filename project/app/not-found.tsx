import { UiText } from "@/components/ui-text";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell not-found">
      <p className="eyebrow">404</p>
      <h1 className="not-found__title"><UiText zh="这一页不在知识库里" /></h1>
      <p className="not-found__text"><UiText zh="链接可能已经改名，或者这一章还没有写。" /></p>
      <Link className="text-link" href="/">
        <UiText zh="返回书库 →" />
      </Link>
    </div>
  );
}
