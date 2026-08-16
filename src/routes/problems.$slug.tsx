import { useEffect, useState } from "react";
import { Link, createFileRoute, notFound, redirect, useRouterState } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { EmailCapture } from "@/components/site/EmailCapture";
import {
  getAllLeverPractices,
  getLeversInOrder,
  leverLibrary,
} from "@/data/levers";
import type { LeverSlug } from "@/data/levers";
import {
  getProblemPageBySlug,
  PROBLEM_PRACTICE_LEVER_ORDER,
  PROBLEM_SLUG_REDIRECTS,
  type ProblemPage,
} from "@/data/problems";
import {
  readProblemBackOrigin,
  type ProblemBackOrigin,
} from "@/lib/problem-back";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildSeoHead,
} from "@/lib/seo";

type PublicPracticeCard = {
  slug: string;
  name: string;
  essence?: string;
};

type PracticeGroup = {
  leverName: string;
  leverSlug: string;
  practices: PublicPracticeCard[];
};

type LoaderData = {
  problem: Omit<ProblemPage, "code">;
  groups: PracticeGroup[];
  practiceCount: number;
};

function buildPracticeGroups(code: ProblemPage["code"]): {
  groups: PracticeGroup[];
  practiceCount: number;
} {
  const bySlug = new Map(getLeversInOrder().map((lever) => [lever.slug, lever]));
  const groups: PracticeGroup[] = [];
  let practiceCount = 0;

  for (const leverSlug of PROBLEM_PRACTICE_LEVER_ORDER) {
    const lever = bySlug.get(leverSlug) ?? leverLibrary[leverSlug as LeverSlug];
    if (!lever) continue;
    const practices = getAllLeverPractices(lever)
      .filter((practice) => practice.families?.includes(code))
      .map((practice) => ({
        slug: practice.slug,
        name: practice.name,
        essence: practice.essence,
      }));
    if (practices.length === 0) continue;
    practiceCount += practices.length;
    groups.push({
      leverName: lever.name,
      leverSlug: lever.slug,
      practices,
    });
  }

  return { groups, practiceCount };
}

export const Route = createFileRoute("/problems/$slug")({
  loader: ({ params }): LoaderData => {
    const redirected = PROBLEM_SLUG_REDIRECTS[params.slug];
    if (redirected) {
      throw redirect({
        to: "/problems/$slug",
        params: { slug: redirected },
        statusCode: 301,
      });
    }

    const problem = getProblemPageBySlug(params.slug);
    if (!problem) throw notFound();

    const { code, ...publicProblem } = problem;
    const { groups, practiceCount } = buildPracticeGroups(code);

    return {
      problem: publicProblem,
      groups,
      practiceCount,
    };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { problem } = loaderData;
    const path = `/problems/${params.slug}`;
    return {
      ...buildSeoHead({
        title: problem.metaTitle,
        description: problem.metaDescription,
        path,
        ogType: "article",
        imageKind: "core",
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            buildArticleSchema({
              headline: problem.metaTitle,
              description: problem.metaDescription,
              sectionName: "Problems",
              articleSection: "Problems",
              path,
            }),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Problems", path: "/problems" },
              { name: problem.title, path },
            ]),
          ),
        },
      ],
    };
  },
  component: ProblemPageView,
});

function useProblemBackLink() {
  const routerState = useRouterState({ select: (s) => s.location.state });
  const [origin, setOrigin] = useState<ProblemBackOrigin | null>(null);

  useEffect(() => {
    setOrigin(readProblemBackOrigin(routerState));
  }, [routerState]);

  if (origin) {
    return {
      label: `← Back to ${origin.name}`,
      to: origin.path,
    };
  }

  return {
    label: "← All problems",
    to: "/problems",
  };
}

