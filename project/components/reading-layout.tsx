import type { ReactNode } from "react";

interface ReadingLayoutProps {
  children: ReactNode;
  aside?: ReactNode;
  progress?: ReactNode;
}

export function ReadingLayout({ children, aside, progress }: ReadingLayoutProps) {
  return (
    <div className={aside ? "reading-grid" : "reading-grid reading-grid--single"}>
      <div className="reading-main">{children}</div>
      {(aside || progress) && (
        <aside className="toc-rail">
          {progress}
          {aside && <div className="toc-rail__contents">{aside}</div>}
        </aside>
      )}
    </div>
  );
}
