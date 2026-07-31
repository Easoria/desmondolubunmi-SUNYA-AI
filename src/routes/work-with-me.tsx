import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import desmondImg from "@/assets/desmond.jpg";
import { pageMeta } from "@/lib/page-meta";
import {
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
    meta: pageMeta("Work With Desmond — 1-on-1 Sunya Sessions", oneToOneWorkDescription()),
  }),
});

const CALENDLY_URL = "https://calendly.com/easoriaai/reset_session";

const STEPS = [
  "Full diagnostic across the five links and the seven layers of being",
  "Identification of where your system is actually contracted — which is rarely where you think",
  "The single lever that matters most for you right now, and why the others can wait",
  "A personalised protocol built for your actual life, not a generic programme",
  "ongoing support you if needed.",
];

const ZONES = [
  {
    zone: "Survival crisis",
    description:
      "The material ground is unstable — money, housing, safety. No inner practice takes root here until that is addressed directly.",
  },
  {
    zone: "Nervous system collapse",
    description:
      "Exhausted, dysregulated, sleeping badly, tense in a way that never fully releases.",
  },
  {
    zone: "Emotional accumulation",
    description:
      "Stable on the surface, but carrying grief, resentment, or numbness that has not moved in years.",
  },
  {
    zone: "Mental fragmentation",
    description:
      "Scattered, overthinking, self-critical, mentally exhausted despite physical rest.",
  },
  {
    zone: "The hollow seeker",
    description:
      "Everything works. Nothing satisfies. Successful by every external measure and persistently empty.",
  },
] as const;

