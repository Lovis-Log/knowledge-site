import type { CSSProperties } from 'react';
import { UiPair } from './ui-text';

function LoadingLetters({ text }: { text: string }) {
  return <span className="rocket-loader__letters">{Array.from(text).map((letter, index) =>
    <span key={index} style={{ '--letter': index } as CSSProperties}>{letter}</span>)}</span>;
}

/** Shared page and data loading state; CSS animates without timers or assets. */
export function RocketLoader({ compact = false }: { compact?: boolean }) {
  return <div className={`rocket-loader${compact ? ' rocket-loader--compact' : ''}`} role="status">
    <svg className="rocket-loader__sky" viewBox="0 0 280 88" aria-hidden="true" focusable="false">
      <g className="rocket-loader__trail" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round">
        <path d="M35 32h17M23 47h27M42 61h14" />
        <circle cx="67" cy="25" r="1.5" fill="var(--gold)" stroke="none" />
        <circle cx="65" cy="66" r="1" fill="var(--accent)" stroke="none" />
      </g>
      <g className="rocket-loader__ship">
        <g className="rocket-loader__exhaust">
          <path d="M120 35C104 35 104 41 77 44c27 3 27 9 43 9Z" fill="var(--gold)" />
          <path d="M120 39c-12 0-17 3-27 5 10 2 15 5 27 5Z" fill="var(--surface)" />
        </g>
        <g stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round">
          <path d="m134 31-19-8-4 16m23 18-19 8-4-16" fill="var(--gold)" />
          <path d="M117 32c26-6 46-5 66 12-20 17-40 18-66 12Z" fill="var(--page-sheet)" />
          <path d="M166 34c6 2 12 6 17 10-5 4-11 8-17 10Z" fill="var(--gold)" />
          <circle cx="145" cy="44" r="6" fill="var(--accent-soft)" />
          <path d="M116 36v16" strokeLinecap="round" />
        </g>
      </g>
    </svg>
    <div className="rocket-loader__caption">
      <UiPair zh={<LoadingLetters text="努力加载中" />} en={<LoadingLetters text="Loading" />} />
      <span className="rocket-loader__dots" aria-hidden="true"><i /><i /><i /></span>
    </div>
  </div>;
}
