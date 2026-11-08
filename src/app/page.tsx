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
            <p>A UGC video library of AI UGC reaction clips, built for the first three seconds of your ad. Open your TikTok, Reels, Shorts or Meta ad with a reaction, cut to your product demo, post.</p>
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
            <h3>Get the whole library.</h3>
            <p>One payment, then download every clip as an original vertical MP4. No subscription, re-download any time.</p>
          </div>
          <div className="step rv">
            <span className="k">Step 02</span>
            <div className="step-visual" style={{ flexWrap: "wrap", alignContent: "center", gap: 7 }}>
              <span className="chip on">Surprised</span><span className="chip">Shocked</span><span className="chip">Happy</span><span className="chip">Confused</span><span className="chip">Amazed</span>
            </div>
            <h3>Pick a reaction by emotion.</h3>
            <p>Clips are sorted into folders by feeling and character, so the right hook takes seconds to find.</p>
          </div>
          <div className="step rv">
            <span className="k">Step 03</span>
            <div className="step-visual">
              <div className="mini"><img src={shocked.poster} alt="" /></div><span className="plus">+</span>
              <div className="demo-box">Your<br />demo</div><span className="plus">=</span><span className="chip on">Ready</span>
            </div>
            <h3>Add your demo, post.</h3>
            <p>Place 3–5 seconds of reaction before your screen recording in CapCut, Premiere or any editor. Add a caption.</p>
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
          {["Fitness apps", "Fintech", "Dating", "AI tools", "Mobile games", "Health & wellness", "Productivity", "Social apps", "Ecommerce", "Education"].map((n) => <span className="chip" key={n}>{n}</span>)}
        </div>
      </div></section>

      <section style={{ paddingTop: 40 }}><div className="wrap">
        <div className="case rv">
          <div>
            <span className="mono" style={{ color: "#b8b3a7" }}>Case study — DwellShot</span>
            <blockquote style={{ marginTop: 18 }}>“Our before-and-after transformations are the story. A reaction clip gives us the opening hook, then the demo shows ordinary listing photos becoming staged interiors.”</blockquote>
            <p className="by">Amy · DwellShot, AI real estate photography & video</p>
          </div>
          <div className="case-flow">
            <div><span>0–3s</span><span>Reaction clip opens the ad</span></div>
            <div><span>3–15s</span><span>Before-and-after listing demo</span></div>
            <div><span>Format</span><span>9:16 for Reels, TikTok, Shorts</span></div>
          </div>
        </div>
        <div className="quotes">
          {[
            ["We had no video content and no budget for a shoot. Grabbed three reaction clips, cut them onto our demo, and had ads running the same afternoon.", "Sam", "Co-founder, Preyreach"],
            ["I test five hooks a week now instead of one a month. Same demo every time — only the first three seconds change.", "Emma", "Marketing Manager, Lindo"],
            ["The clips actually look like people, not stock footage. That was the whole problem with everything else we tried.", "Olivia", "Marketing Manager, Formbnb"],
            ["One payment, whole library, and I've used it across four campaigns. Cheapest line in our marketing stack by a mile.", "Sep", "Co-founder, Ticketsale"],
          ].map(([q, n, r]) => <div className="quote rv" key={n}><p>“{q}”</p><div className="by"><b>{n}</b> · {r}</div></div>)}
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
            <p className="fine">Secure checkout with Stripe · {config.refundDays}-day refund before your first download</p>
          </div>
        </div>
      </div></section>

      <Faq label="06 — Questions" groups={[
        ["About UGC reaction clips", [
          qa("What is a UGC reaction clip?", "A few seconds of vertical video where someone reacts to the camera: a jaw drop, a laugh, a double-take, shot to look like user-generated content. Advertisers put it at the very start of a TikTok, Reels, Shorts or Meta ad to stop the scroll, then cut to the product. ReactionUGC is a library of these clips, all performed by AI characters."),
          qa("Are the people in the clips real?", "None of them. Every character and every AI UGC reaction clip is generated. You're licensing finished footage to edit into your own ads, not real customers and not testimonials. The product footage that follows the hook is yours."),
          qa("How do I turn a clip into a UGC reaction video ad?", "Choose a reaction whose feeling matches your caption. Trim 3 to 5 seconds of it to open the video, lay a short line of text on top, then cut to your screen recording or product demo. CapCut, Premiere Pro, Final Cut Pro: any editor does the job."),
          qa("Why do reaction hooks work?", "A face reacting to something raises a question the viewer wants answered: what did they just see? Your demo is the answer. That small open loop is what keeps people watching past the first seconds, where most ads lose them."),
        ]],
        ["The UGC video library", [
          qa("What's inside the library?", `${T} AI UGC reaction clips from ${N} AI characters, sorted by emotion: surprised, shocked, happy, amazed, confused, excited, laughing and more, plus a folder of candid everyday moments.`),
          qa("What format are the files?", "Original vertical 9:16 MP4s with no captions, no music and no edits, ready for your own text, sound and product footage."),
          qa("Can I run the clips in paid ads?", "Yes. The commercial-use license covers paid social ads, organic posts, websites and work you do for clients. What you can't do is resell or redistribute the raw clips as a library of your own."),
          qa("Is a clip exclusive to me?", "No. You get a commercial-use license, not ownership, so other customers can use the same clips. Pair one with your own caption and demo and the finished ad is still yours alone."),
        ]],
        ["Pricing", [
          qa("How much does ReactionUGC cost?", `One payment, never a subscription. The price climbs in steps as the library fills up: ${config.priceSteps.map((p) => "$" + p).join(", ")} USD. You get every clip in the current library, full-resolution originals and commercial use. Future collections aren't included.`),
          qa("How do I get the clips?", "Log in with Google or your email, pay once with Stripe, and the full pack is ready to download in your account. Log in any time to download it again. Stripe emails you a receipt."),
          qa("Can I get a refund?", `Yes. Email ${config.supportEmail} within ${config.refundDays} days of buying, before you download the pack, and you get your money back. Your statutory rights still apply.`),
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
