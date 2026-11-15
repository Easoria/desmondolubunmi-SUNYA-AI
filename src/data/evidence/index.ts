import baseMarkdown from "./base.content";
import slowAndPacedBreathing from "./slow-and-paced-breathing.content";
import activatingBreathwork from "./activating-breathwork.content";
import sustainedVocalisation from "./sustained-vocalisation.content";
import meditation from "./meditation.content";
import decentering from "./decentering.content";
import interoceptionAndBodyScan from "./interoception-and-body-scan.content";
import expressiveWriting from "./expressive-writing.content";
import musicAndDeliberatelyChosenSound from "./music-and-deliberately-chosen-sound.content";

export type MechanismStatus = "complete" | "planned";

export type EvidenceGroupId =
  | "breath-and-voice"
  | "attention-and-cognition"
  | "emotion-and-relationship"
  | "body-and-lifestyle"
  | "material-conditions"
  | "expected-weak";

export type EvidenceMechanism = {
  slug: string;
  title: string;
  /** Short subtitle shown on cards / index lines. */
  blurb?: string;
  group: EvidenceGroupId;
  status: MechanismStatus;
  reviewDate?: string;
  researchGrade?: string;
  traditionalGrade?: string;
  description: string;
  markdown?: string;
};

export const EVIDENCE_GROUPS: Array<{ id: EvidenceGroupId; label: string }> = [
  { id: "breath-and-voice", label: "Breath and voice" },
  { id: "attention-and-cognition", label: "Attention and cognition" },
  { id: "emotion-and-relationship", label: "Emotion and relationship" },
  { id: "body-and-lifestyle", label: "Body and lifestyle" },
  { id: "material-conditions", label: "Material conditions" },
  { id: "expected-weak", label: "Expected to be weak or unsupported" },
];

/** Parent-page prose — everything above the mechanism index. */
export const EVIDENCE_BASE_INTRO_MARKDOWN = stripLeadingTitle(
  stripFromHeading(baseMarkdown, "## The mechanisms"),
)
  // Drop internal editorial note + decorative rule from the source doc.
  .replace(/^\*Parent document\.[^*\n]*\*\n+/, "")
  .replace(/^---\n+/, "")
  .trimStart();

