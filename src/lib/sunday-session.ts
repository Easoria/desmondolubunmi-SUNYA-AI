/** Permanent weekly Sunday Stillness — Europe/Dublin, Sundays 18:00. */

export const SUNDAY_SESSION_TZ = "Europe/Dublin";
export const SUNDAY_SESSION_TITLE = "Sunday Stillness";
export const SUNDAY_SESSION_SUBTITLE =
  "A free live meditation and teaching with Desmond Olubunmi";
export const SUNDAY_SESSION_HOUR = 18;
export const SUNDAY_SESSION_MINUTE = 0;
/** Shown length for calendar entries; the live session is about 60–90 minutes. */
export const SUNDAY_SESSION_DURATION_MINUTES = 90;

/**
 * EDIT WEEKLY — shown as “This week: …” under the subtitle on /gatherings.
 * Leave empty to hide the line completely.
 */
export const THIS_WEEKS_THEME =
  "Stillness and compassion, quieting the mind and opening the heart";

export type DublinParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  weekday: string; // Sun, Mon, …
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function getDublinParts(date: Date): DublinParts {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: SUNDAY_SESSION_TZ,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const hourRaw = get("hour");
  // Some engines emit "24" for midnight.
  const hour = hourRaw === "24" ? 0 : Number(hourRaw);

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour,
    minute: Number(get("minute")),
    second: Number(get("second")),
    weekday: get("weekday"),
  };
}

/** Offset (ms) of `timeZone` east of UTC at the given instant. */
function timeZoneOffsetMs(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "0";

  const hourRaw = get("hour");
  const hour = hourRaw === "24" ? 0 : Number(hourRaw);
  const asUtc = Date.UTC(
    Number(get("year")),
    Number(get("month")) - 1,
    Number(get("day")),
    hour,
    Number(get("minute")),
    Number(get("second")),
  );
  return asUtc - date.getTime();
}

/** Convert a Europe/Dublin wall-clock local time to a UTC Date. */
export function dublinLocalToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): Date {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const offset = timeZoneOffsetMs(utcGuess, SUNDAY_SESSION_TZ);
  let result = new Date(utcGuess.getTime() - offset);
  // One correction pass for DST edges.
  const offset2 = timeZoneOffsetMs(result, SUNDAY_SESSION_TZ);
  if (offset2 !== offset) {
    result = new Date(utcGuess.getTime() - offset2);
  }
  return result;
}

function addCalendarDays(
  year: number,
  month: number,
  day: number,
  delta: number,
): { year: number; month: number; day: number } {
  const utc = new Date(Date.UTC(year, month - 1, day + delta));
  return {
    year: utc.getUTCFullYear(),
    month: utc.getUTCMonth() + 1,
    day: utc.getUTCDate(),
  };
}

/**
 * Next Sunday Stillness start as a UTC Date: coming Sunday 18:00 Europe/Dublin.
 * If today is Sunday and Dublin local time is still before 18:00, returns today.
 */
export function getNextSundaySessionStart(from: Date = new Date()): Date {
  const dublin = getDublinParts(from);
  const weekdayIndex: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const dow = weekdayIndex[dublin.weekday] ?? 0;
  let daysUntil = (0 - dow + 7) % 7;

  if (daysUntil === 0) {
    const minutesNow = dublin.hour * 60 + dublin.minute;
    const sessionMinutes = SUNDAY_SESSION_HOUR * 60 + SUNDAY_SESSION_MINUTE;
    if (minutesNow >= sessionMinutes) {
      daysUntil = 7;
    }
  }

  const target = addCalendarDays(dublin.year, dublin.month, dublin.day, daysUntil);
  return dublinLocalToUtc(
    target.year,
    target.month,
    target.day,
    SUNDAY_SESSION_HOUR,
    SUNDAY_SESSION_MINUTE,
  );
}

export function formatDublinSessionWhen(start: Date): string {
  const z = getDublinParts(start);
  const weekdayLong = new Intl.DateTimeFormat("en-GB", {
    timeZone: SUNDAY_SESSION_TZ,
    weekday: "long",
  }).format(start);
  const monthLong = new Intl.DateTimeFormat("en-GB", {
    timeZone: SUNDAY_SESSION_TZ,
    month: "long",
  }).format(start);
  return `${weekdayLong} ${z.day} ${monthLong} ${z.year} · ${pad2(z.hour)}:${pad2(z.minute)} Irish time`;
}

