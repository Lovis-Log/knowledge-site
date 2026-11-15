"use client";

import { useCallback, useEffect, useState } from "react";
import { ReaderLink as Link } from "../navigation-feedback";
import { AccountIcon } from "@/components/account-icon";
import { UiLanguageToggle } from "@/components/ui-language-toggle";
import { UiText } from "@/components/ui-text";
import { api } from "@/lib/api";
import { uiLabel } from "@/lib/ui-language";
import { AuthModal, type AuthView } from "./auth-modal";
import { landingCopy as copy, landingVolumes } from "./landing-copy";
import { LandingStory } from "./landing-story";
import styles from "./landing-redesign.module.css";

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>;
}

export function LandingPage() {
  const [authView, setAuthView] = useState<AuthView | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const closeAuth = useCallback(() => setAuthView(null), []);

  useEffect(() => {
    try { setMotionPaused(localStorage.getItem("shufang:motion") === "paused"); } catch { /* Use the system motion preference. */ }
    let live = true;
    const refresh = () => {
      api<{ user: unknown | null }>("/api/auth/me")
        .then(({ user }) => { if (live) setSignedIn(Boolean(user)); })
        .catch(() => { /* Public content remains available without the API. */ });
    };
    refresh();
    const resume = (event: PageTransitionEvent) => { if (event.persisted) refresh(); };
    window.addEventListener("pageshow", resume);
    return () => { live = false; window.removeEventListener("pageshow", resume); };
  }, []);

  function toggleMotion() {
    setMotionPaused((current) => {
      const next = !current;
      try { localStorage.setItem("shufang:motion", next ? "paused" : "on"); } catch { /* Still works for this visit. */ }
      return next;
    });
  }

  function entrance(className: string) {
    return signedIn
      ? <Link href="/library/" className={className}><UiText {...copy.enter} /><Arrow /></Link>
      : <button type="button" className={className} onClick={() => setAuthView("login")}><UiText {...copy.enter} /><Arrow /></button>;
  }

  return (
    <div id="lovismind-landing" className={styles.landing} data-motion={motionPaused ? "paused" : "on"}>
      <header className={styles.header}>
        <div className={`${styles.shell} ${styles.headerInner}`}>
          <a href="#top" className={styles.brand} suppressHydrationWarning {...uiLabel("LovisMind 首页", "LovisMind home")}>
            <img src="/brand/lovismind-mark.png" width={36} height={36} alt="" /><span>LovisMind</span>
          </a>
          <nav className={styles.sectionNav} suppressHydrationWarning {...uiLabel("页面导航", "Page navigation")}>
            <a href="#vault-preview"><UiText zh="书库一瞥" en="Inside the library" /></a>
            <a href="#collections"><UiText zh="藏书" en="The collection" /></a>
            <a href="#reflection"><UiText zh="关于" en="The idea" /></a>
          </nav>
          <div className={styles.headerActions}>
            <UiLanguageToggle />
            {signedIn
              ? <Link href="/library/" className={styles.account}><AccountIcon /><UiText zh="书库" en="Library" /></Link>
              : <button type="button" className={styles.account} onClick={() => setAuthView("login")}><AccountIcon /><UiText zh="登录" en="Sign in" /></button>}
          </div>
        </div>
      </header>

      <section id="top" className={`${styles.hero} ${styles.shell}`} aria-labelledby="landing-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><UiText zh="一间私人的数字书房" en="A personal reading room" /></p>
          <div className={styles.heroWordmark} aria-hidden="true">LovisMind<span>.</span></div>
          <h1 id="landing-title"><UiText {...copy.heroTitle} /></h1>
          <p className={styles.heroDescription}><UiText {...copy.heroDescription} /></p>
          <div className={styles.actions}>
            {entrance(styles.primary)}
            {!signedIn && <button type="button" className={styles.textAction} onClick={() => setAuthView("register")}><UiText {...copy.join} /><Arrow /></button>}
          </div>
          <noscript><p><a href="/login/"><UiText zh="登录" en="Sign in" /></a> · <a href="/register/"><UiText zh="创建账号" en="Create account" /></a></p></noscript>
        </div>
        <div className={styles.heroArt} aria-hidden="true"><div className={styles.heroHalo} /><img src="/images/lovismind-cover.webp" width={1254} height={1254} alt="" fetchPriority="high" /></div>
        <div className={styles.heroFoot}><span><UiText zh="文字留痕，思绪成网。" en="Where readings linger and thoughts intertwine." /></span><a href="#vault-preview" suppressHydrationWarning {...uiLabel("查看书库预览", "Explore the library preview")}><Arrow /></a></div>
      </section>

      <LandingStory paused={motionPaused} />

      <section id="collections" className={`${styles.collection} ${styles.shell}`} aria-labelledby="collection-title">
        <div className={styles.collectionHeading}><h2 id="collection-title"><UiText {...copy.collectionTitle} /></h2><p><UiText {...copy.collectionDescription} /></p></div>
        <div className={styles.volumes}>
          {landingVolumes.map((volume) => (
            <figure className={styles.volume} key={volume.slug}>
              <div className={styles.coverWell}><img src={volume.cover} width={480} height={640} loading="lazy" decoding="async" alt="" /></div>
              <figcaption><h3><UiText {...volume.title} /></h3><p><UiText {...volume.description} /></p></figcaption>
            </figure>
          ))}
        </div>
        <a href="#entrance" className={styles.collectionLink}><UiText zh="到书库里，慢慢读。" en="Find your next read in the library." /><Arrow /></a>
      </section>

      <section id="reflection" className={styles.reflection} aria-labelledby="reflection-title">
        <div className={`${styles.shell} ${styles.reflectionInner}`}>
          <div className={styles.reflectionArt} aria-hidden="true"><img src="/images/preface-book-cutout-v1.webp" width={1536} height={1024} loading="lazy" decoding="async" alt="" /></div>
          <div className={styles.reflectionCopy}>
            <p className={styles.eyebrow}><UiText zh="关于这间书房" en="A note on this library" /></p>
            <h2 id="reflection-title"><UiText {...copy.reflectionTitle} /></h2>
            <p><UiText {...copy.reflectionDescription} /></p>
            <span className={styles.handwritten}><UiText zh="留着，下次再读。" en="Keep it. Come back to it." /></span>
          </div>
        </div>
      </section>

      <footer id="entrance" className={styles.entrance}>
        <div className={styles.shell}>
          <div className={styles.entranceTop}>
            <div><h2><UiText {...copy.closingTitle} /></h2><p><UiText {...copy.closingDescription} /></p></div>
            <div className={styles.actions}>
              {entrance(styles.goldButton)}
              {!signedIn && <button type="button" className={styles.lightAction} onClick={() => setAuthView("register")}><UiText {...copy.join} /><Arrow /></button>}
            </div>
          </div>
          <div className={styles.footerWordmark} aria-hidden="true">LovisMind<span>↗</span></div>
          <div className={styles.footerMeta}>
            <span>© 2026 LovisMind</span><a href="#top"><UiText zh="回到页首" en="Back to top" /> ↑</a>
            <button type="button" className={styles.motionToggle} aria-pressed={motionPaused} onClick={toggleMotion} suppressHydrationWarning {...uiLabel(motionPaused ? "开启动效" : "暂停动效", motionPaused ? "Turn motion on" : "Pause motion")}>
              <UiText zh={motionPaused ? "开启动效" : "暂停动效"} en={motionPaused ? "Motion on" : "Pause motion"} /><span aria-hidden="true">{motionPaused ? "▷" : "Ⅱ"}</span>
            </button>
          </div>
        </div>
      </footer>
      {authView && <AuthModal view={authView} onClose={closeAuth} />}
    </div>
  );
}
