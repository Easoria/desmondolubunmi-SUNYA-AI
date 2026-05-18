import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Loader2, Trash2, Download, LogOut, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({ meta: [{ title: "Dashboard — Sunya" }, { name: "robots", content: "noindex" }] }),
});

type SessionRow = { id: string; created_at: string; title: string | null; summary: string | null };
type MessageRow = { id: string; role: "user" | "assistant"; content: string; created_at: string };

function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, MessageRow[]>>({});
  const [loadingSessions, setLoadingSessions] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoadingSessions(true);
      const { data } = await supabase
        .from("sessions")
        .select("id,created_at,title,summary")
        .order("created_at", { ascending: false });
      setSessions(data ?? []);
      setLoadingSessions(false);
    })();
  }, [user]);

  async function toggle(id: string) {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    setOpenId(id);
    if (!messages[id]) {
      const { data } = await supabase
        .from("messages")
        .select("id,role,content,created_at")
        .eq("session_id", id)
        .order("created_at", { ascending: true });
      setMessages((m) => ({ ...m, [id]: (data ?? []) as MessageRow[] }));
    }
  }

  async function deleteSession(id: string) {
    if (!confirm("Delete this session permanently?")) return;
    await supabase.from("sessions").delete().eq("id", id);
    setSessions((s) => s.filter((x) => x.id !== id));
  }

  async function exportData() {
    const { data: sess } = await supabase.from("sessions").select("*");
    const { data: msgs } = await supabase.from("messages").select("*");
    const blob = new Blob([JSON.stringify({ sessions: sess, messages: msgs }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sunya-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function deleteAccount() {
    if (!confirm("Permanently delete your account and all sessions? This cannot be undone.")) return;
    await supabase.from("sessions").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await signOut();
    navigate({ to: "/" });
  }

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
      <Breadcrumb />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="label-eyebrow">Your dashboard</div>
            <h1 className="display mt-3 text-4xl text-white sm:text-5xl">
              Welcome back<span className="display-italic text-[#b8d4e8]">.</span>
            </h1>
            <p className="mt-2 text-sm text-[#b8d4e8]">{user.email}</p>
          </div>
          <Link
            to="/sunya-ai"
            className="glow-btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
          >
            New session <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <section className="mt-10">
          <h2 className="display text-2xl text-white">Session history</h2>
          {loadingSessions ? (
            <div className="mt-6 flex items-center gap-2 text-sm text-[#b8d4e8]">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading...
            </div>
          ) : sessions.length === 0 ? (
            <div className="glass-card mt-6 p-8 text-center text-sm text-[#b8d4e8]">
              No saved sessions yet. Start one to begin.
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {sessions.map((s) => {
                const isOpen = openId === s.id;
                return (
                  <div key={s.id} className="glass-card overflow-hidden">
                    <div className="flex items-center gap-3 p-4">
                      <button
                        onClick={() => toggle(s.id)}
                        className="flex flex-1 items-center gap-3 text-left"
                      >
                        <ChevronDown
                          className={`h-4 w-4 text-[#7ec8e3] transition ${isOpen ? "rotate-180" : ""}`}
                        />
                        <div className="flex-1">
                          <div className="text-sm text-white">
                            {s.title || `Session — ${new Date(s.created_at).toLocaleDateString()}`}
                          </div>
                          <div className="text-xs text-[#b8d4e8]/70">
                            {new Date(s.created_at).toLocaleString()}
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
                      <div className="space-y-3 border-t border-white/10 p-4">
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
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="mt-16">
          <h2 className="display text-2xl text-white">Account</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={exportData}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm text-white hover:border-[#7ec8e3]/40"
            >
              <Download className="h-4 w-4" /> Download my data
            </button>
            <button
              onClick={() => signOut().then(() => navigate({ to: "/" }))}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm text-white hover:border-[#7ec8e3]/40"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
            <button
              onClick={deleteAccount}
              className="inline-flex items-center gap-2 rounded-full border border-red-400/30 px-4 py-2.5 text-sm text-red-200 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" /> Delete all my data
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
