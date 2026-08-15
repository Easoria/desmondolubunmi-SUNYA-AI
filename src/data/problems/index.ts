import type { Problem } from "@/data/problems/types";

/** Problem pages ship one at a time; insomnia is the pilot. */
export const problems: Problem[] = [];

export function getProblemBySlug(slug: string): Problem | undefined {
  return problems.find((problem) => problem.slug === slug);
}
