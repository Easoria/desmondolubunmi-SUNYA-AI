import { createServerFn } from "@tanstack/react-start";
import { createStripeClient } from "@/lib/stripe.server";

// One-shot helper to recreate prices as tax_behavior=inclusive on the same
// products, transferring their lookup_keys. Idempotent: prices already
// inclusive are skipped. DELETE this file after running successfully.

const TARGET_LOOKUP_KEYS = ["one_on_one_90min", "sunya_ai_founding_monthly"];

export const recreateInclusive = createServerFn({ method: "POST" })
  .inputValidator((data: { env: "sandbox" | "live" }) => data)
  .handler(async ({ data }) => {
    const stripe = createStripeClient(data.env);
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
        results.push({
          lookupKey,
          status: "already_inclusive",
          priceId: oldPrice.id,
        });
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

      await stripe.prices.update(oldPrice.id, { active: false });

      results.push({
        lookupKey,
        status: "recreated",
        oldPriceId: oldPrice.id,
        newPriceId: newPrice.id,
      });
    }

    return { ok: true, env: data.env, results };
  });
