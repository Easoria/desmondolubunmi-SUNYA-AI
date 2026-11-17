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
    line: "We are born with our senses turned outward for survival. Attention almost never turns back on itself.",
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

type FeltLink = { label: string; slug: string };

const SUFFERING_BRANCH_GROUPS = [
  {
    accent: BRANCH_ROW_ACCENT.time,
    branches: [
      {
        name: "Time",
        line: "Identification with the contents of the mind causes us to ruminate over the past and worry about the future, never in the now.",
        felt: [
          { label: "worry", slug: "anxiety-and-worry" },
          { label: "regret", slug: "anxiety-and-worry" },
          { label: "mental rumination", slug: "a-racing-mind" },
        ] satisfies FeltLink[],
      },
      {
        name: "Linearity",
        line: "Identification with form confines us to the space-time continuum, and to the movement of cause and effect. We are forced to move in a linear direction through time, towards a certain end.",
        felt: [
          { label: "pressure", slug: "overwhelm" },
          { label: "urgency", slug: "overwhelm" },
          { label: "indecision", slug: "feeling-torn" },
        ] satisfies FeltLink[],
      },
      {
        name: "Mortality",
        line: "Identification with form causes us to experience ourselves as finite, time-bound creatures living under the fear of death.",
        felt: [
          { label: "fear", slug: "fear-of-death" },
          { label: "dread", slug: "fear-of-death" },
          { label: "health anxiety", slug: "fear-of-death" },
        ] satisfies FeltLink[],
      },
    ],
  },
  {
    accent: BRANCH_ROW_ACCENT.separation,
    branches: [
      {
        name: "Division",
        line: "Identification with form makes us feel divided from others, and from that division comes conflict and fear.",
        felt: [
          { label: "loneliness", slug: "loneliness" },
          { label: "jealousy", slug: "loneliness" },
          { label: "conflict", slug: "loneliness" },
        ] satisfies FeltLink[],
      },
      {
        name: "Resistance",
        line: "Identification with form causes us to resist things that are outside the boundaries of our limited identities. We resist the present moment. We resist what is. And to resist what is, is to be in conflict with life itself — because life only exists in the present moment.",
        felt: [
          { label: "stress", slug: "anger-and-frustration" },
          { label: "frustration", slug: "anger-and-frustration" },
          { label: "anger", slug: "anger-and-frustration" },
        ] satisfies FeltLink[],
      },
      {
        name: "Contraction",
        line: "Identification with form causes us to feel threatened, contract physically and hold tension — and contraction is tiring to hold. It leaves the body braced and, over time, depleted.",
        felt: [
          { label: "tension", slug: "physical-tension" },
          { label: "exhaustion", slug: "exhaustion" },
          { label: "burnout", slug: "burnout-cycles" },
        ] satisfies FeltLink[],
      },
    ],
  },
  {
    accent: BRANCH_ROW_ACCENT.lack,
    branches: [
      {
        name: "Craving",
        line: "Identification with the bodily senses causes us to chase sense gratification endlessly.",
        felt: [
          { label: "addiction", slug: "craving-and-restlessness" },
          { label: "restlessness", slug: "craving-and-restlessness" },
          { label: "overconsumption", slug: "craving-and-restlessness" },
        ] satisfies FeltLink[],
      },
      {
        name: "Insufficiency",
        line: "Identification with form causes us to feel permanently insufficient, because the body and mind are inherently limited.",
        felt: [
          { label: "low self-esteem", slug: "self-criticism-and-shame" },
          { label: "envy", slug: "self-criticism-and-shame" },
          { label: "never enough", slug: "self-criticism-and-shame" },
        ] satisfies FeltLink[],
      },
      {
        name: "Seeking",
        line: "Identification with any form causes us to seek salvation in external things or in the future, rather than being content with what is here and now.",
        felt: [
          { label: "emptiness", slug: "emptiness-and-meaninglessness" },
          { label: "dissatisfaction", slug: "emptiness-and-meaninglessness" },
          { label: "meaninglessness", slug: "emptiness-and-meaninglessness" },
        ] satisfies FeltLink[],
      },
    ],
  },
] as const;

const ENTROPY_FELT: FeltLink[] = [
  { label: "the body's demands", slug: "exhaustion" },
  { label: "illness", slug: "stiffness-and-immobility" },
  { label: "ageing", slug: "low-physical-energy" },
];

