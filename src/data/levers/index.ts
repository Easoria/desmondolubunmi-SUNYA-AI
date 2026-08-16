import { awarenessLever } from "@/data/levers/awareness";
import { breathLever } from "@/data/levers/breath";
import { connectionLever } from "@/data/levers/connection";
import { conservationLever } from "@/data/levers/conservation";
import { environmentLever } from "@/data/levers/environment";
import { heartLever } from "@/data/levers/heart";
import { mindLever } from "@/data/levers/mind";
import { movementLever } from "@/data/levers/movement";
import { natureLever } from "@/data/levers/nature";
import { nutritionLever } from "@/data/levers/nutrition";
import { sleepLever } from "@/data/levers/sleep";
import { soundLever } from "@/data/levers/sound";
import { sustenanceLever } from "@/data/levers/sustenance";
import type { Lever } from "@/data/levers/types";

export const LEVER_ORDER = [
  "conservation",
  "breath",
  "movement",
  "mind",
  "sound",
  "heart",
  "awareness",
  "sleep",
  "nutrition",
  "connection",
  "environment",
  "nature",
  "sustenance",
] as const;

export type LeverSlug = (typeof LEVER_ORDER)[number];

export const BUILT_LEVER_SLUGS = LEVER_ORDER;

export const BUILT_LEVER_SET = new Set<LeverSlug>(BUILT_LEVER_SLUGS);

export const leverLibrary: Record<LeverSlug, Lever> = {
  conservation: conservationLever,
  breath: breathLever,
  movement: movementLever,
  mind: mindLever,
  sound: soundLever,
  heart: heartLever,
  awareness: awarenessLever,
  sleep: sleepLever,
  nutrition: nutritionLever,
  connection: connectionLever,
  environment: environmentLever,
  nature: natureLever,
  sustenance: sustenanceLever,
};

export function getLeversInOrder(): Lever[] {
  return LEVER_ORDER.map((slug) => leverLibrary[slug]);
}

export function getLeverBySlug(slug: string): Lever | null {
  if (!BUILT_LEVER_SET.has(slug as LeverSlug)) return null;
  return leverLibrary[slug as LeverSlug];
}

export function getLeverPracticeCount(lever: Lever): number {
  const groupedCount = (lever.groups ?? []).reduce((total, group) => total + group.practices.length, 0);
  return groupedCount + (lever.practices?.length ?? 0);
}

export function getAllLeverPractices(lever: Lever) {
  if (lever.groups && lever.groups.length > 0) {
    return lever.groups.flatMap((group) => group.practices);
  }
  return lever.practices ?? [];
}

export function getPracticeBySlug(lever: Lever, practiceSlug: string) {
  return getAllLeverPractices(lever).find((practice) => practice.slug === practiceSlug) ?? null;
}

/** Resolve a practice slug across the full library.
 * Slugs are unique per lever, not globally — when the same slug exists
 * under more than one lever, pass preferredLeverSlug to disambiguate.
 * Without a preference, returns the first match in lever order.
 */
export function findPracticeInLibrary(practiceSlug: string, preferredLeverSlug?: string) {
  if (preferredLeverSlug) {
    const preferred = getLeverBySlug(preferredLeverSlug);
    if (preferred) {
      const practice = getPracticeBySlug(preferred, practiceSlug);
      if (practice) return { lever: preferred, practice };
    }
  }
  for (const lever of getLeversInOrder()) {
    const practice = getPracticeBySlug(lever, practiceSlug);
    if (practice) return { lever, practice };
  }
  return null;
}

/** All practices sharing a slug (e.g. Conscious Consumption under Sleep and Nutrition). */
export function findAllPracticesBySlug(practiceSlug: string) {
  const matches: Array<{ lever: Lever; practice: NonNullable<ReturnType<typeof getPracticeBySlug>> }> = [];
  for (const lever of getLeversInOrder()) {
    const practice = getPracticeBySlug(lever, practiceSlug);
    if (practice) matches.push({ lever, practice });
  }
  return matches;
}

export function getPreviousAndNextLevers(slug: LeverSlug) {
  const index = LEVER_ORDER.indexOf(slug);
  const previous = index > 0 ? leverLibrary[LEVER_ORDER[index - 1]] : null;
  const next = index < LEVER_ORDER.length - 1 ? leverLibrary[LEVER_ORDER[index + 1]] : null;
  return { previous, next };
}
