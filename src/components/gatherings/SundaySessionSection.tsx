import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import {
  buildGoogleCalendarUrl,
  downloadSundaySessionIcs,
  formatVisitorLocalSuffix,
  getNextSundaySessionStart,
  SUNDAY_SESSION_SUBTITLE,
  SUNDAY_SESSION_TITLE,
  THIS_WEEKS_THEME,
} from "@/lib/sunday-session";

type FormState = {
  firstName: string;
  email: string;
  whatBringsYou: string;
  consent: boolean;
  company: string;
};

const INITIAL: FormState = {
  firstName: "",
  email: "",
  whatBringsYou: "",
  consent: false,
  company: "",
};

const inputClass =
  "mt-1.5 w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-[#b8d4e8]/45 outline-none transition focus:border-[#7ec8e3]/50 focus:ring-1 focus:ring-[#7ec8e3]/30 disabled:opacity-50";

const labelClass = "block text-sm text-[#b8d4e8]";

export function SundaySessionSection({ id = "sunday-stillness" }: { id?: string }) {
  const nextStart = useMemo(() => getNextSundaySessionStart(), []);
  const localSuffix = useMemo(() => formatVisitorLocalSuffix(nextStart), [nextStart]);
  const googleUrl = useMemo(() => buildGoogleCalendarUrl(nextStart), [nextStart]);

  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || done) return;
    setError("");

    if (!form.consent) {
      setError("Please confirm you'd like to receive the session link and emails.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/sunday-session-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          email: form.email,
          whatBringsYou: form.whatBringsYou,
          consent: form.consent,
          company: form.company,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          typeof body.error === "string"
            ? body.error
            : "Something went wrong. Please try again.",
        );
      }
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong registering you. Please try again in a moment.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id={id}
      className="rounded-2xl border border-[#7ec8e3]/25 bg-[#7ec8e3]/[0.06] px-5 py-8 sm:px-8 sm:py-10"
    >
      <h2 className="display text-center text-3xl text-white sm:text-4xl">
        {SUNDAY_SESSION_TITLE}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[#b8d4e8] sm:text-base">
        {SUNDAY_SESSION_SUBTITLE}
      </p>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[#e8f4fb]">
        Every Sunday at 6pm Irish time, online
        {localSuffix ? <span className="text-[#b8d4e8]/85"> · {localSuffix}</span> : null}
      </p>
      {THIS_WEEKS_THEME.trim() ? (
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-[#e8f4fb]">
          This week: {THIS_WEEKS_THEME.trim()}
        </p>
      ) : null}

      {done ? (
        <div className="mx-auto mt-8 max-w-md text-center">
          <p className="text-base text-[#e8f4fb]">
            You're registered. Check your inbox for the link.
          </p>
          <div className="mt-6 flex w-full flex-col items-stretch gap-4 sm:items-center">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-[#7ec8e3]/50 bg-[#7ec8e3]/10 px-5 py-3 text-sm text-white transition hover:bg-[#7ec8e3]/20"
            >
              Add to Google Calendar
            </a>
            <div className="flex flex-col items-center gap-1.5">
              <button
                type="button"
                onClick={() => downloadSundaySessionIcs(nextStart)}
                className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/[0.06] px-5 py-3 text-sm text-[#e8f4fb] transition hover:border-white/25 hover:bg-white/[0.1]"
              >
                Apple or Outlook calendar
              </button>
              <p className="max-w-xs text-center text-xs leading-relaxed text-[#b8d4e8]/70">
                Open the file that downloads, and it adds the session to your calendar.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="relative mx-auto mt-8 max-w-md space-y-4"
          noValidate
        >
          <p className="text-center text-sm text-[#b8d4e8]">Register to receive the link.</p>
          <div>
            <label htmlFor="sunday-first-name" className={labelClass}>
              First name <span className="text-[#7ec8e3]">*</span>
            </label>
            <input
              id="sunday-first-name"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              disabled={loading}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="sunday-email" className={labelClass}>
              Email <span className="text-[#7ec8e3]">*</span>
            </label>
            <input
              id="sunday-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              disabled={loading}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="sunday-what-brings" className={labelClass}>
              What brings you here? <span className="text-[#b8d4e8]/50">(optional)</span>
            </label>
            <input
              id="sunday-what-brings"
              name="whatBringsYou"
              type="text"
              maxLength={500}
              value={form.whatBringsYou}
              onChange={(e) => update("whatBringsYou", e.target.value)}
              disabled={loading}
              className={inputClass}
            />
          </div>

          {/* Honeypot — hidden from people, visible to naive bots. */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="sunday-company">Company</label>
            <input
              id="sunday-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
            />
          </div>

          <div className="flex items-start gap-3 pt-1">
            <input
              id="sunday-consent"
              name="consent"
              type="checkbox"
              required
              checked={form.consent}
              onChange={(e) => update("consent", e.target.checked)}
              disabled={loading}
              className="mt-1 h-4 w-4 shrink-0 rounded border-white/30 bg-white/5 text-[#7ec8e3] focus:ring-[#7ec8e3]/40"
            />
            <label htmlFor="sunday-consent" className="text-sm leading-relaxed text-[#b8d4e8]">
              I'd like to receive the session link, reminders and occasional emails from Desmond. I
              can unsubscribe at any time. <span className="text-[#7ec8e3]">*</span>
            </label>
          </div>

          <p className="text-xs leading-relaxed text-[#b8d4e8]/70">
            Sessions are recorded, but only Desmond is recorded. Participants never appear or are
            heard.
          </p>

          <p className="text-xs text-[#b8d4e8]/55">
            See our{" "}
            <Link to="/privacy" className="text-[#7ec8e3] underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          {error ? (
            <p className="text-sm text-red-200" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading || !form.consent}
            className="inline-flex w-full items-center justify-center rounded-md border border-[#7ec8e3]/50 bg-[#7ec8e3]/15 px-5 py-3 text-sm text-white transition hover:bg-[#7ec8e3]/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Register for Sunday Stillness"}
          </button>
        </form>
      )}
    </section>
  );
}
