"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/client";

const on = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY));

/** "Log in" or "Account" in the nav. Checked in the browser so every page stays static. */
export default function AccountLink() {
  const [inAcc, setIn] = useState(false);
  useEffect(() => {
    if (!on) return;
    supabaseBrowser().auth.getSession().then(({ data }) => setIn(!!data.session));
  }, []);
  if (!on) return null;
  return <Link href={inAcc ? "/account" : "/login"} className="nav-login">{inAcc ? "Account" : "Log in"}</Link>;
}