export const EVIDENCE_MECHANISMS: EvidenceMechanism[] = [
  {
    slug: "slow-and-paced-breathing",
    title: "Slow and paced breathing",
    blurb:
      "Merges the earlier separate entries for extended exhale and resonance-frequency breathing — the literature pools them.",
    group: "breath-and-voice",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade: "Strong for blood pressure and physiology, Moderate for mood",
    traditionalGrade: "Very strong",
    description:
      "Slowing the breath to around six a minute — blood pressure, nervous-system shift, and small-to-moderate mood effects.",
    markdown: withNormalizedGrades(slowAndPacedBreathing),
  },
  {
    slug: "activating-breathwork",
    title: "Activating breathwork — rapid breathing and breath holding",
    group: "breath-and-voice",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Strong for acute activation and for the inflammatory response, Moderate for mood and anxiety with regular practice",
    traditionalGrade: "Strong",
    description:
      "Rapid breathing and breath holding — acute activation, inflammatory response, and the longest safety section in the library.",
    markdown: withNormalizedGrades(activatingBreathwork),
  },
  {
    slug: "sustained-vocalisation",
    title: "Sustained vocalisation — chanting and humming",
    group: "breath-and-voice",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for chanting and mantra on mental health, None found for the nitric-oxide explanation of humming",
    traditionalGrade: "Very strong",
    description:
      "Sustained sound with the voice — anxiety, stress, low mood, PTSD symptoms, and a route into slow breathing.",
    markdown: withNormalizedGrades(sustainedVocalisation),
  },
  {
    slug: "music-and-deliberately-chosen-sound",
    title: "Music and deliberately chosen sound",
    blurb: "Added: Conscious Listening was not covered by any existing entry.",
    group: "breath-and-voice",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for acute stress, surgical pain and subjective sleep quality, Preliminary for everyday stress recovery in healthy adults and for binaural beats or specific tuning frequencies",
    traditionalGrade: "Very strong",
    description:
      "Chosen music and natural sound — acute stress and surgical pain, subjective sleep, and where laboratory recovery and entrainment claims fall short.",
    markdown: withNormalizedGrades(musicAndDeliberatelyChosenSound),
  },
  {
    slug: "meditation",
    title: "Meditation — focused attention and open monitoring",
    blurb: "Merged: the trial literature teaches and tests both together.",
    group: "attention-and-cognition",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for anxiety, depression and pain; Moderate to large in healthy people against no treatment; Preliminary for attention at ordinary doses",
    traditionalGrade: "Very strong",
    description:
      "Training attention in focused and open modes — anxiety, depression, pain, and the dose finding on attention.",
    markdown: withNormalizedGrades(meditation),
  },
  {
    slug: "decentering",
    title: "Decentering — seeing thoughts as thoughts",
    group: "attention-and-cognition",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade: "Strong for what it does, Moderate for why it works",
    traditionalGrade: "Very strong",
    description:
      "The shift from being inside a thought to observing it — relapse prevention, rumination buffering, and trainability.",
    markdown: withNormalizedGrades(decentering),
  },
  {
    slug: "interoception-and-body-scan",
    title: "Interoception and body scan",
    group: "attention-and-cognition",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for self-reported body awareness and emotional self-regulation within broader mindfulness programmes, Preliminary for standalone body scan on health outcomes and for objective signal accuracy",
    traditionalGrade: "Very strong",
    description:
      "Scanning attention through the body — how you relate to sensation, stress markers, and the limits of standalone body scan.",
    markdown: withNormalizedGrades(interoceptionAndBodyScan),
  },
  {
    slug: "expressive-writing",
    title: "Expressive writing",
    group: "attention-and-cognition",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for small reductions in everyday distress and reported symptoms, Preliminary for clinical depression, trauma and physical disease markers",
    traditionalGrade: "Weak",
    description:
      "Private writing about an unresolved experience — small delayed gains in distress, and where the protocol fails.",
    markdown: withNormalizedGrades(expressiveWriting),
  },
  {
    slug: "mental-imagery-and-visualisation",
    title: "Mental imagery and visualisation",
    group: "attention-and-cognition",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "values-clarification-and-self-affirmation",
    title: "Values clarification and self-affirmation",
    group: "attention-and-cognition",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "input-restriction-and-attentional-load",
    title: "Input restriction and attentional load",
    group: "attention-and-cognition",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "rumination-and-mind-wandering",
    title: "Rumination and mind-wandering",
    group: "attention-and-cognition",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "compassion-and-loving-kindness-training",
    title: "Compassion and loving-kindness training",
    group: "emotion-and-relationship",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "acceptance-and-psychological-flexibility",
    title: "Acceptance and psychological flexibility",
    group: "emotion-and-relationship",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "social-connection-and-isolation",
    title: "Social connection and isolation",
    group: "emotion-and-relationship",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "affective-touch-and-co-regulation",
    title: "Affective touch and co-regulation",
    group: "emotion-and-relationship",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "prosocial-behaviour-and-volunteering",
    title: "Prosocial behaviour and volunteering",
    group: "emotion-and-relationship",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "forgiveness",
    title: "Forgiveness",
    group: "emotion-and-relationship",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "religious-and-devotional-practice",
    title: "Religious and devotional practice",
    group: "emotion-and-relationship",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "circadian-light-exposure-and-entrainment",
    title: "Circadian light exposure and entrainment",
    group: "body-and-lifestyle",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "sleep-behaviour",
    title: "Sleep behaviour — stimulus control, wind-down, environment",
    group: "body-and-lifestyle",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "movement-mobility-and-exercise-timing",
    title: "Movement, mobility and exercise timing",
    group: "body-and-lifestyle",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "progressive-muscle-relaxation-and-stillness",
    title: "Progressive muscle relaxation and stillness",
    group: "body-and-lifestyle",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "cold-exposure",
    title: "Cold exposure",
    group: "body-and-lifestyle",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "time-restricted-eating-and-fasting",
    title: "Time-restricted eating and fasting",
    group: "body-and-lifestyle",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "diet-composition",
    title: "Diet composition",
    group: "body-and-lifestyle",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "hydration",
    title: "Hydration",
    group: "body-and-lifestyle",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "botanical-preparations",
    title: "Botanical preparations",
    group: "body-and-lifestyle",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "nature-exposure-and-awe",
    title: "Nature exposure and awe",
    group: "body-and-lifestyle",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "air-quality-noise-and-visual-order",
    title: "Air quality, noise and visual order",
    group: "body-and-lifestyle",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "sexual-behaviour-and-abstinence",
    title: "Sexual behaviour and abstinence",
    group: "body-and-lifestyle",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "financial-security-and-scarcity",
    title: "Financial security and scarcity",
    group: "material-conditions",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "skill-mastery-and-self-efficacy",
    title: "Skill mastery and self-efficacy",
    group: "material-conditions",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "work-and-values-congruence",
    title: "Work and values congruence",
    group: "material-conditions",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "grounding-and-earthing",
    title: "Grounding and earthing",
    group: "expected-weak",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "pelvic-floor-contraction-as-an-inner-practice",
    title: "Pelvic floor contraction as an inner practice",
    group: "expected-weak",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "hand-positions",
    title: "Hand positions",
    group: "expected-weak",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "sound-vibration-acting-on-tissue",
    title: "Sound vibration acting on tissue",
    group: "expected-weak",
    status: "planned",
    description: "Not yet researched.",
  },
  {
    slug: "energetic-properties-of-objects-and-spaces",
    title: "Energetic properties of objects and spaces",
    group: "expected-weak",
    status: "planned",
    description: "Not yet researched.",
  },
];

export function getEvidenceMechanism(slug: string) {
  return EVIDENCE_MECHANISMS.find((m) => m.slug === slug) ?? null;
}

export function getCompleteEvidenceMechanisms() {
  return EVIDENCE_MECHANISMS.filter((m) => m.status === "complete" && m.markdown);
}

export function getMechanismsByGroup(group: EvidenceGroupId) {
  return EVIDENCE_MECHANISMS.filter((m) => m.group === group);
}

/** Drop the leading H1 so the page chrome owns the title. */
export function stripLeadingTitle(markdown: string) {
  return markdown.replace(/^#\s+[^\n]+\n+/, "").trimStart();
}

/**
 * Research strength and Traditional convergence must render as two distinct
 * paragraphs, each ending with a full stop. Enforce this for every mechanism
 * page — including future ones that forget the blank line or trailing period.
 */
export function normalizeGradeLines(markdown: string) {
  return markdown.replace(
    /(\*\*Research strength[^\n]*?)(?:\.)?\n+(?:\n*)(\*\*Traditional convergence[^\n]*?)(?:\.)?(?=\n)/g,
    (_match, research: string, traditional: string) => {
      return `${research.trimEnd()}.\n\n${traditional.trimEnd()}.`;
    },
  );
}

function withNormalizedGrades(markdown: string) {
  return normalizeGradeLines(markdown);
}

function stripFromHeading(markdown: string, heading: string) {
  const idx = markdown.indexOf(heading);
  if (idx === -1) return markdown.trim();
  return markdown.slice(0, idx).trim();
}
