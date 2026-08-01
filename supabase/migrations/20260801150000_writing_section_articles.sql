-- Writing section: extend articles, align admin check with is_admin, remove empty stubs.

ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS subtitle text;

ALTER TABLE public.articles
  DROP CONSTRAINT IF EXISTS articles_category_check;

ALTER TABLE public.articles
  ADD CONSTRAINT articles_category_check
  CHECK (category IS NULL OR category IN ('practice', 'philosophy', 'world'));

ALTER TABLE public.articles
  DROP CONSTRAINT IF EXISTS articles_published_requires_category;

ALTER TABLE public.articles
  ADD CONSTRAINT articles_published_requires_category
  CHECK (published = false OR category IS NOT NULL);

CREATE INDEX IF NOT EXISTS idx_articles_category_published
  ON public.articles (category, published, published_at DESC);

-- Admin gate: any account with user_profiles.is_admin (not a hardcoded email).
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

-- Delete the ten empty stub drafts (titles/meta only; no real content).
DELETE FROM public.articles
WHERE slug IN (
  'why-do-i-feel-empty-inside',
  'how-to-calm-anxiety-naturally',
  'breathwork-for-anxiety',
  'why-meditation-isnt-working',
  'how-to-regulate-your-nervous-system',
  'root-cause-of-anxiety',
  'how-to-find-inner-peace-without-religion',
  'why-you-feel-disconnected-from-yourself',
  'how-to-sleep-better-naturally',
  'spiritual-but-not-religious'
)
AND coalesce(trim(content), '') = '';
