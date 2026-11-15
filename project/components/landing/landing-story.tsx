"use client";

import { useEffect, useState } from "react";
import { UiText } from "@/components/ui-text";
import { landingCopy, landingScenes } from "./landing-copy";
import styles from "./landing-redesign.module.css";

export function LandingStory({ paused }: { paused: boolean }) {
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    // Unsupported browsers and no-JS exports show all three scenes in normal flow.
    setSupported(CSS.supports("animation-timeline", "view()"));
  }, []);

  return (
    <section id="vault-preview" className={styles.story} data-animated={supported && !paused} aria-labelledby="story-title">
      <div className={`${styles.storyIntro} ${styles.shell}`}><h2 id="story-title"><UiText {...landingCopy.storyTitle} /></h2></div>
      <div className={styles.storyTrack}>
        <div className={`${styles.storyStage} ${styles.shell}`}>
          {landingScenes.map((scene, index) => (
            <article className={`${styles.storyStep} ${styles[`step${index}`]}`} key={scene.image}>
              <div className={styles.storyCopy}>
                <span className={styles.sceneName}><UiText {...scene.name} /></span>
                <h3><UiText {...scene.title} /></h3><p><UiText {...scene.description} /></p>
                <div className={styles.sceneProgress} aria-hidden="true">{landingScenes.map((item, i) => <i key={item.image} data-current={i === index} />)}</div>
              </div>
              <figure className={styles.storyScreen}>
                <div className={styles.screenBar} aria-hidden="true"><span>LovisMind</span><span><UiText {...scene.name} /></span><span>↗</span></div>
                {/* The shared language toggle can translate attributes before this boundary hydrates. */}
                <div className={styles.screenImage}><img src={`/images/vault-preview/${scene.image}`} width={scene.width} height={scene.height} loading="lazy" decoding="async" alt={scene.alt.zh} suppressHydrationWarning data-ui-alt-zh={scene.alt.zh} data-ui-alt-en={scene.alt.en} /></div>
                <figcaption className={styles.screenCaption}><UiText zh="书库实景" en="From the library" /></figcaption>
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
