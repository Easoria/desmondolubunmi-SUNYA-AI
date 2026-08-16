import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { SunyaAI } from "@/components/SunyaAI";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { EmailCapture } from "@/components/site/EmailCapture";
import { Orbs, SacredGeometry } from "@/components/site/Decor";
import { useSubscription } from "@/hooks/useSubscription";
import { fetchNextUpcomingGatheringClient } from "@/lib/gatherings-browser";
import {
  formatGatheringCardWhen,
  gatheringLocationLine,
} from "@/lib/gatherings";
import desmondImg from "@/assets/desmond.jpg";

function useSunyaCtaLabel(freeSuffix = "") {
  const { isActive } = useSubscription();
  if (isActive) return "Use Sunya AI";
  return freeSuffix ? `Try Sunya AI${freeSuffix}` : "Try Sunya AI";
}


function Hero() {
  const secondaryBtn =
    "inline-flex w-full items-center justify-center rounded-full border border-[#7ec8e3]/45 bg-white/[0.02] px-7 py-3.5 text-sm font-medium tracking-wide text-[#dcecf7] transition hover:border-[#7ec8e3]/70 hover:bg-white/[0.06] hover:shadow-[0_0_26px_-10px_rgba(126,200,227,0.75)] sm:w-auto";

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16 sm:pt-24">
      <Starfield density={1.2} />
      <Orbs />
      <SacredGeometry className="inset-0 m-auto h-[700px] w-[700px]" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="label-eyebrow reveal">A universal system for human wellbeing</div>
        <div className="reveal mt-4 flex flex-col items-center sm:mt-6">
          <img
            src={desmondImg}
            alt="Desmond Olubunmi"
            width={120}
            height={120}
            className="h-24 w-24 rounded-full object-cover ring-2 ring-[#7ec8e3]/45 shadow-[0_0_36px_-10px_rgba(126,200,227,0.85)] transition hover:ring-[#7ec8e3]/65 hover:shadow-[0_0_46px_-10px_rgba(126,200,227,0.95)] sm:h-[120px] sm:w-[120px]"
          />
        </div>
        <h1 className="display reveal mt-8 text-[1.5rem] leading-[1.2] text-white sm:mt-10 sm:text-5xl sm:leading-[1.15] md:text-6xl lg:text-[3.75rem]">
          Every difficult state has a way out.
        </h1>
        <p className="reveal mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#b8d4e8] sm:mt-5 sm:text-lg">
          A complete map of human wellbeing — what goes wrong, why, and exactly what to do about it. 112 practices, and a way of knowing which one you need.
        </p>
        <div className="reveal mx-auto mt-8 max-w-3xl sm:mt-12">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
            <Link
              to="/work-with-me"
              className="glow-btn inline-flex w-full items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium tracking-wide sm:w-auto"
            >
              Work with me 1-on-1
            </Link>
            <Link to="/problems" className={secondaryBtn}>
              Find what helps
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/gatherings"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#7ec8e3] transition hover:text-white"
            >
              Upcoming gatherings →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pain() {
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
          <div className="mx-auto mt-10 max-w-[640px] space-y-8 text-[#b8d4e8]">
            <p>
              You've tried everything. More achievement. More experiences. More stimulation. A new
              relationship, a better job, a bigger goal. And it works — briefly. Then the feeling returns.
            </p>
            <p>
              This is a closed system trying to fill an infinite inner need with finite external things.
            </p>
            <p>
              It cannot work. Not because you are broken — but because you cannot reach infinity by adding.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-[#7ec8e3]/50 to-transparent" />
          <p className="mt-8 text-center text-xs uppercase leading-relaxed tracking-[0.3em] text-[#b8d4e8]">
            The world will always be unstable.
            <br />
            Your inner state doesn't have to be.
          </p>
          <div className="mt-6 text-center">
            <Link
              to="/practices"
              className="inline-flex items-center gap-2 text-sm text-[#b8d4e8] transition hover:text-white"
            >
              Explore the practices →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reframe() {
  const chainLinks = [
    {
      n: "01",
      name: "Unconsciousness",
      line: "We are born with our senses turned outward for survival — unaware of the source of life within.",
    },
    {
      n: "02",
      name: "Identification",
      line: "So we take ourselves to be the nearest things: the body, our thoughts, what we accumulate. And every identification draws a boundary.",
    },
    {
      n: "03",
      name: "Resistance",
      line: "Inside that boundary we live in fear, bracing against everything that threatens our limited sense of self.",
    },
    {
      n: "04",
      name: "Contraction",
      line: "The bracing stops being a thought and becomes physical — restricting the flow of life through the system, felt as tension, anger, unease.",
    },
    {
      n: "05",
      name: "Insufficiency",
      line: "A closed system runs low. So we reach outward, trying to fill an infinite emptiness with finite things.",
    },
  ];
  const sectionRef = useRef<HTMLElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [revealed, setRevealed] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setRevealed(true);
      return;
    }
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.24 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const desktopStepClasses = ["md:mt-0", "md:mt-1", "md:mt-2", "md:mt-3", "md:mt-4"];
  const mobileWidthClasses = ["w-full", "w-[98%]", "w-[96%]", "w-[94%]", "w-[92%]"];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0a1628] py-32">
      <SacredGeometry className="right-[-200px] top-1/4 h-[800px] w-[800px]" />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="text-center">
          <div className="label-eyebrow">THE REFRAME</div>
          <h2 className="display mt-6 text-4xl text-white sm:text-5xl">
            Every form of human suffering traces back to a single root.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-[#b8d4e8]">
            Not a set of separate problems. One chain, built in a fixed order, where each link produces the next.
          </p>
        </div>
        <div className="relative mx-auto mt-14 max-w-4xl md:max-w-none">
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-12 hidden md:block">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#7ec8e3]/50 to-transparent" />
            {!reduceMotion && (
              <div className="reframe-connector-pulse absolute left-0 top-1/2 h-[2px] w-24 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-[#7ec8e3]/80 to-transparent blur-[1px]" />
            )}
          </div>
          <div className="pointer-events-none absolute bottom-12 left-1/2 top-12 block w-px -translate-x-1/2 md:hidden">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-[#7ec8e3]/45 to-transparent" />
            {!reduceMotion && (
              <div className="reframe-connector-pulse-mobile absolute left-1/2 top-0 h-16 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-[#7ec8e3]/75 to-transparent blur-[1px]" />
            )}
          </div>
          <div className="flex flex-col items-center gap-4 md:grid md:grid-cols-5 md:items-stretch md:gap-4">
            {chainLinks.map((link, index) => (
              <div
                key={link.name}
                className={`${mobileWidthClasses[index]} ${desktopStepClasses[index]} glass-card relative z-10 flex h-full flex-col p-5 transition-all duration-700 md:w-full ${
                  revealed ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
                style={{
                  transitionDelay: reduceMotion ? "0ms" : `${index * 120}ms`,
                  transitionDuration: reduceMotion ? "0ms" : "700ms",
                  backgroundColor: `rgba(10, 22, 40, ${0.56 + index * 0.05})`,
                }}
              >
                <div className="font-display text-xl tracking-[0.16em] text-[#7ec8e3]/45">{link.n}</div>
                <h3 className="display mt-2 text-2xl text-white">{link.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#b8d4e8]">{link.line}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="display mx-auto mt-12 max-w-3xl text-center text-3xl text-white sm:text-4xl">
          Pull the root, and every link lets go at once.
        </p>
        <div className="mt-8 text-center">
          <Link
            to="/philosophy"
            className="inline-flex items-center gap-2 text-sm text-[#7ec8e3] transition hover:text-white"
          >
            Explore the full philosophy →
          </Link>
        </div>
      </div>
      <style>{`
        @keyframes reframeConnectorPulse {
          0% { transform: translateX(0); opacity: 0.25; }
          50% { opacity: 0.7; }
          100% { transform: translateX(calc(100% - 6rem)); opacity: 0.2; }
        }
        @keyframes reframeConnectorPulseMobile {
          0% { transform: translate(-50%, 0); opacity: 0.3; }
          50% { opacity: 0.7; }
          100% { transform: translate(-50%, calc(100% - 4rem)); opacity: 0.2; }
        }
        .reframe-connector-pulse { animation: reframeConnectorPulse 3.6s ease-in-out infinite; }
        .reframe-connector-pulse-mobile { animation: reframeConnectorPulseMobile 3.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .reframe-connector-pulse,
          .reframe-connector-pulse-mobile {
            animation: none !important;
          }
        }
      `}</style>
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
          <SunyaAI hideSessionCounter />
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
  const ctaLabel = useSunyaCtaLabel();
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
            <p>
              Sunya is a complete, practical framework for human wellbeing, rooted in the timeless
              mechanics of consciousness.
            </p>
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

function NextGathering() {
  const { data: gathering, isLoading } = useQuery({
    queryKey: ["gatherings", "next-upcoming"],
    queryFn: fetchNextUpcomingGatheringClient,
    staleTime: 60_000,
  });

  if (isLoading || !gathering) return null;

  const location = gatheringLocationLine(gathering);

  return (
    <section className="relative overflow-hidden bg-[#0a1628] py-20">
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="label-eyebrow">Next gathering</div>
        <p className="mt-5 font-display text-lg tracking-wide text-white sm:text-xl">
          {formatGatheringCardWhen(gathering.starts_at, gathering.timezone)} · {gathering.title}
        </p>
        {location ? (
          <p className="mt-3 text-sm text-[#b8d4e8]/80">{location}</p>
        ) : null}
        <Link
          to="/gatherings/$slug"
          params={{ slug: gathering.slug }}
          className="mt-6 inline-flex text-sm text-[#7ec8e3] transition hover:text-white"
        >
          Details →
        </Link>
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
        <p className="mt-10 text-sm text-[#b8d4e8]/75">
          <Link
            to="/timeless-solution"
            className="text-[#7ec8e3]/90 transition hover:text-white"
          >
            Read the complete framework — The Timeless Solution →
          </Link>
        </p>
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
        <section className="relative overflow-hidden bg-[#0a1628] py-16">
          <div className="relative z-10 mx-auto max-w-3xl px-6">
            <EmailCapture variant="home" />
          </div>
        </section>
        <NextGathering />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
