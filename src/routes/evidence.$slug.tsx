import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { EvidenceMarkdown } from "@/components/evidence/EvidenceMarkdown";
import { getCompleteEvidenceMechanisms, getEvidenceMechanism } from "@/data/evidence";
import { buildArticleSchema, buildBreadcrumbSchema, buildSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/evidence/$slug")({
  loader: ({ params }) => {
    const mechanism = getEvidenceMechanism(params.slug);
    if (!mechanism || mechanism.status !== "complete" || !mechanism.markdown) {
      throw notFound();
    }
    return { mechanism };
  },
  head: ({ loaderData, params }) => {
    const m = loaderData?.mechanism;
    if (!m) return {};
    const path = `/evidence/${params.slug}`;
    return {
      ...buildSeoHead({
        title: `${m.title} — Evidence | Sunya`,
        description: m.description,
        path,
        ogType: "article",
        imageKind: "core",
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            buildArticleSchema({
              headline: m.title,
              description: m.description,
              sectionName: "Evidence",
              path,
            }),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Evidence", path: "/evidence" },
              { name: m.title, path },
            ]),
          ),
        },
      ],
    };
  },
  component: EvidenceMechanismPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <div>
          <h1 className="display text-4xl">Mechanism not found</h1>
          <Link to="/evidence" className="mt-6 inline-flex text-[#7ec8e3]">
            ← Back to the evidence base
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  ),
});

function EvidenceMechanismPage() {
  const { mechanism } = Route.useLoaderData();
  const siblings = getCompleteEvidenceMechanisms();
  const index = siblings.findIndex((m) => m.slug === mechanism.slug);
  const previous = index > 0 ? siblings[index - 1] : null;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null;

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <p className="mb-8">
          <Link
            to="/evidence"
            className="text-sm text-[#7ec8e3] transition hover:text-white"
          >
            ← All mechanisms
          </Link>
        </p>

        <EvidenceMarkdown
          markdown={mechanism.markdown ?? ""}
          mechanismSlug={mechanism.slug}
        />

        <nav className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          {previous ? (
            <Link
              to="/evidence/$slug"
              params={{ slug: previous.slug }}
              className="text-sm text-[#b8d4e8] transition hover:text-white"
            >
              ← {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/evidence/$slug"
              params={{ slug: next.slug }}
              className="text-sm text-[#b8d4e8] transition hover:text-white sm:text-right"
            >
              {next.title} →
            </Link>
          ) : null}
        </nav>
      </main>
      <Footer />
    </div>
  );
}