function ProblemBackLink() {
  const back = useProblemBackLink();
  const practiceMatch = back.to.match(/^\/practices\/([^/]+)\/([^/]+)\/?$/);

  if (practiceMatch) {
    return (
      <Link
        to="/practices/$leverSlug/$practiceSlug"
        params={{ leverSlug: practiceMatch[1], practiceSlug: practiceMatch[2] }}
        className="text-sm text-[#7ec8e3] underline decoration-[#7ec8e3]/35 underline-offset-4 transition hover:text-white"
      >
        {back.label}
      </Link>
    );
  }

  return (
    <Link
      to="/problems"
      className="text-sm text-[#7ec8e3] underline decoration-[#7ec8e3]/35 underline-offset-4 transition hover:text-white"
    >
      ← All problems
    </Link>
  );
}

function ProblemPageView() {
  const { problem, groups, practiceCount } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#07101c] text-white">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <ProblemBackLink />

        <h1 className="display mt-6 text-3xl leading-tight text-white sm:mt-8 sm:text-4xl">
          {problem.title}
        </h1>

        <p className="mt-5 text-[15px] leading-7 text-[#b8d4e8] sm:mt-6 sm:text-base sm:leading-7">
          {problem.opening}
        </p>

        <p className="display mt-6 text-xl leading-snug text-[#7ec8e3] sm:mt-7 sm:text-2xl">
          → {problem.turnLine}
        </p>

        <ul className="mt-6 space-y-2.5 sm:mt-7">
          {problem.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 text-[15px] leading-7 text-[#b8d4e8] sm:text-base sm:leading-7"
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7ec8e3]/75"
                aria-hidden
              />
              <span className="min-w-0">{bullet}</span>
            </li>
          ))}
        </ul>

        <section className="mt-10 sm:mt-12">
          <h2 className="display text-2xl text-white">What&apos;s actually happening</h2>
          <p className="mt-3 text-[15px] leading-7 text-[#b8d4e8] sm:text-base sm:leading-7">
            {problem.mechanism}
          </p>
        </section>

        <section className="mt-12 border-t border-white/10 pt-8 sm:mt-14 sm:pt-10">
          <h2 className="display text-2xl text-white">Practices</h2>
          {practiceCount > 1 ? (
            <p className="mt-3 text-sm leading-6 text-[#b8d4e8]/85 sm:text-[15px] sm:leading-7">
              Start with whichever is most available to you right now. The first groups tend to work
              soonest; the later ones build over time.
            </p>
          ) : null}

          {groups.length === 0 ? (
            <p className="mt-6 text-sm text-[#b8d4e8]/80">Practices for this pattern are being tagged.</p>
          ) : (
            <div className="mt-6 space-y-8">
              {groups.map((group) => (
                <div key={group.leverSlug}>
                  <h3 className="text-xs uppercase tracking-[0.22em] text-[#7ec8e3]/80">
                    {group.leverName}
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {group.practices.map((practice) => (
                      <li key={practice.slug}>
                        <Link
                          to="/practices/$leverSlug/$practiceSlug"
                          params={{
                            leverSlug: group.leverSlug,
                            practiceSlug: practice.slug,
                          }}
                          className="block rounded-xl border border-white/10 px-4 py-3 transition hover:border-[#7ec8e3]/35 hover:bg-white/[0.03]"
                        >
                          <span className="display text-lg text-white sm:text-xl">{practice.name}</span>
                          {practice.essence ? (
                            <p className="mt-1.5 text-sm leading-6 text-[#b8d4e8]/9">
                              {practice.essence}
                            </p>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-12 border-t border-white/10 pt-8 sm:mt-14 sm:pt-10">
          <h2 className="display text-2xl text-white">Why this works</h2>
          <p className="mt-3">
            <Link
              to="/framework"
              className="inline-flex min-h-11 items-center text-sm font-semibold tracking-wide text-[#7ec8e3] transition hover:text-white"
            >
              Explore the framework →
            </Link>
          </p>
        </section>

        <div className="my-12 max-w-full border-t border-[#7ec8e3]/20" aria-hidden="true" />

        <div>
          <EmailCapture variant="problem" />
          <p className="mt-6 text-sm text-[#b8d4e8]/65">
            <Link to="/work-with-me" className="transition hover:text-white">
              Or work through this directly with Desmond, one-to-one →
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
