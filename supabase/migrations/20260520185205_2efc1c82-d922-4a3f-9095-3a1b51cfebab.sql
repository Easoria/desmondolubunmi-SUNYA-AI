-- Articles table for the Sunya blog
CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  meta_description text,
  content text NOT NULL DEFAULT '',
  excerpt text,
  featured_image_url text,
  reading_time_minutes integer,
  tags text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  published_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_articles_published ON public.articles (published, published_at DESC);
CREATE INDEX idx_articles_slug ON public.articles (slug);
CREATE INDEX idx_articles_tags ON public.articles USING GIN (tags);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Security definer helper: is the current user the site admin?
CREATE OR REPLACE FUNCTION public.is_blog_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = auth.uid()
      AND lower(email) = 'easoriaai@gmail.com'
  );
$$;

-- Public can read published articles
CREATE POLICY "Public can read published articles"
  ON public.articles
  FOR SELECT
  USING (published = true);

-- Admin can read all (including drafts)
CREATE POLICY "Admin can read all articles"
  ON public.articles
  FOR SELECT
  USING (public.is_blog_admin());

-- Admin can insert
CREATE POLICY "Admin can insert articles"
  ON public.articles
  FOR INSERT
  WITH CHECK (public.is_blog_admin());

-- Admin can update
CREATE POLICY "Admin can update articles"
  ON public.articles
  FOR UPDATE
  USING (public.is_blog_admin())
  WITH CHECK (public.is_blog_admin());

-- Admin can delete
CREATE POLICY "Admin can delete articles"
  ON public.articles
  FOR DELETE
  USING (public.is_blog_admin());

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER articles_set_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Seed 10 article stubs (drafts)
INSERT INTO public.articles (slug, title, meta_description, tags, published) VALUES
  ('why-do-i-feel-empty-inside',
   'Why Do I Feel Empty Inside — And What to Actually Do About It',
   'That persistent sense of emptiness beneath everything isn''t a personal failure. It''s a mechanical condition — and it has a precise solution.',
   ARRAY['Anxiety','Identity','Consciousness'], false),
  ('how-to-calm-anxiety-naturally',
   'How to Calm Anxiety Naturally — Without Medication or Willpower',
   'Anxiety isn''t a mental illness. It''s a nervous system state. Here''s how to address it at the root — practically and permanently.',
   ARRAY['Anxiety','Nervous System','Breathwork'], false),
  ('breathwork-for-anxiety',
   'Breathwork for Anxiety — A Complete Practical Guide',
   'The breath is the most immediate lever for your nervous system. Here are the specific techniques that actually work for anxiety — and why.',
   ARRAY['Breathwork','Anxiety','Nervous System'], false),
  ('why-meditation-isnt-working',
   'Why Meditation Isn''t Working for You — And What to Do Instead',
   'If meditation hasn''t clicked yet, it''s not you. Here''s what''s actually happening — and how to approach it differently.',
   ARRAY['Meditation','Awareness','Consciousness'], false),
  ('how-to-regulate-your-nervous-system',
   'How to Regulate Your Nervous System — A Practical Guide',
   'Chronic stress, anxiety, and emotional reactivity all trace back to nervous system dysregulation. Here''s how to address it directly.',
   ARRAY['Nervous System','Anxiety','Breathwork'], false),
  ('root-cause-of-anxiety',
   'What Is the Root Cause of Anxiety — The Answer Nobody Gives You',
   'Most anxiety treatment addresses symptoms. Here''s what''s actually causing anxiety at the root — and why that changes everything.',
   ARRAY['Anxiety','Consciousness','Identity'], false),
  ('how-to-find-inner-peace-without-religion',
   'How to Find Inner Peace Without Religion or Belief',
   'Inner peace isn''t reserved for monks or believers. It''s a mechanical state — accessible to any human being through direct practice.',
   ARRAY['Consciousness','Identity','Meditation'], false),
  ('why-you-feel-disconnected-from-yourself',
   'Why You Feel Disconnected From Yourself — And How to Come Back',
   'That sense of watching your own life from behind glass has a name and a cause. Here''s what''s happening and how to address it.',
   ARRAY['Identity','Awareness','Consciousness'], false),
  ('how-to-sleep-better-naturally',
   'How to Sleep Better Naturally — The Complete Guide',
   'Sleep problems are almost always nervous system problems. Here''s a complete, practical approach to restoring deep, natural sleep.',
   ARRAY['Sleep','Nervous System'], false),
  ('spiritual-but-not-religious',
   'Spiritual But Not Religious — What That Actually Means',
   'More people identify as spiritual but not religious than ever before. Here''s what that distinction actually points to — and where it leads.',
   ARRAY['Consciousness','Identity'], false);