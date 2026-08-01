// Public-facing article reads using supabaseAdmin so SSR/prerender
// works without a user session. Published handlers scope to
// `published = true` — RLS is bypassed by service role, so the WHERE
// clause is the only gate. Preview fetch is intentionally open for
// draft preview URLs (`?preview=1`) on this personal site.
import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { WritingCategory } from "@/lib/writing";

export type PublishedArticleCard = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  featured_image_url: string | null;
  reading_time_minutes: number | null;
  category: WritingCategory | null;
  tags: string[];
  published_at: string | null;
};

export type PublishedArticleFull = PublishedArticleCard & {
  meta_description: string | null;
  content: string;
  published: boolean;
};

const cardCols =
  "id, slug, title, subtitle, excerpt, featured_image_url, reading_time_minutes, category, tags, published_at";

const fullCols =
  "id, slug, title, subtitle, meta_description, excerpt, content, featured_image_url, reading_time_minutes, category, tags, published, published_at";

function isPermissionError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return (
    error.code === "42501" ||
    /permission denied/i.test(error.message ?? "") ||
    /is_blog_admin/i.test(error.message ?? "")
  );
}

export const listPublishedArticles = createServerFn({ method: "GET" })
  .inputValidator((d?: { category?: WritingCategory }) => d ?? {})
  .handler(async ({ data }): Promise<PublishedArticleCard[]> => {
    try {
      let query = supabaseAdmin
        .from("articles")
        .select(cardCols)
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false });

      if (data?.category) {
        query = query.eq("category", data.category);
      }

      const { data: rows, error } = await query;
      if (error) {
        if (isPermissionError(error)) return [];
        throw new Error(error.message);
      }
      return (rows ?? []) as PublishedArticleCard[];
    } catch {
      return [];
    }
  });

export const getPublishedArticleBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }): Promise<PublishedArticleFull | null> => {
    try {
      const { data: row, error } = await supabaseAdmin
        .from("articles")
        .select(fullCols)
        .eq("slug", data.slug)
        .eq("published", true)
        .maybeSingle();
      if (error) {
        if (isPermissionError(error)) return null;
        throw new Error(error.message);
      }
      return (row as PublishedArticleFull | null) ?? null;
    } catch {
      return null;
    }
  });

/** Load any article by slug for draft preview (`?preview=1`). */
export const getArticleBySlugForPreview = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }): Promise<PublishedArticleFull | null> => {
    try {
      const { data: row, error } = await supabaseAdmin
        .from("articles")
        .select(fullCols)
        .eq("slug", data.slug)
        .maybeSingle();
      if (error) {
        if (isPermissionError(error)) return null;
        throw new Error(error.message);
      }
      return (row as PublishedArticleFull | null) ?? null;
    } catch {
      return null;
    }
  });

export const listRelatedArticles = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string; category: WritingCategory; limit?: number }) => d)
  .handler(async ({ data }): Promise<PublishedArticleCard[]> => {
    try {
      const { data: rows, error } = await supabaseAdmin
        .from("articles")
        .select(cardCols)
        .eq("published", true)
        .eq("category", data.category)
        .neq("slug", data.slug)
        .order("published_at", { ascending: false, nullsFirst: false })
        .limit(data.limit ?? 3);
      if (error) {
        if (isPermissionError(error)) return [];
        throw new Error(error.message);
      }
      return (rows ?? []) as PublishedArticleCard[];
    } catch {
      return [];
    }
  });

export const listSitemapArticles = createServerFn({ method: "GET" }).handler(
  async (): Promise<Array<{ slug: string; published_at: string | null }>> => {
    try {
      const { data, error } = await supabaseAdmin
        .from("articles")
        .select("slug, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) {
        if (isPermissionError(error)) return [];
        throw new Error(error.message);
      }
      return data ?? [];
    } catch {
      return [];
    }
  },
);
