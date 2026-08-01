import { createFileRoute, Link } from "@tanstack/react-router";
import { EssayProse } from "@/components/essays/EssayProse";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { whereToBegin } from "@/data/essays";
import { getLeversInOrder } from "@/data/levers";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildSeoHead,
} from "@/lib/seo";

const SAFETY_HEADING = "7. Pacing, Safety, and the Kundalini Dimension";
const LEVER_MAP_HEADING = "6. The Lever Map — Quick Reference";

export const Route = createFileRoute("/practices/where-to-begin")({
  head: () => ({
    ...buildSeoHead({
      title: `${whereToBegin.title} | Sunya`,
      description: whereToBegin.description,
      path: "/practices/where-to-begin",
      ogType: "article",
      imageKind: "core",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          buildArticleSchema({
            headline: whereToBegin.title,
            description: whereToBegin.description,
            sectionName: "Practices",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          buildBreadcrumbSchema([
            { name: "Practices", path: "/practices" },
            { name: "Where to Begin", path: "/practices/where-to-begin" },
          ]),
        ),
      },
    ],
  }),
  component: WhereToBeginPage,
});

function WhereToBeginPage() {
  const levers = getLeversInOrder();
  const sectionsBeforeSafety = whereToBegin.sections.filter(
    (section) => section.heading !== SAFETY_HEADING,
  );
  const safetySection = whereToBegin.sections.find(
    (section) => section.heading === SAFETY_HEADING,
  );

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <header className="text-center">
          <div className="label-eyebrow">Order of operations</div>
          <h1 className="display mt-4 text-3xl text-white sm:text-5xl">
            {whereToBegin.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#b8d4e8] sm:text-base">
            {whereToBegin.description}
          </p>
        </header>

        <aside className="mt-10 rounded-2xl border border-[#dcb48d]/40 bg-[#dcb48d]/[0.08] px-5 py-6 sm:px-7">
          <div className="label-eyebrow text-[#f0dcc8]">Safety first</div>
          <p className="mt-3 text-sm leading-relaxed text-[#e8dcc8] sm:text-[15px]">
            This sequence includes pacing guidance, medical guardrails, and the
            kundalini dimension. Read the safety section before intensifying
            practice — especially breathwork and root-cause awareness work.
          </p>
          <a
            href="#safety"
            className="mt-4 inline-flex text-sm text-[#f0dcc8] underline decoration-[#dcb48d]/50 underline-offset-4 transition hover:text-white"
          >
            Jump to pacing, safety, and kundalini →
          </a>
        </aside>

        <div className="mt-14">
          <EssayProse
            sections={sectionsBeforeSafety}
            sectionIdForHeading={(heading) =>
              heading === LEVER_MAP_HEADING ? "lever-map" : undefined
            }
          />
        </div>

        <section className="mt-12 scroll-mt-28" aria-labelledby="lever-links-heading">
          <h2 id="lever-links-heading" className="display text-2xl text-white sm:text-3xl">
            Open a lever
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#b8d4e8]">
            Jump from the map into the practice library.
          </p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {levers.map((lever) => (
              <Link
                key={lever.slug}
                to="/practices/$leverSlug"
                params={{ leverSlug: lever.slug }}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-[#b8d4e8] transition hover:border-[#7ec8e3]/40 hover:text-white"
              >
                <span className="font-display tracking-[0.18em] text-[#7ec8e3]/80">
                  {String(lever.number).padStart(2, "0")}
                </span>
                <span className="ml-3">{lever.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {safetySection && (
          <div className="mt-14">
            <EssayProse
              sections={[safetySection]}
              sectionIdForHeading={() => "safety"}
              emphasizeHeading={() => true}
            />
          </div>
        )}

        <div className="mt-16 space-y-3 border-t border-white/10 pt-10 text-center text-sm text-[#b8d4e8]/85">
          <div>
            <Link to="/practices" className="text-[#7ec8e3] transition hover:text-white">
              ← Back to the practices
            </Link>
          </div>
          <div>
            <Link to="/essays" className="text-[#7ec8e3] transition hover:text-white">
              Read the essays →
            </Link>
          </div>
          <div>
            <Link
              to="/philosophy"
              hash="zones"
              className="text-[#7ec8e3] transition hover:text-white"
            >
              See the five zones on the philosophy page →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
