"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { UiLanguageToggle } from "@/components/ui-language-toggle";
import { UiPair, UiText } from "@/components/ui-text";
import { api } from "@/lib/api";
import { site } from "@/lib/site";
import { uiLabel } from "@/lib/ui-language";
import { AuthModal, type AuthView } from "./auth-modal";
import styles from "./landing.module.css";

type NodeKey = "read" | "question" | "connect" | "remember" | "return";

const nodes: { key: NodeKey; label: string; x: number; y: number }[] = [
  { key: "read", label: "READ", x: 155, y: 230 },
  { key: "question", label: "QUESTION", x: 375, y: 170 },
  { key: "connect", label: "CONNECT", x: 637, y: 120 },
  { key: "remember", label: "REMEMBER", x: 882, y: 194 },
  { key: "return", label: "RETURN", x: 500, y: 272 },
];

const nodeMessages: Record<NodeKey, [string, string]> = {
  read: ["阅读 —— 与一个想法的初次相遇。", "Read — The first encounter with an idea."],
  question: ["提问 —— 让信息成为真正的探索。", "Question — Curiosity turns information into inquiry."],
  connect: ["联结 —— 在不同想法之间建立新的联系。", "Connect — New links emerge between distant thoughts."],
  remember: ["留存 —— 值得记住的知识，应该随时可被找回。", "Remember — Worthwhile ideas deserve to remain accessible."],
  return: ["重访 —— 温故而知新，让理解逐渐深入。", "Return — Understanding grows when we revisit what matters."],
};

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

