import { createFileRoute } from "@tanstack/react-router";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * One-shot schema bootstrap for gatherings.
 * Uses DATABASE_URL / POSTGRES_URL / SUPABASE_DB_URL when present on the host
 * (e.g. Vercel), so the migration can be applied without a local service-role key.
 *
 * Auth: Authorization: Bearer <GATHERINGS_BOOTSTRAP_TOKEN>
 * Default token used only when the env var is unset (remove after first run).
 */
const DEFAULT_BOOTSTRAP_TOKEN = "sunya-bootstrap-gatherings-once";

function migrationSql(): string {
  try {
    return readFileSync(
      join(process.cwd(), "supabase/migrations/20260801160000_gatherings.sql"),
      "utf8",
    );
  } catch {
    // Bundled fallback if the file is not on the server filesystem.
    return `
CREATE OR REPLACE FUNCTION public.is_blog_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() AND is_admin = true
  );
$$;
REVOKE EXECUTE ON FUNCTION public.is_blog_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_blog_admin() TO authenticated;

CREATE TABLE IF NOT EXISTS public.gatherings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  format text NOT NULL CHECK (format IN ('in_person', 'online')),
  starts_at timestamptz NOT NULL,
  ends_at timestamptz,
  timezone text NOT NULL DEFAULT 'Europe/Dublin',
  venue_name text,
  address text,
  city text,
  latitude numeric,
  longitude numeric,
  platform text,
  description text NOT NULL DEFAULT '',
  what_to_expect text,
  who_its_for text,
  practical_notes text,
  registration_url text,
  registration_platform text,
  price_label text,
  capacity_note text,
  featured_image_url text,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gatherings_published_starts ON public.gatherings (published, starts_at);
CREATE INDEX IF NOT EXISTS idx_gatherings_slug ON public.gatherings (slug);
ALTER TABLE public.gatherings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public can read published gatherings" ON public.gatherings FOR SELECT USING (published = true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DROP POLICY IF EXISTS "Admin can read all gatherings" ON public.gatherings;
CREATE POLICY "Admin can read all gatherings" ON public.gatherings FOR SELECT TO authenticated USING (public.is_blog_admin());
DROP POLICY IF EXISTS "Admin can insert gatherings" ON public.gatherings;
CREATE POLICY "Admin can insert gatherings" ON public.gatherings FOR INSERT TO authenticated WITH CHECK (public.is_blog_admin());
DROP POLICY IF EXISTS "Admin can update gatherings" ON public.gatherings;
CREATE POLICY "Admin can update gatherings" ON public.gatherings FOR UPDATE TO authenticated USING (public.is_blog_admin()) WITH CHECK (public.is_blog_admin());
DROP POLICY IF EXISTS "Admin can delete gatherings" ON public.gatherings;
CREATE POLICY "Admin can delete gatherings" ON public.gatherings FOR DELETE TO authenticated USING (public.is_blog_admin());

DROP TRIGGER IF EXISTS gatherings_set_updated_at ON public.gatherings;
CREATE TRIGGER gatherings_set_updated_at
  BEFORE UPDATE ON public.gatherings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.gatherings (
  slug, title, format, starts_at, ends_at, timezone, venue_name, address, city,
  latitude, longitude, description, price_label, registration_platform, registration_url, published
) VALUES (
  'the-open-gathering-dublin',
  'The Open Gathering — Dublin',
  'in_person',
  '2026-07-04T12:00:00+01:00',
  '2026-07-04T14:00:00+01:00',
  'Europe/Dublin',
  'Papal Cross, Phoenix Park',
  'Phoenix Park, Dublin 8',
  'Dublin',
  53.3566563,
  -6.3290634,
  'A free gathering in Phoenix Park for people curious about consciousness, inner life, and genuine human connection.',
  'Free',
  'Eventbrite',
  'https://www.eventbrite.com/e/the-open-gathering-dublin-tickets-1992725927893',
  true
) ON CONFLICT (slug) DO NOTHING;
`;
  }
}

export const Route = createFileRoute("/api/admin/bootstrap-gatherings")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected =
          process.env.GATHERINGS_BOOTSTRAP_TOKEN || DEFAULT_BOOTSTRAP_TOKEN;
        const auth = request.headers.get("authorization") || "";
        const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
        if (!token || token !== expected) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const connectionString =
          process.env.DATABASE_URL ||
          process.env.POSTGRES_URL ||
          process.env.SUPABASE_DB_URL ||
          process.env.POSTGRES_PRISMA_URL;

        if (!connectionString) {
          return Response.json(
            {
              error:
                "No database connection string on the host (DATABASE_URL / POSTGRES_URL / SUPABASE_DB_URL).",
              hint: "Run supabase/migrations/20260801160000_gatherings.sql in the Supabase SQL editor.",
            },
            { status: 503 },
          );
        }

        try {
          const { default: pg } = await import("pg");
          const client = new pg.Client({
            connectionString,
            ssl: { rejectUnauthorized: false },
          });
          await client.connect();
          try {
            await client.query(migrationSql());
            // Ensure admin policies are scoped to authenticated (anon-safe public reads).
            try {
              const fixSql = readFileSync(
                join(
                  process.cwd(),
                  "supabase/migrations/20260801170000_fix_admin_rls_policies.sql",
                ),
                "utf8",
              );
              await client.query(fixSql);
            } catch {
              // File may be absent in some deploy bundles; policies in migrationSql are already TO authenticated.
            }
            const check = await client.query(
              `SELECT slug, published FROM public.gatherings WHERE slug = 'the-open-gathering-dublin'`,
            );
            return Response.json({
              ok: true,
              seed: check.rows[0] ?? null,
            });
          } finally {
            await client.end();
          }
        } catch (e) {
          console.error(e);
          return Response.json(
            {
              error: e instanceof Error ? e.message : "Bootstrap failed",
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
