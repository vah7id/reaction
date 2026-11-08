export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
/** Accounts are on once the Supabase URL + public key are set. Without them the site runs in demo mode (no login). */
export const authEnabled = () => !!(SUPABASE_URL && SUPABASE_KEY);
