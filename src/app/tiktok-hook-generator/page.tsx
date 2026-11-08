import type { Metadata } from "next";
import Link from "next/link";
import { LpHero, SecHead, Faq, FinalCta, qa } from "@/components/Chrome";
import HookGenerator from "@/components/HookGenerator";
import ClipStrip from "@/components/ClipStrip";
import { siteUrl } from "@/config";

export const metadata: Metadata = {
  title: "Free TikTok Hook Generator with UGC Reaction Clips",
  description: "Free TikTok hook generator. Pick your niche and an emotion to get scroll-stopping hooks for TikTok, Instagram Reels and Shorts, each paired with a matching UGC reaction clip.",
  alternates: { canonical: "/tiktok-hook-generator" },
};
const ld = { "@context": "https://schema.org", "@type": "WebApplication", name: "TikTok Hook Generator", applicationCategory: "BusinessApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, url: siteUrl + "/tiktok-hook-generator" };

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <LpHero crumb="TikTok hook generator" title={<>Free TikTok hook <em>generator.</em></>} cta={false}
        lede="Pick your niche and a feeling. Get scroll-stopping text hooks, each paired with a matching UGC reaction clip, for TikTok, Instagram Reels and Shorts." />
      <section style={{ padding: "10px 0 70px" }}><div className="wrap"><HookGenerator /></div></section>
      <section className="lp-sec"><div className="wrap">
        <SecHead label="UGC hook generator" title={<>A hook is <em>two</em> things.</>} sub="Words on screen and a face that sells them. Most hook generators stop at the words. This one shows you the line on top of a real-looking UGC reaction, so you can judge the whole first frame before you edit anything." />
        <div className="steps">
          <div className="step rv"><span className="k">01</span><h3>Generate</h3><p>Choose a niche and an emotion. Add your product and its main result to make the lines specific.</p></div>
          <div className="step rv"><span className="k">02</span><h3>Pick the pair</h3><p>Keep the hook whose text and reaction feel like one moment. Shuffle until one makes you stop.</p></div>
          <div className="step rv"><span className="k">03</span><h3>Edit and test</h3><p>Get the clip, add the line as a caption, cut to your demo. Ship three to five versions and compare.</p></div>
        </div>
      </div></section>
      <section className="lp-sec"><div className="wrap">
        <SecHead label="TikTok ad hook library" title={<>Want 100+ hooks <em>at once?</em></>} sub={<>See the <Link href="/viral-video-hooks" style={{ textDecoration: "underline" }}>12 viral hook formulas</Link> with examples, or get every reaction in the library.</>} />
        <ClipStrip variant="row" limit={8} style={{ paddingLeft: 0 }} />
      </div></section>
      <Faq items={[
        qa("Is the TikTok hook generator free?", "Yes, completely. No account is needed to generate hooks or copy them. The reaction clips under the hooks come with the library."),
        qa("Does it work as an Instagram hook generator too?", "Yes. The hooks are written for short-form video in general, so they work for Instagram Reels, YouTube Shorts and Facebook video ads as well as TikTok. Keep the on-screen text under about 10 words so it reads in the first second."),
        qa("How do I use a generated hook?", "Put the hook text on screen in the first frame, over a reaction clip whose emotion matches the line. Hold it for 2–3 seconds, then cut to your product. Make three to five versions with different hooks and the same demo, and let your ad platform show you the winner."),
        qa("What's the difference between a UGC hook and a regular hook?", "A UGC hook looks like it was filmed by a normal person on their phone, not a brand. Pairing a native-looking face with a short text hook is what makes the opening feel like content instead of an ad."),
      ]} />
      <FinalCta kicker="TikTok hook generator" title={<>Great line. Now give it<br />a <em>face.</em></>} />
    </main>
  );
}
