import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
const safe = (n: string | null) => (n && n.startsWith("/") && !n.startsWith("//") ? n : "/account");

// Google sign-in comes back here (email magic links would too, if turned on later).
export async function GET(req: Request) {
  const url = new URL(req.url);
  const next = safe(url.searchParams.get("next"));
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  // Supabase/Google can send the error back instead of a code (e.g. redirect URL not allowed, user cancelled).
  const sent = url.searchParams.get("error_description") || url.searchParams.get("error");
  const supabase = await supabaseServer();
  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : tokenHash && type
      ? await supabase.auth.verifyOtp({ token_hash: tokenHash, type })
      : { error: new Error(sent || "missing code") };
  if (error) {
    console.error("[auth/callback] login failed:", error.message, { hasCode: !!code });
    return NextResponse.redirect(`${url.origin}/login?error=${encodeURIComponent(error.message.slice(0, 200))}&next=${encodeURIComponent(next)}`, 303);
  }
  return NextResponse.redirect(`${url.origin}${next}`, 303);
}
