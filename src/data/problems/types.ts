import type { Direction, FamilyCode } from "@/data/levers/types";

export type { Direction, FamilyCode };

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
