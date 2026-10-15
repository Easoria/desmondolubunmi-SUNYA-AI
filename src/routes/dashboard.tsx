import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { createPortalSession } from "@/utils/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [{ title: "Dashboard — Sunya" }, { name: "robots", content: "noindex" }],
  }),
});

type Profile = {
  first_name: string | null;
  subscription_status: string;
  created_at: string;
};
type SubRow = {
  status: string;
  cancel_at_period_end: boolean | null;
  current_period_end: string | null;
};

function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [sub, setSub] = useState<SubRow | null>(null);

  async function handleManage() {
    try {
      const url = await createPortalSession({
        data: {
          returnUrl: `${window.location.origin}/dashboard`,
          environment: getStripeEnvironment(),
        },
      });
      if (url) window.open(url, "_blank");
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoadingData(true);
      const { supabase } = await import("@/integrations/supabase/client");
      const env = getStripeEnvironment();
      const [{ data: prof }, { data: subRow }] = await Promise.all([
        supabase
          .from("user_profiles")
          .select("first_name,subscription_status,created_at")
          .eq("id", user.id)
          .maybeSingle(),
        supabase
          .from("subscriptions")
          .select("status,cancel_at_period_end,current_period_end")
          .eq("user_id", user.id)
          .eq("environment", env)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);
      setProfile(prof as Profile | null);
      setSub(subRow as SubRow | null);
      setLoadingData(false);
    })();
  }, [user]);

  if (loading || loadingData || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a1628] text-[#b8d4e8]">
        Loading…
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0a1628] text-white">
        <Nav />
        <main className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-[#b8d4e8]">Could not load your profile.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const isPaid = profile.subscription_status === "paid";
  const firstName = profile.first_name || user.email?.split("@")[0] || "there";

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-16">
        <h1 className="display text-4xl text-white sm:text-5xl">Welcome, {firstName}</h1>
        <p className="mt-3 text-[#b8d4e8]">Your account.</p>

        {isPaid && sub?.cancel_at_period_end && (
          <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-100">
            Your subscription is set to cancel
            {sub.current_period_end
              ? ` on ${new Date(sub.current_period_end).toLocaleDateString()}`
              : ""}
            . You can{" "}
            <button onClick={handleManage} className="underline hover:text-white">
              manage it in Stripe
            </button>
            .
          </div>
        )}
        {isPaid && sub?.status === "past_due" && (
          <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
            Your last payment failed. Please{" "}
            <button onClick={handleManage} className="underline hover:text-white">
              update your payment method
            </button>
            .
          </div>
        )}

        <div className="glass-card mt-10 p-6 sm:p-8">
          <h2 className="display text-2xl text-white">Your account</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-[#b8d4e8]">Member since</dt>
              <dd className="text-white">{new Date(profile.created_at).toLocaleDateString()}</dd>
            </div>
          </dl>
          {isPaid && (
            <button
              onClick={handleManage}
              className="mt-6 w-full rounded-full border border-white/15 px-4 py-2.5 text-sm text-white hover:border-[#7ec8e3]/40"
            >
              Manage subscription
            </button>
          )}
          <div className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm">
            <Link to="/account" className="block text-[#b8d4e8] hover:text-white">
              Account settings →
            </Link>
            <Link
              to="/work-with-me"
              hash="booking"
              className="block text-[#b8d4e8] hover:text-white"
            >
              Book a session with Desmond →
            </Link>
            <Link to="/practices" className="block text-[#b8d4e8] hover:text-white">
              Explore the practices →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
