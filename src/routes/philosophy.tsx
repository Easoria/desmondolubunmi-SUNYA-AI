import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { EmailCapture } from "@/components/site/EmailCapture";
import { SacredGeometry, Orbs } from "@/components/site/Decor";
import { type LeverSlug } from "@/data/levers";
import { buildSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/philosophy")({
  component: PhilosophyPage,
  head: () => ({
    ...buildSeoHead({
      title: "The Sunya Philosophy — Why We Suffer and How It Ends",
      description:
        "Human suffering traced to a single root. Unconsciousness, identification, and the endless ways suffering follows — with the seven layers of being and the twelve levers that undo it.",
      path: "/philosophy",
      ogType: "website",
      imageKind: "core",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "The Sunya Philosophy",
          description:
            "Human suffering traced to a single root. Unconsciousness, identification, and the endless ways suffering follows — with the seven layers of being and the twelve levers that undo it.",
          url: "https://www.desmondolubunmi.com/philosophy",
          isPartOf: {
            "@type": "WebSite",
            name: "Sunya",
            url: "https://www.desmondolubunmi.com",
          },
        }),
      },
    ],
  }),
});

const ROOT_CARDS = [
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
  {
    n: "03",
    name: "Suffering",
    line: "Identification with form makes life feel limited, and leads to suffering in endless ways.",
  },
] as const;

/** Quiet accents reused from practice-tag state colours — organisation only, never labelled. */
const BRANCH_ROW_ACCENT = {
  time: "#c4a574", // warm gold-amber, muted
  separation: "#3d8ec9", // cool deep blue
  lack: "#b07aad", // soft violet
} as const;

const SUFFERING_BRANCH_GROUPS = [
  {
    accent: BRANCH_ROW_ACCENT.time,
    branches: [
      {
        name: "Time",
        line: "we ruminate over the past and worry about the future, never in the now",
        felt: "worry · regret · mental rumination",
      },
      {
        name: "Linearity",
        line: "identification with matter confines us to the space-time continuum, and to the movement of cause and effect. We are forced to move in a linear direction through time, towards a certain end.",
        felt: "pressure · urgency · indecision",
      },
      {
        name: "Mortality",
        line: "we experience ourselves as finite, time-bound creatures living under the fear of death",
        felt: "fear · dread · health anxiety",
      },
    ],
  },
  {
    accent: BRANCH_ROW_ACCENT.separation,
    branches: [
      {
        name: "Division",
        line: "we feel divided from others, and from that division comes conflict and fear",
        felt: "loneliness · jealousy · conflict",
      },
      {
        name: "Resistance",
        line: "we resist things that are outside the boundaries of our limited identities. We resist the present moment. We resist what is. And to resist what is, is to be in conflict with life itself — because life only exists in the present moment.",
        felt: "stress · frustration · anger",
      },
      {
        name: "Contraction",
        line: "out of fear and feeling threatened, we contract physically and hold tension. And contraction inhibits the flow of life, which leaves us exhausted, without vibrance and without aliveness.",
        felt: "tension · exhaustion · burnout",
      },
    ],
  },
  {
    accent: BRANCH_ROW_ACCENT.lack,
    branches: [
      {
        name: "Craving",
        line: "we chase sense gratification endlessly",
        felt: "addiction · restlessness · overconsumption",
      },
      {
        name: "Insufficiency",
        line: "we feel permanently insufficient, because we have identified ourselves with limited things",
        felt: "low self-esteem · envy · never enough",
      },
      {
        name: "Seeking",
        line: "we seek salvation in external things, or in the future, rather than in the presence always here",
        felt: "emptiness · dissatisfaction · meaninglessness",
      },
    ],
  },
] as const;

