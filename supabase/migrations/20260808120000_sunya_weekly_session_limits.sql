-- Sunya AI free tier: weekly limits + first-session exemption.
-- sessions_this_week + week_start (ISO week, e.g. 2026-W32)
-- has_used_first_session: first ever session does not count against the weekly quota.

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS sessions_this_week integer NOT NULL DEFAULT 0;

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS week_start text;

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS has_used_first_session boolean NOT NULL DEFAULT false;
