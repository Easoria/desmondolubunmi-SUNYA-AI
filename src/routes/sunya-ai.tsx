import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { SunyaAI } from "@/components/SunyaAI";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { UpgradeModal } from "@/components/site/UpgradeModal";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/sunya-ai")({
  component: SunyaAIPage,
  head: () => ({
    meta: [
      { title: "Sunya AI — Personal diagnostic intelligence for inner transformation" },
      {
        name: "description",
        content:
          "Describe what you're experiencing. Sunya AI diagnoses the mechanics behind it and gives you the precise tools to address it — drawn from the complete Sunya framework.",
      },
    ],
  }),
});

const STEPS = [
  { n: "1", t: "Describe your situation", c: "In your own words, no jargon required." },
  { n: "2", t: "Receive your diagnosis", c: "The root mechanical cause identified across the 4 principles and 7 layers." },
  { n: "3", t: "Get your protocol", c: "The specific levers and practices most relevant to you right now." },
];

const FAQ = [
  {
    q: "Do I need to know anything about spirituality or mindfulness?",
    a: "Not at all. Sunya is built on universal mechanics, not belief systems. You just describe how you feel in ordinary language.",
  },
  {
    q: "How is this different from a regular AI chatbot?",
    a: "Sunya AI is trained specifically on the complete Sunya framework — the 4 root causes, 7 layers of being, and 12 levers. It doesn't give generic advice. It gives a precise mechanical diagnosis of your specific situation.",
  },
  {
    q: "Is what I share private?",
    a: "Yes. Your inputs are not stored or shared.",
  },
  {
    q: "What if I want to go deeper than the tool can take me?",
    a: "That's what the 1-on-1 sessions with Desmond are for.",
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  return "Good evening";
}

function getFirstName(user: any): string | null {
  if (!user) return null;
  const meta = user.user_metadata || {};
  const candidate =
    meta.first_name ||
    meta.given_name ||
    (typeof meta.full_name === "string" ? meta.full_name.split(" ")[0] : null) ||
    (typeof meta.name === "string" ? meta.name.split(" ")[0] : null);
  if (candidate && typeof candidate === "string") return candidate.trim();
  return null;
}

function SunyaAIPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { openCheckout, checkoutElement } = useStripeCheckout();
  const { isActive: hasActiveSub, loading: subLoading } = useSubscription();

  const resolving = authLoading || subLoading;
  const isPaid = !!user && hasActiveSub;

  function handleUpgrade() {
    if (!user) {
      navigate({ to: "/login", search: { next: "/sunya-ai" } as any });
      return;
    }
    openCheckout({
      priceId: "sunya_ai_founding_monthly",
      customerEmail: user.email,
      userId: user.id,
      returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });
  }

  if (resolving) {
    return (
      <div className="min-h-screen bg-[#0a1628] text-white">
        <Nav />
        <div className="flex min-h-[60vh] items-center justify-center">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#7ec8e3]" />
        </div>
      </div>
    );
  }

  if (isPaid) {
    return <PaidSubscriberView user={user} />;
  }

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />

      <section className="relative overflow-hidden pb-20 pt-16">
        <Starfield density={1.1} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="label-eyebrow">Personal diagnostic intelligence</div>
          <h1 className="display mt-6 text-5xl text-white sm:text-7xl">Sunya AI</h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-[#b8d4e8]">
            Describe what you're experiencing. The system diagnoses the mechanics behind it and
            gives you the precise tools to address it — drawn from the complete Sunya framework.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#060d1c] py-20">
        <Starfield density={0.5} />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          {!user && (
            <div className="mb-3 flex justify-end">
              <Link
                to="/login"
                className="text-xs text-[#b8d4e8]/80 transition hover:text-white"
              >
                Sign in / Sign up →
              </Link>
            </div>
          )}
          <SunyaAI />
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden bg-[#0a1628] py-28">
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">How it works</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl">
              Three steps. <span className="display-italic text-[#b8d4e8]">No fluff.</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="glass-card p-7">
                <div className="font-display text-xs tracking-[0.4em] text-[#7ec8e3]">STEP {s.n}</div>
                <h3 className="display mt-4 text-2xl text-white">{s.t}</h3>
                <p className="mt-3 text-sm text-[#b8d4e8]">{s.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#060d1c] py-28">
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">Pricing</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl">
              Start free. <span className="display-italic text-[#b8d4e8]">Go deeper when ready.</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="glass-card flex flex-col p-8">
              <div className="label-eyebrow">Free</div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="display text-5xl text-white">2</span>
                <span className="text-sm text-[#b8d4e8]">sessions per day</span>
              </div>
              <ul className="mt-7 space-y-3 text-sm text-[#b8d4e8]">
                {["Full Sunya diagnostic", "Personalised protocol", "No account needed"].map((i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#7ec8e3]" /> {i}
                  </li>
                ))}
              </ul>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="mt-auto pt-8"
              >
                <span className="glow-btn inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium">
                  Start Free <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>
            <div className="glass-strong relative flex flex-col rounded-3xl p-8 shadow-[0_0_60px_-15px_rgba(126,200,227,0.5)] ring-1 ring-[#7ec8e3]/40">
              <div className="absolute right-6 top-6 rounded-full bg-[#7ec8e3]/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#7ec8e3] ring-1 ring-[#7ec8e3]/30">
                ✦ Recommended
              </div>
              <div className="label-eyebrow mt-10 sm:mt-0">Founding Access · Live</div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="display text-5xl text-white">€19</span>
                <span className="text-sm text-[#b8d4e8]">/ month</span>
              </div>
              <ul className="mt-7 space-y-3 text-sm text-[#b8d4e8]">
                {[
                  "Unlimited sessions",
                  "Full diagnostic",
                  "Session history saved",
                  "Lever insights over time",
                  "Cancel anytime",
                ].map((i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#7ec8e3]" /> {i}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs italic text-[#b8d4e8]/70">
                Founding rate — price will increase as Sunya grows.
              </p>
              <button
                onClick={handleUpgrade}
                className="glow-btn mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
              >
                Get Founding Access <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-[#0a1628] py-28">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">FAQ</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl">Questions, answered.</h2>
          </div>
          <div className="mt-12 space-y-3">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="glass-card overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 p-5 text-left"
                  >
                    <span className="flex-1 text-white">{f.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#7ec8e3] transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-[#b8d4e8]">
                      {f.a}
                      {i === 3 && (
                        <div className="mt-3">
                          <Link
                            to="/work-with-me"
                            className="inline-flex items-center gap-2 text-[#7ec8e3] hover:text-white"
                          >
                            Book a session <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
      {checkoutElement}
    </div>
  );
}

function PaidSubscriberView({ user }: { user: any }) {
  const firstName = useMemo(() => getFirstName(user), [user]);
  const greeting = useMemo(() => getGreeting(), []);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <div
        className="transition-opacity duration-[400ms] ease-out"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <section className="relative overflow-hidden pb-10 pt-16 sm:pt-24">
          <Starfield density={0.6} />
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <p className="text-sm tracking-wide text-[#b8d4e8]/80 sm:text-base">
              {firstName ? `${greeting}, ${firstName}. ✦` : "Welcome back. ✦"}
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#060d1c] pb-20 pt-6">
          <Starfield density={0.4} />
          <div className="relative z-10 mx-auto w-full max-w-[800px] px-4 sm:px-6">
            <SunyaAI />
            <div className="mt-10 flex flex-col items-center gap-4 text-sm text-[#b8d4e8] sm:flex-row sm:justify-center sm:gap-10">
              <Link
                to="/sessions"
                className="inline-flex items-center gap-2 text-[#b8d4e8] transition hover:text-white"
              >
                View session history <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/work-with-me"
                className="inline-flex items-center gap-2 text-[#b8d4e8] transition hover:text-white"
              >
                Book a 1-on-1 with Desmond <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