const JUICE_OF_LIFE_PARAGRAPHS = [
  "Consciousness is there. Life itself is there. And from that dimension, if you stay in that dimension while experiencing the world, there is freedom, relief, peace and happiness. Living from presence helps you meet the challenges of human life with wisdom and grace.",
  "The moment you forget yourself as pure consciousness and identify with the contents of consciousness, you become subjected to the limited nature of the material world and suffer. Life feels like you versus the world. You feel small, confined and insufficient.",
  "That's why you are always seeking to enjoy the senses in order to feel that life is meaningful. Trying to squeeze every bit of joy out of the senses in order to feel some aliveness, some pleasure, some novelty. It is like licking the peel of the fruit instead of entering into the juice within. The juice is life itself, which we have forgotten that we are, and are now seeking happiness through the senses and the mind.",
  "This is what we see in the world today. People become baffled and confused. People use drugs, people overdose, people commit crimes. All of it comes out of this need, this feeling of insufficiency — and from being bound by the influence of time.",
  "That is why consciousness must withdraw itself from being identified with the body, the mind and the senses. It must become aware of itself. It must rest in its own nature.",
  "And only then can we live from a dimension that is timeless, free, infinite and formless — unconditioned, blissful, peaceful, without conflict and without duality. Always here and now. Absolutely real and true.",
] as const;

const LAYERS = [
  { n: 0, t: "Source", sub: "Pure Consciousness", color: "#fff8e0", size: 80, body: "This is life itself. Pure consciousness beyond sensory experiences and mental activities. It is boundless and inconceivable by thought. It can be experienced as your true nature when you turn inwards and observe without identifying yourself with anything. Simply be nothing inwardly." },
  { n: 1, t: "Energy Body", sub: "The Life Force", color: "#a8e0ff", size: 160, body: "The subtle energy pathways through which life force flows to power the human system. The state of a person's energy system is usually reflected in the state of their mind, nervous system and emotions. When living unconsciously, the pathways contract and we feel less peaceful and happy. When living consciously, life force flows freely." },
  { n: 2, t: "Emotional Body", sub: "The Heart Space", color: "#7ec8e3", size: 240, body: "The internal weather system of the human feelings. It changes to reflect the state of the energy body. It is also influenced by sensory inputs, thoughts, and external situations. When closed, we feel numb, indifferent, and find it hard to connect. When open, we feel empathic, alive, and love radiates from the inside out." },
  { n: 3, t: "Intellectual Body", sub: "Executive Discernment", color: "#5fa8d3", size: 320, body: "The faculty of analysing, reasoning, logic, discrimination, and conscious choice. It is able to analyse memories and sensory experiences. It is not intelligence — it simply dissects and analyses information and mental data." },
  { n: 4, t: "Mental Body", sub: "Thought & Memory", color: "#3d7ab0", size: 400, body: "The database of past accumulated memories, experiences, conditioning, endless thinking. Strong identification with the contents of the mind creates the false ego, and the illusion of psychological time as past and future." },
  { n: 5, t: "Physical Body", sub: "The Vehicle", color: "#2a5688", size: 480, body: "The biological vessel and sensory organs through which life perceives and acts in the world. It is the outermost expression of all the inner layers." },
  { n: 6, t: "Environment", sub: "The World", color: "#1b3a60", size: 560, body: "The physical world surrounding the body. This is what you perceive externally through the senses. The spaces, nature, and people we constantly exchange energy with. Often overlooked, the environment is a layer of being — not separate from you, but in constant dialogue with all the layers within." },
];

const LEVER_ZERO = {
  n: 0,
  t: "Conservation",
  slug: "conservation" as const,
  body: `Before you try to generate more energy, stop losing the energy you have.

The human system constantly leaks vitality through unconscious habit — endless
scrolling, compulsive overthinking, idle talk, chronic over-consumption,
over-stimulation of every kind. Close the leaks and the system recharges on its
own.`,
};

