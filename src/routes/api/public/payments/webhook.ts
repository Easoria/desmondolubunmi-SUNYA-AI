import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { type StripeEnv, createStripeClient, verifyWebhook } from "@/lib/stripe.server";

// Statuses that should still count as "has access" for entitlement gating.
// past_due keeps access during Stripe's automatic retry window (~3 weeks)
// so a single failed renewal doesn't immediately revoke access.
const ENTITLED_STATUSES = new Set(["active", "trialing", "past_due"]);

let _supabase: any = null;
function getSupabase(): any {
  if (!_supabase) {
    _supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }
  return _supabase;
}

// Find a Supabase auth user by email, paging through admin.listUsers.
async function findUserIdByEmail(email: string): Promise<string | null> {
  const supa = getSupabase();
  const normalized = email.trim().toLowerCase();
  for (let page = 1; page <= 10; page++) {
    const { data, error } = await supa.auth.admin.listUsers({ page, perPage: 200 });
    if (error) {
      console.error("listUsers failed:", error);
      return null;
    }
    const match = data?.users?.find(
      (u: any) => (u.email || "").toLowerCase() === normalized,
    );
    if (match) return match.id;
    if (!data?.users?.length || data.users.length < 200) return null;
  }
  return null;
}

// Provision (or find) a Supabase auth user for a guest checkout, then trigger
// a password-reset email so they can set a password and sign in.
async function provisionGuestUser(email: string | null | undefined): Promise<string | null> {
  if (!email) return null;
  const supa = getSupabase();

  const existing = await findUserIdByEmail(email);
  if (existing) return existing;

  const { data, error } = await supa.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { created_via: "stripe_checkout" },
  });
  if (error || !data?.user) {
    console.error("Failed to create guest user:", error);
    // Race: another webhook may have just created them.
    return await findUserIdByEmail(email);
  }

  // Send a password-reset email so the new user can set their password.
  try {
    const redirectTo = `${process.env.SUPABASE_URL?.replace(".supabase.co", ".lovable.app") || ""}/reset-password`;
    await supa.auth.admin.generateLink({
      type: "recovery",
      email,
      options: { redirectTo },
    });
  } catch (e) {
    console.error("Failed to send recovery link:", e);
  }

  return data.user.id;
}

async function handleSubscriptionCreated(subscription: any, env: StripeEnv) {
  let userId: string | null = subscription.metadata?.userId || null;

  if (!userId) {
    // Guest checkout — look up the email on the Stripe customer and provision an account.
    try {
      const stripe = createStripeClient(env);
      const customer: any = await stripe.customers.retrieve(subscription.customer);
      const email = customer?.email || customer?.metadata?.email || null;
      userId = await provisionGuestUser(email);
      if (userId) {
        await stripe.customers.update(subscription.customer, {
          metadata: { ...(customer.metadata || {}), userId },
        });
        await stripe.subscriptions.update(subscription.id, {
          metadata: { ...(subscription.metadata || {}), userId },
        });
      }
    } catch (e) {
      console.error("Guest provisioning failed:", e);
    }
  }

  if (!userId) {
    console.error("No userId resolved for subscription", subscription.id);
    return;
  }
  const item = subscription.items?.data?.[0];
  const priceId =
    item?.price?.lookup_key ||
    item?.price?.metadata?.lovable_external_id ||
    item?.price?.id;
  const productId = item?.price?.product;
  const periodStart = item?.current_period_start ?? subscription.current_period_start;
  const periodEnd = item?.current_period_end ?? subscription.current_period_end;

  await getSupabase().from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer,
      product_id: productId,
      price_id: priceId,
      status: subscription.status,
      current_period_start: periodStart ? new Date(periodStart * 1000).toISOString() : null,
      current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      environment: env,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" },
  );

  // Also mark profile as paid for the legacy UI gating
  await getSupabase()
    .from("user_profiles")
    .update({
      subscription_status: "paid",
      subscription_start: new Date().toISOString(),
      stripe_customer_id: subscription.customer,
    })
    .eq("id", userId);
}

