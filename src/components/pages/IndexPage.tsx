import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
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
import heroJpg from "@/assets/desmond-hero.jpg";
import heroWebp from "@/assets/desmond-hero.webp";
import hero960Jpg from "@/assets/desmond-hero-960.jpg";
import hero960Webp from "@/assets/desmond-hero-960.webp";
import hero640Jpg from "@/assets/desmond-hero-640.jpg";
import hero640Webp from "@/assets/desmond-hero-640.webp";
import heroMobileJpg from "@/assets/desmond-hero-mobile.jpg";
import heroMobileWebp from "@/assets/desmond-hero-mobile.webp";
import heroMobile640Jpg from "@/assets/desmond-hero-mobile-640.jpg";
import heroMobile640Webp from "@/assets/desmond-hero-mobile-640.webp";

function useSunyaCtaLabel(freeSuffix = "") {
  const { isActive } = useSubscription();
  if (isActive) return "Use Sunya AI";
  return freeSuffix ? `Try Sunya AI${freeSuffix}` : "Try Sunya AI";
}

/** Homepage section CTAs — quiet text links below the hero. */
const sectionCtaClass =
  "inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#7ec8e3] transition hover:text-white";

const heroGatheringsBtn =
  "inline-flex items-center justify-center rounded-full border border-white/45 bg-transparent px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:border-white/80 hover:bg-white/10";

