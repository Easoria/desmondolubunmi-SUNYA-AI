import { getAllLeverPractices, getLeversInOrder } from "@/data/levers";

export type FrameworkLinkTerm = {
  /** Exact phrase to match in prose. */
  phrase: string;
  /** Site path or in-page hash. */
  href: string;
  /**
   * Single-token lever/practice names use case-sensitive matching so ordinary
   * words like "mind" / "sleep" are not linked — only Title Case framework uses.
   */
  caseSensitive: boolean;
};

/** Single-word practice names that are too common as English to auto-link. */
const PRACTICE_DENYLIST = new Set(["space", "water", "air", "fire"]);

function isSingleToken(phrase: string) {
  return !/[\s—–-]/.test(phrase) && !/^lever\s*\d+$/i.test(phrase);
}

/**
 * Build longest-first link terms from the live lever/practice library.
 * Used to turn order-of-operations (and similar) prose into a clickable map.
 */
export function getFrameworkLinkTerms(): FrameworkLinkTerm[] {
  const byPhrase = new Map<string, FrameworkLinkTerm>();

  const add = (phrase: string, href: string, caseSensitive: boolean) => {
    const trimmed = phrase.trim();
    if (!trimmed) return;
    const key = `${caseSensitive ? "cs" : "ci"}:${caseSensitive ? trimmed : trimmed.toLowerCase()}`;
    const existing = byPhrase.get(key);
    // Prefer deeper (practice) hrefs when the same phrase is registered twice.
    if (existing && existing.href.length >= href.length) return;
    byPhrase.set(key, { phrase: trimmed, href, caseSensitive });
  };

  for (const lever of getLeversInOrder()) {
    const hub = `/practices/${lever.slug}`;
    const n = lever.number;
    const name = lever.name;

    for (const practice of getAllLeverPractices(lever)) {
      const deny = PRACTICE_DENYLIST.has(practice.name.toLowerCase());
      const tooShort =
        isSingleToken(practice.name) && practice.name.length < 5 && !practice.name.includes("-");
      if (deny || tooShort) continue;

      const practiceHref = `/practices/${lever.slug}/${practice.slug}`;
      add(practice.name, practiceHref, isSingleToken(practice.name));
      if (/^the /i.test(practice.name)) {
        add(practice.name.slice(4), practiceHref, false);
      }
    }

    // Composite lever phrases before bare names so "Breath (Lever 1)" is one link.
    add(`${name} (Lever ${n})`, hub, false);
    add(`Lever ${n} — ${name}`, hub, false);
    add(`Lever ${n} – ${name}`, hub, false);
    add(`Lever ${n} - ${name}`, hub, false);
    add(`${name} Lever ${n}`, hub, false);
    add(`${name} practices (Lever ${n})`, hub, false);
    add(`${name} practices`, hub, false);
    add(`Lever ${n}`, hub, false);
    add(name, hub, true);
  }

  // In-page zone anchors on /practices/where-to-begin
  for (let zone = 1; zone <= 5; zone++) {
    add(`Zone ${zone}`, `#zone-${zone}`, false);
  }

  return [...byPhrase.values()].sort((a, b) => b.phrase.length - a.phrase.length);
}

export type FrameworkLinkSegment =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string };

/**
 * Split plain text into text/link segments using longest-match-at-position.
 * Does not nest links; once a range is claimed it is skipped.
 */
export function segmentFrameworkLinks(
  text: string,
  terms: FrameworkLinkTerm[] = getFrameworkLinkTerms(),
): FrameworkLinkSegment[] {
  if (!text) return [];

  const segments: FrameworkLinkSegment[] = [];
  let index = 0;

  while (index < text.length) {
    let matched: FrameworkLinkTerm | null = null;

    for (const term of terms) {
      const end = index + term.phrase.length;
      if (end > text.length) continue;
      const slice = text.slice(index, end);
      const ok = term.caseSensitive
        ? slice === term.phrase
        : slice.toLowerCase() === term.phrase.toLowerCase();
      if (!ok) continue;

      // Require token boundaries so "Heart" does not match inside "Hearth".
      const before = index === 0 ? "" : text[index - 1]!;
      const after = end >= text.length ? "" : text[end]!;
      if (isWordChar(before) || isWordChar(after)) continue;

      matched = term;
      break;
    }

    if (!matched) {
      const last = segments[segments.length - 1];
      const ch = text[index]!;
      if (last?.type === "text") last.text += ch;
      else segments.push({ type: "text", text: ch });
      index += 1;
      continue;
    }

    const end = index + matched.phrase.length;
    segments.push({ type: "link", text: text.slice(index, end), href: matched.href });
    index = end;
  }

  return segments;
}

function isWordChar(ch: string) {
  return /[A-Za-z0-9]/.test(ch);
}
