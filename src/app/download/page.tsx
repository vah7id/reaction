import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { stripe, stripeEnabled, savePaidSession } from "@/lib/stripe";
import { authEnabled } from "@/lib/supabase/env";
import { config } from "@/config";
import { library } from "@/lib/library";

export const metadata: Metadata = { title: "Your download", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

async function isPaid(sessionId?: string) {
  if (!stripeEnabled() || !sessionId) return { paid: false, email: undefined as string | undefined };
  try {
    const s = await stripe().checkout.sessions.retrieve(sessionId);
    // Save it here too, in case the webhook hasn't arrived yet (safe to run twice).
    const email = await savePaidSession(s).catch((e) => { console.error(e); return s.payment_status === "paid" ? s.customer_details?.email ?? undefined : null; });
    return { paid: !!email, email: email ?? undefined };
  } catch {
    return { paid: false, email: undefined };
  }
}

export default async function Download({ searchParams }: { searchParams: Promise<{ session_id?: string; demo?: string }> }) {
  const sp = await searchParams;
  const demo = !process.env.STRIPE_SECRET_KEY && sp.demo === "1";
  const { paid, email } = demo ? { paid: true, email: undefined } : await isPaid(sp.session_id);
  // With accounts on, the library lives on /account (download again any time).
  if (paid && !demo && authEnabled()) redirect("/account?welcome=1");
  const link = demo ? process.env.PACK_DOWNLOAD_URL : `/api/download?session_id=${encodeURIComponent(sp.session_id ?? "")}`;

  if (!paid) {
    return (
      <main className="dl">
        <span className="mono muted">Download</span>
        <h1>We couldn&apos;t find <em>that order.</em></h1>
        <p className="muted">This page needs the link from your checkout. If you paid and landed here by mistake, email <a href={`mailto:${config.supportEmail}`} style={{ textDecoration: "underline" }}>{config.supportEmail}</a> and we&apos;ll send your download.</p>
        <p style={{ marginTop: 26 }}><Link href="/#pricing" className="btn btn-ink">See pricing <span className="arrow">→</span></Link></p>
      </main>
    );
  }
  return (
    <main className="dl">
      <span className="mono muted">Payment received{email ? ` · ${email}` : ""}</span>
      <h1>The library <em>is yours.</em></h1>
      <p className="muted">All {library.totalClips} AI UGC reaction clips from {library.totalCharacters} characters, as original vertical MP4s, sorted into folders by character with the emotion in each file name.</p>
      {config.manualDelivery && !demo ? (
        <div className="panel">
          <p><b>Your pack will be sent to your email.</b></p>
          <p className="muted">We&apos;ll email the download to {email ? <b>{email}</b> : "the email you used at checkout"} within {config.deliveryTime}. Check your spam folder too. Nothing after {config.deliveryTime}? Email <a href={`mailto:${config.supportEmail}`} style={{ textDecoration: "underline" }}>{config.supportEmail}</a>.</p>
        </div>
      ) : (
      <div className="panel">
        {link
          ? <a className="btn btn-accent btn-block" href={link}>Download the full pack <span className="arrow">↓</span></a>
          : <p className="muted">Download link not configured yet. Set <code>PACK_DOWNLOAD_URL</code> in your Vercel environment variables.</p>}
        <p className="fine">Keep this page open until your download finishes.</p>
        {demo && <p className="demo-note"><b>Demo mode.</b> Add <code>STRIPE_SECRET_KEY</code> to take real payments; this page then only opens after a paid checkout.</p>}
      </div>
      )}
      <p className="muted" style={{ fontSize: 14, marginTop: 22 }}>Commercial-use license: paid ads, organic posts, websites and client work. No resale or redistribution of the raw clips. Questions or refunds within {config.refundDays} days: <a href={`mailto:${config.supportEmail}`} style={{ textDecoration: "underline" }}>{config.supportEmail}</a></p>
    </main>
  );
}