function FeltAsLine({ links }: { links: readonly FeltLink[] }) {
  return (
    <p className="mt-2 text-[12px] leading-relaxed text-[#b8d4e8]/50 sm:text-[13px]">
      This is felt as{" "}
      {links.map((link, index) => (
        <span key={`${link.slug}-${link.label}`}>
          {index > 0 ? ", " : null}
          <Link
            to="/problems/$slug"
            params={{ slug: link.slug }}
            className="underline decoration-[#7ec8e3]/35 underline-offset-2 transition hover:text-[#7ec8e3] hover:decoration-[#7ec8e3]/70"
          >
            {link.label}
          </Link>
        </span>
      ))}
      .
    </p>
  );
}

const JUICE_OF_LIFE_PARAGRAPHS = [
  "When attention is taken up entirely by what it holds — a thought, a sensation, the next thing — you come to take yourself to be those things. And they are limited, so you feel limited. Life starts to feel like you against the world, and you never quite feel like enough.",
  "So you try to make up the difference from outside, asking ordinary things to do a job they cannot do. You eat when you are not hungry. You reach for your phone before you have decided to. You want someone to tell you that you are doing fine. You get the thing you wanted, and within a week it is just normal.",
  "Each one gives something real. Then the feeling fades, and you go looking again.",
  "It is like licking the peel of the fruit instead of eating what is inside. The problem was never the fruit.",
  "When attention rests in awareness rather than in what it holds, there is calm, clarity and aliveness that does not depend on circumstances going well. Nothing is being extracted from the world, so nothing has to be kept up.",
  "The aim of the inner work is not to escape life. It is to stop meeting it from a position of lack.",
] as const;

type LayerDef = {
  n: number;
  t: string;
  sub: string;
  color: string;
  size: number;
  /** Paragraphs; wrap a span in **…** for bold. */
  body: string[];
};

const LAYERS: LayerDef[] = [
  {
    n: 0,
    t: "Consciousness",
    sub: "The fact of being aware, before anything you are aware of.",
    color: "#fff8e0",
    size: 80,
    body: [
      "Whatever is happening — a thought, a feeling, a sound — something is aware of it. That awareness is not the thought, the feeling or the sound. You can check this in a second: notice something, then notice that you are noticing.",
      "Whatever you can observe is not the observer. Everything you can notice — sensations, moods, thoughts, even your sense of who you are — arrives, changes and passes. Awareness does not appear among those changing things. It is the condition in which they appear.",
      "Attention almost always rests in the contents. It can also be turned back on itself. That is what the practices at this level do, and when it happens every layer below changes state.",
      "On what consciousness ultimately is, this framework takes no position. No experiment can settle it either, for the same reason as above: an experiment measures something observed, and the observer is never the observed. Consciousness therefore cannot be known as an object — only from the inside.",
      "The traditions say a great deal here and disagree with one another. What is available to you is the looking itself: rest attention in awareness rather than in what it holds, and see what you find. Practitioners who go far with this consistently report that the sense of passing time, and of being someone separate who is watching, falls away.",
    ],
  },
  {
    n: 1,
    t: "The Vital Body",
    sub: "How much life is moving through you, and how freely.",
    color: "#a8e0ff",
    size: 160,
    body: [
      "Two things vary, and between them they describe your underlying state before any thought or emotion has formed.",
      "**Charge** — how much is moving. Depleted at one end, abundant at the other.",
      "**Ease** — how freely it moves. Constricted at one end, open at the other.",
      "**Abundant and open.** Brightness. Things are easy to begin. Warmth, steadiness, the sense of enough.",
      "**Abundant and constricted.** Restless, wired, irritable. Plenty of charge with nowhere clean to go.",
      "**Depleted and open.** Low but peaceful. Tired in a way that rest actually fixes. Quiet, slow, content to do little.",
      "**Depleted and constricted.** Low and tight. Tired in a way that rest does not fix — you sleep and wake unrefreshed. Heavy and effortful, with tension underneath it.",
      "This is not the physical body, which is what a scan can see. It is not an emotion, which has an object and a name. It sits beneath both and shifts faster than either. The nearest modern term for part of it is nervous-system state, though the two are not simply the same thing.",
      "On what it is made of, this framework takes no position.",
      "Most people can place themselves within a few seconds, which is the point. This layer is read, not reasoned about.",
      "It is the layer most directly changed by breath, by movement, and by how energy is spent or conserved — which is why those three levers sit here.",
    ],
  },
  {
    n: 2,
    t: "Emotional Body",
    sub: "What you are feeling, and your capacity to feel.",
    color: "#7ec8e3",
    size: 240,
    body: [
      "The internal weather system of the human feelings. It changes to reflect the state of the vital body. It is also influenced by sensory inputs, thoughts, and external situations. When closed, we feel numb, indifferent, and find it hard to connect. When open, we feel empathic, alive, and love radiates from the inside out.",
    ],
  },
  {
    n: 3,
    t: "Intellectual Body",
    sub: "The part that reasons, weighs and decides.",
    color: "#5fa8d3",
    size: 320,
    body: [
      "The faculty of analysing, reasoning, logic, discrimination, and conscious choice. It is able to analyse memories and sensory experiences. It is not intelligence — it simply dissects and analyses information and mental data.",
    ],
  },
  {
    n: 4,
    t: "Mental Body",
    sub: "What you have stored, and the thinking that runs on it.",
    color: "#3d7ab0",
    size: 400,
    body: [
      "The database of past accumulated memories, experiences, conditioning, endless thinking. Strong identification with the contents of the mind creates the false ego, and the illusion of psychological time as past and future.",
    ],
  },
  {
    n: 5,
    t: "Physical Body",
    sub: "The body as seen from outside: tissue, organs, senses.",
    color: "#2a5688",
    size: 480,
    body: [
      "The biological vessel and sensory organs through which life perceives and acts in the world. It is the outermost expression of all the inner layers.",
    ],
  },
  {
    n: 6,
    t: "Environment",
    sub: "Everything around you that you are in constant exchange with.",
    color: "#1b3a60",
    size: 560,
    body: [
      "The physical world surrounding the body. This is what you perceive externally through the senses. The spaces, nature, and people we constantly exchange energy with. Often overlooked, the environment is a layer of being — not separate from you, but in constant dialogue with all the layers within.",
    ],
  },
];

