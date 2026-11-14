import { UiText } from "./ui-text";

// Reuse the navigation's line icons to identify each destination.
export function PageHeading({ kind, zh, en }: { kind: "about" | "submissions" | "guestbook"; zh: string; en: string }) {
  return <h1 className="destination-title">
    <span className="destination-title__icon" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {kind === "about" ? <><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-9v.5" /></>
          : kind === "submissions" ? <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>
          : <><path d="M4 4h16v12H8l-4 4V4Z" /><path d="M8 8h8M8 12h6" /></>}
      </svg>
    </span>
    <UiText zh={zh} en={en} />
  </h1>;
}
