import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { FounderSection } from "@/components/site/FounderBio";
import { buildSeoHead, buildServiceSchema } from "@/lib/seo";
import {
  ONE_TO_ONE_OFFER,
  oneToOneBookingLeadLine,
  oneToOneBookingCtaLabel,
  oneToOneHeroOfferLine,
  oneToOneOfferNote,
  oneToOnePricingLine,
  oneToOneWorkDescription,
} from "@/lib/one-to-one-offer";

export const Route = createFileRoute("/work-with-me")({
  component: WorkPage,
  head: () => ({
    ...buildSeoHead({
      title: "Work With Desmond — 1-on-1 Sunya Sessions | Sunya",
      description: oneToOneWorkDescription(),
      path: "/work-with-me",
      ogType: "website",
      imageKind: "core",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          buildServiceSchema({
            name: "1-on-1 Sunya Session with Desmond Olubunmi",
            description: oneToOneWorkDescription(),
            path: "/work-with-me",
            price: ONE_TO_ONE_OFFER.free ? 0 : ONE_TO_ONE_OFFER.priceEur,
            durationMinutes: ONE_TO_ONE_OFFER.durationMinutes,
          }),
        ),
      },
    ],
  }),
});

const CALENDLY_URL = "https://calendly.com/easoriaai/reset_session";

const STEPS = [
  "Full diagnostic across the root of suffering and the seven layers of being",
  "Identification of where your system is actually contracted — which is rarely where you think",
  "The single lever that matters most for you right now, and why the others can wait",
  "A personalised protocol built for your actual life, not a generic programme",
  "A follow-up voice note from Desmond within 48 hours",
];

function WorkPage() {
  function scrollToBooking() {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }

  // Load Calendly script + scroll to #booking if hash present
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      document.body.removeChild(s);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#booking") {
      setTimeout(() => {
        document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  const calendlyEmbedUrl = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0a1628&text_color=ffffff&primary_color=7ec8e3`;

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />

      <section className="relative overflow-hidden pb-20 pt-16">
        <Starfield density={0.5} />
        <div
          className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #d4a574 0%, #8b6f3d 30%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="label-eyebrow">Direct work, 1-on-1</div>
          <h1 className="display mt-6 text-5xl text-white sm:text-7xl">
            Work With <span className="display-italic text-[#e8c79c]">Desmond</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-[#b8d4e8]">{oneToOneHeroOfferLine()}</p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#b8d4e8]">
            Direct, personalised engagement with the full Sunya framework — applied to your
            specific life, your specific situation, your specific system.
          </p>
          <a
            href="#booking"
            className="glow-btn mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
          >
            {oneToOneBookingCtaLabel()} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a1628] py-24">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <div className="glass-card space-y-5 p-9 text-[#b8d4e8]">
            <p>
              A diagnostic session rooted in the complete Sunya framework. The aim is not to make
              you feel better for an hour, but to find the one place your system is actually stuck,
              and to leave you with something precise enough to work with.
            </p>
            <p>
              Most people arrive assuming they know what their problem is. Usually the thing they
              name is downstream of something else. Finding what is actually upstream is most of the
              work.
            </p>
            <p>
              Most people are stuck in one of five places. Finding which one is yours is much of
              what a session is for.
            </p>
            <p>
              <Link
                to="/philosophy"
                className="text-sm text-[#7ec8e3]/80 transition hover:text-white"
              >
                Read about the five zones →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#060d1c] py-28">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">What happens in a session</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl">
              Five precise <span className="display-italic text-[#b8d4e8]">movements.</span>
            </h2>
          </div>
          <div className="mx-auto mt-14 max-w-3xl space-y-4">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="display flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#7ec8e3]/10 text-xl text-[#7ec8e3] ring-1 ring-[#7ec8e3]/30">
                  {i + 1}
                </div>
                <p className="pt-2 text-[#b8d4e8]">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing card */}
      <section className="relative overflow-hidden bg-[#0a1628] py-20">
        <div className="relative z-10 mx-auto max-w-2xl px-6">
          <div className="glass-strong rounded-3xl p-8 shadow-[0_0_60px_-15px_rgba(232,199,156,0.35)] ring-1 ring-[#e8c79c]/30">
            <div className="label-eyebrow">1-on-1 Session with Desmond</div>
            <div className="mt-4">
              <span className="display text-4xl text-[#e8c79c]">{oneToOnePricingLine()}</span>
              <p className="mt-2 text-xs text-[#b8d4e8]/70">{oneToOneOfferNote()}</p>
            </div>
            <ul className="mt-7 space-y-3 text-sm text-[#b8d4e8]">
              {["Full Sunya diagnostic", "Personalised practice protocol", "Applied to your specific situation"].map(
                (i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#e8c79c]" /> {i}
                  </li>
                ),
              )}
            </ul>
            <button
              onClick={scrollToBooking}
              className="glow-btn mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              {oneToOneBookingCtaLabel()} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="relative overflow-hidden bg-[#0a1628] py-28 scroll-mt-24">
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="display text-4xl text-white sm:text-5xl">Book your session</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-[#b8d4e8]">{oneToOneBookingLeadLine()}</p>
          </div>

          <div className="glass-strong mt-10 overflow-hidden rounded-3xl p-2">
            <div
              className="calendly-inline-widget"
              data-url={calendlyEmbedUrl}
              style={{ minWidth: "320px", height: "780px" }}
            />
          </div>

          <p className="mt-8 text-center text-sm italic text-[#b8d4e8]/70">
            Desmond works with a small number of people at any given time to ensure full presence
            and depth with each person.
          </p>
          <p className="mt-6 text-center text-sm text-[#b8d4e8]/80">
            Prefer a group? Explore{" "}
            <Link to="/gatherings" className="text-[#7ec8e3] transition hover:text-white">
              meditation events in Dublin and online
            </Link>
            .
          </p>
        </div>
      </section>

      <FounderSection />

      <Footer />
    </div>
  );
}
