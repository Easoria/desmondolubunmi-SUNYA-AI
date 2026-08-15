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

/**
 * Diagnostic family codes for the Problems layer.
 * PRIVATE — must never appear in rendered HTML, copy, meta, alt, URLs, or schema.
 */
export type FamilyCode =
  | "H1"
  | "H2"
  | "H3"
  | "H4"
  | "L1"
  | "L2"
  | "L3"
  | "L4"
  | "M1"
  | "M2"
  | "M3"
  | "M4";

/** Intervention directions — PRIVATE; used only for filtering/sequencing. */
export type Direction =
  | "calm"
  | "ground"
  | "contain"
  | "slow"
  | "simplify"
  | "reduce"
  | "discharge"
  | "release"
  | "soften"
  | "restore"
  | "reconnect"
  | "energise"
  | "initiate"
  | "uplift"
  | "clarify"
  | "structure"
  | "stabilise";

export type Practice = {
  sourceNumber?: number;
  slug: string;
  name: string;
  sanskritName?: string;
  subtitle?: string;
  notes?: string[];
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
  /** PRIVATE diagnostic families — never render these codes. */
  families?: FamilyCode[];
  /** PRIVATE intervention directions — never render. */
  directions?: Direction[];
  /** Problem-page slugs this practice may serve (e.g. "insomnia"). */
  problems?: string[];
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
  summaryLine?: string;
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
