import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { EvidenceMarkdown } from "@/components/evidence/EvidenceMarkdown";
import {
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

        <EvidenceMarkdown markdown={EVIDENCE_BASE_INTRO_MARKDOWN} />

        <section className="mt-16 border-t border-white/10 pt-12">
          <h2 className="display text-3xl text-white">The mechanisms</h2>
          <p className="mt-4 text-sm leading-relaxed text-[#b8d4e8]/80">
            Status: <span aria-hidden="true">○</span> not yet researched ·{" "}
            <span aria-hidden="true">●</span> complete. Numbers are assigned at publication, not
            now.
          </p>

          <div className="mt-10 space-y-12">
            {EVIDENCE_GROUPS.map((group) => {
              const mechanisms = getMechanismsByGroup(group.id);
              return (
                <div key={group.id}>
                  <h3 className="display text-xl text-white sm:text-2xl">{group.label}</h3>
                  <ul className="mt-4 space-y-3">
                    {mechanisms.map((m) => (
                      <li key={m.slug} className="text-[15px] leading-relaxed text-[#b8d4e8]">
                        <span className="mr-2 text-[#7ec8e3]" aria-hidden="true">
                          {m.status === "complete" ? "●" : "○"}
                        </span>
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
                        {m.blurb ? (
                          <span className="text-[#b8d4e8]/70"> — <em>{m.blurb}</em></span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-16 border-t border-white/10 pt-10">
          <h2 className="display text-2xl text-white">Completeness</h2>
          <p className="mt-4 text-[15px] leading-8 text-[#b8d4e8]">
            This list was derived from the practice library, not from the literature, so it may be
            incomplete. The test is coverage: every practice must map to at least one mechanism.
            When all of the above are written, any practice left unmapped has revealed a mechanism
            that is missing, and it gets added. The list is finished when no practice is orphaned.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
