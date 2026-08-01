import { supabase } from "@/integrations/supabase/client";
import { DUBLIN_GATHERING_CARD } from "@/data/gatherings/dublin-seed";
import type { GatheringCard } from "@/lib/gatherings";

const cardCols =
  "id, slug, title, subtitle, format, starts_at, ends_at, timezone, venue_name, city, platform, price_label, featured_image_url";

/** Browser-side published gatherings read (anon RLS). Fast from the user's network. */
export async function fetchPublishedGatheringsClient(): Promise<GatheringCard[]> {
  try {
    const { data, error } = await supabase
      .from("gatherings")
      .select(cardCols)
      .eq("published", true)
      .order("starts_at", { ascending: true });
    if (error) return [DUBLIN_GATHERING_CARD];
    const rows = (data ?? []) as GatheringCard[];
    return rows.length > 0 ? rows : [DUBLIN_GATHERING_CARD];
  } catch {
    return [DUBLIN_GATHERING_CARD];
  }
}

export async function fetchNextUpcomingGatheringClient(): Promise<GatheringCard | null> {
  try {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("gatherings")
      .select(cardCols)
      .eq("published", true)
      .gte("starts_at", now)
      .order("starts_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (error) return null;
    return (data as GatheringCard | null) ?? null;
  } catch {
    return null;
  }
}
