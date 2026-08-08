import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getAllLeverPractices, getLeverBySlug } from "@/data/levers";
import { buildBreadcrumbSchema, buildSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/practices/$leverSlug/complete")({
  loader: ({ params }) => {
    const lever = getLeverBySlug(params.leverSlug);
    if (!lever) throw notFound();
    return { lever };
  },
  component: CompleteLeverPage,
  head: ({ loaderData }) => {
    if (!loaderData?.lever) return {};
    const { lever } = loaderData;
    const title = `${lever.name} Complete Reader's Edition | Sunya`;
    const description = `Complete reader's edition of ${lever.name}.`;
    const path = `/practices/${lever.slug}/complete`;
    const breadcrumbSchema = buildBreadcrumbSchema([
      { name: "Practices", path: "/practices" },
      { name: lever.name, path: `/practices/${lever.slug}` },
      { name: "Complete", path },
    ]);

    return {
      ...buildSeoHead({
        title,
        description,
        path,
        ogType: "website",
        imageKind: "lever",
        extraMeta: [{ name: "robots", content: "noindex, follow" }],
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbSchema),
        },
      ],
    };
  },
});

function CompleteLeverPage() {
  const { lever } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#b8d4e8]/80">
          <Link to="/practices" className="hover:text-white">
            Practices
          </Link>
          <span>/</span>
          <Link to="/practices/$leverSlug" params={{ leverSlug: lever.slug }} className="hover:text-white">
            {lever.name}
          </Link>
          <span>/</span>
          <span>Complete</span>
        </div>

        <h1 className="display mt-5 text-3xl text-white sm:mt-6 sm:text-5xl">
          Lever {String(lever.number).padStart(2, "0")} — {lever.name}
        </h1>
        <p className="mt-2 text-sm italic text-[#b8d4e8]/80">Reader&apos;s edition</p>

        <div className="mt-8 max-w-[72ch] space-y-5 text-[15px] leading-7 text-[#b8d4e8] sm:text-base">
          {lever.intro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {lever.groups?.length ? (
          <div className="mt-10 space-y-12">
            {lever.groups.map((group) => (
              <section key={group.slug}>
                <h2 className="display text-3xl text-white">{group.name}</h2>
                {group.qualifier ? (
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[#7ec8e3]/85">{group.qualifier}</p>
                ) : null}
                {group.description?.map((paragraph, index) => (
                  <p key={index} className="mt-3 text-sm text-[#b8d4e8]">
                    {paragraph}
                  </p>
                ))}
                <div className="mt-5 space-y-8">
                  {group.practices.map((practice) => (
                    <PracticeFull key={practice.slug} practice={practice} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            {getAllLeverPractices(lever).map((practice) => (
              <PracticeFull key={practice.slug} practice={practice} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function PracticeFull({
  practice,
}: {
  practice: {
    sourceNumber?: number;
    name: string;
    subtitle?: string;
    sanskritName?: string;
    notes?: string[];
    essence?: string;
    mechanism?: string[];
    protocol?: { text: string; emphasis?: string }[];
  };
}) {
  return (
    <article className="glass-card rounded-2xl border border-white/10 p-4 sm:p-6">
      <h3 className="display text-[1.7rem] leading-tight text-white sm:text-3xl">
        {practice.sourceNumber ? `${String(practice.sourceNumber).padStart(2, "0")} · ` : null}
        {practice.name}
      </h3>
      {practice.sanskritName ? (
        <p className="mt-1 text-xs italic text-[#b8d4e8]/85">{practice.sanskritName}</p>
      ) : null}
      {practice.subtitle ? <p className="mt-2 text-sm text-[#7ec8e3]/90">{practice.subtitle}</p> : null}
      {practice.notes?.map((note, index) => (
        <p
          key={index}
          className="mt-4 max-w-[72ch] rounded-xl border border-[#dcb48d]/35 bg-[#dcb48d]/8 px-3 py-2 text-sm italic leading-relaxed text-[#f2decb]"
        >
          {note}
        </p>
      ))}
      {practice.essence ? (
        <p className="mt-4 max-w-[72ch] text-[15px] leading-7 text-[#e8f4fb] sm:text-base">
          <span className="label-eyebrow mr-2">Essence</span>
          {practice.essence}
        </p>
      ) : null}
      {practice.mechanism?.length ? (
        <div className="mt-5 max-w-[72ch] space-y-4">
          <p className="label-eyebrow">Mechanism</p>
          {practice.mechanism.map((paragraph, index) => (
            <p key={index} className="text-[15px] leading-7 text-[#b8d4e8] sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
      {practice.protocol?.length ? (
        <div className="mt-6 max-w-[72ch] space-y-3">
          <p className="display text-xl text-white">Protocol</p>
          <ol className="space-y-4">
            {practice.protocol.map((step, index) => (
              <li
                key={index}
                className="rounded-xl border border-[#7ec8e3]/30 bg-[#7ec8e3]/[0.08] px-3 py-2.5 text-[15px] leading-7 text-[#f2f9fe] sm:text-base"
              >
                <span className="font-display text-[#7ec8e3]">{String(index + 1).padStart(2, "0")}.</span>{" "}
                <span>{step.text}</span>
                {step.emphasis ? <em className="block pt-1 text-[#b8d4e8]/90">{step.emphasis}</em> : null}
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </article>
  );
}
