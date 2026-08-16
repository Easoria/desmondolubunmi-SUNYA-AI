import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { EmailCapture } from "@/components/site/EmailCapture";
import { getAllProblemPages } from "@/data/problems";
import {
  FAMILY_PROBLEM_META,
  FAMILY_STATE_COLOUR,
  type FamilyProblemMeta,
} from "@/lib/family-labels";
import { buildSeoHead } from "@/lib/seo";

const STATE_ORDER: FamilyProblemMeta["state"][] = ["over", "under", "mixed", "physical"];

function stateForSlug(slug: string): FamilyProblemMeta["state"] {
  const meta = Object.values(FAMILY_PROBLEM_META).find((entry) => entry.slug === slug);
  return meta?.state ?? "mixed";
}

export const Route = createFileRoute("/problems/")({
  head: () =>
    buildSeoHead({
      title: "Find What Helps — Start Where You Actually Are | Sunya",
      description:
        "These are the fifteen difficult states a human system falls into. Find yours, and the practices that work on it.",
      path: "/problems",
      ogType: "website",
      imageKind: "core",
    }),
  component: ProblemsIndexPage,
});

function ProblemsIndexPage() {
  const pages = [...getAllProblemPages()].sort(
    (a, b) => STATE_ORDER.indexOf(stateForSlug(a.slug)) - STATE_ORDER.indexOf(stateForSlug(b.slug)),
  );

  return (
    <div className="min-h-screen bg-[#07101c] text-white">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pb-28 sm:pt-32">
        <h1 className="display text-4xl leading-tight text-white sm:text-5xl">
          Start where you actually are.
        </h1>
        <p className="mt-6 text-[17px] leading-8 text-[#d5e6f2] sm:text-lg sm:leading-9">
          These are the fifteen difficult states a human system falls into. There are no others.
        </p>
        <p className="mt-4 text-[17px] leading-8 text-[#d5e6f2] sm:text-lg sm:leading-9">
          Find yours, and the practices that work on it.
        </p>

        <ul className="mt-12 space-y-3">
          {pages.map((page) => {
            const colour = FAMILY_STATE_COLOUR[stateForSlug(page.slug)];
            return (
              <li key={page.slug}>
                <Link
                  to="/problems/$slug"
                  params={{ slug: page.slug }}
                  className="relative block overflow-hidden rounded-xl border border-[#7ec8e3]/35 bg-[#7ec8e3]/[0.06] px-5 py-5 transition hover:border-[#7ec8e3]/55 hover:bg-[#7ec8e3]/10"
                >
                  <span
                    className="absolute inset-y-0 left-0 w-[3px]"
                    style={{ backgroundColor: colour }}
                    aria-hidden
                  />
                  <h2 className="display text-2xl text-white">{page.title}</h2>
                  <p className="mt-2 text-[15px] leading-7 text-[#b8d4e8]">{page.opening}</p>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 border-t border-white/10 pt-12">
          <p className="text-base leading-relaxed text-[#b8d4e8]/85 sm:text-[17px] sm:leading-8">
            Not sure which of these fits? Describe what you&apos;re experiencing and{" "}
            <Link
              to="/sunya-ai"
              className="text-[#7ec8e3] underline decoration-[#7ec8e3]/35 underline-offset-2 transition hover:text-white hover:decoration-white/50"
            >
              Sunya AI
            </Link>{" "}
            will identify what is actually happening in your system, and which practices fit it.
          </p>
          <div className="mt-10">
            <EmailCapture variant="problems" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
