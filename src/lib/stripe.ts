import Stripe from "stripe";
import { price } from "@/config";
import { library } from "@/lib/library";
import { recordPurchase } from "@/lib/db";

export const stripeEnabled = () => !!process.env.STRIPE_SECRET_KEY;
export const stripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!);

/** Create a Stripe Checkout session for a signed-in buyer and return its URL (demo URL when Stripe isn't configured). */
export async function createCheckoutUrl(origin: string, user: { id: string; email: string } | null): Promise<string> {
  if (!stripeEnabled()) return `${origin}/download?demo=1`;
  const session = await stripe().checkout.sessions.create({
    mode: "payment",
    line_items: [
      process.env.STRIPE_PRICE_ID
        ? { price: process.env.STRIPE_PRICE_ID, quantity: 1 }
        : {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: price * 100,
              product_data: { name: "ReactionUGC — full library", description: `${library.totalClips} AI UGC reaction clips, commercial-use license` },
            },
          },
    ],
    allow_promotion_codes: true,
    customer_creation: "always",
    ...(user ? { customer_email: user.email, client_reference_id: user.id, metadata: { user_id: user.id } } : {}),
    success_url: `${origin}/download?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/#pricing`,
  });
  if (!session.url) throw new Error("Stripe did not return a checkout URL");
  return session.url;
}

/** Save a paid Checkout session as a purchase. Returns the buyer email, or null if it isn't paid. */
export async function savePaidSession(s: Stripe.Checkout.Session): Promise<string | null> {
  if (s.payment_status !== "paid") return null;
  const email = s.customer_details?.email ?? s.customer_email;
  if (!email) return null;
  await recordPurchase({
    sessionId: s.id,
    userId: s.client_reference_id ?? s.metadata?.user_id ?? null,
    email,
    amount: s.amount_total,
    currency: s.currency,
    paymentIntent: typeof s.payment_intent === "string" ? s.payment_intent : s.payment_intent?.id ?? null,
  });
  return email;
}

/** Fallback when the database is unavailable: is there a paid, unrefunded Checkout session for this buyer in Stripe? */
export async function paidInStripe(_userId: string, email: string): Promise<boolean> {
  if (!stripeEnabled()) return false;
  const sessions = await stripe().checkout.sessions.list({ customer_details: { email: email.toLowerCase() }, status: "complete", limit: 20, expand: ["data.payment_intent.latest_charge"] });
  const found = sessions.data.find((s) => {
    if (s.payment_status !== "paid") return false;
    const pi = s.payment_intent;
    const charge = pi && typeof pi !== "string" ? pi.latest_charge : null;
    return !(charge && typeof charge !== "string" && charge.refunded);
  });
  if (!found) return false;
  // Save it so the next lookup (and /admin) finds it in the database. Ignore failures: Stripe already confirmed it.
  await savePaidSession(found).catch((e) => console.error("[stripe] could not backfill purchase:", e instanceof Error ? e.message : e));
  return true;
}
