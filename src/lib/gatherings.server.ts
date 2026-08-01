import {
  DUBLIN_GATHERING_CARD,
  DUBLIN_GATHERING_SEED,
} from "@/data/gatherings/dublin-seed";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { Gathering, GatheringCard } from "@/lib/gatherings";
import { withTimeout } from "@/lib/ssr-query";

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

export async function loadPublishedGatherings(): Promise<GatheringCard[]> {
  try {
    const { data, error } = await withTimeout(
      supabaseAdmin
        .from("gatherings")
        .select(cardCols)
        .eq("published", true)
        .order("starts_at", { ascending: true }),
    );
    if (error) {
      if (shouldUseSeedFallback(error)) return [DUBLIN_GATHERING_CARD];
      throw new Error(error.message);
    }
    const rows = (data ?? []) as GatheringCard[];
    return rows.length > 0 ? rows : [DUBLIN_GATHERING_CARD];
  } catch {
    return [DUBLIN_GATHERING_CARD];
  }
}

export async function loadNextUpcomingGathering(): Promise<GatheringCard | null> {
  try {
    const now = new Date().toISOString();
    const { data, error } = await withTimeout(
      supabaseAdmin
        .from("gatherings")
        .select(cardCols)
        .eq("published", true)
        .gte("starts_at", now)
        .order("starts_at", { ascending: true })
        .limit(1)
        .maybeSingle(),
    );
    if (error) {
      if (shouldUseSeedFallback(error)) return null;
      throw new Error(error.message);
    }
    return (data as GatheringCard | null) ?? null;
  } catch {
    return null;
  }
}

export async function loadPublishedGatheringBySlug(
  slug: string,
): Promise<Gathering | null> {
  try {
    const { data: row, error } = await withTimeout(
      supabaseAdmin
        .from("gatherings")
        .select(fullCols)
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle(),
    );
    if (error) {
      if (shouldUseSeedFallback(error)) {
        return slug === DUBLIN_GATHERING_SEED.slug ? DUBLIN_GATHERING_SEED : null;
      }
      throw new Error(error.message);
    }
    return (row as Gathering | null) ?? null;
  } catch {
    return slug === DUBLIN_GATHERING_SEED.slug ? DUBLIN_GATHERING_SEED : null;
  }
}

export async function loadGatheringBySlugForPreview(
  slug: string,
): Promise<Gathering | null> {
  try {
    const { data: row, error } = await withTimeout(
      supabaseAdmin
        .from("gatherings")
        .select(fullCols)
        .eq("slug", slug)
        .maybeSingle(),
    );
    if (error) {
      if (shouldUseSeedFallback(error)) {
        return slug === DUBLIN_GATHERING_SEED.slug ? DUBLIN_GATHERING_SEED : null;
      }
      throw new Error(error.message);
    }
    return (row as Gathering | null) ?? null;
  } catch {
    return slug === DUBLIN_GATHERING_SEED.slug ? DUBLIN_GATHERING_SEED : null;
  }
}

export async function loadRelatedGatherings(
  slug: string,
  limit = 3,
): Promise<GatheringCard[]> {
  try {
    const now = new Date().toISOString();

    const { data: upcoming, error: upErr } = await withTimeout(
      supabaseAdmin
        .from("gatherings")
        .select(cardCols)
        .eq("published", true)
        .neq("slug", slug)
        .gte("starts_at", now)
        .order("starts_at", { ascending: true })
        .limit(limit),
    );
    if (upErr) {
      if (shouldUseSeedFallback(upErr)) {
        return slug === DUBLIN_GATHERING_SEED.slug ? [] : [DUBLIN_GATHERING_CARD];
      }
      throw new Error(upErr.message);
    }

    const rows = (upcoming ?? []) as GatheringCard[];
    if (rows.length >= limit) return rows;

    const { data: past, error: pastErr } = await withTimeout(
      supabaseAdmin
        .from("gatherings")
        .select(cardCols)
        .eq("published", true)
        .neq("slug", slug)
        .lt("starts_at", now)
        .order("starts_at", { ascending: false })
        .limit(limit - rows.length),
    );
    if (pastErr) {
      if (shouldUseSeedFallback(pastErr)) return rows;
      throw new Error(pastErr.message);
    }

    return [...rows, ...((past ?? []) as GatheringCard[])];
  } catch {
    return slug === DUBLIN_GATHERING_SEED.slug ? [] : [DUBLIN_GATHERING_CARD];
  }
}

export async function loadSitemapGatherings(): Promise<
  Array<{ slug: string; updated_at: string | null; starts_at: string }>
> {
  try {
    const { data, error } = await withTimeout(
      supabaseAdmin
        .from("gatherings")
        .select("slug, updated_at, starts_at")
        .eq("published", true)
        .order("starts_at", { ascending: false }),
    );
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
}
