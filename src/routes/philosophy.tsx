import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { SacredGeometry, Orbs } from "@/components/site/Decor";
import type { LeverSlug } from "@/data/levers";
import { buildSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/philosophy")({
  component: PhilosophyPage,
  head: () =>
    buildSeoHead({
      title: "The Sunya Philosophy — Why Humans Suffer and How They Become Free | Sunya",
      description:
        "Human suffering is a single structure built in a fixed order. The five links, the seven layers of being, and the twelve levers that undo it. Built on first principles, belonging to no tradition.",
      path: "/philosophy",
      ogType: "website",
      imageKind: "core",
    }),
});

type ChainLink = {
  n: "01" | "02" | "03" | "04" | "05";
  name: string;
  essence: string;
  body: string;
};

const CHAIN_LINKS: ChainLink[] = [
  {
    n: "01",
    name: "Unconsciousness",
    essence: "You are born facing the wrong way.",
    body: `No child arrives knowing itself as the boundless life. Each of us begins
already asleep to what we are.

And there is a reason this is the default, written into the design of a living
creature. The senses face outward. The eyes look out, the ears turn to the
world, the mind reaches toward what surrounds it. This is no accident — an
organism must attend to the world to survive in it.

So from the first moment, attention streams outward, and almost never turns
back toward its own source. The world is vivid, loud, and insistent; the silent
awareness behind it makes no sound at all. And so the louder thing eclipses the
subtler one.

We come to know everything except the one who knows.

This is not a personal failing. It is the default condition of life itself.`,
  },
  {
    n: "02",
    name: "Identification & the Separate Self",
    essence: "Not knowing what you are, you become what is nearest.",
    body: `You cannot live with no sense of being anyone at all. So not knowing your true
nature, you reach for the nearest thing — the body. Then the mind, the
memories, the story. Then possessions, work, name, nation, belief. Layer by
layer, a self is assembled out of everything claimed as "me" and "mine."

These are not two things. The separate self is nothing but a bundle of
identifications. Strip them away and no separate self remains underneath. It
was never a thing in the first place.

And now the ground turns personal. The body's guaranteed death becomes your
guaranteed death. Its fragility becomes your fragility. What was boundless and
secure now experiences itself as small, separate, and permanently under threat.

This is the fall from being into surviving.`,
  },
  {
    n: "03",
    name: "Resistance",
    essence: "A single, silent no.",
    body: `A separate self, surrounded by everything that is not itself, has one automatic
response to the world: refusal.

It has two faces — pushing away what it does not want, and clutching at what it
fears to lose — but they are one movement. Both say the same thing: this, as it
is, is not acceptable.

And this is not an occasional reaction. It is the standing condition. Beneath
an ordinary day runs an almost ceaseless bracing against the flow of life as it
actually arrives. We resist the situation. We resist what arises within us. And
beneath both, most quietly, we resist the present moment itself.

Here is the heart of it: pain comes from life. It arrives on its own.
Suffering is the no we add to it.`,
  },
  {
    n: "04",
    name: "Energetic Contraction",
    essence: "The refusal becomes physical.",
    body: `The no does not stay in the mind. When the self braces against life, it braces
with its whole being.

Between body and mind there is a flow of living energy — the vital force that
makes a body alive rather than inert. The inner refusal and the energetic
contraction are not two separate things. They are one movement seen from two
sides. What the mind experiences as no, the energy body performs as tightening:
channels narrowing, the open system clenching shut like a hand closing into a
fist.

And the body follows. The nervous system locks into a low, constant state of
threat — braced, guarded, unable to settle even when nothing is actually wrong.
You know this directly. The tight chest. The knotted stomach. The shallow
breath. The shoulders that will not drop.

Separation is no longer merely believed. It is lived in the flesh. And a
contracted system is a closed one — sealed off from the open exchange it was
built for.`,
  },
  {
    n: "05",
    name: "Chronic Insufficiency",
    essence: "A closed system runs low.",
    body: `Sealed off, the system can no longer be replenished. And a system running low
feels one very particular thing — emptiness. A quiet, persistent sense that
something is missing. That this is not enough. That I am not enough.

But nothing has gone missing from the world. What is missing is your own
boundless nature — not because you ever stopped being it, but because you
forgot it and contracted into something small. The hollow inside you is
precisely the size and shape of what you have forgotten yourself to be.

Not knowing this, you look in the one direction that can never work: outward.
More money, more status, more achievement, more approval, more of anything at
all. Each acquisition brings brief relief — the ache quiets for a moment — and
then returns, often deeper than before.

The emptiness is infinite, because it is the absence of your own infinity. And
nothing finite, in any amount, can fill an infinite emptiness.`,
  },
];

