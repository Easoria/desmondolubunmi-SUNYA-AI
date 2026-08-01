-- Admin SELECT policies that call is_blog_admin() must not apply to anon.
-- Otherwise Postgres evaluates is_blog_admin() for anonymous requests and fails with
-- "permission denied for function is_blog_admin" (EXECUTE was revoked from anon).
-- Scope admin policies to authenticated so public published reads work.

-- Articles
DROP POLICY IF EXISTS "Admin can read all articles" ON public.articles;
CREATE POLICY "Admin can read all articles"
  ON public.articles
  FOR SELECT
  TO authenticated
  USING (public.is_blog_admin());

DROP POLICY IF EXISTS "Admin can insert articles" ON public.articles;
CREATE POLICY "Admin can insert articles"
  ON public.articles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_blog_admin());

DROP POLICY IF EXISTS "Admin can update articles" ON public.articles;
CREATE POLICY "Admin can update articles"
  ON public.articles
  FOR UPDATE
  TO authenticated
  USING (public.is_blog_admin())
  WITH CHECK (public.is_blog_admin());

DROP POLICY IF EXISTS "Admin can delete articles" ON public.articles;
CREATE POLICY "Admin can delete articles"
  ON public.articles
  FOR DELETE
  TO authenticated
  USING (public.is_blog_admin());

-- Gatherings
DROP POLICY IF EXISTS "Admin can read all gatherings" ON public.gatherings;
CREATE POLICY "Admin can read all gatherings"
  ON public.gatherings
  FOR SELECT
  TO authenticated
  USING (public.is_blog_admin());

DROP POLICY IF EXISTS "Admin can insert gatherings" ON public.gatherings;
CREATE POLICY "Admin can insert gatherings"
  ON public.gatherings
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_blog_admin());

DROP POLICY IF EXISTS "Admin can update gatherings" ON public.gatherings;
CREATE POLICY "Admin can update gatherings"
  ON public.gatherings
  FOR UPDATE
  TO authenticated
  USING (public.is_blog_admin())
  WITH CHECK (public.is_blog_admin());

DROP POLICY IF EXISTS "Admin can delete gatherings" ON public.gatherings;
CREATE POLICY "Admin can delete gatherings"
  ON public.gatherings
  FOR DELETE
  TO authenticated
  USING (public.is_blog_admin());
