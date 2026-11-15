import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getCompleteEvidenceMechanisms } from "@/data/evidence";
import { getAllLeverPractices, getLeversInOrder } from "@/data/levers";
import { getAllTagProblemSlugs } from "@/lib/family-labels";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { CANONICAL_ORIGIN, normalizePath } from "@/lib/seo";

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
          { path: "/contact", lastmod: generatedAt, changefreq: "monthly", priority: "0.7" },
          { path: "/about", lastmod: generatedAt, changefreq: "monthly", priority: "0.8" },
          { path: "/philosophy", lastmod: generatedAt, changefreq: "monthly", priority: "0.9" },
          { path: "/practices", lastmod: generatedAt, changefreq: "weekly", priority: "0.9" },
          { path: "/practices/where-to-begin", lastmod: generatedAt, changefreq: "monthly", priority: "0.85" },
          { path: "/privacy", lastmod: generatedAt, changefreq: "yearly", priority: "0.5" },
          { path: "/terms", lastmod: generatedAt, changefreq: "yearly", priority: "0.5" },
          { path: "/gatherings", lastmod: generatedAt, changefreq: "weekly", priority: "0.8" },
          { path: "/problems", lastmod: generatedAt, changefreq: "weekly", priority: "0.9" },
          { path: "/framework", lastmod: generatedAt, changefreq: "monthly", priority: "0.9" },
          { path: "/evidence", lastmod: generatedAt, changefreq: "monthly", priority: "0.85" },
        ];

        const familyProblemEntries: SitemapEntry[] = getAllTagProblemSlugs().map((slug) => ({
          path: `/problems/${slug}`,
          lastmod: generatedAt,
          changefreq: "monthly" as const,
          priority: "0.85",
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

        let gatherings: Array<{ slug: string; updated_at: string | null; starts_at: string }> = [];
        try {
          const { data } = await supabaseAdmin
            .from("gatherings")
            .select("slug, updated_at, starts_at")
            .eq("published", true);
          gatherings = data ?? [];
        } catch (error) {
          console.warn("Sitemap: skipping gatherings fetch due to missing Supabase admin env.", error);
        }

        const gatheringEntries: SitemapEntry[] = gatherings.map((g) => ({
          path: `/gatherings/${g.slug}`,
          lastmod: (g.updated_at ?? g.starts_at ?? generatedAt) as string,
          changefreq: "monthly",
          priority: "0.75",
        }));

        const evidenceEntries: SitemapEntry[] = getCompleteEvidenceMechanisms().map((m) => ({
          path: `/evidence/${m.slug}`,
          lastmod: generatedAt,
          changefreq: "monthly" as const,
          priority: "0.8",
        }));

        const all = [
          ...staticEntries,
          ...familyProblemEntries,
          ...practiceEntries,
          ...gatheringEntries,
          ...evidenceEntries,
        ];

        const urls = all
          .map((e) => {
            const loc = `${CANONICAL_ORIGIN}${normalizePath(e.path)}`;
            return [
              `  <url>`,
              `    <loc>${loc}</loc>`,
              e.lastmod ? `    <lastmod>${new Date(e.lastmod).toISOString()}</lastmod>` : null,
              e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
              e.priority ? `    <priority>${e.priority}</priority>` : null,
              `  </url>`,
            ]
              .filter(Boolean)
              .join("\n");
          })
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
