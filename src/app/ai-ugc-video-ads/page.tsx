import type { Metadata } from "next";
import { LpHero, SecHead, Faq, FinalCta, qa } from "@/components/Chrome";
import ClipStrip from "@/components/ClipStrip";
import Link from "next/link";
import { library } from "@/lib/library";

export const metadata: Metadata = {
  title: "AI UGC Video Ads: Ready-Made AI UGC Reaction Videos",
  description: "Ready-made AI UGC video ads. A library of AI UGC reaction videos from AI creators, ready to open TikTok, Reels, YouTube Shorts and Google ads. No generator, no prompts, one payment.",
  alternates: { canonical: "/ai-ugc-video-ads" },
};

export default function Page() {
  return (
    <main>
      <LpHero crumb="AI UGC video ads" title={<>AI UGC video ads that open with a <em>reaction.</em></>}
        lede="Skip the AI UGC video generator queue. UGCLibrary is a library of finished AI UGC videos: real-looking reactions from AI creators, ready to open your TikTok, Reels, Shorts and Google ads." />
      <ClipStrip variant="row" emotions={["shocked", "surprised", "amazed"]} limit={8} />
      <section className="lp-sec"><div className="wrap">
        <SecHead label="AI UGC reaction videos" title={<>Finished clips, <em>not</em> prompts.</>}
          sub={<>AI UGC ads live or die in the first three seconds. Generators give you a face that talks; reaction clips give you a face that <b>reacts</b>, which is the part that stops a thumb mid-scroll.</>} />
        <div className="table-wrap rv"><table className="compare"><tbody>
          <tr><th></th><th>AI UGC video generator</th><th>Human UGC creator</th><th>UGCLibrary</th></tr>
          <tr><td>Time to first ad</td><td>Hours of prompting and re-rolls</td><td>1–3 weeks per brief</td><td className="us">Minutes: download, edit, post</td></tr>
          <tr><td>Cost</td><td>Monthly subscription + credits</td><td>$100–$300+ per video</td><td className="us">One payment for the whole library</td></tr>
          <tr><td>Reactions that look natural</td><td>Hit or miss</td><td>Yes</td><td className="us">Yes, checked before they go in</td></tr>
          <tr><td>Hooks to test per week</td><td>Limited by credits</td><td>Limited by budget</td><td className="us">As many as you can edit</td></tr>
          <tr><td>Commercial use</td><td>Depends on plan</td><td>Negotiated per creator</td><td className="us">Included</td></tr>
        </tbody></table></div>
      </div></section>
      <section className="lp-sec"><div className="wrap">
        <SecHead label="AI creator hook videos" title={<>{library.totalCharacters} AI UGC creators, <em>one license.</em></>}
          sub="Every AI UGC creator in the library has their own face, age, style and home country, so you can match the hook to the audience you're buying." />
        <ClipStrip emotions={["happy", "excited", "laughing"]} limit={8} />
      </div></section>
      <section className="lp-sec"><div className="wrap">
        <SecHead label="Where it runs" title={<>One clip, <em>every</em> placement.</>} />
        <div className="beats rv">
          <div className="beat"><span className="mono muted">TikTok & Reels</span><h3>AI UGC ads for social</h3><ol><li><b>0–3s</b>Reaction clip, caption on top</li><li><b>3–12s</b>Product demo or screen recording</li><li><b>12–15s</b>Offer and call to action</li></ol></div>
          <div className="beat"><span className="mono muted">Google Ads</span><h3>UGC video for YouTube Shorts</h3><ol><li><b>Format</b>9:16 vertical, under 60 seconds</li><li><b>Hook</b>Reaction in the first second, before any logo</li><li><b>Tip</b>Upload several hook variations and let the campaign test them</li></ol></div>
          <div className="beat"><span className="mono muted">Meta</span><h3>Facebook & Instagram ads</h3><ol><li><b>Format</b>9:16 for Stories and Reels, 4:5 crop for Feed</li><li><b>Hook</b>Keep the face in the centre so both crops work</li><li><b>Test</b>Same demo, 3–5 different reactions</li></ol></div>
        </div>
      </div></section>
      <Faq items={[
        qa("Do AI UGC ads work for e-commerce?", "They can, and the reaction format suits e-commerce well: a surprised or delighted face opens the ad, then the product does the convincing. The reaction earns the first seconds; your product shots, offer and price still have to close the sale. Test several AI UGC reaction hooks in front of the same product video to find the one your audience responds to."),
        qa("Is UGCLibrary an AI UGC video generator?", "No, it's the step after the generator. Instead of writing prompts, waiting for renders and re-rolling until a face looks natural, you pick from AI UGC videos that are already made, checked and sorted by emotion. Download the MP4 and edit it like any other footage."),
        qa("Can I use AI UGC videos in Google Ads?", "Yes. The clips are vertical 9:16 MP4s, which work for YouTube Shorts placements in Google Ads campaigns as well as TikTok, Instagram Reels and Facebook. The commercial-use license covers paid ads on any platform."),
        qa("Do I need to label AI UGC ads?", "Possibly. TikTok, Meta and Google each have rules for realistic AI-generated content in ads, and they change often. Check each platform's current advertising policy and use its AI-content label wherever it's required. Never present an AI character as a real customer or a real review."),
        { q: "Is there a free AI UGC video I can try?", text: "Yes. You can download three free sample clips on the reaction B-roll page to test in your editor first.", a: <>Yes. You can download three free sample clips on the <Link href="/b-roll-reaction-clips" style={{ textDecoration: "underline" }}>reaction B-roll page</Link> to test in your editor first.</> },
      ]} />
      <FinalCta kicker="AI UGC video ads" title={<>Your next AI UGC ad<br />starts with a <em>face.</em></>} />
    </main>
  );
}
