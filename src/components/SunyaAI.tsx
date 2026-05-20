import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, Lock, Globe, Zap, ArrowRight, Loader2, Plus } from "lucide-react";
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
const READY_MARKER = "[SUNYA_READY]";
const MIN_REFLECT_MS = 2000;

type Msg = { role: "user" | "assistant"; content: string };
type Phase = "chat" | "reflecting" | "solution";

export function SunyaAI() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [error, setError] = useState("");
  const [uses, setUses] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [limitHit, setLimitHit] = useState(false);
  const [phase, setPhase] = useState<Phase>("chat");
  const [solution, setSolution] = useState<Solution | null>(null);
  const [solutionCreatedAt, setSolutionCreatedAt] = useState<string | null>(null);
  const [chatFading, setChatFading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const exhausted = !user && uses >= FREE_LIMIT;

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

  async function bumpSessionsToday() {
    if (!user) return;
    const { supabase } = await import("@/integrations/supabase/client");
    const today = new Date().toISOString().slice(0, 10);
    const { data: prof } = await supabase
      .from("user_profiles")
      .select("sessions_today,last_session_date")
      .eq("id", user.id)
      .single();
    const todays = prof?.last_session_date === today ? (prof?.sessions_today ?? 0) : 0;
    await supabase
      .from("user_profiles")
      .update({ sessions_today: todays + 1, last_session_date: today })
      .eq("id", user.id);
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
    if (user && isFirstUserTurn) void bumpSessionsToday();

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data: sessData } = await supabase.auth.getSession();
      const token = sessData.session?.access_token;
      const res = await callChat(history, token);
      if (res.status === 429) {
        const j = await res.json().catch(() => ({}));
        if (j?.error === "limit") {
          setLimitHit(true);
          setError("You've used your 3 free sessions for today. Upgrade for unlimited access.");
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

      if (!user) {
        const n = uses + 1;
        setUses(n);
        localStorage.setItem(STORAGE_KEY, String(n));
        if (history.filter((m) => m.role === "user").length === 1 && !hasMarker) {
          setTimeout(() => setShowAuthPrompt(true), 400);
        }
      }

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
    return (
      <div className="animate-[fadeInUp_600ms_ease-out]">
        <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        <SolutionCard
          solution={solution}
          createdAt={solutionCreatedAt ?? undefined}
          conversation={messages}
          onNewSession={newSession}
        />
      </div>
    );
  }

  // ---------------- REFLECTING PHASE ----------------
  if (phase === "reflecting") {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 animate-ping rounded-full bg-[#7ec8e3]/20" />
          <div className="absolute inset-2 animate-pulse rounded-full border border-[#7ec8e3]/40 bg-gradient-to-br from-[#7ec8e3]/20 to-[#2e6db4]/10" />
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
          {!user && (
            <div className="text-xs text-[#b8d4e8]/60">
              {Math.max(0, FREE_LIMIT - uses)} / {FREE_LIMIT} free
            </div>
          )}
        </div>
      </div>

      {messages.length === 0 ? (
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
            className="max-h-[60vh] space-y-4 overflow-y-auto pr-1 [scrollbar-gutter:stable]"
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

          <div className="mt-5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading || exhausted}
              rows={2}
              placeholder="Continue the conversation..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  submit();
                }
              }}
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder:text-[#b8d4e8]/40 outline-none focus:border-[#7ec8e3]/50 disabled:opacity-50"
            />
            <button
              onClick={() => submit()}
              disabled={loading || exhausted || !input.trim()}
              className="glow-btn mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send <ArrowRight className="h-4 w-4" /></>}
            </button>
          </div>

          {messages.some((m) => m.role === "assistant") && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
              {!user && (
                <button
                  onClick={() => setShowAuthPrompt(true)}
                  className="rounded-full border border-[#7ec8e3]/40 bg-[#7ec8e3]/10 px-4 py-2 text-white hover:bg-[#7ec8e3]/20"
                >
                  This helped — save my session
                </button>
              )}
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
          {limitHit && user && (
            <button
              onClick={() => setShowUpgrade(true)}
              className="glow-btn mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
            >
              Unlock Full Access — €19/month <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      )}


      {exhausted && !loading && (
        <div className="mt-6 rounded-2xl border border-[#7ec8e3]/30 bg-[#7ec8e3]/5 p-5 text-center">
          <div className="display text-xl text-white">
            ✦ You've used your free sessions for today
          </div>
          <p className="mt-2 text-sm text-[#b8d4e8]">
            Unlock full access for <span className="text-white">€19/month</span> — unlimited
            sessions, saved history, and lever tracking over time.
          </p>
          <p className="mt-2 text-xs italic text-[#b8d4e8]/70">
            Founding rate. Price increases as Sunya grows.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setShowAuthPrompt(true)}
              className="glow-btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
            >
              Create free account <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
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

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} variant="limit" />
      <AuthModal
        open={showAuthPrompt && !user}
        onClose={() => setShowAuthPrompt(false)}
        defaultMode="signup"
        contextMessage="Create a free account to save this session and access it anytime."
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
