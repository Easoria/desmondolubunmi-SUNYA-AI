/**
 * Old practice path → new practice path (301).
 * Keys and values are `leverSlug/practiceSlug`.
 */
export const PRACTICE_SLUG_REDIRECTS: Record<string, string> = {
  "sleep/conscious-consumption": "sleep/caffeine-alcohol-and-timing",
  "nutrition/conscious-consumption": "nutrition/how-you-eat",
};

export function getPracticeSlugRedirect(
  leverSlug: string,
  practiceSlug: string,
): { leverSlug: string; practiceSlug: string } | null {
  const target = PRACTICE_SLUG_REDIRECTS[`${leverSlug}/${practiceSlug}`];
  if (!target) return null;
  const [toLever, toPractice] = target.split("/");
  if (!toLever || !toPractice) return null;
  return { leverSlug: toLever, practiceSlug: toPractice };
}
