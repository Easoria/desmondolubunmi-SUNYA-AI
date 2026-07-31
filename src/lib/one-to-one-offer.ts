export const ONE_TO_ONE_OFFER = {
  free: true,
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
    return `${oneToOnePriceLabel()} while I take on my first Sunya clients. This will return to €${ONE_TO_ONE_OFFER.priceEur}.`;
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
  const base =
    "A diagnostic session rooted in the complete Sunya framework. Find where your system is actually contracted, and the single lever that matters most right now.";
  return ONE_TO_ONE_OFFER.free ? `${base} Currently free for a limited time.` : base;
}
