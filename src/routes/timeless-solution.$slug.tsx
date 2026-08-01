import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EssayProse } from "@/components/essays/EssayProse";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import {
  essayMetaDescription,
  getAdjacentEssays,
  getEssayBySlug,
  partLabel,
  readingMinutes,
  TIMELESS_SOLUTION_TOTAL,
} from "@/data/essays";
import type { Essay } from "@/data/essays/types";
import { blockToText, blocksToParagraphs } from "@/data/essays/types";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildSeoHead,
} from "@/lib/seo";

type LoaderData = {
  part: Essay;
  prev: Essay | null;
  next: Essay | null;
};

export const Route = createFileRoute("/timeless-solution/$slug")({
  loader: ({ params }): LoaderData => {
    const part = getEssayBySlug(params.slug);
    if (!part) throw notFound();
    const { prev, next } = getAdjacentEssays(part.slug);
    return { part, prev, next };
  },
  head: ({ loaderData, params }) => {
    const part = loaderData?.part;
    const path = `/timeless-solution/${params.slug}`;
    const title = part
      ? `${part.title} — The Timeless Solution | Sunya`
      : "The Timeless Solution | Sunya";
    const description = part
      ? essayMetaDescription(part)
      : "A part of The Timeless Solution — the complete Sunya framework.";
    return {
      ...buildSeoHead({
        title,
        description,
        path,
        ogType: "article",
        imageKind: "core",
      }),
      scripts: [
        ...(part
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify(
                  buildArticleSchema({
                    headline: part.title,
                    description,
                    sectionName: "The Timeless Solution",
                    articleSection: "The Timeless Solution",
                    path: `/timeless-solution/${params.slug}`,
                  }),
                ),
              },
            ]
          : []),
        {
          type: "application/ld+json",
          children: JSON.stringify(
            buildBreadcrumbSchema([
              { name: "The Timeless Solution", path: "/timeless-solution" },
              { name: part?.title ?? "Part", path },
            ]),
          ),
        },
      ],
    };
  },
  component: TimelessSolutionPartPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <div>
          <h1 className="display text-4xl">Part not found</h1>
          <Link
            to="/timeless-solution"
            className="mt-6 inline-flex items-center gap-2 text-[#7ec8e3]"
          >
            ← Back to The Timeless Solution
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  ),
});

function bodySections(part: Essay) {
  const standfirst = part.standfirst.trim();
  return part.sections
    .map((section, index) => {
      if (index !== 0) return section;
      const blocks = (section.blocks ?? []).filter((block, blockIndex) => {
        if (blockIndex !== 0) return true;
        return blockToText(block).trim() !== standfirst;
      });
      return {
        ...section,
        blocks,
        paragraphs: blocksToParagraphs(blocks),
      };
    })
    .filter(
      (section) =>
        (section.blocks?.length ?? 0) > 0 || (section.paragraphs?.length ?? 0) > 0,
    );
}

function TimelessSolutionPartPage() {
  const { part, prev, next } = Route.useLoaderData();
  const minutes = readingMinutes(part.wordCount);
  const sections = bodySections(part);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />

      <article className="mx-auto max-w-3xl px-6 pb-20 pt-10">
        <header className="text-center">
          <div className="text-[11px] uppercase tracking-[0.32em] text-[#7ec8e3]">
            {partLabel(part.number)}
          </div>
          <h1 className="display mt-5 text-4xl text-white sm:text-5xl">
            {part.title}
          </h1>
          <p className="mt-4 text-sm text-[#b8d4e8]/70">
            {minutes} min read · Desmond Olubunmi
          </p>
          <p className="mt-2 text-xs tracking-wide text-[#b8d4e8]/55">
            Part {part.number} of {TIMELESS_SOLUTION_TOTAL}
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-left text-[17px] leading-[1.85] text-[#b8d4e8] sm:text-lg">
            {part.standfirst}
          </p>
        </header>

        <div className="mx-auto mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="mt-12">
          <EssayProse sections={sections} omitHeadingMatching={part.title} />
        </div>

        <nav className="mt-16 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-2">
          {prev ? (
            <Link
              to="/timeless-solution/$slug"
              params={{ slug: prev.slug }}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-[#7ec8e3]/40 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#b8d4e8]/60">
                <ArrowLeft className="h-3.5 w-3.5" /> Previous
              </div>
              <div className="display mt-2 text-xl text-white group-hover:text-[#e8f4fb]">
                {prev.title}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#b8d4e8]/45">
                Part {prev.number}
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to="/timeless-solution/$slug"
              params={{ slug: next.slug }}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 text-right transition hover:border-[#7ec8e3]/40 hover:bg-white/[0.04] sm:justify-self-end"
            >
              <div className="flex items-center justify-end gap-2 text-xs uppercase tracking-[0.24em] text-[#b8d4e8]/60">
                Next <ArrowRight className="h-3.5 w-3.5" />
              </div>
              <div className="display mt-2 text-xl text-white group-hover:text-[#e8f4fb]">
                {next.title}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#b8d4e8]/45">
                Part {next.number}
              </div>
            </Link>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-right sm:justify-self-end">
              <p className="text-sm leading-relaxed text-[#b8d4e8]">
                That is the whole arc.{" "}
                <Link to="/practices" className="text-[#7ec8e3] transition hover:text-white">
                  The practices are how it is walked.
                </Link>
              </p>
            </div>
          )}
        </nav>

        <div className="mt-12 space-y-3 text-center text-sm text-[#b8d4e8]/85">
          <div>
            <Link
              to="/timeless-solution"
              className="text-[#7ec8e3] transition hover:text-white"
            >
              ← The Timeless Solution
            </Link>
          </div>
          <div>
            <Link
              to="/practices/where-to-begin"
              className="text-[#7ec8e3] transition hover:text-white"
            >
              Where to begin with the twelve levers →
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
