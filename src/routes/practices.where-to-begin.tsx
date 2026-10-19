import { createFileRoute, Link } from "@tanstack/react-router";
import {
  EssayProse,
  type EssaySectionPresentation,
} from "@/components/essays/EssayProse";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { whereToBegin } from "@/data/essays";
import type { EssaySection } from "@/data/essays/types";
import { getLeversInOrder } from "@/data/levers";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildSeoHead,
} from "@/lib/seo";

const SAFETY_HEADING = "7. Pacing, Safety, and the Kundalini Dimension";
const LEVER_MAP_HEADING = "6. The Lever Map — Quick Reference";

const JUMP_LINKS = [
  { href: "#principle", label: "Principle" },
  { href: "#zones", label: "Zones" },
  { href: "#phases", label: "Phases" },
  { href: "#lever-map", label: "Lever map" },
  { href: "#safety", label: "Safety" },
] as const;

type SectionKind = "major" | "zone" | "phase" | "step" | "map" | "safety";

function sectionKind(heading: string): SectionKind {
  if (/^Zone\s+\d+/i.test(heading)) return "zone";
  if (/^Step\s+\d+/i.test(heading)) return "step";
  if (/^3\.\s+Phase|^4\.\s+Phase|^5\.\s+Phase/i.test(heading)) return "phase";
  if (heading === LEVER_MAP_HEADING) return "map";
  if (heading === SAFETY_HEADING) return "safety";
  return "major";
}

function sectionAnchor(heading: string): string | undefined {
  if (heading.startsWith("1.")) return "principle";
  if (heading.startsWith("2.")) return "diagnostic";
  if (heading === LEVER_MAP_HEADING) return "lever-map";
  if (heading === SAFETY_HEADING) return "safety";
  const zoneMatch = heading.match(/^Zone\s+(\d+)/i);
  if (zoneMatch) return `zone-${zoneMatch[1]}`;
  const phaseMatch = heading.match(/^(\d+)\.\s+Phase/i);
  if (phaseMatch) return `phase-${Number(phaseMatch[1]) - 2}`;
  const stepMatch = heading.match(/^Step\s+(\d+)/i);
  if (stepMatch) return `step-${stepMatch[1]}`;
  return undefined;
}

function afterEmDash(heading: string): string {
  const parts = heading.split(/\s[—–-]\s/);
  return (parts[1] ?? heading).trim();
}

function presentationFor(heading: string): EssaySectionPresentation {
  const kind = sectionKind(heading);

  if (kind === "zone") {
    const n = heading.match(/^Zone\s+(\d+)/i)?.[1] ?? "";
    return {
      eyebrow: `Zone ${n.padStart(2, "0")}`,
      title: afterEmDash(heading),
      mark: n.padStart(2, "0"),
      shellClassName:
        "scroll-mt-28 relative overflow-hidden rounded-2xl border border-[#7ec8e3]/22 bg-[#7ec8e3]/[0.05] px-5 py-6 sm:px-6 sm:py-7",
      headingClassName: "display text-2xl text-white sm:text-[1.75rem]",
      bodyClassName: "mt-4 space-y-4 border-t border-white/10 pt-4",
    };
  }

  if (kind === "phase") {
    const phaseNum = heading.match(/^(\d+)\./)?.[1];
    const display = phaseNum ? String(Number(phaseNum) - 2).padStart(2, "0") : "";
    return {
      eyebrow: `Phase ${display}`,
      title: afterEmDash(heading.replace(/^\d+\.\s*/, "")),
      mark: display,
      shellClassName:
        "scroll-mt-28 relative overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-[#7ec8e3]/[0.08] via-transparent to-[#0a1628]/40 px-5 py-7 sm:px-8 sm:py-9",
      headingClassName: "display text-[1.65rem] leading-tight text-white sm:text-3xl",
      bodyClassName: "mt-5 space-y-5",
    };
  }

  if (kind === "step") {
    const n = heading.match(/^Step\s+(\d+)/i)?.[1] ?? "";
    return {
      eyebrow: `Step ${n.padStart(2, "0")}`,
      title: afterEmDash(heading),
      mark: n,
      shellClassName:
        "scroll-mt-28 relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-5 sm:px-5 sm:py-6",
      headingClassName: "display text-xl text-white sm:text-2xl",
      bodyClassName: "mt-3 space-y-4",
    };
  }

  if (kind === "map") {
    return {
      eyebrow: "Reference",
      title: "The Lever Map",
      mark: "06",
      shellClassName:
        "scroll-mt-28 relative overflow-hidden rounded-2xl border border-[#7ec8e3]/20 bg-[#06101c]/80 px-5 py-7 sm:px-8 sm:py-9",
      headingClassName: "display text-2xl text-white sm:text-3xl",
      bodyClassName: "mt-5 space-y-4",
    };
  }

  if (kind === "safety") {
    return {
      eyebrow: "Read before intensifying",
      title: "Pacing, Safety, and the Kundalini Dimension",
      mark: "07",
      shellClassName:
        "scroll-mt-28 relative overflow-hidden rounded-2xl border border-[#dcb48d]/35 bg-[#dcb48d]/[0.07] px-5 py-7 sm:px-8 sm:py-9",
      headingClassName: "display text-2xl text-[#f0dcc8] sm:text-3xl",
      bodyClassName: "mt-5 space-y-5",
    };
  }

  // major numbered sections (1, 2)
  const n = heading.match(/^(\d+)\./)?.[1];
  return {
    eyebrow: n ? `Part ${n.padStart(2, "0")}` : undefined,
    title: heading.replace(/^\d+\.\s*/, ""),
    mark: n?.padStart(2, "0"),
    shellClassName:
      "scroll-mt-28 relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-7 sm:px-8 sm:py-9",
    headingClassName: "display text-2xl text-white sm:text-3xl",
    bodyClassName: "mt-5 space-y-5",
  };
}

