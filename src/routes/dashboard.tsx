import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Loader2, ChevronDown, Trash2, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { UpgradeModal } from "@/components/site/UpgradeModal";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { createPortalSession } from "@/utils/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe";
import { SolutionCard } from "@/components/SolutionCard";
import type { Solution } from "@/lib/parse-solution";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [{ title: "Dashboard — Sunya" }, { name: "robots", content: "noindex" }],
  }),
});

type Profile = {
  first_name: string | null;
  subscription_status: string;
  sessions_today: number;
  last_session_date: string | null;
  created_at: string;
};
type SessionRow = {
  id: string;
  created_at: string;
  title: string | null;
  lever_tags: string[] | null;
  solution: Solution | null;
};
type MessageRow = { id: string; role: "user" | "assistant"; content: string };
type SubRow = {
  status: string;
  cancel_at_period_end: boolean | null;
  current_period_end: string | null;
};

const FREE_LIMIT = 3;

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [messages, setMessages] = useState<Record<string, MessageRow[]>>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [sub, setSub] = useState<SubRow | null>(null);
  const { openCheckout, checkoutElement } = useStripeCheckout();

  function handleUnlock() {
    if (!user) return;
    openCheckout({
      priceId: "sunya_ai_founding_monthly",
      customerEmail: user.email,
      userId: user.id,
      returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });
  }

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
      setShowUpgrade(true);
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
      const [{ data: prof }, { data: sess }, { data: subRow }] = await Promise.all([
        supabase
          .from("user_profiles")
          .select("first_name,subscription_status,sessions_today,last_session_date,created_at")
          .eq("id", user.id)
          .single(),
        supabase
          .from("sessions")
          .select("id,created_at,title,lever_tags,solution")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("subscriptions")
          .select("status,cancel_at_period_end,current_period_end")
          .eq("user_id", user.id)
          .eq("environment", env)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);
      setProfile((prof as Profile) ?? null);
      setSessions((sess ?? []) as SessionRow[]);
      setSub((subRow as SubRow) ?? null);
      setLoadingData(false);
    })();
  }, [user]);

  async function toggle(id: string) {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    setOpenId(id);
    if (!messages[id]) {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase
        .from("messages")
        .select("id,role,content")
        .eq("session_id", id)
        .order("created_at", { ascending: true });
      setMessages((m) => ({ ...m, [id]: (data ?? []) as MessageRow[] }));
    }
  }

  async function deleteSession(id: string) {
    if (!confirm("Delete this session permanently?")) return;
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.from("sessions").delete().eq("id", id);
    setSessions((s) => s.filter((x) => x.id !== id));
  }

  if (loading || !user || loadingData || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a1628] text-[#b8d4e8]">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  const isPaid = profile.subscription_status === "paid";
  const todaysCount =
    profile.last_session_date === todayStr() ? profile.sessions_today : 0;
  const remaining = Math.max(0, FREE_LIMIT - todaysCount);
  const firstName = profile.first_name?.trim() || user.email?.split("@")[0] || "there";

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-28">
        <div>
          <div className="label-eyebrow">Your dashboard</div>
          <h1 className="display mt-3 text-4xl text-white sm:text-5xl">
            Welcome back, <span className="display-italic text-[#b8d4e8]">{firstName}</span>.
          </h1>
          <p className="mt-3 text-sm text-[#b8d4e8]">
            {isPaid ? (
              <>
                Full access active. <Sparkles className="ml-1 inline h-3.5 w-3.5 text-[#7ec8e3]" />
              </>
            ) : (
              <>You have {remaining} free session{remaining === 1 ? "" : "s"} remaining today.</>
            )}
          </p>
        </div>

        {isPaid && sub?.cancel_at_period_end && sub?.current_period_end && (
          <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-100">
            Your subscription is set to cancel. Access ends on{" "}
            <span className="font-medium text-white">
              {new Date(sub.current_period_end).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            . You can resume anytime from{" "}
            <button onClick={handleManage} className="underline hover:text-white">
              Manage subscription
            </button>
            .
          </div>
        )}
        {isPaid && sub?.status === "past_due" && (
          <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
            Your last payment failed. Stripe is retrying automatically — you still have access for now. Please{" "}
            <button onClick={handleManage} className="underline hover:text-white">
              update your payment method
            </button>{" "}
            to avoid interruption.
          </div>
        )}

        {/* Panel 1 — Quick Start */}
        <section className="glass-strong relative mt-10 overflow-hidden rounded-3xl p-8 sm:p-10">
          <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br from-[#7ec8e3]/20 via-transparent to-[#2e6db4]/20 blur-xl" />
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="label-eyebrow">Start a new session</div>
              <h2 className="display mt-3 text-3xl text-white sm:text-4xl">
                How are you right now?
              </h2>
              <p className="mt-2 text-sm text-[#b8d4e8]">
                Bring whatever's present. Sunya meets you there.
              </p>
            </div>
            <Link
              to="/sunya-ai"
              className="glow-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              Begin <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Panel 2 — Recent sessions */}
          <section className="lg:col-span-2">
            <div className="flex items-end justify-between">
              <h2 className="display text-2xl text-white">Recent sessions</h2>
              <Link
                to="/sessions"
                className="text-xs text-[#7ec8e3] hover:text-white"
              >
                View all sessions →
              </Link>
            </div>
            {sessions.length === 0 ? (
              <div className="glass-card mt-4 p-8 text-center text-sm text-[#b8d4e8]">
                No saved sessions yet.
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {sessions.map((s) => {
                  const isOpen = openId === s.id;
                  return (
                    <div key={s.id} className="glass-card overflow-hidden">
                      <div className="flex items-center gap-3 p-4">
                        <button
                          onClick={() => toggle(s.id)}
                          className="flex flex-1 items-center gap-3 text-left"
                        >
                          <ChevronDown
                            className={`h-4 w-4 text-[#7ec8e3] transition ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                          <div className="flex-1">
                            <div className="text-sm text-white">
                              {s.title ||
                                `Session — ${new Date(s.created_at).toLocaleDateString()}`}
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#b8d4e8]/70">
                              <span>{new Date(s.created_at).toLocaleString()}</span>
                              {(s.lever_tags ?? []).map((t) => (
                                <span
                                  key={t}
                                  className="rounded-full bg-[#7ec8e3]/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#7ec8e3]"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => deleteSession(s.id)}
                          aria-label="Delete"
                          className="rounded-full p-2 text-[#b8d4e8] hover:bg-white/5 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {isOpen && (
                        <div className="space-y-3 border-t border-white/10 p-4">
                          {(messages[s.id] ?? []).map((m) => (
                            <div
                              key={m.id}
                              className={
                                m.role === "user"
                                  ? "ml-auto max-w-[85%] rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                                  : "max-w-[92%] rounded-2xl border border-[#7ec8e3]/25 bg-white/[0.04] p-4 text-sm leading-relaxed text-white/90"
                              }
                            >
                              <div className="whitespace-pre-wrap">{m.content}</div>
                            </div>
                          ))}
                          {(messages[s.id]?.length ?? 0) === 0 && (
                            <div className="text-center text-xs text-[#b8d4e8]/60">
                              No messages in this session.
                            </div>
                          )}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                            <Link
                              to="/sunya-ai"
                              className="text-[#7ec8e3] hover:text-white"
                            >
                              Start a follow-up session →
                            </Link>
                            <button
                              onClick={() => deleteSession(s.id)}
                              className="text-[#b8d4e8]/60 hover:text-red-300"
                            >
                              Delete this session
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Panel 3 — Account summary */}
          <aside>
            <div className="glass-card p-6">
              <h2 className="display text-xl text-white">Your account</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-[#b8d4e8]">Plan</dt>
                  <dd className="text-white">{isPaid ? "Full Access" : "Free"}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[#b8d4e8]">Sessions today</dt>
                  <dd className="text-white">
                    {isPaid ? "Unlimited" : `${todaysCount} / ${FREE_LIMIT}`}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[#b8d4e8]">Member since</dt>
                  <dd className="text-white">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
              {!isPaid && (
                <div className="mt-5 rounded-2xl border border-[#7ec8e3]/30 bg-[#7ec8e3]/5 p-4 text-center">
                  <div className="text-xs uppercase tracking-[0.25em] text-[#7ec8e3]">
                    ✦ Founding Access
                  </div>
                  <div className="mt-1 text-sm text-white">€19/month · Cancel anytime</div>
                </div>
              )}
              <button
                onClick={isPaid ? handleManage : handleUnlock}
                className={
                  isPaid
                    ? "mt-6 w-full rounded-full border border-white/15 px-4 py-2.5 text-sm text-white hover:border-[#7ec8e3]/40"
                    : "glow-btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
                }
              >
                {isPaid ? "Manage subscription" : "Unlock Full Access"}
              </button>
              <div className="mt-6 border-t border-white/10 pt-5 space-y-2 text-sm">
                <Link
                  to="/account"
                  className="block text-[#b8d4e8] hover:text-white"
                >
                  Account settings →
                </Link>
                <Link
                  to="/work-with-me"
                  hash="booking"
                  className="block text-[#b8d4e8] hover:text-white"
                >
                  Book a session with Desmond →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
      {checkoutElement}
    </div>
  );
}
