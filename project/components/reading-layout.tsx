import type { ReactNode } from "react";

interface ReadingLayoutProps {
  children: ReactNode;
  aside?: ReactNode;
}

export function ReadingLayout({ children, aside }: ReadingLayoutProps) {
  return (
    <div className={aside ? "reading-grid" : "reading-grid reading-grid--single"}>
      <div className="reading-main">{children}</div>
      {aside ? <aside className="toc-rail">{aside}</aside> : null}
    </div>
  );
}
