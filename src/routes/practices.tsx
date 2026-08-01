import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Starfield } from "@/components/Starfield";
import { getLeversInOrder, getLeverPracticeCount } from "@/data/levers";
import type { Lever } from "@/data/levers/types";

const INTERNAL_SLUGS = ["breath", "movement", "mind", "sound", "heart", "awareness"] as const;
const EXTERNAL_SLUGS = [
  "sleep",
  "nutrition",
  "connection",
  "environment",
  "nature",
  "sustenance",
] as const;

export const Route = createFileRoute("/practices")({
  component: PracticesIndexPage,
  head: () => ({
    meta: [
      { title: "The Practices — The Complete Sunya Library" },
      {
        name: "description",
        content:
          "Twelve levers arrived at from first principles: every means by which a human being can transform their wellbeing, stripped of cultural form. One hundred and eleven practices across thirteen levers.",
      },
    ],
  }),
});

function PracticesIndexPage() {
  const levers = getLeversInOrder();
  const conservation = levers.find((lever) => lever.slug === "conservation");
  const internal = levers.filter((lever) => INTERNAL_SLUGS.includes(lever.slug as (typeof INTERNAL_SLUGS)[number]));
  const external = levers.filter((lever) => EXTERNAL_SLUGS.includes(lever.slug as (typeof EXTERNAL_SLUGS)[number]));

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <section className="relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32">
        <Starfield density={0.4} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <div className="label-eyebrow">THE PRACTICES</div>
            <h1 className="display mt-5 text-3xl text-white sm:mt-6 sm:text-6xl">
              Twelve levers. One system.
            </h1>
            <div className="mx-auto mt-6 max-w-[700px] space-y-5 text-sm leading-relaxed text-[#b8d4e8] sm:mt-7 sm:text-base">
              <p>
                Beneath every tradition lies one science, working on one system in one direction.
                This is that science gathered into its practical essence — the actual tools,
                stripped of all cultural form, through which a human being can create lasting
                happiness wellbeing in themselve.
              </p>
              <p>
                These twelve foundational levers were arrived at from first principles, by asking a
                single question: what are all the possible means by which a human being can
                transform their well-being? Every tradition was examined in answer — but so was
                every therapy, every wellness practice, every modality of change. And they all
                reduced to the same small set: six internal means of working on oneself, with every
                known practice being one of these or a combination of them, and six external
                conditions that support well-being from without.
              </p>
            </div>
            <p className="display mx-auto mt-10 max-w-[700px] text-2xl leading-relaxed text-[#eaf6ff] sm:text-3xl">
              There is almost no means of transforming a human being that is not already among
              them, or built from them.
            </p>
          </div>

          {conservation && (
            <div className="mx-auto mt-14 max-w-5xl">
              <div className="label-eyebrow text-center">THE PREREQUISITE</div>
              <h2 className="display mb-4 mt-4 text-center text-2xl text-[#f0dcc8] sm:text-3xl">
                Conservation
              </h2>
              <p className="mx-auto mb-6 max-w-3xl text-center text-sm text-[#dcb48d]/92 sm:text-base">
                Before you raise more energy, stop losing the energy you have.
              </p>
              <LeverCard lever={conservation} band="prerequisite" />
              <div className="mx-auto mt-9 h-px w-full bg-gradient-to-r from-transparent via-[#dcb48d]/40 to-transparent" />
            </div>
          )}

          <div className="mt-12">
            <div className="label-eyebrow mb-6 text-center">THINGS YOU DO</div>
            <h2 className="display mb-6 text-center text-2xl text-[#d6effb] sm:text-3xl">
              The Six Internal Levers
            </h2>
            <p className="mx-auto mb-6 max-w-3xl text-center text-sm text-[#b8d4e8] sm:text-base">
              Your own faculties — breath, movement, mind, sound, heart, and awareness. These are
              the things you do.
            </p>
            <div className="rounded-3xl border border-[#7ec8e3]/40 bg-[#7ec8e3]/[0.08] p-3 shadow-[0_0_42px_-24px_rgba(126,200,227,0.85)] sm:p-4">
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
                {internal.map((lever, index) => (
                  <LeverCard key={lever.slug} lever={lever} band="internal" index={index} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14">
            <div className="label-eyebrow mb-6 text-center">CONDITIONS YOU LIVE IN</div>
            <h2 className="display mb-6 text-center text-2xl text-[#f0dcc8] sm:text-3xl">
              The Six External Pillars
            </h2>
            <p className="mx-auto mb-6 max-w-3xl text-center text-sm text-[#b8d4e8] sm:text-base">
              Sleep, nutrition, connection, environment, nature, and sustenance. These are not
              practices. They are the ground everything else stands on.
            </p>
            <div className="rounded-3xl border border-[#dcb48d]/25 bg-[#dcb48d]/[0.05] p-3 sm:p-4">
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
                {external.map((lever) => (
                  <LeverCard key={lever.slug} lever={lever} band="external" />
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-3xl space-y-4 text-center text-sm text-[#b8d4e8] sm:text-base">
            <p>
              Every lever reaches several layers of being at once. But they all converge on one —
              the energy body. That is the common ground of the entire method.
            </p>
            <p>Two go even further. Awareness and the heart work directly on the separate self itself.</p>
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-center text-sm text-[#b8d4e8]">
            Not sure where to start? The five zones on the philosophy page identify which lever
            matters most for you right now.
          </p>
          <div className="mt-4 text-center">
            <Link
              to="/philosophy"
              hash="zones"
              className="inline-flex items-center gap-2 text-sm text-[#7ec8e3] transition hover:text-white"
            >
              Find your starting point →
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function LeverCard({
  lever,
  band,
  index = 0,
}: {
  lever: Lever;
  band: "prerequisite" | "internal" | "external";
  index?: number;
}) {
  const practiceCount = getLeverPracticeCount(lever);
  const number = String(lever.number).padStart(2, "0");

  const internalTint = 0.03 + index * 0.012;
  const internalGlow = 0.38 + index * 0.09;

  const shared =
    "group relative block overflow-hidden rounded-2xl border p-4 sm:p-5 transition duration-300 hover:-translate-y-0.5";

  const className =
    band === "prerequisite"
      ? `${shared} mt-5 border-[#dcb48d]/45 bg-[#120f1a]/85 shadow-[0_0_38px_-18px_rgba(220,180,141,0.65)]`
      : band === "internal"
        ? `${shared} border-[#7ec8e3]/55 ring-1 ring-[#7ec8e3]/35`
        : `${shared} border-[#dcb48d]/35 bg-[#070f1f]/88 ring-1 ring-[#dcb48d]/20 shadow-[0_0_24px_-18px_rgba(220,180,141,0.45)]`;

  const style =
    band === "internal"
      ? {
          backgroundColor: `rgba(10, 22, 40, ${0.67 - internalTint})`,
          boxShadow: `0 0 ${24 + index * 4}px -14px rgba(126, 200, 227, ${internalGlow * 0.6})`,
        }
      : undefined;

  const headingClass = band === "external" ? "text-white" : "text-white";
  const summary = lever.summaryLine ?? lever.intro[0];

  return (
    <Link
      to="/practices/$leverSlug"
      params={{ leverSlug: lever.slug }}
      className={className}
      style={style}
    >
      <div className="pointer-events-none absolute right-3 top-2 font-display text-3xl text-[#7ec8e3]/18 sm:text-4xl">
        {number}
      </div>
      <div className="relative z-10">
        <h2 className={`display mt-4 text-2xl sm:mt-5 sm:text-3xl ${headingClass}`}>{lever.name}</h2>
        <p className="mt-1 text-xs italic text-[#b8d4e8]/80">{lever.layerLine}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#b8d4e8]">{summary}</p>
        <p className="mt-5 text-xs uppercase tracking-[0.24em] text-[#7ec8e3]/85">
          {practiceCount} practices
        </p>
      </div>
    </Link>
  );
}
