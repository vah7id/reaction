import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { currentUser } from "@/lib/supabase/server";
import { authEnabled } from "@/lib/supabase/env";
import { library } from "@/lib/library";
import { price } from "@/config";

export const metadata: Metadata = { title: "Log in", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const safe = (n?: string) => (n && n.startsWith("/") && !n.startsWith("//") ? n : "/account");

export default async function Login({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const sp = await searchParams;
  const next = safe(sp.next);
  if (await currentUser()) redirect(next);
  const buying = next === "/api/checkout";
  return (
    <main className="dl">
      <span className="mono muted">{buying ? "Step 1 of 2 · Account" : "Your account"}</span>
      <h1>{buying ? <>Log in, <em>then pay.</em></> : <>Welcome <em>back.</em></>}</h1>
      <p className="muted">{buying
        ? `Your account keeps the ${library.totalClips} clips ready to download again any time. Next step is the $${price} Stripe checkout.`
        : "Log in to download the library you bought."}</p>
      {authEnabled()
        ? <LoginForm next={next} error={sp.error} />
        : <div className="panel"><p className="demo-note" style={{ marginTop: 0 }}><b>Accounts are not set up yet.</b> Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to turn on Google login.</p></div>}
    </main>
  );
}
