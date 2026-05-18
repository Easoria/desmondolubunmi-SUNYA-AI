import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Handshake,
  Radio,
  Globe2,
  Loader2,
  Check,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/join")({
  component: JoinPage,
  head: () => ({
    meta: [
      { title: "Get Involved — Sunya needs people like you" },
      {
        name: "description",
        content:
          "Volunteer, train as a Sunya teacher, partner with us, or spread the word. Tell Desmond about yourself.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const CARDS = [
  {
    Icon: GraduationCap,
    title: "Train as a Sunya Teacher",
    copy: "Once teacher training is available, go through the framework yourself and learn to bring these practices to others — in schools, communities, organisations, or your own work.",
    tag: "Coming Soon",
    tagTone: "soon",
    optionId: "teacher",
  },
  {
    Icon: Handshake,
    title: "Volunteer Your Skills",
    copy: "Design, development, writing, video, community building, translation — if you have a skill and want to offer it in service of this mission, we want to hear from you.",
    tag: "Open Now",
    tagTone: "open",
    optionId: "volunteer",
  },
  {
    Icon: Radio,
    title: "Share Sunya",
    copy: "The simplest contribution: if this framework has helped you or resonates with you, share it with one person who might need it. Word of mouth is how movements begin.",
    tag: "Always Open",
    tagTone: "open",
    optionId: "spread_word",
  },
  {
    Icon: Globe2,
    title: "Organisations & Partnerships",
    copy: "Schools, wellness centres, retreat spaces, NGOs, corporate wellbeing programmes — if you represent an organisation that wants to bring Sunya into your community, reach out.",
    tag: "Open Now",
    tagTone: "open",
    optionId: "partner",
  },
] as const;

const OPTIONS = [
  { id: "volunteer", label: "Volunteer my skills" },
  { id: "teacher", label: "Become a teacher (when available)" },
  { id: "partner", label: "Partner or collaborate" },
  { id: "spread_word", label: "Spread the word and support the mission" },
  { id: "other", label: "Something else" },
] as const;

type OptionId = (typeof OPTIONS)[number]["id"];

function JoinPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<OptionId[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function toggle(id: OptionId) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (selected.length === 0) {
      setError("Please choose at least one way you'd like to contribute.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contributor-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          contribution_types: selected,
          message: message.trim() || null,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong. Please try again.");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />

      {/* Sacred geometry backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(126,200,227,0.6) 1px, transparent 1.5px), radial-gradient(circle at 0% 0%, rgba(126,200,227,0.4) 1px, transparent 1.5px)",
          backgroundSize: "80px 80px, 160px 160px",
        }}
      />

      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-28">
        <Link
          to="/vision"
          className="inline-flex items-center gap-2 text-xs text-[#b8d4e8] hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to the Vision
        </Link>

        <header className="mt-10 text-center">
          <div className="label-eyebrow">Get Involved</div>
          <h1 className="display mt-5 text-4xl text-white sm:text-6xl">
            Sunya needs <span className="display-italic text-[#b8d4e8]">people like you.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-[#b8d4e8]">
            This is bigger than one person can build alone. If you feel called to contribute — in
            any way — this is where that begins.
          </p>
        </header>

        {/* Four ways */}
        <section className="mt-16">
          <div className="grid gap-5 md:grid-cols-2">
            {CARDS.map((c) => (
              <button
                type="button"
                key={c.title}
                onClick={() => {
                  setSelected((s) =>
                    s.includes(c.optionId as OptionId) ? s : [...s, c.optionId as OptionId],
                  );
                  document
                    .getElementById("contributor-form")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="glass-card flex flex-col p-7 text-left transition hover:border-[#7ec8e3]/40 hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7ec8e3]/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <c.Icon className="h-7 w-7 text-[#7ec8e3]" />
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
                      c.tagTone === "open"
                        ? "border border-[#7ec8e3]/40 bg-[#7ec8e3]/10 text-[#b8d4e8]"
                        : "border border-amber-300/30 bg-amber-300/5 text-amber-100/80"
                    }`}
                  >
                    {c.tag}
                  </span>
                </div>
                <h3 className="display mt-5 text-2xl text-white">{c.title}</h3>
                <p className="mt-3 text-sm text-[#b8d4e8]">{c.copy}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Form */}
        <section id="contributor-form" className="mt-20 scroll-mt-24">
          <div className="text-center">
            <div className="label-eyebrow">The contributor form</div>
            <h2 className="display mt-5 text-3xl text-white sm:text-4xl">
              Tell us about <span className="display-italic text-[#b8d4e8]">yourself.</span>
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-2xl">
            {done ? (
              <div className="glass-strong rounded-3xl p-10 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#7ec8e3]/15 ring-1 ring-[#7ec8e3]/40">
                  <Check className="h-5 w-5 text-[#7ec8e3]" />
                </div>
                <div className="display mt-5 text-3xl text-white">✦ Thank you.</div>
                <div className="mt-5 space-y-3 text-sm text-[#b8d4e8]">
                  <p>Your message has been received.</p>
                  <p>Desmond reads every one of these personally.</p>
                  <p>You'll hear back when the time is right.</p>
                  <p className="pt-2">
                    In the meantime — if you haven't already,{" "}
                    <Link to="/sunya-ai" className="text-white underline-offset-4 hover:underline">
                      try Sunya AI
                    </Link>{" "}
                    and stay connected via the{" "}
                    <Link to="/vision" className="text-white underline-offset-4 hover:underline">
                      Vision page
                    </Link>
                    .
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="glass-strong space-y-6 rounded-3xl p-8">
                <div>
                  <label className="label-eyebrow block">Your name</label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-[#b8d4e8]/40 outline-none focus:border-[#7ec8e3]/50"
                  />
                </div>

                <div>
                  <label className="label-eyebrow block">Your email</label>
                  <input
                    type="email"
                    required
                    maxLength={255}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-[#b8d4e8]/40 outline-none focus:border-[#7ec8e3]/50"
                  />
                </div>

                <div>
                  <span className="label-eyebrow block">How would you like to contribute?</span>
                  <div className="mt-3 space-y-2">
                    {OPTIONS.map((o) => {
                      const checked = selected.includes(o.id);
                      return (
                        <label
                          key={o.id}
                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3 text-sm transition ${
                            checked
                              ? "border-[#7ec8e3]/60 bg-[#7ec8e3]/10 text-white"
                              : "border-white/10 bg-white/[0.03] text-[#b8d4e8] hover:border-white/20"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggle(o.id)}
                            className="h-4 w-4 accent-[#7ec8e3]"
                          />
                          {o.label}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="label-eyebrow block">
                    Tell us a bit about yourself{" "}
                    <span className="ml-1 text-[#b8d4e8]/50 normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    rows={5}
                    maxLength={2000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What would you like to offer?"
                    className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-[#b8d4e8]/40 outline-none focus:border-[#7ec8e3]/50"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="glow-btn inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Send <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Desmond closing note */}
        <section className="mt-24 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#7ec8e3]/30 bg-[#7ec8e3]/10">
            <span className="display text-2xl text-white">DO</span>
          </div>
          <blockquote className="mx-auto mt-8 max-w-2xl space-y-2 text-lg italic leading-relaxed text-[#b8d4e8]">
            <p>"Sunya is the most important work I've ever done.</p>
            <p>Not because of what it is today — but because of what it's becoming.</p>
            <p>If you're reading this, you already know something is shifting in the world.</p>
            <p>I'm glad you're here."</p>
          </blockquote>
          <div className="mt-6 text-sm text-[#b8d4e8]/80">— Desmond Olubunmi</div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
