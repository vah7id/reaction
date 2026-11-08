import type { Metadata } from "next";
import Link from "next/link";
import { LpHero, Faq, FinalCta, qa } from "@/components/Chrome";
import ClipStrip from "@/components/ClipStrip";

export const metadata: Metadata = {
  title: "How to Make a Reaction Video for TikTok & Reels Ads (No Filming)",
  description: "How to make a reaction video in 10 minutes: choose a reaction clip, write the hook, cut to your product demo and export for TikTok, Reels and Shorts. Includes a CapCut walkthrough.",
  alternates: { canonical: "/how-to-make-a-reaction-video" },
};

const ld = { "@context": "https://schema.org", "@type": "Article", headline: "How to make a reaction video (without filming one)", author: { "@type": "Organization", name: "UGCLibrary" }, publisher: { "@type": "Organization", name: "UGCLibrary" }, datePublished: "2026-11-07" };

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <LpHero crumb="How to make a reaction video" title={<>How to make a reaction video <em>(without filming one).</em></>} cta={false}
        lede="A step-by-step guide to making reaction videos for TikTok, Reels and Shorts ads: picking the reaction, writing the hook, cutting to your demo and testing what works." />
      <section style={{ padding: "20px 0 40px" }}><div className="wrap">
        <div className="article">
          <nav className="toc"><span className="mono muted">On this page</span><a href="#s1">1. Pick the job of the video</a><a href="#s2">2. Choose the reaction</a><a href="#s3">3. Trim the hook</a><a href="#s4">4. Write the caption</a><a href="#s5">5. Cut to your demo</a><a href="#s6">6. Export and test</a><a href="#capcut">CapCut walkthrough</a><a href="#maker">Maker or ready-made?</a></nav>
          <div className="prose">
            <p>A reaction video for ads is simple: someone reacts, the viewer wonders why, and your product answers. Here&apos;s how to make one in about ten minutes, with no filming.</p>
            <div className="callout"><strong>Short version:</strong> 3 seconds of reaction + a 6-word caption + your product demo, exported at 1080×1920.</div>
            <h2 id="s1">1. Decide what the video has to do</h2>
            <p>One video, one job. Show a surprising result? Name a problem? Announce a price? The job decides the emotion. A reveal wants <strong>surprised</strong>, a price wants <strong>shocked</strong>, a problem wants <strong>confused</strong>, an outcome wants <strong>happy</strong>.</p>
            <h2 id="s2">2. Choose the reaction</h2>
            <p>Pick a reaction clip whose face already tells the story. Match the person to your audience as well: age, style and setting matter more than you&apos;d expect. In the <Link href="/#pricing">UGCLibrary library</Link> every clip is sorted by emotion, so this takes a minute.</p>
            <ClipStrip variant="row" limit={6} style={{ padding: "6px 0 10px" }} />
            <h2 id="s3">3. Trim the hook to 2–5 seconds</h2>
            <p>Start on the frame where the reaction is already happening, not before it. Cut as soon as the expression peaks. If in doubt, shorter wins.</p>
            <h2 id="s4">4. Write the caption</h2>
            <p>Put one short line in the upper-middle of the frame, away from the bottom where the platform&apos;s buttons sit. Under ten words. Need ideas? Use the <Link href="/tiktok-hook-generator">free TikTok hook generator</Link> or steal from <Link href="/viral-video-hooks">12 viral hook formulas</Link>.</p>
            <h2 id="s5">5. Cut to your demo</h2>
            <p>Hard-cut from the reaction straight into a screen recording, product shot or before/after. No transition, no logo intro. The cut itself is the payoff. End with the result and one clear call to action.</p>
            <h2 id="s6">6. Export and test</h2>
            <p>Export at 1080×1920, 30 fps, MP4. Then make three to five versions that differ only in the first three seconds and run them side by side. Keep the winner, replace the rest.</p>
            <h2 id="capcut">Making a reaction video in CapCut</h2>
            <ol>
              <li>New project, set the canvas to <strong>9:16</strong>.</li>
              <li>Import the reaction MP4 and your demo clip; put the reaction first.</li>
              <li>Split the reaction at 3 seconds and delete the rest.</li>
              <li><strong>Text → Add text</strong>, type your hook and choose a white background style for readability.</li>
              <li>Add your demo, then music or a voiceover, then export at 1080p.</li>
            </ol>
            <p>CapCut templates work too: drop the reaction clip into the first slot of any &quot;hook + demo&quot; template.</p>
            <h2 id="maker">Reaction video maker or ready-made clips?</h2>
            <p>A reaction video maker (an editor or an AI avatar tool) gives you the tools, but someone still has to deliver a believable reaction. Filming yourself is free but you only have one face. Hiring creators is believable but slow and costly per variation. <strong>Ready-made reaction clips</strong> sit in between: believable faces, many emotions, ready now. That&apos;s what UGCLibrary is.</p>
          </div>
        </div>
      </div></section>
      <Faq items={[
        qa("How long should a reaction hook be?", "Two to five seconds. Long enough for the face and the text to register, short enough that the product arrives before attention drops."),
        qa("What's the best reaction video maker?", "Any editor that handles vertical video works: CapCut (free, with templates), InShot, Premiere Pro or Final Cut Pro. The harder part is the reaction itself, which is why ready-made reaction clips save the most time."),
        qa("Do I need to film myself?", "No. You can film your own reaction, hire a UGC creator, or use ready-made AI UGC reaction clips. Filming yourself is free but slow to vary. Ready-made clips let you test many faces and emotions quickly."),
        qa("What resolution should I export?", "1080×1920 (9:16) at 30 fps, H.264 MP4. That's accepted by TikTok, Instagram, YouTube Shorts, Meta and Google ads."),
      ]} />
      <FinalCta kicker="Reaction clips for editing" title={<>Skip the filming.<br />Start with the <em>reaction.</em></>} />
    </main>
  );
}
