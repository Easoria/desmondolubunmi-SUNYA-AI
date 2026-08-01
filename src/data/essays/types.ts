export type TextSpan = {
  text: string;
  italic?: boolean;
  bold?: boolean;
};

export type ContentBlock =
  | { type: "paragraph"; spans: TextSpan[] }
  | { type: "subheading"; spans: TextSpan[] }
  | { type: "list"; items: TextSpan[][] };

export type EssaySection = {
  heading: string;
  /** Preferred structured content from the PDF. */
  blocks: ContentBlock[];
  /**
   * Plain-text paragraph fallback for older consumers / word counts.
   * Derived from blocks when present.
   */
  paragraphs: string[];
};

export type Essay = {
  number: number;
  slug: string;
  title: string;
  group: "THE ORIGIN AND THE FALL" | "THE SYSTEM AND THE END";
  numbered: boolean;
  sourceSections: string[];
  targetWords: number;
  wordCount: number;
  standfirst: string;
  sections: EssaySection[];
};

export type WhereToBegin = {
  slug: string;
  title: string;
  description: string;
  sections: EssaySection[];
};

export function spansToText(spans: TextSpan[]): string {
  return spans.map((span) => span.text).join("");
}

export function blockToText(block: ContentBlock): string {
  if (block.type === "list") {
    return block.items.map((item) => spansToText(item)).join(" ");
  }
  return spansToText(block.spans);
}

export function blocksToParagraphs(blocks: ContentBlock[]): string[] {
  const paragraphs: string[] = [];
  for (const block of blocks) {
    if (block.type === "list") {
      for (const item of block.items) {
        const text = spansToText(item).trim();
        if (text) paragraphs.push(text);
      }
      continue;
    }
    const text = spansToText(block.spans).trim();
    if (text) paragraphs.push(text);
  }
  return paragraphs;
}
