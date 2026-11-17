import type { Direction, FamilyCode } from "@/data/levers/types";

export type { Direction, FamilyCode };

/** SPEC 48 index groups — display order. */
export type ProblemGroupId =
  | "thinking-and-attention"
  | "mood-and-feeling"
  | "the-body"
  | "conditions-of-life";

export type ProblemGroupMeta = {
  id: ProblemGroupId;
  label: string;
  /** Accent colour for the group rail — never labelled as a state name. */
  colour: string;
};

export const PROBLEM_GROUPS: ProblemGroupMeta[] = [
  {
    id: "thinking-and-attention",
    label: "Thinking and attention",
    colour: "#c4a574",
  },
  {
    id: "mood-and-feeling",
    label: "Mood and feeling",
    colour: "#3d8ec9",
  },
  {
    id: "the-body",
    label: "The body",
    colour: "#5a9e8f",
  },
  {
    id: "conditions-of-life",
    label: "The conditions of your life",
    colour: "#b07aad",
  },
];

export type ProblemMechanismLink = {
  slug: string;
  name: string;
  qualifier?: string;
};

export type ProblemStartHereEntry = {
  leverSlug: string;
  practiceSlug: string;
  name: string;
  /** Why this comes first — ordering, not a re-description of the practice. */
  whyFirst: string;
  mechanisms: ProblemMechanismLink[];
};

export type ProblemVariant = {
  slug: string;
  label: string;
  description: string;
  signs: string[];
  /** PRIVATE — never render family codes. */
  families: FamilyCode[];
  /** Ordered practice slugs — what to do first. */
  practiceSlugs: string[];
  sequenceNote?: string;
};

export type Problem = {
  slug: string;
  title: string;
  headline: string;
  recognition: string[];
  variants: ProblemVariant[];
  metaTitle: string;
  metaDescription: string;
};
