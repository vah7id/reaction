import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_KEY, authEnabled } from "@/lib/supabase/env";

// Keeps the Supabase login session fresh on the pages that need it.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  if (!authEnabled()) return response;
  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  await supabase.auth.getUser();
  return response;
}

export const config = { matcher: ["/account/:path*", "/login", "/download", "/api/checkout", "/api/download", "/admin"] };
