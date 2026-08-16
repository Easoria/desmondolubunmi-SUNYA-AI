import type { Gathering } from "@/lib/gatherings";
import {
  firstMarkdownParagraph,
  gatheringLocationLine,
  isGatheringUpcoming,
  parsePriceForSchema,
} from "@/lib/gatherings";
import { canonicalUrl } from "@/lib/seo";

export function buildGatheringEventSchema(gathering: Gathering) {
  const description = firstMarkdownParagraph(gathering.description);
  const isOnline = gathering.format === "online";
  const upcoming = isGatheringUpcoming(gathering);
  const pageUrl = canonicalUrl(`/gatherings/${gathering.slug}`);
  const offerUrl = gathering.registration_url || pageUrl;
  const price =
    parsePriceForSchema(gathering.price_label) ?? {
      price: "0",
      priceCurrency: "EUR",
    };

  const location = isOnline
    ? {
        "@type": "VirtualLocation",
        url: offerUrl,
        name: gatheringLocationLine(gathering),
      }
    : {
        "@type": "Place",
        name: gathering.venue_name || gathering.city || "Dublin",
        address: {
          "@type": "PostalAddress",
          ...(gathering.address ? { streetAddress: gathering.address } : {}),
          addressLocality: gathering.city?.trim() || "Dublin",
          addressCountry: "IE",
        },
        ...(gathering.latitude != null && gathering.longitude != null
          ? {
              geo: {
                "@type": "GeoCoordinates",
                latitude: Number(gathering.latitude),
                longitude: Number(gathering.longitude),
              },
            }
          : {}),
      };

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: gathering.title,
    startDate: gathering.starts_at,
    ...(gathering.ends_at ? { endDate: gathering.ends_at } : {}),
    eventAttendanceMode: isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: upcoming
      ? "https://schema.org/EventScheduled"
      : "https://schema.org/EventCompleted",
    location,
    organizer: {
      "@type": "Person",
      name: "Desmond Olubunmi",
      url: canonicalUrl("/about"),
    },
    description,
    url: pageUrl,
    image: gathering.featured_image_url
      ? gathering.featured_image_url
      : canonicalUrl("/og/core.jpg"),
    offers: {
      "@type": "Offer",
      price: price.price,
      priceCurrency: price.priceCurrency,
      url: offerUrl,
      availability: upcoming
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
    },
  };
}
