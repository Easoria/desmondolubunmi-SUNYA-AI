import { useCallback, useState } from "react";
import { X } from "lucide-react";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";

interface CheckoutOptions {
  priceId: string;
  quantity?: number;
  customerEmail?: string;
  userId?: string;
  returnUrl?: string;
}

export function useStripeCheckout() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<CheckoutOptions | null>(null);

  const openCheckout = useCallback((opts: CheckoutOptions) => {
    setOptions(opts);
    setIsOpen(true);
  }, []);

  const closeCheckout = useCallback(() => {
    setIsOpen(false);
    setOptions(null);
  }, []);

  const checkoutElement =
    isOpen && options ? (
      <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-[#0a1628]/90 p-4 backdrop-blur-sm sm:items-center">
        <div className="relative w-full max-w-2xl">
          <button
            onClick={closeCheckout}
            aria-label="Close checkout"
            className="absolute -top-2 right-0 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:-top-12 sm:right-0"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="overflow-hidden rounded-2xl bg-white">
            <StripeEmbeddedCheckout {...options} />
          </div>
        </div>
      </div>
    ) : null;

  return { openCheckout, closeCheckout, isOpen, checkoutElement };
}