const LAYERS = [
  { n: 0, t: "Source", sub: "Pure Consciousness", color: "#fff8e0", size: 80, body: "The absolute core. The unchanging, silent observer. It has no form, no past, and no resistance. It simply is. This is what you truly are beneath everything else — Life itself." },
  { n: 1, t: "Energetic Body", sub: "The Vital Bridge", color: "#a8e0ff", size: 160, body: "The subtle energy pathways through which life force flows to power the human system. When threatened, the pathways contract. When safe, life force flows freely. The state of a person's energy system is usually reflected in the state of their mind and nervous system." },
  { n: 2, t: "Emotional Body", sub: "The Resonance Field", color: "#7ec8e3", size: 240, body: "The internal weather system of the human feelings. It translates energy into the physical sensations of fear, joy, love, and connection. When closed, we feel numb, indifferent, and find it hard to connect. When open, will feel empathic, alive, and love radiates from the inside out." },
  { n: 3, t: "Intellectual Body", sub: "Executive Discernment", color: "#5fa8d3", size: 320, body: "The faculty of analysing, reasoning, logic, discrimination, and conscious choice. The Chooser — the part of you that can cut through illusions and override biological impulses when properly developed." },
  { n: 4, t: "Mental Body", sub: "Thought & Memory", color: "#3d7ab0", size: 400, body: "The database of past accumulated memories, experiences, conditioning, endless thinking. The unconscious activity of the mind creates the illusion of psychological time as past and future. This perpetuates fear, endless desires, and resistance to the present moment." },
  { n: 5, t: "Physical Body", sub: "The Hardware", color: "#2a5688", size: 480, body: "The biological vessel and sensory organs through which life perceives and acts in the world. It is the outermost expression of all the inner layers." },
  { n: 6, t: "Environment", sub: "The Elemental Matrix", color: "#1b3a60", size: 560, body: "The physical world surrounding the body. The spaces, nature, and people we constantly exchange energy with. Often overlooked, the environment is a layer of being — not separate from you, but in constant dialogue with all the layers within." },
];

const LEVER_ZERO = {
  n: 0,
  t: "Conservation",
  layer: "The prerequisite for all twelve",
  body: `Before you try to generate more energy, stop losing the energy you have.

The human system constantly leaks vitality through unconscious habit — endless
scrolling, compulsive overthinking, idle talk, chronic over-consumption,
over-stimulation of every kind. Close the leaks and the system recharges on its
own.

Practices: silence, sensory rest, fasting, sexual conservation, the root lock.`,
};