const LEVERS = [
  { n: 1, t: "Breath", slug: "breath" as const, what: "The breath is the remote control for the nervous system. The only autonomic function you can consciously override — making it the most immediate lever available to any human being at any moment.", group: "internal" as const },
  { n: 2, t: "Movement", slug: "movement" as const, what: "The physical body stores past trauma and resistance as rigidity. Conscious, fluid movement restores alignment and removes friction from the biological hardware. The body IS the mind made physical.", group: "internal" as const },
  { n: 3, t: "Mind", slug: "mind" as const, what: "Training the intellect to move from scattered rumination into single-pointed focus and clarity. A trained mind stops fighting reality and becomes a brilliant tool for alignment and truth.", group: "internal" as const },
  { n: 4, t: "Sound", slug: "sound" as const, what: "The body is highly responsive to vibration. Specific sounds, silence, and conscious listening can harmonize the nervous system far faster than thought-based practices.", group: "internal" as const },
  { n: 5, t: "Heart", slug: "heart" as const, what: "Transforming emotional contraction. Compassion, forgiveness, and devotion literally melt the defensive armour built around the chest. The heart is an electromagnetic field that affects everyone around you.", group: "internal" as const },
  { n: 6, t: "Awareness", slug: "awareness" as const, what: "The capacity to notice your experience without instantly reacting. By stepping back and observing thoughts and sensations, you detach from the illusion of the Self and rest in unconditioned presence. The master switch.", group: "internal" as const },
  { n: 7, t: "Sustenance", slug: "sustenance" as const, what: "Stripping the survival panic away from money and work. When livelihood is misaligned with authentic nature, every working hour costs Prana. Aligning labour with truth transforms work into frictionless service.", group: "external" as const },
  { n: 8, t: "Sleep", slug: "sleep" as const, what: "Sleep is the most active repair process the body undertakes. The nervous system processes, the energetic body recharges, the physical body restores. Compromising sleep compromises every other lever.", group: "external" as const },
  { n: 9, t: "Nutrition", slug: "nutrition" as const, what: "Food is not just fuel — it is information sent to every cell. High-water-content, living foods with low processing friction give more energy than they take to digest.", group: "external" as const },
  { n: 10, t: "Connection", slug: "connection" as const, what: "We are nodes in a living relational field. Healing the illusion of separation by cultivating authentic, maskless relationships allows nervous systems to co-regulate. You cannot fully heal alone.", group: "external" as const },
  { n: 11, t: "Nature", slug: "nature" as const, what: "The body evolved in nature over millions of years. Modern life has severed this connection — and the nervous system registers severance as chronic stress. Syncing with the Earth is biological necessity.", group: "external" as const },
  { n: 12, t: "Environment", slug: "environment" as const, what: "Your physical space mirrors and shapes your mental space. Visual noise creates mental noise. Space design is not decoration — it is inner architecture.", group: "external" as const },
];

type Zone = {
  n: number;
  name: string;
  description: string;
  signs: string[];
  startHere: string;
  startHereLinks: { label: string; slug: LeverSlug }[];
  note: string;
};