function WorkPage() {
  const [bioExpanded, setBioExpanded] = useState(false);

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
            background:
              "radial-gradient(circle, #d4a574 0%, #8b6f3d 30%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="label-eyebrow">Direct work, 1-on-1</div>
          <h1 className="display mt-6 text-5xl text-white sm:text-7xl">
            Work With <span className="display-italic text-[#e8c79c]">Desmond</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-[#b8d4e8]">
            {oneToOneHeroOfferLine()}
          </p>
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
            <p className="display text-2xl text-white">This is not generic life coaching.</p>
            <p>
              It is a diagnostic session rooted in the complete Sunya framework. The aim is not to make you feel better for an hour. It is to find the one place your system is actually stuck — and to leave you with something precise enough to work with.
            </p>
            <p>
              Most people arrive assuming they know what their problem is. Usually the thing they name is downstream of something else. Finding what is actually upstream is most of the work.
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

      <section className="relative overflow-hidden bg-[#0a1628] py-24">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">IS THIS FOR YOU</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl">
              Most people are stuck in one of five places.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-[#b8d4e8]">
              Every system has a single point of greatest friction at any moment. Address anything other than that and it quietly defeats every other effort. Much of a session is simply finding yours.
            </p>
          </div>
          <div className="mx-auto mt-14 max-w-4xl space-y-4">
            {ZONES.map((item, index) => (
              <div
                key={item.zone}
                className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="display flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#7ec8e3]/10 text-xl text-[#7ec8e3] ring-1 ring-[#7ec8e3]/30">
                  {index + 1}
                </div>
                <div className="pt-1">
                  <h3 className="display text-2xl text-white">{item.zone}</h3>
                  <p className="mt-2 text-[#b8d4e8]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-4xl text-center text-[#b8d4e8]">
            If you recognise yourself in more than one, that is normal — and identifying which one to address first is exactly what the session is for.
          </p>
          <div className="mt-6 text-center">
            <Link
              to="/philosophy"
              className="inline-flex items-center gap-2 text-sm text-[#7ec8e3] transition hover:text-white"
            >
              Read more about the five zones →
            </Link>
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
              {[
                "Full Sunya diagnostic",
                "Personalised practice protocol",
                "Applied to your specific situation",
                "Follow-up voice note within 48hrs",
              ].map((i) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#e8c79c]" /> {i}
                </li>
              ))}
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
      <section
        id="booking"
        className="relative overflow-hidden bg-[#0a1628] py-28 scroll-mt-24"
      >
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">Book your session</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl">
              Pick a time <span className="display-italic text-[#b8d4e8]">that works.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-[#b8d4e8]">{oneToOneBookingLeadLine()}</p>
            <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#b8d4e8]">
              {[
                "Full Sunya diagnostic",
                "Personalised practice protocol",
                "48-hour follow-up voice note",
              ].map((i) => (
                <li key={i} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#7ec8e3]" /> {i}
                </li>
              ))}
            </ul>
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
        </div>
      </section>

      <section
        className="relative overflow-hidden py-32"
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #1a1530 50%, #2a1a1f 100%)",
        }}
      >
        <div className="relative z-10 mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-5 lg:items-center">
          <div className="lg:col-span-2">
            <div className="glass relative overflow-hidden rounded-3xl">
              <img
                src={desmondImg}
                alt="Desmond Olubunmi"
                width={1024}
                height={1024}
                loading="lazy"
                className="aspect-[4/5] h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1628]/40 via-transparent to-transparent" />
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="label-eyebrow">The founder</div>
            <h2 className="display mt-5 text-4xl text-white sm:text-6xl">Desmond Olubunmi</h2>
            <p className="display-italic mt-3 text-lg text-[#b8d4e8]">
              Spiritual teacher. Visionary.
            </p>
            <div className="mt-8 space-y-4 text-[#b8d4e8]">
              <p>Everything humans do is an attempt to be happy.</p>
              <p>
                We earn degrees, build careers, raise children, enter relationships, pray,
                meditate. Every act — however it appears — is aimed at one thing: reducing
                suffering and realising happiness. This is the most universal human truth there
                is.
              </p>
              <p>
                We have more comfort, more information, and more options than any generation
                before us. But can we say we are happier?
              </p>
              <p>
                Born in Nigeria, raised in Ireland, I was exposed early to radically different
                cultures and ways of understanding life. Christians, Muslims, Hindus, Buddhists,
                scientists, therapists — all essentially trying to create human well-being. I
                wanted to know the truth of human life. Not what people believed. What was
                actually true.
              </p>
              <p>
                That curiosity was always in me — even as a child I had a deep sense of reverence
                for something sacred in life, even before I could name it.
              </p>
              <p>But it was suffering that made the question urgent.</p>
              <p>
                In my teens, my nervous system was constantly dysregulated. My mind wouldn't
                stop. I couldn't sleep. The inner chaos became intolerable — and that intolerance
                became the catalyst. I found mindful breathing practices — and for the first
                time, I experienced inner peace. Not by believing in something, but by working
                with the natural mechanics of my own system.
              </p>
              {bioExpanded && (
                <>
                  <p>
                    This relief inspired a journey into deeper practice and curiosity — to understand
                    the mechanisms of human life. I practiced daily for many years, long hours,
                    multiple silent retreats, including several ten-day Vipassana retreats — where I
                    sat until thought and time dissolved and what remained was pure awareness,
                    totally alive and still.
                  </p>
                  <p>And gradually, what became clear was this:</p>
                  <p>
                    Every tradition, every religion, every healing modality — different brands, one
                    human system, one truth.
                  </p>
                  <p>
                    I began to distil. I traced every practice back to its essence — breathwork,
                    movement, sound, meditation, devotion, nutrition, environment — asking: what is
                    this fundamentally doing to the human system? What is it actually changing?
                  </p>
                  <p>That process became Sunya.</p>
                  <p>
                    Not a belief system. Not a tradition. A universal map — built on first
                    principles, belonging to no culture, accessible to every human being.
                  </p>
                  <p>
                    We all want the same thing: freedom from suffering and the realisation of lasting
                    happiness. Sunya exists to make that available — without dogma, without belief,
                    without asking you to convert to anything.
                  </p>
                  <p className="text-white/90">
                    I built this because I lived the problem. And found the path through it.
                  </p>
                  <p>Now it's yours.</p>
                  <p className="display-italic">— Desmond</p>
                </>
              )}
              <button
                type="button"
                onClick={() => setBioExpanded((v) => !v)}
                className="mt-2 inline-flex items-center gap-1 text-xs uppercase tracking-[0.32em] text-[#7ec8e3] transition hover:text-white"
              >
                {bioExpanded ? "Read less" : "Read more"}
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${bioExpanded ? "rotate-180" : ""}`}
                />
              </button>
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="glow-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
              >
                {oneToOneBookingCtaLabel()} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