export function resolveVisitorTimeZone(timeZone?: string): string | undefined {
  if (timeZone) return timeZone;
  if (typeof Intl === "undefined") return undefined;
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/** True when the visitor's zone is Irish time (Europe/Dublin). */
export function isVisitorInIreland(timeZone?: string): boolean {
  return resolveVisitorTimeZone(timeZone) === SUNDAY_SESSION_TZ;
}

/** Visitor-local line, e.g. "your time: Sunday 26 October · 18:00". */
export function formatVisitorSessionWhen(start: Date, timeZone?: string): string {
  const tz = resolveVisitorTimeZone(timeZone);

  const opts: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    ...(tz ? { timeZone: tz } : {}),
  };

  const formatted = new Intl.DateTimeFormat("en-GB", opts).format(start);
  if (!tz || tz === SUNDAY_SESSION_TZ) {
    return `Your time: ${formatted}`;
  }
  return `Your time (${tz.replace(/_/g, " ")}): ${formatted}`;
}

/** Compact local clock for the schedule line, e.g. "Sunday · 13:00 your time". */
export function formatVisitorLocalSuffix(start: Date, timeZone?: string): string | null {
  const tz = resolveVisitorTimeZone(timeZone);
  if (!tz || tz === SUNDAY_SESSION_TZ) return null;

  const formatted = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  }).format(start);

  return `${formatted} your time`;
}

function formatIcsLocal(date: Date): string {
  const z = getDublinParts(date);
  return `${z.year}${pad2(z.month)}${pad2(z.day)}T${pad2(z.hour)}${pad2(z.minute)}${pad2(z.second)}`;
}

function formatIcsUtcStamp(date: Date): string {
  return (
    date.getUTCFullYear().toString() +
    pad2(date.getUTCMonth() + 1) +
    pad2(date.getUTCDate()) +
    "T" +
    pad2(date.getUTCHours()) +
    pad2(date.getUTCMinutes()) +
    pad2(date.getUTCSeconds()) +
    "Z"
  );
}

/** Calendar description — never includes a meeting URL. */
export const SUNDAY_SESSION_CALENDAR_DESCRIPTION =
  "Sunday Stillness — free, online, about 60–90 minutes. The joining link is in your registration email (it is never shown on the website).";

export function buildSundaySessionIcs(start: Date = getNextSundaySessionStart()): string {
  const uid = `sunday-stillness@desmondolubunmi.com`;
  const stamp = formatIcsUtcStamp(new Date());
  const dtStart = formatIcsLocal(start);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sunya//Sunday Stillness//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    "TZID:Europe/Dublin",
    "X-LIC-LOCATION:Europe/Dublin",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=Europe/Dublin:${dtStart}`,
    `DURATION:PT${SUNDAY_SESSION_DURATION_MINUTES}M`,
    "RRULE:FREQ=WEEKLY;BYDAY=SU",
    `SUMMARY:${SUNDAY_SESSION_TITLE}`,
    `DESCRIPTION:${SUNDAY_SESSION_CALENDAR_DESCRIPTION}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadSundaySessionIcs(start?: Date) {
  const ics = buildSundaySessionIcs(start);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sunday-stillness.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function buildGoogleCalendarUrl(start: Date = getNextSundaySessionStart()): string {
  const end = new Date(start.getTime() + SUNDAY_SESSION_DURATION_MINUTES * 60_000);
  const toGcal = (d: Date) =>
    d.getUTCFullYear().toString() +
    pad2(d.getUTCMonth() + 1) +
    pad2(d.getUTCDate()) +
    "T" +
    pad2(d.getUTCHours()) +
    pad2(d.getUTCMinutes()) +
    pad2(d.getUTCSeconds()) +
    "Z";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: SUNDAY_SESSION_TITLE,
    dates: `${toGcal(start)}/${toGcal(end)}`,
    details: SUNDAY_SESSION_CALENDAR_DESCRIPTION,
    ctz: SUNDAY_SESSION_TZ,
    recur: "RRULE:FREQ=WEEKLY;BYDAY=SU",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