function LayerBodyParagraph({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <p className="text-sm leading-relaxed text-[#b8d4e8]">
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-medium text-white/90">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  );
}

/** Copy from order-of-operations Lever Map — italic tagline + body (+ optional notes). */
type LeverMapBlurb = {
  italic: string;
  rest?: string;
  notes?: string[];
};

const LEVER_ZERO = {
  n: 0,
  t: "Conservation",
  slug: "conservation" as const,
  blurb: {
    italic: "Conserves energy.",
    rest: "This fundamental lever increases vitality, aliveness and joy by reducing how much energy is lost.",
    notes: [
      "Reach for this when you are consistently depleted despite practice — when everything you build keeps draining away.",
    ],
  } satisfies LeverMapBlurb,
};

const LEVERS = [
  {
    n: 1,
    t: "Breath",
    slug: "breath" as const,
    blurb: {
      italic: "Regulates the nervous system.",
      rest: "The universal entry point and the fastest- acting tool in the framework. Reach for this first, always, and return to it whenever the system is dysregulated.",
    } satisfies LeverMapBlurb,
    group: "internal" as const,
  },
  {
    n: 2,
    t: "Movement",
    slug: "movement" as const,
    blurb: {
      italic: "Releases stored physical tension and builds capacity.",
      notes: [
        "Reach for this when the body is rigid, restless, or chronically tense — when the physical hardware is blocking everything above it.",
      ],
    } satisfies LeverMapBlurb,
    group: "internal" as const,
  },
  {
    n: 3,
    t: "Mind",
    slug: "mind" as const,
    blurb: {
      italic: "Directs cognitive energy and clears mental noise.",
      rest: "Reach for this when you are capable of stability but scattered — when the mind is sharp but undirected.",
    } satisfies LeverMapBlurb,
    group: "internal" as const,
  },
  {
    n: 4,
    t: "Sound",
    slug: "sound" as const,
    blurb: {
      italic: "Reorganises internal coherence through vibration.",
      rest: "Reach for this when you need a non-effortful entry into stillness — when the mind is too resistant for direct meditation but can be carried by sound.",
    } satisfies LeverMapBlurb,
    group: "internal" as const,
  },
  {
    n: 5,
    t: "Heart",
    slug: "heart" as const,
    blurb: {
      italic: "Dissolves emotional armour and opens the system.",
      rest: "Reach for this when emotional heaviness, shutdown, or grief is the primary obstruction. The solvent that melts what mental effort cannot move.",
    } satisfies LeverMapBlurb,
    group: "internal" as const,
  },
  {
    n: 6,
    t: "Awareness",
    slug: "awareness" as const,
    blurb: {
      italic: "The foundational lever.",
      rest: "Reach for this once basic stability exists. Contains the entire spectrum from basic relaxation (NSDR, Body Scan) to the deepest practices in the framework (Ultimate Self-Inquiry, Aware of Awareness).",
    } satisfies LeverMapBlurb,
    group: "internal" as const,
  },
  {
    n: 7,
    t: "Sustenance",
    slug: "sustenance" as const,
    blurb: {
      italic: "Frees energy from survival panic.",
      rest: "Reach for this when financial terror or misaligned work is the primary driver of your suffering. Must be addressed before genuine inner growth is possible.",
    } satisfies LeverMapBlurb,
    group: "external" as const,
  },
  {
    n: 8,
    t: "Sleep",
    slug: "sleep" as const,
    blurb: {
      italic: "The non-negotiable biological reset.",
      rest: "Reach for this when you are chronically exhausted. No other practice compensates for a collapsing sleep foundation.",
      notes: ["Address this before anything else if it is severely compromised."],
    } satisfies LeverMapBlurb,
    group: "external" as const,
  },
  {
    n: 9,
    t: "Nutrition",
    slug: "nutrition" as const,
    blurb: {
      italic: "Builds a clean, conductive physical vehicle.",
      rest: "Reach for this when digestive issues, energy crashes, or food-related anxiety are creating consistent friction.",
      notes: ["Not usually the primary bottleneck, but a significant force multiplier."],
    } satisfies LeverMapBlurb,
    group: "external" as const,
  },
  {
    n: 10,
    t: "Connection",
    slug: "connection" as const,
    blurb: {
      italic: "Dissolves isolation and co-regulates the nervous system.",
      rest: "Reach for this when chronic loneliness, relational conflict, or social isolation is the primary drain on your energy and well-being.",
    } satisfies LeverMapBlurb,
    group: "external" as const,
  },
  {
    n: 11,
    t: "Nature",
    slug: "nature" as const,
    blurb: {
      italic: "Restores biological coherence.",
      rest: "Reach for this as a consistent daily practice for almost everyone — particularly those living in urban environments. The lowest-effort, highest-return baseline practice.",
    } satisfies LeverMapBlurb,
    group: "external" as const,
  },
  {
    n: 12,
    t: "Environment",
    slug: "environment" as const,
    blurb: {
      italic: "The aquarium.",
      rest: "Reach for this when your physical space is chaotic, toxic, or actively working against your inner practice. Often underestimated. A bad environment defeats a good practice.",
    } satisfies LeverMapBlurb,
    group: "external" as const,
  },
];

function LeverMapCopy({ blurb }: { blurb: LeverMapBlurb }) {
  return (
    <div className="space-y-3">
      <p className="leading-relaxed">
        <em>{blurb.italic}</em>
        {blurb.rest ? <> {blurb.rest}</> : null}
      </p>
      {blurb.notes?.map((note) => (
        <p key={note} className="leading-relaxed">
          {note}
        </p>
      ))}
    </div>
  );
}

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

const GROUND_PARAGRAPHS = [
  "It has limits and constant demands — food, shelter, sleep — and it is subject to illness and ageing. This pressure is not caused by unconsciousness and does not resolve with insight. It is the one source of difficulty in this map that has nothing to do with how you see. It is met by handling the conditions of your life well, which is what the six external pillars are for.",
  "Everything below is different in kind.",
] as const;

function ZonePanel({
  zone,
  variant = "card",
}: {
  zone: Zone;
  /** `flat` = mobile accordion body: no nested card, no repeated number/title. */
  variant?: "card" | "flat";
}) {
  const content = (
    <>
      {variant === "card" ? (
        <h3 className="display text-3xl text-white">{zone.name}</h3>
      ) : null}
      <p
        className={`text-[15px] leading-relaxed text-[#b8d4e8] ${
          variant === "card" ? "mt-4" : ""
        }`}
      >
        {zone.description}
      </p>
      <ul className="mt-5 space-y-2 text-sm text-[#b8d4e8]">
        {zone.signs.map((sign) => (
          <li key={sign} className="flex gap-3">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7ec8e3]" />
            <span>{sign}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 space-y-3">
        {zone.startHereLinks.map((item, index) => (
          <Link
            key={item.slug}
            to="/practices/$leverSlug"
            params={{ leverSlug: item.slug }}
            className="block rounded-2xl border border-[#7ec8e3]/50 bg-[#7ec8e3]/10 p-4 transition hover:border-[#7ec8e3]/80 hover:bg-[#7ec8e3]/16"
          >
            {index === 0 ? <div className="label-eyebrow">Start here</div> : null}
            <p className={`display text-2xl text-white ${index === 0 ? "mt-2" : ""}`}>
              {item.label}
            </p>
            {index === 0 ? (
              <p className="mt-3 text-xs leading-relaxed text-[#b8d4e8]/80">{zone.note}</p>
            ) : null}
          </Link>
        ))}
      </div>
    </>
  );

  if (variant === "flat") {
    return <div className="relative z-10">{content}</div>;
  }

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
      <div className="relative z-10 pl-10 sm:pl-12">{content}</div>
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
      <section className="relative overflow-hidden pb-[6.8rem] pt-16">
        <Starfield density={0.7} />
        <SacredGeometry className="inset-0 m-auto h-[800px] w-[800px]" />
        <Orbs />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="display text-5xl text-white sm:text-7xl">
            THE SUNYA PHILOSOPHY
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-[#b8d4e8]">
            A unified map of human suffering and freedom.
          </p>
        </div>
      </section>

      {/* Why we suffer — Entropy framed above the chain, then 01–03 + canopy */}
      <section className="relative overflow-hidden bg-[#060d1c] py-[7.04rem]">
        <Starfield density={0.3} />
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="display text-4xl text-white sm:text-5xl md:text-6xl">Why we suffer</h2>
          </div>

          {/* Entropy — parallel source, visually distinct from the numbered chain */}
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 sm:mt-12 sm:px-8 sm:py-10">
            <p className="text-center text-sm tracking-wide text-[#b8d4e8]/55 sm:text-[0.9rem]">
              Entropy
            </p>
            <h3 className="display mt-5 text-center text-2xl text-white sm:mt-6 sm:text-3xl">
              Before any of this, there is simply the body.
            </h3>
            <div className="mt-6 space-y-4 text-[15px] leading-loose text-[#b8d4e8] sm:mt-7 sm:text-base">
              {GROUND_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <FeltAsLine links={ENTROPY_FELT} />
          </div>

          <div className="relative mx-auto mt-14 pb-14">
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

            {/* Canopy — three unlabelled rows; equal-height cells, text top-aligned */}
            <div className="relative z-10 mt-14 space-y-10 sm:mt-16 sm:space-y-12">
              {SUFFERING_BRANCH_GROUPS.map((group) => (
                <div
                  key={group.branches[0].name}
                  className="grid grid-cols-1 items-stretch gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:gap-x-10 lg:gap-y-12"
                >
                  {group.branches.map((branch) => (
                    <div
                      key={branch.name}
                      className="flex h-full flex-col border-l-2 pl-4 sm:pl-5"
                      style={{ borderColor: `${group.accent}99` }}
                    >
                      <h3 className="display text-lg tracking-wide text-[#7ec8e3] sm:text-xl">
                        {branch.name}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-[#b8d4e8] sm:text-base">
                        {branch.line}
                      </p>
                      <FeltAsLine links={branch.felt} />
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
                  Turn attention back on itself
                </h3>
                <p className="relative z-10 mt-5 text-[15px] leading-relaxed text-[#b8d4e8]">
                  The core of the inner work: attention resting in awareness rather than in what it
                  holds.
                </p>
              </div>
              <div className="glass-card relative overflow-hidden p-7">
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#7ec8e3]/22 to-transparent" />
                <h3 className="display relative z-10 text-3xl text-white">
                  Bring it into daily life
                </h3>
                <p className="relative z-10 mt-5 text-[15px] leading-relaxed text-[#b8d4e8]">
                  Using that calm and clarity to meet the challenges of daily life as they actually
                  are.
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
              Experience moves outward through seven layers, from awareness itself to the world
              around you. To change an experience, you have to know which layer you are working on.
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
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span
                        className="inline-block h-3 w-3 shrink-0 rounded-full"
                        style={{ background: l.color, boxShadow: `0 0 12px ${l.color}` }}
                      />
                      <span className="text-xs uppercase tracking-[0.25em] text-[#7ec8e3]">
                        Layer {l.n}
                      </span>
                      <span className="display text-xl text-white">{l.t}</span>
                    </div>
                    <p className="mt-1.5 text-xs italic leading-relaxed text-[#b8d4e8]/70">{l.sub}</p>
                    {isActive && (
                      <div className="mt-3 space-y-3">
                        {l.body.map((paragraph) => (
                          <LayerBodyParagraph key={paragraph} text={paragraph} />
                        ))}
                      </div>
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
                <div className="mt-5 text-[15px] text-[#b8d4e8]">
                  <LeverMapCopy blurb={LEVER_ZERO.blurb} />
                </div>
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
                            <LeverMapCopy blurb={l.blurb} />
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
                    <div className="border-t border-white/10 px-4 pb-5 pt-4">
                      <ZonePanel zone={zone} variant="flat" />
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
