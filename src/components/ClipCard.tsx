"use client";
import { useEffect, useRef, useState } from "react";
import type { Clip } from "@/lib/library";
import { useOpenClip } from "./ClipModal";

const Play = () => (<svg viewBox="0 0 10 12"><path d="M0 0l10 6-10 6z" /></svg>);
const ico = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const Eye = () => (<svg {...ico}><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>);
const Heart = () => (<svg {...ico}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>);
const Bubble = () => (<svg {...ico}><path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.7A8.4 8.4 0 1 1 21 11.5z" /></svg>);
const Share = () => (<svg {...ico}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>);
const Mark = () => (<svg {...ico}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>);
const Verified = () => (<svg className="verified" viewBox="0 0 24 24"><path fill="#8b5cf6" d="M12 1l2.6 2.4 3.5-.4.9 3.4 3.1 1.7-1.4 3.3 1.4 3.3-3.1 1.7-.9 3.4-3.5-.4L12 23l-2.6-2.4-3.5.4-.9-3.4-3.1-1.7L3.3 12 1.9 8.7 5 7l.9-3.4 3.5.4z" /><path d="M8 12.3l2.6 2.6L16.2 9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>);

/** Display-only social stats, derived from the clip id so server and browser render the same numbers. */
function statsFor(id: string) {
  let h = 2166136261;
  for (const ch of id) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  const r = (n: number) => { h = Math.imul(h ^ (h >>> 15), 2246822519) >>> 0; return (h % 1000) / 1000 * n; };
  const views = 800_000 + Math.round(r(8_200_000));
  return { views, likes: Math.round(views * (0.05 + r(0.06))), comments: Math.round(views * (0.002 + r(0.003))), shares: Math.round(views * (0.01 + r(0.025))), saves: Math.round(views * (0.015 + r(0.035))) };
}
const fmt = (n: number) => (n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? (n / 1e3).toFixed(n >= 1e5 ? 0 : 1) + "K" : String(n));

/** autoplay: on desktop (mouse/trackpad, ≥900px wide) the clip plays by itself while it's on screen. Mobile keeps the poster image. */
export default function ClipCard({ clip, eager = false, autoplay = false, onOpen, children }: { clip: Clip; eager?: boolean; autoplay?: boolean; onOpen?: false | ((c: Clip) => void); children?: React.ReactNode }) {
  const open = useOpenClip();
  const st = statsFor(clip.id);
  const v = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [auto, setAuto] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [load, setLoad] = useState(false);
  const start = () => { setLoad(true); requestAnimationFrame(() => v.current?.play().then(() => setPlaying(true)).catch(() => {})); };
  const stop = () => { v.current?.pause(); setPlaying(false); };

  useEffect(() => {
    if (!autoplay || !box.current) return;
    const desktop = window.matchMedia("(min-width: 900px) and (hover: hover) and (prefers-reduced-motion: no-preference)");
    if (!desktop.matches) return;
    setAuto(true);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: "100px" });
    io.observe(box.current);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);
  return (
    <div ref={box} className={"clip" + (playing ? " playing" : "")} onMouseEnter={start} onMouseLeave={auto ? undefined : stop}
      onClick={() => onOpen === false ? undefined : (onOpen || open)(clip)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={clip.poster} alt={`${clip.character.name}, ${clip.emotion} AI UGC reaction clip`} loading={eager ? "eager" : "lazy"} />
      {load && <video ref={v} src={clip.video} muted loop playsInline preload="auto" />}
      <div className="clip-top">
        <span className="tag">{clip.emotion}</span>
        <span className="views"><Eye />{fmt(st.views)}</span>
      </div>
      <span className="play"><Play /></span>
      <div className="clip-side" aria-hidden="true">
        <span><i><Heart /></i>{fmt(st.likes)}</span>
        <span><i><Bubble /></i>{fmt(st.comments)}</span>
        <span><i><Share /></i>{fmt(st.shares)}</span>
        <span><i><Mark /></i>{fmt(st.saves)}</span>
      </div>
      <div className="clip-bot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <span className="who"><img src={clip.character.portrait} alt="" />@{clip.character.name.toLowerCase()}<Verified /></span>
      </div>
      {children}
    </div>
  );
}
