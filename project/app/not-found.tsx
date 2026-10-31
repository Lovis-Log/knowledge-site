import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell not-found">
      <p className="eyebrow">404</p>
      <h1 className="not-found__title">这一页不在书房里</h1>
      <p className="not-found__text">链接可能已经改名，或者这一章还没有写。</p>
      <Link className="text-link" href="/">
        返回书库 →
      </Link>
    </div>
  );
}
