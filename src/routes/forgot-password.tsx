import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Starfield } from "@/components/Starfield";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPage,
  head: () => ({
    meta: [{ title: "Reset password — Sunya" }, { name: "robots", content: "noindex" }],
  }),
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <main className="relative flex min-h-[calc(100vh-200px)] items-center justify-center overflow-hidden px-6 pt-24 pb-16">
        <Starfield density={0.5} />
        <div className="glass-strong relative z-10 w-full max-w-md rounded-3xl p-8">
          <h1 className="display text-3xl text-white">Reset your password</h1>
          <p className="mt-2 text-sm text-[#b8d4e8]">We'll send a reset link to your email.</p>
          {sent ? (
            <div className="mt-6 rounded-2xl border border-[#7ec8e3]/30 bg-[#7ec8e3]/10 p-5 text-sm text-[#b8d4e8]">
              Check your inbox for the reset link.
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-[#b8d4e8]/40 outline-none focus:border-[#7ec8e3]/50"
                placeholder="you@example.com"
              />
              {error && <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">{error}</div>}
              <button type="submit" disabled={loading} className="glow-btn inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-medium disabled:opacity-50">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send reset link <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          )}
          <div className="mt-6 text-center text-xs text-[#b8d4e8]">
            <Link to="/login" className="hover:text-white">Back to sign in</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
