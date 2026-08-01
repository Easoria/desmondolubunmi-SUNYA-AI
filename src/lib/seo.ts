import type { Lever, Practice } from "@/data/levers/types";

export const CANONICAL_ORIGIN = "https://www.desmondolubunmi.com";

const FALLBACK_OG_IMAGE_BY_KIND = {
  core: "/og/core.svg",
  lever: "/og/lever.svg",
  practice: "/og/practice.svg",
  blog: "/og/practice.svg",
} as const;

const SUNYA_TITLE_SUFFIX = /\s*\|\s*Sunya\s*$/i;

const LEVER_INTENT_OVERRIDES: Record<string, string> = {
  conservation: "energy conservation and vitality",
  breath: "nervous system regulation",
  movement: "releasing stored contraction",
  mind: "clarity, focus, and discernment",
  sound: "nervous system harmonisation",
  heart: "emotional healing and coherence",
  awareness: "presence beyond identification",
  sleep: "deep restoration and repair",
  nutrition: "high-vitality nourishment",
  connection: "co-regulation and connection",
  environment: "inner stability through environment",
  nature: "human-nature synchrony",
  sustenance: "aligned work and abundance",
};

type SeoImageKind = keyof typeof FALLBACK_OG_IMAGE_BY_KIND;

export type SeoHeadInput = {
  title: string;
  description: string;
  path: string;
  ogType: "website" | "article";
  imageKind?: SeoImageKind;
  imageUrl?: string;
  extraMeta?: Array<Record<string, string>>;
};

function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function canonicalUrl(path: string) {
  return `${CANONICAL_ORIGIN}${normalizePath(path)}`;
}

export function stripSunyaSuffix(title: string) {
  return title.replace(SUNYA_TITLE_SUFFIX, "").trim();
}

export function buildSeoHead({
  title,
  description,
  path,
  ogType,
  imageKind = "core",
  imageUrl,
  extraMeta = [],
}: SeoHeadInput) {
  const canonical = canonicalUrl(path);
  const socialTitle = stripSunyaSuffix(title);
  const fallbackImage = canonicalUrl(FALLBACK_OG_IMAGE_BY_KIND[imageKind]);
  const ogImage = imageUrl ?? fallbackImage;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: socialTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:type", content: ogType },
      { property: "og:site_name", content: "Sunya" },
      { property: "og:locale", content: "en_IE" },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: socialTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      ...extraMeta,
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

function firstSentence(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
  const match = normalized.match(/.+?[.!?](?:["”')\]]+)?(?=\s|$)/);
  return (match ? match[0] : normalized).trim();
}

export function buildPracticeMetaDescription(practice: Practice) {
  const essence = (practice.essence ?? "").replace(/\s+/g, " ").trim();
  if (!essence) return practice.metaDescription;
  if (essence.length >= 100 || !practice.mechanism?.length) return essence;

  const mechanismSentence = firstSentence(practice.mechanism[0] ?? "");
  if (!mechanismSentence) return essence;

  const essenceLead = `${essence.replace(/[.!?]\s*$/, "")}.`;
  const available = 155 - (essenceLead.length + 1);
  if (available <= 20) return essence;

  if (mechanismSentence.length <= available) {
    return `${essenceLead} ${mechanismSentence}`.trim();
  }

  return essence;
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function truncateByWords(text: string, maxWords: number) {
  const words = text.split(/\s+/).filter(Boolean);
  return words.slice(0, maxWords).join(" ");
}

export function buildLeverIntentPhrase(lever: Lever) {
  const override = LEVER_INTENT_OVERRIDES[lever.slug];
  if (override) return override;

  const source = (lever.summaryLine ?? lever.intro[0] ?? "").replace(/\s+/g, " ").trim();
  let sentence = firstSentence(source)
    .replace(/[“”"]/g, "")
    .replace(/^By\s+[^:]+:\s*/i, "")
    .replace(new RegExp(`^${escapeRegex(lever.name)}\\s+is\\s+`, "i"), "")
    .replace(/^The\s+/, "")
    .trim();

  if (!sentence) return "human wellbeing";
  sentence = sentence.replace(/[.,;:]+$/, "");
  return truncateByWords(sentence, 7);
}

export function buildLeverMetaTitle(lever: Lever, practiceCount: number) {
  return `${lever.name} Practices — ${practiceCount} Techniques for ${buildLeverIntentPhrase(lever)} | Sunya`;
}

export function buildPracticeMetaTitle(
  practice: Practice,
  options?: { includeLeverName?: boolean; leverName?: string },
) {
  const primaryName = practice.sanskritName
    ? `${practice.name} (${practice.sanskritName})`
    : practice.name;
  const scopedName =
    options?.includeLeverName && options.leverName
      ? `${primaryName} (${options.leverName})`
      : primaryName;
  return `${scopedName} — How to Practise It | Sunya`;
}

type BreadcrumbItem = {
  name: string;
  path?: string;
};

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: canonicalUrl(item.path) } : {}),
    })),
  };
}

export function buildArticleSchema({
  headline,
  description,
  sectionName,
  datePublished,
  articleSection,
}: {
  headline: string;
  description: string;
  sectionName?: string;
  datePublished?: string | null;
  articleSection?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: {
      "@type": "Person",
      name: "Desmond Olubunmi",
      url: canonicalUrl("/about"),
    },
    publisher: {
      "@type": "Organization",
      name: "Sunya",
      url: CANONICAL_ORIGIN,
    },
    ...(datePublished ? { datePublished } : {}),
    ...(articleSection ? { articleSection } : {}),
    ...(sectionName
      ? {
          isPartOf: {
            "@type": "CreativeWork",
            name: sectionName,
          },
        }
      : {}),
  };
}

export function parseDurationToIso(duration?: string) {
  if (!duration) return undefined;
  const normalized = duration.trim().toLowerCase();
  if (/[-–]/.test(normalized)) return undefined;
  const match = normalized.match(/^(\d+)\s*(minute|minutes|min|hour|hours|hr|hrs)$/i);
  if (!match) return undefined;
  const value = Number(match[1]);
  const unit = match[2];
  if (!Number.isFinite(value) || value <= 0) return undefined;
  if (unit.startsWith("hour") || unit.startsWith("hr")) return `PT${value}H`;
  return `PT${value}M`;
}

export const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Desmond Olubunmi",
  jobTitle: "Spiritual teacher and founder",
  description:
    "Founder of Sunya, a universal system for inner transformation. Author of The Sleep Rhythm Reset, an Amazon #1 bestseller in its category.",
  url: canonicalUrl("/about"),
  sameAs: [
    "https://amzn.eu/d/0bzw0W4k",
    "https://apps.apple.com/ie/app/sunya-sleep/id6764553926",
  ],
};

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sunya",
  url: CANONICAL_ORIGIN,
};