export function LandingPage() {
  const [authView, setAuthView] = useState<AuthView | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [activeNode, setActiveNode] = useState<NodeKey | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const closeAuth = useCallback(() => setAuthView(null), []);

  useEffect(() => {
    try {
      if (localStorage.getItem("shufang:motion") === "paused") setMotionPaused(true);
    } catch {
      /* Keep motion on when storage is unavailable. */
    }
  }, []);

  useEffect(() => {
    let live = true;
    api<{ user: unknown | null }>("/api/auth/me")
      .then((result) => {
        if (live) setSignedIn(Boolean(result.user));
      })
      .catch(() => {
        /* The landing stays usable when the backend is unavailable. */
      });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.dataset.reveal = "on";
    const items = root.querySelectorAll<HTMLElement>(`.${styles.reveal}`);
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add(styles.inView));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add(styles.inView);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.22 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || motionPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      media.style.setProperty("--pointer-x", `${x}px`);
      media.style.setProperty("--pointer-y", `${y}px`);
    };
    const onMove = (event: PointerEvent) => {
      x = (event.clientX / window.innerWidth - 0.5) * -14;
      y = (event.clientY / window.innerHeight - 0.5) * -10;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      media.style.removeProperty("--pointer-x");
      media.style.removeProperty("--pointer-y");
    };
  }, [motionPaused]);

  function toggleMotion() {
    setMotionPaused((current) => {
      const next = !current;
      try {
        localStorage.setItem("shufang:motion", next ? "paused" : "on");
      } catch {
        /* The toggle still works for this page when storage is unavailable. */
      }
      return next;
    });
  }

  function scrollToAbout() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("about")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }

  const message = activeNode
    ? nodeMessages[activeNode]
    : [
        "每一次阅读，都可能延伸出新的思考。点击节点看看。",
        "Every reading leaves a new trail to follow. Select a point to explore.",
      ];

  return (
    <div
      id="lovismind-landing"
      ref={rootRef}
      className={styles.landing}
      data-motion={motionPaused ? "paused" : "on"}
    >
      <header className={styles.header}>
        <div className={`${styles.shell} ${styles.headerInner}`}>
          <a
            href="#top"
            className={styles.brand}
            {...uiLabel("LovisMind 首页", "LovisMind home")}
          >
            <img
              className={styles.brandMark}
              src="/brand/lovismind-mark.png"
              alt=""
              width={36}
              height={36}
            />
            <span>{site.name}</span>
          </a>
          <nav className={styles.nav} {...uiLabel("主导航")}>
            <UiLanguageToggle />
            {signedIn ? (
              <Link href="/library/" className={styles.navPrimary}>
                <UiText zh="进入书库" en="Enter library" />
              </Link>
            ) : (
              <button
                type="button"
                className={styles.navPrimary}
                onClick={() => setAuthView("login")}
              >
                <UiText zh="登录" en="Sign in" />
              </button>
            )}
          </nav>
        </div>
      </header>

      <section
        id="top"
        className={`${styles.hero} ${styles.gridBg}`}
        aria-label="LovisMind"
      >
        <div className={styles.heroMedia} ref={mediaRef} aria-hidden="true">
          <img
            src="/images/landing-hero.webp"
            alt=""
            width={1072}
            height={724}
            fetchPriority="high"
          />
          <div className={styles.photoPageMotion}>
            <img src="/images/landing-hero.webp" alt="" />
          </div>
          <div className={styles.photoPageLight} />
          <div className={styles.spineGlow} />
        </div>
        <svg className={styles.knowledgeArc} viewBox="0 0 500 240" aria-hidden="true">
          <path className={styles.arcLine} d="M10 180 Q145 5 265 87 T486 56" />
          <circle className={styles.orbitDot} r="4">
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              path="M10 180 Q145 5 265 87 T486 56"
            />
          </circle>
        </svg>
        <div className={styles.heroSunbeam} aria-hidden="true" />
        <div className={styles.ambient} aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => (
            <i key={index} className={styles.dust} />
          ))}
        </div>

        <div className={`${styles.shell} ${styles.heroInner}`}>
          <div className={styles.kicker}>
            <UiText zh="个人知识书库" en="Personal Knowledge Vault" />
          </div>
          <h1 className={styles.title}>{site.name}</h1>
          <p className={styles.motto}>
            <span>{site.intro.en}</span>{" "}
            <span className={styles.mottoZh}>{site.intro.zh}</span>
          </p>
          <div className={styles.mottoRule} aria-hidden="true" />
          <p className={styles.heroDesc}>
            <UiPair
              zh={
                <>
                  为阅读、学习与值得保存的思考留一方空间。
                  <br />
                  可凭邀请码加入，也可以申请访问。
                </>
              }
              en={
                <>
                  A personal space for reading, learning and the ideas worth keeping.
                  <br />
                  Access is available by invitation or application.
                </>
              }
            />
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonSolid}`}
              onClick={() => setAuthView("login")}
            >
              <UiText zh="进入知识库" en="Enter the Vault" />
              <Arrow />
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonOutline}`}
              onClick={() => setAuthView("register")}
            >
              <UiText zh="创建账号" en="Create account" />
              <Arrow />
            </button>
          </div>
          <div className={styles.heroFoot}>
            <button type="button" className={styles.scrollCue} onClick={scrollToAbout}>
              <span className={styles.scrollTrack} aria-hidden="true" />
              <UiText zh="向下探索" en="Scroll to explore" />
              <svg
                className={styles.scrollArrow}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14m-6-6 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <div className={styles.separator} aria-hidden="true" />

      <section id="about" className={styles.about}>
        <div className={styles.shell}>
          <div className={`${styles.aboutHead} ${styles.reveal}`}>
            <div>
              <span className={styles.sectionKicker}>01 / THE IDEA</span>
              <h2 className={styles.sectionTitle}>
                <UiPair
                  zh="让思想有迹可循。"
                  en={
                    <>
                      A home for thoughts
                      <br />
                      in motion.
                    </>
                  }
                />
              </h2>
            </div>
            <p className={styles.sectionCopy}>
              <UiText
                zh="知识不只是堆叠的书籍，而是阅读、提问与回忆之间逐渐形成的联系。LovisMind 收藏的，是这些思考的轨迹。"
                en="Knowledge isn't a stack of books. It's the quiet connections we build between what we read, what we question, and what we remember. LovisMind is a personal archive for those connections."
              />
            </p>
          </div>

          <div className={`${styles.concept} ${styles.reveal}`}>
            <div className={styles.conceptCaption}>AN EXERCISE IN CONNECTION</div>
            <svg
              className={styles.diagram}
              viewBox="0 0 1040 350"
              preserveAspectRatio="xMidYMid meet"
              role="group"
              {...uiLabel("思想联系示意图", "Interactive diagram of connected thoughts")}
            >
              <path
                className={styles.diagramPath}
                d="M155 230 Q280 125 375 170 Q510 238 637 120 Q755 55 882 194"
              />
              <path
                className={styles.diagramPath}
                d="M155 230 Q320 290 500 272 Q725 252 882 194"
              />
              <path className={styles.diagramPath} d="M375 170 Q450 85 637 120" />
              <path className={styles.diagramPath} d="M500 272 Q555 187 637 120" />
              <g className={styles.traveler} aria-hidden="true">
                <circle r="5" fill="#b8853d">
                  <animateMotion
                    dur="9s"
                    repeatCount="indefinite"
                    path="M155 230 Q280 125 375 170 Q510 238 637 120 Q755 55 882 194"
                  />
                </circle>
                <circle r="10" fill="#d5ad69" opacity=".16">
                  <animateMotion
                    dur="9s"
                    repeatCount="indefinite"
                    path="M155 230 Q280 125 375 170 Q510 238 637 120 Q755 55 882 194"
                  />
                </circle>
              </g>
              <ellipse
                className={styles.arcOrbit}
                cx="520"
                cy="184"
                rx="195"
                ry="95"
                fill="none"
              />
              {nodes.map((node) => (
                <g
                  key={node.key}
                  className={`${styles.node}${activeNode === node.key ? ` ${styles.nodeActive}` : ""}`}
                  transform={`translate(${node.x} ${node.y})`}
                  role="button"
                  tabIndex={0}
                  aria-label={node.label}
                  onClick={() => setActiveNode(node.key)}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    setActiveNode(node.key);
                  }}
                >
                  <circle className={styles.markerHalo} r="30" />
                  <circle className={styles.markerDot} r="13" />
                  <circle className={styles.markerCore} r="4.3" />
                  <text
                    className={styles.diagramCaption}
                    textAnchor="middle"
                    y="-39"
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
            <div className={styles.conceptBottom}>
              <p aria-live="polite">
                <UiText zh={message[0]} en={message[1]} />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={`${styles.shell} ${styles.closingInner} ${styles.reveal}`}>
          <div>
            <span className={styles.sectionKicker}>02 / THE ENTRANCE</span>
            <h2>
              <UiText
                zh="从这里，开启新的思考。"
                en="Your next thought begins here."
              />
            </h2>
            <p>
              <UiText
                zh="有邀请码可立即加入；没有邀请码，也欢迎提交访问申请。"
                en="Have an invitation code? Join immediately. Otherwise, request access."
              />
            </p>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonSolid}`}
              onClick={() => setAuthView("register")}
            >
              <UiText zh="创建账号" en="Create an account" />
              <Arrow />
            </button>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.shell} ${styles.footerInner}`}>
          <span>
            <UiText
              zh="LovisMind © 2026 · 文字留痕，思绪成网。"
              en="LovisMind © 2026 · Where readings linger and thoughts intertwine."
            />
          </span>
          <button
            type="button"
            className={styles.motionToggle}
            aria-pressed={motionPaused}
            onClick={toggleMotion}
            {...uiLabel(
              motionPaused ? "开启动效" : "暂停动效",
              motionPaused ? "Turn motion on" : "Pause motion",
            )}
          >
            {motionPaused ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13l10-6.5z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
              </svg>
            )}
          </button>
        </div>
      </footer>

      {authView && <AuthModal view={authView} onClose={closeAuth} />}
    </div>
  );
}
