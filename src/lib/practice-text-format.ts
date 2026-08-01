type FormatOptions = {
  minSentencesForSplit?: number;
  minCharsForSplit?: number;
  maxChunkChars?: number;
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
