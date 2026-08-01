import type { Gathering } from "@/lib/gatherings";
import {
  firstMarkdownParagraph,
  gatheringLocationLine,
  parsePriceForSchema,
} from "@/lib/gatherings";
import { canonicalUrl } from "@/lib/seo";

export function buildGatheringEventSchema(gathering: Gathering) {
  const description = firstMarkdownParagraph(gathering.description);
  const isOnline = gathering.format === "online";
  const price = gathering.registration_url
    ? parsePriceForSchema(gathering.price_label)
    : null;

  const location = isOnline
    ? {
        "@type": "VirtualLocation",
        url: gathering.registration_url || canonicalUrl(`/gatherings/${gathering.slug}`),
        name: gatheringLocationLine(gathering),
      }
    : {
        "@type": "Place",
        name: gathering.venue_name || gathering.city || "Dublin",
        address: {
          "@type": "PostalAddress",
          ...(gathering.address ? { streetAddress: gathering.address } : {}),
          ...(gathering.city ? { addressLocality: gathering.city } : {}),
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
    eventStatus: "https://schema.org/EventScheduled",
    location,
    organizer: {
      "@type": "Person",
      name: "Desmond Olubunmi",
      url: canonicalUrl("/about"),
    },
    description,
    ...(gathering.featured_image_url ? { image: gathering.featured_image_url } : {}),
    ...(gathering.registration_url && price
      ? {
          offers: {
            "@type": "Offer",
            price: price.price,
            priceCurrency: price.priceCurrency,
            url: gathering.registration_url,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}
