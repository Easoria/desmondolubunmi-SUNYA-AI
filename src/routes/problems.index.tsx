import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { EmailCapture } from "@/components/site/EmailCapture";
import { getAllProblemPages } from "@/data/problems";
import { buildSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/problems/")({
  head: () =>
    buildSeoHead({
      title: "Find What Helps — Start Where You Actually Are | Sunya",
      description:
        "Most advice fails because it treats every version of a problem the same way. Find what is actually happening, and the practice that fits it.",
      path: "/problems",
      ogType: "website",
      imageKind: "core",
    }),
  component: ProblemsIndexPage,
});

function ProblemsIndexPage() {
  const pages = getAllProblemPages();

  return (
    <div className="min-h-screen bg-[#07101c] text-white">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pb-28 sm:pt-32">
        <h1 className="display text-4xl leading-tight text-white sm:text-5xl">
          Start where you actually are.
        </h1>
        <p className="mt-6 text-[17px] leading-8 text-[#d5e6f2] sm:text-lg sm:leading-9">
          Most advice fails because it treats every version of a problem the same way. A racing mind
          and a depleted one both keep you awake, and they need opposite things. Find what is
          actually happening, and the practice that fits it.
        </p>

        <ul className="mt-12 space-y-3">
          {pages.map((page) => (
            <li key={page.slug}>
              <Link
                to="/problems/$slug"
                params={{ slug: page.slug }}
                className="block rounded-xl border border-[#7ec8e3]/35 bg-[#7ec8e3]/[0.06] px-5 py-5 transition hover:border-[#7ec8e3]/55 hover:bg-[#7ec8e3]/10"
              >
                <h2 className="display text-2xl text-white">{page.title}</h2>
                <p className="mt-2 text-[15px] leading-7 text-[#b8d4e8]">{page.opening}</p>
              </Link>
            </li>
          ))}
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
