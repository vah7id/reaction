import Link from "next/link";
import { config, price, nextPrice } from "@/config";
import { library } from "@/lib/library";
import CheckoutButton from "./CheckoutButton";
import AccountLink from "./AccountLink";

export const Logo = () => (<Link href="/" className="logo"><b>ugc</b><i>library</i><span className="dot" /></Link>);

export function Nav() {
  return (
    <nav className="nav"><div className="wrap">
      <Logo />
      <div className="nav-links">
        <Link href="/viral-video-hooks">Hooks</Link>
        <Link href="/tiktok-hook-generator">Hook generator</Link>
        <Link href="/ai-ugc-video-ads">AI UGC ads</Link>
        <Link href="/characters">Characters</Link>
        <Link href="/#pricing">Pricing</Link>
        <Link href="/#faq">FAQ</Link>
      </div>
      <div className="nav-right">
        <AccountLink />
        <CheckoutButton className="btn btn-ink btn-sm">Get the library · ${price}</CheckoutButton>
      </div>
    </div></nav>
  );
}

export const GUIDES = [
  ["/ai-ugc-video-ads", "AI UGC video ads"],
  ["/tiktok-hook-generator", "TikTok hook generator"],
  ["/viral-video-hooks", "Viral video hooks"],
  ["/b-roll-reaction-clips", "Reaction B-roll"],
  ["/how-to-make-a-reaction-video", "How to make a reaction video"],
] as const;

export function Footer() {
  return (
    <footer><div className="wrap foot">
      <Logo />
      <div className="foot-links">
        <Link href="/#how">How it works</Link><Link href="/characters">Characters</Link><Link href="/#pricing">Pricing</Link><Link href="/#faq">FAQ</Link>
        <a href={`mailto:${config.supportEmail}`}>Support</a>
      </div>
      <p className="mono muted">© 2026 UGCLibrary · AI UGC reaction clips</p>
      <div className="foot-res"><span className="mono">Guides & tools</span>{GUIDES.map(([h, t]) => <Link key={h} href={h}>{t}</Link>)}</div>
    </div></footer>
  );
}

export function PriceLine() {
  return (
    <p className="price-note"><strong>${price}</strong> once · <span className="left">{config.spotsLeft} left at this price</span>{nextPrice ? `, then $${nextPrice}` : ""}</p>
  );
}

export function FinalCta({ kicker, title, sub }: { kicker: string; title: React.ReactNode; sub?: string }) {
  return (
    <section className="final"><div className="wrap">
      <span className="mono muted">{kicker}</span>
      <h2 style={{ marginTop: 18 }}>{title}</h2>
      {sub && <p className="muted" style={{ maxWidth: 520, margin: "-8px auto 26px" }}>{sub}</p>}
      <CheckoutButton className="btn btn-ink">Get all {library.totalClips} clips <span className="arrow">→</span></CheckoutButton>
      <PriceLine />
    </div></section>
  );
}

export function SecHead({ label, title, sub }: { label: string; title: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div className="sec-head rv">
      <span className="mono muted">{label}</span>
      <div><h2>{title}</h2>{sub && <p>{sub}</p>}</div>
    </div>
  );
}

export type QA = { q: string; a: React.ReactNode; text: string };

export function Faq({ items, title = <>Asked <em>often.</em></>, label = "Questions", groups }: { items?: QA[]; title?: React.ReactNode; label?: string; groups?: [string, QA[]][] }) {
  const all = groups ? groups.flatMap((g) => g[1]) : items || [];
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: all.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.text } })) };
  const list = (qs: QA[]) => qs.map((x) => <details key={x.q}><summary>{x.q}</summary><div className="ans">{x.a}</div></details>);
  return (
    <section className="lp-sec" id="faq"><div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SecHead label={label} title={title} />
      <div className="faq rv">
        {groups ? groups.map(([g, qs]) => <div key={g}><div className="faq-group">{g}</div>{list(qs)}</div>) : list(all)}
      </div>
    </div></section>
  );
}

/** Build a QA entry from plain text (most answers). */
export const qa = (q: string, text: string): QA => ({ q, a: text, text });

export function LpHero({ crumb, title, lede, cta = true }: { crumb: string; title: React.ReactNode; lede: string; cta?: boolean }) {
  return (
    <header className="lp-hero"><div className="wrap">
      <div className="crumbs"><Link href="/">UGCLibrary</Link> / {crumb}</div>
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
      {cta && (<><CheckoutButton className="btn btn-ink">Get all {library.totalClips} clips <span className="arrow">→</span></CheckoutButton><PriceLine /></>)}
    </div></header>
  );
}
