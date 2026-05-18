import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/booked")({
  component: BookedPage,
  head: () => ({
    meta: [
      { title: "Your session is booked — Sunya" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function BookedPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <section className="relative overflow-hidden pb-32 pt-32">
        <Starfield density={0.8} />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#7ec8e3]/15 ring-1 ring-[#7ec8e3]/40">
            <Sparkles className="h-5 w-5 text-[#7ec8e3]" />
          </div>
          <h1 className="display text-5xl text-white sm:text-6xl">
            Your session is booked<span className="display-italic text-[#b8d4e8]">.</span>
          </h1>
          <p className="mt-6 text-lg text-[#b8d4e8]">
            You'll receive a confirmation email from Calendly with everything you need.
          </p>
          <p className="mt-4 text-[#b8d4e8]/80">
            In the meantime — if you haven't already, try Sunya AI to begin exploring your
            situation before the session. It will help you arrive with more clarity.
          </p>
          <Link
            to="/sunya-ai"
            className="glow-btn mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
          >
            Try Sunya AI <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