type Chunk =
  | { type: "single"; section: EssaySection }
  | { type: "zones"; intro: EssaySection; zones: EssaySection[] }
  | { type: "phase"; section: EssaySection; steps: EssaySection[] };

function chunkSections(sections: EssaySection[]): Chunk[] {
  const chunks: Chunk[] = [];
  let i = 0;

  while (i < sections.length) {
    const section = sections[i]!;
    const kind = sectionKind(section.heading);

    if (kind === "major" && section.heading.startsWith("2.")) {
      const zones: EssaySection[] = [];
      let j = i + 1;
      while (j < sections.length && sectionKind(sections[j]!.heading) === "zone") {
        zones.push(sections[j]!);
        j += 1;
      }
      chunks.push({ type: "zones", intro: section, zones });
      i = j;
      continue;
    }

    if (kind === "phase") {
      const steps: EssaySection[] = [];
      let j = i + 1;
      while (j < sections.length && sectionKind(sections[j]!.heading) === "step") {
        steps.push(sections[j]!);
        j += 1;
      }
      chunks.push({ type: "phase", section, steps });
      i = j;
      continue;
    }

    chunks.push({ type: "single", section });
    i += 1;
  }

  return chunks;
}

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

function GuideProse({ sections }: { sections: EssaySection[] }) {
  return (
    <EssayProse
      sections={sections}
      autoLinkFramework
      density="guide"
      sectionIdForHeading={sectionAnchor}
      presentationForHeading={presentationFor}
    />
  );
}

