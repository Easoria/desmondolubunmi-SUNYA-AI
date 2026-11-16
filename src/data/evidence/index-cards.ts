import type { EvidenceGroupId } from "./index";

export type IndexGradeChip = "Strong" | "Moderate" | "Early" | "Nothing found";

export type EvidenceIndexCard = {
  slug: string;
  /** Card display name — SPEC 46 final copy (may be shorter than the page title). */
  name: string;
  grade: IndexGradeChip;
  note: string;
  core?: boolean;
};

export const EVIDENCE_INDEX_CARD_GROUPS: Array<{
  id: EvidenceGroupId;
  label: string;
  cards: EvidenceIndexCard[];
}> = [
  {
    id: "breath-and-voice",
    label: "Breath and voice",
    cards: [
      {
        slug: "slow-and-paced-breathing",
        name: "Slow and paced breathing",
        grade: "Strong",
        note: "Lowers blood pressure like a first-line treatment.",
        core: true,
      },
      {
        slug: "activating-breathwork",
        name: "Activating breathwork",
        grade: "Strong",
        note: "Halved inflammation. Real safety cautions.",
        core: true,
      },
      {
        slug: "sustained-vocalisation",
        name: "Sustained vocalisation",
        grade: "Moderate",
        note: "Chanting and humming. Helps anxiety and trauma. Costs nothing.",
      },
      {
        slug: "music-and-deliberately-chosen-sound",
        name: "Music and deliberately chosen sound",
        grade: "Moderate",
        note: "Clear in hospitals. Less clear day to day.",
      },
    ],
  },
  {
    id: "attention-and-cognition",
    label: "Attention and cognition",
    cards: [
      {
        slug: "rumination-and-mind-wandering",
        name: "Rumination and mind-wandering",
        grade: "Strong",
        note: "Breaking thought loops. The strongest single result on this site.",
        core: true,
      },
      {
        slug: "decentering",
        name: "Decentering",
        grade: "Strong",
        note: "Seeing a thought as a thought. Halved the chance of depression returning.",
        core: true,
      },
      {
        slug: "self-referential-processing",
        name: "Self-referential processing",
        grade: "Moderate",
        note: "Beat exercise at softening harsh self-judgement.",
        core: true,
      },
      {
        slug: "awareness-without-thought",
        name: "Awareness without thought",
        grade: "Early",
        note: "Described consistently by thousands. Barely studied.",
        core: true,
      },
      {
        slug: "meditation",
        name: "Meditation",
        grade: "Moderate",
        note: "Helps anxiety and low mood. No better than exercise.",
      },
      {
        slug: "interoception-and-body-scan",
        name: "Interoception and body scan",
        grade: "Moderate",
        note: "Works inside a fuller practice, not on its own.",
      },
      {
        slug: "expressive-writing",
        name: "Expressive writing",
        grade: "Moderate",
        note: "Small help, and it shows up weeks later.",
      },
      {
        slug: "mental-imagery-and-visualisation",
        name: "Mental imagery and visualisation",
        grade: "Moderate",
        note: "Rehearsing helps. Daydreaming success does not.",
      },
      {
        slug: "values-clarification-and-self-affirmation",
        name: "Values clarification",
        grade: "Moderate",
        note: "Ten minutes of writing helps. Slogans do not.",
      },
      {
        slug: "input-restriction-and-attentional-load",
        name: "Input restriction",
        grade: "Moderate",
        note: "Blocking phone internet halved screen time.",
      },
    ],
  },
  {
    id: "emotion-and-relationship",
    label: "Emotion and relationship",
    cards: [
      {
        slug: "social-connection-and-isolation",
        name: "Social connection and isolation",
        grade: "Strong",
        note: "Strong ties: half again the odds of surviving.",
      },
      {
        slug: "acceptance-and-psychological-flexibility",
        name: "Acceptance and psychological flexibility",
        grade: "Strong",
        note: "Works about as well as standard therapy.",
      },
      {
        slug: "compassion-and-loving-kindness-training",
        name: "Compassion and loving-kindness",
        grade: "Moderate",
        note: "Helps, but fades next to other active approaches.",
      },
      {
        slug: "affective-touch-and-co-regulation",
        name: "Affective touch and co-regulation",
        grade: "Moderate",
        note: "Massage helps. Everyday hugs barely tested.",
      },
      {
        slug: "prosocial-behaviour-and-volunteering",
        name: "Prosocial behaviour and volunteering",
        grade: "Moderate",
        note: "Kindness beat treating yourself, head to head.",
      },
      {
        slug: "forgiveness",
        name: "Forgiveness",
        grade: "Moderate",
        note: "Weeks of work helps. One-off workshops do not.",
      },
      {
        slug: "religious-and-devotional-practice",
        name: "Religious and devotional practice",
        grade: "Moderate",
        note: "Turning up matters more than praying alone.",
      },
    ],
  },
  {
    id: "body-and-lifestyle",
    label: "Body and lifestyle",
    cards: [
      {
        slug: "movement-mobility-and-exercise-timing",
        name: "Movement, mobility and exercise timing",
        grade: "Strong",
        note: "Walking beat other treatments for depression.",
      },
      {
        slug: "circadian-light-exposure-and-entrainment",
        name: "Circadian light exposure",
        grade: "Strong",
        note: "Morning light: far more people recovered.",
      },
      {
        slug: "sleep-behaviour",
        name: "Sleep behaviour",
        grade: "Strong",
        note: "The usual sleep-hygiene list does not fix insomnia. This does.",
      },
      {
        slug: "diet-composition",
        name: "Diet composition",
        grade: "Strong",
        note: "Strong for the heart. Modest for mood.",
      },
      {
        slug: "progressive-muscle-relaxation-and-stillness",
        name: "Progressive muscle relaxation and stillness",
        grade: "Moderate",
        note: "Helps sleep. Can backfire if you force it.",
      },
      {
        slug: "cold-exposure",
        name: "Cold exposure",
        grade: "Moderate",
        note: "Helps sore muscles. Mood claims do not hold.",
      },
      {
        slug: "time-restricted-eating-and-fasting",
        name: "Time-restricted eating and fasting",
        grade: "Moderate",
        note: "No better than ordinary dietary advice.",
      },
      {
        slug: "hydration",
        name: "Hydration",
        grade: "Moderate",
        note: "Most drink-more-water advice is not supported.",
      },
      {
        slug: "botanical-preparations",
        name: "Botanical preparations",
        grade: "Moderate",
        note: "Depends entirely on which plant.",
      },
      {
        slug: "nature-exposure-and-awe",
        name: "Nature exposure and awe",
        grade: "Moderate",
        note: "Two hours a week is the threshold.",
      },
      {
        slug: "air-quality-noise-and-visual-order",
        name: "Air quality, noise and visual order",
        grade: "Moderate",
        note: "Air and noise matter. Tidying up, less so.",
      },
      {
        slug: "sexual-behaviour-and-abstinence",
        name: "Sexual behaviour and abstinence",
        grade: "Moderate",
        note: "Weekly is the ceiling. One famous study was retracted.",
      },
    ],
  },
  {
    id: "material-conditions",
    label: "Material conditions",
    cards: [
      {
        slug: "financial-security-and-scarcity",
        name: "Financial security and scarcity",
        grade: "Strong",
        note: "Among the strongest risks in all of mental health.",
      },
      {
        slug: "skill-mastery-and-self-efficacy",
        name: "Skill mastery and self-efficacy",
        grade: "Strong",
        note: "Doing hard things you can actually finish.",
      },
      {
        slug: "work-and-values-congruence",
        name: "Work and values congruence",
        grade: "Moderate",
        note: "Fit matters. Treating work as a calling invites overwork.",
      },
    ],
  },
  {
    id: "expected-weak",
    label: "Mechanisms expected to be weak or unsupported",
    cards: [
      {
        slug: "grounding-and-earthing",
        name: "Grounding and earthing",
        grade: "Early",
        note: "Twenty years on, still no proper trial.",
      },
      {
        slug: "sound-vibration-acting-on-tissue",
        name: "Sound vibration acting on tissue",
        grade: "Early",
        note: "Singing bowls are a modern Western invention.",
      },
      {
        slug: "pelvic-floor-contraction-as-an-inner-practice",
        name: "Pelvic floor as an inner practice",
        grade: "Nothing found",
        note: "Nothing found. Can make pain worse.",
      },
      {
        slug: "hand-positions",
        name: "Hand positions",
        grade: "Nothing found",
        note: "Nothing found for where you put your fingers.",
      },
      {
        slug: "energetic-properties-of-objects-and-spaces",
        name: "Energetic properties of objects and spaces",
        grade: "Nothing found",
        note: "Crystal and glass felt identical in blind tests.",
      },
    ],
  },
];

export const EVIDENCE_INDEX_CARD_COUNT = EVIDENCE_INDEX_CARD_GROUPS.reduce(
  (n, g) => n + g.cards.length,
  0,
);

export const GRADE_DOT: Record<IndexGradeChip, { kind: "fill" | "ring"; color: string }> = {
  Strong: { kind: "fill", color: "#7ec8e3" },
  Moderate: { kind: "fill", color: "#4a7ea3" },
  Early: { kind: "fill", color: "#33506b" },
  "Nothing found": { kind: "ring", color: "#ffffff40" },
};
