import { loadStripe, type Stripe } from "@stripe/stripe-js";

type StripeEnv = "sandbox" | "live";

const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;
const liveFoundingPriceId = "price_1TZroE3t1ZeJXXaM4LvCjzAJ";
const sandboxFoundingPriceId = "price_1TZqzP3t1ZeJXXaM0BrNZjv9";

export const SUNYA_FOUNDING_PRICE_ID = getStripeEnvironment() === "live"
  ? liveFoundingPriceId
  : sandboxFoundingPriceId;

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    if (!clientToken) throw new Error("VITE_PAYMENTS_CLIENT_TOKEN is not set");
    stripePromise = loadStripe(clientToken);
  }
  return stripePromise;
}

export function getStripeEnvironment(): StripeEnv {
  return clientToken?.startsWith("pk_live_") ? "live" : "sandbox";
}
