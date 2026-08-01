import { Link, Outlet, createFileRoute, notFound, useRouterState } from "@tanstack/react-router";
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

export const Route = createFileRoute("/practices/$leverSlug")({
  loader: ({ params }) => {
    const lever = getLeverBySlug(params.leverSlug);
    if (!lever) throw notFound();
    return { lever };
  },
  component: LeverRoutePage,
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

function extractSentences(text: string) {
  return (
    text
      .match(/[^.!?]+[.!?]+(?:["”')\]]+)?|[^.!?]+$/g)
      ?.map((sentence) => sentence.trim())
      .filter(Boolean) ?? []
  );
}

function splitLongParagraph(text: string) {
  const normalized = text.replace(/\s*\n\s*/g, " ").replace(/\s{2,}/g, " ").trim();
  const sentences = extractSentences(normalized);
  if (sentences.length < 5 || normalized.length < 520) return [normalized];

  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const next = current ? `${current} ${sentence}` : sentence;
    if (current && next.length > 430) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current = next;
    }
  }

  if (current) chunks.push(current.trim());
  return chunks.filter(Boolean);
}

function formatLeverIntroParagraphs(blocks: string[]) {
  return blocks
    .flatMap((block) => {
      const normalizedBlock = block.replace(/\r\n/g, "\n").trim();
      if (!normalizedBlock) return [];
      return normalizedBlock
        .split(/\n\s*\n/g)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
    })
    .flatMap((paragraph) => splitLongParagraph(paragraph))
    .filter(Boolean);
}

function LeverRoutePage() {
  const { leverSlug } = Route.useParams();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const exactPath = `/practices/${leverSlug}`;

  // This route is a parent of practice-detail and complete routes.
  // Render the hub only on the exact lever URL.
  if (pathname !== exactPath && pathname !== `${exactPath}/`) {
    return <Outlet />;
  }

  return <LeverHubPage />;
}

function LeverHubPage() {
  const { lever } = Route.useLoaderData();
  const practiceCount = getLeverPracticeCount(lever);
  const { previous, next } = getPreviousAndNextLevers(lever.slug as LeverSlug);
  const hasGroups = !!(lever.groups && lever.groups.length > 0);
  const introParagraphs = formatLeverIntroParagraphs(lever.intro);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <section className="relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32">
        <Starfield density={0.35} />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <div className="mb-5 text-left sm:mb-6">
              <Link to="/practices" className="text-sm text-[#7ec8e3] transition hover:text-white">
                ← Back to all practices
              </Link>
            </div>
            <div className="label-eyebrow">LEVER {String(lever.number).padStart(2, "0")}</div>
            <h1 className="display mt-5 text-3xl text-white sm:text-5xl md:text-6xl">
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

          <div className="mx-auto mt-8 max-w-4xl space-y-6 text-[#b8d4e8] sm:mt-10">
            {introParagraphs.map((paragraph, index) => (
              <p key={index} className="text-[15px] leading-8 sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>

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
                  <div className="mt-5 grid gap-3 sm:gap-4 md:grid-cols-2">
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
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
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

          <div className="mt-12 grid gap-3 text-sm text-[#b8d4e8] sm:mt-14 sm:grid-cols-2 sm:gap-4">
            {previous ? (
              <Link
                to="/practices/$leverSlug"
                params={{ leverSlug: previous.slug }}
                className="glass-card px-4 py-3 hover:text-white"
              >
                ← Lever {String(previous.number).padStart(2, "0")} · {previous.name}
              </Link>
            ) : null}
            {next ? (
              <Link
                to="/practices/$leverSlug"
                params={{ leverSlug: next.slug }}
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
  return (
    <Link
      to="/practices/$leverSlug/$practiceSlug"
      params={{ leverSlug, practiceSlug: practice.slug }}
      className="glass-card relative block overflow-hidden rounded-2xl border border-white/10 p-4 sm:p-5 transition hover:border-[#7ec8e3]/45 hover:bg-white/[0.05]"
    >
      {sourceNumber ? (
        <div className="pointer-events-none absolute right-3 top-1.5 font-display text-4xl text-[#7ec8e3]/15 sm:right-4 sm:top-2 sm:text-5xl">
          {String(sourceNumber).padStart(2, "0")}
        </div>
      ) : null}
      <div className="relative z-10">
        <h3 className="display text-[1.65rem] leading-tight text-white sm:text-2xl">{practice.name}</h3>
        {practice.sanskritName ? (
          <p className="mt-1 text-xs italic text-[#b8d4e8]/85">{practice.sanskritName}</p>
        ) : null}
        {practice.subtitle ? (
          <p className="mt-2 text-sm text-[#7ec8e3]/90">{practice.subtitle}</p>
        ) : null}
        {practice.essence ? (
          <p className="mt-3 text-sm leading-relaxed text-[#b8d4e8]">{practice.essence}</p>
        ) : null}
      </div>
    </Link>
  );
}
