"use client";
import { useMemo, useState } from "react";
import { PREVIEW } from "@/lib/library";
import ClipCard from "./ClipCard";

const N: Record<string, [string, string, string]> = {
  "Mobile app": ["this app", "finally stuck to a habit for 30 days", "iPhone users"],
  Fitness: ["this fitness app", "lost 6 kg without a gym", "people who hate the gym"],
  Finance: ["this budgeting app", "saved $400 in my first month", "anyone who's broke by the 20th"],
  Dating: ["this dating app", "got more matches in a week than all last year", "single people over 25"],
  "AI tool": ["this AI tool", "finished a full day of work before lunch", "freelancers"],
  SaaS: ["this tool", "cut our weekly reporting from 4 hours to 20 minutes", "small teams"],
  "E-commerce": ["this product", "made my morning routine 10 minutes shorter", "busy parents"],
  Beauty: ["this serum", "stopped hiding under concealer", "anyone with dry skin"],
  "Mobile game": ["this game", "stayed up until 3am again", "puzzle fans"],
  Education: ["this language app", "had my first real conversation in Spanish", "adult learners"],
};
const T: Record<string, string[]> = {
  surprised: ["Wait… I {w} with {p}?", "Nobody told me {p} could do this.", "I tried {p} as a joke. Then I {w}.", "Okay, I did NOT expect {p} to work."],
  shocked: ["I can't believe I {w}.", "Why is nobody talking about {p}?", "{A}, stop scrolling.", "This should be illegal: I {w}."],
  confused: ["Why didn't anyone tell {a} about {p}?", "How is {p} not more famous?", "I've been doing it wrong this whole time…", "Explain to me how I {w}."],
  happy: ["POV: you just {w}.", "Best decision I made this month: {p}.", "{A}, this one's for you.", "Small win: I {w}."],
  amazed: ["What happened when I used {p} for 7 days.", "I {w}. Here's exactly how.", "Okay, {p} is kind of genius.", "Day 1 vs day 30 with {p}."],
  laughing: ["Me explaining to my friends how I {w}", "My friends laughed at {p}. Then I {w}.", "Not me finally using {p}…", "The face I make when I remember I {w}"],
};

export default function HookGenerator() {
  const [niche, setNiche] = useState("Mobile app");
  const [prod, setProd] = useState("");
  const [win, setWin] = useState("");
  const [emo, setEmo] = useState("surprised");
  const [seed, setSeed] = useState(0);
  const hooks = useMemo(() => {
    const [dp, dw, da] = N[niche];
    const p = prod.trim() || dp, w = win.trim().replace(/^i\s+/i, "") || dw;
    const fill = (t: string) => t.replace("{p}", p).replace("{w}", w).replace("{a}", da).replace("{A}", /^[a-z][A-Z]/.test(da) ? da : da[0].toUpperCase() + da.slice(1));
    // rotate by seed (deterministic, so server and browser render the same thing)
    const shuffle = <X,>(a: X[]) => a.length ? a.map((_, i) => a[(i + seed) % a.length]) : a;
    const clips = [...shuffle(PREVIEW.filter((c) => c.emotion === emo)), ...shuffle(PREVIEW.filter((c) => c.emotion !== emo))];
    return T[emo].map((t, i) => ({ text: fill(t), clip: clips[i % clips.length] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [niche, prod, win, emo, seed]);

  return (
    <div className="gen">
      <form className="gen-form" onSubmit={(e) => { e.preventDefault(); setSeed(seed + 1); }}>
        <label htmlFor="niche">Your niche</label>
        <select id="niche" value={niche} onChange={(e) => setNiche(e.target.value)}>{Object.keys(N).map((k) => <option key={k}>{k}</option>)}</select>
        <label htmlFor="prod">Product (optional)</label>
        <input id="prod" placeholder="e.g. Fitly" value={prod} onChange={(e) => setProd(e.target.value)} />
        <label htmlFor="win">Main result for the user (optional)</label>
        <input id="win" placeholder="e.g. lost 6 kg without a gym" value={win} onChange={(e) => setWin(e.target.value)} />
        <label>Feeling</label>
        <div className="emo-pick">{Object.keys(T).map((e) => <button type="button" key={e} className={"chip" + (e === emo ? " on" : "")} onClick={() => setEmo(e)}>{e}</button>)}</div>
        <button className="btn btn-accent btn-block" style={{ marginTop: 20 }}>Generate hooks</button>
        <p className="fine">Free · no sign-up</p>
      </form>
      <div className="gen-out">
        {hooks.map((h, i) => (
          <div className="hook-card" key={i}>
            <ClipCard clip={h.clip}><div className="cap"><span>{h.text}</span></div></ClipCard>
            <div className="txt"><span>{h.text}</span><button type="button" onClick={() => navigator.clipboard?.writeText(h.text)}>Copy</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
