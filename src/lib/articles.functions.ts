// Public-facing article reads. Server logic lives in articles.server.ts;
// this file only exposes createServerFn RPC bridges + shared types so the
// client bundle never pulls in supabaseAdmin.
import { createServerFn } from "@tanstack/react-start";
import type { WritingCategory } from "@/lib/writing";
import {
  loadArticleBySlugForPreview,
  loadPublishedArticleBySlug,
  loadPublishedArticles,
  loadRelatedArticles,
  loadSitemapArticles,
} from "@/lib/articles.server";

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

export const listPublishedArticles = createServerFn({ method: "GET" })
  .inputValidator((d?: { category?: WritingCategory }) => d ?? {})
  .handler(async ({ data }): Promise<PublishedArticleCard[]> =>
    loadPublishedArticles(data?.category ? { category: data.category } : undefined),
  );

export const getPublishedArticleBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }): Promise<PublishedArticleFull | null> =>
    loadPublishedArticleBySlug(data.slug),
  );

/** Load any article by slug for draft preview (`?preview=1`). */
export const getArticleBySlugForPreview = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }): Promise<PublishedArticleFull | null> =>
    loadArticleBySlugForPreview(data.slug),
  );

export const listRelatedArticles = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string; category: WritingCategory; limit?: number }) => d)
  .handler(async ({ data }): Promise<PublishedArticleCard[]> =>
    loadRelatedArticles(data.slug, data.category, data.limit ?? 3),
  );

export const listSitemapArticles = createServerFn({ method: "GET" }).handler(
  async (): Promise<Array<{ slug: string; published_at: string | null }>> =>
    loadSitemapArticles(),
);
