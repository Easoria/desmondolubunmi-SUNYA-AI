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
  readingMinutes,
} from "@/data/essays";
import type { Essay } from "@/data/essays/types";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildSeoHead,
} from "@/lib/seo";

type LoaderData = {
  essay: Essay;
  prev: Essay | null;
  next: Essay | null;
};

export const Route = createFileRoute("/essays/$slug")({
  loader: ({ params }): LoaderData => {
    const essay = getEssayBySlug(params.slug);
    if (!essay) throw notFound();
    const { prev, next } = getAdjacentEssays(essay.slug);
    return { essay, prev, next };
  },
  head: ({ loaderData, params }) => {
    const essay = loaderData?.essay;
    const path = `/essays/${params.slug}`;
    const title = essay ? `${essay.title} | Sunya` : "Essay | Sunya";
    const description = essay
      ? essayMetaDescription(essay)
      : "An essay from the Sunya teaching sequence.";
    return {
      ...buildSeoHead({
        title,
        description,
        path,
        ogType: "article",
        imageKind: "core",
      }),
      scripts: [
        ...(essay
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify(
                  buildArticleSchema({
                    headline: essay.title,
                    description,
                    sectionName: "Essays",
                  }),
                ),
              },
            ]
          : []),
        {
          type: "application/ld+json",
          children: JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Essays", path: "/essays" },
              { name: essay?.title ?? "Essay", path },
            ]),
          ),
        },
      ],
    };
  },
  component: EssayPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <div>
          <h1 className="display text-4xl">Essay not found</h1>
          <Link
            to="/essays"
            className="mt-6 inline-flex items-center gap-2 text-[#7ec8e3]"
          >
            ← Back to the essays
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  ),
});

function bodySections(essay: Essay) {
  const standfirst = essay.standfirst.trim();
  return essay.sections
    .map((section, index) => {
      if (index !== 0) return section;
      const paragraphs = section.paragraphs.filter(
        (paragraph, paragraphIndex) =>
          !(paragraphIndex === 0 && paragraph.trim() === standfirst),
      );
      return { ...section, paragraphs };
    })
    .filter((section) => section.paragraphs.length > 0);
}

function EssayPage() {
  const { essay, prev, next } = Route.useLoaderData();
  const minutes = readingMinutes(essay.wordCount);
  const sections = bodySections(essay);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />

      <article className="mx-auto max-w-3xl px-6 pb-20 pt-10">
        <header className="text-center">
          <div className="label-eyebrow">
            {essay.numbered
              ? `Essay ${String(essay.number).padStart(2, "0")}`
              : "Essay"}
          </div>
          <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-[#b8d4e8]/55">
            {essay.group}
          </p>
          <h1 className="display mt-5 text-4xl text-white sm:text-5xl">
            {essay.title}
          </h1>
          <p className="mt-4 text-sm text-[#b8d4e8]/70">
            {minutes} min read · Desmond Olubunmi
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-left text-[17px] leading-[1.85] text-[#d8e6f0] sm:text-lg">
            {essay.standfirst}
          </p>
        </header>

        <div className="mx-auto mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="mt-12">
          <EssayProse
            sections={sections}
            omitHeadingMatching={essay.title}
          />
        </div>

        <nav className="mt-16 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-2">
          {prev ? (
            <Link
              to="/essays/$slug"
              params={{ slug: prev.slug }}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-[#7ec8e3]/40 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#b8d4e8]/60">
                <ArrowLeft className="h-3.5 w-3.5" /> Previous
              </div>
              <div className="display mt-2 text-xl text-white group-hover:text-[#e8f4fb]">
                {prev.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to="/essays/$slug"
              params={{ slug: next.slug }}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 text-right transition hover:border-[#7ec8e3]/40 hover:bg-white/[0.04] sm:justify-self-end"
            >
              <div className="flex items-center justify-end gap-2 text-xs uppercase tracking-[0.24em] text-[#b8d4e8]/60">
                Next <ArrowRight className="h-3.5 w-3.5" />
              </div>
              <div className="display mt-2 text-xl text-white group-hover:text-[#e8f4fb]">
                {next.title}
              </div>
            </Link>
          ) : null}
        </nav>

        <div className="mt-12 space-y-3 text-center text-sm text-[#b8d4e8]/85">
          <div>
            <Link to="/essays" className="text-[#7ec8e3] transition hover:text-white">
              ← All essays
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
