import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { SacredGeometry, Orbs } from "@/components/site/Decor";

export const Route = createFileRoute("/philosophy")({
  component: PhilosophyPage,
  head: () => ({
    meta: [
      { title: "The Sunya Philosophy — A unified map of human suffering and freedom" },
      {
        name: "description",
        content:
          "The 4 root causes, 7 layers of being, and 12 levers of transformation. Built on first principles. Belonging to no tradition.",
      },
    ],
  }),
});

const CAUSES = [
  {
    n: "01",
    t: "Resistance",
    cure: "Total Surrender",
    body: "The absolute primary cause of human suffering is resistance. It manifests as a deep dissatisfaction — the feeling that this moment is not enough. Physically it appears as clenching and tension. Mentally as craving and clinging. Energetically as friction and contraction. The solution is not passivity — it is allowing what is to be, without fighting it, while acting intelligently within the circumstances you are given.",
  },
  {
    n: "02",
    t: "Identification",
    cure: "Un-defining",
    body: "We identify with limited things: the body, the mind, our past, our thoughts, our possessions. Any kind of identification creates a boundary, and limitation always leads to suffering. When you are totally free from identifying with anything whatsoever, you return to your authentic, original state — profound peace, contentment, and freedom from limitation.",
  },
  {
    n: "03",
    t: "The Separate Self",
    cure: "Selflessness",
    body: "Suffering relies on the illusion of a psychological self — a center that feels like an isolated entity in a hostile universe. This self is merely an accumulation of the past, constantly pushing its momentum into the future. When you see through the non-existence of this phantom self, the mind becomes quiet, and you begin to perceive reality through an unconditioned lens.",
  },
  {
    n: "04",
    t: "Unconsciousness",
    cure: "Pure Observation",
    body: "People suffer because they lack awareness. Internally, they are not conscious of their thought processes, emotional patterns, fears, and conditioning. The path to freedom is raising consciousness through pure, effortless observation — paying attention to life without preconceived notions, aligning effortlessly with the rhythm of nature and your own authentic truth.",
  },
];

const LAYERS = [
  { n: 0, t: "Source", sub: "Pure Consciousness", color: "#fff8e0", size: 80, body: "The absolute core. The unchanging, silent observer. It has no form, no past, and no resistance. It simply is. This is what you truly are beneath everything else." },
  { n: 1, t: "Energetic Body", sub: "The Vital Bridge", color: "#a8e0ff", size: 160, body: "The invisible electrical grid — life-force, Prana — that powers the entire machine. When threatened, this energy contracts into knots. When safe, it flows freely. The physical nervous system acts as the hardware for this energy." },
  { n: 2, t: "Emotional Body", sub: "The Resonance Field", color: "#7ec8e3", size: 240, body: "The internal weather system of the human machine. It translates energy into the physical sensations of fear, joy, love, and connection. Most people live almost entirely at this layer." },
  { n: 3, t: "Intellectual Body", sub: "Executive Discernment", color: "#5fa8d3", size: 320, body: "The faculty of deep clarity, logic, and conscious choice. The Chooser — the part of you that can cut through illusions and override biological impulses when properly developed." },
  { n: 4, t: "Mental Body", sub: "Thought & Memory", color: "#3d7ab0", size: 400, body: "The automated software. The database of past memories, conditioned programming, endless thinking, and the Ego. Most people mistake this layer for their identity. It is not who you are — it is what has been programmed into you." },
  { n: 5, t: "Physical Body", sub: "The Hardware", color: "#2a5688", size: 480, body: "The dense biological vessel — bone, muscle, organs, and sensory inputs — used to directly interact with reality. It is the outermost expression of all the inner layers." },
  { n: 6, t: "Environment", sub: "The Elemental Matrix", color: "#1b3a60", size: 560, body: "The physical world surrounding the body. The spaces, nature, and people we constantly exchange energy with. Often overlooked, the environment is a layer of being — not separate from you, but in constant dialogue with all the layers within." },
];

