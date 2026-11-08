import { NextResponse } from "next/server";
import { siteUrl } from "@/config";
import { createCheckoutUrl } from "@/lib/stripe";
import { currentUser } from "@/lib/supabase/server";
import { authEnabled } from "@/lib/supabase/env";
import { ownsLibrary } from "@/lib/db";

export const dynamic = "force-dynamic";
const originOf = (req: Request) => (process.env.NEXT_PUBLIC_SITE_URL ? siteUrl : new URL(req.url).origin);

// The buy buttons link here: sign in first, skip checkout if already bought, otherwise open Stripe Checkout.
export async function GET(req: Request) {
  const origin = originOf(req);
  try {
    const user = await currentUser();
    if (authEnabled() && !user) return NextResponse.redirect(`${origin}/login?next=/api/checkout`, 303);
    const owns = user ? await ownsLibrary(user.id, user.email).catch((e) => { console.error("[checkout] purchase lookup failed:", e instanceof Error ? e.message : e); return false; }) : false;
    if (owns) return NextResponse.redirect(`${origin}/account`, 303);
    return NextResponse.redirect(await createCheckoutUrl(origin, user), 303);
  } catch (e) {
    console.error("[checkout] could not start Stripe checkout:", e instanceof Error ? e.message : e);
    return NextResponse.redirect(`${origin}/#pricing`, 303);
  }
}
export const POST = GET;