const ZONES: Zone[] = [
  {
    n: 1,
    name: "Survival Crisis",
    description:
      "The biological baseline is not handled. Sustenance, shelter, or safety are genuinely threatened or chronically uncertain.",
    signs: [
      "Chronic financial fear",
      "Housing instability",
      "Unable to think beyond immediate survival",
      "Constant low-grade panic",
      "No capacity for inner practice",
    ],
    startHere: "Sustenance — Lever 7",
    startHereLinks: [{ label: "Sustenance — Lever 7", slug: "sustenance" }],
    note: "No inner practice takes root while the system is locked in survival mode. Address the material foundation first. Always.",
  },
  {
    n: 2,
    name: "Nervous System Collapse",
    description:
      "The baseline is technically handled, but the body is chronically exhausted and dysregulated.",
    signs: [
      "Poor or fragmented sleep",
      "Persistent fatigue",
      "High baseline anxiety",
      "Tension that does not release",
      "Frequent illness",
    ],
    startHere: "Sleep — Lever 8",
    startHereLinks: [{ label: "Sleep — Lever 8", slug: "sleep" }],
    note: "An exhausted nervous system cannot hold inner practice. Stabilise the nightly reset first, with Breath as immediate support.",
  },
  {
    n: 3,
    name: "Emotional Accumulation",
    description: "The system is stable but the emotional body is heavy, blocked, or numb.",
    signs: [
      "Persistent heaviness or sadness",
      "Unresolved grief",
      "Chronic resentment",
      "Relational conflict",
      "Emotional numbness",
    ],
    startHere: "Heart — Lever 5",
    startHereLinks: [{ label: "Heart — Lever 5", slug: "heart" }],
    note: "Emotional presence, heart coherence, and forgiveness work — with Breath to open the system first.",
  },
  {
    n: 4,
    name: "Mental Fragmentation",
    description: "Body and emotions are manageable, but the mind is scattered, noisy, or out of control.",
    signs: [
      "Compulsive overthinking",
      "Inability to focus",
      "Identity confusion",
      "Chronic comparison and self-criticism",
      "Mental exhaustion despite physical rest",
    ],
    startHere: "Awareness — Lever 6",
    startHereLinks: [{ label: "Awareness — Lever 6", slug: "awareness" }],
    note: "Breath awareness, body scan, and pure observation — to establish the witness.",
  },
  {
    n: 5,
    name: "The Hollow Seeker",
    description:
      "Everything functions. Nothing fulfils. Stable, capable, successful by every external measure — and persistently empty inside.",
    signs: [
      "Achievement without satisfaction",
      "A successful life that feels meaningless",
      "Seeking through relationships, substances, or spirituality",
      "Something essential missing despite having everything",
    ],
    startHere: "Awareness — Lever 6, and Conservation — Lever 0",
    startHereLinks: [
      { label: "Awareness — Lever 6", slug: "awareness" },
      { label: "Conservation — Lever 0", slug: "conservation" },
    ],
    note: "Often ready for the deepest practices in the framework. The bottleneck is not capacity. It is direction.",
  },
];

const GROUND_BODY =
  "The body has its own limitations and constant demands — food, shelter, sleep. It is also subject to illness and aging. This is the constant underlying pressure of the physical body. We are less able to meet the demands of life when we are unconscious.";

