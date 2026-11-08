/* eslint-disable @next/next/no-img-element */
import type { Character } from "@/lib/library";
export default function PersonCard({ c }: { c: Character }) {
  return (
    <div className="person">
      <div className="ph"><img src={c.portrait} alt={`${c.name}, AI UGC creator`} loading="lazy" /></div>
      <div className="nm">{c.name} <span>{c.clips}</span></div>
      <div className="ct">{c.age} · {c.country}</div>
    </div>
  );
}
