import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, Loader2, Search, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SolutionCard } from "@/components/SolutionCard";
import type { Solution } from "@/lib/parse-solution";

export const Route = createFileRoute("/sessions")({
  component: SessionsPage,
  head: () => ({
    meta: [{ title: "Session history — Sunya" }, { name: "robots", content: "noindex" }],
  }),
});

const LEVERS = [
  "All",
  "Breath",
  "Awareness",
  "Heart",
  "Mind",
  "Movement",
  "Sound",
  "Sleep",
  "Nutrition",
  "Connection",
  "Environment",
  "Nature",
  "Sustenance",
] as const;

type SessionRow = {
  id: string;
  created_at: string;
  title: string | null;
  lever_tags: string[] | null;
  solution: Solution | null;
};
type MessageRow = { id: string; role: "user" | "assistant"; content: string };

function SessionsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [messages, setMessages] = useState<Record<string, MessageRow[]>>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [lever, setLever] = useState<(typeof LEVERS)[number]>("All");
  const [loadingList, setLoadingList] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoadingList(true);
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase
        .from("sessions")
        .select("id,created_at,title,lever_tags,solution")
        .order("created_at", { ascending: false });
      setSessions((data ?? []) as SessionRow[]);
      setLoadingList(false);
    })();
  }, [user]);

  async function toggle(id: string) {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    setOpenId(id);
    if (!messages[id]) {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase
        .from("messages")
        .select("id,role,content")
        .eq("session_id", id)
        .order("created_at", { ascending: true });
      setMessages((m) => ({ ...m, [id]: (data ?? []) as MessageRow[] }));
    }
  }

  async function deleteSession(id: string) {
    if (!confirm("Delete this session permanently?")) return;
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.from("sessions").delete().eq("id", id);
    setSessions((s) => s.filter((x) => x.id !== id));
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sessions.filter((s) => {
      if (lever !== "All" && !(s.lever_tags ?? []).includes(lever)) return false;
      if (!q) return true;
      const inTitle = (s.title ?? "").toLowerCase().includes(q);
      const inMsgs = (messages[s.id] ?? []).some((m) => m.content.toLowerCase().includes(q));
      return inTitle || inMsgs;
    });
  }, [sessions, query, lever, messages]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a1628] text-[#b8d4e8]">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-28">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-[#b8d4e8] hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
        </Link>
        <div className="mt-6">
          <div className="label-eyebrow">All sessions</div>
          <h1 className="display mt-3 text-4xl text-white sm:text-5xl">Session history</h1>
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <Search className="h-4 w-4 text-[#b8d4e8]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search session titles and content..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-[#b8d4e8]/40 outline-none"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {LEVERS.map((l) => (
            <button
              key={l}
              onClick={() => setLever(l)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                lever === l
                  ? "border-[#7ec8e3]/60 bg-[#7ec8e3]/10 text-white"
                  : "border-white/10 bg-white/5 text-[#b8d4e8] hover:border-[#7ec8e3]/40 hover:text-white"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          {loadingList ? (
            <div className="flex items-center gap-2 text-sm text-[#b8d4e8]">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading...
            </div>
          ) : filtered.length === 0 ? (
            <div className="glass-card p-8 text-center text-sm text-[#b8d4e8]">
              No sessions match.
            </div>
          ) : (
            filtered.map((s) => {
              const isOpen = openId === s.id;
              return (
                <div key={s.id} className="glass-card overflow-hidden">
                  <div className="flex items-center gap-3 p-4">
                    <button
                      onClick={() => toggle(s.id)}
                      className="flex flex-1 items-center gap-3 text-left"
                    >
                      <ChevronDown
                        className={`h-4 w-4 text-[#7ec8e3] transition ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                      <div className="flex-1">
                        <div className="text-sm text-white">
                          {s.title ||
                            `Session — ${new Date(s.created_at).toLocaleDateString()}`}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#b8d4e8]/70">
                          <span>{new Date(s.created_at).toLocaleString()}</span>
                          {(s.lever_tags ?? []).map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-[#7ec8e3]/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#7ec8e3]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => deleteSession(s.id)}
                      aria-label="Delete"
                      className="rounded-full p-2 text-[#b8d4e8] hover:bg-white/5 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  {isOpen && (
                    <div className="border-t border-white/10 bg-black/20 p-5">
                      {s.solution ? (
                        <SolutionCard
                          solution={s.solution}
                          createdAt={s.created_at}
                          conversation={messages[s.id] ?? []}
                          isPastView
                        />
                      ) : (
                        <div className="space-y-3">
                          {(messages[s.id] ?? []).map((m) => (
                            <div
                              key={m.id}
                              className={
                                m.role === "user"
                                  ? "ml-auto max-w-[85%] rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                                  : "max-w-[92%] rounded-2xl border border-[#7ec8e3]/25 bg-white/[0.04] p-4 text-sm leading-relaxed text-white/90"
                              }
                            >
                              <div className="whitespace-pre-wrap">{m.content}</div>
                            </div>
                          ))}
                          {(messages[s.id]?.length ?? 0) === 0 && (
                            <div className="text-center text-xs text-[#b8d4e8]/60">
                              No messages in this session.
                            </div>
                          )}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                            <Link to="/sunya-ai" className="text-[#7ec8e3] hover:text-white">
                              Start a follow-up session →
                            </Link>
                            <button
                              onClick={() => deleteSession(s.id)}
                              className="text-[#b8d4e8]/60 hover:text-red-300"
                            >
                              Delete this session
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
