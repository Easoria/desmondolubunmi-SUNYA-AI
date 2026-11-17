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

function buildAlsoUsefulGroups(problem: ProblemPage): {
  groups: PracticeGroup[];
  practiceCount: number;
} {
  const startKeys = new Set(
    problem.startHere.map((entry) => `${entry.leverSlug}/${entry.practiceSlug}`),
  );
  const bySlug = new Map(getLeversInOrder().map((lever) => [lever.slug, lever]));
  const groups: PracticeGroup[] = [];
  let practiceCount = 0;
  const tags = new Set(problem.alsoUsefulProblemTags ?? []);

  for (const leverSlug of PROBLEM_PRACTICE_LEVER_ORDER) {
    const lever = bySlug.get(leverSlug) ?? leverLibrary[leverSlug as LeverSlug];
    if (!lever) continue;
    const practices = getAllLeverPractices(lever)
      .filter((practice) => {
        const key = `${lever.slug}/${practice.slug}`;
        if (startKeys.has(key)) return false;
        if (problem.code && practice.families?.includes(problem.code)) return true;
        if (tags.size && practice.problems?.some((tag) => tags.has(tag))) return true;
        return false;
      })
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

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return <span key={index}>{part}</span>;
  });
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

    const { groups, practiceCount } = buildAlsoUsefulGroups(problem);
    const { code: _code, ...publicProblem } = problem;

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

function StartHereSection({ problem }: { problem: Omit<ProblemPage, "code"> }) {
  if (!problem.startHere.length) return null;

  return (
    <section className="mt-12 border-t border-white/10 pt-8 sm:mt-14 sm:pt-10">
      <h2 className="display text-2xl text-white">Start here</h2>
      <ol className="problems-start-here">
        {problem.startHere.map((entry, index) => (
          <li key={`${entry.leverSlug}/${entry.practiceSlug}`} className="problems-start-card">
            <Link
              to="/practices/$leverSlug/$practiceSlug"
              params={{ leverSlug: entry.leverSlug, practiceSlug: entry.practiceSlug }}
              className="problems-start-card__main"
            >
              <span className="problems-start-card__index" aria-hidden>
                {index + 1}
              </span>
              <div className="problems-start-card__body">
                <div className="problems-start-card__name-row">
                  <h3 className="problems-start-card__name">{entry.name}</h3>
                  <span className="problems-start-card__affordance" aria-hidden>
                    Practice →
                  </span>
                </div>
                <p className="problems-start-card__why">{entry.whyFirst}</p>
              </div>
            </Link>
            {entry.mechanisms.length ? (
              <p className="problems-start-card__evidence">
                <span>Evidence</span>
                {entry.mechanisms.map((mechanism) => (
                  <span key={mechanism.slug}>
                    <span aria-hidden> · </span>
                    <Link to="/evidence/$slug" params={{ slug: mechanism.slug }}>
                      {mechanism.name}
                    </Link>
                  </span>
                ))}
                <span aria-hidden> →</span>
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
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

        <StartHereSection problem={problem} />

        {problem.evidenceSays ? (
          <section className="mt-12 border-t border-white/10 pt-8 sm:mt-14 sm:pt-10">
            <h2 className="display text-2xl text-white">What the evidence actually says</h2>
            <p className="mt-3 text-[15px] leading-7 text-[#b8d4e8] sm:text-base sm:leading-7">
              {renderInlineMarkdown(problem.evidenceSays)}
            </p>
          </section>
        ) : null}

        {practiceCount > 0 ? (
          <section className="mt-12 border-t border-white/10 pt-8 sm:mt-14 sm:pt-10">
            <details className="group">
              <summary className="cursor-pointer list-none">
                <h2 className="display inline text-2xl text-white">Also useful</h2>
                <span className="ml-3 text-sm text-[#7ec8e3]/80 group-open:hidden">Show</span>
                <span className="ml-3 hidden text-sm text-[#7ec8e3]/80 group-open:inline">Hide</span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-[#b8d4e8]/85 sm:text-[15px] sm:leading-7">
                Further practices that touch this state, grouped by lever. Start here is enough for
                most people; open this only if you want the wider set.
              </p>
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
                            <span className="display text-lg text-white sm:text-xl">
                              {practice.name}
                            </span>
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
            </details>
          </section>
        ) : null}

        {problem.ifSevere ? (
          <section className="mt-12 border-t border-white/10 pt-8 sm:mt-14 sm:pt-10">
            <h2 className="display text-2xl text-white">If this is severe</h2>
            <p className="mt-3 text-[15px] leading-7 text-[#b8d4e8] sm:text-base sm:leading-7">
              {problem.ifSevere}
            </p>
          </section>
        ) : null}

        <div className="my-12 max-w-full border-t border-[#7ec8e3]/20" aria-hidden="true" />

        <div>
          <EmailCapture variant="problem" />
          <p className="mt-6 text-sm text-[#b8d4e8]/65">
            <Link to="/gatherings" className="transition hover:text-white">
              Or come to a gathering →
            </Link>
          </p>
        </div>

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
      </main>
      <Footer />
    </div>
  );
}
