import { X, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";

type Props = {
  open: boolean;
  onClose: () => void;
  variant?: "default" | "limit";
};

export function UpgradeModal({ open, onClose, variant = "default" }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { openCheckout, isOpen: checkoutOpen, checkoutElement } = useStripeCheckout();

  if (!open && !checkoutOpen) return null;
  const isLimit = variant === "limit";

  function handleUpgrade() {
    if (!user) {
      onClose();
      navigate({ to: "/login" });
      return;
    }
    openCheckout({
      priceId: "price_1TYUrm3t1ZeJXXaMF49gUspB",
      customerEmail: user.email,
      userId: user.id,
      returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });
  }

  return (
    <>
      {open && (
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
                : "✦ Unlock Full Access"}
            </h3>
            <p className="mt-3 text-center text-sm text-[#b8d4e8]">
              Unlimited Sunya AI sessions for{" "}
              <span className="text-white">€19/month</span> — saved history and lever tracking
              over time.
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
                onClick={handleUpgrade}
                className="glow-btn inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
              >
                Unlock Full Access <ArrowRight className="h-4 w-4" />
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
      )}
      {checkoutElement}
    </>
  );
}