function HeroPhoto({
  className,
  sizes,
  priority = false,
}: {
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <picture>
      {/* Mobile: face-forward crop for the short stacked strip */}
      <source
        media="(max-width: 767px)"
        type="image/webp"
        srcSet={`${heroMobile640Webp} 640w, ${heroMobileWebp} 960w`}
        sizes={sizes}
      />
      <source
        media="(max-width: 767px)"
        type="image/jpeg"
        srcSet={`${heroMobile640Jpg} 640w, ${heroMobileJpg} 960w`}
        sizes={sizes}
      />
      {/* Desktop: left-biased landscape — subject left, sea open for copy */}
      <source
        type="image/webp"
        srcSet={`${hero640Webp} 640w, ${hero960Webp} 960w, ${heroWebp} 1280w`}
        sizes={sizes}
      />
      <img
        src={heroJpg}
        srcSet={`${hero640Jpg} 640w, ${hero960Jpg} 960w, ${heroJpg} 1280w`}
        sizes={sizes}
        alt="Desmond Olubunmi"
        width={1280}
        height={720}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}

function HeroCopy({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <h1 className="display whitespace-nowrap text-[clamp(1.55rem,6.4vw,1.78rem)] leading-none tracking-[-0.02em] text-white sm:text-[1.9rem] md:text-[2.15rem] lg:text-[2.45rem] xl:text-[2.7rem]">
        You are the happiness you seek.
      </h1>
      <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-[#d5e6f2] sm:mt-4 sm:text-lg sm:leading-8 md:mt-7 md:max-w-[36rem] md:text-[1.2rem] md:leading-8">
        A complete path to human wellbeing that is timeless and universal. Teachings, practices, and
        gatherings.
      </p>
      <div className="mt-8 md:mt-11">
        <Link
          to="/gatherings"
          className={`${heroGatheringsBtn} md:px-9 md:py-4 md:text-[0.95rem]`}
        >
          Upcoming gatherings
        </Link>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#0a1628] md:h-[100dvh]">
      {/* One photograph — stacked crop on mobile, full-bleed cover on desktop */}
      <div className="relative h-[56vh] w-full overflow-hidden md:absolute md:inset-0 md:h-full">
        <HeroPhoto
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover object-[center_52%] md:-translate-x-[15%] md:origin-left md:scale-[1.15] md:object-[left_85%]"
        />
        {/* Soft fade pulled lower — more face/torso clear above; covers lower edge */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:h-32"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,22,40,0) 0%, rgba(10,22,40,0.22) 45%, rgba(10,22,40,0.7) 78%, #0a1628 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* Desktop right-edge contrast scrim — transparent until ~40% */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,22,40,0) 38%, rgba(10,22,40,0.28) 52%, rgba(10,22,40,0.62) 70%, rgba(10,22,40,0.78) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 md:flex md:h-full md:items-center">
        <div className="bg-gradient-to-b from-[#0a1628] via-[#0c1a2e] to-[#0a1628] px-5 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 md:ml-[44%] md:w-full md:max-w-[720px] md:translate-x-[25%] md:translate-y-[30%] md:bg-none md:bg-transparent md:px-6 md:py-0 md:pr-10 lg:pr-14">
          <HeroCopy />
        </div>
      </div>
    </section>
  );
}

const WHY_BRANCH_LINES = [
  "we ruminate over the past and worry about the future, never in the now",
  "we feel divided from others, and from that division comes conflict and fear",
  "we experience ourselves as finite, time-bound creatures living under the fear of death",
  "we chase sense gratification endlessly",
  "we feel permanently insufficient, because we have identified ourselves with limited things",
  "we seek salvation in external things, or in the future, rather than in the presence always here",
] as const;

const WHY_CAUSE_CARDS = [
  {
    n: "01",
    name: "Unconsciousness",
    line: "We are born with our senses turned outward for survival — unaware of the source of life within.",
  },
  {
    n: "02",
    name: "Identification",
    line: "So we take ourselves to be the nearest things: the body, our thoughts, what we accumulate.",
  },
] as const;

function WhyWeSufferBranches({ reduceMotion }: { reduceMotion: boolean }) {
  const blockRef = useRef<HTMLDivElement | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // SSR / no-JS / reduced-motion: stacked static list. Motion clients: fixed-height crossfade.
  const cycleLayout = enhanced && !reduceMotion;
  const cycling = cycleLayout && inView;

  useEffect(() => {
    setEnhanced(true);
  }, []);

  useEffect(() => {
    if (!cycleLayout) return;
    const node = blockRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [cycleLayout]);

  useEffect(() => {
    if (!cycling || paused) return;
    // 4s hold + ~600ms crossfade before the next advance
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % WHY_BRANCH_LINES.length);
    }, 4600);
    return () => window.clearInterval(id);
  }, [cycling, paused]);

  const longest = WHY_BRANCH_LINES.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <div
      ref={blockRef}
      tabIndex={cycleLayout ? 0 : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/*
        All six lines stay in the HTML for indexing and no-JS / reduced-motion fallbacks.
        Cycling only changes opacity; aria-live stays off so AT reads the full list.
      */}
      <div aria-live="off" className={cycleLayout ? "relative" : "space-y-3"}>
        {cycleLayout && (
          <p
            className="invisible whitespace-pre-wrap italic text-sm leading-relaxed text-[#b8d4e8] sm:text-[0.95rem]"
            aria-hidden
          >
            {longest}
          </p>
        )}
        {WHY_BRANCH_LINES.map((line, index) => (
          <p
            key={line}
            className={
              cycleLayout
                ? `absolute inset-x-0 top-0 italic text-sm leading-relaxed text-[#b8d4e8] transition-opacity duration-[600ms] ease-in-out sm:text-[0.95rem] ${
                    index === active ? "opacity-100" : "pointer-events-none opacity-0"
                  }`
                : "italic text-sm leading-relaxed text-[#b8d4e8] sm:text-[0.95rem]"
            }
          >
            {line}
          </p>
        ))}
      </div>

      <p className="mt-4 text-sm tracking-wide text-[#b8d4e8]/55">and on, and on</p>
    </div>
  );
}

