import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import {
  essays,
  firstSentenceFromStandfirst,
  readingMinutes,
  TIMELESS_SOLUTION_FIRST_SLUG,
} from "@/data/essays";
import type { Essay } from "@/data/essays/types";
import { buildSeoHead, canonicalUrl } from "@/lib/seo";

export const Route = createFileRoute("/timeless-solution")({
  head: ({ matches }) => {
    if (
      !matches?.length ||
      matches[matches.length - 1]?.routeId !== "/timeless-solution"
    ) {
      return {};
    }

    return {
      ...buildSeoHead({
        title: "The Timeless Solution — The Complete Framework",
        description:
          "The whole arc in twelve parts: where everything came from, how the human condition arose, and what it takes to return. The complete Sunya framework by Desmond Olubunmi.",
        path: "/timeless-solution",
        ogType: "website",
        imageKind: "core",
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "The Timeless Solution",
            itemListElement: essays.map((part, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: part.title,
              url: canonicalUrl(`/timeless-solution/${part.slug}`),
            })),
          }),
        },
      ],
    };
  },
  component: TimelessSolutionRoutePage,
});

function TimelessSolutionRoutePage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname !== "/timeless-solution" && pathname !== "/timeless-solution/") {
    return <Outlet />;
  }

  return <TimelessSolutionIndexPage />;
}

function PartCard({ part, isLast }: { part: Essay; isLast: boolean }) {
  const standfirst = firstSentenceFromStandfirst(part);
  const minutes = readingMinutes(part.wordCount);
  const num = String(part.number).padStart(2, "0");

  return (
    <div className="relative pl-10 sm:pl-14">
      {/* Vertical spine */}
      <div
        className={`absolute left-[1.05rem] top-0 w-px bg-gradient-to-b from-[#7ec8e3]/50 via-[#7ec8e3]/25 to-[#7ec8e3]/10 sm:left-[1.35rem] ${
          isLast ? "h-12" : "bottom-0"
        }`}
        aria-hidden
      />
      <div
        className="absolute left-[0.7rem] top-8 h-2.5 w-2.5 rounded-full bg-[#7ec8e3]/70 shadow-[0_0_12px_rgba(126,200,227,0.45)] sm:left-[1rem]"
        aria-hidden
      />

      <Link
        to="/timeless-solution/$slug"
        params={{ slug: part.slug }}
        className="group relative block py-7 transition hover:bg-white/[0.02]"
      >
        <div
          className="pointer-events-none absolute right-0 top-2 select-none font-display text-6xl leading-none text-white/[0.06] sm:text-7xl"
          aria-hidden
        >
          {num}
        </div>

        <div className="relative pr-16 sm:pr-20">
          <div className="font-display text-sm tracking-[0.28em] text-[#7ec8e3]/85">
            {num}
          </div>
          <h2 className="display mt-2 text-2xl text-white transition group-hover:text-[#e8f4fb] sm:text-3xl">
            {part.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#b8d4e8]/85">
            {standfirst}
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-[#b8d4e8]/50">
            {minutes} min read
          </p>
        </div>
      </Link>
    </div>
  );
}

function TimelessSolutionIndexPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <header className="text-center">
          <div className="label-eyebrow">The Timeless Solution</div>
          <h1 className="display mt-4 text-4xl text-white sm:text-5xl">
            The whole arc, from origin to return.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#b8d4e8] sm:text-base">
            Where everything came from. How it went wrong. What it takes to come back.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#b8d4e8]/85 sm:text-base">
            Twelve parts, in order, forming a single continuous account of the human
            condition — from before anything existed to the dissolving of the separate self.
          </p>
          <p className="mt-5 text-sm text-[#b8d4e8]/80">
            <Link to="/practices" className="text-[#7ec8e3] transition hover:text-white">
              The practices are what you do. This is why they work.
            </Link>
          </p>
        </header>

        <p className="mt-14 text-center text-sm text-[#b8d4e8]/80">
          Best read in order.{" "}
          <Link
            to="/timeless-solution/$slug"
            params={{ slug: TIMELESS_SOLUTION_FIRST_SLUG }}
            className="text-[#7ec8e3] transition hover:text-white"
          >
            Start at the beginning →
          </Link>
        </p>

        <section className="mt-10">
          {essays.map((part, index) => {
            const prevGroup = index > 0 ? essays[index - 1]!.group : null;
            const showDivider = index === 0 || part.group !== prevGroup;

            return (
              <div key={part.slug}>
                {showDivider ? (
                  <div className={`pl-10 sm:pl-14 ${index === 0 ? "mb-2" : "mb-2 mt-10"}`}>
                    <div className="text-[11px] uppercase tracking-[0.28em] text-[#b8d4e8]/45">
                      {part.group}
                    </div>
                  </div>
                ) : null}
                <PartCard part={part} isLast={index === essays.length - 1} />
              </div>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}
