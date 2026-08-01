// Writing section constants and helpers (browser-safe)

export const SITE_URL = "https://www.desmondolubunmi.com";

export const WRITING_CATEGORIES = ["practice", "philosophy", "world"] as const;
export type WritingCategory = (typeof WRITING_CATEGORIES)[number];

export const WRITING_CATEGORY_LABELS: Record<WritingCategory, string> = {
  practice: "Practice",
  philosophy: "Philosophy",
  world: "World",
};

export function isWritingCategory(value: unknown): value is WritingCategory {
  return (
    typeof value === "string" &&
    (WRITING_CATEGORIES as readonly string[]).includes(value)
  );
}

export function writingCategoryLabel(category: string | null | undefined): string {
  if (!category || !isWritingCategory(category)) return "";
  return WRITING_CATEGORY_LABELS[category];
}

export { slugify, calculateReadingTime, formatDate } from "@/lib/blog";
