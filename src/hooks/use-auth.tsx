import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";

type AuthCtx = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({ user: null, session: null, loading: true, signOut: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    import("@/integrations/supabase/client").then(({ supabase }) => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
        setSession(s);
        setLoading(false);
        // Flush Mailerlite consent after Google (or other) OAuth returns.
        if (s?.user?.email) {
          void import("@/lib/mailerlite-consent").then(({ flushMailerliteConsent }) =>
            flushMailerliteConsent(s.user.email),
          );
        }
      });
      unsubscribe = () => subscription.unsubscribe();
      supabase.auth.getSession().then(({ data }) => {
        setSession(data.session);
        setLoading(false);
        if (data.session?.user?.email) {
          void import("@/lib/mailerlite-consent").then(({ flushMailerliteConsent }) =>
            flushMailerliteConsent(data.session!.user.email),
          );
        }
      });
    });

    return () => unsubscribe?.();
  }, []);

  return (
    <Ctx.Provider
      value={{
        user: session?.user ?? null,
        session,
        loading,
        signOut: async () => {
          const { supabase } = await import("@/integrations/supabase/client");
          await supabase.auth.signOut();
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  return useContext(Ctx);
}
