/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { config, price } from "@/config";
import { library, PREVIEW, CHARACTERS } from "@/lib/library";
import { PriceLine, SecHead, Faq, FinalCta, GUIDES, qa } from "@/components/Chrome";
import CheckoutButton from "@/components/CheckoutButton";
import PersonCard from "@/components/PersonCard";
import { Reel, IndexList } from "@/components/HomeBits";

const T = library.totalClips, N = library.totalCharacters;

export default function Home() {
  const shocked = PREVIEW.find((c) => c.emotion === "shocked") || PREVIEW[0];
  return (
    <main>
      <header className="hero"><div className="wrap">
        <span className="mono muted">AI UGC reaction clips · Vol. 01 — {T} catalogued</span>
        <div className="hero-top" style={{ marginTop: 22 }}>
          <h1>Every reaction,<br /><em>catalogued.</em></h1>
          <div className="hero-side">
            <p>A UGC video library of AI UGC reaction clips, built for the first three seconds of your ad. Lead your TikTok, Reels, Shorts and Meta ads with a real-looking reaction, then let your product take over.</p>
            <CheckoutButton className="btn btn-ink">Get all {T} clips <span className="arrow">→</span></CheckoutButton>
            <PriceLine />
          </div>
        </div>
        <div className="hero-meta mono muted">
          <span>One-time payment</span><span>Instant download</span><span>Vertical 9:16 MP4</span><span>Commercial-use license</span>
        </div>
      </div></header>

      <Reel />

      <section id="index"><div className="wrap">
        <SecHead label="01 — The index" title={<>Shelved by <em>feeling</em>, not by file name.</>}
          sub="Every UGC reaction video is sorted by emotion. Match the reaction to your caption: surprised for a reveal, shocked for a price drop, confused for the problem your product fixes." />
        <IndexList />
      </div></section>

      <section id="how" style={{ paddingTop: 40 }}><div className="wrap">
        <SecHead label="02 — Make a UGC reaction video" title={<>Reaction <em>+</em> demo <em>=</em> ad.</>}
          sub="Three steps from a raw AI UGC clip to a finished reaction hook ad. No shoot, no creators to brief, no waiting on deliverables." />
        <div className="steps">
          <div className="step rv">
            <span className="k">Step 01</span>
            <div className="step-visual">{CHARACTERS.slice(0, 4).map((c) => <div className="mini" key={c.id}><img src={c.portrait} alt="" /></div>)}</div>
            <h3>Unlock every clip at once.</h3>
            <p>Pay a single time and the full pack is yours: every character, every emotion, as untouched vertical MP4s you can grab again whenever you need them.</p>
          </div>
          <div className="step rv">
            <span className="k">Step 02</span>
            <div className="step-visual" style={{ flexWrap: "wrap", alignContent: "center", gap: 7 }}>
              <span className="chip on">Surprised</span><span className="chip">Shocked</span><span className="chip">Happy</span><span className="chip">Confused</span><span className="chip">Amazed</span>
            </div>
            <h3>Find the feeling you need.</h3>
            <p>Each folder is a character and each file name says the emotion, so matching a face to your caption takes seconds, not a scroll through stock sites.</p>
          </div>
          <div className="step rv">
            <span className="k">Step 03</span>
            <div className="step-visual">
              <div className="mini"><img src={shocked.poster} alt="" /></div><span className="plus">+</span>
              <div className="demo-box">Your<br />demo</div><span className="plus">=</span><span className="chip on">Ready</span>
            </div>
            <h3>Stack it on your demo.</h3>
            <p>Drop a few seconds of the reaction in front of your product footage, put your hook line on screen, export at 9:16 and ship it.</p>
          </div>
        </div>
      </div></section>

      <section id="cast" style={{ paddingTop: 40 }}><div className="wrap">
        <SecHead label="03 — The cast" title={<>{N} AI characters. <em>None of them real.</em></>}
          sub="Every face in this AI UGC video library is generated, across ages, looks and countries, so your reaction hook speaks to the audience you sell to." />
        <div className="cast rv">{CHARACTERS.map((c) => <PersonCard key={c.id} c={c} />)}</div>
        <div className="see-all rv"><span className="muted">Showing 8 of {N} AI characters</span><Link href="/characters" className="btn btn-line btn-sm">Meet the cast <span className="arrow">→</span></Link></div>
      </div></section>

      <section style={{ paddingTop: 20 }}><div className="wrap">
        <SecHead label="04 — Made for" title={<>UGC reaction videos for apps that need a <em>hook.</em></>}
          sub="Founders and growth teams use AI UGC reaction clips to test new ad openers without booking a single creator." />
        <div className="niches rv">
          {["Language learning", "Budgeting apps", "Skincare & beauty", "Meal kits", "Habit trackers", "Travel", "Creator tools", "Home & interior", "Pet products", "SaaS for teams", "Games", "Online courses"].map((n) => <span className="chip" key={n}>{n}</span>)}
        </div>
      </div></section>

      <section style={{ paddingTop: 40 }}><div className="wrap">
        <div className="case rv">
          <div>
            <span className="mono" style={{ color: "#b8b3a7" }}>Anatomy of a reaction ad</span>
            <blockquote style={{ marginTop: 18 }}>“The face asks the question. Your product answers it.”</blockquote>
            <p className="by">A stranger reacting to something off-screen makes people wait to see what it was. That pause is all your demo needs.</p>
          </div>
          <div className="case-flow">
            <div><span>0–3s</span><span>Reaction clip + hook line on screen</span></div>
            <div><span>3–15s</span><span>Your product doing the thing</span></div>
            <div><span>Last 2s</span><span>Offer or app-store button</span></div>
            <div><span>Format</span><span>9:16 for Reels, TikTok, Shorts</span></div>
          </div>
        </div>
        <p className="mono muted" style={{ marginTop: 56 }}>Example hooks · ideas to try, not customer quotes</p>
        <div className="quotes" style={{ marginTop: 16 }}>
          {[
            ["“I didn't think a 12-minute workout could do this.”", "Fitness app", "Shocked reaction"],
            ["“Wait… my bank has been charging me for THAT?”", "Fintech", "Confused reaction"],
            ["“It built the whole pitch deck while I made coffee.”", "AI tool", "Amazed reaction"],
            ["“My roommate called it a waste of money. Then she borrowed it.”", "Ecommerce", "Laughing reaction"],
          ].map(([q, n, r]) => <div className="quote rv" key={n}><p>{q}</p><div className="by"><b>{n}</b> · {r}</div></div>)}
        </div>
      </div></section>

      <section id="pricing"><div className="wrap">
        <SecHead label="05 — Pricing" title={<>One payment. <em>The whole shelf.</em></>}
          sub="No subscription. Every AI UGC reaction clip in the library for a single payment. The price steps up as more people join, so early buyers pay least." />
        <div className="ticket rv">
          <div className="ticket-l">
            <span className="mono muted">Library card · lifetime</span>
            <div className="big-price"><sup>$</sup>{price}</div>
            <div className="muted">USD, once</div>
            <div className="ladder">{config.priceSteps.map((p, i) => <div key={p} className={i < config.currentStep ? "past" : i === config.currentStep ? "now" : ""}>${p}</div>)}</div>
            <PriceLine />
          </div>
          <div className="ticket-r">
            <ul>
              <li><span>All {T} AI UGC reaction clips from {N} characters</span></li>
              <li>Full-resolution original MP4s, sorted by emotion</li>
              <li>Instant download after payment</li>
              <li>Commercial use: paid ads, organic, websites, client work</li>
              <li>No subscription, re-download any time</li>
            </ul>
            <CheckoutButton className="btn btn-accent btn-block">Get the library <span className="arrow">→</span></CheckoutButton>
            <p className="fine">Secure checkout with Stripe · refundable for {config.refundDays} days if you haven&apos;t downloaded yet</p>
          </div>
        </div>
      </div></section>

      <Faq label="06 — Questions" groups={[
        ["Making the ad", [
          qa("Where does the reaction go in my video?", "Right at the start. The reaction is the hook: it plays while your caption sets up the question, then you cut to the product. Most people scroll within the first couple of seconds, so that is where the clip earns its place."),
          qa("How long should the reaction last?", "Usually two to four seconds. Long enough for the expression to land and the caption to be read, short enough that viewers reach your demo before they lose interest."),
          qa("How do I choose the right emotion?", "Match it to the line on screen. A surprising stat suits a shocked face, a relatable problem suits confusion, a happy result suits laughter or excitement. If you're unsure, cut two versions with different reactions and let the ad results decide."),
          qa("Which editing apps work?", "Anything that handles MP4: CapCut, Premiere Pro, Final Cut, DaVinci Resolve, even the editors built into TikTok and Instagram."),
        ]],
        ["Files and license", [
          qa("What exactly do I download?", `One zip with ${T} clips from ${N} AI characters, a folder per character, with the emotion in each file name. Every clip is a clean vertical 9:16 MP4 with no text, music or watermark.`),
          qa("Are these real people?", "No. Every character is AI-generated, so there are no model releases to chase. Don't present them as real customers or as reviews of your product; use them as the opening hook, and let your own footage show the product."),
          qa("Can I use them in paid ads and client work?", "Yes: paid social, organic posts, landing pages and projects for clients are all covered. The one thing you can't do is resell or share the raw clips themselves."),
          qa("Will other brands use the same clips?", "They can, because the license isn't exclusive. In practice your caption, cut and product footage make the finished ad your own."),
        ]],
        ["Buying", [
          qa("Why does the price go up?", `Early buyers get the lowest price. After a set number of sales at each level it moves to the next one: ${config.priceSteps.map((p) => "$" + p).join(" → ")} USD. You pay once and keep the clips you bought.`),
          qa("How do I get my download?", "Sign in with Google, pay through Stripe, and your account page has the download button. Sign in again whenever you need the files; Stripe emails your receipt."),
          qa("What if it isn't for me?", `Write to ${config.supportEmail} within ${config.refundDays} days of buying, as long as you haven't downloaded the pack yet, and we'll refund you. This doesn't affect your statutory rights.`),
        ]],
      ]} />

      <section id="guides" style={{ paddingTop: 20 }}><div className="wrap">
        <SecHead label="07 — Guides & tools" title={<>Hooks, templates <em>and</em> free tools.</>} />
        <div className="guides rv">
          {[
            ["Free tool", "Hooks for your niche, each shown on a matching reaction clip.", "Generate hooks →"],
            ["Use case", "AI UGC reaction videos for TikTok, Meta and Google ads, without a generator.", "See how →"],
            ["Playbook", "Hook formulas, TikTok ad templates and UGC hook examples by niche.", "Read the formulas →"],
            ["Free download", "Three free vertical reaction clips for Reels and TikTok edits.", "Download free →"],
            ["Guide", "From reaction to finished ad in ten minutes, CapCut steps included.", "Read the guide →"],
          ].map(([k, p, go], i) => {
            const [href, title] = [GUIDES[[1, 0, 2, 3, 4][i]][0], GUIDES[[1, 0, 2, 3, 4][i]][1]];
            return <Link className="guide" href={href} key={href}><span className="mono muted">{k}</span><h3>{title}</h3><p>{p}</p><span className="go">{go}</span></Link>;
          })}
        </div>
      </div></section>

      <FinalCta kicker="AI UGC reaction clips" title={<>Find your next<br /><em>scroll-stopper.</em></>} />
    </main>
  );
}
