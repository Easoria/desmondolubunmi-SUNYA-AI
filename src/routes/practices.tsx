import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Starfield } from "@/components/Starfield";
import { getLeversInOrder, getLeverPracticeCount } from "@/data/levers";
import type { Lever } from "@/data/levers/types";
import { buildSeoHead, canonicalUrl } from "@/lib/seo";

const INTERNAL_SLUGS = ["breath", "movement", "mind", "sound", "heart", "awareness"] as const;
const EXTERNAL_SLUGS = [
  "sustenance",
  "sleep",
  "nutrition",
  "connection",
  "nature",
  "environment",
] as const;

export const Route = createFileRoute("/practices")({
  component: PracticesRoutePage,
  head: ({ matches }) => {
    if (!matches?.length || matches[matches.length - 1]?.routeId !== "/practices") {
      return {};
    }

    const title = "The Practices — Conservation + 12 Levers, 112 Techniques | Sunya";
    const description =
      "Conservation plus twelve levers arrived at from first principles: every means by which a human being can transform their wellbeing, stripped of cultural form. 112 practices across the complete Sunya library.";
    const levers = getLeversInOrder();

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: levers.map((lever, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: lever.name,
        url: canonicalUrl(`/practices/${lever.slug}`),
      })),
    };

    return {
      ...buildSeoHead({
        title,
        description,
        path: "/practices",
        ogType: "website",
        imageKind: "lever",
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(itemListSchema),
        },
      ],
    };
  },
});

function PracticesRoutePage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  // This route is a parent of deeper practice routes; render the index only
  // on the exact `/practices` path, and delegate child URLs to <Outlet />.
  if (pathname !== "/practices" && pathname !== "/practices/") {
    return <Outlet />;
  }

  return <PracticesIndexPage />;
}

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
            <h1 className="display text-3xl text-white sm:text-6xl">THE SUNYA PRACTICES</h1>
            <p className="mx-auto mt-5 max-w-5xl text-lg text-[#b8d4e8] sm:mt-6 sm:text-xl">
              The twelve foundational means of human wellbeing
            </p>
          </div>

          <div className="mx-auto mt-6 max-w-5xl space-y-5 text-sm leading-relaxed text-[#b8d4e8] sm:mt-7 sm:text-base">
            <p>
              When every approach to human wellbeing is distilled to its essence, twelve foundational
              means remain.
            </p>
            <p>
              Six are fundamental faculties of your own being, which you can use to transform yourself
              from within: breath, body, mind, voice, emotions, awareness. Six are the fundamental
              external factors that influence your wellbeing. However refined your inner practice, it
              will not hold if you are starving, isolated, sleepless, or surrounded by what degrades
              you.
            </p>
            <p>
              Almost every method ever devised is a branch of one of these twelve, or a combination of
              them.
            </p>
          </div>

          {conservation && (
            <div className="mx-auto mt-14 max-w-5xl">
              <LeverCard lever={conservation} band="prerequisite" />
              <div className="mx-auto mt-9 h-px w-full bg-gradient-to-r from-transparent via-[#dcb48d]/40 to-transparent" />
            </div>
          )}

          <div className="mt-12">
            <h2 className="display mb-6 text-center text-2xl text-[#d6effb] sm:text-3xl">
              The Six Internal Levers
            </h2>
            <div className="rounded-3xl border border-[#7ec8e3]/40 bg-[#7ec8e3]/[0.08] p-3 shadow-[0_0_42px_-24px_rgba(126,200,227,0.85)] sm:p-4">
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
                {internal.map((lever, index) => (
                  <LeverCard key={lever.slug} lever={lever} band="internal" index={index} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="display mb-6 text-center text-2xl text-[#f0dcc8] sm:text-3xl">
              The Six External Pillars
            </h2>
            <div className="rounded-3xl border border-[#dcb48d]/25 bg-[#dcb48d]/[0.05] p-3 sm:p-4">
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
                {external.map((lever) => (
                  <LeverCard key={lever.slug} lever={lever} band="external" />
                ))}
              </div>
            </div>
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-center text-sm text-[#b8d4e8]">
            Not sure where to start? Use the order of operations — which zone you are in, which
            lever matters first, and what can wait.
          </p>
          <div className="mt-4 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
            <Link
              to="/practices/where-to-begin"
              className="inline-flex items-center gap-2 text-sm text-[#7ec8e3] transition hover:text-white"
            >
              Where to begin →
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
      ? `${shared} border-[#dcb48d]/45 bg-[#120f1a]/85 shadow-[0_0_38px_-18px_rgba(220,180,141,0.65)]`
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
  // Card description shares `summaryLine` with the lever-page visible intro.
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
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#b8d4e8]">{summary}</p>
        <p className="mt-5 text-xs uppercase tracking-[0.24em] text-[#7ec8e3]/85">
          {practiceCount} practices
        </p>
      </div>
    </Link>
  );
}
