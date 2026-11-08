"use client";
import { config } from "@/config";
import { PREVIEW } from "@/lib/library";
import ClipCard from "./ClipCard";

export default function FreeSamples() {
  const list = config.freeSamples.map((id) => PREVIEW.find((c) => c.id === id)).filter(Boolean) as typeof PREVIEW;
  return (
    <div className="clip-grid rv" style={{ maxWidth: 640 }}>
      {list.map((c) => (
        <div className="sample" key={c.id}>
          <ClipCard clip={c} onOpen={false} />
          <a className="btn btn-ink btn-sm btn-block" href={c.video} download={`reactionugc-free-${c.emotion}-${c.character.name.toLowerCase()}.mp4`}>Download free · {c.emotion}</a>
        </div>
      ))}
    </div>
  );
}
