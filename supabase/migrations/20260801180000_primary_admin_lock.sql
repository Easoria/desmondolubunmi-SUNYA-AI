-- Keep easoriaai@gmail.com permanently admin, and block self-promotion via is_admin.

CREATE OR REPLACE FUNCTION public.protect_and_grant_primary_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_email text;
BEGIN
  SELECT lower(email) INTO user_email
  FROM auth.users
  WHERE id = NEW.id;

  -- Primary admin account always has admin.
  IF user_email = 'easoriaai@gmail.com' THEN
    NEW.is_admin := true;
    RETURN NEW;
  END IF;

  -- Nobody else may elevate themselves to admin through the client.
  IF TG_OP = 'INSERT' AND NEW.is_admin IS TRUE THEN
    NEW.is_admin := false;
  ELSIF TG_OP = 'UPDATE'
    AND NEW.is_admin IS DISTINCT FROM OLD.is_admin
    AND NEW.is_admin IS TRUE
    AND COALESCE(OLD.is_admin, false) IS FALSE THEN
    NEW.is_admin := false;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS user_profiles_protect_and_grant_primary_admin ON public.user_profiles;
CREATE TRIGGER user_profiles_protect_and_grant_primary_admin
  BEFORE INSERT OR UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_and_grant_primary_admin();

-- One-shot: grant admin to the existing Auth user if present.
UPDATE public.user_profiles AS up
SET is_admin = true
FROM auth.users AS u
WHERE up.id = u.id
  AND lower(u.email) = 'easoriaai@gmail.com';