function ZonePanel({ zone }: { zone: Zone }) {
  return (
    <div
      className={`glass-card relative overflow-hidden p-6 sm:p-8 ${
        zone.n === 5
          ? "ring-1 ring-[#dcb48d]/35 shadow-[0_0_45px_-18px_rgba(220,180,141,0.45)]"
          : "ring-1 ring-[#7ec8e3]/25"
      }`}
    >
      <div className="pointer-events-none absolute left-3 top-2 font-display text-6xl text-white/10 sm:left-4 sm:text-7xl">
        {String(zone.n).padStart(2, "0")}
      </div>
      <div className="relative z-10 pl-10 sm:pl-12">
        <h3 className="display text-3xl text-white">{zone.name}</h3>
        <p className="mt-4 text-[15px] leading-relaxed text-[#b8d4e8]">{zone.description}</p>
        <ul className="mt-5 space-y-2 text-sm text-[#b8d4e8]">
          {zone.signs.map((sign) => (
            <li key={sign} className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7ec8e3]" />
              <span>{sign}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-2xl border border-[#7ec8e3]/50 bg-[#7ec8e3]/10 p-4">
          <div className="label-eyebrow">Start here</div>
          <p className="mt-2 display text-2xl text-white">
            {zone.startHereLinks.map((item, index) => (
              <span key={item.slug}>
                <Link
                  to="/practices/$leverSlug"
                  params={{ leverSlug: item.slug }}
                  className="underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
                {index < zone.startHereLinks.length - 1 ? ", and " : null}
              </span>
            ))}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-[#b8d4e8]/80">{zone.note}</p>
        </div>
      </div>
    </div>
  );
}

function PhilosophyPage() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeLayer, setActiveLayer] = useState(0);
  const [openLever, setOpenLever] = useState<number | null>(null);
  const [activeZone, setActiveZone] = useState(1);
  const layer = LAYERS[activeLayer];

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <style>
        {`
          @keyframes reversal-flow {
            0% { transform: translate(-50%, 220%); opacity: 0; }
            20% { opacity: 0.95; }
            100% { transform: translate(-50%, -160%); opacity: 0; }
          }
          .reversal-connector-flow {
            animation: reversal-flow 3s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .reversal-connector-flow {
              animation: none !important;
            }
          }
        `}
      </style>
      <Nav />
      <Breadcrumb />

      {/* Hero */}
      <section className="relative overflow-hidden pb-32 pt-16">
        <Starfield density={0.7} />
        <SacredGeometry className="inset-0 m-auto h-[800px] w-[800px]" />
        <Orbs />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="label-eyebrow">THE SUNYA PHILOSOPHY</div>
          <h1 className="display mt-6 text-5xl text-white sm:text-7xl">
            A unified map of human
            <br />
            <span className="display-italic text-[#b8d4e8]">suffering and freedom.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-[#b8d4e8]">
            Built on first principles. Belonging to no tradition. Valid for every human being.
          </p>
        </div>
      </section>

      {/* Entropy */}
      <section className="relative overflow-hidden bg-[#0a1628] py-32">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <div className="text-center">
            <h2 className="display text-4xl text-white sm:text-5xl">Entropy</h2>
          </div>
          <div className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-[#7ec8e3]/40 to-transparent" />
          <div className="mt-12 text-[15px] leading-loose text-[#b8d4e8] sm:text-base">
            <p>{GROUND_BODY}</p>
          </div>
          <div className="mx-auto mt-16 h-px w-24 bg-gradient-to-r from-transparent via-[#7ec8e3]/40 to-transparent" />
        </div>
      </section>

      {/* Why we suffer — widening trunk + branch canopy grid */}
      <section className="relative overflow-hidden bg-[#060d1c] py-32">
        <Starfield density={0.3} />
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="display text-4xl text-white sm:text-5xl md:text-6xl">Why we suffer</h2>
          </div>

          <div className="relative mx-auto mt-14 pb-16">
            {/* Trunk line — fades before the canopy grid */}
            <div
              className="pointer-events-none absolute left-1/2 top-8 h-[min(420px,55%)] w-px -translate-x-1/2"
              aria-hidden
              style={{
                background:
                  "linear-gradient(180deg, rgba(126,200,227,0.55) 0%, rgba(126,200,227,0.32) 62%, rgba(126,200,227,0) 100%)",
              }}
            />

            <div className="relative z-10 space-y-5">
              {ROOT_CARDS.map((card, index) => {
                const widthClass = [
                  "w-[72%] sm:w-[55%]",
                  "w-[84%] sm:w-[70%]",
                  "w-[96%] sm:w-[88%]",
                ][index];
                const tint = 0.62 + index * 0.06;
                const glow = 0.14 + index * 0.03;

                return (
                  <div
                    key={card.n}
                    className={`glass-card relative mx-auto overflow-hidden border-l-2 border-l-[#e8f4fb]/80 p-5 sm:p-6 md:p-7 ${widthClass}`}
                    style={{
                      background: `linear-gradient(160deg, rgba(255,255,255,0.05), rgba(10,22,40,${tint}))`,
                      boxShadow: `0 0 ${22 + index * 6}px rgba(126,200,227,${glow})`,
                    }}
                  >
                    <div className="pointer-events-none absolute left-3 top-1 font-display text-5xl text-white/10 sm:left-4 sm:text-6xl">
                      {card.n}
                    </div>
                    <div className="relative pl-10 sm:pl-12">
                      <h3 className="display text-2xl text-white sm:text-3xl">{card.name}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-[#b8d4e8] sm:text-base">
                        {card.line}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Canopy — three unlabelled rows of three; grouping survives as single-column order on mobile */}
            <div className="relative z-10 mt-14 space-y-10 sm:mt-16 sm:space-y-12">
              {SUFFERING_BRANCH_GROUPS.map((group) => (
                <div
                  key={group.branches[0].name}
                  className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:gap-x-10 lg:gap-y-12"
                >
                  {group.branches.map((branch) => (
                    <div
                      key={branch.name}
                      className="border-l-2 pl-4 sm:pl-5"
                      style={{ borderColor: `${group.accent}99` }}
                    >
                      <h3 className="display text-lg tracking-wide text-[#7ec8e3] sm:text-xl">
                        {branch.name}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-[#b8d4e8] sm:text-base">
                        {branch.line}
                      </p>
                      <p className="mt-2 text-[12px] leading-relaxed text-[#b8d4e8]/50 sm:text-[13px]">
                        {branch.felt}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <p className="relative z-10 mt-12 text-center text-sm tracking-wide text-[#b8d4e8]/55 sm:mt-14">
              and on, and on
            </p>
          </div>
        </div>
      </section>

      {/* The Reversal — Enjoying the Juice of Life */}
      <section className="relative overflow-hidden bg-[#11253b] py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(126,200,227,0.2),transparent_58%)]" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <div className="relative mx-auto h-16 w-3">
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#7ec8e3]/25 to-[#e8f4fb]/75" />
            {!prefersReducedMotion && (
              <span className="reversal-connector-flow absolute left-1/2 top-0 h-10 w-1 rounded-full bg-gradient-to-t from-transparent via-[#7ec8e3] to-white" />
            )}
          </div>
          <h2 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
            Enjoying the Juice of Life
          </h2>
        </div>

        {/* Always-expanded reading panel — opaque enough for 4.5:1+ contrast */}
        <div className="relative z-10 mx-auto mt-12 max-w-3xl px-6">
          <div
            className="rounded-2xl border border-white/12 px-6 py-10 sm:px-10 sm:py-12"
            style={{
              background: "rgba(8, 16, 30, 0.94)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 0 60px -24px rgba(126,200,227,0.28)",
            }}
          >
            <div className="mx-auto max-w-[680px] space-y-6 text-left text-[15px] leading-[1.85] text-[#d5e6f2] sm:text-base sm:leading-[1.9]">
              {JUICE_OF_LIFE_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="relative left-1/2 z-10 mt-16 w-[108vw] -translate-x-1/2 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="glass-card relative overflow-hidden p-7">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#7ec8e3]/22 to-transparent" />
                <h3 className="display relative z-10 text-3xl text-white">
                  Become conscious of the source of life within
                </h3>
                <p className="relative z-10 mt-5 text-[15px] leading-relaxed text-[#b8d4e8]">
                  The essence of inner growth. Raising your consciousness, realising that you are
                  life itself, and resting in your true nature.
                </p>
              </div>
              <div className="glass-card relative overflow-hidden p-7">
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#7ec8e3]/22 to-transparent" />
                <h3 className="display relative z-10 text-3xl text-white">
                  Live in harmony with the intelligence of life
                </h3>
                <p className="relative z-10 mt-5 text-[15px] leading-relaxed text-[#b8d4e8]">
                  Bringing the wisdom and light of consciousness into your daily life and
                  relationships, and using it to meet the challenges of the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Layers */}
      <section id="zones" className="relative overflow-hidden bg-[#0a1628] py-32">
        <SacredGeometry className="-right-40 top-1/3 h-[700px] w-[700px]" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">The anatomy of the human machine</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              7 Layers of Being
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[#b8d4e8]">
              Experience radiates outward from the absolute core into the physical world through 7
              distinct layers. To transform the human experience, you must understand which layer
              you are working on.
            </p>
          </div>

          <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Concentric diagram */}
            <div className="relative mx-auto hidden h-[600px] w-[600px] lg:block">
              {LAYERS.slice().reverse().map((l) => {
                const isActive = activeLayer === l.n;
                return (
                  <button
                    key={l.n}
                    onClick={() => setActiveLayer(l.n)}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
                    style={{
                      width: l.size,
                      height: l.size,
                      border: `1px solid ${l.color}${isActive ? "" : "55"}`,
                      background: `radial-gradient(circle at 50% 50%, ${l.color}${isActive ? "44" : "11"}, transparent 70%)`,
                      boxShadow: isActive ? `0 0 60px ${l.color}55` : "none",
                    }}
                    aria-label={`Layer ${l.n}: ${l.t}`}
                  />
                );
              })}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#7ec8e3]">Layer {layer.n}</div>
                <div className="display mt-1 text-xl text-white">{layer.t}</div>
              </div>
            </div>

            {/* Layer list / mobile cards */}
            <div className="space-y-3">
              {LAYERS.map((l) => {
                const isActive = activeLayer === l.n;
                return (
                  <button
                    key={l.n}
                    onClick={() => setActiveLayer(l.n)}
                    className={`block w-full rounded-2xl border p-5 text-left transition ${
                      isActive
                        ? "border-[#7ec8e3]/50 bg-white/[0.06]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className="inline-block h-3 w-3 rounded-full"
                        style={{ background: l.color, boxShadow: `0 0 12px ${l.color}` }}
                      />
                      <span className="text-xs uppercase tracking-[0.25em] text-[#7ec8e3]">
                        Layer {l.n}
                      </span>
                      <span className="display text-xl text-white">{l.t}</span>
                      <span className="ml-auto text-xs italic text-[#b8d4e8]/60">{l.sub}</span>
                    </div>
                    {isActive && (
                      <p className="mt-3 text-sm leading-relaxed text-[#b8d4e8]">{l.body}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* The Levers */}
      <section className="relative overflow-hidden bg-[#060d1c] py-32">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="display text-4xl text-white sm:text-5xl md:text-6xl">
              The Twelve Levers of Transformation
            </h2>
            <div className="mx-auto mt-6 max-w-2xl space-y-4 text-[#b8d4e8]">
              <p>
                When we distil the vast diversity of techniques and paths for human wellbeing into their absolute essence, we arrive at the twelve levers of transformation.
              </p>
              <p>
                These are the twelve fundamental means through which a human being can transform their wellbeing. Contained within each lever are simple yet powerful practices for complete wellbeing.
              </p>
            </div>
          </div>

          <div className="mt-14">
            <div className="label-eyebrow text-center">THE PREREQUISITE</div>
            <div className="glass-strong relative mt-5 overflow-hidden border border-[#dcb48d]/40 p-6 sm:p-8">
              <div className="pointer-events-none absolute left-4 top-0 font-display text-7xl text-[#dcb48d]/20 sm:text-8xl">
                00
              </div>
              <div className="relative z-10 pl-12 sm:pl-16">
                <h3 className="display text-4xl text-white">Conservation</h3>
                <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-[#b8d4e8]">
                  {LEVER_ZERO.body}
                </p>
                <Link
                  to="/practices/$leverSlug"
                  params={{ leverSlug: LEVER_ZERO.slug }}
                  className="mt-5 inline-flex items-center gap-2 text-sm text-[#7ec8e3] transition hover:text-white"
                >
                  See conservation practices <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="mx-auto mt-8 h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-[#dcb48d]/40 to-transparent" />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            {(["internal", "external"] as const).map((group) => (
              <div key={group}>
                <h3 className="label-eyebrow mb-6">
                  {group === "internal" ? "The 6 Internal Levers" : "The 6 External Pillars"}
                </h3>
                <div className="space-y-3">
                  {LEVERS.filter((l) => l.group === group).map((l) => {
                    const open = openLever === l.n;
                    return (
                      <div key={l.n} className="glass-card overflow-hidden">
                        <button
                          onClick={() => setOpenLever(open ? null : l.n)}
                          className="flex w-full items-center gap-4 p-5 text-left"
                        >
                          <span className="font-display text-xs tracking-[0.25em] text-[#7ec8e3]">
                            {String(l.n).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="display text-xl text-white">{l.t}</div>
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-[#7ec8e3] transition-transform ${
                              open ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {open && (
                          <div className="border-t border-white/10 px-5 pb-6 pt-5 text-sm text-[#b8d4e8]">
                            <p className="leading-relaxed">{l.what}</p>
                            <Link
                              to="/practices/$leverSlug"
                              params={{ leverSlug: l.slug }}
                              className="mt-5 inline-flex items-center gap-2 text-sm text-[#7ec8e3] transition hover:text-white"
                            >
                              See {l.slug} practices <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where You Begin */}
      <section className="relative overflow-hidden bg-[#0a1628] py-32">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="display text-4xl text-white sm:text-5xl md:text-6xl">
              Begin here
            </h2>
            <div className="mx-auto mt-8 max-w-3xl space-y-5 text-[15px] leading-loose text-[#b8d4e8]">
              <p>
                Every human system has a single point of greatest friction at any given time. Address it directly and the whole system shifts.
              </p>
              <p>
                You do not need all twelve levers. Identify your main problem, apply the lever that resolves it, and work with the practices there. That is the whole of it.
              </p>
              <p>Most people are in one of five zones. Find yours.</p>
            </div>
          </div>

          <div className="mt-14 hidden gap-8 lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
            <div className="space-y-2">
              {ZONES.map((zone) => {
                const selected = activeZone === zone.n;
                return (
                  <button
                    key={zone.n}
                    onClick={() => setActiveZone(zone.n)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      selected
                        ? zone.n === 5
                          ? "border-[#dcb48d]/60 bg-[#dcb48d]/12 text-white shadow-[0_0_28px_-12px_rgba(220,180,141,0.6)]"
                          : "border-[#7ec8e3]/60 bg-[#7ec8e3]/12 text-white shadow-[0_0_28px_-12px_rgba(126,200,227,0.6)]"
                        : "border-white/10 bg-white/[0.03] text-[#b8d4e8]/45 hover:border-white/20 hover:text-[#b8d4e8]/75"
                    }`}
                  >
                    <div className="text-xs uppercase tracking-[0.25em] text-current">
                      Zone {zone.n}
                    </div>
                    <div className="mt-1 display text-2xl text-current">{zone.name}</div>
                  </button>
                );
              })}
            </div>
            <div key={activeZone} className="animate-[fade-up_0.35s_ease]">
              <ZonePanel zone={ZONES[activeZone - 1]} />
            </div>
          </div>

          <div className="mt-12 space-y-3 lg:hidden">
            {ZONES.map((zone) => {
              const selected = activeZone === zone.n;
              return (
                <div key={zone.n} className="glass-card overflow-hidden">
                  <button
                    onClick={() => setActiveZone(zone.n)}
                    className="flex w-full items-center gap-3 px-4 py-4 text-left"
                  >
                    <span className="font-display text-xs tracking-[0.25em] text-[#7ec8e3]">
                      {String(zone.n).padStart(2, "0")}
                    </span>
                    <span className="display flex-1 text-2xl text-white">{zone.name}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#7ec8e3] transition-transform ${
                        selected ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {selected && (
                    <div className="border-t border-white/10 p-4">
                      <ZonePanel zone={zone} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <noscript>
            <div className="mt-10 space-y-4">
              {ZONES.map((zone) => (
                <div key={zone.n}>
                  <ZonePanel zone={zone} />
                </div>
              ))}
            </div>
          </noscript>

          <div className="mt-14 flex flex-col items-center gap-4">
            <p className="max-w-xl text-center text-sm leading-relaxed text-[#b8d4e8]/85">
              Approach the twelve levers through your current situation.
            </p>
            <Link
              to="/problems"
              className="glow-btn inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium"
            >
              Find what helps <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/practices/where-to-begin"
              className="text-xs text-[#7ec8e3]/70 transition hover:text-[#7ec8e3]"
            >
              Read the full order of operations →
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#060d1c] py-16">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <EmailCapture variant="philosophy" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
