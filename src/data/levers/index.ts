import { breathLever } from "@/data/levers/breath";
import { conservationLever } from "@/data/levers/conservation";
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

export const BUILT_LEVER_SLUGS = ["conservation", "breath"] as const;

export const BUILT_LEVER_SET = new Set<LeverSlug>(BUILT_LEVER_SLUGS);

export const leverLibrary: Record<(typeof BUILT_LEVER_SLUGS)[number], Lever> = {
  conservation: conservationLever,
  breath: breathLever,
};
