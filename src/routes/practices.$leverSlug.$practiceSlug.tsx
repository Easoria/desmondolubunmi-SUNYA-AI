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

function PracticeDetailPage() {
  const { lever, practice } = Route.useLoaderData();
  const related = practice.relatedPractices
    .map((slug) => getPracticeBySlug(lever, slug))
    .filter((entry): entry is NonNullable<typeof entry> => !!entry);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <section className="relative overflow-hidden pb-24 pt-32">
        <Starfield density={0.28} />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <div className="text-sm text-[#b8d4e8]/80">
            <Link to="/practices" className="hover:text-white">
              Practices
            </Link>
            <span className="mx-2">/</span>
            <Link to="/practices/$leverSlug" params={{ leverSlug: lever.slug }} className="hover:text-white">
              {lever.name}
            </Link>
          </div>

          <div className="mt-6">
            <div className="label-eyebrow">LEVER {String(lever.number).padStart(2, "0")}</div>
            <h1 className="display mt-4 text-4xl text-white sm:text-5xl">{practice.name}</h1>
            {practice.sanskritName ? (
              <p className="mt-2 text-sm italic text-[#b8d4e8]/85">{practice.sanskritName}</p>
            ) : null}
            {practice.subtitle ? (
              <p className="mt-3 text-sm text-[#7ec8e3]/90">{practice.subtitle}</p>
            ) : null}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#b8d4e8]/70">
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
              className="mt-6 rounded-2xl border border-[#dcb48d]/35 bg-[#dcb48d]/8 px-4 py-3 text-sm italic leading-relaxed text-[#f2decb]"
            >
              {note}
            </p>
          ))}

          {practice.essence ? (
            <section className="mt-8">
              <h2 className="label-eyebrow">Essence</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#b8d4e8]">{practice.essence}</p>
            </section>
          ) : null}

          {practice.mechanism?.length ? (
            <section className="mt-9">
              <h2 className="label-eyebrow">Mechanism</h2>
              <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-[#b8d4e8]">
                {practice.mechanism.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ) : null}

          {practice.protocol?.length ? (
            <section className="mt-9">
              <h2 className="label-eyebrow">Protocol</h2>
              <ol className="mt-3 space-y-4">
                {practice.protocol.map((step, index) => (
                  <li
                    key={index}
                    className="glass-card rounded-2xl border border-[#7ec8e3]/25 bg-white/[0.03] p-4 text-[15px] leading-relaxed text-[#e8f4fb]"
                  >
                    <span className="mr-2 font-display text-sm text-[#7ec8e3]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{step.text}</span>
                    {step.emphasis ? <em className="mt-2 block text-[#b8d4e8]/90">{step.emphasis}</em> : null}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {related.length ? (
            <section className="mt-10">
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
