import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { authEnabled } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";
const safe = (n: string | null) => (n && n.startsWith("/") && !n.startsWith("//") ? n : "/account");

// Starts Google login on the server, so it works the same on every (mobile) browser:
// the PKCE verifier is stored in a cookie here and read back in /auth/callback.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const next = safe(url.searchParams.get("next"));
  if (!authEnabled()) return NextResponse.redirect(`${url.origin}/login`, 303);
  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${url.origin}/auth/callback?next=${encodeURIComponent(next)}`, skipBrowserRedirect: true },
  });
  if (error || !data.url) {
    console.error("[auth/google] could not start Google login:", error?.message);
    return NextResponse.redirect(`${url.origin}/login?error=${encodeURIComponent(error?.message ?? "Could not open Google")}&next=${encodeURIComponent(next)}`, 303);
  }
  return NextResponse.redirect(data.url, 303);
}
