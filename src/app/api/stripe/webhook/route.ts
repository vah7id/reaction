import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, savePaidSession } from "@/lib/stripe";
import { markRefunded } from "@/lib/db";

export const dynamic = "force-dynamic";

// Stripe → Developers → Webhooks → endpoint https://YOUR_DOMAIN/api/stripe/webhook
// Events: checkout.session.completed, checkout.session.async_payment_succeeded, charge.refunded
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!process.env.STRIPE_SECRET_KEY || !secret) return NextResponse.json({ error: "Stripe webhook not configured" }, { status: 500 });
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(body, req.headers.get("stripe-signature") ?? "", secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await savePaidSession(event.data.object);
        break;
      case "charge.refunded": {
        const pi = event.data.object.payment_intent;
        if (pi) await markRefunded(typeof pi === "string" ? pi : pi.id);
        break;
      }
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not save" }, { status: 500 }); // Stripe retries
  }
  return NextResponse.json({ received: true });
}
