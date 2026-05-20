CREATE TABLE public.fingerprint_sessions (
  visitor_id text PRIMARY KEY,
  sessions_used integer NOT NULL DEFAULT 0,
  last_seen timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.fingerprint_sessions ENABLE ROW LEVEL SECURITY;

-- Public access: visitor IDs are anonymous device fingerprints used to
-- enforce free-tier session limits for guests. No PII stored.
CREATE POLICY "Anyone can read fingerprint sessions"
  ON public.fingerprint_sessions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert fingerprint sessions"
  ON public.fingerprint_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update fingerprint sessions"
  ON public.fingerprint_sessions FOR UPDATE
  USING (true);