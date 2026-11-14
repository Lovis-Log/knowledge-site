import { UiText } from "./ui-text";

type DestinationKind = "about" | "submissions" | "guestbook" | "settings" | "favorites";

// Shared line icons for page titles and their navigation entries.
export function DestinationIcon({ kind }: { kind: DestinationKind }) {
  return <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {kind === "about" ? <><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-9v.5" /></>
          : kind === "submissions" ? <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>
          : kind === "settings" ? <><path d="M4 6h16M4 12h16M4 18h16" /><circle cx="8" cy="6" r="2" fill="var(--paper)" /><circle cx="16" cy="12" r="2" fill="var(--paper)" /><circle cx="10" cy="18" r="2" fill="var(--paper)" /></>
          : kind === "favorites" ? <path d="M6 3h12v18l-6-4-6 4V3Z" />
          : <><path d="M4 4h16v12H8l-4 4V4Z" /><path d="M8 8h8M8 12h6" /></>}
      </svg>;
}

export function PageHeading({ kind, zh, en }: { kind: DestinationKind; zh: string; en: string }) {
  return <h1 className="destination-title">
    <span className="destination-title__icon" aria-hidden="true">
      <DestinationIcon kind={kind} />
    </span>
    <UiText zh={zh} en={en} />
  </h1>;
}
