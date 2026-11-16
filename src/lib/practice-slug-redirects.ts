/**
 * Old practice path → new practice path (301).
 * Keys and values are `leverSlug/practiceSlug`.
 */
export const PRACTICE_SLUG_REDIRECTS: Record<string, string> = {
  "sleep/conscious-consumption": "sleep/caffeine-alcohol-and-timing",
  "nutrition/conscious-consumption": "nutrition/how-you-eat",
  // SPEC 45 — cut-vocabulary slugs → title-matched slugs
  "awareness/energy-body-awareness": "awareness/reading-your-vital-state",
  "awareness/holistic-subtle-bodies-awareness": "awareness/whole-system-awareness",
  "heart/holding-love-as-vibration": "heart/holding-love-steady",
  "nutrition/the-pranic-spectrum": "nutrition/how-food-affects-you",
  "nutrition/high-frequency-hydration": "nutrition/water",
  "nutrition/herbal-alchemy": "nutrition/herbs",
  "nutrition/the-alchemy-of-the-void": "nutrition/fasting",
  "nutrition/energetic-imprinting": "nutrition/cooking-and-eating-with-attention",
  "environment/vibrational-signatures": "environment/the-objects-around-you",
  "environment/spatial-alchemy": "environment/clearing-your-space",
  "connection/the-resonance-principle": "connection/knowing-yourself",
  "connection/the-alchemy-of-authenticity": "connection/honesty",
  "connection/haptic-alchemy": "connection/touch",
  "sustenance/the-master-code-of-abundance": "sustenance/how-you-think-about-money",
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
