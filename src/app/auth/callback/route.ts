import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
const safe = (n: string | null) => (n && n.startsWith("/") && !n.startsWith("//") ? n : "/account");

// Google sign-in and email magic links both come back here.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const next = safe(url.searchParams.get("next"));
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const supabase = await supabaseServer();
  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : tokenHash && type
      ? await supabase.auth.verifyOtp({ token_hash: tokenHash, type })
      : { error: new Error("missing code") };
  if (error) return NextResponse.redirect(`${url.origin}/login?error=1&next=${encodeURIComponent(next)}`, 303);
  return NextResponse.redirect(`${url.origin}${next}`, 303);
}
