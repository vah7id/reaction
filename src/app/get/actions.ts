"use server";
import { saveRequest } from "@/lib/db";

export type RequestState = { ok: boolean; email?: string; already?: boolean; error?: string };

export async function requestLibrary(_: RequestState, fd: FormData): Promise<RequestState> {
  const email = String(fd.get("email") || "").trim().toLowerCase();
  if (String(fd.get("company") || "")) return { ok: true, email }; // honeypot: bots fill hidden fields
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 200) return { ok: false, error: "Please enter a valid email address." };
  try {
    const { isNew } = await saveRequest(email, null, "form");
    return { ok: true, email, already: !isNew };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Something went wrong. Please try again or email us." };
  }
}