const LEVERS = [
  { n: 1, t: "Breath", layer: "Energetic Body + Physical Body", what: "The breath is the remote control for the nervous system. The only autonomic function you can consciously override — making it the most immediate lever available to any human being at any moment.", practices: ["4-7-8 breathing: Inhale 4, hold 7, exhale 8. Repeat 4 cycles whenever anxiety arises.", "Box breathing: 4 in, 4 hold, 4 out, 4 hold. Used by special forces for nervous system regulation.", "Conscious slow breathing: Slow your breath to 5-6 breaths per minute throughout the day."], group: "internal" },
  { n: 2, t: "Awareness", layer: "Source + Mental Body", what: "The capacity to notice your experience without instantly reacting. By stepping back and observing thoughts and sensations, you detach from the illusion of the Self and rest in unconditioned presence. The master switch.", practices: ["60-second observer: Once per hour, stop and notice body and mind without labels.", "Thought watching: Sit 5 minutes and watch thoughts pass like clouds. Do not engage.", "Sensory anchoring: Bring full attention to one sense for 2 minutes to return to presence."], group: "internal" },
  { n: 3, t: "Mind", layer: "Intellectual Body + Mental Body", what: "Training the intellect to move from scattered rumination into single-pointed focus and clarity. A trained mind stops fighting reality and becomes a brilliant tool for alignment and truth.", practices: ["Single-task focus: One task, no other stimuli, 25 minutes.", "Contemplation: Sit with one question — let insight arise without forcing.", "Reality testing: Ask 'is this happening now, or is this a story?' Return to present."], group: "internal" },
  { n: 4, t: "Heart", layer: "Emotional Body", what: "Transforming emotional contraction. Compassion, forgiveness, and devotion literally melt the defensive armour built around the chest. The heart is an electromagnetic field that affects everyone around you.", practices: ["Heart breathing: Hand on chest, breathe through the heart, feel warmth expanding.", "Loving-kindness (Metta): Direct goodwill toward yourself, loved one, neutral, difficult.", "Forgiveness practice: 'I release this. It no longer serves me.' Until the charge softens."], group: "internal" },
  { n: 5, t: "Movement", layer: "Physical Body + Energetic Body", what: "The physical body stores past trauma and resistance as rigidity. Conscious, fluid movement restores alignment and removes friction from the biological hardware. The body IS the mind made physical.", practices: ["Shaking: Stand and shake every part of your body for 5 minutes.", "Slow intuitive movement: No choreography, no goal. Follow sensation.", "Morning joint circles: Rotate every joint from ankles to neck for 5 minutes."], group: "internal" },
  { n: 6, t: "Sound", layer: "Energetic Body + Emotional Body", what: "The body is highly responsive to vibration. Specific sounds, silence, and conscious listening can harmonize the nervous system far faster than thought-based practices.", practices: ["Humming: Hum a single tone for 5 minutes. Stimulates the vagus nerve.", "Sound bath: 20 minutes with singing bowls, 432Hz music, or natural soundscapes.", "Chanting: Repeat AUM, HU, or a meaningful sound for 10 minutes."], group: "internal" },
  { n: 7, t: "Sleep", layer: "Physical Body + Energetic Body", what: "Sleep is the most active repair process the body undertakes. The nervous system processes, the energetic body recharges, the physical body restores. Compromising sleep compromises every other lever.", practices: ["Consistent sleep-wake times every single day.", "Pre-sleep wind-down: No screens 60 min before bed. Dim lights. Slow breathing.", "Sleep environment: Complete darkness, 18-19°C, no electromagnetic devices near bed."], group: "external" },
  { n: 8, t: "Nutrition", layer: "Physical Body", what: "Food is not just fuel — it is information sent to every cell. High-water-content, living foods with low processing friction give more energy than they take to digest.", practices: ["Eat living foods first: Begin every meal with something raw.", "Eliminate slowly: Remove one processed food per week. Sustainability over intensity.", "Eat in silence: One meal per week, slowly, in silence. Notice what your body wants."], group: "external" },
  { n: 9, t: "Connection", layer: "Emotional Body + Environment", what: "We are nodes in a living relational field. Healing the illusion of separation by cultivating authentic, maskless relationships allows nervous systems to co-regulate. You cannot fully heal alone.", practices: ["Mask-dropping conversations: Say one true thing today that you would normally filter.", "Presence over performance: Focus on the other person — not on what to say next.", "Conscious community: Protect time with people who genuinely support your growth."], group: "external" },
  { n: 10, t: "Environment", layer: "Environment + Mental Body", what: "Your physical space mirrors and shapes your mental space. Visual noise creates mental noise. Space design is not decoration — it is inner architecture.", practices: ["20-item declutter today.", "Sacred space: Designate one area only for stillness. Keep it impeccably clean.", "Sensory audit: Walk through your home and remove anything that creates contraction."], group: "external" },
  { n: 11, t: "Nature", layer: "Physical + Energetic + Environment", what: "The body evolved in nature over millions of years. Modern life has severed this connection — and the nervous system registers severance as chronic stress. Syncing with the Earth is biological necessity.", practices: ["Morning sunlight in your eyes within 30 minutes of waking, for 10+ minutes.", "Earthing: Walk barefoot on natural ground for 20 minutes.", "Nature immersion: 2+ hours per week in nature with no phone."], group: "external" },
  { n: 12, t: "Sustenance", layer: "Mental Body + Environment", what: "Stripping the survival panic away from money and work. When livelihood is misaligned with authentic nature, every working hour costs Prana. Aligning labour with truth transforms work into frictionless service.", practices: ["Authentic audit: Does my work align with what I am here to do?", "Value creation focus: Shift from 'how do I make money' to 'how do I create genuine value?'", "Sufficiency practice: Define clearly what 'enough' looks like financially."], group: "external" },
];

