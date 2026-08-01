import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
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
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/philosophy", changefreq: "monthly", priority: "0.9" },
          { path: "/practices", changefreq: "weekly", priority: "0.9" },
          { path: "/sunya-ai", changefreq: "weekly", priority: "0.9" },
          { path: "/work-with-me", changefreq: "monthly", priority: "0.8" },
          { path: "/vision", changefreq: "monthly", priority: "0.8" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
        ];

        const practiceEntries: SitemapEntry[] = getLeversInOrder().flatMap((lever) => [
          {
            path: `/practices/${lever.slug}`,
            changefreq: "monthly",
            priority: "0.8",
          },
          ...getAllLeverPractices(lever).map((practice) => ({
            path: `/practices/${lever.slug}/${practice.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
        ]);

        const { data: articles } = await supabaseAdmin
          .from("articles")
          .select("slug, published_at, updated_at")
          .eq("published", true);

        const dynamic: SitemapEntry[] = (articles ?? []).map((a) => ({
          path: `/blog/${a.slug}`,
          lastmod: (a.updated_at ?? a.published_at ?? undefined) as string | undefined,
          changefreq: "monthly",
          priority: "0.7",
        }));

        const all = [...staticEntries, ...practiceEntries, ...dynamic];

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
