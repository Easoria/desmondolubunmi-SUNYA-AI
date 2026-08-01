import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Starfield } from "@/components/Starfield";
import { getLeverBySlug, getPracticeBySlug } from "@/data/levers";
import type { LeverSlug } from "@/data/levers";
import { formatNarrativeParagraphs, formatProtocolStepLayout } from "@/lib/practice-text-format";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildPracticeMetaDescription,
  buildPracticeMetaTitle,
  buildSeoHead,
  parseDurationToIso,
} from "@/lib/seo";

const CROSS_LEVER_RELATED: Record<string, { leverSlug: LeverSlug; practiceSlug: string }[]> = {
  "breath/4-7-8-breathing": [{ leverSlug: "sleep", practiceSlug: "the-somatic-runway" }],
};

export const Route = createFileRoute("/practices/$leverSlug/$practiceSlug")({
  loader: ({ params }) => {
    const lever = getLeverBySlug(params.leverSlug);
    if (!lever) throw notFound();
    const practice = getPracticeBySlug(lever, params.practiceSlug);
    if (!practice) throw notFound();
    return { lever, practice };
  },
  component: PracticeDetailPage,
  head: ({ loaderData }) => {
    const { lever, practice } = loaderData;
    const title = buildPracticeMetaTitle(practice);
    const description = buildPracticeMetaDescription(practice);
    const path = `/practices/${lever.slug}/${practice.slug}`;
    const totalTime = parseDurationToIso(practice.duration);
    const howTo =
      practice.protocol && practice.protocol.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: practice.name,
            description: practice.essence ?? description,
            ...(totalTime ? { totalTime } : {}),
            step: practice.protocol.map((step, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              text: step.text,
            })),
          }
        : null;
    const articleSchema = buildArticleSchema({
      headline: title,
      description,
      sectionName: lever.name,
    });
    const breadcrumbSchema = buildBreadcrumbSchema([
      { name: "Practices", path: "/practices" },
      { name: lever.name, path: `/practices/${lever.slug}` },
      { name: practice.name, path },
    ]);

    return {
      ...buildSeoHead({
        title,
        description,
        path,
        ogType: "article",
        imageKind: "practice",
      }),
      scripts: [
        ...(howTo
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify(howTo),
              },
            ]
          : []),
        {
          type: "application/ld+json",
          children: JSON.stringify(articleSchema),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbSchema),
        },
      ],
    };
  },
});

