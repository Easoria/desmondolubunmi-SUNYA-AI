import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { WritingCategory } from "@/lib/writing";
import { withTimeout } from "@/lib/ssr-query";

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

function isPermissionError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return (
    error.code === "42501" ||
    /permission denied/i.test(error.message ?? "") ||
    /is_blog_admin/i.test(error.message ?? "")
  );
}

const cardCols =
  "id, slug, title, subtitle, excerpt, featured_image_url, reading_time_minutes, category, tags, published_at";

const fullCols =
  "id, slug, title, subtitle, meta_description, excerpt, content, featured_image_url, reading_time_minutes, category, tags, published, published_at";

export async function loadPublishedArticles(opts?: {
  category?: WritingCategory;
}): Promise<PublishedArticleCard[]> {
  try {
    let query = supabaseAdmin
      .from("articles")
      .select(cardCols)
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false });

    if (opts?.category) {
      query = query.eq("category", opts.category);
    }

    const { data: rows, error } = await withTimeout(query);
    if (error) {
      if (isPermissionError(error)) return [];
      throw new Error(error.message);
    }
    return (rows ?? []) as PublishedArticleCard[];
  } catch {
    return [];
  }
}

export async function loadPublishedArticleBySlug(
  slug: string,
): Promise<PublishedArticleFull | null> {
  try {
    const { data: row, error } = await withTimeout(
      supabaseAdmin
        .from("articles")
        .select(fullCols)
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle(),
    );
    if (error) {
      if (isPermissionError(error)) return null;
      throw new Error(error.message);
    }
    return (row as PublishedArticleFull | null) ?? null;
  } catch {
    return null;
  }
}

export async function loadArticleBySlugForPreview(
  slug: string,
): Promise<PublishedArticleFull | null> {
  try {
    const { data: row, error } = await withTimeout(
      supabaseAdmin
        .from("articles")
        .select(fullCols)
        .eq("slug", slug)
        .maybeSingle(),
    );
    if (error) {
      if (isPermissionError(error)) return null;
      throw new Error(error.message);
    }
    return (row as PublishedArticleFull | null) ?? null;
  } catch {
    return null;
  }
}

export async function loadRelatedArticles(
  slug: string,
  category: WritingCategory,
  limit = 3,
): Promise<PublishedArticleCard[]> {
  try {
    const { data: rows, error } = await withTimeout(
      supabaseAdmin
        .from("articles")
        .select(cardCols)
        .eq("published", true)
        .eq("category", category)
        .neq("slug", slug)
        .order("published_at", { ascending: false, nullsFirst: false })
        .limit(limit),
    );
    if (error) {
      if (isPermissionError(error)) return [];
      throw new Error(error.message);
    }
    return (rows ?? []) as PublishedArticleCard[];
  } catch {
    return [];
  }
}

export async function loadSitemapArticles(): Promise<
  Array<{ slug: string; published_at: string | null }>
> {
  try {
    const { data, error } = await withTimeout(
      supabaseAdmin
        .from("articles")
        .select("slug, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false }),
    );
    if (error) {
      if (isPermissionError(error)) return [];
      throw new Error(error.message);
    }
    return data ?? [];
  } catch {
    return [];
  }
}
