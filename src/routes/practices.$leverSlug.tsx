import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Starfield } from "@/components/Starfield";
import {
  getAllLeverPractices,
  getLeverBySlug,
  getLeverPracticeCount,
  getPreviousAndNextLevers,
} from "@/data/levers";
import type { LeverSlug } from "@/data/levers";
import { leverHubPath } from "@/lib/practice-library";

export const Route = createFileRoute("/practices/$leverSlug")({
  loader: ({ params }) => {
    const lever = getLeverBySlug(params.leverSlug);
    if (!lever) throw notFound();
    return { lever };
  },
  component: LeverHubPage,
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData.lever.metaTitle },
      {
        name: "description",
        content: loaderData.lever.metaDescription,
      },
    ],
  }),
});

function LeverHubPage() {
  const { lever } = Route.useLoaderData();
  const practiceCount = getLeverPracticeCount(lever);
  const { previous, next } = getPreviousAndNextLevers(lever.slug as LeverSlug);
  const hasGroups = !!(lever.groups && lever.groups.length > 0);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <section className="relative overflow-hidden pb-24 pt-32">
        <Starfield density={0.35} />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">LEVER {String(lever.number).padStart(2, "0")}</div>
            <h1 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              {lever.name}
            </h1>
            <p className="mt-3 text-sm italic text-[#b8d4e8]/85">{lever.layerLine}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[#7ec8e3]/85">
              {practiceCount} practices
            </p>
            <div className="mx-auto mt-4 flex max-w-md items-center justify-center gap-2 text-xs text-[#b8d4e8]/75">
              <Link to="/practices" className="hover:text-white">
                Practices
              </Link>
              <span>·</span>
              <span>{lever.name}</span>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl space-y-4 text-[#b8d4e8]">
            {lever.intro.map((paragraph, index) => (
              <p key={index} className="text-[15px] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {lever.leadEssence ? (
            <div className="glass-strong mx-auto mt-12 max-w-5xl border border-[#dcb48d]/40 p-6 sm:p-8">
              <h2 className="display text-3xl text-white">The prerequisite</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#b8d4e8]">{lever.leadEssence}</p>
              {lever.leadMechanism ? (
                <p className="mt-4 text-[15px] leading-relaxed text-[#b8d4e8]">{lever.leadMechanism}</p>
              ) : null}
              {lever.leadBridgeLine ? (
                <p className="mt-4 text-sm italic text-[#dcb48d]/90">{lever.leadBridgeLine}</p>
              ) : null}
            </div>
          ) : null}

          {hasGroups ? (
            <div className="mt-12 space-y-10">
              {lever.groups!.map((group) => (
                <section key={group.slug}>
                  <h2 className="display text-3xl text-white">{group.name}</h2>
                  {group.qualifier ? (
                    <p className="mt-1 text-sm uppercase tracking-[0.22em] text-[#7ec8e3]/85">
                      {group.qualifier}
                    </p>
                  ) : null}
                  {group.description?.map((description, index) => (
                    <p key={index} className="mt-3 text-sm leading-relaxed text-[#b8d4e8]">
                      {description}
                    </p>
                  ))}
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {group.practices.map((practice) => (
                      <PracticeCard
                        key={practice.slug}
                        leverSlug={lever.slug}
                        practice={practice}
                        sourceNumber={practice.sourceNumber}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <section className="mt-12">
              <div className="grid gap-4 md:grid-cols-2">
                {getAllLeverPractices(lever).map((practice, index) => (
                  <PracticeCard
                    key={practice.slug}
                    leverSlug={lever.slug}
                    practice={practice}
                    sourceNumber={practice.sourceNumber ?? index + 1}
                  />
                ))}
              </div>
            </section>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/practices/$leverSlug/complete"
              params={{ leverSlug: lever.slug }}
              className="inline-flex items-center gap-2 text-sm text-[#7ec8e3] transition hover:text-white"
            >
              Read the complete lever edition <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid gap-4 text-sm text-[#b8d4e8] sm:grid-cols-2">
            {previous ? (
              <Link to={leverHubPath(previous.slug)} className="glass-card px-4 py-3 hover:text-white">
                ← Lever {String(previous.number).padStart(2, "0")} · {previous.name}
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                to={leverHubPath(next.slug)}
                className="glass-card px-4 py-3 text-right hover:text-white"
              >
                Lever {String(next.number).padStart(2, "0")} · {next.name} →
              </Link>
            ) : null}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function PracticeCard({
  leverSlug,
  practice,
  sourceNumber,
}: {
  leverSlug: string;
  practice: {
    slug: string;
    name: string;
    subtitle?: string;
    sanskritName?: string;
    essence?: string;
    duration?: string;
  };
  sourceNumber?: number;
}) {
  const essencePreview = practice.essence
    ? practice.essence.match(/[^.!?]+[.!?]/)?.[0] ?? practice.essence
    : "";
  return (
    <Link
      to="/practices/$leverSlug/$practiceSlug"
      params={{ leverSlug, practiceSlug: practice.slug }}
      className="glass-card relative block overflow-hidden rounded-2xl border border-white/10 p-5 transition hover:border-[#7ec8e3]/45 hover:bg-white/[0.05]"
    >
      {sourceNumber ? (
        <div className="pointer-events-none absolute right-4 top-2 font-display text-5xl text-[#7ec8e3]/15">
          {String(sourceNumber).padStart(2, "0")}
        </div>
      ) : null}
      <div className="relative z-10">
        <h3 className="display text-2xl text-white">{practice.name}</h3>
        {practice.sanskritName ? (
          <p className="mt-1 text-xs italic text-[#b8d4e8]/85">{practice.sanskritName}</p>
        ) : null}
        {practice.subtitle ? (
          <p className="mt-2 text-sm text-[#7ec8e3]/90">{practice.subtitle}</p>
        ) : null}
        {essencePreview ? (
          <p className="mt-3 text-sm leading-relaxed text-[#b8d4e8]">{essencePreview}</p>
        ) : null}
        {practice.duration ? (
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#7ec8e3]/85">{practice.duration}</p>
        ) : null}
      </div>
    </Link>
  );
}
