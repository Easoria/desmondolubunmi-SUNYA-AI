ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS is_admin boolean NOT NULL DEFAULT false;

UPDATE public.user_profiles
SET is_admin = true,
    subscription_status = 'paid'
WHERE id IN (SELECT id FROM auth.users WHERE lower(email) = 'easoriaai@gmail.com');