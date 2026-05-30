import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { SunyaAI } from "@/components/SunyaAI";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Orbs, SacredGeometry } from "@/components/site/Decor";
import { useSubscription } from "@/hooks/useSubscription";
import desmondImg from "@/assets/desmond.jpg";

function useSunyaCtaLabel(freeSuffix = "") {
  const { isActive } = useSubscription();
  if (isActive) return "Use Sunya AI";
  return freeSuffix ? `Try Sunya AI${freeSuffix}` : "Try Sunya AI";
}

export const Route = createFileRoute("/")({
  component: IndexPage,
  head: () => ({
    meta: [
      { title: "Sunya — A universal system for inner transformation" },
      {
        name: "description",
        content:
          "You are not broken. You are contracted. Sunya is a complete, practical framework for human wellbeing — rooted in the timeless mechanics of consciousness.",
      },
    ],
  }),
});

function Hero() {
  const ctaLabel = useSunyaCtaLabel();
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
          <Link
            to="/sunya-ai"
            className="glow-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide"
          >
            {ctaLabel} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/philosophy"
            className="group inline-flex items-center gap-2 text-sm text-[#b8d4e8] transition hover:text-white"
          >
            Explore the Philosophy
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
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
      copy: "You've read the books, tried different paths, had glimpses — but nothing has fully landed or stayed.",
    },
    {
      icon: "⚡",
      title: "The Inner Depletion",
      copy: "Low energy, chronic anxiety, the feeling of running on empty — no matter how much you rest.",
    },
    {
      icon: "🌊",
      title: "The Disconnection",
      copy: "From yourself. From others. A persistent feeling of being a separate, isolated person in a hostile universe.",
    },
    {
      icon: "🔁",
      title: "The Endless Cycle",
      copy: "You achieve the thing. You feel better — briefly. Then the emptiness returns, and the seeking begins again. This cycle is not a personal failing. It is what happens when an inner problem is solved with outer solutions.",
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
          <div className="mx-auto mt-10 max-w-2xl space-y-10 text-[#b8d4e8]">
            <p>
              You've tried everything. More achievement. More experiences. More stimulation. A new
              relationship, a better job, a bigger goal. And it works — briefly. Then the feeling returns.
            </p>
            <p>
              This is a closed system trying to fill an infinite inner need with finite external things.
            </p>
            <p>
              It cannot work. Not because you are broken — but because finite things cannot produce infinite
              fulfilment.
            </p>
          </div>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.title} className="glass-card p-7">
              <div className="text-3xl">{c.icon}</div>
              <h3 className="display mt-5 text-2xl text-white">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b8d4e8]">{c.copy}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-[#7ec8e3]/50 to-transparent" />
          <p className="mt-8 text-center text-xs uppercase leading-relaxed tracking-[0.3em] text-[#b8d4e8]">
            The world will always be unstable.
            <br />
            Your inner state doesn't have to be.
          </p>
        </div>
      </div>
    </section>
  );
}

