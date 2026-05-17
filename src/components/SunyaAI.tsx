import { useEffect, useRef, useState } from "react";
import { Sparkles, Lock, Globe, Zap, ArrowRight, Loader2 } from "lucide-react";

const PROMPTS = [
  "I feel empty",
  "I'm anxious",
  "I can't focus",
  "I feel lost",
  "I'm exhausted",
  "I want more",
];

const FREE_LIMIT = 3;
const STORAGE_KEY = "sunya_free_uses";

export function SunyaAI() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [uses, setUses] = useState(0);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    setUses(isNaN(v) ? 0 : v);
    try {
      const prefill = sessionStorage.getItem("sunya_prefill");
      if (prefill) {
        setInput(prefill);
        sessionStorage.removeItem("sunya_prefill");
      }
    } catch {}
  }, []);

  const exhausted = uses >= FREE_LIMIT;

  async function submit() {
    const text = input.trim();
    if (!text || loading) return;
    if (exhausted) return;
    setLoading(true);
    setError("");
    setResponse("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (res.status === 429) {
        setError("The system is at capacity. Please try again in a moment.");
        return;
      }
      if (res.status === 402) {
        setError("AI credits exhausted. Please add credits to continue.");
        return;
      }
      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        return;
      }
      const data = await res.json();
      setResponse(data.text || "");
      const next = uses + 1;
      setUses(next);
      localStorage.setItem(STORAGE_KEY, String(next));
      setTimeout(() => responseRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-strong relative mx-auto max-w-3xl rounded-3xl p-6 sm:p-10">
      <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br from-[#7ec8e3]/20 via-transparent to-[#2e6db4]/20 blur-xl" />

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7ec8e3]/15 ring-1 ring-[#7ec8e3]/40">
          <Sparkles className="h-4 w-4 text-[#7ec8e3]" />
        </div>
        <div>
          <div className="text-sm font-medium text-white">Sunya AI</div>
          <div className="text-xs text-[#b8d4e8]/70">Personal diagnostic intelligence</div>
        </div>
        <div className="ml-auto text-xs text-[#b8d4e8]/60">
          {Math.max(0, FREE_LIMIT - uses)} / {FREE_LIMIT} free sessions
        </div>
      </div>

      <label className="label-eyebrow block">What are you experiencing right now?</label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading || exhausted}
        rows={4}
        placeholder="Describe how you're feeling, what's bothering you, or what you're trying to understand..."
        className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-base text-white placeholder:text-[#b8d4e8]/40 outline-none transition focus:border-[#7ec8e3]/50 focus:bg-white/[0.07] disabled:opacity-50"
      />

      <button
        onClick={submit}
        disabled={loading || exhausted || !input.trim()}
        className="glow-btn mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-medium tracking-wide disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sensing your situation...
          </>
        ) : (
          <>
            Analyse My Situation
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <div className="mt-6">
        <div className="mb-3 text-center text-xs uppercase tracking-[0.32em] text-[#b8d4e8]/60">
          — or explore common entry points —
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => setInput(p)}
              disabled={loading || exhausted}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#b8d4e8] transition hover:border-[#7ec8e3]/40 hover:bg-white/10 hover:text-white disabled:opacity-50"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
          {error}
        </div>
      )}

      {response && (
        <div
          ref={responseRef}
          className="reveal mt-6 rounded-2xl border border-[#7ec8e3]/25 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6"
        >
          <div className="label-eyebrow mb-3">Sunya AI's response</div>
          <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-white/90">{response}</div>
        </div>
      )}

      {exhausted && !loading && (
        <div className="mt-6 rounded-2xl border border-[#7ec8e3]/30 bg-[#7ec8e3]/5 p-5 text-center">
          <div className="display text-xl text-white">You've used your free sessions.</div>
          <p className="mt-2 text-sm text-[#b8d4e8]">
            Unlimited access from <span className="text-white">€29/month</span>. Continue the diagnostic
            anytime.
          </p>
          <button className="glow-btn mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium">
            Subscribe — €29/month
          </button>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-[#b8d4e8]/70">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <Lock className="h-3 w-3" /> Private & Confidential
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <Globe className="h-3 w-3" /> No belief system required
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <Zap className="h-3 w-3" /> Powered by the Sunya framework
        </span>
      </div>
    </div>
  );
}
