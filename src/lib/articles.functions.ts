// Public-facing article reads using supabaseAdmin so SSR/prerender
// works without a user session. All handlers explicitly scope to
// `published = true` — RLS is bypassed by service role, so the WHERE
// clause is the only gate.
import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type PublishedArticleCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image_url: string | null;
  reading_time_minutes: number | null;
  tags: string[];
  published_at: string | null;
};

export type PublishedArticleFull = PublishedArticleCard & {
  meta_description: string | null;
  content: string;
};

const cardCols =
  "id, slug, title, excerpt, featured_image_url, reading_time_minutes, tags, published_at";

function isPermissionError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return (
    error.code === "42501" ||
    /permission denied/i.test(error.message ?? "") ||
    /is_blog_admin/i.test(error.message ?? "")
  );
}

export const listPublishedArticles = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublishedArticleCard[]> => {
    try {
      const { data, error } = await supabaseAdmin
        .from("articles")
        .select(cardCols)
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false });
      if (error) {
        if (isPermissionError(error)) return [];
        throw new Error(error.message);
      }
      return (data ?? []) as PublishedArticleCard[];
    } catch {
      return [];
    }
  },
);

export const getPublishedArticleBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }): Promise<PublishedArticleFull | null> => {
    try {
      const { data: row, error } = await supabaseAdmin
        .from("articles")
        .select(
          "id, slug, title, meta_description, excerpt, content, featured_image_url, reading_time_minutes, tags, published_at",
        )
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