import type { Metadata } from "next";
import { LpHero, SecHead, Faq, FinalCta, qa } from "@/components/Chrome";
import ClipStrip from "@/components/ClipStrip";
import FreeSamples from "@/components/FreeSamples";

export const metadata: Metadata = {
  title: "Free Reaction B-Roll: Vertical Reaction Clips for Reels & TikTok",
  description: "Free B-roll footage of real-looking reactions. Download three free vertical reaction B-roll clips for Reels, TikTok and Shorts, then get the full library of surprised, shocked and laughing cutaways.",
  alternates: { canonical: "/b-roll-reaction-clips" },
};

export default function Page() {
  return (
    <main>
      <LpHero crumb="Reaction B-roll" title={<>B-roll footage, but it&apos;s <em>faces.</em></>}
        lede="Vertical reaction B-roll for Reels, TikTok and Shorts: surprised, shocked, laughing and confused cutaways that look like real phone footage. Three free clips below, the full library inside." />
      <section className="lp-sec"><div className="wrap">
        <SecHead label="Free B-roll" title={<>Three free clips. <em>No sign-up.</em></>} sub="Download them, drop them into your timeline, see how they cut. Free for personal and commercial use." />
        <FreeSamples />
      </div></section>
      <section className="lp-sec"><div className="wrap">
        <SecHead label="Vertical reaction B-roll for Reels" title={<>Every emotion an <em>edit</em> needs.</>} sub="Sorted by feeling, so you can find the cutaway in seconds instead of scrubbing stock sites." />
        <ClipStrip limit={8} skip={3} />
      </div></section>
      <section className="lp-sec"><div className="wrap">
        <SecHead label="Stock reaction videos vs. UGCLibrary" title={<>Made for <em>social,</em> not slideshows.</>} />
        <div className="table-wrap rv"><table className="compare"><tbody>
          <tr><th></th><th>Typical stock reaction footage</th><th>Meme clips</th><th>UGCLibrary</th></tr>
          <tr><td>Orientation</td><td>Horizontal 16:9</td><td>Mixed, often low-res</td><td className="us">Vertical 9:16 originals</td></tr>
          <tr><td>Look</td><td>Studio-lit, staged</td><td>Recognisable, overused</td><td className="us">Phone-style, natural</td></tr>
          <tr><td>License</td><td>Per clip</td><td>Usually none</td><td className="us">Commercial use, whole library</td></tr>
          <tr><td>Find by emotion</td><td>Keyword guessing</td><td>No</td><td className="us">Sorted by emotion</td></tr>
        </tbody></table></div>
      </div></section>
      <Faq items={[
        qa("Is this free B-roll footage?", "Three sample clips are free to download right here, with no account, for personal and commercial projects. The full library of reaction B-roll is a one-time payment."),
        qa("What is reaction B-roll?", "Short cutaway shots of a person reacting: surprised, laughing, confused, impressed. Editors drop them between main shots to add emotion, punctuate a moment, or open a video with a hook."),
        qa("Is it vertical B-roll for Reels and TikTok?", "Yes. Every clip is shot vertical 9:16, so it fills the screen on Reels, TikTok and Shorts without cropping. For a 16:9 edit, place it as a picture-in-picture or crop to the face."),
        qa("Can I use the clips like meme clips?", "Yes, in the same way: a quick reaction cut in after a punchline or a reveal. The difference is licensing: these are original AI-generated clips with a commercial license, not footage lifted from TV or other creators."),
        qa("How is this different from stock reaction videos?", "Stock reaction footage is usually horizontal, overlit and obviously staged. These clips are vertical, phone-style and made to look like user-generated content, so they sit naturally in social media videos."),
      ]} />
      <FinalCta kicker="Reaction clips for editing" title={<>Your next cutaway<br />is <em>already shot.</em></>} />
    </main>
  );
}
