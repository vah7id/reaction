import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { currentUser } from "@/lib/supabase/server";
import { authEnabled, SUPABASE_URL } from "@/lib/supabase/env";
import { ownsLibrary } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { r2Enabled, r2SignedUrl } from "@/lib/r2";
import { config } from "@/config";

export const dynamic = "force-dynamic";

/** Only buyers get the pack: a private Cloudflare R2 (or Supabase Storage) link that expires in 1 hour. */
export async function GET(req: Request) {
  const origin = new URL(req.url).origin;
  // Manual delivery: the pack is emailed by hand, so never hand out a link here.
  if (config.manualDelivery) return NextResponse.redirect(`${origin}/account`, 303);
  if (authEnabled()) {
    const user = await currentUser();
    if (!user) return NextResponse.redirect(`${origin}/login?next=/account`, 303);
    if (!(await ownsLibrary(user.id, user.email))) return NextResponse.redirect(`${origin}/account`, 303);
  } else if (process.env.STRIPE_SECRET_KEY) {
    // No accounts configured: the paid Checkout session is the proof of purchase.
    const id = new URL(req.url).searchParams.get("session_id");
    const s = id ? await stripe().checkout.sessions.retrieve(id).catch(() => null) : null;
    if (s?.payment_status !== "paid") return NextResponse.redirect(`${origin}/download`, 303);
  }
  if (r2Enabled()) return NextResponse.redirect(await r2SignedUrl(3600), 303);
  const file = process.env.SUPABASE_PACK_PATH; // e.g. "library/ugclibrary.zip" (bucket/path)
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  if (file && service && SUPABASE_URL) {
    const [bucket, ...rest] = file.split("/");
    const { data, error } = await createClient(SUPABASE_URL, service).storage.from(bucket).createSignedUrl(rest.join("/"), 3600, { download: true });
    if (data?.signedUrl) return NextResponse.redirect(data.signedUrl, 303);
    console.error(error);
  }
  if (process.env.PACK_DOWNLOAD_URL) return NextResponse.redirect(process.env.PACK_DOWNLOAD_URL, 303);
  return NextResponse.redirect(`${origin}/account?missing=1`, 303);
}
