/**
 * Permanently removed practice URLs (SPEC 40+).
 * Keep serving 410 Gone — do not 301 to the lever index.
 */
export const RETIRED_PRACTICE_PATHS = new Set([
  "sound/om-sat-chit-ananda",
  "sound/om-namah-shivaya",
  "sound/the-gayatri-mantra",
]);

export function isRetiredPractice(leverSlug: string, practiceSlug: string): boolean {
  return RETIRED_PRACTICE_PATHS.has(`${leverSlug}/${practiceSlug}`);
}