function splitProtocolLeadIn(text: string) {
  const match = text.match(/^([A-Za-z0-9][A-Za-z0-9'’()\-\/&, —–]{1,84})(:)\s+(.+)$/);
  if (!match) return null;
  return {
    leadIn: match[1].trim(),
    punctuation: match[2],
    rest: match[3].trim(),
  };
}

function renderProtocolText(text: string) {
  const parsed = splitProtocolLeadIn(text);
  if (!parsed) return text;

  return (
    <>
      <span className="font-semibold text-[#9ddcf2]">
        {parsed.leadIn}
        {parsed.punctuation}
      </span>{" "}
      {parsed.rest}
    </>
  );
}

function PracticeDetailPage() {
  const { lever, practice } = Route.useLoaderData();
  const sameLeverRelated = practice.relatedPractices
    .map((slug) => {
      const entry = getPracticeBySlug(lever, slug);
      if (!entry) return null;
      return { leverSlug: lever.slug, practiceSlug: entry.slug, name: entry.name };
    })
    .filter((entry): entry is { leverSlug: string; practiceSlug: string; name: string } => !!entry);
  const crossLeverRelated = (CROSS_LEVER_RELATED[`${lever.slug}/${practice.slug}`] ?? [])
    .map(({ leverSlug, practiceSlug }) => {
      const relatedLever = getLeverBySlug(leverSlug);
      if (!relatedLever) return null;
      const relatedPractice = getPracticeBySlug(relatedLever, practiceSlug);
      if (!relatedPractice) return null;
      return { leverSlug: relatedLever.slug, practiceSlug: relatedPractice.slug, name: relatedPractice.name };
    })
    .filter((entry): entry is { leverSlug: string; practiceSlug: string; name: string } => !!entry);
  const related = [...sameLeverRelated, ...crossLeverRelated].filter(
    (entry, index, all) =>
      all.findIndex(
        (candidate) =>
          candidate.leverSlug === entry.leverSlug && candidate.practiceSlug === entry.practiceSlug,
      ) === index,
  );
  const essenceParagraphs = practice.essence
    ? formatNarrativeParagraphs([practice.essence], {
        minSentencesForSplit: 4,
        minCharsForSplit: 420,
        maxChunkChars: 360,
      })
    : [];
  const mechanismParagraphs = practice.mechanism
    ? formatNarrativeParagraphs(practice.mechanism, {
        minSentencesForSplit: 4,
        minCharsForSplit: 420,
        maxChunkChars: 360,
      })
    : [];

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <section className="relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32">
        <Starfield density={0.28} />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#b8d4e8]/80">
            <Link to="/practices" className="hover:text-white">
              Practices
            </Link>
            <span>/</span>
            <Link to="/practices/$leverSlug" params={{ leverSlug: lever.slug }} className="hover:text-white">
              {lever.name}
            </Link>
          </div>

          <div className="mt-6 max-w-[72ch]">
            <h1 className="display text-3xl text-white sm:text-5xl">{practice.name}</h1>
            {practice.sanskritName ? (
              <p className="mt-2 text-sm italic text-[#b8d4e8]/85">{practice.sanskritName}</p>
            ) : null}
            {practice.subtitle ? (
              <p className="mt-3 text-sm text-[#7ec8e3]/90">{practice.subtitle}</p>
            ) : null}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] uppercase leading-relaxed tracking-[0.14em] text-[#b8d4e8]/70 sm:text-xs sm:tracking-[0.2em]">
              <span>{lever.name}</span>
              <span>·</span>
              <span>{practice.layers.join(" + ")}</span>
              {practice.duration ? (
                <>
                  <span>·</span>
                  <span>{practice.duration}</span>
                </>
              ) : null}
            </div>
            <p className="mt-3 text-xs text-[#b8d4e8]/70">
              Written by{" "}
              <Link to="/about" className="underline decoration-[#7ec8e3]/45 underline-offset-2 hover:text-white">
                Desmond Olubunmi
              </Link>{" "}
              · Founder of Sunya
            </p>
          </div>

          {practice.notes?.map((note, index) => {
            const noteParagraphs = formatNarrativeParagraphs([note], {
              minSentencesForSplit: 4,
              minCharsForSplit: 420,
              maxChunkChars: 360,
            });

            return (
              <div
                key={index}
                className="mt-6 max-w-[72ch] space-y-3 rounded-2xl border border-[#dcb48d]/35 bg-[#dcb48d]/8 px-4 py-3 text-sm italic leading-relaxed text-[#f2decb]"
              >
                {noteParagraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
            );
          })}

          {essenceParagraphs.length ? (
            <section className="mt-8 max-w-[72ch]">
              <h2 className="label-eyebrow">Essence</h2>
              <div className="mt-3 space-y-4 text-[15px] leading-7 text-[#b8d4e8] sm:text-base">
                {essenceParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ) : null}

          {mechanismParagraphs.length ? (
            <section className="mt-9 max-w-[72ch]">
              <h2 className="label-eyebrow">Mechanism</h2>
              <div className="mt-3 space-y-5 text-[15px] leading-7 text-[#b8d4e8] sm:text-base">
                {mechanismParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ) : null}

          {practice.protocol?.length ? (
            <section className="mt-10 max-w-[72ch]">
              <h2 className="display text-2xl text-white">Protocol</h2>
              <ol className="mt-4 space-y-4">
                {practice.protocol.map((step, index) => {
                    const layout = formatProtocolStepLayout(step.text);

                    return (
                      <li
                        key={index}
                        className="glass-card rounded-2xl border border-[#7ec8e3]/35 bg-[#7ec8e3]/[0.09] p-4 text-[15px] leading-7 text-[#f2f9fe] sm:p-5 sm:text-base"
                      >
                        <div className="flex gap-3">
                          <span className="mt-0.5 font-display text-sm text-[#7ec8e3]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 flex-1 space-y-3">
                            {layout.kind === "paragraphs" ? (
                              <div className="space-y-3">
                                {layout.items.map((paragraph, paragraphIndex) => (
                                  <p key={paragraphIndex} className="whitespace-pre-line">
                                    {renderProtocolText(paragraph)}
                                  </p>
                                ))}
                              </div>
                            ) : layout.kind === "ordered-list" ? (
                              <ol className="space-y-2 pl-5">
                                {layout.items.map((item, itemIndex) => (
                                  <li key={itemIndex} className="list-decimal marker:text-[#7ec8e3]">
                                    {renderProtocolText(item)}
                                  </li>
                                ))}
                              </ol>
                            ) : (
                              <ul className="space-y-2 pl-5">
                                {layout.items.map((item, itemIndex) => (
                                  <li key={itemIndex} className="list-disc marker:text-[#7ec8e3]">
                                    {renderProtocolText(item)}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {step.emphasis ? (
                              <em className="block text-[#b8d4e8]/90">{step.emphasis}</em>
                            ) : null}
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ol>
            </section>
          ) : null}

          {lever.slug === "sleep" ? (
            <p className="mt-6 max-w-[72ch] text-sm text-[#b8d4e8]/80">
              Desmond has written more extensively on sleep in{" "}
              <a
                href="https://amzn.eu/d/0bzw0W4k"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[#7ec8e3]/45 underline-offset-2 hover:text-white"
              >
                The Sleep Rhythm Reset, an Amazon #1 bestseller in its category.
              </a>
            </p>
          ) : null}

          {related.length ? (
            <section className="mt-12 max-w-[72ch]">
              <h2 className="label-eyebrow">Related practices</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={`${item.leverSlug}/${item.practiceSlug}`}
                    to="/practices/$leverSlug/$practiceSlug"
                    params={{ leverSlug: item.leverSlug, practiceSlug: item.practiceSlug }}
                    className="glass-card rounded-2xl border border-white/10 px-4 py-3 text-sm text-[#b8d4e8] hover:border-[#7ec8e3]/45 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>
      <Footer />
    </div>
  );
}
