import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { config, price } from "@/config";
import { library } from "@/lib/library";
import { currentUser } from "@/lib/supabase/server";
import { authEnabled } from "@/lib/supabase/env";
import { ownsLibrary } from "@/lib/db";

export const metadata: Metadata = { title: "Your account", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Account({ searchParams }: { searchParams: Promise<{ welcome?: string; missing?: string }> }) {
  const sp = await searchParams;
  if (!authEnabled()) redirect("/login");
  const user = await currentUser();
  if (!user) redirect("/login?next=/account");
  const owns = await ownsLibrary(user.id, user.email);
  const mail = <a href={`mailto:${config.supportEmail}`} style={{ textDecoration: "underline" }}>{config.supportEmail}</a>;

  return (
    <main className="dl">
      <span className="mono muted">{user.email}</span>
      {owns ? (
        <>
          <h1>{sp.welcome ? <>The library <em>is yours.</em></> : <>Your <em>library.</em></>}</h1>
          <p className="muted">All {library.totalClips} AI UGC reaction clips from {library.totalCharacters} characters, as original vertical MP4s, sorted into folders by character with the emotion in each file name.</p>
          <div className="panel">
            <a className="btn btn-accent btn-block" href="/api/download">Download the full pack <span className="arrow">↓</span></a>
            {sp.missing && <p className="fine" style={{ color: "var(--accent)" }}>The download isn&apos;t available right now. Email {mail} and we&apos;ll send it.</p>}
            <p className="fine">Log in here any time to download again.</p>
          </div>
          <p className="muted" style={{ fontSize: 14, marginTop: 22 }}>Commercial-use license: paid ads, organic posts, websites and client work. No resale or redistribution of the raw clips. Questions or refunds within {config.refundDays} days: {mail}</p>
        </>
      ) : (
        <>
          <h1>No library <em>yet.</em></h1>
          <p className="muted">This account hasn&apos;t bought the library. If you paid with a different email, log in with the Google account for that email, or email {mail}.</p>
          <div className="panel"><a className="btn btn-ink btn-block" href="/api/checkout">Get all {library.totalClips} clips · ${price} <span className="arrow">→</span></a></div>
        </>
      )}
      <form action="/auth/signout" method="post" style={{ marginTop: 26 }}><button className="btn btn-line btn-sm">Log out</button></form>
      <p style={{ marginTop: 12 }}><Link href="/" className="muted" style={{ fontSize: 14 }}>← Back to the site</Link></p>
    </main>
  );
}
