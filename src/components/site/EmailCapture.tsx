import { useState } from "react";
import { Loader2 } from "lucide-react";

export type EmailCaptureVariant =
  | "framework"
  | "practice"
  | "philosophy"
  | "home"
  | "writing"
  | "vision"
  | "sunya-ai"
  | "problem"
  | "problems";

const COPY: Record<
  Exclude<EmailCaptureVariant, "vision" | "sunya-ai">,
  { title: string; body: string; button: string }
> = {
  framework: {
    title: "Get the next part when it lands",
    body: "New writing on consciousness, practice, and the framework — occasionally, when there is something worth sending.",
    button: "Send it to me",
  },
  practice: {
    title: "One practice at a time",
    body: "Occasional writing on the levers, the practices, and how to actually work with them.",
    button: "Sign me up",
  },
  philosophy: {
    title: "The rest of the map",
    body: "The complete framework, new writing, and gatherings as they are announced.",
    button: "Stay in touch",
  },
  home: {
    title: "Stay close to the work",
    body: "Occasional writing, new practices, and gatherings — in Dublin and online.",
    button: "Join the list",
  },
  writing: {
    title: "New writing, when it comes",
    body: "No schedule. Only when there is something worth reading.",
    button: "Notify me",
  },
  problem: {
    title: "When the night is hard",
    body: "Occasional notes on sleep, practice, and what actually helps — quiet, useful, no noise.",
    button: "Send it to me",
  },
  problems: {
    title: "Start where you are",
    body: "Occasional notes when a new problem page lands — practical, quiet, no noise.",
    button: "Notify me",
  },
};

type Props = {
  /** When omitted, renders a compact form-only control (used on /vision). */
  variant?: EmailCaptureVariant;
  id?: string;
  className?: string;
};

export function EmailCapture({ variant, id, className = "" }: Props) {
  const source: EmailCaptureVariant = variant ?? "vision";
  const copy =
    source === "vision" || source === "sunya-ai" ? null : COPY[source];
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || done) return;
    setLoading(true);
    try {
      await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      // Always show success — including already-subscribed.
      setDone(true);
    } catch {
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div id={id} className={className}>
        <p className="text-center text-sm text-[#b8d4e8]">You're on the list.</p>
      </div>
    );
  }

  // Compact form for pages that already supply surrounding copy (e.g. /vision).
  if (!copy) {
    return (
      <div id={id} className={`mx-auto w-full max-w-xl ${className}`}>
        <form
          onSubmit={submit}
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            disabled={loading}
            autoComplete="email"
            className="w-full flex-1 rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#b8d4e8]/40 outline-none transition focus:border-[#7ec8e3]/40 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-white/15 bg-white/[0.06] px-5 py-3 text-sm text-[#e8f4fb] transition hover:border-white/25 hover:bg-white/[0.1] disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Stay Connected"}
          </button>
        </form>
        <p className="mt-3 text-center text-xs text-[#b8d4e8]/50">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    );
  }

  return (
    <div
      id={id}
      className={`rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-7 backdrop-blur-sm sm:px-8 sm:py-8 ${className}`}
    >
      <div className="mx-auto w-full max-w-xl">
        <h3 className="text-center font-display text-xl text-white sm:text-2xl">
          {copy.title}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-[#b8d4e8]/80">
          {copy.body}
        </p>
        <form
          onSubmit={submit}
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            disabled={loading}
            autoComplete="email"
            className="w-full flex-1 rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#b8d4e8]/40 outline-none transition focus:border-[#7ec8e3]/40 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-white/15 bg-white/[0.06] px-5 py-3 text-sm text-[#e8f4fb] transition hover:border-white/25 hover:bg-white/[0.1] disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : copy.button}
          </button>
        </form>
        <p className="mt-3 text-center text-xs text-[#b8d4e8]/50">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
