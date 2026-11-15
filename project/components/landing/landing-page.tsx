"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ReaderLink as Link } from "../navigation-feedback";
import { AccountIcon } from "@/components/account-icon";
import { UiLanguageToggle } from "@/components/ui-language-toggle";
import { UiText } from "@/components/ui-text";
import { api } from "@/lib/api";
import { uiLabel } from "@/lib/ui-language";
import { AuthModal, type AuthView } from "./auth-modal";
import { landingCopy as copy, landingFeatures, landingQuestions, landingVolumes } from "./landing-copy";
import { landingAssets } from "@/lib/landing-assets";
import { LandingStory } from "./landing-story";
import styles from "./landing-redesign.module.css";

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>;
}

export function LandingPage() {
  const [authView, setAuthView] = useState<AuthView | null>(null);
  const [authNext, setAuthNext] = useState<string | undefined>(undefined);
  const [signedIn, setSignedIn] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const closeAuth = useCallback(() => { setAuthView(null); setAuthNext(undefined); }, []);
  const openAuth = useCallback((view: AuthView, next?: string) => { setAuthNext(next); setAuthView(view); }, []);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The shared header translates DOM attributes before this page hydrates.
    setHydrated(true);
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

  useEffect(() => {
    const items = [...(root.current?.querySelectorAll<HTMLElement>("[data-landing-reveal]") ?? [])];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let live = true;
    let observer: IntersectionObserver | undefined;
    function setup() {
      observer?.disconnect();
      items.forEach((item) => { item.dataset.landingReveal = "visible"; });
      if (motionPaused || reduced.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target as HTMLElement;
          observer?.unobserve(item);
          void Promise.all([...item.querySelectorAll("img")].map((image) => image.decode().catch(() => {}))).then(() => {
            if (live) item.dataset.landingReveal = "visible";
          });
        });
      }, { threshold: .14 });
      items.forEach((item) => {
        if (item.getBoundingClientRect().top > innerHeight * .95) item.dataset.landingReveal = "pending";
        observer?.observe(item);
      });
    }
    setup();
    reduced.addEventListener("change", setup);
    return () => { live = false; observer?.disconnect(); reduced.removeEventListener("change", setup); };
  }, [motionPaused]);

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
      : <button type="button" className={className} onClick={() => openAuth("login")}><UiText {...copy.enter} /><Arrow /></button>;
  }

  return (
    <div ref={root} id="lovismind-landing" className={styles.landing} data-motion={motionPaused ? "paused" : "on"} data-intro={hydrated ? "ready" : undefined}>
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
            <div className={styles.languageSlot}>{hydrated && <UiLanguageToggle />}</div>
            {signedIn
              ? <Link href="/library/" className={styles.account}><AccountIcon /><UiText zh="书库" en="Library" /></Link>
              : <button type="button" className={styles.account} onClick={() => openAuth("login")}><AccountIcon /><UiText zh="登录" en="Sign in" /></button>}
          </div>
        </div>
      </header>

      <section id="top" className={`${styles.hero} ${styles.shell}`} aria-labelledby="landing-title">
        <div className={styles.heroCopy}>
          <h1 id="landing-title"><span className={styles.heroLine} data-landing-entry><UiText {...copy.heroTitle} /></span><span className={`${styles.heroLine} ${styles.heroAccent}`} data-landing-entry style={{ animationDelay: "90ms" }}><UiText {...copy.heroAccent} /></span></h1>
          <p className={styles.heroDescription} data-landing-entry style={{ animationDelay: "160ms" }}><UiText {...copy.heroDescription} /></p>
          <div className={styles.actions} data-landing-entry style={{ animationDelay: "220ms" }}>
            {entrance(styles.primary)}
          </div>
          <noscript><p><a href="/login/"><UiText zh="登录" en="Sign in" /></a> · <a href="/register/"><UiText zh="创建账号" en="Create account" /></a></p></noscript>
        </div>
        <div className={styles.heroArt} aria-hidden="true">
          <div className={styles.heroStageNote}><UiText zh="阅读留下的痕迹，都在这里。" en="A few things worth coming back to." /></div>
          <div className={styles.heroDesktopLayer} data-landing-entry style={{ animationDelay: "280ms" }}><img src={landingAssets.desktop} width={1600} height={652} alt="" fetchPriority="high" /></div>
          <div className={styles.heroMobileLayer} data-landing-entry style={{ animationDelay: "390ms" }}><img src={landingAssets.mobile} width={560} height={1260} alt="" /></div>
          <div className={styles.heroResumeLayer} data-landing-entry style={{ animationDelay: "500ms" }}><img src={landingAssets.resume} width={1000} height={292} alt="" /></div>
        </div>
      </section>

      <LandingStory paused={motionPaused} />

      <section id="reading-features" className={`${styles.features} ${styles.shell}`} aria-labelledby="features-title">
        <div className={`${styles.featureCopy} ${styles.reveal}`} data-landing-reveal="visible">
          <h2 id="features-title"><UiText zh="让阅读，" en="Your reading." /><br /><span><UiText zh="顺着你的节奏。" en="At your own pace." /></span></h2>
          <p><UiText zh="不必一次读完。留下读到的位置，选择合适的字号，再从目录回到想看的那一节。" en="You don’t have to finish in one sitting. Keep your place, choose a comfortable view, and return to the passage you want to read." /></p>
          <a href="#collections" className={styles.featureLink}><UiText zh="看看书架上有什么" en="Find your next read" /><Arrow /></a>
        </div>
        <div className={styles.featureWorkbench}>
          <div className={styles.featureWorkbenchHead}><UiText zh="阅读里的一些便利" en="A little room to settle in" /></div>
          <ul>{landingFeatures.map((item, index) => <li key={item.title.en} className={styles.reveal} data-landing-reveal="visible" style={{ transitionDelay: `${index * 75}ms` }}><span className={styles.featureSymbol} aria-hidden="true">{index === 2 ? "↗" : "✓"}</span><div><h3><UiText {...item.title} /></h3><p><UiText {...item.description} /></p></div><span className={styles.featureNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></li>)}</ul>
        </div>
      </section>

      <section id="collections" className={`${styles.collection} ${styles.shell}`} aria-labelledby="collection-title">
        <div className={styles.collectionHeading}><h2 id="collection-title"><UiText {...copy.collectionTitle} /></h2><p><UiText {...copy.collectionDescription} /></p></div>
        <div className={styles.volumes}>
          {landingVolumes.map((volume) => {
            const label = uiLabel(`${volume.title.zh}笔记`, `${volume.title.en} notes`);
            const card = (
              <figure className={styles.volume} data-landing-reveal="visible">
                <div className={styles.collectionWell}>
                  <img src={volume.cover} width={750} height={1000} loading="lazy" decoding="async" alt="" />
                </div>
                <figcaption><div><h3><UiText {...volume.title} /></h3><p><UiText {...volume.description} /></p></div><Arrow /></figcaption>
              </figure>
            );
            return signedIn
              ? <Link href={volume.href} className={styles.collectionCard} key={volume.href} suppressHydrationWarning {...label}>{card}</Link>
              : <a href={volume.href} className={styles.collectionCard} key={volume.href} suppressHydrationWarning {...label} onClick={(event) => { event.preventDefault(); openAuth("login", volume.href); }}>{card}</a>;
          })}
        </div>
        <a href="#entrance" className={styles.collectionLink}><UiText zh="到书库里，慢慢读。" en="Find your next read in the library." /><Arrow /></a>
      </section>

      <section id="reflection" className={styles.reflection} aria-labelledby="reflection-title">
        <div className={`${styles.shell} ${styles.reflectionInner}`}>
          <div className={`${styles.reflectionArt} ${styles.reveal}`} data-landing-reveal="visible" aria-hidden="true"><img src={landingAssets.book} width={1536} height={1024} loading="lazy" decoding="async" alt="" /></div>
          <div className={`${styles.reflectionCopy} ${styles.reveal}`} data-landing-reveal="visible">
            <p className={styles.eyebrow}><UiText zh="关于这间书房" en="A note on this library" /></p>
            <h2 id="reflection-title"><UiText {...copy.reflectionTitle} /></h2>
            <p><UiText {...copy.reflectionDescription} /></p>
            <span className={styles.handwritten}><UiText zh="留着，下次再读。" en="Keep it. Come back to it." /></span>
          </div>
        </div>
      </section>

      <section className={`${styles.questions} ${styles.shell}`} aria-labelledby="questions-title">
        <div><h2 id="questions-title"><UiText zh="进来之前，几句说明。" en="A few things before you come in." /></h2><p><UiText zh="关于内容，也关于这间书房。" en="About the reading, and the room around it." /></p></div>
        <div className={styles.questionList}>{landingQuestions.map((item) => <details key={item.question.en}><summary><span className={styles.questionText}><UiText {...item.question} /></span><span aria-hidden="true">+</span></summary><p><UiText {...item.answer} /></p></details>)}</div>
      </section>

      <footer id="entrance" className={styles.entrance}>
        <div className={styles.shell}>
          <div className={styles.entranceTop}>
            <div><h2><UiText {...copy.closingTitle} /></h2><p><UiText {...copy.closingDescription} /></p></div>
            <div className={styles.actions}>
              {entrance(styles.goldButton)}
              {!signedIn && <button type="button" className={styles.lightAction} onClick={() => openAuth("register")}><UiText {...copy.join} /><Arrow /></button>}
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
      {authView && <AuthModal view={authView} next={authNext} onClose={closeAuth} />}
    </div>
  );
}
