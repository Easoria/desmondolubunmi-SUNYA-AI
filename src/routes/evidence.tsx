import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { EvidenceMarkdown } from "@/components/evidence/EvidenceMarkdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  EVIDENCE_BASE_AFTER_MARKDOWN,
  EVIDENCE_BASE_INTRO_MARKDOWN,
  EVIDENCE_GROUPS,
  getMechanismsByGroup,
} from "@/data/evidence";
import { buildSeoHead, buildBreadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/evidence")({
  head: ({ matches }) => {
    if (!matches?.length || matches[matches.length - 1]?.routeId !== "/evidence") {
      return {};
    }
    return {
      ...buildSeoHead({
        title: "The Sunya Evidence Base | Sunya",
        description:
          "What the research actually says about the mechanisms underneath Sunya practices — graded honestly, including where the evidence is weak.",
        path: "/evidence",
        ogType: "website",
        imageKind: "core",
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            buildBreadcrumbSchema([{ name: "Evidence", path: "/evidence" }]),
          ),
        },
      ],
    };
  },
  component: EvidenceRoutePage,
});

function EvidenceRoutePage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname !== "/evidence" && pathname !== "/evidence/") {
    return <Outlet />;
  }

  return <EvidenceIndexPage />;
}

function EvidenceIndexPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <header className="mb-10">
          <div className="label-eyebrow">Evidence</div>
          <h1 className="display mt-4 text-4xl text-white sm:text-5xl">
            The Sunya Evidence Base
          </h1>
        </header>

        <div className="evidence-intro-hide-footnote-list">
          <EvidenceMarkdown markdown={EVIDENCE_BASE_INTRO_MARKDOWN} />
        </div>

        <section className="mt-16 border-t border-white/10 pt-12">
          <h2 className="display text-3xl text-white">The mechanisms</h2>

          <Accordion type="multiple" className="mt-8 border-t border-white/10">
            {EVIDENCE_GROUPS.map((group) => {
              const mechanisms = getMechanismsByGroup(group.id);
              return (
                <AccordionItem
                  key={group.id}
                  value={group.id}
                  className="border-white/10"
                >
                  <AccordionTrigger className="display py-5 text-left text-xl text-white hover:no-underline sm:text-2xl [&[data-state=open]>svg]:text-[#7ec8e3]">
                    {group.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-0">
                    <ul className="space-y-3">
                      {mechanisms.map((m) => (
                        <li
                          key={m.slug}
                          className="text-[15px] leading-relaxed text-[#b8d4e8]"
                        >
                          {m.status === "complete" ? (
                            <Link
                              to="/evidence/$slug"
                              params={{ slug: m.slug }}
                              className="text-white underline decoration-[#7ec8e3]/35 underline-offset-2 transition hover:decoration-white/50"
                            >
                              {m.title}
                            </Link>
                          ) : (
                            <span>{m.title}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <p className="mt-8 text-[15px] leading-8 text-[#b8d4e8]">
            That last group is listed because finding out that something is unsupported is part of
            the work, not a failure of it. The negative findings are what make the positive ones
            worth believing.
          </p>
        </section>

        {EVIDENCE_BASE_AFTER_MARKDOWN ? (
          <div className="mt-16 border-t border-white/10 pt-4">
            <EvidenceMarkdown markdown={EVIDENCE_BASE_AFTER_MARKDOWN} />
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
