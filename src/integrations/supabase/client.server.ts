// Server-side Supabase client. Prefers the service-role key (bypasses RLS).
// Falls back to anon/publishable so public reads still work on hosts that
// only have Lovable-style keys (RLS must allow published SELECT).
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const FALLBACK_KEY =
    process.env.SUPABASE_ANON_KEY ??
    process.env.VITE_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const key = SUPABASE_SERVICE_ROLE_KEY || FALLBACK_KEY;

  if (!SUPABASE_URL || !key) {
    const missing = [
      ...(!SUPABASE_URL ? ['SUPABASE_URL'] : []),
      ...(!key
        ? ['SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY / SUPABASE_PUBLISHABLE_KEY)']
        : []),
    ];
    throw new Error(
      `Missing Supabase env var(s): ${missing.join(', ')}. Set them in your Vercel project.`,
    );
  }

  const FETCH_TIMEOUT_MS = 3000;

  const fetchWithTimeout: typeof fetch = (input, init) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const parentSignal = init?.signal;
    if (parentSignal) {
      if (parentSignal.aborted) controller.abort();
      else {
        parentSignal.addEventListener("abort", () => controller.abort(), {
          once: true,
        });
      }
    }
    return fetch(input, { ...init, signal: controller.signal }).finally(() => {
      clearTimeout(timer);
    });
  };

  return createClient<Database>(SUPABASE_URL, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: { fetch: fetchWithTimeout },
  });
}

let _supabaseAdmin: ReturnType<typeof createSupabaseAdminClient> | undefined;

export const supabaseAdmin = new Proxy({} as ReturnType<typeof createSupabaseAdminClient>, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  },
});