async function handleSubscriptionUpdated(subscription: any, env: StripeEnv) {
  const item = subscription.items?.data?.[0];
  const priceId =
    item?.price?.lookup_key ||
    item?.price?.metadata?.lovable_external_id ||
    item?.price?.id;
  const productId = item?.price?.product;
  const periodStart = item?.current_period_start ?? subscription.current_period_start;
  const periodEnd = item?.current_period_end ?? subscription.current_period_end;

  await getSupabase()
    .from("subscriptions")
    .update({
      status: subscription.status,
      product_id: productId,
      price_id: priceId,
      current_period_start: periodStart ? new Date(periodStart * 1000).toISOString() : null,
      current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      cancel_at_period_end: subscription.cancel_at_period_end || false,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id)
    .eq("environment", env);

  const userId = subscription.metadata?.userId;
  if (userId) {
    const isActive = ENTITLED_STATUSES.has(subscription.status);
    await getSupabase()
      .from("user_profiles")
      .update({ subscription_status: isActive ? "paid" : "free" })
      .eq("id", userId);
  }
}

async function handleSubscriptionDeleted(subscription: any, env: StripeEnv) {
  await getSupabase()
    .from("subscriptions")
    .update({ status: "canceled", updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", subscription.id)
    .eq("environment", env);

  const userId = subscription.metadata?.userId;
  if (userId) {
    await getSupabase()
      .from("user_profiles")
      .update({ subscription_status: "free" })
      .eq("id", userId);
  }
}

async function handleCheckoutCompleted(session: any, env: StripeEnv) {
  // One-time payments (1-on-1 sessions) — subscriptions handled via subscription.* events.
  if (session.mode !== "payment") return;

  // checkout.session.completed does NOT include line_items by default.
  // Retrieve the session with line_items expanded so we can resolve the real price.
  let priceId = "unknown";
  try {
    const stripe = createStripeClient(env);
    const full = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items.data.price"],
    });
    const item: any = (full as any).line_items?.data?.[0];
    priceId =
      item?.price?.lookup_key ||
      item?.price?.metadata?.lovable_external_id ||
      item?.price?.id ||
      "unknown";
  } catch (e) {
    console.error("Failed to expand line_items for session", session.id, e);
  }

  let userId: string | null = session.metadata?.userId || null;
  if (!userId) {
    const email = session.customer_details?.email || session.customer_email || null;
    userId = await provisionGuestUser(email);
  }

  await getSupabase().from("one_on_one_bookings").upsert(
    {
      user_id: userId,
      stripe_session_id: session.id,
      stripe_customer_id: session.customer,
      price_id: priceId,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email || session.customer_email,
      status: "paid",
      environment: env,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_session_id" },
  );
}

async function handleWebhook(req: Request, env: StripeEnv) {
  const event = await verifyWebhook(req, env);

  switch (event.type) {
    case "customer.subscription.created":
      await handleSubscriptionCreated(event.data.object, env);
      break;
    case "customer.subscription.updated":
      await handleSubscriptionUpdated(event.data.object, env);
      break;
    case "customer.subscription.deleted":
      await handleSubscriptionDeleted(event.data.object, env);
      break;
    case "checkout.session.completed":
      await handleCheckoutCompleted(event.data.object, env);
      break;
    default:
      console.log("Unhandled event:", event.type);
  }
}

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawEnv = new URL(request.url).searchParams.get("env");
        if (rawEnv !== "sandbox" && rawEnv !== "live") {
          console.error("Webhook received with invalid env:", rawEnv);
          return Response.json({ received: true, ignored: "invalid env" });
        }
        try {
          await handleWebhook(request, rawEnv);
          return Response.json({ received: true });
        } catch (e) {
          console.error("Webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});
