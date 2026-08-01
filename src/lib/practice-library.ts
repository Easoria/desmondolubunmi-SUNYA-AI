import type { LeverSlug } from "@/data/levers";

export const LEVER_NAME_TO_SLUG: Record<string, LeverSlug> = {
  Conservation: "conservation",
  Breath: "breath",
  Movement: "movement",
  Mind: "mind",
  Sound: "sound",
  Heart: "heart",
  Awareness: "awareness",
  Sleep: "sleep",
  Nutrition: "nutrition",
  Connection: "connection",
  Environment: "environment",
  Nature: "nature",
  Sustenance: "sustenance",
};

export function leverHubPath(slug: LeverSlug) {
  return `/practices/${slug}` as const;
}
