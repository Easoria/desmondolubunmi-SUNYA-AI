// Gatherings helpers (browser-safe)

export type GatheringFormat = "in_person" | "online";

export type Gathering = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  format: GatheringFormat;
  starts_at: string;
  ends_at: string | null;
  timezone: string;
  venue_name: string | null;
  address: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  platform: string | null;
  description: string;
  what_to_expect: string | null;
  who_its_for: string | null;
  practical_notes: string | null;
  registration_url: string | null;
  registration_platform: string | null;
  price_label: string | null;
  capacity_note: string | null;
  featured_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type GatheringCard = Pick<
  Gathering,
  | "id"
  | "slug"
  | "title"
  | "subtitle"
  | "format"
  | "starts_at"
  | "ends_at"
  | "timezone"
  | "venue_name"
  | "city"
  | "platform"
  | "price_label"
  | "featured_image_url"
>;

export function isGatheringUpcoming(
  gathering: Pick<Gathering, "starts_at">,
  now = new Date(),
): boolean {
  return new Date(gathering.starts_at).getTime() >= now.getTime();
}

export function formatBadge(format: GatheringFormat): string {
  return format === "in_person" ? "IN PERSON" : "ONLINE";
}

function inZone(date: Date, timeZone: string) {
  return {
    weekday: new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      timeZone,
    }).format(date),
    weekdayLong: new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      timeZone,
    }).format(date),
    day: new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      timeZone,
    }).format(date),
    month: new Intl.DateTimeFormat("en-GB", {
      month: "long",
      timeZone,
    }).format(date),
    year: new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      timeZone,
    }).format(date),
    time: new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    }).format(date),
  };
}

/** Card line: Sat 4 July · 12:00 */
export function formatGatheringCardWhen(
  startsAt: string,
  timeZone = "Europe/Dublin",
): string {
  const start = new Date(startsAt);
  const z = inZone(start, timeZone);
  return `${z.weekday} ${z.day} ${z.month} · ${z.time}`;
}

/** Details block: Saturday 4 July 2026 · 12:00–14:00 */
export function formatGatheringDetailsWhen(
  startsAt: string,
  endsAt: string | null | undefined,
  timeZone = "Europe/Dublin",
): string {
  const start = new Date(startsAt);
  const z = inZone(start, timeZone);
  const startLine = `${z.weekdayLong} ${z.day} ${z.month} ${z.year} · ${z.time}`;
  if (!endsAt) return startLine;
  const end = inZone(new Date(endsAt), timeZone);
  return `${startLine}–${end.time}`;
}

/** Meta title date fragment: 4 July 2026 */
export function formatGatheringMetaDate(
  startsAt: string,
  timeZone = "Europe/Dublin",
): string {
  const z = inZone(new Date(startsAt), timeZone);
  return `${z.day} ${z.month} ${z.year}`;
}

/** Strip a trailing " — City" / " - City" so SEO titles do not double the place. */
export function gatheringTitleForMeta(
  title: string,
  city: string | null | undefined,
): string {
  const trimmed = title.trim();
  const place = city?.trim();
  if (!place) return trimmed;
  const suffix = new RegExp(
    `\\s+[—–-]\\s+${place.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
    "i",
  );
  return trimmed.replace(suffix, "").trim() || trimmed;
}

/**
 * Individual gathering document title for search.
 * In person: "[Title] — [City] Meditation Event, [Date] | Sunya"
 * Online:    "[Title] — Online Meditation Event, [Date] | Sunya"
 */
export function buildGatheringMetaTitle(
  gathering: Pick<Gathering, "title" | "format" | "city" | "starts_at" | "timezone">,
): string {
  const base = gatheringTitleForMeta(gathering.title, gathering.city);
  const dateLabel = formatGatheringMetaDate(
    gathering.starts_at,
    gathering.timezone,
  );
  if (gathering.format === "online") {
    return `${base} — Online Meditation Event, ${dateLabel} | Sunya`;
  }
  const city = gathering.city?.trim() || "Dublin";
  return `${base} — ${city} Meditation Event, ${dateLabel} | Sunya`;
}

export function gatheringLocationLine(
  gathering: Pick<
    Gathering,
    "format" | "venue_name" | "city" | "platform" | "address"
  >,
): string {
  if (gathering.format === "online") {
    return gathering.platform ? `Online · ${gathering.platform}` : "Online";
  }
  const bits = [gathering.venue_name, gathering.city].filter(Boolean);
  if (bits.length) return bits.join(", ");
  return gathering.address ?? "";
}

export function firstMarkdownParagraph(markdown: string): string {
  const text = (markdown || "")
    .replace(/^#+\s+/gm, "")
    .replace(/[*_`]/g, "")
    .trim();
  const para = text.split(/\n\s*\n/)[0] ?? text;
  return para.replace(/\s+/g, " ").trim();
}

export function firstSentence(text: string): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  const match = normalized.match(/^.+?[.!?](?:["”')\]]+)?(?=\s|$)/);
  return (match ? match[0] : normalized).trim();
}

export function parsePriceForSchema(priceLabel: string | null | undefined): {
  price: string;
  priceCurrency: string;
} | null {
  if (!priceLabel) return null;
  const trimmed = priceLabel.trim();
  if (!trimmed) return null;
  if (/^free$/i.test(trimmed) || /^donation$/i.test(trimmed)) {
    return { price: "0", priceCurrency: "EUR" };
  }
  const match = trimmed.match(/([€$£])\s*([\d]+(?:[.,]\d+)?)/);
  if (!match) return { price: "0", priceCurrency: "EUR" };
  const currency = match[1] === "$" ? "USD" : match[1] === "£" ? "GBP" : "EUR";
  return { price: match[2]!.replace(",", "."), priceCurrency: currency };
}

export function googleMapsSearchUrl(gathering: Pick<Gathering, "latitude" | "longitude" | "address" | "venue_name" | "city">) {
  if (gathering.latitude != null && gathering.longitude != null) {
    return `https://www.google.com/maps/search/?api=1&query=${gathering.latitude},${gathering.longitude}`;
  }
  const q = [gathering.venue_name, gathering.address, gathering.city]
    .filter(Boolean)
    .join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export function googleMapsEmbedUrl(lat: number, lng: number) {
  return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
}

export { slugify } from "@/lib/blog";
