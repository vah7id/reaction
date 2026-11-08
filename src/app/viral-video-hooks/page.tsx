import type { Metadata } from "next";
import Link from "next/link";
import { LpHero, SecHead, Faq, FinalCta, qa } from "@/components/Chrome";
import ClipStrip from "@/components/ClipStrip";

export const metadata: Metadata = {
  title: "Viral Video Hooks: 12 Hook Formulas & TikTok Ad Templates (2026)",
  description: "12 viral video hook formulas for TikTok, Instagram Reels and Shorts, three timed TikTok ad templates and UGC hook examples by niche, each paired with a UGC reaction clip.",
  alternates: { canonical: "/viral-video-hooks" },
};

const F: [string, string, string, string][] = [
  ["The double-take", "Wait… {result}?", "Open on a surprised face and a result that sounds too good. The viewer stays to see if it's true.", "surprised"],
  ["Nobody told me", "Nobody told me {product} could do this.", "Frames your product as a secret the viewer is late to. Works in almost every niche.", "surprised"],
  ["The callout", "{Audience}, stop scrolling.", "Names who it's for in the first second. Fewer people stay, but the right ones do.", "shocked"],
  ["Why is nobody talking about…", "Why is nobody talking about {product}?", "Mild outrage plus curiosity. A shocked reaction sells the line.", "shocked"],
  ["Doing it wrong", "I've been doing {task} wrong this whole time.", "A confused face and a problem the viewer probably has too. The demo is the fix.", "confused"],
  ["How is this not famous", "How is {product} not more famous?", "Positions you as an underrated find. Pairs well with a puzzled reaction.", "confused"],
  ["POV", "POV: you just {result}.", "Puts the viewer inside the outcome. Use a happy, relieved reaction.", "happy"],
  ["Day 1 vs day 30", "Day 1 vs day 30 with {product}.", "Promises a transformation, then shows it. The amazed face is the day-30 you.", "amazed"],
  ["Here's exactly how", "I {result}. Here's exactly how.", "Result first, method second. Keeps people watching for the how.", "amazed"],
  ["They laughed", "My friends laughed at {product}. Then I {result}.", "A tiny story with a twist in under ten words.", "laughing"],
  ["Explaining it", "Me explaining how I {result}", "Self-aware and native to TikTok. A laughing clip makes it feel unscripted.", "laughing"],
  ["This should be illegal", "This should be illegal: {result}.", "Exaggeration that reads as a joke, not a claim. Best for low-price offers.", "shocked"],
];

