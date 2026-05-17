import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Wind,
  Eye,
  Brain,
  Heart,
  Activity,
  Music,
  Moon,
  Leaf,
  Users,
  Home as HomeIcon,
  Trees,
  Sun,
  Instagram,
  Youtube,
  Sparkles,
  BookOpen,
  Building2,
  Globe2,
  CheckCircle2,
} from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { SunyaAI } from "@/components/SunyaAI";
import desmondImg from "@/assets/desmond.jpg";

export const Route = createFileRoute("/")({ component: Index });

const NAV = [
  { label: "About", href: "#about" },
  { label: "The Philosophy", href: "#philosophy" },
  { label: "Sunya AI", href: "#sunya-ai" },
  { label: "Work With Me", href: "#work" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-white/10 bg-[#0a1628]/70 backdrop-blur-xl" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="group flex items-baseline gap-3">
          <span className="display text-2xl tracking-[0.4em] text-white">SUNYA</span>
          <span className="hidden text-xs italic text-[#b8d4e8]/70 sm:inline">
            by Desmond Olubunmi
          </span>
        </a>
        <div className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-[#b8d4e8] transition hover:text-white"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#sunya-ai"
            className="glow-btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
          >
            Try Sunya AI <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <button
          aria-label="Menu"
          className="rounded-md border border-white/10 p-2 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-[#0a1628]/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-[#b8d4e8] transition hover:bg-white/5 hover:text-white"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#sunya-ai"
              onClick={() => setOpen(false)}
              className="glow-btn mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
            >
              Try Sunya AI <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Orbs() {
  return (
    <>
      <div
        className="orb"
        style={{
          width: 480,
          height: 480,
          left: "-8%",
          top: "10%",
          background: "radial-gradient(circle, #1b4f8a 0%, transparent 70%)",
        }}
      />
      <div
        className="orb"
        style={{
          width: 380,
          height: 380,
          right: "-6%",
          top: "30%",
          background: "radial-gradient(circle, #7ec8e3 0%, transparent 70%)",
          opacity: 0.25,
          animationDelay: "-6s",
        }}
      />
    </>
  );
}

function SacredGeometry({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={`pointer-events-none absolute opacity-[0.07] ${className}`}
      aria-hidden
    >
      <g fill="none" stroke="#7ec8e3" strokeWidth="0.5" className="spin-slow" style={{ transformOrigin: "300px 300px" }}>
        <circle cx="300" cy="300" r="120" />
        <circle cx="300" cy="180" r="120" />
        <circle cx="300" cy="420" r="120" />
        <circle cx="404" cy="240" r="120" />
        <circle cx="404" cy="360" r="120" />
        <circle cx="196" cy="240" r="120" />
        <circle cx="196" cy="360" r="120" />
        <circle cx="300" cy="300" r="240" />
        <circle cx="300" cy="300" r="260" />
      </g>
    </svg>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      <Starfield density={1.2} />
      <Orbs />
      <SacredGeometry className="inset-0 m-auto h-[700px] w-[700px]" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="label-eyebrow reveal">A universal system for inner transformation</div>
        <h1 className="display reveal mt-6 text-5xl text-white sm:text-7xl md:text-[5.5rem]">
          You are not broken.
          <br />
          <span className="display-italic text-[#b8d4e8]">You are contracted.</span>
        </h1>
        <p className="reveal mx-auto mt-8 max-w-2xl text-base leading-relaxed text-[#b8d4e8] sm:text-lg">
          Sunya is a complete, practical framework for human wellbeing — rooted in the timeless mechanics
          of consciousness, not belief, not religion, not dogma. Just the truth of how you work.
        </p>
        <div className="reveal mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <a
            href="#sunya-ai"
            className="glow-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide"
          >
            Try Sunya AI — Free <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#philosophy"
            className="group inline-flex items-center gap-2 text-sm text-[#b8d4e8] transition hover:text-white"
          >
            Explore the Philosophy
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>
        <p className="mt-8 text-xs uppercase tracking-[0.32em] text-[#b8d4e8]/60">
          No belief required · No tradition · Just what works
        </p>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="chev h-6 w-6 text-[#b8d4e8]/60" />
      </div>
    </section>
  );
}

function Pain() {
  const cards = [
    {
      icon: "🌀",
      title: "The Endless Search",
      copy: "You've read the books, tried the paths, had glimpses — but nothing has fully landed or stayed.",
    },
    {
      icon: "⚡",
      title: "The Inner Depletion",
      copy: "Low energy, chronic anxiety, the feeling of running on empty — no matter how much you rest.",
    },
    {
      icon: "🌊",
      title: "The Disconnection",
      copy: "From yourself. From others. From meaning. Like you're watching your own life from behind glass.",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-[#060d1c] py-32">
      <Starfield density={0.4} />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="text-center">
          <div className="label-eyebrow">You know this feeling</div>
          <h2 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
            Something is missing.
            <br />
            <span className="display-italic text-[#b8d4e8]">You can't name it. But you feel it.</span>
          </h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-5 text-[#b8d4e8]">
            <p>
              You've achieved things. You've tried things. Maybe meditation, maybe therapy, maybe
              philosophy, maybe religion. Maybe nothing at all.
            </p>
            <p>
              And yet there is this persistent sense — an emptiness underneath everything. A restlessness
              that no achievement, relationship, or experience fully resolves.
            </p>
            <p className="text-white/90">
              This is not a personal failure. This is a mechanical condition. And it has a precise
              solution.
            </p>
          </div>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="glass-card p-7">
              <div className="text-3xl">{c.icon}</div>
              <h3 className="display mt-5 text-2xl text-white">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b8d4e8]">{c.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  const causes = [
    { n: "01", t: "Resistance", c: "Fighting the present moment creates all suffering.", cure: "Total surrender." },
    { n: "02", t: "Identification", c: "Mistaking the temporary for the permanent.", cure: "Un-defining yourself." },
    { n: "03", t: "The Separate Self", c: "The illusion of isolation.", cure: "Seeing through it." },
    { n: "04", t: "Unconsciousness", c: "Sleepwalking through life.", cure: "Pure observation." },
  ];
  return (
    <section id="philosophy" className="relative overflow-hidden bg-[#0a1628] py-32">
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          left: "-15%",
          top: "10%",
          background: "radial-gradient(circle, #2e6db4 0%, transparent 70%)",
          opacity: 0.3,
        }}
      />
      <SacredGeometry className="right-[-200px] top-1/4 h-[800px] w-[800px]" />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="text-center">
          <div className="label-eyebrow">The root cause</div>
          <h2 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
            This is not a psychological problem.
            <br />
            <span className="display-italic text-[#b8d4e8]">It is an energetic one.</span>
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-2xl space-y-5 text-[#b8d4e8]">
          <p>
            Every spiritual tradition in human history — from Vedanta to Taoism, from Sufism to modern
            neuroscience — is working on the same system.
          </p>
          <p>
            The pranic body. The vital energy field that runs through everything you are. When this system
            is contracted — through resistance, identification, unconsciousness, and the illusion of a
            separate self — you suffer. When it opens, you are free.
          </p>
          <p className="text-white/90">
            Sunya is the unified map. The first principles. The direct tools. No tradition required. No
            conversion required. Just the mechanics.
          </p>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {causes.map((c) => (
            <div key={c.t} className="glass-card p-6">
              <div className="font-display text-xs tracking-[0.4em] text-[#7ec8e3]">{c.n}</div>
              <h3 className="display mt-3 text-2xl text-white">{c.t}</h3>
              <p className="mt-3 text-sm text-[#b8d4e8]">{c.c}</p>
              <p className="mt-4 border-t border-white/10 pt-3 text-xs uppercase tracking-[0.2em] text-[#7ec8e3]/80">
                Cure
              </p>
              <p className="mt-1 text-sm italic text-white/90">{c.cure}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const INTERNAL = [
  { Icon: Wind, t: "Breath", c: "The remote control for your nervous system" },
  { Icon: Eye, t: "Awareness", c: "The master switch of all transformation" },
  { Icon: Brain, t: "Mind", c: "Training the intellect from scatter to clarity" },
  { Icon: Heart, t: "Heart", c: "Dissolving emotional armour into unconditional openness" },
  { Icon: Activity, t: "Movement", c: "Releasing stored resistance from the physical body" },
  { Icon: Music, t: "Sound", c: "Vibrational tuning of the entire human system" },
];
const EXTERNAL = [
  { Icon: Moon, t: "Sleep", c: "The non-negotiable biological reset" },
  { Icon: Leaf, t: "Nutrition", c: "High-frequency fuel for a high-frequency life" },
  { Icon: Users, t: "Connection", c: "Healing the illusion of separation" },
  { Icon: HomeIcon, t: "Environment", c: "Your space mirrors your inner state" },
  { Icon: Trees, t: "Nature", c: "Syncing your rhythms with the Earth" },
  { Icon: Sun, t: "Sustenance", c: "Transforming work into frictionless service" },
];

function Levers() {
  return (
    <section className="relative overflow-hidden bg-[#0a1628] py-32">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'><polygon points='30,2 56,17 56,47 30,62 4,47 4,17' fill='none' stroke='%237ec8e3' stroke-width='0.5'/></svg>\")",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="label-eyebrow">The Sunya method</div>
          <h2 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
            12 Levers. One Machine.
            <br />
            <span className="display-italic text-[#b8d4e8]">Complete Freedom.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[#b8d4e8]">
            The human system operates across 7 layers of being. Sunya gives you the precise tools to work
            on each one — from the breath to the body, from the mind to the environment.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="label-eyebrow mb-6">The 6 Internal Levers</h3>
            <div className="space-y-3">
              {INTERNAL.map((l, i) => (
                <LeverRow key={l.t} n={i + 1} {...l} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="label-eyebrow mb-6">The 6 External Pillars</h3>
            <div className="space-y-3">
              {EXTERNAL.map((l, i) => (
                <LeverRow key={l.t} n={i + 7} {...l} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="#sunya-ai"
            className="inline-flex items-center gap-2 text-sm text-[#7ec8e3] transition hover:text-white"
          >
            Explore your unique imbalance with Sunya AI
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function LeverRow({ n, Icon, t, c }: { n: number; Icon: any; t: string; c: string }) {
  return (
    <div className="glass-card flex items-center gap-4 p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7ec8e3]/10 ring-1 ring-[#7ec8e3]/20">
        <Icon className="h-5 w-5 text-[#7ec8e3]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <span className="text-xs text-[#7ec8e3]/70">{String(n).padStart(2, "0")}</span>
          <h4 className="display text-xl text-white">{t}</h4>
        </div>
        <p className="mt-1 text-sm text-[#b8d4e8]">{c}</p>
      </div>
    </div>
  );
}

function AISection() {
  return (
    <section id="sunya-ai" className="relative overflow-hidden bg-[#060d1c] py-32">
      <Starfield density={0.6} />
      <div
        className="orb"
        style={{
          width: 700,
          height: 700,
          left: "50%",
          top: "20%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, #1b4f8a 0%, transparent 70%)",
          opacity: 0.4,
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="label-eyebrow">Meet Sunya AI</div>
          <h2 className="display mt-6 text-4xl text-white sm:text-6xl md:text-7xl">
            Your personal diagnostic
            <br />
            <span className="display-italic text-[#b8d4e8]">for inner transformation</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[#b8d4e8]">
            Describe what you're going through. Sunya AI analyses your situation through the four root
            causes and twelve levers — and gives you the precise practice to work with today.
          </p>
        </div>
        <div className="mt-14">
          <SunyaAI />
          <p className="mt-6 text-center text-sm text-[#b8d4e8]/70">
            Your first session is free. Unlimited access from{" "}
            <span className="text-white">€29/month</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

function Outcomes() {
  const cards = [
    {
      icon: "🧘",
      title: "Mental & Emotional Rest",
      copy: "Intrinsic contentment. The end of rumination. Freedom from anxiety — not through suppression, but through understanding the root.",
    },
    {
      icon: "⚡",
      title: "Vital Energy",
      copy: "The pranic body opens. Sleep deepens. The day becomes lighter. Activity flows from fullness instead of from depletion.",
    },
    {
      icon: "🎯",
      title: "Clarity & Direction",
      copy: "Decision-making becomes obvious. The mental fog lifts. You can see your life from outside the noise of the small self.",
    },
    {
      icon: "🌊",
      title: "The External Reality",
      copy: "Conflict drops. Reactivity dissolves. The people around you feel the difference before you even speak.",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1628] to-[#0d1f3c] py-32">
      <div
        className="orb"
        style={{
          width: 800,
          height: 800,
          right: "-20%",
          bottom: "-30%",
          background: "radial-gradient(circle, #7ec8e3 0%, transparent 70%)",
          opacity: 0.18,
        }}
      />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="text-center">
          <div className="label-eyebrow">What changes</div>
          <h2 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
            Sunya doesn't ask for faith.
            <br />
            <span className="display-italic text-[#b8d4e8]">It demands results.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[#b8d4e8]">
            The validity of this system is not measured by how well you understand it intellectually. It
            is measured by the undeniable, real-world changes in your daily life.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((c) => (
            <div key={c.title} className="glass-card p-7">
              <div className="text-3xl">{c.icon}</div>
              <h3 className="display mt-4 text-2xl text-white">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b8d4e8]">{c.copy}</p>
            </div>
          ))}
        </div>
        <p className="display-italic mt-14 text-center text-2xl text-white/90 sm:text-3xl">
          Simply put — everything about you gets better.
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-32"
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #1a1530 50%, #2a1a1f 100%)",
      }}
    >
      <div className="relative z-10 mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-5 lg:items-center">
        <div className="lg:col-span-2">
          <div className="glass relative overflow-hidden rounded-3xl">
            <img
              src={desmondImg}
              alt="Desmond Olubunmi"
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-[4/5] h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1628]/40 via-transparent to-transparent" />
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="label-eyebrow">The founder</div>
          <h2 className="display mt-5 text-4xl text-white sm:text-6xl">Desmond Olubunmi</h2>
          <p className="display-italic mt-3 text-lg text-[#b8d4e8]">
            Nigerian-Irish. 23. Built this because he needed it.
          </p>
          <div className="mt-8 space-y-4 text-[#b8d4e8]">
            <p>
              I grew up between worlds — Nigerian roots, Irish upbringing, a mind that couldn't stop
              asking why.
            </p>
            <p>
              Why do humans suffer? Why does every tradition point to the same thing but speak in
              different languages? Why does the peace people find in meditation, in prayer, in therapy,
              in nature — why does it never fully stick?
            </p>
            <p>
              I went deep. Vedanta. Taoism. Neuroscience. Kabbalah. Sufism. Isha Yoga. Sadhguru. Mooji.
              The mystics, the scientists, the meditators. And underneath all of it, I found the same
              mechanics. The same root causes. The same levers.
            </p>
            <p className="text-white/90">
              Sunya is the distillation of that search — a universal map that belongs to no tradition,
              but honours all of them.
            </p>
            <p className="text-white/90">
              If you're reading this, you probably already know what I'm talking about. You've felt the
              gap. You know something deeper is possible. This is for you.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#work"
              className="glow-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              Work With Me 1-on-1 <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#sunya-ai"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white transition hover:border-[#7ec8e3]/50 hover:bg-white/5"
            >
              Try Sunya AI Free <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  const includes = [
    "A full diagnostic of your current state across all 7 layers",
    "Identification of your primary root cause and dominant lever imbalances",
    "A personalised practice protocol built around your life",
    "Direct transmission — not just information, but presence",
    "Voice/video session, 60–90 minutes",
  ];
  return (
    <section id="work" className="relative overflow-hidden bg-[#0a1628] py-32">
      <SacredGeometry className="-left-40 top-20 h-[700px] w-[700px]" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="label-eyebrow">Direct work</div>
          <h2 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
            Work With Desmond
            <br />
            <span className="display-italic text-[#b8d4e8]">One-on-One</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[#b8d4e8]">
            For those ready to go deeper than a tool can take them. A direct, personalised engagement
            with the full Sunya framework — applied to your specific life, your specific situation, your
            specific system.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-3">
            <h3 className="label-eyebrow mb-6">What a session includes</h3>
            <ul className="space-y-3">
              {includes.map((i) => (
                <li key={i} className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#7ec8e3]" />
                  <span className="text-[#b8d4e8]">{i}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="glass-strong rounded-3xl p-8">
              <div className="label-eyebrow">Single Session</div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="display text-5xl text-white">€[Price]</span>
                <span className="text-sm text-[#b8d4e8]">/ 90 min</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-[#b8d4e8]">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#7ec8e3]" /> Full Sunya diagnostic
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#7ec8e3]" /> Personalised practice protocol
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#7ec8e3]" /> Follow-up voice note within 48hrs
                </li>
              </ul>
              <button className="glow-btn mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium">
                Book a Session <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-5 text-center text-xs text-[#b8d4e8]/60">
                Calendar embed (Cal.com / Calendly) goes here.
              </p>
            </div>
            <p className="mt-5 text-center text-xs text-[#b8d4e8]/60">
              Limited availability. Desmond works with a small number of people at any given time to
              ensure full presence and depth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Vision() {
  const eco = [
    { Icon: Sparkles, t: "Sunya AI", c: "The diagnostic intelligence" },
    { Icon: BookOpen, t: "Sunya Publishing", c: "The intellectual anchors" },
    { Icon: Building2, t: "Sunya Sanctuaries", c: "The physical spaces" },
    { Icon: Globe2, t: "Sunya Education", c: "Transformation at scale" },
  ];
  return (
    <section className="relative overflow-hidden bg-[#060d1c] py-32">
      <Starfield density={1.4} />
      <div
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 spin-slow"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #2e6db4 0%, #0a1628 60%, transparent 80%)",
          boxShadow: "0 0 120px 30px rgba(126,200,227,0.15)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="text-center">
          <div className="label-eyebrow">The mission</div>
          <h2 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
            This is bigger than
            <br />
            <span className="display-italic text-[#b8d4e8]">a product.</span>
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-2xl space-y-5 text-[#b8d4e8]">
          <p>Sunya is a civilisational project.</p>
          <p>
            The vision is a world where human beings stop exporting their freedom to an imagined
            afterlife — and start living it here, now, in this body, in this lifetime.
          </p>
          <p>
            A world where technology and spirituality are not enemies, but partners in the liberation of
            human potential.
          </p>
          <p>
            A world with Sunya Sanctuaries — physical spaces of inner transformation powered by solar
            energy, AI, and the living transmission of truth.
          </p>
          <p className="text-white/90">
            A world where the mechanics of human wellbeing are taught in schools, offered in prisons,
            brought to the military, made available to everyone — regardless of religion, culture, or
            tradition.
          </p>
          <p className="display-italic text-xl text-white">
            We are at the beginning. You are part of this.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {eco.map((e) => (
            <div key={e.t} className="glass-card p-5">
              <e.Icon className="h-5 w-5 text-[#7ec8e3]" />
              <div className="display mt-4 text-xl text-white">{e.t}</div>
              <p className="mt-1 text-sm text-[#b8d4e8]">{e.c}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#sunya-ai"
            className="glow-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
          >
            Begin Here → Try Sunya AI
          </a>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#060d1c] py-32">
      <div
        className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, #7ec8e3 0%, #1b4f8a 25%, transparent 60%)",
          filter: "blur(20px)",
          opacity: 0.4,
          animation: "pulse-glow 6s ease-in-out infinite",
        }}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="display text-5xl text-white sm:text-7xl md:text-8xl">The search ends here.</h2>
        <p className="mx-auto mt-8 max-w-xl text-lg text-[#b8d4e8]">
          Not because you've found a belief to hold onto.{" "}
          <span className="text-white">Because you've found the mechanism underneath all of them.</span>
        </p>
        <a
          href="#sunya-ai"
          className="glow-btn mt-12 inline-flex items-center gap-2 rounded-full px-10 py-5 text-base font-medium"
        >
          Try Sunya AI — Free <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060d1c]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3 md:items-center">
        <div>
          <div className="display text-xl tracking-[0.4em] text-white">SUNYA</div>
          <div className="mt-1 text-xs italic text-[#b8d4e8]/70">by Desmond Olubunmi</div>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#b8d4e8]">
          <a href="#" className="hover:text-white">
            Home
          </a>
          <a href="#philosophy" className="hover:text-white">
            Philosophy
          </a>
          <a href="#sunya-ai" className="hover:text-white">
            Sunya AI
          </a>
          <a href="#work" className="hover:text-white">
            Work With Me
          </a>
        </nav>
        <div className="flex justify-start gap-3 md:justify-end">
          {[Instagram, Youtube].map((Ic, i) => (
            <a
              key={i}
              href="#"
              aria-label="social"
              className="rounded-full border border-white/10 p-2.5 text-[#b8d4e8] transition hover:border-[#7ec8e3]/40 hover:text-white"
            >
              <Ic className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-white/5 px-6 py-6 text-center text-xs text-[#b8d4e8]/50">
        © 2026 Desmond Olubunmi · desmondolubunmi.com
        <div className="mt-1 text-[10px] tracking-[0.3em]">BUILT ON TRUTH · POWERED BY SUNYA</div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <main>
        <Hero />
        <Pain />
        <Philosophy />
        <Levers />
        <AISection />
        <Outcomes />
        <About />
        <Work />
        <Vision />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
