import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Starfield } from "@/components/Starfield";
import { getLeversInOrder, getLeverPracticeCount } from "@/data/levers";
import type { Lever } from "@/data/levers/types";
import { leverHubPath } from "@/lib/practice-library";

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
          "One hundred and eleven practices across thirteen levers. Breath, movement, mind, sound, heart, awareness, and the six external pillars of human wellbeing.",
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
              Thirteen levers. One system.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-[#b8d4e8] sm:mt-7 sm:text-base">
              Every practice here works on the same human machine. What differs is which part it
              reaches, and how directly. The internal levers are things you do. The external
              pillars are conditions you live in. Both are necessary, and neither works properly
              without the other.
            </p>
          </div>

          {conservation && (
            <div className="mx-auto mt-14 max-w-5xl">
              <div className="label-eyebrow text-center">THE PREREQUISITE</div>
              <LeverCard lever={conservation} band="prerequisite" />
              <div className="mx-auto mt-9 h-px w-full bg-gradient-to-r from-transparent via-[#dcb48d]/40 to-transparent" />
            </div>
          )}

          <div className="mt-12">
            <div className="label-eyebrow mb-6 text-center">THINGS YOU DO</div>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
              {internal.map((lever, index) => (
                <LeverCard key={lever.slug} lever={lever} band="internal" index={index} />
              ))}
            </div>
          </div>

          <div className="mt-14">
            <div className="label-eyebrow mb-6 text-center">CONDITIONS YOU LIVE IN</div>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
              {external.map((lever) => (
                <LeverCard key={lever.slug} lever={lever} band="external" />
              ))}
            </div>
          </div>

          <p className="mx-auto mt-14 max-w-3xl text-center text-sm text-[#b8d4e8]">
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
        ? `${shared} border-[#7ec8e3]/30`
        : `${shared} border-white/15 bg-[#070f1f]/88 shadow-[0_0_24px_-18px_rgba(0,0,0,0.85)]`;

  const style =
    band === "internal"
      ? {
          backgroundColor: `rgba(10, 22, 40, ${0.67 - internalTint})`,
          boxShadow: `0 0 ${18 + index * 3}px -14px rgba(126, 200, 227, ${internalGlow * 0.45})`,
        }
      : undefined;

  const headingClass = band === "external" ? "text-white" : "text-white";
  const summary = lever.summaryLine ?? lever.intro[0];

  return (
    <Link to={leverHubPath(lever.slug)} className={className} style={style}>
      <div className="pointer-events-none absolute left-2.5 top-0.5 font-display text-5xl text-[#7ec8e3]/20 sm:left-3 sm:top-1 sm:text-6xl">
        {number}
      </div>
      <div className="relative z-10">
        <div className="font-display text-xs tracking-[0.25em] text-[#7ec8e3]">{number}</div>
        <h2 className={`display mt-1.5 text-2xl sm:mt-2 sm:text-3xl ${headingClass}`}>{lever.name}</h2>
        <p className="mt-1 text-xs italic text-[#b8d4e8]/80">{lever.layerLine}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#b8d4e8]">{summary}</p>
        <p className="mt-5 text-xs uppercase tracking-[0.24em] text-[#7ec8e3]/85">
          {practiceCount} practices
        </p>
      </div>
    </Link>
  );
}