export default function Page() {
  return (
    <main>
      <LpHero crumb="Viral video hooks" title={<>Viral video hooks, with the <em>formula</em> behind each.</>}
        lede="12 hook formulas for short-form video, three TikTok ad templates and real UGC hook examples, each paired with the reaction that makes it land. Built for TikTok, Instagram Reels, Shorts and Facebook ads in 2026." />
      <section className="lp-sec"><div className="wrap">
        <SecHead label="Hook formulas for short-form video" title={<>12 hooks you can <em>steal.</em></>} sub="Fill in the brackets with your product, audience or result. Each formula comes with the reaction that sells it best." />
        <div className="index-list" style={{ borderTop: "1px solid var(--ink)" }}>
          {F.map(([n, t, d, e], i) => (
            <div className="formula rv" key={n}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <div><h3>{n}</h3><div className="tpl">{t}</div><p>{d} <span className="mono muted">Best reaction: {e}</span></p></div>
              <ClipStrip variant="single" emotions={[e]} limit={1} skip={i} />
            </div>
          ))}
        </div>
      </div></section>
      <section className="lp-sec"><div className="wrap">
        <SecHead label="TikTok ad templates" title={<>Three templates, <em>timed</em> to the second.</>} sub="Plug-and-play structures for TikTok UGC ads. The reaction carries the first beat, your product carries the rest." />
        <div className="beats">
          <div className="beat rv"><span className="mono muted">Template A · 15s</span><h3>Reaction → demo</h3><ol><li><b>0–3s</b>Surprised reaction + hook text</li><li><b>3–11s</b>Screen recording of the key feature</li><li><b>11–15s</b>Result on screen + &quot;link in bio&quot; or CTA button</li></ol></div>
          <div className="beat rv"><span className="mono muted">Template B · 20s</span><h3>Problem → fix</h3><ol><li><b>0–3s</b>Confused or frustrated reaction + the problem</li><li><b>3–8s</b>Show the old, painful way</li><li><b>8–17s</b>Your product doing it in seconds</li><li><b>17–20s</b>Offer + CTA</li></ol></div>
          <div className="beat rv"><span className="mono muted">Template C · 12s</span><h3>Result first</h3><ol><li><b>0–2s</b>Amazed reaction + &quot;Day 1 vs day 30&quot;</li><li><b>2–9s</b>Before/after or quick montage</li><li><b>9–12s</b>Product name + price</li></ol></div>
        </div>
      </div></section>
      <section className="lp-sec"><div className="wrap">
        <SecHead label="UGC hook examples by niche" title={<>Same formula, <em>different</em> crowd.</>} />
        <div className="table-wrap rv"><table className="compare"><tbody>
          <tr><th>Niche</th><th>Hook example</th><th>Reaction</th></tr>
          <tr><td>Mobile apps</td><td>&quot;Why didn&apos;t anyone tell me about this app sooner?&quot;</td><td>Confused</td></tr>
          <tr><td>SaaS</td><td>&quot;I cut my weekly report from 4 hours to 20 minutes.&quot;</td><td>Amazed</td></tr>
          <tr><td>Dropshipping</td><td>&quot;Wait… this was $19?&quot;</td><td>Surprised</td></tr>
          <tr><td>Beauty (Facebook ads)</td><td>&quot;Day 1 vs day 14 with this serum.&quot;</td><td>Amazed</td></tr>
          <tr><td>Fitness</td><td>&quot;People who hate the gym, stop scrolling.&quot;</td><td>Shocked</td></tr>
          <tr><td>Finance</td><td>&quot;POV: it&apos;s the 28th and you still have money.&quot;</td><td>Happy</td></tr>
        </tbody></table></div>
        <p className="muted rv" style={{ marginTop: 18 }}>Want hooks written for your product? Try the free <Link href="/tiktok-hook-generator" style={{ textDecoration: "underline", color: "var(--ink)" }}>TikTok hook generator</Link>.</p>
      </div></section>
      <Faq items={[
        qa("What makes a TikTok hook go viral?", "Three things in the first second: a reason to keep watching (curiosity, a bold claim or a callout), a face that reacts like a real person, and text short enough to read before the thumb moves. The formulas above combine all three."),
        qa("How can brands measure hook rate on UGC ads?", "Hook rate is usually calculated as 3-second video views divided by impressions. In Meta Ads Manager, add 3-second video plays as a custom column and divide by impressions; on TikTok use 2-second or 6-second views the same way. Compare hook rate between ads that share the same demo, so the opening is the only thing that differs."),
        qa("How can e-commerce brands test hooks in video ads?", "Keep everything after the first three seconds identical and swap only the hook: three to five reaction clips with different lines on top. Run them in the same ad set with the same budget, then judge on hook rate first and cost per purchase second. Retire losers weekly and replace them with new reactions."),
        qa("Do these hooks work for Instagram Reels and Facebook ads?", "Yes. The formulas are platform-neutral. For Reels keep text away from the bottom fifth of the screen, where captions and buttons sit. For Facebook Feed, keep the face centred so a 4:5 crop still works."),
        qa("Can I use these hook formulas for free?", "Yes. Copy any formula or template on this page. The reaction clips shown next to them are previews from the UGCLibrary library."),
      ]} />
      <FinalCta kicker="Ready-made TikTok ad hooks" title={<>The words are free.<br />The <em>faces</em> are here.</>} sub="Pre-made UGC reaction hooks for every formula on this page." />
    </main>
  );
}