function ExtractionLoopDiagram() {
  const nodes = [
    { t: "Inner Void", angle: -90 },
    { t: "External Seeking", angle: 0 },
    { t: "Temporary Relief", angle: 90 },
    { t: "Deeper Emptiness", angle: 180 },
  ];
  const R = 130;
  const labelRadiusPercent = 28;
  return (
    <div className="glass-strong relative mx-auto aspect-square w-full min-w-0 max-w-full overflow-hidden rounded-3xl p-4 sm:max-w-sm sm:p-6 md:max-w-md">
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(126,200,227,0.18), transparent 65%)",
          animation: "pulse-glow 5s ease-in-out infinite",
        }}
      />
      <div className="relative mx-auto h-full w-full min-w-0 max-w-full">
        <svg viewBox="-160 -160 320 320" className="absolute inset-0 h-full w-full max-w-full overflow-visible">
          <defs>
            <linearGradient id="loopStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7ec8e3" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2e6db4" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <circle
            cx="0"
            cy="0"
            r={R}
            fill="none"
            stroke="url(#loopStroke)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            style={{ filter: "drop-shadow(0 0 6px rgba(126,200,227,0.4))" }}
          />
          {nodes.map((n, i) => {
            const next = nodes[(i + 1) % nodes.length];
            const a1 = ((n.angle + 18) * Math.PI) / 180;
            const a2 = ((next.angle - 18) * Math.PI) / 180;
            const x2 = Math.cos(a2) * R;
            const y2 = Math.sin(a2) * R;
            return (
              <polygon
                key={i}
                points={`${x2 - 5},${y2 - 5} ${x2 + 6},${y2} ${x2 - 5},${y2 + 5}`}
                fill="#7ec8e3"
                opacity="0.8"
                transform={`rotate(${(next.angle - 18) + 90} ${x2} ${y2})`}
              />
            );
          })}
        </svg>
        {nodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = 50 + Math.cos(rad) * labelRadiusPercent;
          const y = 50 + Math.sin(rad) * labelRadiusPercent;
          return (
            <div
              key={i}
              className="absolute max-w-[7.25rem] -translate-x-1/2 -translate-y-1/2 whitespace-normal rounded-full border border-[#7ec8e3]/40 bg-[#0a1628]/80 px-2.5 py-1.5 text-center text-[10px] leading-tight text-white backdrop-blur-md sm:max-w-none sm:whitespace-nowrap sm:px-3 sm:text-xs"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {n.t}
            </div>
          );
        })}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#7ec8e3]">The Loop</div>
        </div>
      </div>
    </div>
  );
}

