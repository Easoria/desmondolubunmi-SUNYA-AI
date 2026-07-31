// Server middleware: validates the user's bearer token and exposes an
// authenticated Supabase client (RLS applies as the signed-in user).
import { createMiddleware } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const requireSupabaseAuth = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
    const SUPABASE_ANON_KEY =
      process.env.SUPABASE_ANON_KEY ??
      process.env.VITE_SUPABASE_ANON_KEY ??
      process.env.SUPABASE_PUBLISHABLE_KEY ??
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error(
        'Missing SUPABASE_URL and a Supabase key (SUPABASE_ANON_KEY, VITE_SUPABASE_ANON_KEY, SUPABASE_PUBLISHABLE_KEY, or VITE_SUPABASE_PUBLISHABLE_KEY).',
      );
    }

    const request = getRequest();
    const authHeader = request?.headers?.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('Unauthorized: missing bearer token');
    }
    const token = authHeader.slice('Bearer '.length).trim();
    if (!token) throw new Error('Unauthorized: empty token');

    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user?.id) throw new Error('Unauthorized: invalid token');

    return next({
      context: { supabase, userId: data.user.id, user: data.user },
    });
  },
);
