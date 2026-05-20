import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, Lock, Globe, Zap, ArrowRight, Loader2, Plus, Send } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useSubscription } from "@/hooks/useSubscription";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { AuthModal } from "@/components/site/AuthModal";
import { SolutionCard } from "@/components/SolutionCard";
import { parseSolution, type Solution } from "@/lib/parse-solution";

const PROMPTS = [
  "I feel anxious",
  "I'm exhausted",
  "I can't focus",
  "I feel empty",
  "I'm overwhelmed",
  "I feel stuck",
  "I'm angry",
  "I feel numb",
  "Something feels off",
];

const MONTHLY_LIMIT = 2;
const GUEST_LIMIT = 2;
const GUEST_KEY = "sunya_guest_sessions_used";
const FP_KEY = "sunya_fp_id";
const READY_MARKER = "[SUNYA_READY]";
const MIN_REFLECT_MS = 2000;

type Msg = { role: "user" | "assistant"; content: string };
type Phase = "chat" | "reflecting" | "solution";

function currentMonthKey() {
  return new Date().toISOString().slice(0, 7); // YYYY-MM
}

export function SunyaAI() {
  const { user } = useAuth();
  const { isActive: isPaid } = useSubscription();
  const { openCheckout, checkoutElement } = useStripeCheckout();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [error, setError] = useState("");
  const [guestUsed, setGuestUsed] = useState(0);
  const [monthCount, setMonthCount] = useState(0);
  const [sessionsThisRun, setSessionsThisRun] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [phase, setPhase] = useState<Phase>("chat");
  const [solution, setSolution] = useState<Solution | null>(null);
  const [solutionCreatedAt, setSolutionCreatedAt] = useState<string | null>(null);
  const [chatFading, setChatFading] = useState(false);
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = parseInt(localStorage.getItem(GUEST_KEY) || "0", 10);
    setGuestUsed(isNaN(v) ? 0 : v);
    try {
      const prefill = sessionStorage.getItem("sunya_prefill");
      if (prefill) {
        setInput(prefill);
        sessionStorage.removeItem("sunya_prefill");
      }
    } catch {}
  }, []);

  // FingerprintJS: identify device, sync session count across storage resets
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let id = localStorage.getItem(FP_KEY);
        if (!id) {
          const FingerprintJS = (await import("@fingerprintjs/fingerprintjs")).default;
          const fp = await FingerprintJS.load();
          const result = await fp.get();
          id = result.visitorId;
          try { localStorage.setItem(FP_KEY, id); } catch {}
        }
        if (cancelled || !id) return;
        setVisitorId(id);

        const { supabase } = await import("@/integrations/supabase/client");
        const { data } = await supabase
          .from("fingerprint_sessions")
          .select("sessions_used")
          .eq("visitor_id", id)
          .maybeSingle();
        const remote = data?.sessions_used ?? 0;
        const local = parseInt(localStorage.getItem(GUEST_KEY) || "0", 10) || 0;
        const merged = Math.max(remote, local);
        if (merged !== local) {
          try { localStorage.setItem(GUEST_KEY, String(merged)); } catch {}
        }
        if (!cancelled) setGuestUsed(merged);
      } catch {
        /* fingerprint failures are non-blocking */
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Load monthly session count for logged-in free users
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase
        .from("user_profiles")
        .select("sessions_this_month,last_session_month")
        .eq("id", user.id)
        .single();
      if (data) {
        const m = currentMonthKey();
        setMonthCount(data.last_session_month === m ? (data.sessions_this_month ?? 0) : 0);
      }
    })();
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Hard wall: guest used >= 2; free user month >= 2; paid never blocked
  const usedCount = user ? monthCount : guestUsed;
  const limit = user ? MONTHLY_LIMIT : GUEST_LIMIT;
  const hardWall = !isPaid && usedCount >= limit;
  const exhausted = hardWall;

  function handleUpgrade() {
    openCheckout({
      priceId: "sunya_ai_founding_monthly",
      customerEmail: user?.email,
      userId: user?.id,
      returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });
  }


  async function persistMessage(role: "user" | "assistant", content: string, sid: string) {
    if (!user) return;
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.from("messages").insert({
      session_id: sid,
      user_id: user.id,
      role,
      content,
    });
  }

  async function ensureSession(): Promise<string | null> {
    if (!user) return null;
    if (sessionId) return sessionId;
    const { supabase } = await import("@/integrations/supabase/client");
    const { data, error } = await supabase
      .from("sessions")
      .insert({ user_id: user.id })
      .select("id")
      .single();
    if (error || !data) return null;
    setSessionId(data.id);
    return data.id;
  }

  async function finalizeSession(sid: string, history: Msg[], sol: Solution | null) {
    if (!user || history.length < 2) return;
    try {
      const res = await fetch("/api/session-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const { supabase } = await import("@/integrations/supabase/client");
      let title: string | null = null;
      let lever_tags: string[] = [];
      if (res.ok) {
        const data = (await res.json()) as { title: string | null; lever_tags: string[] };
        title = data.title;
        lever_tags = data.lever_tags ?? [];
      }
      const update = {
        title,
        lever_tags,
        ended_at: new Date().toISOString(),
        ...(sol ? { solution: sol as unknown as never } : {}),
      };
      await supabase.from("sessions").update(update).eq("id", sid);
    } catch {
      /* ignore */
    }
  }

  async function incrementSessionCount() {
    // Increment ONLY when a solution card is generated.
    setSessionsThisRun((n) => n + 1);
    if (!user) {
      const next = guestUsed + 1;
      setGuestUsed(next);
      try {
        localStorage.setItem(GUEST_KEY, String(next));
      } catch {}
      return;
    }
    if (isPaid) return;
    const { supabase } = await import("@/integrations/supabase/client");
    const m = currentMonthKey();
    const { data: prof } = await supabase
      .from("user_profiles")
      .select("sessions_this_month,last_session_month")
      .eq("id", user.id)
      .single();
    const base = prof?.last_session_month === m ? (prof?.sessions_this_month ?? 0) : 0;
    const next = base + 1;
    await supabase
      .from("user_profiles")
      .update({ sessions_this_month: next, last_session_month: m })
      .eq("id", user.id);
    setMonthCount(next);
  }

  async function callChat(history: Msg[], token: string | undefined): Promise<Response> {
    return fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ messages: history }),
    });
  }

  async function triggerSolutionFlow(history: Msg[], token: string | undefined, sid: string | null) {
    setPhase("reflecting");
    setChatFading(true);
    const startedAt = Date.now();

    // Append an instruction so the model returns the structured solution.
    const solutionRequest: Msg = {
      role: "user",
      content:
        "Please deliver the full solution response now. Structure it with The Mirror, The Insight, The Practices (2-4 named practices, each on its own block with name on first line and description on next lines, separated by a blank line), and The Reframe — separated by double line breaks. No markdown headers, no section labels.",
    };
    const solHistory = [...history, solutionRequest];

    let parsed: Solution | null = null;
    try {
      const res = await callChat(solHistory, token);
      if (res.ok) {
        const data = await res.json();
        const text: string = (data.text || "").replace(READY_MARKER, "").trim();
        parsed = parseSolution(text);
        if (sid) void persistMessage("assistant", text, sid);
      }
    } catch {
      /* ignore */
    }

    // Enforce minimum reflecting pause
    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_REFLECT_MS) {
      await new Promise((r) => setTimeout(r, MIN_REFLECT_MS - elapsed));
    }

    if (!parsed) {
      setError("Sunya could not complete the reading. Please try again.");
      setPhase("chat");
      setChatFading(false);
      return;
    }

    const now = new Date().toISOString();
    setSolution(parsed);
    setSolutionCreatedAt(now);
    setPhase("solution");

    // V15: increment session count ONLY when solution card is generated
    void incrementSessionCount();

    if (user && sid) {
      void finalizeSession(sid, history, parsed);
    }
  }

  async function submit(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    if (exhausted) return;
    setError("");

    const isFirstUserTurn = messages.length === 0;
    const newUserMsg: Msg = { role: "user", content };
    const history = [...messages, newUserMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    const sid = await ensureSession();
    if (sid) void persistMessage("user", content, sid);

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data: sessData } = await supabase.auth.getSession();
      const token = sessData.session?.access_token;
      const res = await callChat(history, token);
      if (res.status === 429) {
        const j = await res.json().catch(() => ({}));
        if (j?.error === "limit") {
          setError("You've used your free sessions. Upgrade for unlimited access.");
        } else {
          setError("The system is at capacity. Please try again in a moment.");
        }
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
      const rawReply: string = data.text || "";
      const hasMarker = rawReply.includes(READY_MARKER);
      const cleanReply = rawReply.replace(READY_MARKER, "").trim();

      const reply: Msg = { role: "assistant", content: cleanReply };
      const next = [...history, reply];
      setMessages(next);
      if (sid) void persistMessage("assistant", cleanReply, sid);

      // V15 PART 6: No mid-conversation interruptions. No auth prompts during chat.

      if (hasMarker) {
        setLoading(false);
        // Brief pause so the user can see Sunya's final reply, then enter reflecting state
        setTimeout(() => {
          void triggerSolutionFlow(next, token, sid);
        }, 900);
        return;
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function newSession() {
    if (sessionId && messages.length >= 2 && phase !== "solution") {
      void finalizeSession(sessionId, messages, null);
    }
    setMessages([]);
    setSessionId(null);
    setError("");
    setPhase("chat");
    setSolution(null);
    setSolutionCreatedAt(null);
    setChatFading(false);
  }

  // Finalize on unmount
  useEffect(() => {
    return () => {
      if (sessionId && messages.length >= 2 && phase !== "solution") {
        void finalizeSession(sessionId, messages, null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // ---------------- SOLUTION PHASE ----------------
  if (phase === "solution" && solution) {
    const showPrompt = !isPaid;
    // After Session 2 (free user hit limit) or guest used >=2 — final framing.
    // Otherwise soft.
    const variant: "soft" | "final" = hardWall ? "final" : "soft";
    return (
      <div className="animate-[fadeInUp_600ms_ease-out]">
        <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        <SolutionCard
          solution={solution}
          createdAt={solutionCreatedAt ?? undefined}
          conversation={messages}
          onNewSession={newSession}
        />
        {showPrompt && (
          <UpgradePrompt
            variant={variant}
            user={!!user}
            onUpgrade={handleUpgrade}
            onSignIn={() => setShowAuthPrompt(true)}
          />
        )}
        {checkoutElement}
      </div>
    );
  }


  // ---------------- REFLECTING PHASE ----------------
  if (phase === "reflecting") {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center sm:py-20"
        style={{ scrollMarginTop: 0 }}
      >
        <style>{`
          @keyframes sunyaSlowPing { 0% { transform: scale(1); opacity: 0.6; } 75%, 100% { transform: scale(1.6); opacity: 0; } }
          @keyframes sunyaSlowPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        `}</style>
        <div className="relative h-24 w-24">
          <div
            className="absolute inset-0 rounded-full bg-[#7ec8e3]/20"
            style={{ animation: "sunyaSlowPing 3.2s cubic-bezier(0,0,0.2,1) infinite" }}
          />
          <div
            className="absolute inset-2 rounded-full border border-[#7ec8e3]/40 bg-gradient-to-br from-[#7ec8e3]/20 to-[#2e6db4]/10"
            style={{ animation: "sunyaSlowPulse 3.2s ease-in-out infinite" }}
          />
          <div className="absolute inset-6 rounded-full bg-[#7ec8e3]/30 blur-md" />
          <div className="absolute inset-0 flex items-center justify-center text-2xl text-[#7ec8e3]">
            ✦
          </div>
        </div>
        <p className="mt-10 text-sm italic tracking-[0.3em] text-[#b8d4e8]/70">
          Sunya is reflecting…
        </p>
      </div>
    );
  }

  // ---------------- CHAT PHASE ----------------
  return (
    <div
      className={`glass-strong relative mx-auto max-w-3xl rounded-3xl p-6 transition-all duration-[600ms] ease-out sm:p-8 ${
        chatFading ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br from-[#7ec8e3]/20 via-transparent to-[#2e6db4]/20 blur-xl" />

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7ec8e3]/15 ring-1 ring-[#7ec8e3]/40">
          <Sparkles className="h-4 w-4 text-[#7ec8e3]" />
        </div>
        <div>
          <div className="text-sm font-medium text-white">Sunya AI</div>
          <div className="text-xs text-[#b8d4e8]/70">Personal diagnostic intelligence</div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {messages.length > 0 && (
            <button
              onClick={newSession}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-[#b8d4e8] hover:border-[#7ec8e3]/40 hover:text-white"
            >
              <Plus className="h-3 w-3" /> New
            </button>
          )}
          {!isPaid && (
            <div className="flex flex-col items-end leading-tight text-[#b8d4e8]/60 sm:flex-row sm:items-baseline sm:gap-1">
              <span className="text-xs">{Math.max(0, limit - usedCount)} / {limit}</span>
              <span className="text-[10px] sm:text-xs">free</span>
            </div>
          )}
        </div>
      </div>

      {messages.length === 0 && exhausted ? (
        <UpgradePrompt
          variant="wall"
          user={!!user}
          onUpgrade={handleUpgrade}
          onSignIn={() => setShowAuthPrompt(true)}
        />
      ) : messages.length === 0 ? (
        <div>
          <label className="label-eyebrow block">How are you right now?</label>
          <p className="mt-1 text-sm text-[#b8d4e8]/80">
            Tell me what's happening — however you want to say it.
          </p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading || exhausted}
            rows={4}
            placeholder="How are you right now? Say whatever comes..."
            className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-base text-white placeholder:text-[#b8d4e8]/40 outline-none transition focus:border-[#7ec8e3]/50 focus:bg-white/[0.07] disabled:opacity-50"
          />

          <div className="mt-4">
            <div className="mb-3 text-center text-xs uppercase tracking-[0.32em] text-[#b8d4e8]/60">
              — or pick one to start —
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => setInput(p)}
                  disabled={loading || exhausted}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#b8d4e8] transition hover:border-[#7ec8e3]/40 hover:bg-white/10 hover:text-white disabled:opacity-50 sm:text-sm"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => submit()}
            disabled={loading || exhausted || !input.trim()}
            className="glow-btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-medium tracking-wide disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sensing your situation...
              </>
            ) : (
              <>
                Begin <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      ) : (
        <div>
          <div
            ref={scrollRef}
            className="max-h-[60vh] space-y-4 overflow-y-auto pr-1 [scrollbar-gutter:stable] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white"
                    : "max-w-[92%] rounded-2xl border border-[#7ec8e3]/25 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-5 text-[15px] leading-relaxed text-white/90"
                }
              >
                {m.role === "assistant" && (
                  <div className="label-eyebrow mb-2 text-[10px]">Sunya</div>
                )}
                <div className="whitespace-pre-wrap">{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-[#b8d4e8]">
                <Loader2 className="h-4 w-4 animate-spin" /> Sunya is reflecting...
              </div>
            )}
          </div>

          <div className="relative mt-5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading || exhausted}
              rows={2}
              placeholder="Continue the conversation..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-3 pr-14 text-sm text-white placeholder:text-[#b8d4e8]/40 outline-none focus:border-[#7ec8e3]/50 disabled:opacity-50"
            />
            <button
              onClick={() => submit()}
              disabled={loading || exhausted || !input.trim()}
              aria-label="Send"
              className="glow-btn absolute bottom-2.5 right-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full p-0 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>

          {messages.some((m) => m.role === "assistant") && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
              <Link
                to="/work-with-me"
                className="rounded-full border border-white/10 px-4 py-2 text-[#b8d4e8] hover:border-white/30 hover:text-white"
              >
                Go deeper — book a 1-on-1
              </Link>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
          <div>{error}</div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-[#b8d4e8]/40">
        <span className="inline-flex items-center gap-1">
          <Lock className="h-2.5 w-2.5" /> Private & Confidential
        </span>
        <span className="inline-flex items-center gap-1">
          <Globe className="h-2.5 w-2.5" /> No belief system required
        </span>
        <span className="inline-flex items-center gap-1">
          <Zap className="h-2.5 w-2.5" /> Powered by the Sunya framework
        </span>
      </div>

      {checkoutElement}
      <AuthModal
        open={showAuthPrompt && !user}
        onClose={() => setShowAuthPrompt(false)}
        defaultMode="signin"
        contextMessage="Sign in or create your free account to continue."
        onAuthSuccess={async () => {
          try {
            const { supabase } = await import("@/integrations/supabase/client");
            const { data: u } = await supabase.auth.getUser();
            const uid = u.user?.id;
            if (uid && messages.length > 0) {
              const { data: sess } = await supabase
                .from("sessions")
                .insert({ user_id: uid })
                .select("id")
                .single();
              if (sess) {
                await supabase.from("messages").insert(
                  messages.map((m) => ({
                    session_id: sess.id,
                    user_id: uid,
                    role: m.role,
                    content: m.content,
                  })),
                );
              }
            }
          } catch {
            /* non-blocking */
          }
          navigate({ to: "/dashboard" });
        }}
      />
    </div>
  );
}

function UpgradePrompt({
  variant,
  user,
  onUpgrade,
  onSignIn,
}: {
  variant: "soft" | "final" | "wall";
  user: boolean;
  onUpgrade: () => void;
  onSignIn: () => void;
}) {
  const isWall = variant === "wall";
  const isFinal = variant === "final";
  return (
    <div className="glass-strong mx-auto mt-6 max-w-2xl rounded-3xl border border-[#7ec8e3]/30 p-7 text-center shadow-[0_0_60px_-20px_rgba(126,200,227,0.55)]">
      <div className="display text-xl text-white sm:text-2xl">
        {isWall
          ? "✦ Unlock unlimited access to Sunya AI"
          : isFinal
            ? "You've used your free sessions"
            : "✦ Unlock unlimited access to Sunya AI"}
      </div>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#b8d4e8]">
        {isWall
          ? "You've used your free sessions. Get full access for unlimited sessions, permanent reading history, and PDF downloads."
          : isFinal
            ? "Unlock unlimited access to Sunya AI — save every reading, download PDFs, and return whenever you need clarity."
            : "Save your readings permanently, download PDFs, and get unlimited sessions whenever you need them."}
      </p>
      <p className="mt-3 text-xs text-[#b8d4e8]/70">€19/month · Cancel anytime</p>
      <button
        onClick={onUpgrade}
        className="glow-btn mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
      >
        Get Full Access <ArrowRight className="h-4 w-4" />
      </button>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#b8d4e8]">
        <button onClick={onSignIn} className="hover:text-white">
          {'\u200B'}
        </button>
        {isWall && user && (
          <span className="text-[#b8d4e8]/70">{"\u200B"}</span>
        )}
      </div>
    </div>
  );
}
