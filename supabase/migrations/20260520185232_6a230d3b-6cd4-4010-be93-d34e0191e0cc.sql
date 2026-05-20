REVOKE EXECUTE ON FUNCTION public.is_blog_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_blog_admin() TO authenticated;