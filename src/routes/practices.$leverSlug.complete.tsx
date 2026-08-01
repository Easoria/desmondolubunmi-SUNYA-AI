import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getAllLeverPractices, getLeverBySlug } from "@/data/levers";

export const Route = createFileRoute("/practices/$leverSlug/complete")({
  loader: ({ params }) => {
    const lever = getLeverBySlug(params.leverSlug);
    if (!lever) throw notFound();
    return { lever };
  },
  component: CompleteLeverPage,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.lever.metaTitle} — Complete` },
      {
        name: "description",
        content: `Complete reader's edition of ${loaderData.lever.name}.`,
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function CompleteLeverPage() {
  const { lever } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-32">
        <div className="text-sm text-[#b8d4e8]/80">
          <Link to="/practices" className="hover:text-white">
            Practices
          </Link>
          <span className="mx-2">/</span>
          <Link to="/practices/$leverSlug" params={{ leverSlug: lever.slug }} className="hover:text-white">
            {lever.name}
          </Link>
          <span className="mx-2">/</span>
          <span>Complete</span>
        </div>

        <h1 className="display mt-6 text-4xl text-white sm:text-5xl">
          Lever {String(lever.number).padStart(2, "0")} — {lever.name}
        </h1>
        <p className="mt-2 text-sm italic text-[#b8d4e8]/80">Reader&apos;s edition</p>

        <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-[#b8d4e8]">
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
    <article className="glass-card rounded-2xl border border-white/10 p-6">
      <h3 className="display text-3xl text-white">
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
          className="mt-4 rounded-xl border border-[#dcb48d]/35 bg-[#dcb48d]/8 px-3 py-2 text-sm italic text-[#f2decb]"
        >
          {note}
        </p>
      ))}
      {practice.essence ? (
        <p className="mt-4 text-sm leading-relaxed text-[#e8f4fb]">
          <span className="label-eyebrow mr-2">Essence</span>
          {practice.essence}
        </p>
      ) : null}
      {practice.mechanism?.length ? (
        <div className="mt-4 space-y-3">
          <p className="label-eyebrow">Mechanism</p>
          {practice.mechanism.map((paragraph, index) => (
            <p key={index} className="text-sm leading-relaxed text-[#b8d4e8]">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
      {practice.protocol?.length ? (
        <div className="mt-4 space-y-3">
          <p className="label-eyebrow">Protocol</p>
          <ol className="space-y-2">
            {practice.protocol.map((step, index) => (
              <li key={index} className="text-sm leading-relaxed text-[#e8f4fb]">
                <span className="font-display text-[#7ec8e3]">{String(index + 1).padStart(2, "0")}.</span>{" "}
                {step.text}
                {step.emphasis ? <em className="block pt-1 text-[#b8d4e8]/90">{step.emphasis}</em> : null}
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </article>
  );
}
