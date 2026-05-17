import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import desmondImg from "@/assets/desmond.jpg";

export const Route = createFileRoute("/work-with-me")({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: "Work With Desmond — 1-on-1 Sunya sessions" },
      {
        name: "description",
        content:
          "Direct, personalised engagement with the full Sunya framework — applied to your specific life, your specific situation, your specific system.",
      },
    ],
  }),
});

const STEPS = [
  "Full diagnostic conversation across the 4 root causes and 7 layers",
  "Identification of your primary imbalances and patterns",
  "A personalised practice protocol tailored to your life",
  "Clarity on the single most important shift for you right now",
  "Follow-up voice note from Desmond within 48 hours",
];

function WorkPage() {
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
            Direct, personalised engagement with the full Sunya framework — applied to your
            specific life, your specific situation, your specific system.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a1628] py-24">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <div className="glass-card space-y-5 p-9 text-[#b8d4e8]">
            <p className="display text-2xl text-white">This is not generic life coaching.</p>
            <p>
              It is a precise, diagnostic session rooted in the complete Sunya framework. Desmond
              will identify exactly where your system is contracted, which levers are most important
              for you right now, and give you a personalised protocol to work with.
            </p>
            <p className="display-italic text-white/90">
              Think of it as the Sunya AI — but with full human depth, direct transmission, and the
              capacity to go wherever the conversation needs to go.
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

      <section className="relative overflow-hidden bg-[#0a1628] py-28">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <div className="glass-strong rounded-3xl p-10 text-center">
            <div className="label-eyebrow">Single Session</div>
            <div className="mt-5 flex items-baseline justify-center gap-2">
              <span className="display text-6xl text-white">€[PRICE]</span>
              <span className="text-sm text-[#b8d4e8]">/ 90 minutes</span>
            </div>
            <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left text-sm text-[#b8d4e8]">
              {[
                "Full Sunya diagnostic",
                "Personalised practice protocol",
                "48-hour follow-up voice note",
              ].map((i) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#7ec8e3]" /> {i}
                </li>
              ))}
            </ul>
            <button className="glow-btn mt-9 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium">
              Book a Session <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-6 text-center text-xs text-[#b8d4e8]/60">
              [PLACEHOLDER: Cal.com / Calendly embed goes here]
            </p>
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
              Nigerian-Irish. 23. Built this because he needed it.
            </p>
            <div className="mt-8 space-y-4 text-[#b8d4e8]">
              <p>
                I grew up between worlds — Nigerian roots, Irish upbringing, a mind that couldn't
                stop asking why.
              </p>
              <p>
                I went deep. Vedanta. Taoism. Neuroscience. Kabbalah. Sufism. Isha Yoga. And
                underneath all of it, I found the same mechanics. The same root causes. The same
                levers.
              </p>
              <p className="text-white/90">
                Sunya is the distillation of that search — a universal map that belongs to no
                tradition, but honours all of them.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <button className="glow-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium">
                Book a Session <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
