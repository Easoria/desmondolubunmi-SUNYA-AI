import type { Lever, Practice } from "@/data/levers/types";

export const CANONICAL_ORIGIN = "https://www.desmondolubunmi.com";

const FALLBACK_OG_IMAGE_BY_KIND = {
  core: "/og/core.jpg",
  lever: "/og/lever.jpg",
  practice: "/og/practice.jpg",
  blog: "/og/practice.jpg",
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

/**
 * Normalize a site path for canonical / og:url use.
 * - Homepage is exactly "/".
 * - All other paths are absolute, with no trailing slash, query, or hash.
 * - Empty / undefined paths must NOT silently become the homepage (that caused
 *   GSC "user-declared canonical = homepage" on non-home URLs).
 */
export function normalizePath(path: string) {
  if (path === "/") return "/";
  if (typeof path !== "string" || path.trim() === "") {
    throw new Error(`SEO path is required; received ${JSON.stringify(path)}`);
  }

  let normalized = path.trim();
  if (/^https?:\/\//i.test(normalized)) {
    try {
      normalized = new URL(normalized).pathname || "/";
    } catch {
      // Keep original string; validation below will surface bad input.
    }
  }

  const queryIndex = normalized.indexOf("?");
  if (queryIndex !== -1) normalized = normalized.slice(0, queryIndex);
  const hashIndex = normalized.indexOf("#");
  if (hashIndex !== -1) normalized = normalized.slice(0, hashIndex);

  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  if (normalized.length > 1) normalized = normalized.replace(/\/+$/, "");
  return normalized || "/";
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
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
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

  // First sentence of Essence if under 155 chars; otherwise truncate at a
  // sentence boundary (never invent a new description).
  const sentence = firstSentence(essence);
  if (sentence.length <= 155) return sentence;

  const sentences =
    essence.match(/.+?[.!?](?:["”')\]]+)?(?=\s|$)/g)?.map((s) => s.trim()) ?? [essence];
  let out = "";
  for (const part of sentences) {
    const next = out ? `${out} ${part}` : part;
    if (next.length > 155) break;
    out = next;
  }
  return out || sentence.slice(0, 155).trim();
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
  if (options?.includeLeverName && options.leverName) {
    return `${primaryName} — How to Practise It | ${options.leverName} | Sunya`;
  }
  return `${primaryName} — How to Practise It | Sunya`;
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
  dateModified,
  articleSection,
  path,
  imageUrl,
}: {
  headline: string;
  description: string;
  sectionName?: string;
  datePublished?: string | null;
  dateModified?: string | null;
  articleSection?: string;
  path?: string;
  imageUrl?: string | null;
}) {
  const url = path ? canonicalUrl(path) : undefined;
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
      logo: {
        "@type": "ImageObject",
        url: canonicalUrl("/og/core.jpg"),
      },
    },
    ...(url
      ? {
          url,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
        }
      : {}),
    ...(imageUrl ? { image: [imageUrl] } : { image: [canonicalUrl("/og/practice.jpg")] }),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : datePublished ? { dateModified: datePublished } : {}),
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

export function buildFaqSchema(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sunya",
    alternateName: ["Desmond Olubunmi", "Sunya by Desmond Olubunmi"],
    url: CANONICAL_ORIGIN,
    description:
      "A complete, practical framework for human wellbeing — rooted in the timeless mechanics of consciousness.",
    inLanguage: "en-IE",
    publisher: {
      "@type": "Organization",
      name: "Sunya",
      url: CANONICAL_ORIGIN,
    },
  };
}

export function buildServiceSchema({
  name,
  description,
  path,
  price,
  priceCurrency = "EUR",
  durationMinutes,
}: {
  name: string;
  description: string;
  path: string;
  price: number;
  priceCurrency?: string;
  durationMinutes?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: canonicalUrl(path),
    provider: {
      "@type": "Person",
      name: "Desmond Olubunmi",
      url: canonicalUrl("/about"),
    },
    areaServed: "Worldwide",
    serviceType: "1-on-1 spiritual diagnostic session",
    offers: {
      "@type": "Offer",
      price: String(price),
      priceCurrency,
      availability: "https://schema.org/InStock",
      url: canonicalUrl(path),
    },
    ...(durationMinutes
      ? { termsOfService: `${durationMinutes}-minute private session` }
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
  image: canonicalUrl("/og/core.jpg"),
  sameAs: [
    "https://amzn.eu/d/0bzw0W4k",
    "https://apps.apple.com/ie/app/sunya-sleep/id6764553926",
  ],
};

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sunya",
  legalName: "Sunya",
  url: CANONICAL_ORIGIN,
  logo: canonicalUrl("/og/core.jpg"),
  description:
    "A universal system for inner transformation — philosophy, practices, gatherings, writing, and Sunya AI.",
  founder: {
    "@type": "Person",
    name: "Desmond Olubunmi",
    url: canonicalUrl("/about"),
  },
  sameAs: [
    "https://amzn.eu/d/0bzw0W4k",
    "https://apps.apple.com/ie/app/sunya-sleep/id6764553926",
  ],
};
