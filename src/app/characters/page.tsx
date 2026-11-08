import type { Metadata } from "next";
import { LpHero, Faq, FinalCta, qa } from "@/components/Chrome";
import PersonCard from "@/components/PersonCard";
import { CHARACTERS, library } from "@/lib/library";

export const metadata: Metadata = {
  title: `AI UGC Creators: ${library.totalCharacters} AI Characters for UGC Reaction Videos`,
  description: `Meet the AI UGC creators behind UGCLibrary's reaction clips: ${library.totalCharacters} AI characters across ages, looks and countries, ready for TikTok, Reels and Meta ad hooks.`,
  alternates: { canonical: "/characters" },
};

export default function Page() {
  const more = library.totalCharacters - CHARACTERS.length;
  return (
    <main>
      <LpHero crumb="AI characters" title={<>{library.totalCharacters} AI UGC creators. <em>Pick a face.</em></>}
        lede="A preview of the UGCLibrary cast, with each character's age, country and number of reaction clips. The full pack includes every character." />
      <section style={{ padding: "10px 0 90px" }}><div className="wrap">
        <div className="clip-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))" }}>
          {CHARACTERS.map((c) => <PersonCard key={c.id} c={c} />)}
          <div className="more-cast"><div><b>+{more}</b>more AI characters in the full pack</div></div>
        </div>
      </div></section>
      <Faq items={[
        qa("Are the UGC characters real people?", "No. Every character is an AI UGC creator: generated faces with their own age, look and home country. None of them are real customers, influencers or testimonials."),
        qa("How many characters are in the pack?", `${library.totalCharacters} AI characters and ${library.totalClips} reaction clips. This page previews ${CHARACTERS.length} of them; the rest are in the download.`),
        qa("Can I pick clips by character?", "Yes. The download is organised into a folder per character, with the emotion in every file name, so you can build several ads around the same face."),
      ]} />
      <FinalCta kicker="The cast" title={<>Found your <em>face?</em></>} />
    </main>
  );
}
