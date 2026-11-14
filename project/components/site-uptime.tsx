"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { site } from '@/lib/site';
import { UiText } from './ui-text';

export function SiteUptime() {
  const [days, setDays] = useState<number | null>(null);
  const root = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    setDays(Math.max(0, Math.floor((Date.now() - Date.parse(site.launchedAt)) / 86_400_000)));
  }, []);
  useLayoutEffect(() => {
    if (days === null || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const animations = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-reel]') ?? [], (reel, index) =>
      reel.animate([{ transform: 'translateY(0)' }, { transform: `translateY(-${reel.dataset.reel}em)` }], {
        duration: 800 + index * 80, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards',
      }));
    return () => animations.forEach(animation => animation.cancel());
  }, [days]);

  return <span className="site-uptime" ref={root}>
    <UiText zh="网站运行时间" en="Site uptime" />
    <span className="site-uptime__number" aria-hidden="true">
      {String(days ?? 0).split('').map((digit, index) => {
        const steps = 20 + Number(digit);
        return <span className="site-uptime__digit" key={index}>
          <span className="site-uptime__reel" data-reel={steps} style={{ '--reel-steps': steps } as CSSProperties}>
            {Array.from({ length: steps + 1 }, (_, step) => <span key={step}>{step % 10}</span>)}
          </span>
        </span>;
      })}
    </span>
    <span className="reader-sr-only">{days ?? 0}</span>
    <UiText zh="天" en="days" />
  </span>;
}
