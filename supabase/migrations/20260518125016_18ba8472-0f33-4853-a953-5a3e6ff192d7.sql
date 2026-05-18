
-- Extend user_profiles
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS avatar_url text,
  ADD COLUMN IF NOT EXISTS stripe_customer_id text,
  ADD COLUMN IF NOT EXISTS notifications_enabled boolean NOT NULL DEFAULT true;

-- Sessions: tags + end timestamp
ALTER TABLE public.sessions
  ADD COLUMN IF NOT EXISTS lever_tags text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS ended_at timestamptz;

-- Recreate trigger function to capture metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  meta jsonb := COALESCE(new.raw_user_meta_data, '{}'::jsonb);
  full_name text := COALESCE(meta->>'full_name', meta->>'name', '');
  first_part text;
  last_part text;
BEGIN
  IF position(' ' in full_name) > 0 THEN
    first_part := split_part(full_name, ' ', 1);
    last_part := trim(substring(full_name from position(' ' in full_name) + 1));
  ELSE
    first_part := NULLIF(full_name, '');
    last_part := NULL;
  END IF;

  INSERT INTO public.user_profiles (id, email, first_name, last_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    first_part,
    last_part,
    COALESCE(meta->>'avatar_url', meta->>'picture')
  )
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        first_name = COALESCE(public.user_profiles.first_name, EXCLUDED.first_name),
        last_name = COALESCE(public.user_profiles.last_name, EXCLUDED.last_name),
        avatar_url = COALESCE(public.user_profiles.avatar_url, EXCLUDED.avatar_url);

  RETURN new;
END;
$$;

-- Ensure trigger exists on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill existing users
INSERT INTO public.user_profiles (id, email, first_name, last_name, avatar_url)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name'),
  NULL,
  COALESCE(u.raw_user_meta_data->>'avatar_url', u.raw_user_meta_data->>'picture')
FROM auth.users u
ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      avatar_url = COALESCE(public.user_profiles.avatar_url, EXCLUDED.avatar_url);
