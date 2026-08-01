-- Gatherings: events held on-site; tickets/hosting elsewhere.

-- Align blog/admin helper with user_profiles.is_admin (used by gatherings RLS too).
CREATE OR REPLACE FUNCTION public.is_blog_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_profiles
    WHERE id = auth.uid()
      AND is_admin = true
  );
$$;

REVOKE EXECUTE ON FUNCTION public.is_blog_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_blog_admin() TO authenticated;

CREATE TABLE public.gatherings (
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

CREATE INDEX idx_gatherings_published_starts
  ON public.gatherings (published, starts_at);

CREATE INDEX idx_gatherings_slug
  ON public.gatherings (slug);

ALTER TABLE public.gatherings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published gatherings"
  ON public.gatherings
  FOR SELECT
  USING (published = true);

CREATE POLICY "Admin can read all gatherings"
  ON public.gatherings
  FOR SELECT
  TO authenticated
  USING (public.is_blog_admin());

CREATE POLICY "Admin can insert gatherings"
  ON public.gatherings
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_blog_admin());

CREATE POLICY "Admin can update gatherings"
  ON public.gatherings
  FOR UPDATE
  TO authenticated
  USING (public.is_blog_admin())
  WITH CHECK (public.is_blog_admin());

CREATE POLICY "Admin can delete gatherings"
  ON public.gatherings
  FOR DELETE
  TO authenticated
  USING (public.is_blog_admin());

DROP TRIGGER IF EXISTS gatherings_set_updated_at ON public.gatherings;
CREATE TRIGGER gatherings_set_updated_at
  BEFORE UPDATE ON public.gatherings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Seed past Dublin gathering (optional sections left empty on purpose).
INSERT INTO public.gatherings (
  slug,
  title,
  format,
  starts_at,
  ends_at,
  timezone,
  venue_name,
  address,
  city,
  latitude,
  longitude,
  description,
  price_label,
  registration_platform,
  registration_url,
  published
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
);
