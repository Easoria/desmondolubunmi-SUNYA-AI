import type { FamilyCode } from "@/data/levers/types";

/** Levers that may carry "what it's for" tags. External pillars are never tagged. */
export const TAGGABLE_LEVER_SLUGS = new Set([
  "conservation",
  "breath",
  "movement",
  "mind",
  "sound",
  "heart",
  "awareness",
]);

/** Plain-language "what it's for" labels — never render FamilyCode or family names. */
export type FamilyProblemMeta = {
  /** URL slug under /problems/[slug] */
  slug: string;
  /** Phrase used in simple intro / meta helpers */
  phrase: string;
  /** Strip label, e.g. "For anxiety and worry" */
  label: string;
  /** Page title */
  title: string;
  /** Underlying category for colour only — never shown as text. */
  state: "over" | "under" | "mixed" | "physical";
};

export const FAMILY_PROBLEM_META: Record<FamilyCode, FamilyProblemMeta> = {
  H1: {
    slug: "anxiety-and-worry",
    phrase: "anxiety and worry",
    label: "For anxiety and worry",
    title: "Anxiety and worry",
    state: "over",
  },
  H2: {
    slug: "overwhelm",
    phrase: "overwhelm",
    label: "For overwhelm",
    title: "Overwhelm",
    state: "over",
  },
  H3: {
    slug: "anger-and-frustration",
    phrase: "anger and frustration",
    label: "For anger and frustration",
    title: "Anger and frustration",
    state: "over",
  },
  H4: {
    slug: "a-mind-that-wont-switch-off",
    phrase: "a mind that won't switch off",
    label: "For a mind that won't switch off",
    title: "A mind that won't switch off",
    state: "over",
  },
  L1: {
    slug: "exhaustion",
    phrase: "exhaustion",
    label: "For exhaustion",
    title: "Exhaustion",
    state: "under",
  },
  L2: {
    slug: "emotional-numbness",
    phrase: "emotional numbness",
    label: "For emotional numbness",
    title: "Emotional numbness",
    state: "under",
  },
  L3: {
    slug: "procrastination-and-avoidance",
    phrase: "procrastination and avoidance",
    label: "For procrastination and avoidance",
    title: "Procrastination and avoidance",
    state: "under",
  },
  L4: {
    slug: "low-mood-and-heaviness",
    phrase: "low mood and heaviness",
    label: "For low mood and heaviness",
    title: "Low mood and heaviness",
    state: "under",
  },
  M1: {
    slug: "feeling-torn",
    phrase: "feeling torn",
    label: "For feeling torn",
    title: "Feeling torn",
    state: "mixed",
  },
  M2: {
    slug: "self-criticism-and-shame",
    phrase: "self-criticism and shame",
    label: "For self-criticism and shame",
    title: "Self-criticism and shame",
    state: "mixed",
  },
  M3: {
    slug: "a-scattered-mind",
    phrase: "a scattered mind",
    label: "For a scattered mind",
    title: "A scattered mind",
    state: "mixed",
  },
  M4: {
    slug: "burnout-cycles",
    phrase: "burnout cycles",
    label: "For burnout cycles",
    title: "Burnout cycles",
    state: "mixed",
  },
  P1: {
    slug: "physical-tension",
    phrase: "physical tension",
    label: "For physical tension",
    title: "Physical tension",
    state: "physical",
  },
  P2: {
    slug: "stiffness-and-immobility",
    phrase: "stiffness and immobility",
    label: "For stiffness and immobility",
    title: "Stiffness and immobility",
    state: "physical",
  },
  P3: {
    slug: "low-physical-energy",
    phrase: "low physical energy",
    label: "For low physical energy",
    title: "Low physical energy",
    state: "physical",
  },
};

/** Muted border/dot colours by underlying category — never labelled in UI. */
export const FAMILY_STATE_COLOUR: Record<FamilyProblemMeta["state"], string> = {
  over: "#c4a574", // warm gold-amber, muted
  under: "#5b7fa8", // cool deep blue
  mixed: "#8b8cc7", // soft violet-blue
  physical: "#5a9e8f", // soft green-teal
};

const CODE_BY_SLUG = Object.fromEntries(
  (Object.entries(FAMILY_PROBLEM_META) as [FamilyCode, FamilyProblemMeta][]).map(
    ([code, meta]) => [meta.slug, code],
  ),
) as Record<string, FamilyCode>;

export function getFamilyCodeByProblemSlug(slug: string): FamilyCode | undefined {
  return CODE_BY_SLUG[slug];
}

export function getFamilyProblemMeta(code: FamilyCode): FamilyProblemMeta {
  return FAMILY_PROBLEM_META[code];
}

export function getAllTagProblemSlugs(): string[] {
  return Object.values(FAMILY_PROBLEM_META).map((meta) => meta.slug);
}

/**
 * Up to three plain-language tags for the practice strip.
 * Array order is treated as strength order (strongest first).
 * Untagged practices return [].
 * Returned objects never include FamilyCode.
 */
export function getWhatItsForTags(families: FamilyCode[] | undefined) {
  if (!families?.length) return [];
  return families.slice(0, 3).map((code) => {
    const meta = FAMILY_PROBLEM_META[code];
    return {
      slug: meta.slug,
      phrase: meta.phrase,
      label: meta.label,
      state: meta.state,
    };
  });
}

/** Strip private diagnostic fields before any HTML/client serialization. */
export function toPublicPractice<T extends { families?: FamilyCode[]; directions?: unknown; problems?: unknown }>(
  practice: T,
): Omit<T, "families" | "directions" | "problems"> {
  const { families: _f, directions: _d, problems: _p, ...rest } = practice;
  return rest;
}

/** Sanitize a lever (and nested practices) before loader serialization. */
export function toPublicLever<
  T extends {
    practices?: Array<{ families?: FamilyCode[]; directions?: unknown; problems?: unknown }>;
    groups?: Array<{
      practices: Array<{ families?: FamilyCode[]; directions?: unknown; problems?: unknown }>;
    }>;
  },
>(lever: T): T {
  return {
    ...lever,
    practices: lever.practices?.map(toPublicPractice),
    groups: lever.groups?.map((group) => ({
      ...group,
      practices: group.practices.map(toPublicPractice),
    })),
  };
}

export function simpleProblemIntro(phrase: string) {
  return `Practices for ${phrase}. Each one works on the same underlying pattern in a different way — start with whichever is most available to you right now.`;
}

/** Meta description from opening copy: truncate at a sentence boundary under 155 chars. */
export function metaDescriptionFromOpening(opening: string): string {
  const max = 155;
  if (opening.length <= max) return opening;
  const slice = opening.slice(0, max + 1);
  const lastStop = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("? "), slice.lastIndexOf("! "));
  if (lastStop > 40) return opening.slice(0, lastStop + 1).trim();
  const lastSpace = opening.lastIndexOf(" ", max);
  return `${opening.slice(0, lastSpace > 40 ? lastSpace : max).trim()}…`;
}
