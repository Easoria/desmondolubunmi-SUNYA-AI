import { useState } from "react";
import { Loader2 } from "lucide-react";

type Variant = "default" | "past";

export function GatheringInterestCapture({
  variant = "default",
  id,
}: {
  variant?: Variant;
  id?: string;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || done) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/gatherings-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong. Please try again.");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id={id} className="mx-auto w-full max-w-xl">
      {done ? (
        <p className="text-center text-sm text-[#b8d4e8]">You're on the list.</p>
      ) : (
        <>
          <p className="text-center text-sm text-[#b8d4e8]">
            {variant === "past"
              ? "This one has passed. Hear about the next."
              : "Hear about future gatherings"}
          </p>
          <form
            onSubmit={submit}
            className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              disabled={loading}
              className="w-full flex-1 rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-[#b8d4e8]/45 outline-none transition focus:border-[#7ec8e3]/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-[#7ec8e3]/50 bg-[#7ec8e3]/10 px-5 py-3 text-sm text-white transition hover:bg-[#7ec8e3]/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Notify me"}
            </button>
          </form>
          {variant === "default" ? (
            <p className="mt-3 text-center text-xs text-[#b8d4e8]/55">
              No spam. Only gathering announcements.
            </p>
          ) : null}
        </>
      )}
      {error ? (
        <div className="mt-3 text-center text-sm text-red-200">{error}</div>
      ) : null}
    </div>
  );
}