const LEVERS = [
  { n: 1, t: "Breath", layer: "Energetic Body + Physical Body", what: "The breath is the remote control for the nervous system. The only autonomic function you can consciously override — making it the most immediate lever available to any human being at any moment.", practices: ["4-7-8 breathing: Inhale 4, hold 7, exhale 8. Repeat 4 cycles whenever anxiety arises.", "Box breathing: 4 in, 4 hold, 4 out, 4 hold. Used by special forces for nervous system regulation.", "Conscious slow breathing: Slow your breath to 5-6 breaths per minute throughout the day."], group: "internal" },
  { n: 2, t: "Movement", layer: "Physical Body + Energetic Body", what: "The physical body stores past trauma and resistance as rigidity. Conscious, fluid movement restores alignment and removes friction from the biological hardware. The body IS the mind made physical.", practices: ["Shaking: Stand and shake every part of your body for 5 minutes.", "Slow intuitive movement: No choreography, no goal. Follow sensation.", "Morning joint circles: Rotate every joint from ankles to neck for 5 minutes."], group: "internal" },
  { n: 3, t: "Mind", layer: "Intellectual Body + Mental Body", what: "Training the intellect to move from scattered rumination into single-pointed focus and clarity. A trained mind stops fighting reality and becomes a brilliant tool for alignment and truth.", practices: ["Single-task focus: One task, no other stimuli, 25 minutes.", "Contemplation: Sit with one question — let insight arise without forcing.", "Reality testing: Ask 'is this happening now, or is this a story?' Return to present."], group: "internal" },
  { n: 4, t: "Sound", layer: "Energetic Body + Emotional Body", what: "The body is highly responsive to vibration. Specific sounds, silence, and conscious listening can harmonize the nervous system far faster than thought-based practices.", practices: ["Humming: Hum a single tone for 5 minutes. Stimulates the vagus nerve.", "Sound bath: 20 minutes with singing bowls, 432Hz music, or natural soundscapes.", "Chanting: Repeat AUM, HU, or a meaningful sound for 10 minutes."], group: "internal" },
  { n: 5, t: "Heart", layer: "Emotional Body", what: "Transforming emotional contraction. Compassion, forgiveness, and devotion literally melt the defensive armour built around the chest. The heart is an electromagnetic field that affects everyone around you.", practices: ["Heart breathing: Hand on chest, breathe through the heart, feel warmth expanding.", "Loving-kindness (Metta): Direct goodwill toward yourself, loved one, neutral, difficult.", "Forgiveness practice: 'I release this. It no longer serves me.' Until the charge softens."], group: "internal" },
  { n: 6, t: "Awareness", layer: "Source + Mental Body", what: "The capacity to notice your experience without instantly reacting. By stepping back and observing thoughts and sensations, you detach from the illusion of the Self and rest in unconditioned presence. The master switch.", practices: ["60-second observer: Once per hour, stop and notice body and mind without labels.", "Thought watching: Sit 5 minutes and watch thoughts pass like clouds. Do not engage.", "Sensory anchoring: Bring full attention to one sense for 2 minutes to return to presence."], group: "internal" },
  { n: 7, t: "Sleep", layer: "Physical Body + Energetic Body", what: "Sleep is the most active repair process the body undertakes. The nervous system processes, the energetic body recharges, the physical body restores. Compromising sleep compromises every other lever.", practices: ["Consistent sleep-wake times every single day.", "Pre-sleep wind-down: No screens 60 min before bed. Dim lights. Slow breathing.", "Sleep environment: Complete darkness, 18-19°C, no electromagnetic devices near bed."], group: "external" },
  { n: 8, t: "Nutrition", layer: "Physical Body", what: "Food is not just fuel — it is information sent to every cell. High-water-content, living foods with low processing friction give more energy than they take to digest.", practices: ["Eat living foods first: Begin every meal with something raw.", "Eliminate slowly: Remove one processed food per week. Sustainability over intensity.", "Eat in silence: One meal per week, slowly, in silence. Notice what your body wants."], group: "external" },
  { n: 9, t: "Connection", layer: "Emotional Body + Environment", what: "We are nodes in a living relational field. Healing the illusion of separation by cultivating authentic, maskless relationships allows nervous systems to co-regulate. You cannot fully heal alone.", practices: ["Mask-dropping conversations: Say one true thing today that you would normally filter.", "Presence over performance: Focus on the other person — not on what to say next.", "Conscious community: Protect time with people who genuinely support your growth."], group: "external" },
  { n: 10, t: "Environment", layer: "Environment + Mental Body", what: "Your physical space mirrors and shapes your mental space. Visual noise creates mental noise. Space design is not decoration — it is inner architecture.", practices: ["20-item declutter today.", "Sacred space: Designate one area only for stillness. Keep it impeccably clean.", "Sensory audit: Walk through your home and remove anything that creates contraction."], group: "external" },
  { n: 11, t: "Nature", layer: "Physical + Energetic + Environment", what: "The body evolved in nature over millions of years. Modern life has severed this connection — and the nervous system registers severance as chronic stress. Syncing with the Earth is biological necessity.", practices: ["Morning sunlight in your eyes within 30 minutes of waking, for 10+ minutes.", "Earthing: Walk barefoot on natural ground for 20 minutes.", "Nature immersion: 2+ hours per week in nature with no phone."], group: "external" },
  { n: 12, t: "Sustenance", layer: "Mental Body + Environment", what: "Stripping the survival panic away from money and work. When livelihood is misaligned with authentic nature, every working hour costs Prana. Aligning labour with truth transforms work into frictionless service.", practices: ["Authentic audit: Does my work align with what I am here to do?", "Value creation focus: Shift from 'how do I make money' to 'how do I create genuine value?'", "Sufficiency practice: Define clearly what 'enough' looks like financially."], group: "external" },
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

const LEVER_SLUG_BY_NUMBER: Record<number, LeverSlug> = {
  0: "conservation",
  1: "breath",
  2: "movement",
  3: "mind",
  4: "sound",
  5: "heart",
  6: "awareness",
  7: "sleep",
  8: "nutrition",
  9: "connection",
  10: "environment",
  11: "nature",
  12: "sustenance",
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
    startHere: "Sustenance — Lever 12",
    startHereLinks: [{ label: "Sustenance — Lever 12", slug: "sustenance" }],
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
    startHere: "Sleep — Lever 7",
    startHereLinks: [{ label: "Sleep — Lever 7", slug: "sleep" }],
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
  `To be embodied is to live under a standing pressure that never fully switches off.`,
  `A body is not a solid, finished object. It is an ongoing process that must
continuously rebuild and hold itself together, moment by moment, just to keep
from falling apart. To do that it needs constant input — food, water, rest,
shelter, warmth. And when those needs go unmet, the body has only one language
to insist on them: pain.`,
  `Yet even when every need is met perfectly, the body still wears down. It remains
open to illness, to injury, to the slow erosion of ageing. And at the end,
without a single exception, the vessel fails. Death is not a risk the body runs;
it is a certainty built into having a body at all.`,
  `This is the biological tax: the unavoidable cost of being a living thing.`,
  `But notice carefully — this is not yet suffering. By itself it is simply the
bare fact of embodiment, the neutral ground. A creature can feel hunger, pain,
even fear, without the deep and particular anguish we are tracing here.`,
  `The tax is only the stage of pressure on which that anguish will be built. What
turns plain physical pressure into human suffering is what happens next.`,
];

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
  const [hasMounted, setHasMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [revealedChain, setRevealedChain] = useState<number[]>([]);
  const chainRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [reversalPulse, setReversalPulse] = useState(false);
  const reversalPulseRef = useRef<HTMLParagraphElement | null>(null);
  const [activeLayer, setActiveLayer] = useState(0);
  const [openLever, setOpenLever] = useState<number | null>(null);
  const [activeZone, setActiveZone] = useState(1);
  const navigate = useNavigate();
  const layer = LAYERS[activeLayer];

  useEffect(() => {
    setHasMounted(true);
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!hasMounted || prefersReducedMotion || typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute("data-chain-index"));
          if (Number.isNaN(index)) return;
          setRevealedChain((prev) => (prev.includes(index) ? prev : [...prev, index]));
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -80px 0px" },
    );
    chainRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [hasMounted, prefersReducedMotion]);

  useEffect(() => {
    if (!hasMounted || prefersReducedMotion || typeof window === "undefined" || !reversalPulseRef.current)
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setReversalPulse(true);
        observer.disconnect();
      },
      { threshold: 0.8 },
    );
    observer.observe(reversalPulseRef.current);
    return () => observer.disconnect();
  }, [hasMounted, prefersReducedMotion]);

  const tryLever = (lever: (typeof LEVERS)[number]) => {
    try {
      sessionStorage.setItem(
        "sunya_prefill",
        `I want to work on the lever of ${lever.t}. ${lever.what}\n\nWhere should I start?`,
      );
    } catch {
      // Ignore storage failures and continue navigation.
    }
    navigate({ to: "/sunya-ai" });
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <style>
        {`
          @keyframes chain-flow {
            0% { transform: translate(-50%, -120%); opacity: 0; }
            20% { opacity: 0.95; }
            100% { transform: translate(-50%, 240%); opacity: 0; }
          }
          @keyframes chain-dissolve {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            20% { opacity: 0.6; }
            100% { transform: translateY(-24px) scale(0.7); opacity: 0; }
          }
          @keyframes reversal-flow {
            0% { transform: translate(-50%, 220%); opacity: 0; }
            20% { opacity: 0.95; }
            100% { transform: translate(-50%, -160%); opacity: 0; }
          }
          @keyframes release-pulse {
            0% { box-shadow: 0 0 0 0 rgba(126, 200, 227, 0); }
            40% { box-shadow: 0 0 0 14px rgba(126, 200, 227, 0.32); }
            100% { box-shadow: 0 0 0 34px rgba(126, 200, 227, 0); }
          }
          .chain-card summary {
            list-style: none;
          }
          .chain-card summary::-webkit-details-marker {
            display: none;
          }
          .chain-connector-flow {
            animation: chain-flow 3s ease-in-out infinite;
          }
          .chain-dissolve-dot {
            animation: chain-dissolve 3.6s ease-out infinite;
          }
          .reversal-connector-flow {
            animation: reversal-flow 3s ease-in-out infinite;
          }
          .reversal-release-once {
            animation: release-pulse 1.1s ease-out 1;
          }
          @media (prefers-reduced-motion: reduce) {
            .chain-connector-flow,
            .chain-dissolve-dot,
            .reversal-connector-flow,
            .reversal-release-once {
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
          <div className="mt-10">
            <ChevronDown className="chev mx-auto h-6 w-6 text-[#b8d4e8]/60" />
          </div>
        </div>
      </section>

      {/* The Ground */}
      <section className="relative overflow-hidden bg-[#0a1628] py-32">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">THE GROUND</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl">
              Before suffering, there is only pressure.
            </h2>
          </div>
          <div className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-[#7ec8e3]/40 to-transparent" />
          <div className="mt-12 space-y-6 text-[15px] leading-loose text-[#b8d4e8] sm:text-base">
            {GROUND_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mx-auto mt-16 h-px w-24 bg-gradient-to-r from-transparent via-[#7ec8e3]/40 to-transparent" />
        </div>
      </section>

      {/* The Chain */}
      <section className="relative overflow-hidden bg-[#060d1c] py-32">
        <Starfield density={0.3} />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">THE CHAIN</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              Five links. One root.
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl space-y-5 text-center text-[15px] leading-relaxed text-[#b8d4e8] sm:text-base">
            <p className="whitespace-pre-line">
              {`Human suffering is not a collection of separate problems. It is a single
structure, built in a fixed order, where each link produces the next.`}
            </p>
            <p className="whitespace-pre-line">
              {`Read it downward. Each one follows from the one above with a hard and
simple logic.`}
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-[760px]">
            {CHAIN_LINKS.map((link, index) => {
              const widthClass = [
                "w-full",
                "w-[98%] sm:w-[94%]",
                "w-[96%] sm:w-[88%]",
                "w-[94%] sm:w-[82%]",
                "w-[92%] sm:w-[76%]",
              ][index];
              const edgeClass = [
                "border-l-[#7ec8e3]/45",
                "border-l-[#7ec8e3]/52",
                "border-l-[#7ec8e3]/60",
                "border-l-[#7ec8e3]/70",
                "border-l-[#e8f4fb]/80",
              ][index];
              const cardSpacingClass = ["mt-0", "mt-8", "mt-7", "mt-6", "mt-5"][index];
              const cardPaddingClass = [
                "px-5 py-6 sm:px-8 sm:py-8",
                "px-5 py-6 sm:px-8 sm:py-7",
                "px-5 py-5 sm:px-8 sm:py-6",
                "px-5 py-5 sm:px-8 sm:py-6",
                "px-5 py-4 sm:px-8 sm:py-5",
              ][index];
              const bodyPaddingClass = [
                "pt-5 sm:pt-6",
                "pt-4 sm:pt-5",
                "pt-4 sm:pt-5",
                "pt-4 sm:pt-5",
                "pt-3 sm:pt-4",
              ][index];
              const shouldAnimate = hasMounted && !prefersReducedMotion;
              const visible = !shouldAnimate || revealedChain.includes(index);

              return (
                <div
                  key={link.n}
                  ref={(node) => {
                    chainRefs.current[index] = node;
                  }}
                  data-chain-index={index}
                  className={`relative mx-auto ${widthClass} ${cardSpacingClass} transform-gpu transition-all duration-700 ease-out ${
                    visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                  style={{
                    transitionDelay: shouldAnimate ? `${index * 120}ms` : undefined,
                  }}
                >
                  <details
                    className={`chain-card glass-card group relative overflow-hidden border-l-2 ${edgeClass}`}
                    open={index === 0}
                    style={{
                      background: `linear-gradient(160deg, rgba(255,255,255,${0.09 - index * 0.01}), rgba(10,22,40,${0.42 + index * 0.08}))`,
                      boxShadow: `0 0 ${48 - index * 6}px rgba(126,200,227,${0.24 - index * 0.02})`,
                    }}
                  >
                    <div className="pointer-events-none absolute left-4 top-1 font-display text-6xl text-white/10 sm:text-7xl">
                      {link.n}
                    </div>
                    <summary className={`${cardPaddingClass} relative cursor-pointer`}>
                      <div className="flex items-start gap-4">
                        <div className="min-w-0 flex-1 pl-10 sm:pl-12">
                          <h3 className="display text-3xl text-white sm:text-4xl">{link.name}</h3>
                          <p className="display-italic mt-2 text-lg text-[#b8d4e8]">{link.essence}</p>
                        </div>
                        <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-[#7ec8e3] transition-transform group-open:rotate-180" />
                      </div>
                    </summary>
                    <div className="grid [grid-template-rows:0fr] overflow-hidden transition-all duration-500 ease-out group-open:[grid-template-rows:1fr]">
                      <div className="min-h-0 overflow-hidden">
                        <div className={`px-5 pb-6 sm:px-8 sm:pb-8 ${bodyPaddingClass}`}>
                          <p className="whitespace-pre-line text-[15px] leading-relaxed text-[#b8d4e8]">
                            {link.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </details>

                  {index < CHAIN_LINKS.length - 1 && (
                    <div
                      className={`relative mx-auto mt-3 sm:mt-4 ${
                        ["w-3 sm:w-4", "w-2.5 sm:w-3", "w-2 sm:w-2.5", "w-1.5 sm:w-2"][index]
                      }`}
                      style={{ height: [56, 50, 44, 38][index] }}
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            index === 0
                              ? "linear-gradient(to bottom, rgba(126,200,227,0.18), rgba(126,200,227,0.45), rgba(126,200,227,0.08))"
                              : index === 1
                                ? "linear-gradient(to bottom, rgba(126,200,227,0.22), rgba(126,200,227,0.52), rgba(126,200,227,0.08))"
                                : index === 2
                                  ? "linear-gradient(to bottom, rgba(126,200,227,0.25), rgba(126,200,227,0.62), rgba(126,200,227,0.12))"
                                  : "linear-gradient(to bottom, rgba(232,244,251,0.28), rgba(232,244,251,0.78), rgba(232,244,251,0.12))",
                        }}
                      />
                      {!prefersReducedMotion && (
                        <span className="chain-connector-flow absolute left-1/2 top-0 h-10 w-1 rounded-full bg-gradient-to-b from-white via-[#7ec8e3] to-transparent" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="relative mx-auto mt-4 h-16 w-2">
              <div className="absolute inset-x-0 top-0 h-12 rounded-full bg-gradient-to-b from-[#e8f4fb]/70 via-[#e8f4fb]/20 to-transparent" />
              {prefersReducedMotion ? null : (
                <div className="absolute inset-0">
                  {[0, 1, 2, 3, 4].map((particle) => (
                    <span
                      key={particle}
                      className="chain-dissolve-dot absolute left-1/2 top-8 h-1.5 w-1.5 rounded-full bg-[#e8f4fb]/60"
                      style={{
                        marginLeft: `${(particle - 2) * 6}px`,
                        animationDelay: `${particle * 0.28}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-4xl space-y-8 text-center">
            <p className="display whitespace-pre-line text-3xl leading-tight text-white sm:text-4xl">
              {`Trace it backward and every human suffering —
from the most private ache to the largest crises of our species —
grows from a single root.

The forgetting of what we are.`}
            </p>
            <p className="mx-auto max-w-3xl whitespace-pre-line text-[15px] leading-relaxed text-[#b8d4e8]">
              {`When billions of contracted selves reach outward at once, each trying to fill
an infinite void with finite things, it becomes an entire civilisation built on
extraction. Our great outer crises are not separate from the inner void.
They are that void, written large across the world.`}
            </p>
          </div>
        </div>
      </section>

      {/* The Reversal */}
      <section className="relative overflow-hidden bg-[#11253b] py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(126,200,227,0.2),transparent_58%)]" />
        <Starfield density={0.55} />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <div className="relative mx-auto h-16 w-3">
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#7ec8e3]/25 to-[#e8f4fb]/75" />
            {!prefersReducedMotion && (
              <span className="reversal-connector-flow absolute left-1/2 top-0 h-10 w-1 rounded-full bg-gradient-to-t from-transparent via-[#7ec8e3] to-white" />
            )}
          </div>
          <div className="label-eyebrow">THE REVERSAL</div>
          <h2 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
            One root. One place it comes undone.
          </h2>
          <p className="mx-auto mt-10 whitespace-pre-line text-[15px] leading-loose text-[#b8d4e8] sm:text-base">
            {`This is the most hopeful fact in all of it. A structure with a single root has
a single place where it can be dismantled.

Suppose you were to fully remember, in this moment, that you are the boundless
life and not the small separate self. Watch what happens to the chain.

The separate self dissolves — there is no longer anyone separate to be. With no
separate self, resistance falls away — no one is braced against life, nothing
is left to refuse. As resistance falls away, the contraction releases — the
clenched energy opens, and the closed system opens with it. And as the system
opens, the void fills — not from anything gained, but because you have
recognised the infinite life you always were.`}
          </p>
          <p
            ref={reversalPulseRef}
            className={`display mt-12 text-3xl text-white sm:text-4xl ${
              reversalPulse && !prefersReducedMotion ? "reversal-release-once" : ""
            }`}
          >
            Pull the root, and every link lets go at once.
          </p>
        </div>

        <div className="relative left-1/2 mt-16 w-[108vw] -translate-x-1/2 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="glass-card relative overflow-hidden p-7 lg:-translate-y-4">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#7ec8e3]/22 to-transparent" />
                <h3 className="display relative z-10 text-3xl text-white">
                  Recognition — from above
                </h3>
                <p className="relative z-10 mt-5 whitespace-pre-line text-[15px] leading-relaxed text-[#b8d4e8]">
                  {`Seeing directly through the mistaken identity. Awareness turning back on itself
and recognising what it actually is. This is the work of the Awareness lever —
observation, disidentification, self-inquiry.`}
                </p>
              </div>
              <div className="glass-card relative overflow-hidden p-7 lg:translate-y-4">
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#7ec8e3]/22 to-transparent" />
                <h3 className="display relative z-10 text-3xl text-white">
                  Restoration — from below
                </h3>
                <p className="relative z-10 mt-5 whitespace-pre-line text-[15px] leading-relaxed text-[#b8d4e8]">
                  {`Working directly on the energy body — releasing contraction, restoring the free
flow of life force. This is the work of breath, movement, sound, heart, sleep,
and the conditions you live in.`}
                </p>
              </div>
            </div>
            <p className="mx-auto mt-16 max-w-4xl whitespace-pre-line text-center text-[15px] leading-relaxed text-[#b8d4e8]">
              {`These are the two great movements of the path, and they feed each other
endlessly. Every release in the body makes recognition easier. Every taste of
recognition releases the body further.`}
            </p>
            <p className="mx-auto mt-8 max-w-4xl whitespace-pre-line text-center text-sm leading-relaxed text-[#b8d4e8]/75">
              {`Recognition alone is rarely enough. Contraction settles into tissue and nervous
system over years, and does not always release the moment understanding dawns.
You can see your true nature clearly and still find the chest tight and the old
reactions running. This is why the framework works from both directions at once.`}
            </p>
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
            <div className="label-eyebrow">The Sunya method</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              The 12 Levers of
              <br />
              <span className="display-italic text-[#b8d4e8]">Transformation.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[#b8d4e8]">
              The precise tools for working on the human system. Each lever corresponds to specific
              layers of being. Together, they form a complete system for inner freedom.
            </p>
            <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-sm text-[#b8d4e8]/90">
              {`The order matters. The levers move from the most immediate and physical to the
most subtle. Each one prepares the ground for the next.`}
            </p>
          </div>

          <div className="mt-14">
            <div className="label-eyebrow text-center">THE PREREQUISITE</div>
            <div className="glass-strong relative mt-5 overflow-hidden border border-[#dcb48d]/40 p-6 sm:p-8">
              <div className="pointer-events-none absolute left-4 top-0 font-display text-7xl text-[#dcb48d]/20 sm:text-8xl">
                00
              </div>
              <div className="relative z-10 pl-12 sm:pl-16">
                <h3 className="display text-4xl text-white">Conservation</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#dcb48d]/90">
                  The prerequisite for all twelve
                </p>
                <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-[#b8d4e8]">
                  {LEVER_ZERO.body}
                </p>
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
                            <div className="text-xs italic text-[#b8d4e8]/70">{l.layer}</div>
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
                            <div className="label-eyebrow mt-5">3 practices</div>
                            <ul className="mt-3 space-y-2">
                              {l.practices.map((p, i) => (
                                <li key={i} className="flex gap-3">
                                  <span className="text-[#7ec8e3]">·</span>
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                            <Link
                              to="/practices/$leverSlug"
                              params={{ leverSlug: LEVER_SLUG_BY_NUMBER[l.n] }}
                              className="mt-5 inline-flex items-center gap-2 text-sm text-[#7ec8e3] transition hover:text-white"
                            >
                              See all practices <ArrowRight className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => tryLever(l)}
                              className="mt-3 inline-flex items-center gap-2 text-sm text-[#7ec8e3] transition hover:text-white"
                            >
                              Work on this with Sunya AI <ArrowRight className="h-4 w-4" />
                            </button>
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
            <div className="label-eyebrow">WHERE YOU BEGIN</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              Twelve levers. But only one matters right now.
            </h2>
            <p className="mx-auto mt-8 max-w-3xl whitespace-pre-line text-[15px] leading-loose text-[#b8d4e8]">
              {`The instinct when someone is suffering is to prescribe everything at once. The
result is overwhelm, abandonment, and the false conclusion that the tools don't
work. The tools work. Over-prescription fails.

Every human system has a single point of greatest friction at any given time.
Address anything other than that bottleneck and it silently defeats every other
intervention. Address it directly and the whole system shifts.

Most people are in one of five zones. Find yours.`}
            </p>
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

          <p className="mx-auto mt-14 max-w-3xl whitespace-pre-line text-center text-sm leading-relaxed text-[#b8d4e8]/85">
            {`Most people sit across two zones. When that happens, identify which one — if
addressed — would most rapidly improve the other. Start there.`}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 text-sm sm:flex-row sm:justify-center">
            <Link
              to="/practices/where-to-begin"
              className="text-[#7ec8e3] transition hover:text-white"
            >
              Read the full order of operations →
            </Link>
            <Link to="/timeless-solution" className="text-[#7ec8e3]/80 transition hover:text-white">
              Or begin the Timeless Solution →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#0a1628] py-28">
        <Starfield density={0.4} />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="display text-4xl text-white sm:text-5xl">
            Not sure which zone you're in?
          </h2>
          <p className="mx-auto mt-6 max-w-xl whitespace-pre-line text-[#b8d4e8]">
            {`Describe what you're actually experiencing. Sunya AI will identify where your
system is contracted, which zone you're in, and the single lever that matters
most for you right now.`}
          </p>
          <Link
            to="/sunya-ai"
            className="glow-btn mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium"
          >
            Try Sunya AI Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
