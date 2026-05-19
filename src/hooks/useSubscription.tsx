import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment } from "@/lib/stripe";
import { useAuth } from "@/hooks/use-auth";

type SubRow = {
  status: string;
  cancel_at_period_end: boolean | null;
  current_period_end: string | null;
};

const ENTITLED = new Set(["active", "trialing", "past_due"]);

export function useSubscription() {
  const { user, loading: authLoading } = useAuth();
  const [sub, setSub] = useState<SubRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (authLoading) return;
    if (!user) {
      setSub(null);
      setLoading(false);
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("subscriptions")
        .select("status, cancel_at_period_end, current_period_end")
        .eq("user_id", user.id)
        .eq("environment", getStripeEnvironment())
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!active) return;
      setSub((data as SubRow | null) ?? null);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [user, authLoading]);

  const isActive = !!sub && ENTITLED.has(sub.status) &&
    (!sub.current_period_end || new Date(sub.current_period_end) > new Date());

  return { sub, isActive, loading: loading || authLoading };
}
