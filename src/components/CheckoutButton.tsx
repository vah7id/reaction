import Link from "next/link";
import { config } from "@/config";

/** The single buy CTA. Stripe mode: /api/checkout (log in → Stripe Checkout). Email mode: /get. */
export default function CheckoutButton({ className = "btn btn-ink", children }: { className?: string; children: React.ReactNode }) {
  if (config.purchaseMode === "email") return <Link href="/get" className={className}>{children}</Link>;
  return <a href="/api/checkout" className={className} rel="nofollow">{children}</a>;
}