function Reframe() {
  const causes = [
    { n: "01", t: "Resistance", cure: "Total surrender." },
    { n: "02", t: "Identification", cure: "Un-defining yourself." },
    { n: "03", t: "The Separate Self", cure: "Seeing through it." },
    { n: "04", t: "Unconsciousness", cure: "Pure observation." },
  ];
  return (
    <section className="relative overflow-hidden bg-[#0a1628] py-32">
      <SacredGeometry className="right-[-200px] top-1/4 h-[800px] w-[800px]" />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="text-center">
          <div className="label-eyebrow">The reframe</div>
          <p className="mx-auto mt-8 max-w-xl text-[#b8d4e8]">
            Every form of human suffering traces back to four root causes. Each has a precise cure.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {causes.map((c) => (
            <div key={c.t} className="glass-card p-6">
              <div className="font-display text-xs tracking-[0.4em] text-[#7ec8e3]">{c.n}</div>
              <h3 className="display mt-3 text-2xl text-white">{c.t}</h3>
              <p className="mt-4 border-t border-white/10 pt-3 text-xs uppercase tracking-[0.2em] text-[#7ec8e3]/80">
                Cure
              </p>
              <p className="mt-1 text-sm italic text-white/90">{c.cure}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/philosophy"
            className="inline-flex items-center gap-2 text-sm text-[#7ec8e3] transition hover:text-white"
          >
            Explore the full philosophy <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function AITeaser() {
  return (
    <section className="relative overflow-hidden bg-[#060d1c] py-32">
      <Starfield density={0.6} />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="label-eyebrow">Meet Sunya AI</div>
          <h2 className="display mt-6 text-4xl text-white sm:text-6xl">
            Your personal diagnostic
            <br />
            <span className="display-italic text-[#b8d4e8]">for inner transformation</span>
          </h2>
        </div>
        <div className="mt-14">
          <SunyaAI />
          <div className="mt-8 text-center">
            <Link
              to="/sunya-ai"
              className="inline-flex items-center gap-2 text-sm text-[#7ec8e3] transition hover:text-white"
            >
              Want to go deeper? Explore the full experience <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const ctaLabel = useSunyaCtaLabel(" Free");
  const [expanded, setExpanded] = useState(false);
  return (
    <section
      id="about"
      className="relative overflow-hidden py-32"
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #1a1530 50%, #2a1a1f 100%)",
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
            Spiritual teacher. Visionary.
          </p>
          <div className="mt-8 space-y-4 text-[#b8d4e8]">
            <p>Everything humans do is an attempt to be happy.</p>
            <p>
              We earn degrees, build careers, raise children, enter relationships, pray, meditate.
              Every act — however it appears — is aimed at one thing: reducing suffering and
              realising happiness. This is the most universal human truth there is.
            </p>
            <p>
              We have more comfort, more information, and more options than any generation before
              us. But can we say we are happier?
            </p>
            <p>
              Born in Nigeria, raised in Ireland, I was exposed early to radically different
              cultures and ways of understanding life. Christians, Muslims, Hindus, Buddhists,
              scientists, therapists — all essentially trying to create human well-being. I wanted
              to know the truth of human life. Not what people believed. What was actually true.
            </p>
            <p>
              That curiosity was always in me — even as a child I had a deep sense of reverence
              for something sacred in life, even before I could name it.
            </p>
            <p>But it was suffering that made the question urgent.</p>
            <p>
              In my teens, my nervous system was constantly dysregulated. My mind wouldn't stop. I
              couldn't sleep. The inner chaos became intolerable — and that intolerance became the
              catalyst. I found mindful breathing practices — and for the first time, I
              experienced inner peace. Not by believing in something, but by working with the
              natural mechanics of my own system.
            </p>
            {expanded && (
              <>
                <p>
                  This relief inspired a journey into deeper practice and curiosity — to understand
                  the mechanisms of human life. I practiced daily for many years, long hours, multiple
                  silent retreats, including several ten-day Vipassana retreats — where I sat until
                  thought and time dissolved and what remained was pure awareness, totally alive and
                  still.
                </p>
                <p>And gradually, what became clear was this:</p>
                <p>
                  Every tradition, every religion, every healing modality — different brands, one
                  human system, one truth.
                </p>
                <p>
                  I began to distil. I traced every practice back to its essence — breathwork,
                  movement, sound, meditation, devotion, nutrition, environment — asking: what is this
                  fundamentally doing to the human system? What is it actually changing?
                </p>
                <p>That process became Sunya.</p>
                <p>
                  Not a belief system. Not a tradition. A universal map — built on first principles,
                  belonging to no culture, accessible to every human being.
                </p>
                <p>
                  We all want the same thing: freedom from suffering and the realisation of lasting
                  happiness. Sunya exists to make that available — without dogma, without belief,
                  without asking you to convert to anything.
                </p>
                <p className="text-white/90">
                  I built this because I lived the problem. And found the path through it.
                </p>
                <p>Now it's yours.</p>
                <p className="display-italic">— Desmond</p>
              </>
            )}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 inline-flex items-center gap-1 text-xs uppercase tracking-[0.32em] text-[#7ec8e3] transition hover:text-white"
            >
              {expanded ? "Read less" : "Read more"}
              <ChevronDown
                className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/work-with-me"
              hash="booking"
              className="glow-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              Work With Me 1-on-1 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/sunya-ai"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white transition hover:border-[#7ec8e3]/50 hover:bg-white/5"
            >
              {ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const ctaLabel = useSunyaCtaLabel();
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#060d1c] py-32">
      <div
        className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, #7ec8e3 0%, #1b4f8a 25%, transparent 60%)",
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
        <Link
          to="/sunya-ai"
          className="glow-btn mt-12 inline-flex items-center gap-2 rounded-full px-10 py-5 text-base font-medium"
        >
          {ctaLabel} <ArrowUpRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}

export function IndexPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <main>
        <Hero />
        <Pain />
        <Reframe />
        <AITeaser />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
