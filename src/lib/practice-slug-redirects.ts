/**
 * Old practice path → new practice path (301).
 * Keys and values are `leverSlug/practiceSlug`.
 */
export const PRACTICE_SLUG_REDIRECTS: Record<string, string> = {
  "awareness/energy-body-awareness": "awareness/reading-your-vital-state",
  "awareness/holistic-subtle-bodies-awareness": "awareness/whole-system-awareness",
  "awareness/the-shunya": "awareness/being-nothing",
  "awareness/ultimate-self-inquiry": "awareness/looking-at-death",
  "breath/the-deepest-practice": "breath/deeper-practices",
  "connection/haptic-alchemy": "connection/touch",
  "connection/internal-saturation": "connection/arriving-full",
  "connection/karma-yoga": "connection/service",
  "connection/somatic-communion": "connection/being-with-someone",
  "connection/the-alchemy-of-authenticity": "connection/honesty",
  "connection/the-alchemy-of-forgiveness": "connection/forgiveness",
  "connection/the-ecosystem-of-belonging": "connection/community",
  "connection/the-resonance-principle": "connection/knowing-yourself",
  "environment/atmospheric-purity": "environment/air-light-and-sound",
  "environment/consecrated-spaces": "environment/places-of-stillness",
  "environment/cultural-resonance": "environment/where-you-live",
  "environment/navigating-shared-frequencies": "environment/living-among-others",
  "environment/somatic-architecture": "environment/what-you-wear",
  "environment/spatial-alchemy": "environment/clearing-your-space",
  "environment/vibrational-signatures": "environment/the-objects-around-you",
  "heart/holding-love-as-vibration": "heart/holding-love-steady",
  "heart/non-dual-devotion": "heart/loving-life-itself",
  "mind/conscious-creation": "mind/visualisation-and-action",
  "movement/the-consciousness-seal": "movement/thumb-to-index-seal",
  "movement/the-dance-of-dissolution": "movement/free-movement",
  "movement/the-primal-seal": "movement/closed-hand-seal",
  "movement/the-prostration-sujud-balasana": "movement/prostration",
  "movement/the-somatic-primer": "movement/full-mobility-sequence",
  "nature/places-of-natural-transformational-power": "nature/wild-places",
  "nutrition/chrononutrition": "nutrition/when-you-eat",
  "nutrition/conscious-consumption": "nutrition/how-you-eat",
  "nutrition/energetic-imprinting": "nutrition/cooking-and-eating-with-attention",
  "nutrition/herbal-alchemy": "nutrition/herbs",
  "nutrition/high-frequency-hydration": "nutrition/water",
  "nutrition/the-alchemy-of-the-void": "nutrition/fasting",
  "nutrition/the-pranic-spectrum": "nutrition/how-food-affects-you",
  "sleep/biological-adaptability": "sleep/when-life-gets-irregular",
  "sleep/cognitive-de-escalation": "sleep/taking-the-pressure-off",
  "sleep/conscious-consumption": "sleep/caffeine-alcohol-and-timing",
  "sleep/data-and-intuition": "sleep/tracking-your-sleep",
  "sleep/environmental-architecture": "sleep/light-and-sound-at-night",
  "sleep/relational-ecology": "sleep/sharing-a-bed",
  "sleep/somatic-alignment": "sleep/sleep-position",
  "sleep/somatic-regulation": "sleep/settling-the-body",
  "sleep/strategic-somatic-movement": "sleep/moving-at-the-right-times",
  "sleep/the-circadian-architecture": "sleep/your-body-clock",
  "sleep/the-morning-ignition": "sleep/the-first-hour",
  "sleep/the-sleep-sanctuary": "sleep/the-bedroom",
  "sleep/the-somatic-runway": "sleep/the-wind-down-hour",
  "sleep/the-threshold-of-awakening": "sleep/the-edge-of-sleep",
  "sound/aum-chanting": "sound/chanting",
  "sustenance/decoding-money-and-value": "sustenance/what-money-is",
  "sustenance/mastery-of-the-instrument": "sustenance/building-skill",
  "sustenance/the-economics-of-simplicity": "sustenance/spending-less",
  "sustenance/the-ecosystem-trust": "sustenance/easing-money-fear",
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
