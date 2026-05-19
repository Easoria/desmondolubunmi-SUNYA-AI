import { X, Sparkles, ArrowRight } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  variant?: "default" | "limit";
};

export function UpgradeModal({ open, onClose, variant = "default" }: Props) {
  if (!open) return null;
  const isLimit = variant === "limit";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1628]/80 p-4 backdrop-blur-sm">
      <div className="glass-strong relative w-full max-w-md rounded-3xl p-7">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-[#b8d4e8] hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#7ec8e3]/15 ring-1 ring-[#7ec8e3]/40">
          <Sparkles className="h-4 w-4 text-[#7ec8e3]" />
        </div>
        <h3 className="display text-center text-2xl text-white">
          {isLimit
            ? "You've used your free sessions for today"
            : "✦ Founding Access — coming soon"}
        </h3>
        <p className="mt-3 text-center text-sm text-[#b8d4e8]">
          {isLimit ? (
            <>
              Unlock full access for <span className="text-white">€19/month</span> — unlimited
              sessions, saved history, and lever tracking over time.
            </>
          ) : (
            <>
              Founding Access is <span className="text-white">€19/month</span>. Paid checkout opens
              in the next release — your sessions stay saved and you'll be the first to know when
              it goes live.
            </>
          )}
        </p>
        <p className="mt-3 text-center text-xs italic text-[#b8d4e8]/70">
          Founding rate. Price increases as Sunya grows.
        </p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center text-xs text-[#b8d4e8]/80">
          Questions? Email{" "}
          <a href="mailto:support@sunyasleep.com" className="text-[#7ec8e3] hover:text-white">
            support@sunyasleep.com
          </a>
        </div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={onClose}
            className="glow-btn inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
          >
            {isLimit ? "Unlock Full Access" : "Got it"} <ArrowRight className="h-4 w-4" />
          </button>
          {isLimit && (
            <button
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white hover:border-[#7ec8e3]/40"
            >
              Come back tomorrow
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
