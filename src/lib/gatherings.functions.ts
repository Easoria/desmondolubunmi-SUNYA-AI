import { createServerFn } from "@tanstack/react-start";
import {
  DUBLIN_GATHERING_CARD,
  DUBLIN_GATHERING_SEED,
} from "@/data/gatherings/dublin-seed";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { Gathering, GatheringCard } from "@/lib/gatherings";

const cardCols =
  "id, slug, title, subtitle, format, starts_at, ends_at, timezone, venue_name, city, platform, price_label, featured_image_url";

const fullCols = "*";

/** Table missing / schema not yet migrated — treat as empty, not fatal. */
function isMissingRelation(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return (
    error.code === "PGRST205" ||
    error.code === "42P01" ||
    /could not find the table/i.test(error.message ?? "") ||
    /relation .* does not exist/i.test(error.message ?? "")
  );
}

/** RLS / privilege failures when service role is missing or mis-set. */
function isPermissionError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return (
    error.code === "42501" ||
    /permission denied/i.test(error.message ?? "") ||
    /is_blog_admin/i.test(error.message ?? "")
  );
}

function shouldUseSeedFallback(
  error: { code?: string; message?: string } | null,
): boolean {
  return isMissingRelation(error) || isPermissionError(error);
}

export const listPublishedGatherings = createServerFn({ method: "GET" }).handler(
  async (): Promise<GatheringCard[]> => {
    try {
      const { data, error } = await supabaseAdmin
        .from("gatherings")
        .select(cardCols)
        .eq("published", true)
        .order("starts_at", { ascending: true });
      if (error) {
        if (shouldUseSeedFallback(error)) return [DUBLIN_GATHERING_CARD];
        throw new Error(error.message);
      }
      return (data ?? []) as GatheringCard[];
    } catch {
      return [DUBLIN_GATHERING_CARD];
    }
  },
);

export const getNextUpcomingGathering = createServerFn({ method: "GET" }).handler(
  async (): Promise<GatheringCard | null> => {
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabaseAdmin
        .from("gatherings")
        .select(cardCols)
        .eq("published", true)
        .gte("starts_at", now)
        .order("starts_at", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (error) {
        if (shouldUseSeedFallback(error)) return null;
        throw new Error(error.message);
      }
      return (data as GatheringCard | null) ?? null;
    } catch {
      return null;
    }
  },
);

export const getPublishedGatheringBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }): Promise<Gathering | null> => {
    try {
      const { data: row, error } = await supabaseAdmin
        .from("gatherings")
        .select(fullCols)
        .eq("slug", data.slug)
        .eq("published", true)
        .maybeSingle();
      if (error) {
        if (shouldUseSeedFallback(error)) {
          return data.slug === DUBLIN_GATHERING_SEED.slug
            ? DUBLIN_GATHERING_SEED
            : null;
        }
        throw new Error(error.message);
      }
      return (row as Gathering | null) ?? null;
    } catch {
      return data.slug === DUBLIN_GATHERING_SEED.slug ? DUBLIN_GATHERING_SEED : null;
    }
  });

export const getGatheringBySlugForPreview = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }): Promise<Gathering | null> => {
    try {
      const { data: row, error } = await supabaseAdmin
        .from("gatherings")
        .select(fullCols)
        .eq("slug", data.slug)
        .maybeSingle();
      if (error) {
        if (shouldUseSeedFallback(error)) {
          return data.slug === DUBLIN_GATHERING_SEED.slug
            ? DUBLIN_GATHERING_SEED
            : null;
        }
        throw new Error(error.message);
      }
      return (row as Gathering | null) ?? null;
    } catch {
      return data.slug === DUBLIN_GATHERING_SEED.slug ? DUBLIN_GATHERING_SEED : null;
    }
  });

export const listRelatedGatherings = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string; limit?: number }) => d)
  .handler(async ({ data }): Promise<GatheringCard[]> => {
    try {
      const now = new Date().toISOString();
      const limit = data.limit ?? 3;

      const { data: upcoming, error: upErr } = await supabaseAdmin
        .from("gatherings")
        .select(cardCols)
        .eq("published", true)
        .neq("slug", data.slug)
        .gte("starts_at", now)
        .order("starts_at", { ascending: true })
        .limit(limit);
      if (upErr) {
        if (shouldUseSeedFallback(upErr)) {
          return data.slug === DUBLIN_GATHERING_SEED.slug ? [] : [DUBLIN_GATHERING_CARD];
        }
        throw new Error(upErr.message);
      }

      const rows = (upcoming ?? []) as GatheringCard[];
      if (rows.length >= limit) return rows;

      const { data: past, error: pastErr } = await supabaseAdmin
        .from("gatherings")
        .select(cardCols)
        .eq("published", true)
        .neq("slug", data.slug)
        .lt("starts_at", now)
        .order("starts_at", { ascending: false })
        .limit(limit - rows.length);
      if (pastErr) {
        if (shouldUseSeedFallback(pastErr)) return rows;
        throw new Error(pastErr.message);
      }

      return [...rows, ...((past ?? []) as GatheringCard[])];
    } catch {
      return data.slug === DUBLIN_GATHERING_SEED.slug ? [] : [DUBLIN_GATHERING_CARD];
    }
  });

export const listSitemapGatherings = createServerFn({ method: "GET" }).handler(
  async (): Promise<Array<{ slug: string; updated_at: string | null; starts_at: string }>> => {
    try {
      const { data, error } = await supabaseAdmin
        .from("gatherings")
        .select("slug, updated_at, starts_at")
        .eq("published", true)
        .order("starts_at", { ascending: false });
      if (error) {
        if (shouldUseSeedFallback(error)) {
          return [
            {
              slug: DUBLIN_GATHERING_SEED.slug,
              updated_at: DUBLIN_GATHERING_SEED.updated_at,
              starts_at: DUBLIN_GATHERING_SEED.starts_at,
            },
          ];
        }
        throw new Error(error.message);
      }
      return data ?? [];
    } catch {
      return [
        {
          slug: DUBLIN_GATHERING_SEED.slug,
          updated_at: DUBLIN_GATHERING_SEED.updated_at,
          starts_at: DUBLIN_GATHERING_SEED.starts_at,
        },
      ];
    }
  },
);
