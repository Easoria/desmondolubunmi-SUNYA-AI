import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Loader2, Mail, Lock } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Starfield } from "@/components/Starfield";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [{ title: "Sign in — Sunya" }, { name: "robots", content: "noindex" }],
  }),
});

function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    if (user) navigate({ to: "/dashboard" });
  }, [user, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (error) throw error;
        setInfo("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.invalidate();
        navigate({ to: "/dashboard" });
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <main className="relative flex min-h-[calc(100vh-200px)] items-center justify-center overflow-hidden px-6 pt-24 pb-16">
        <Starfield density={0.6} />
        <div className="glass-strong relative z-10 w-full max-w-md rounded-3xl p-8">
          <div className="text-center">
            <div className="label-eyebrow">{mode === "signin" ? "Welcome back" : "Create your account"}</div>
            <h1 className="display mt-3 text-3xl text-white">
              {mode === "signin" ? "Sign in to Sunya" : "Begin your practice"}
            </h1>
            <p className="mt-2 text-sm text-[#b8d4e8]">
              {mode === "signin"
                ? "Continue your sessions and track your progress."
                : "Save your sessions, track your progress, return anytime."}
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="label-eyebrow block">Email</label>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b8d4e8]/60" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-white placeholder:text-[#b8d4e8]/40 outline-none focus:border-[#7ec8e3]/50"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="label-eyebrow block">Password</label>
              <div className="relative mt-2">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b8d4e8]/60" />
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-white placeholder:text-[#b8d4e8]/40 outline-none focus:border-[#7ec8e3]/50"
                  placeholder="At least 8 characters"
                />
              </div>
            </div>

            {error && <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">{error}</div>}
            {info && <div className="rounded-xl border border-[#7ec8e3]/30 bg-[#7ec8e3]/10 p-3 text-sm text-[#b8d4e8]">{info}</div>}

            <button
              type="submit"
              disabled={loading}
              className="glow-btn inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-medium disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>
                {mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="h-4 w-4" />
              </>}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-xs text-[#b8d4e8]">
            <button
              type="button"
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); setInfo(""); }}
              className="hover:text-white"
            >
              {mode === "signin" ? "No account? Sign up" : "Have an account? Sign in"}
            </button>
            <Link to="/forgot-password" className="hover:text-white">
              Forgot password?
            </Link>
          </div>

          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.25em] text-[#b8d4e8]/50">
            By continuing you agree to our{" "}
            <Link to="/terms" className="underline hover:text-white">Terms</Link> &{" "}
            <Link to="/privacy" className="underline hover:text-white">Privacy</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
