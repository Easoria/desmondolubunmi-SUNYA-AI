import { createFileRoute } from "@tanstack/react-router";
import { createStripeClient } from "@/lib/stripe.server";

// One-shot admin route: recreates prices with tax_behavior=inclusive on the
// same products and transfers their lookup_keys. Safe to re-run (idempotent:
// if the active price is already inclusive, it skips).
//
// Auth: requires ?secret=<ADMIN_SETUP_SECRET>
//
// DELETE THIS FILE after running successfully.

const TARGET_LOOKUP_KEYS = [
  "one_on_one_90min",
  "sunya_ai_founding_monthly",
];

const ONE_TIME_TOKEN = "f61ad91a5c13d7bed45b194407ef5305c4d78a036b1b6c38";

export const Route = createFileRoute("/api/public/admin/recreate-inclusive")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const secret = url.searchParams.get("secret");
        const env = (url.searchParams.get("env") || "sandbox") as "sandbox" | "live";
        if (secret !== ONE_TIME_TOKEN) {
          return new Response("Unauthorized", { status: 401 });
        }

        const stripe = createStripeClient(env);
        const results: any[] = [];

        for (const lookupKey of TARGET_LOOKUP_KEYS) {
          const existing = await stripe.prices.list({
            lookup_keys: [lookupKey],
            limit: 1,
          });
          if (!existing.data.length) {
            results.push({ lookupKey, status: "not_found" });
            continue;
          }
          const oldPrice = existing.data[0];
          if (oldPrice.tax_behavior === "inclusive") {
            results.push({ lookupKey, status: "already_inclusive", priceId: oldPrice.id });
            continue;
          }

          const productId =
            typeof oldPrice.product === "string"
              ? oldPrice.product
              : oldPrice.product.id;

          const newPrice = await stripe.prices.create({
            product: productId,
            unit_amount: oldPrice.unit_amount!,
            currency: oldPrice.currency,
            tax_behavior: "inclusive",
            lookup_key: lookupKey,
            transfer_lookup_key: true,
            ...(oldPrice.recurring && {
              recurring: {
                interval: oldPrice.recurring.interval,
                interval_count: oldPrice.recurring.interval_count,
              },
            }),
          });

          // Deactivate the old exclusive price so it can't be used.
          await stripe.prices.update(oldPrice.id, { active: false });

          results.push({
            lookupKey,
            status: "recreated",
            oldPriceId: oldPrice.id,
            newPriceId: newPrice.id,
          });
        }

        return new Response(JSON.stringify({ ok: true, env, results }, null, 2), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