function Reframe() {
  const [baselineOpen, setBaselineOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a1628] pb-32 pt-44 md:pt-52">
      <SacredGeometry className="right-[-200px] top-1/4 h-[800px] w-[800px]" />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="display text-4xl text-white sm:text-5xl">Why we suffer</h2>
        </div>

        {/* Baseline — ground, not step zero. Outside the connector. */}
        <div className="mx-auto mt-12 max-w-2xl">
          <button
            type="button"
            aria-expanded={baselineOpen}
            onClick={() => setBaselineOpen((o) => !o)}
            className="flex w-full items-center justify-between gap-4 py-2 text-left text-sm text-[#b8d4e8]/55 transition hover:text-[#b8d4e8]/75 sm:text-[0.9rem]"
          >
            <span>The body&apos;s own demands</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 transition-transform duration-300 ${baselineOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-out"
            style={{ gridTemplateRows: baselineOpen ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <p className="pb-3 pt-1 text-[0.8rem] leading-relaxed text-[#b8d4e8]/45 sm:text-[0.85rem]">
                The body has its own limitations and constant demands — food, shelter, sleep. It is also subject to illness and aging. This is the constant underlying pressure of the physical body. We are less able to meet the demands of life when we are unconscious.
              </p>
            </div>
          </div>
        </div>

        {/* Separator between baseline and the causal stack */}
        <div className="mx-auto mt-4 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Cards 01–03 share one vertical connector that never reaches the baseline */}
        <div className="relative mx-auto mt-10 max-w-2xl pb-14">
          <div
            className="pointer-events-none absolute bottom-0 left-[1.15rem] top-6 w-px md:left-[1.35rem]"
            aria-hidden
            style={{
              background:
                "linear-gradient(180deg, rgba(126,200,227,0.55) 0%, rgba(126,200,227,0.38) 58%, rgba(126,200,227,0.14) 82%, rgba(126,200,227,0) 100%)",
            }}
          />

          <div className="space-y-5">
            {WHY_CAUSE_CARDS.map((link) => (
              <div
                key={link.name}
                className="glass-card relative z-10 flex flex-col p-5 md:p-6"
                style={{ backgroundColor: "rgba(10, 22, 40, 0.62)" }}
              >
                <div className="font-display text-xl tracking-[0.16em] text-[#7ec8e3]/45">{link.n}</div>
                <h3 className="display mt-2 text-2xl text-white">{link.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#b8d4e8]">{link.line}</p>
              </div>
            ))}

            <div
              className="glass-card relative z-10 flex flex-col p-5 md:p-6"
              style={{ backgroundColor: "rgba(10, 22, 40, 0.62)" }}
            >
              <div className="font-display text-xl tracking-[0.16em] text-[#7ec8e3]/45">03</div>
              <h3 className="display mt-2 text-2xl text-white">Suffering</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b8d4e8]">
                Identification with form makes life feel limited, and leads to suffering in endless
                ways.
              </p>
              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="mt-5">
                <WhyWeSufferBranches reduceMotion={reduceMotion} />
              </div>
            </div>
          </div>
        </div>

        <p className="display mx-auto mt-16 max-w-3xl text-center text-3xl text-white sm:text-4xl">
          The solution is to become conscious of the source of life within, and to live in harmony
          with the intelligence of life.
        </p>

        <div className="mt-10 text-center">
          <Link to="/framework" className={sectionCtaClass}>
            Explore the Sunya framework →
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
          <SunyaAI hideSessionCounter />
          <div className="mt-8 text-center">
            <Link
              to="/sunya-ai"
              className={sectionCtaClass}
            >
              Want to go deeper? Explore the full experience →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
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
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <Link
              to="/work-with-me"
              hash="booking"
              className={sectionCtaClass}
            >
              Work With Me 1-on-1 →
            </Link>
            <Link
              to="/framework"
              className={sectionCtaClass}
            >
              Explore the Sunya framework →
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
          className={`mt-6 ${sectionCtaClass}`}
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
          className={`mt-12 ${sectionCtaClass}`}
        >
          {ctaLabel} →
        </Link>
        <p className="mt-10 text-sm text-[#b8d4e8]/75">
          <Link
            to="/timeless-solution"
            className={sectionCtaClass}
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
      <Nav overHero />
      <main>
        <Hero />
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
