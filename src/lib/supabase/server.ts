import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_URL, SUPABASE_KEY, authEnabled } from "./env";

export async function supabaseServer() {
  const store = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => { try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* called from a server component: the proxy refreshes cookies */ } },
    },
  });
}

export type SessionUser = { id: string; email: string };

/** The signed-in user, or null (also null when accounts aren't configured). */
export async function currentUser(): Promise<SessionUser | null> {
  if (!authEnabled()) return null;
  const { data } = await (await supabaseServer()).auth.getUser();
  return data.user?.email ? { id: data.user.id, email: data.user.email.toLowerCase() } : null;
}
