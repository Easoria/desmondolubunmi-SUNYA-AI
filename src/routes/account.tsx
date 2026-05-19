import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Download, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { UpgradeModal } from "@/components/site/UpgradeModal";

export const Route = createFileRoute("/account")({
  component: AccountPage,
  head: () => ({
    meta: [{ title: "Account settings — Sunya" }, { name: "robots", content: "noindex" }],
  }),
});

type Profile = {
  email: string | null;
  first_name: string | null;
  subscription_status: string;
  notifications_enabled: boolean;
  created_at: string;
};

function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [savingNotif, setSavingNotif] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase
        .from("user_profiles")
        .select("email,first_name,subscription_status,notifications_enabled,created_at")
        .eq("id", user.id)
        .single();
      setProfile((data as Profile) ?? null);
    })();
  }, [user]);

  async function toggleNotif() {
    if (!user || !profile) return;
    setSavingNotif(true);
    const { supabase } = await import("@/integrations/supabase/client");
    const next = !profile.notifications_enabled;
    await supabase
      .from("user_profiles")
      .update({ notifications_enabled: next })
      .eq("id", user.id);
    setProfile({ ...profile, notifications_enabled: next });
    setSavingNotif(false);
  }

  async function sendReset() {
    if (!user?.email) return;
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setResetSent(true);
  }

  async function exportData() {
    const { supabase } = await import("@/integrations/supabase/client");
    const [{ data: sess }, { data: msgs }, { data: prof }] = await Promise.all([
      supabase.from("sessions").select("*"),
      supabase.from("messages").select("*"),
      supabase.from("user_profiles").select("*"),
    ]);
    const blob = new Blob(
      [JSON.stringify({ profile: prof, sessions: sess, messages: msgs }, null, 2)],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sunya-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function deleteAccount() {
    if (!user) return;
    if (
      !confirm(
        "Are you sure?\n\nThis will permanently delete your account and all session history. This cannot be undone.",
      )
    )
      return;
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.from("sessions").delete().eq("user_id", user.id);
    await supabase.from("messages").delete().eq("user_id", user.id);
    await supabase.from("user_profiles").delete().eq("id", user.id);
    await signOut();
    navigate({ to: "/" });
  }

  if (loading || !user || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a1628] text-[#b8d4e8]">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  const isPaid = profile.subscription_status === "paid";
  const isEmailUser = user.app_metadata?.provider === "email";

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-28">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-[#b8d4e8] hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
        </Link>
        <div className="mt-6">
          <div className="label-eyebrow">Settings</div>
          <h1 className="display mt-3 text-4xl text-white sm:text-5xl">Account</h1>
        </div>

        <Section title="Email">
          <Row label="Current email" value={profile.email || user.email || "—"} />
        </Section>

        {isEmailUser && (
          <Section title="Password">
            <button
              onClick={sendReset}
              disabled={resetSent}
              className="rounded-full border border-white/15 px-4 py-2.5 text-sm text-white hover:border-[#7ec8e3]/40 disabled:opacity-60"
            >
              {resetSent ? "Reset link sent" : "Send password reset link"}
            </button>
          </Section>
        )}

        <Section title="Subscription">
          <Row label="Plan" value={isPaid ? "Full Access — €19 / month" : "Free"} />
          <Row label="Member since" value={new Date(profile.created_at).toLocaleDateString()} />
          <div className="mt-4">
            {isPaid ? (
              <button
                onClick={() => setShowUpgrade(true)}
                className="rounded-full border border-white/15 px-4 py-2.5 text-sm text-white hover:border-[#7ec8e3]/40"
              >
                Manage subscription
              </button>
            ) : (
              <button
                onClick={() => setShowUpgrade(true)}
                className="glow-btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
              >
                Upgrade to Full Access
              </button>
            )}
          </div>
        </Section>

        <Section title="Notifications">
          <label className="flex cursor-pointer items-center justify-between gap-4">
            <div>
              <div className="text-sm text-white">Email notifications</div>
              <div className="text-xs text-[#b8d4e8]/70">
                Occasional updates from Desmond. No spam.
              </div>
            </div>
            <button
              role="switch"
              aria-checked={profile.notifications_enabled}
              onClick={toggleNotif}
              disabled={savingNotif}
              className={`relative h-6 w-11 rounded-full transition ${
                profile.notifications_enabled ? "bg-[#7ec8e3]" : "bg-white/15"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                  profile.notifications_enabled ? "left-5" : "left-0.5"
                }`}
              />
            </button>
          </label>
        </Section>

        <Section title="Privacy & data">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportData}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm text-white hover:border-[#7ec8e3]/40"
            >
              <Download className="h-4 w-4" /> Download my data
            </button>
            <button
              onClick={deleteAccount}
              className="inline-flex items-center gap-2 rounded-full border border-red-400/30 px-4 py-2.5 text-sm text-red-200 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" /> Delete my account
            </button>
          </div>
        </Section>

        <Section title="Legal">
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/privacy" className="text-[#7ec8e3] hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-[#7ec8e3] hover:text-white">
              Terms of Service
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-white/10 pt-8">
      <h2 className="display text-xl text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-1 text-sm">
      <span className="text-[#b8d4e8]">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
