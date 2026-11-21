"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import { ReaderLink as Link } from "../navigation-feedback";
import { AccountIcon } from "@/components/account-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { UiLanguageToggle } from "@/components/ui-language-toggle";
import { UiText } from "@/components/ui-text";
import { api } from "@/lib/api";
import { uiLabel } from "@/lib/ui-language";
import { AuthModal, type AuthView } from "./auth-modal";
import { landingCopy as copy, landingFeatures, landingQuestions, landingVolumes } from "./landing-copy";
import { landingAssets } from "@/lib/landing-assets";
import { LandingStory } from "./landing-story";
import styles from "./landing-redesign.module.css";

const headingSerif = localFont({
  src: "./fonts/noto-serif-sc-landing-500.woff2",
  weight: "500",
  style: "normal",
  display: "swap",
  variable: "--font-landing-serif",
  adjustFontFallback: false,
  fallback: ["Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", "STSong", "SimSun", "Georgia", "serif"],
});

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>;
}

function sentenceParts(text: string) {
  return text.match(/[^。！？.!?]+[。！？.!?]+|[^。！？.!?]+$/g)?.map((part) => part.trim()).filter(Boolean) ?? [text];
}

// Latin titles get a word-boundary split close to half their length, so the
// forced lines stay balanced instead of leaving one sentence to wrap alone.
function balancedPair(text: string) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < 4) return null;
  let best: [string, string] | null = null;
  for (let index = 2; index <= words.length - 2; index += 1) {
    const first = words.slice(0, index).join(" ");
    const second = words.slice(index).join(" ");
    if (!best || Math.abs(first.length - second.length) < Math.abs(best[0].length - best[1].length)) best = [first, second];
  }
  return best;
}

function titleParts(text: string) {
  const parts = sentenceParts(text);
  if (parts.length > 1) return parts.length === 2 && /\s/.test(text) ? balancedPair(parts.join(" ")) ?? parts : parts;
  const comma = text.search(/[，,]/);
  return comma > 0 ? [text.slice(0, comma + 1), text.slice(comma + 1)] : parts;
}

// Split both languages only when they produce the same number of lines, so one
// language never renders an empty line meant for the other.
function pairedParts(zh: string, en: string, split: (text: string) => string[]) {
  const zhParts = split(zh);
  const enParts = split(en);
  return zhParts.length === enParts.length && zhParts.length > 1
    ? zhParts.map((part, index) => ({ zh: part, en: enParts[index] }))
    : [{ zh, en }];
}

const reflectionTitleParts = pairedParts(copy.reflectionTitle.zh, copy.reflectionTitle.en, titleParts);
const reflectionDescriptionParts = pairedParts(copy.reflectionDescription.zh, copy.reflectionDescription.en, sentenceParts);

