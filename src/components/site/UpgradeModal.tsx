import { X, Sparkles } from "lucide-react";

export function UpgradeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
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
        <h3 className="display text-center text-2xl text-white">Full Access — opening soon</h3>
        <p className="mt-3 text-center text-sm text-[#b8d4e8]">
          Paid subscriptions go live in the next release. In the meantime, your sessions are saved
          and you'll be the first to know when €29 / month Full Access opens.
        </p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center text-xs text-[#b8d4e8]/80">
          Questions? Email{" "}
          <a href="mailto:support@sunyasleep.com" className="text-[#7ec8e3] hover:text-white">
            support@sunyasleep.com
          </a>
        </div>
        <button
          onClick={onClose}
          className="glow-btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
