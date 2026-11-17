import { PROBLEM_PAGES, PROBLEM_PAGE_BY_SLUG, type ProblemPage } from "@/data/problems/pages";

export type { ProblemPage };
export type {
  ProblemGroupId,
  ProblemGroupMeta,
  ProblemStartHereEntry,
  ProblemMechanismLink,
} from "@/data/problems/types";
export { PROBLEM_GROUPS } from "@/data/problems/types";
export { PROBLEM_PAGES, PROBLEM_PAGE_BY_SLUG } from "@/data/problems/pages";
export { PROBLEM_SLUG_REDIRECTS, PROBLEM_PRACTICE_LEVER_ORDER } from "@/data/problems/pages";
export { PROBLEM_START_HERE } from "@/data/problems/start-here";

export function getProblemPageBySlug(slug: string): ProblemPage | undefined {
  return PROBLEM_PAGE_BY_SLUG[slug];
}

export function getAllProblemPages(): ProblemPage[] {
  return PROBLEM_PAGES;
}
