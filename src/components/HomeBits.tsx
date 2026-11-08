"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import { PREVIEW, library } from "@/lib/library";
import ClipCard from "./ClipCard";

export function Reel() {
  const list = [...PREVIEW, ...PREVIEW]; // two copies = seamless loop; second half of the track repeats the first
  return (
    <div className="reel" aria-label="Clip previews">
      <div className="reel-track">{[...list, ...list].map((c, i) => <ClipCard key={c.id + i} clip={c} eager autoplay />)}</div>
    </div>
  );
}

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

export function IndexList() {
  const [peek, setPeek] = useState<{ src: string; x: number; y: number } | null>(null);
  const all = library.shelves;
  const main = all.filter(([e, n]) => e !== "candid" && n >= 10);
  const rest = all.filter(([e, n]) => e !== "candid" && n < 10);
  const candid = all.find(([e]) => e === "candid");
  const rows: { emos: string[]; label: React.ReactNode; n: number }[] = [
    ...main.map(([e, n]) => ({ emos: [e], label: cap(e), n })),
    ...(rest.length ? [{ emos: rest.map((r) => r[0]), label: <><span className="it">and</span> {rest.map((r) => r[0]).join(", ")}</>, n: rest.reduce((a, r) => a + r[1], 0) }] : []),
    ...(candid ? [{ emos: ["candid"], label: <>Candid <span className="it" style={{ color: "var(--muted)" }}>— everyday moments</span></>, n: candid[1] }] : []),
  ];
  return (
    <>
      <div className="index-list rv">
        {rows.map((r, i) => {
          const p = PREVIEW.filter((c) => r.emos.includes(c.emotion));
          return (
            <Link key={i} href="/#pricing" className="index-row"
              onMouseEnter={(e) => p.length && setPeek({ src: p[Math.floor(Math.random() * p.length)].poster, x: e.clientX, y: e.clientY })}
              onMouseMove={(e) => peek && setPeek({ ...peek, x: e.clientX, y: e.clientY })}
              onMouseLeave={() => setPeek(null)}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span><span className="t">{r.label}</span>
              <span className="c">{r.n} {r.n === 1 ? "clip" : "clips"}</span><span className="a">→</span>
            </Link>
          );
        })}
      </div>
      <div className={"peek" + (peek ? " on" : "")} style={peek ? { left: peek.x + 110, top: peek.y } : undefined}>
        {peek && <img src={peek.src} alt="" />}
      </div>
    </>
  );
}
