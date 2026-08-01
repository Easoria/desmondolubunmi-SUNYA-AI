import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Starfield } from "@/components/Starfield";
import { getLeverBySlug, getPracticeBySlug } from "@/data/levers";

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
    const { practice } = loaderData;
    const howTo =
      practice.protocol && practice.protocol.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: practice.name,
            description: practice.essence ?? practice.metaDescription,
            step: practice.protocol.map((step, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              text: step.text,
            })),
          }
        : null;

    return {
      meta: [
        { title: practice.metaTitle },
        {
          name: "description",
          content: practice.metaDescription,
        },
      ],
      scripts: howTo
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify(howTo),
            },
          ]
        : [],
    };
  },
});

function normalizeProtocolText(text: string) {
  return text.replace(/\r\n/g, "\n").replace(/\s*\n\s*/g, " ").replace(/\s{2,}/g, " ").trim();
}

function splitProtocolSubsteps(text: string) {
  const normalized = normalizeProtocolText(text);
  if (!normalized) return [];

  const extract = (parts: string[]) =>
    parts.map((part) => part.trim()).filter(Boolean);

  const numbered = extract(normalized.split(/\s*(?=\d+[\).\s])/));
  if (numbered.length > 1 && /^\d+[\).]/.test(numbered[0])) return numbered;

  const bulleted = extract(normalized.split(/\s*[•●▪·]\s+/));
  if (bulleted.length > 1) return bulleted;

  const semicolon = extract(normalized.split(/;\s+/));
  if (semicolon.length > 1) return semicolon;

  // Long protocol lines from PDF extraction are easier to follow when each
  // sentence is presented as its own actionable sub-step.
  if (normalized.length > 210) {
    const sentenceParts = extract(normalized.split(/(?<=[.!?])\s+(?=[A-Z(\["“])/));
    if (sentenceParts.length > 1) return sentenceParts;
  }

  return [normalized];
}

function splitProtocolLabel(text: string) {
  const match = text.match(/^([A-Z][^:]{2,52}):\s+(.*)$/);
  if (!match) return null;
  return { label: match[1].trim(), rest: match[2].trim() };
}

function PracticeDetailPage() {
  const { lever, practice } = Route.useLoaderData();
  const related = practice.relatedPractices
    .map((slug) => getPracticeBySlug(lever, slug))
    .filter((entry): entry is NonNullable<typeof entry> => !!entry);

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
            <div className="label-eyebrow">LEVER {String(lever.number).padStart(2, "0")}</div>
            <h1 className="display mt-4 text-3xl text-white sm:text-5xl">{practice.name}</h1>
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
          </div>

          {practice.notes?.map((note, index) => (
            <p
              key={index}
              className="mt-6 max-w-[72ch] rounded-2xl border border-[#dcb48d]/35 bg-[#dcb48d]/8 px-4 py-3 text-sm italic leading-relaxed text-[#f2decb]"
            >
              {note}
            </p>
          ))}

          {practice.essence ? (
            <section className="mt-8 max-w-[72ch]">
              <h2 className="label-eyebrow">Essence</h2>
              <p className="mt-3 text-[15px] leading-7 text-[#b8d4e8] sm:text-base">{practice.essence}</p>
            </section>
          ) : null}

          {practice.mechanism?.length ? (
            <section className="mt-9 max-w-[72ch]">
              <h2 className="label-eyebrow">Mechanism</h2>
              <div className="mt-3 space-y-5 text-[15px] leading-7 text-[#b8d4e8] sm:text-base">
                {practice.mechanism.map((paragraph, index) => (
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
                    const baseChunks = splitProtocolSubsteps(step.text);
                    const firstChunk = baseChunks[0] ?? "";
                    const labelled = splitProtocolLabel(firstChunk);
                    const chunks = labelled ? [labelled.rest, ...baseChunks.slice(1)] : baseChunks;

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
                            {labelled ? (
                              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9ddcf2]">
                                {labelled.label}
                              </p>
                            ) : null}
                            {chunks.length > 1 ? (
                              <ul className="space-y-2 pl-5">
                                {chunks.map((chunk, chunkIndex) => (
                                  <li key={chunkIndex} className="list-disc marker:text-[#7ec8e3]">
                                    {chunk}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>{chunks[0]}</p>
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

          {related.length ? (
            <section className="mt-12 max-w-[72ch]">
              <h2 className="label-eyebrow">Related practices</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    to="/practices/$leverSlug/$practiceSlug"
                    params={{ leverSlug: lever.slug, practiceSlug: item.slug }}
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
