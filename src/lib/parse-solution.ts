export type Practice = { name: string; description: string; index: number; lever?: string };
export type Solution = {
  mirror: string;
  insight: string;
  practices: Practice[];
  reframe: string;
  raw: string;
};

const LEVERS = [
  "Breath",
  "Awareness",
  "Mind",
  "Heart",
  "Movement",
  "Sound",
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

function parsePractices(text: string): Practice[] {
  const blocks = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  // If only one block came through, try splitting on numbered lines or capitalised name lines
  let raw = blocks;
  if (blocks.length <= 1 && text.trim()) {
    raw = text
      .split(/\n(?=\s*(?:\d+\.|[-*•]\s|[A-Z][^\n:]{0,40}\n))/)
      .map((b) => b.trim())
      .filter(Boolean);
  }

  const out: Practice[] = [];
  raw.forEach((block, i) => {
    const lines = block.split("\n").map(cleanLine).filter(Boolean);
    if (lines.length === 0) return;
    const name = lines[0].replace(/[:：]\s*$/, "");
    const description = lines.slice(1).join(" ").trim() || "";
    if (!name) return;
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
  const sections = text.split(/\n\s*\n\s*\n*/).map((s) => s.trim()).filter(Boolean);

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
  Breath: "🌬️",
  Awareness: "👁️",
  Heart: "❤️",
  Movement: "🏃",
  Sound: "🔔",
  Sleep: "🌙",
  Nature: "🌿",
  Connection: "🤝",
  Environment: "🏡",
  Mind: "🧠",
  Nutrition: "🥗",
  Sustenance: "✦",
};
