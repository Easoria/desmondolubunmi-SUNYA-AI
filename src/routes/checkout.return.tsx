import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/checkout/return")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string; type?: string } => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
    type: typeof search.type === "string" ? search.type : undefined,
  }),
  head: () => ({
    meta: [{ title: "Payment complete — Sunya" }, { name: "robots", content: "noindex" }],
  }),
  component: CheckoutReturn,
});

function CheckoutReturn() {
  const { session_id, type } = Route.useSearch();
  const isBooking = type === "booking";

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#7ec8e3]/15 ring-1 ring-[#7ec8e3]/40">
          <CheckCircle2 className="h-7 w-7 text-[#7ec8e3]" />
        </div>
        <h1 className="display mt-6 text-4xl text-white sm:text-5xl">
          {session_id ? "Payment complete" : "Thanks"}
        </h1>
        <p className="mt-4 text-[#b8d4e8]">
          {isBooking
            ? "Your 1-on-1 session is paid. Next: pick a time below to lock in your slot."
            : "You're in. Founding Access is active — unlimited Sunya AI sessions, saved history, and lever insights over time."}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {isBooking ? (
            <Link
              to="/work-with-me"
              hash="booking"
              className="glow-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              Pick your time <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <Link
                to="/sunya-ai"
                className="glow-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
              >
                Start a session <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white hover:border-[#7ec8e3]/40"
              >
                Go to dashboard
              </Link>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
