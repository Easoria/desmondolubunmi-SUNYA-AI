import { useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { EmailCapture } from "@/components/site/EmailCapture";
import { getProblemBySlug } from "@/data/problems";
import type { ProblemVariant } from "@/data/problems/types";

type PublicProblemVariant = Omit<ProblemVariant, "families">;
import { findPracticeInLibrary } from "@/data/levers";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildSeoHead,
} from "@/lib/seo";

export const Route = createFileRoute("/problems/$slug")({
  loader: ({ params }) => {
    const problem = getProblemBySlug(params.slug);
    if (!problem) throw notFound();
    // Strip private diagnostic codes before any HTML/client serialization.
    return {
      problem: {
        ...problem,
        variants: problem.variants.map(({ families: _families, ...variant }) => variant),
      },
    };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData?.problem) return {};
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
              { name: "Practices", path: "/practices" },
              { name: "Sleep", path: "/practices/sleep" },
              { name: problem.title, path },
            ]),
          ),
        },
      ],
    };
  },
  component: ProblemPage,
});

function ProblemPage() {
  const { problem } = Route.useLoaderData();
  const [activeSlug, setActiveSlug] = useState(problem.variants[0]?.slug ?? "");

  const activeVariant =
    problem.variants.find((variant) => variant.slug === activeSlug) ??
    problem.variants[0];

  return (
    <div className="min-h-screen bg-[#07101c] text-white">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pb-28 sm:pt-32">
        <p className="text-xs uppercase tracking-[0.22em] text-[#7ec8e3]/75">Problem</p>
        <h1 className="display mt-4 text-4xl leading-tight text-white sm:text-5xl">
          {problem.title}
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-[#c5dceb] sm:text-2xl">
          {problem.headline}
        </p>

        <section className="mt-12 space-y-5">
          {problem.recognition.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="text-[17px] leading-8 text-[#d5e6f2] sm:text-lg sm:leading-9"
            >
              {paragraph}
            </p>
          ))}
        </section>

        <section className="mt-16 border-t border-white/10 pt-12">
          <h2 className="display text-3xl text-white sm:text-4xl">
            Not all insomnia is the same.
          </h2>
          <p className="mt-5 text-[17px] leading-8 text-[#d5e6f2] sm:text-lg sm:leading-9">
            Most advice treats insomnia as one problem with one list of tips. That is why so much
            of it fails.
          </p>
          <p className="mt-4 text-[17px] leading-8 text-[#d5e6f2] sm:text-lg sm:leading-9">
            A mind that will not switch off is not the same as a body that is depleted but still
            buzzing. Falling asleep worried about tomorrow is not the same as waking at three with
            nowhere for the mind to land. Each of these needs something different — and using the
            wrong approach is often why “good sleep hygiene” still leaves you awake.
          </p>
          <p className="mt-4 text-[17px] leading-8 text-[#d5e6f2] sm:text-lg sm:leading-9">
            Below are four common patterns. Choose the one that feels most like your night. The
            practices that follow are ordered for that pattern: what to do tonight first, then what
            to build over the following days.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="display text-3xl text-white sm:text-4xl">Which is yours?</h2>

          {/* Desktop: selector + panel */}
          <div className="mt-8 hidden gap-8 lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
            <div className="space-y-2">
              {problem.variants.map((variant) => {
                const selected = variant.slug === activeSlug;
                return (
                  <button
                    key={variant.slug}
                    type="button"
                    onClick={() => setActiveSlug(variant.slug)}
                    className={`w-full rounded-xl border px-4 py-4 text-left transition ${
                      selected
                        ? "border-[#7ec8e3]/55 bg-[#7ec8e3]/10 text-white"
                        : "border-white/10 bg-transparent text-[#b8d4e8]/45 hover:border-white/20 hover:text-[#b8d4e8]/80"
                    }`}
                  >
                    <span className="display block text-xl leading-snug">{variant.label}</span>
                  </button>
                );
              })}
            </div>
            {activeVariant ? <VariantPanel variant={activeVariant} /> : null}
          </div>

          {/* Mobile: accordion, one open */}
          <div className="mt-8 space-y-3 lg:hidden">
            {problem.variants.map((variant) => {
              const selected = variant.slug === activeSlug;
              return (
                <div
                  key={variant.slug}
                  className={`overflow-hidden rounded-xl border ${
                    selected ? "border-[#7ec8e3]/40" : "border-white/10"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveSlug(variant.slug)}
                    className="flex w-full items-center gap-3 px-4 py-4 text-left"
                  >
                    <span className="display flex-1 text-xl text-white">{variant.label}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#7ec8e3] transition ${
                        selected ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {selected ? (
                    <div className="border-t border-white/10 px-4 pb-5 pt-4">
                      <VariantPanel variant={variant} />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-20 border-t border-white/10 pt-12">
          <h2 className="display text-3xl text-white">Why this works</h2>
          <p className="mt-5 text-[17px] leading-8 text-[#d5e6f2] sm:text-lg sm:leading-9">
            Sleep is one of twelve levers in a complete framework for human wellbeing. If the
            practices help and you want to understand the whole system — what is actually happening
            and why — it is all here, free.
          </p>
          <p className="mt-5">
            <Link
              to="/practices"
              className="inline-flex min-h-12 items-center text-[#7ec8e3] underline decoration-[#7ec8e3]/35 underline-offset-4 transition hover:text-white"
            >
              Explore the practices →
            </Link>
          </p>
        </section>

        <div className="my-16 max-w-full border-t border-[#7ec8e3]/20" aria-hidden="true" />

        <div>
          <EmailCapture variant="problem" />
          <p className="mt-8 text-base leading-relaxed text-[#b8d4e8]/85">
            Not sure which pattern is yours?{" "}
            <Link
              to="/sunya-ai"
              className="text-[#7ec8e3] underline decoration-[#7ec8e3]/35 underline-offset-2 transition hover:text-white"
            >
              Sunya AI
            </Link>{" "}
            can help identify where your system is contracted and what matters most right now.
          </p>
          <p className="mt-4 text-base text-[#b8d4e8]/65">
            <Link to="/work-with-me" className="transition hover:text-white">
              Or work with Desmond directly, one-to-one →
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function VariantPanel({ variant }: { variant: PublicProblemVariant }) {
  const practices = variant.practiceSlugs
    .map((slug) => findPracticeInLibrary(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div>
      <h3 className="display text-2xl text-white sm:text-3xl">{variant.label}</h3>
      <p className="mt-4 text-[17px] leading-8 text-[#d5e6f2] sm:text-lg sm:leading-9">
        {variant.description}
      </p>
      <ul className="mt-6 space-y-2">
        {variant.signs.map((sign) => (
          <li
            key={sign}
            className="flex gap-3 text-[16px] leading-7 text-[#c5dceb] sm:text-[17px]"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7ec8e3]/70" />
            <span>{sign}</span>
          </li>
        ))}
      </ul>

      {variant.sequenceNote ? (
        <p className="mt-6 rounded-xl border border-[#7ec8e3]/25 bg-[#7ec8e3]/8 px-4 py-4 text-[15px] leading-7 text-[#d5e6f2]">
          {variant.sequenceNote}
        </p>
      ) : null}

      <h4 className="mt-10 text-xs uppercase tracking-[0.22em] text-[#7ec8e3]/8">
        What to do — in order
      </h4>
      <ol className="mt-4 space-y-3">
        {practices.map(({ lever, practice }, index) => (
          <li key={practice.slug}>
            <Link
              to="/practices/$leverSlug/$practiceSlug"
              params={{ leverSlug: lever.slug, practiceSlug: practice.slug }}
              className="block rounded-xl border border-white/10 px-4 py-4 transition hover:border-[#7ec8e3]/35 hover:bg-white/[0.03]"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-xs tabular-nums text-[#7ec8e3]/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="display text-xl text-white">{practice.name}</span>
              </div>
              {practice.essence ? (
                <p className="mt-2 pl-8 text-[15px] leading-7 text-[#b8d4e8]/9">
                  {practice.essence}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
