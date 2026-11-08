// UGCLibrary settings — edit these, then redeploy.
export const config = {
  brand: "UGCLibrary",
  supportEmail: "support@ugclibrary.com",

  // Price ladder: the price rises as spots sell out.
  priceSteps: [29, 49, 79, 99],
  currentStep: 0, // index into priceSteps
  spotsLeft: 19, // spots left at the current price

  refundDays: 7,

  // "email": buyers sign in and leave their email; you send the library yourself (no Stripe yet).
  // "stripe": buy buttons open Stripe Checkout (needs STRIPE_SECRET_KEY).
  purchaseMode: "stripe" as "email" | "stripe",

  // Preview clips that can be downloaded free on the B-roll page (ids from src/data/library.json).
  freeSamples: ["valentina_laughing_1", "nadia_shocked_1", "elif_happy_1"],
};

export const price = config.priceSteps[config.currentStep];
export const nextPrice = config.priceSteps[config.currentStep + 1];
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://ugclibrary.com").replace(/\/$/, "");
