import Link from "next/link";
import { UiText } from "@/components/ui-text";
import { site } from "@/lib/site";
export default function HomePage() {
  return (
    <div className="shell">
      <section className="hero">
        <div
          className="hero__scene"
          role="img"
          aria-label="Books in warm sunlight"
        />
        <div className="hero__body">
          <p className="eyebrow">
            <UiText zh="阅读与思考" en="Reading & reflection" />
          </p>
          <h1 className="hero__title">{site.name}</h1>
          <p className="hero__tagline">
            <span className="hero__tagline-en">{site.intro.en}</span>
            <span className="hero__tagline-zh">{site.intro.zh}</span>
          </p>
          <div className="hero__rule" />
          <p>
            <UiText
              zh="登录后，开启你的阅读。"
              en="Sign in to begin reading."
            />
          </p>
          <div className="landing-actions">
            <Link className="auth-button" href="/login/">
              <UiText zh="登录" en="Sign in" />
            </Link>
            <Link href="/register/">
              <UiText zh="申请账号 →" en="Request an account →" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
