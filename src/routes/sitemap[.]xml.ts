import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { essays } from "@/data/essays";
import { getAllLeverPractices, getLeversInOrder } from "@/data/levers";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { SITE_URL } from "@/lib/blog";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const generatedAt = new Date().toISOString();
        const staticEntries: SitemapEntry[] = [
          { path: "/", lastmod: generatedAt, changefreq: "weekly", priority: "1.0" },
          { path: "/about", lastmod: generatedAt, changefreq: "monthly", priority: "0.8" },
          { path: "/philosophy", lastmod: generatedAt, changefreq: "monthly", priority: "0.9" },
          { path: "/essays", lastmod: generatedAt, changefreq: "monthly", priority: "0.9" },
          { path: "/practices", lastmod: generatedAt, changefreq: "weekly", priority: "0.9" },
          { path: "/practices/where-to-begin", lastmod: generatedAt, changefreq: "monthly", priority: "0.85" },
          { path: "/sunya-ai", lastmod: generatedAt, changefreq: "weekly", priority: "0.8" },
          { path: "/privacy", lastmod: generatedAt, changefreq: "yearly", priority: "0.5" },
          { path: "/terms", lastmod: generatedAt, changefreq: "yearly", priority: "0.5" },
          { path: "/work-with-me", lastmod: generatedAt, changefreq: "monthly", priority: "0.8" },
          { path: "/vision", lastmod: generatedAt, changefreq: "monthly", priority: "0.8" },
          { path: "/writing", lastmod: generatedAt, changefreq: "weekly", priority: "0.7" },
          { path: "/writing?category=practice", lastmod: generatedAt, changefreq: "weekly", priority: "0.6" },
          { path: "/writing?category=philosophy", lastmod: generatedAt, changefreq: "weekly", priority: "0.6" },
          { path: "/writing?category=world", lastmod: generatedAt, changefreq: "weekly", priority: "0.6" },
        ];

        const essayEntries: SitemapEntry[] = essays.map((essay) => ({
          path: `/essays/${essay.slug}`,
          lastmod: generatedAt,
          changefreq: "monthly",
          priority: "0.8",
        }));

        const practiceEntries: SitemapEntry[] = getLeversInOrder().flatMap((lever) => [
          {
            path: `/practices/${lever.slug}`,
            lastmod: generatedAt,
            changefreq: "monthly",
            priority: "0.8",
          },
          ...getAllLeverPractices(lever).map((practice) => ({
            path: `/practices/${lever.slug}/${practice.slug}`,
            lastmod: generatedAt,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
        ]);

        let articles: Array<{ slug: string; published_at: string | null; updated_at: string | null }> =
          [];
        try {
          const { data } = await supabaseAdmin
            .from("articles")
            .select("slug, published_at, updated_at")
            .eq("published", true);
          articles = data ?? [];
        } catch (error) {
          console.warn("Sitemap: skipping writing article fetch due to missing Supabase admin env.", error);
        }

        const dynamic: SitemapEntry[] = articles.map((a) => ({
          path: `/writing/${a.slug}`,
          lastmod: (a.updated_at ?? a.published_at ?? generatedAt) as string,
          changefreq: "monthly",
          priority: "0.7",
        }));

        const all = [...staticEntries, ...essayEntries, ...practiceEntries, ...dynamic];

        const urls = all
          .map((e) =>
            [
              `  <url>`,
              `    <loc>${SITE_URL}${e.path}</loc>`,
              e.lastmod ? `    <lastmod>${new Date(e.lastmod).toISOString()}</lastmod>` : null,
              e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
              e.priority ? `    <priority>${e.priority}</priority>` : null,
              `  </url>`,
            ]
              .filter(Boolean)
              .join("\n"),
          )
          .join("\n");

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
