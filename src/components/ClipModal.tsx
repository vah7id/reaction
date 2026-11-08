"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Clip } from "@/lib/library";
import { library, pad } from "@/lib/library";
import { price } from "@/config";
import CheckoutButton from "./CheckoutButton";

const Ctx = createContext<(c: Clip) => void>(() => {});
export const useOpenClip = () => useContext(Ctx);

export default function ClipModalProvider({ children }: { children: React.ReactNode }) {
  const [clip, setClip] = useState<Clip | null>(null);
  const close = useCallback(() => setClip(null), []);
  useEffect(() => {
    document.body.style.overflow = clip ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [clip, close]);

  return (
    <Ctx.Provider value={setClip}>
      {children}
      {clip && (
        <div className="scrim on" onClick={(e) => e.target === e.currentTarget && close()}>
          <div className="sheet-wrap">
            <div className="sheet">
              <div className="player">
                <video src={clip.video} poster={clip.poster} autoPlay loop muted playsInline controls controlsList="nodownload" disablePictureInPicture />
                <div className="wm">Preview · UGCLibrary</div>
              </div>
              <div className="info">
                <button className="x" onClick={close} aria-label="Close">×</button>
                <span className="mono muted">No.{pad(clip.no)} · {clip.emotion}</span>
                <h3>{clip.character.name}, <em>{clip.emotion}</em></h3>
                <div className="kv">
                  <div><span>Character</span><span>@{clip.character.name.toLowerCase()} · {clip.character.age}</span></div>
                  <div><span>Based in</span><span>{clip.character.country}</span></div>
                  <div><span>Shelf</span><span style={{ textTransform: "capitalize" }}>{clip.emotion}</span></div>
                  <div><span>Format</span><span>Vertical 9:16 · MP4</span></div>
                  <div><span>License</span><span>Commercial use</span></div>
                </div>
                <div className="actions">
                  <CheckoutButton className="btn btn-accent">Get all {library.totalClips} clips · ${price}</CheckoutButton>
                  <p className="fine" style={{ marginTop: 2 }}>One payment. Every original download.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
