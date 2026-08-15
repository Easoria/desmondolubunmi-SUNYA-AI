import { insomniaProblem } from "@/data/problems/insomnia";
import type { Problem } from "@/data/problems/types";

/** Problem pages ship one at a time; insomnia is the pilot. */
export const problems: Problem[] = [insomniaProblem];

export function getProblemBySlug(slug: string): Problem | undefined {
  return problems.find((problem) => problem.slug === slug);
}

export function getAllProblems(): Problem[] {
  return problems;
}
