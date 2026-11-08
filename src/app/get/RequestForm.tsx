"use client";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { requestLibrary, type RequestState } from "./actions";
import { config } from "@/config";

export default function RequestForm() {
  const [state, action, pending] = useActionState<RequestState, FormData>(requestLibrary, { ok: false });
  const [open, setOpen] = useState(false);
  useEffect(() => { if (state.ok) setOpen(true); }, [state]);

  return (
    <>
      <form action={action} className="panel">
        <label className="field"><span>Email</span>
          <input className="input" name="email" type="email" required placeholder="you@company.com" autoComplete="email" autoFocus />
        </label>
        <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999, opacity: 0 }} />
        <button className="btn btn-ink btn-block" disabled={pending}>{pending ? "Sending…" : <>Send me the library <span className="arrow">→</span></>}</button>
        {state.error && <p className="fine" style={{ color: "var(--accent)" }}>{state.error}</p>}
      </form>

      {open && (
        <div className="scrim on" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="sheet-wrap">
            <div className="sheet checkout" role="dialog" aria-modal="true" style={{ textAlign: "center" }}>
              <div className="env">✉</div>
              <h3>{state.already ? <>You&apos;re already <em>on the list.</em></> : <>We&apos;ll send you <em>an email.</em></>}</h3>
              <p className="muted">We&apos;ll email the full ReactionUGC library to <b style={{ color: "var(--ink)" }}>{state.email}</b>, usually within 24 hours. Keep an eye on your spam folder too.</p>
              <div style={{ display: "grid", gap: 10, marginTop: 22 }}>
                <Link href="/" className="btn btn-ink" onClick={() => setOpen(false)}>Back to the site</Link>
                <button className="btn btn-line" onClick={() => setOpen(false)}>Close</button>
              </div>
              <p className="fine">Questions? {config.supportEmail}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
