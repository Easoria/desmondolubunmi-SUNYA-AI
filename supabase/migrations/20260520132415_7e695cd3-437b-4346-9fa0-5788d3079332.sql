ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS sessions_this_month integer NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_session_month text;