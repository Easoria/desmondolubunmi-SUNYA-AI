import { supabase } from "@/integrations/supabase/client";
import type { PublishedArticleCard } from "@/lib/articles.functions";
import type { WritingCategory } from "@/lib/writing";

const cardCols =
  "id, slug, title, subtitle, excerpt, featured_image_url, reading_time_minutes, category, tags, published_at";

/** Browser-side published articles read (anon RLS). Fast from the user's network. */
export async function fetchPublishedArticlesClient(opts?: {
  category?: WritingCategory;
}): Promise<PublishedArticleCard[]> {
  try {
    let query = supabase
      .from("articles")
      .select(cardCols)
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false });

    if (opts?.category) {
      query = query.eq("category", opts.category);
    }

    const { data, error } = await query;
    if (error) return [];
    return (data ?? []) as PublishedArticleCard[];
  } catch {
    return [];
  }
}