function PhilosophyPage() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [openLever, setOpenLever] = useState<number | null>(null);
  const navigate = useNavigate();
  const layer = LAYERS[activeLayer];

  const tryLever = (lever: typeof LEVERS[number]) => {
    try {
      sessionStorage.setItem(
        "sunya_prefill",
        `I want to work on the lever of ${lever.t}. ${lever.what}\n\nWhere should I start?`,
      );
    } catch {}
    navigate({ to: "/sunya-ai" });
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />

      {/* Hero */}
      <section className="relative overflow-hidden pb-32 pt-16">
        <Starfield density={0.7} />
        <SacredGeometry className="inset-0 m-auto h-[800px] w-[800px]" />
        <Orbs />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="label-eyebrow">The Sunya Philosophy</div>
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

      {/* Why the human condition is what it is */}
      <section className="relative overflow-hidden bg-[#0a1628] py-32">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">Why the human condition is what it is</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl">
              Your suffering is not personal.
              <br />
              <span className="display-italic text-[#b8d4e8]">It is mechanical.</span>
            </h2>
          </div>
          <div className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-[#7ec8e3]/40 to-transparent" />
          <div className="mt-12 space-y-6 text-[15px] leading-loose text-[#b8d4e8] sm:text-base">
            <p>
              The human being is not broken by accident or moral failure. The conditions for
              suffering are built into the architecture of physical existence itself.
            </p>
            <p>
              You are a biological system operating under constant pressure — the need to maintain
              itself, the awareness of its own impermanence, the gap between what it wants and what
              it has. This creates a baseline of inner tension that never fully resolves.
            </p>
            <p>
              To cope with this tension, the mind does something entirely predictable: it contracts.
              It builds a defended sense of self. It identifies with everything it can hold — its
              body, its story, its roles, its possessions — because identification feels like
              safety.
            </p>
            <p>
              But identification with limited, temporary things is itself the root of suffering.
              Because everything it holds will change. Everything it grasps will eventually be lost.
              And the separate, defended self lives in permanent low-grade fear of that loss.
            </p>
            <p>
              This contraction cuts you off from the natural flow of life-force through your system.
              You become, energetically, a closed system.
            </p>
            <p className="text-white/90">And a closed system runs low.</p>
            <p>
              When the internal reservoir empties, the mind does what any depleted system does: it
              seeks replenishment from outside itself. More achievement. More connection. More
              stimulation. More acquisition. More validation.
            </p>
            <p>
              This is what drives almost every compulsive human behaviour — not weakness, not evil,
              not laziness. A closed system, depleted, reaching outward for what can only be found
              within.
            </p>
            <p>
              The Sunya framework calls this the Inner Void. And the tragedy is not that people
              seek to fill it. The tragedy is that they seek to fill it with things that cannot
              fill it.
            </p>
            <p className="display-italic text-white">
              Finite things cannot produce infinite fulfilment.
              <br />
              External solutions cannot solve an internal mechanical problem.
            </p>
            <p>
              Understanding this — really understanding it — changes everything. Because the moment
              you see the mechanics clearly, you stop blaming yourself. And you start working on
              the actual problem.
            </p>
          </div>
          <div className="mx-auto mt-16 h-px w-24 bg-gradient-to-r from-transparent via-[#7ec8e3]/40 to-transparent" />
        </div>
      </section>

      {/* 4 Root Causes */}
      <section className="relative overflow-hidden bg-[#060d1c] py-32">
        <Starfield density={0.3} />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">The four root causes</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              Why humans suffer —
              <br />
              <span className="display-italic text-[#b8d4e8]">and how they become free.</span>
            </h2>
            <p className="mt-10 text-xs uppercase tracking-[0.3em] text-[#b8d4e8]">
              These four mechanics are at the root of it all.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {CAUSES.map((c) => (
              <div key={c.t} className="glass-card p-8">
                <div className="font-display text-xs tracking-[0.4em] text-[#7ec8e3]">{c.n}</div>
                <h3 className="display mt-3 text-3xl text-white">{c.t}</h3>
                <p className="display-italic mt-1 text-[#7ec8e3]">The Cure: {c.cure}</p>
                <p className="mt-5 text-[15px] leading-relaxed text-[#b8d4e8]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Extraction Loop */}
      <section className="relative max-w-full overflow-x-clip bg-[#0a1628] py-20 sm:py-32">
        <div className="relative z-10 mx-auto w-full max-w-6xl overflow-x-clip px-5 sm:px-6">
          <div className="text-center">
            <div className="label-eyebrow">The extraction loop</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl">
              Why nothing outside you
              <br />
              <span className="display-italic text-[#b8d4e8]">has ever fully fixed it.</span>
            </h2>
          </div>
          <div className="mx-auto mt-12 grid w-full min-w-0 max-w-5xl grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-2 lg:items-center">
            <div className="mx-auto w-full min-w-0 max-w-full space-y-5 overflow-x-clip text-wrap break-words text-[15px] leading-relaxed text-[#b8d4e8] lg:mx-0 lg:max-w-[42rem]">
              <p>
                When the internal system runs low, human beings do something entirely predictable —
                they extract from the world around them.
              </p>
              <p>
                Status. Money. Relationships. Substances. Validation. Achievement. Scrolling.
                Eating. Working. Avoiding.
              </p>
              <p>
                Each of these provides a temporary spike of relief. And then the feeling returns —
                often deeper than before.
              </p>
              <p>
                This is not a moral failing. It is the logical output of a depleted system. A
                closed system cannot sustain itself. So it reaches outward.
              </p>
              <p>
                But the world outside cannot permanently replenish what is depleted inside. It can
                distract it. It can temporarily stimulate it. It cannot fill it.
              </p>
              <p className="text-white/90">
                This is why the most successful, most connected, most admired people often feel the
                emptiest. They have done everything the world said would work. And the void remains.
              </p>
              <p>
                The solution is not to reach further outward. It is to open the system from within.
                To restore the natural flow of life-force through the human mechanism. To move from
                a closed, depleted, seeking system — to an open, self-sustaining, naturally full
                one.
              </p>
              <p className="display-italic text-white">
                That is what the Sunya framework is built to do.
              </p>
            </div>
            <div className="mx-auto w-full min-w-0 max-w-full overflow-x-clip">
              <ExtractionLoopDiagram />
            </div>
          </div>
          <div className="mt-16 text-center">
            <Link
              to="/sunya-ai"
              className="glow-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
            >
              There is a way out of the loop. Try Sunya AI
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7 Layers */}
      <section className="relative overflow-hidden bg-[#0a1628] py-32">
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

      {/* 12 Levers */}
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
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
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
                            <button
                              onClick={() => tryLever(l)}
                              className="mt-5 inline-flex items-center gap-2 text-sm text-[#7ec8e3] transition hover:text-white"
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

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#0a1628] py-28">
        <Starfield density={0.4} />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="display text-4xl text-white sm:text-5xl">
            Ready to apply this to your specific situation?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[#b8d4e8]">
            Sunya AI will analyse where you are across these levers and give you a personalised
            protocol.
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
