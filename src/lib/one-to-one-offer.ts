export const ONE_TO_ONE_OFFER = {
  free: true,
  /** How many founding sessions are offered at no charge while `free` is true. */
  freeSessionLimit: 10,
  priceEur: 150,
  durationMinutes: 90,
} as const;

export function oneToOnePriceLabel() {
  return ONE_TO_ONE_OFFER.free ? "Free" : `€${ONE_TO_ONE_OFFER.priceEur}`;
}

export function oneToOneNavLabel() {
  return ONE_TO_ONE_OFFER.free ? "1-on-1 (Free)" : "Work With Me";
}

export function oneToOneBookingCtaLabel() {
  return ONE_TO_ONE_OFFER.free ? "Book Free Session" : "Book Session";
}

export function oneToOnePricingLine() {
  return `${oneToOnePriceLabel()} · ${ONE_TO_ONE_OFFER.durationMinutes} minutes`;
}

export function oneToOneOfferNote() {
  if (ONE_TO_ONE_OFFER.free) {
    return `The first ${ONE_TO_ONE_OFFER.freeSessionLimit} people are seen freely. After that, €${ONE_TO_ONE_OFFER.priceEur}.`;
  }
  return `€${ONE_TO_ONE_OFFER.priceEur} for ${ONE_TO_ONE_OFFER.durationMinutes} minutes.`;
}

export function oneToOneHeroOfferLine() {
  if (ONE_TO_ONE_OFFER.free) {
    return `Currently offering ${oneToOnePriceLabel().toLowerCase()} founding sessions in exchange for honest feedback and a short testimonial.`;
  }
  return `Now booking at €${ONE_TO_ONE_OFFER.priceEur} per session.`;
}

export function oneToOneBookingLeadLine() {
  if (ONE_TO_ONE_OFFER.free) {
    return "Pick a time below. No payment required.";
  }
  return `Pick your time and pay securely below — €${ONE_TO_ONE_OFFER.priceEur} all-in.`;
}

export function oneToOneWorkDescription() {
  return "A diagnostic session rooted in the complete Sunya framework. Find the single biggest obstacle to your wellbeing, address it at its root, and leave with a personalised protocol.";
}
