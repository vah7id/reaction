"use client";
import { previewFor } from "@/lib/library";
import ClipCard from "./ClipCard";

/** A row or grid of preview clips, optionally filtered by emotion. */
export default function ClipStrip({ emotions = [], limit = 8, skip = 0, variant = "grid", style }: { emotions?: string[]; limit?: number; skip?: number; variant?: "row" | "grid" | "single"; style?: React.CSSProperties }) {
  const list = previewFor(emotions);
  const n = Math.min(limit, list.length);
  const items = Array.from({ length: n }, (_, i) => list[(skip + i) % list.length]);
  const cls = variant === "row" ? "clip-row" : variant === "grid" ? "clip-grid" : "";
  return <div className={cls} style={style}>{items.map((c, i) => <ClipCard key={c.id + i} clip={c} />)}</div>;
}
