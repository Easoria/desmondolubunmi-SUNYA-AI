export type ZoneSlug =
  | "survival-crisis"
  | "nervous-system-collapse"
  | "emotional-accumulation"
  | "mental-fragmentation"
  | "the-hollow-seeker";

export type LayerOfBeing =
  | "Source"
  | "Energetic Body"
  | "Emotional Body"
  | "Intellectual Body"
  | "Mental Body"
  | "Physical Body"
  | "Environment";

export type RelatedPracticeLink = {
  slug: string;
  reason: string;
};

export type ProtocolStep = {
  text: string;
  emphasis?: string;
};

export type PracticeGeneratedFields = {
  layersSource: "STATED" | "INFERRED";
  durationSource: "STATED" | "OMITTED";
  relatedPracticeRationale: RelatedPracticeLink[];
};

export type Practice = {
  slug: string;
  name: string;
  sanskritName?: string;
  subtitle?: string;
  essence?: string;
  mechanism?: string[];
  protocol?: ProtocolStep[];
  duration?: string;
  layers: LayerOfBeing[];
  leverSlug: string;
  groupSlug?: string;
  relatedPractices: string[];
  metaTitle: string;
  metaDescription: string;
  generated: PracticeGeneratedFields;
};

export type PracticeGroup = {
  slug: string;
  name: string;
  qualifier?: string;
  description?: string[];
  practices: Practice[];
};

export type Lever = {
  slug: string;
  number: number;
  name: string;
  subtitle?: string;
  layerLine: string;
  intro: string[];
  groups?: PracticeGroup[];
  practices?: Practice[];
  relatedZones: ZoneSlug[];
  metaTitle: string;
  metaDescription: string;
  leadEssence?: string;
  leadMechanism?: string;
  leadBridgeLine?: string;
  closing?: string[];
};
