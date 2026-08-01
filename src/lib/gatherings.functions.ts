import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { Gathering, GatheringCard } from "@/lib/gatherings";

const cardCols =
  "id, slug, title, subtitle, format, starts_at, ends_at, timezone, venue_name, city, platform, price_label, featured_image_url";

const fullCols = "*";

export const listPublishedGatherings = createServerFn({ method: "GET" }).handler(
  async (): Promise<GatheringCard[]> => {
    const { data, error } = await supabaseAdmin
      .from("gatherings")
      .select(cardCols)
      .eq("published", true)
      .order("starts_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as GatheringCard[];
  },
);

export const getNextUpcomingGathering = createServerFn({ method: "GET" }).handler(
  async (): Promise<GatheringCard | null> => {
    const now = new Date().toISOString();
    const { data, error } = await supabaseAdmin
      .from("gatherings")
      .select(cardCols)
      .eq("published", true)
      .gte("starts_at", now)
      .order("starts_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (data as GatheringCard | null) ?? null;
  },
);

export const getPublishedGatheringBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }): Promise<Gathering | null> => {
    const { data: row, error } = await supabaseAdmin
      .from("gatherings")
      .select(fullCols)
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row as Gathering | null) ?? null;
  });

export const getGatheringBySlugForPreview = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }): Promise<Gathering | null> => {
    const { data: row, error } = await supabaseAdmin
      .from("gatherings")
      .select(fullCols)
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row as Gathering | null) ?? null;
  });

export const listRelatedGatherings = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string; limit?: number }) => d)
  .handler(async ({ data }): Promise<GatheringCard[]> => {
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
    if (upErr) throw new Error(upErr.message);

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
    if (pastErr) throw new Error(pastErr.message);

    return [...rows, ...((past ?? []) as GatheringCard[])];
  });

export const listSitemapGatherings = createServerFn({ method: "GET" }).handler(
  async (): Promise<Array<{ slug: string; updated_at: string | null; starts_at: string }>> => {
    const { data, error } = await supabaseAdmin
      .from("gatherings")
      .select("slug, updated_at, starts_at")
      .eq("published", true)
      .order("starts_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  },
);