function WhereToBeginPage() {
  const levers = getLeversInOrder();
  const sectionsBeforeSafety = whereToBegin.sections.filter(
    (section) => section.heading !== SAFETY_HEADING,
  );
  const safetySection = whereToBegin.sections.find(
    (section) => section.heading === SAFETY_HEADING,
  );
  const chunks = chunkSections(sectionsBeforeSafety);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#07101c] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(ellipse_at_top,_rgba(126,200,227,0.14)_0%,_transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-[28rem] h-72 w-72 rounded-full bg-[#7ec8e3]/[0.06] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-[72rem] h-80 w-80 rounded-full bg-[#dcb48d]/[0.05] blur-3xl"
        aria-hidden
      />

      <Nav />
      <Breadcrumb />

      <main className="relative mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-6">
        <header className="text-center">
          <div className="label-eyebrow">Order of operations</div>
          <h1 className="display mt-4 text-3xl leading-tight text-white sm:text-5xl">
            {whereToBegin.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[#d2e4f0] sm:text-base sm:leading-8">
            {whereToBegin.description}
          </p>
        </header>

        <nav
          aria-label="On this page"
          className="sticky top-[4.25rem] z-20 -mx-1 mt-10 overflow-x-auto px-1 py-2 backdrop-blur-md"
        >
          <div className="flex min-w-max items-center justify-center gap-2 sm:gap-2.5">
            {JUMP_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/10 bg-[#07101c]/85 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#b8d4e8] transition hover:border-[#7ec8e3]/45 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <aside className="mt-8 rounded-2xl border border-[#dcb48d]/40 bg-[#dcb48d]/[0.08] px-5 py-6 sm:px-7">
          <div className="label-eyebrow text-[#f0dcc8]">Safety first</div>
          <p className="mt-3 text-[15px] leading-7 text-[#e8dcc8] sm:text-base sm:leading-8">
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

        <div className="mt-14 space-y-14">
          {chunks.map((chunk) => {
            if (chunk.type === "zones") {
              return (
                <div key={chunk.intro.heading} id="zones" className="scroll-mt-28 space-y-6">
                  <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <div className="label-eyebrow">Diagnostic</div>
                      <h2 className="display mt-2 text-2xl text-white sm:text-3xl">
                        The five zones
                      </h2>
                    </div>
                    <p className="hidden max-w-[14rem] text-right text-xs leading-relaxed text-[#9fb9cc] sm:block">
                      Find the zone that fits. Start there — not everywhere.
                    </p>
                  </div>
                  <GuideProse sections={[chunk.intro]} />
                  <div className="space-y-4">
                    {chunk.zones.map((zone, index) => (
                      <div
                        key={zone.heading}
                        className="animate-[fade-up_0.55s_ease] [animation-fill-mode:both]"
                        style={{ animationDelay: `${index * 40}ms` }}
                      >
                        <GuideProse sections={[zone]} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (chunk.type === "phase") {
              const isFirstPhase = chunk.section.heading.startsWith("3.");
              return (
                <div
                  key={chunk.section.heading}
                  id={isFirstPhase ? "phases" : undefined}
                  className={`space-y-4 ${isFirstPhase ? "scroll-mt-28" : ""}`}
                >
                  {isFirstPhase ? (
                    <div className="mb-2 border-b border-white/10 pb-4">
                      <div className="label-eyebrow">The sequence</div>
                      <h2 className="display mt-2 text-2xl text-white sm:text-3xl">
                        Three phases
                      </h2>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#9fb9cc]">
                        External foundation, then breath as entry, then root-cause
                        awareness — in that order.
                      </p>
                    </div>
                  ) : null}
                  <GuideProse sections={[chunk.section]} />
                  {chunk.steps.length > 0 ? (
                    <div className="space-y-3 border-l border-[#7ec8e3]/25 pl-3 sm:pl-4">
                      <div className="label-eyebrow pl-1 text-[#7ec8e3]/75">
                        Inside this phase
                      </div>
                      {chunk.steps.map((step) => (
                        <GuideProse key={step.heading} sections={[step]} />
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <div key={chunk.section.heading}>
                <GuideProse sections={[chunk.section]} />
              </div>
            );
          })}
        </div>

        <section className="mt-14 scroll-mt-28" aria-labelledby="lever-links-heading">
          <div className="border-b border-white/10 pb-4">
            <div className="label-eyebrow">Practice library</div>
            <h2 id="lever-links-heading" className="display mt-2 text-2xl text-white sm:text-3xl">
              Open a lever
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#9fb9cc]">
              Jump from the map into the practice library.
            </p>
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {levers.map((lever) => (
              <Link
                key={lever.slug}
                to="/practices/$leverSlug"
                params={{ leverSlug: lever.slug }}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-[#d2e4f0] transition hover:border-[#7ec8e3]/40 hover:bg-[#7ec8e3]/[0.05] hover:text-white"
              >
                <span className="font-display tracking-[0.18em] text-[#7ec8e3]/80">
                  {String(lever.number).padStart(2, "0")}
                </span>
                <span className="ml-3">{lever.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {safetySection ? (
          <div className="mt-14">
            <GuideProse sections={[safetySection]} />
          </div>
        ) : null}

        <div className="mt-16 space-y-3 border-t border-white/10 pt-10 text-center text-sm text-[#b8d4e8]/85">
          <div>
            <Link to="/practices" className="text-[#7ec8e3] transition hover:text-white">
              ← Back to the practices
            </Link>
          </div>
          <div>
            <Link to="/timeless-solution" className="text-[#7ec8e3] transition hover:text-white">
              Read the Timeless Solution →
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
