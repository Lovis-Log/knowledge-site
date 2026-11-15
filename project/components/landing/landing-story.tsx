"use client";

import { useEffect, useRef, useState } from "react";
import { UiText } from "@/components/ui-text";
import { landingCopy, landingScenes } from "./landing-copy";
import styles from "./landing-redesign.module.css";

function SceneImage({ index }: { index: number }) {
  const scene = landingScenes[index];
  return <img src={scene.image} width={scene.width} height={scene.height} decoding="async" alt={scene.alt.zh} suppressHydrationWarning data-ui-alt-zh={scene.alt.zh} data-ui-alt-en={scene.alt.en} />;
}

export function LandingStory({ paused }: { paused: boolean }) {
  const [enabled, setEnabled] = useState(false);
  const root = useRef<HTMLElement>(null);
  const initialAnchor = useRef<string | null>(null);
  const anchorRestored = useRef(false);

  function restoreInitialAnchor() {
    if (anchorRestored.current || initialAnchor.current === null) return;
    anchorRestored.current = true;
    if (!initialAnchor.current || location.hash !== initialAnchor.current) return;
    try { document.getElementById(decodeURIComponent(initialAnchor.current.slice(1)))?.scrollIntoView({ behavior: "instant" }); } catch { /* Ignore malformed fragment links. */ }
  }

  useEffect(() => {
    initialAnchor.current ??= location.hash;
    let live = true;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const spacious = matchMedia("(min-width: 761px) and (min-height: 650px), (max-width: 760px) and (min-height: 720px)");
    const update = () => {
      const next = !paused && !reduced.matches && spacious.matches;
      setEnabled(next);
      if (!next) void document.fonts.ready.then(() => { if (live) restoreInitialAnchor(); });
    };
    update();
    reduced.addEventListener("change", update);
    spacious.addEventListener("change", update);
    return () => { live = false; reduced.removeEventListener("change", update); spacious.removeEventListener("change", update); };
  }, [paused]);

  useEffect(() => {
    if (!enabled || !root.current) return;
    let live = true;
    let context: { revert: () => void } | undefined;
    let languageObserver: MutationObserver | undefined;
    const element = root.current;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (!live) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        const copies = gsap.utils.toArray<HTMLElement>(`[data-story-copy]`, element);
        const images = gsap.utils.toArray<HTMLElement>(`[data-story-image]`, element);
        const indicators = gsap.utils.toArray<HTMLElement>(`[data-story-indicator]`, element);
        gsap.set(copies.slice(1), { autoAlpha: 0, y: 22 });
        gsap.set(images.slice(1), { autoAlpha: 0, y: 28, scale: .98 });
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: element.querySelector(`.${styles.storyTrack}`), start: "top top", end: "bottom bottom", scrub: .8, invalidateOnRefresh: true },
        });
        // The frame stays still. Only its contents and the accompanying text move.
        for (let i = 0; i < 2; i++) {
          const at = .55 + i * 1.15;
          timeline.to(copies[i], { autoAlpha: 0, y: -18, duration: .23 }, at)
            .to(copies[i + 1], { autoAlpha: 1, y: 0, duration: .38, ease: "power2.out" }, at + .20)
            .to(images[i], { autoAlpha: 0, y: -12, scale: 1.01, duration: .48 }, at)
            .to(images[i + 1], { autoAlpha: 1, y: 0, scale: 1, duration: .62, ease: "power2.out" }, at + .04)
            .to(indicators[i], { backgroundColor: "#d3cbbb", duration: .25 }, at + .2)
            .to(indicators[i + 1], { backgroundColor: "#825d1d", duration: .25 }, at + .2);
        }
        timeline.to({}, { duration: .55 });
      }, element);
      languageObserver = new MutationObserver(() => ScrollTrigger.refresh());
      languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-ui-lang"] });
      void document.fonts.ready.then(() => {
        if (live) { ScrollTrigger.refresh(); restoreInitialAnchor(); }
      });
    }).catch(() => { if (live) setEnabled(false); });
    return () => { live = false; languageObserver?.disconnect(); context?.revert(); };
  }, [enabled]);

  return (
    <section ref={root} id="vault-preview" className={styles.story} data-animated={enabled} aria-labelledby="story-title">
      <div className={`${styles.storyIntro} ${styles.shell}`}>
        <h2 id="story-title"><UiText {...landingCopy.storyTitle} /></h2><p><UiText {...landingCopy.storyDescription} /></p>
      </div>
      {enabled ? <div className={styles.storyTrack}>
        <div className={`${styles.storyStage} ${styles.shell}`}>
          <div className={styles.storyTextStack}>
            {landingScenes.map((scene, i) => <div className={styles.storyCopy} data-story-copy key={scene.image}>
              <span className={styles.sceneName}><UiText {...scene.name} /></span>
              <h3><UiText {...scene.title} /></h3><p><UiText {...scene.description} /></p>
              <span className={styles.sceneDetail}><UiText {...scene.detail} /></span>
              <div className={styles.sceneProgress} aria-hidden="true">{landingScenes.map((s, j) => <i key={s.image} data-current={i === j} />)}</div>
            </div>)}
          </div>
          <figure className={styles.storyScreen}>
            <div className={styles.screenBar} aria-hidden="true"><span>LovisMind</span><span><UiText zh="阅读的几个片刻" en="A few moments in the library" /></span><span>↗</span></div>
            <div className={styles.screenImage}>{landingScenes.map((s, i) => <div data-story-image key={s.image}><SceneImage index={i} /></div>)}</div>
            <figcaption className={styles.screenCaption}><UiText zh="从当前书库截取" en="Captured from the current library" /></figcaption>
          </figure>
          <div className={styles.storyIndicators} aria-hidden="true">{landingScenes.map((s, i) => <i data-story-indicator data-current={i === 0} key={s.image} />)}</div>
        </div>
      </div> : <div className={`${styles.staticStory} ${styles.shell}`}>
        {landingScenes.map((scene, i) => <article className={styles.storyStep} key={scene.image}>
          <div className={styles.storyCopy}><span className={styles.sceneName}><UiText {...scene.name} /></span><h3><UiText {...scene.title} /></h3><p><UiText {...scene.description} /></p><span className={styles.sceneDetail}><UiText {...scene.detail} /></span></div>
          <figure className={styles.storyScreen}><div className={styles.screenImage}><SceneImage index={i} /></div></figure>
        </article>)}
      </div>}
    </section>
  );
}
