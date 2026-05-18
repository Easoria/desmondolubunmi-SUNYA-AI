import { useState } from "react";
import { ArrowRight, Loader2, Check } from "lucide-react";

export function EmailCapture({ id }: { id?: string }) {
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
      const res = await fetch("/api/community-signup", {
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
        <div className="glass-strong rounded-2xl p-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#7ec8e3]/15 ring-1 ring-[#7ec8e3]/40">
            <Check className="h-4 w-4 text-[#7ec8e3]" />
          </div>
          <div className="display text-xl text-white">You're in.</div>
          <p className="mt-1 text-sm text-[#b8d4e8]">Welcome to Sunya. Watch your inbox.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            disabled={loading}
            className="glass-strong w-full rounded-full px-5 py-3.5 text-sm text-white placeholder:text-[#b8d4e8]/50 outline-none transition focus:border-[#7ec8e3]/50 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="glow-btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-medium disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Stay Connected <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>
      )}
      {error && (
        <div className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-center text-sm text-red-100">
          {error}
        </div>
      )}
      {!done && (
        <p className="mt-3 text-center text-xs italic text-[#b8d4e8]/60">No spam. Unsubscribe anytime.</p>
      )}
    </div>
  );
}
