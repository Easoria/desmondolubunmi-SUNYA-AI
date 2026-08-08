/** Free-tier: 2 sessions per ISO week after an uncounted first session. */
export const WEEKLY_FREE_LIMIT = 2;

/** ISO week key, e.g. `2026-W32` (weeks start Monday). */
export function currentIsoWeekKey(date = new Date()): string {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((utc.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

/** Next Monday (ISO week reset), e.g. `Monday 10 August`. */
export function nextWeeklyResetLabel(date = new Date()): string {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay(); // 0 Sun … 6 Sat
  const daysUntilMonday = day === 0 ? 1 : day === 1 ? 7 : 8 - day;
  d.setDate(d.getDate() + daysUntilMonday);
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function weeklyCountForProfile(profile: {
  sessions_this_week?: number | null;
  week_start?: string | null;
}): number {
  const week = currentIsoWeekKey();
  if (profile.week_start !== week) return 0;
  return profile.sessions_this_week ?? 0;
}
