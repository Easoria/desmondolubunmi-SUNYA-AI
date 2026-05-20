// Shared blog constants and helpers (browser-safe)

export const BLOG_ADMIN_EMAIL = "easoriaai@gmail.com";
export const SITE_URL = "https://desmondolubunmisunya.lovable.app";

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();
}

export function calculateReadingTime(content: string): number {
  const words = (content || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export const ALL_TAGS = [
  "Anxiety",
  "Breathwork",
  "Sleep",
  "Awareness",
  "Nervous System",
  "Meditation",
  "Consciousness",
  "Identity",
] as const;
