import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [{ title: "Dashboard — Sunya" }, { name: "robots", content: "noindex" }],
  }),
});

type Profile = {
  first_name: string | null;
  created_at: string;
};

function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoadingData(true);
      const { supabase } = await import("@/integrations/supabase/client");
      const { data: prof } = await supabase
        .from("user_profiles")
        .select("first_name,created_at")
        .eq("id", user.id)
        .maybeSingle();
      setProfile(prof as Profile | null);
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

  const firstName =
    profile?.first_name || user.email?.split("@")[0] || "there";

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-16">
        <h1 className="display text-4xl text-white sm:text-5xl">Welcome, {firstName}</h1>
        <p className="mt-3 text-[#b8d4e8]">Your account.</p>

        <div className="glass-card mt-10 p-6 sm:p-8">
          {profile?.created_at && (
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-[#b8d4e8]">Member since</dt>
                <dd className="text-white">
                  {new Date(profile.created_at).toLocaleDateString()}
                </dd>
              </div>
            </dl>
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
