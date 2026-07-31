export type Practice = { name: string; description: string; index: number; lever?: string };
export type Solution = {
  mirror: string;
  insight: string;
  practices: Practice[];
  reframe: string;
  raw: string;
};

const LEVERS = [
  "Conservation",
  "Breath",
  "Movement",
  "Mind",
  "Sound",
  "Heart",
  "Awareness",
  "Sleep",
  "Nutrition",
  "Connection",
  "Environment",
  "Nature",
  "Sustenance",
] as const;

function detectLever(name: string): string | undefined {
  const lower = name.toLowerCase();
  return LEVERS.find((l) => lower.includes(l.toLowerCase()));
}

function cleanLine(s: string): string {
  return s
    .replace(/^\s*[-*•]\s+/, "")
    .replace(/^\s*\d+\.\s+/, "")
    .replace(/\*\*/g, "")
    .trim();
}

// Strip leading section-label lines the model sometimes emits despite
// instructions ("The Practices", "Your Practices:", "Insight —", etc.).
const SECTION_LABEL_RE =
  /^\s*(?:#+\s*)?(?:the\s+|your\s+)?(?:mirror|insight|practice|practices|reframe)\s*[:—–-]?\s*$/i;

function stripSectionLabel(block: string): string {
  const lines = block.split("\n");
  while (lines.length && SECTION_LABEL_RE.test(lines[0])) lines.shift();
  return lines.join("\n").trim();
}

function looksLikePracticeName(name: string): boolean {
  if (!name) return false;
  // A practice name is a short label, not a paragraph. Reject anything
  // that's clearly a sentence/paragraph (too long, ends in a period, or
  // contains multiple sentences).
  if (name.length > 90) return false;
  const sentenceCount = (name.match(/[.!?]\s|[.!?]$/g) || []).length;
  if (sentenceCount > 1) return false;
  return true;
}

function parsePractices(text: string): Practice[] {
  const cleaned = stripSectionLabel(text);
  if (!cleaned) return [];

  const blocks = cleaned
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  // If only one block came through, try splitting on numbered lines or capitalised name lines
  let raw = blocks;
  if (blocks.length <= 1 && cleaned) {
    raw = cleaned
      .split(/\n(?=\s*(?:\d+\.|[-*•]\s|[A-Z][^\n:]{0,40}\n))/)
      .map((b) => b.trim())
      .filter(Boolean);
  }

  const out: Practice[] = [];
  raw.forEach((block, i) => {
    const lines = block.split("\n").map(cleanLine).filter(Boolean);
    if (lines.length === 0) return;
    const name = lines[0].replace(/[:：]\s*$/, "");
    const description = lines.slice(1).join(" ").trim();
    if (!name) return;
    // Reject paragraph-shaped "practices" — a real practice has either a
    // short name + description, or at minimum a short label-style name.
    if (!description && !looksLikePracticeName(name)) return;
    out.push({
      name,
      description: description || name,
      index: i + 1,
      lever: detectLever(name),
    });
  });
  return out;
}

export function parseSolution(responseText: string): Solution {
  const text = responseText.replace(/\[SUNYA_READY\]/g, "").trim();

  // Prefer 2+ blank lines as section separators (per the prompt), but fall
  // back to single blank lines if that produced too few sections.
  let sections = text.split(/\n\s*\n\s*\n+/).map((s) => s.trim()).filter(Boolean);
  if (sections.length < 3) {
    sections = text.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
  }

  // Drop pure section-label lines that the model sometimes emits as their
  // own paragraph ("The Mirror", "Practices:", etc.) so they don't get
  // counted as content sections.
  sections = sections.filter((s) => !SECTION_LABEL_RE.test(s));
  // Also strip a leading label line inside each remaining section.
  sections = sections.map(stripSectionLabel).filter(Boolean);

  let mirror = "";
  let insight = "";
  let practicesRaw = "";
  let reframe = "";

  if (sections.length >= 4) {
    mirror = sections[0];
    insight = sections[1];
    practicesRaw = sections.slice(2, sections.length - 1).join("\n\n");
    reframe = sections[sections.length - 1];
  } else if (sections.length === 3) {
    [mirror, insight, practicesRaw] = sections;
  } else {
    mirror = sections[0] || text;
    insight = sections[1] || "";
    practicesRaw = sections[2] || "";
    reframe = sections[3] || "";
  }

  return {
    mirror,
    insight,
    practices: parsePractices(practicesRaw),
    reframe,
    raw: text,
  };
}

export const LEVER_ICONS: Record<string, string> = {
  Conservation: "🔒",
  Breath: "🌬️",
  Movement: "🏃",
  Mind: "🧠",
  Sound: "🔔",
  Heart: "❤️",
  Awareness: "👁️",
  Sleep: "🌙",
  Nutrition: "🥗",
  Connection: "🤝",
  Environment: "🏡",
  Nature: "🌿",
  Sustenance: "✦",
};
