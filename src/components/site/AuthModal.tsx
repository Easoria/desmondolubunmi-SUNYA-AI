import { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Loader2, X } from "lucide-react";
import {
  flushMailerliteConsent,
  setMailerliteConsentPending,
} from "@/lib/mailerlite-consent";

type Props = {
  open: boolean;
  onClose?: () => void;
  dismissible?: boolean;
  contextMessage?: string;
  defaultMode?: "signin" | "signup";
  onAuthSuccess?: () => void | Promise<void>;
};

export function AuthModal({
  open,
  onClose,
  dismissible = true,
  contextMessage,
  defaultMode = "signin",
  onAuthSuccess,
}: Props) {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setMode(defaultMode);
      setError("");
      setInfo("");
      setMarketingConsent(false);
    }
  }, [open, defaultMode]);

  if (!open) return null;

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setInfo("Check your email for a reset link.");
        return;
      }
      if (mode === "signup") {
        setMailerliteConsentPending(marketingConsent);
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (error) throw error;
        if (marketingConsent) await flushMailerliteConsent(email);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      router.invalidate();
      await onAuthSuccess?.();
      onClose?.();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      // Consent applies when creating an account; sign-in ignores an unticked box.
      if (mode === "signup") setMailerliteConsentPending(marketingConsent);
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin + "/dashboard" },
      });
      if (error) throw error;
      // Browser will redirect to Google. If it doesn't, refresh router state.
      router.invalidate();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
      setLoading(false);
    }
  }

  const isSignUp = mode === "signup";
  const isForgot = mode === "forgot";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0a1628]/85 p-4 backdrop-blur-md animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (!dismissible) return;
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="glass-strong relative w-full max-w-md rounded-3xl p-7 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {dismissible && onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-1.5 text-[#b8d4e8] hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="text-center">
          <div className="display text-xl tracking-[0.4em] text-white">✦ SUNYA</div>
          <h2 className="display mt-3 text-2xl text-white">
            {isForgot
              ? "Reset your password"
              : isSignUp
                ? "Create your account"
                : "Welcome back"}
          </h2>
          {contextMessage && !isForgot && (
            <p className="mt-2 text-sm italic text-[#b8d4e8]">{contextMessage}</p>
          )}
        </div>

        {isSignUp && (
          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs leading-relaxed text-[#b8d4e8]">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-transparent text-[#7ec8e3] focus:ring-[#7ec8e3]/40"
            />
            <span>
              Send me occasional writing, new practices, and gathering announcements.
            </span>
          </label>
        )}

        {!isForgot && (
          <>
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className={`${isSignUp ? "mt-4" : "mt-6"} flex w-full items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#1f1f1f] shadow-sm transition hover:bg-white/95 disabled:opacity-60`}
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#b8d4e8]/50">
              <div className="h-px flex-1 bg-white/10" />
              or
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </>
        )}

        <form onSubmit={handleEmail} className="space-y-3">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b8d4e8]/60" />
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-sm text-white placeholder:text-[#b8d4e8]/40 outline-none focus:border-[#7ec8e3]/50"
            />
          </div>
          {!isForgot && (
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b8d4e8]/60" />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignUp ? "Create a password (8+ chars)" : "Password"}
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-11 text-sm text-white placeholder:text-[#b8d4e8]/40 outline-none focus:border-[#7ec8e3]/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b8d4e8]/60 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-xs text-red-100">
              {error}
            </div>
          )}
          {info && (
            <div className="rounded-xl border border-[#7ec8e3]/30 bg-[#7ec8e3]/10 p-3 text-xs text-[#b8d4e8]">
              {info}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="glow-btn inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {isForgot ? "Send reset link" : isSignUp ? "Create Account" : "Sign In"}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 space-y-2 text-center text-xs text-[#b8d4e8]">
          {isForgot ? (
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="hover:text-white"
            >
              ← Back to sign in
            </button>
          ) : (
            <>
              <div>
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => setMode(isSignUp ? "signin" : "signup")}
                  className="text-[#7ec8e3] hover:text-white"
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </button>
              </div>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="block w-full hover:text-white"
                >
                  Forgot password?
                </button>
              )}
            </>
          )}
        </div>

        {isSignUp && (
          <p className="mt-5 text-center text-[10px] uppercase tracking-[0.25em] text-[#b8d4e8]/50">
            By signing up you agree to our{" "}
            <Link to="/terms" className="underline hover:text-white">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline hover:text-white">
              Privacy Policy
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#4285F4"
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}
