type FormatOptions = {
  minSentencesForSplit?: number;
  minCharsForSplit?: number;
  maxChunkChars?: number;
};

export type ProtocolStepLayout =
  | {
      kind: "paragraphs";
      items: string[];
    }
  | {
      kind: "ordered-list" | "unordered-list";
      items: string[];
    };

function extractSentences(text: string) {
  return (
    text
      .match(/[^.!?]+[.!?]+(?:["”')\]]+)?|[^.!?]+$/g)
      ?.map((sentence) => sentence.trim())
      .filter(Boolean) ?? []
  );
}

function splitLongParagraph(text: string, options?: FormatOptions) {
  const {
    minSentencesForSplit = 5,
    minCharsForSplit = 520,
    maxChunkChars = 430,
  } = options ?? {};

  const normalized = text.replace(/\s*\n\s*/g, " ").replace(/\s{2,}/g, " ").trim();
  const sentences = extractSentences(normalized);
  if (sentences.length < minSentencesForSplit || normalized.length < minCharsForSplit) {
    return [normalized];
  }

  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const next = current ? `${current} ${sentence}` : sentence;
    if (current && next.length > maxChunkChars) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current = next;
    }
  }

  if (current) chunks.push(current.trim());
  return chunks.filter(Boolean);
}

export function formatNarrativeParagraphs(blocks: string[], options?: FormatOptions) {
  return blocks
    .flatMap((block) => {
      const normalizedBlock = block.replace(/\r\n/g, "\n").trim();
      if (!normalizedBlock) return [];
      return normalizedBlock
        .split(/\n\s*\n/g)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
    })
    .flatMap((paragraph) => splitLongParagraph(paragraph, options))
    .filter(Boolean);
}

function normalizeInline(text: string) {
  return text.replace(/\s*\n\s*/g, " ").replace(/\s{2,}/g, " ").trim();
}

export function formatProtocolStepLayout(text: string): ProtocolStepLayout {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return { kind: "paragraphs", items: [] };

  const clean = (parts: string[]) => parts.map((part) => normalizeInline(part)).filter(Boolean);

  const explicitParagraphs = clean(normalized.split(/\n\s*\n/g));
  if (explicitParagraphs.length > 1) {
    return { kind: "paragraphs", items: explicitParagraphs };
  }

  const explicitLineBullets = clean(normalized.split(/\n\s*[•●▪·\-]\s+/));
  if (explicitLineBullets.length > 1) {
    return { kind: "unordered-list", items: explicitLineBullets };
  }

  const singleLine = normalizeInline(normalized);

  const timelineSegments = clean(
    singleLine.split(
      /\s+(?=(?:\d{1,3}\s*(?:minute|minutes|hour|hours)\s+(?:before|after)\s+[A-Za-z][^:]{0,36}:))/i,
    ),
  );
  if (timelineSegments.length > 1) {
    return { kind: "paragraphs", items: timelineSegments };
  }

  const numbered = clean(singleLine.split(/\s*(?=\d+[\).]\s+)/));
  if (numbered.length > 1 && /^\d+[\).]\s+/.test(numbered[0])) {
    return {
      kind: "ordered-list",
      items: numbered.map((item) => item.replace(/^\d+[\).]\s+/, "").trim()).filter(Boolean),
    };
  }

  const symbolBullets = clean(singleLine.split(/\s*[•●▪·]\s+/));
  if (symbolBullets.length > 1) {
    return { kind: "unordered-list", items: symbolBullets };
  }

  // Split inline labeled segments only when they begin a new sentence.
  // This avoids artificial breaks like "Drop the" + "Doer:" while still
  // allowing true sentence-level lead-ins such as "... open. Part 2 — ...".
  const labelledSegments = clean(
    singleLine.split(/(?<=[.!?])\s+(?=[A-Z][A-Za-z0-9'’()\-\/&, —–]{2,84}:\s+)/),
  );
  if (labelledSegments.length > 1) {
    return { kind: "paragraphs", items: labelledSegments };
  }

  const paragraphChunks = formatNarrativeParagraphs([singleLine], {
    minSentencesForSplit: 4,
    minCharsForSplit: 420,
    maxChunkChars: 360,
  });

  return { kind: "paragraphs", items: paragraphChunks.length ? paragraphChunks : [singleLine] };
}
