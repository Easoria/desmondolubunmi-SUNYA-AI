import type { Gathering, GatheringCard } from "@/lib/gatherings";

/** Canonical past Dublin gathering — used when DB reads are unavailable. */
export const DUBLIN_GATHERING_SEED: Gathering = {
  id: "seed-the-open-gathering-dublin",
  slug: "the-open-gathering-dublin",
  title: "The Open Gathering — Dublin",
  subtitle: null,
  format: "in_person",
  starts_at: "2026-07-04T12:00:00+01:00",
  ends_at: "2026-07-04T14:00:00+01:00",
  timezone: "Europe/Dublin",
  venue_name: "Papal Cross, Phoenix Park",
  address: "Phoenix Park, Dublin 8",
  city: "Dublin",
  latitude: 53.3566563,
  longitude: -6.3290634,
  platform: null,
  description:
    "A free gathering in Phoenix Park for people curious about consciousness, inner life, and genuine human connection.",
  what_to_expect: null,
  who_its_for: null,
  practical_notes: null,
  registration_url:
    "https://www.eventbrite.com/e/the-open-gathering-dublin-tickets-1992725927893",
  registration_platform: "Eventbrite",
  price_label: "Free",
  capacity_note: null,
  featured_image_url: null,
  published: true,
  created_at: "2026-07-04T12:00:00+01:00",
  updated_at: "2026-07-04T12:00:00+01:00",
};

export const DUBLIN_GATHERING_CARD: GatheringCard = {
  id: DUBLIN_GATHERING_SEED.id,
  slug: DUBLIN_GATHERING_SEED.slug,
  title: DUBLIN_GATHERING_SEED.title,
  subtitle: DUBLIN_GATHERING_SEED.subtitle,
  format: DUBLIN_GATHERING_SEED.format,
  starts_at: DUBLIN_GATHERING_SEED.starts_at,
  ends_at: DUBLIN_GATHERING_SEED.ends_at,
  timezone: DUBLIN_GATHERING_SEED.timezone,
  venue_name: DUBLIN_GATHERING_SEED.venue_name,
  city: DUBLIN_GATHERING_SEED.city,
  platform: DUBLIN_GATHERING_SEED.platform,
  price_label: DUBLIN_GATHERING_SEED.price_label,
  featured_image_url: DUBLIN_GATHERING_SEED.featured_image_url,
};