export function LandingPage() {
  const [authView, setAuthView] = useState<AuthView | null>(null);
  const [authNext, setAuthNext] = useState<string | undefined>(undefined);
  const [signedIn, setSignedIn] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const closeAuth = useCallback(() => { setAuthView(null); setAuthNext(undefined); }, []);
  const openAuth = useCallback((view: AuthView, next?: string) => { setAuthNext(next); setAuthView(view); }, []);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The shared header translates DOM attributes before this page hydrates.
    setHydrated(true);
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
      if (reduced.matches || !("IntersectionObserver" in window)) {
        items.forEach((item) => { item.dataset.landingReveal = "visible"; });
        return;
      }
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
      // The collection covers replay their wipe on every entry, including
      // back/forward and restored scroll positions. Everything else keeps the
      // natural scroll-triggered reveal and is only closed below the fold.
      // Measure first, then write, so one style pass resolves every closed clip.
      const wiping = new Set(items.filter((item) =>
        item.hasAttribute("data-landing-volume") || item.getBoundingClientRect().top > innerHeight * .95,
      ));
      items.forEach((item) => { item.dataset.landingReveal = wiping.has(item) ? "pending" : "visible"; });
      if (wiping.size) void root.current?.offsetHeight;
      items.forEach((item) => observer?.observe(item));
    }
    // A page restored from the back/forward cache keeps its finished DOM, so
    // reset it and let the observer wipe the covers again. Closing the covers
    // before the page is frozen keeps the restored frame from flashing open.
    const suspend = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      items.forEach((item) => { if (item.hasAttribute("data-landing-volume")) item.dataset.landingReveal = "pending"; });
    };
    const resume = (event: PageTransitionEvent) => { if (event.persisted) setup(); };
    setup();
    reduced.addEventListener("change", setup);
    window.addEventListener("pagehide", suspend);
    window.addEventListener("pageshow", resume);
    return () => {
      live = false;
      observer?.disconnect();
      reduced.removeEventListener("change", setup);
      window.removeEventListener("pagehide", suspend);
      window.removeEventListener("pageshow", resume);
    };
  }, []);


  // Access always goes through the sign-in form, even when a session is still
  // valid, so returning readers can unlock their password manager and submit
  // deliberately instead of being sent straight into the library.
  function entrance(className: string) {
    return <button type="button" className={className} onClick={() => openAuth("login", "/library/")}><UiText {...copy.enter} /><Arrow /></button>;
  }

  return (
    <div ref={root} id="lovismind-landing" className={`${headingSerif.variable} ${styles.landing}`} data-motion="on" data-intro={hydrated ? "ready" : undefined}>
      <header className={styles.header}>
        <div className={`${styles.shell} ${styles.headerInner}`}>
          <a href="#top" className={styles.brand} {...uiLabel("LovisMind 首页", "LovisMind home")}>
            <img src="/brand/lovismind-mark.png" width={36} height={36} alt="" /><span>LovisMind</span><span className={styles.brandDescription}><UiText zh="个人知识笔记" en="Lovis’s personal knowledge notes" /></span>
          </a>
          <nav className={styles.sectionNav} {...uiLabel("页面导航", "Page navigation")}>
            <a href="#vault-preview"><UiText zh="阅读方式" en="How to read" /></a>
            <a href="#collections"><UiText zh="藏书" en="The collection" /></a>
            <a href="#reflection"><UiText zh="关于本站" en="About this site" /></a>
          </nav>
          <div className={styles.headerActions}>
            <div className={styles.headerToggles}>{hydrated && <><ThemeToggle /><UiLanguageToggle /></>}</div>
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

      <LandingStory paused={false} />

      <section id="reading-features" className={`${styles.features} ${styles.shell}`} aria-labelledby="features-title">
        <div className={`${styles.featureCopy} ${styles.reveal}`} data-landing-reveal="visible">
          <h2 id="features-title"><UiText zh="专注于文本的" en="A reading experience" /><br /><span><UiText zh="阅读体验。" en="centered on the text." /></span></h2>
          <p><UiText zh="界面简净素雅，去除视觉冗余。字体排版与阅读进度均自适应留存。" en="A simple, restrained interface with minimal visual clutter. Typography adapts to your preferences, and your reading progress is saved." /></p>
          <a href="#collections" className={styles.featureLink}><UiText zh="浏览藏书书架" en="View the shelves" /><Arrow /></a>
        </div>
        <div className={styles.featureWorkbench}>
          <div className={styles.featureWorkbenchHead}><UiText zh="阅读功能" en="Reading features" /></div>
          <ul>{landingFeatures.map((item, index) => <li key={item.title.en} className={styles.reveal} data-landing-reveal="visible" style={{ transitionDelay: `${index * 75}ms` }}><span className={styles.featureSymbol} aria-hidden="true">{index === 2 ? "↗" : "✓"}</span><div><h3><UiText {...item.title} /></h3><p><UiText {...item.description} /></p></div><span className={styles.featureNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></li>)}</ul>
        </div>
      </section>

      <section id="collections" className={`${styles.collection} ${styles.shell}`} aria-labelledby="collection-title">
        <div className={styles.collectionHeading}><h2 id="collection-title"><UiText {...copy.collectionTitle} /></h2><p><UiText {...copy.collectionDescription} /></p></div>
        <div className={styles.volumes}>
          {landingVolumes.map((volume) => {
            const label = uiLabel(`${volume.title.zh}笔记`, `${volume.title.en} notes`);
            const card = (
              <figure className={styles.volume} data-landing-reveal="pending" data-landing-volume>
                <div className={styles.collectionWell}>
                  <img src={volume.cover} width={528} height={704} loading="lazy" decoding="async" alt="" />
                </div>
                <figcaption><div><h3><UiText {...volume.title} /></h3><p><UiText {...volume.description} /></p></div><Arrow /></figcaption>
              </figure>
            );
            return signedIn
              ? <Link href={volume.href} className={styles.collectionCard} key={volume.href} {...label}>{card}</Link>
              : <a href={volume.href} className={styles.collectionCard} key={volume.href} {...label} onClick={(event) => { event.preventDefault(); openAuth("login", volume.href); }}>{card}</a>;
          })}
        </div>
        <Link href="/library/" className={styles.collectionLink} onClick={(event) => { if (!signedIn) { event.preventDefault(); openAuth("login", "/library/"); } }}><UiText zh="查看全部藏书" en="View all collections" /><Arrow /></Link>
      </section>

      <section id="reflection" className={styles.reflection} aria-labelledby="reflection-title">
        <div className={`${styles.shell} ${styles.reflectionInner}`}>
          <div className={`${styles.reflectionArt} ${styles.reveal}`} data-landing-reveal="visible" aria-hidden="true"><img src={landingAssets.book} width={1536} height={1024} loading="lazy" decoding="async" alt="" /></div>
          <div className={styles.reflectionCopy}>
            <h2 id="reflection-title">
              {reflectionTitleParts.map((line, index) => (
                <span className={`${styles.titleLine} ${styles.lineReveal}`} data-landing-reveal="visible" style={{ transitionDelay: `${index * 90}ms` }} key={`${line.zh}-${index}`}><UiText zh={line.zh} en={line.en} /></span>
              ))}
            </h2>
            <p>{reflectionDescriptionParts.map((part, index) => (
              <span className={styles.fadePart} data-landing-reveal="visible" style={{ transitionDelay: `${220 + index * 110}ms` }} key={`${part.zh.slice(0, 6)}-${index}`}><UiText zh={part.zh} en={index < reflectionDescriptionParts.length - 1 ? `${part.en} ` : part.en} /></span>
            ))}</p>
            <span className={`${styles.handwritten} ${styles.handwrittenReveal}`} data-landing-reveal="visible" style={{ transitionDelay: `${220 + reflectionDescriptionParts.length * 110 + 80}ms` }}><UiText zh="留着，下次再读。" en="Keep it. Come back to it." /></span>
          </div>
        </div>
      </section>

      <section className={`${styles.questions} ${styles.shell}`} aria-labelledby="questions-title">
        <div><h2 id="questions-title"><UiText zh="阅览须知与说明。" en="Notes on reading and access." /></h2><p><UiText zh="关于笔记体例与访问权限的说明。" en="An explanation of how the notes are written and who can access them." /></p></div>
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
            <span>© 2026 LovisMind · <UiText zh="个人学习知识库" en="Personal learning archive" /><br /><UiText zh="正文系个人研习记录，学术引用请核实原始出处。" en="Personal study notes; please refer to primary sources for formal citation." /></span><a href="#top"><UiText zh="回到页首" en="Back to top" /> ↑</a>
          </div>
        </div>
      </footer>
      {authView && <AuthModal view={authView} next={authNext} onClose={closeAuth} />}
    </div>
  );
}
