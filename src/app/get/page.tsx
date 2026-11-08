import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { config } from "@/config";
import { price } from "@/config";
import { library } from "@/lib/library";
import RequestForm from "./RequestForm";

export const metadata: Metadata = { title: "Get the library", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function GetLibrary() {
  if (config.purchaseMode === "stripe") redirect("/api/checkout");
  return (
    <main className="dl" style={{ maxWidth: 460 }}>
      <span className="mono muted">Get the library · ${price}</span>
      <h1>Get <em>every clip.</em></h1>
      <p className="muted">All {library.totalClips} AI UGC reaction clips from {library.totalCharacters} characters. Leave your email and we&apos;ll send you the full library.</p>
      <RequestForm />
      <p className="fine" style={{ marginTop: 16 }}>We only use your email to send you the library.</p>
    </main>
  );
}
