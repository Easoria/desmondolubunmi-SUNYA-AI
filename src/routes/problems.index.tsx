import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { EmailCapture } from "@/components/site/EmailCapture";
import { getAllProblemPages } from "@/data/problems";
import { PROBLEM_GROUPS } from "@/data/problems/types";
import { buildSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/problems/")({
  head: () =>
    buildSeoHead({
      title: "Find What Helps — Start Where You Actually Are | Sunya",
      description:
        "Twenty-two states, drawn from how identification shows up in a life and from what the research says actually goes wrong. Find the one that fits closest.",
      path: "/problems",
      ogType: "website",
      imageKind: "core",
    }),
  component: ProblemsIndexPage,
});

function ProblemsIndexPage() {
  const pages = getAllProblemPages();
  const byGroup = PROBLEM_GROUPS.map((group) => ({
    ...group,
    pages: pages.filter((page) => page.group === group.id),
  }));

  return (
    <div className="min-h-screen bg-[#07101c] text-white">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pb-28 sm:pt-32">
        <h1 className="display text-4xl leading-tight text-white sm:text-5xl">
          Start where you actually are.
        </h1>
        <p className="mt-6 text-[17px] leading-8 text-[#d5e6f2] sm:text-lg sm:leading-9">
          Twenty-two states, drawn from the ten ways identification shows up in a life and from what
          the research says actually goes wrong. Find the one that fits closest. It does not have to
          fit perfectly.
        </p>
        <p className="mt-4 text-[17px] leading-8 text-[#d5e6f2] sm:text-lg sm:leading-9">
          <strong className="font-semibold text-white">One thing worth knowing before you choose.</strong>{" "}
          The states in the last group have the strongest evidence behind them of anything on this
          site — and they are the ones people skip past while looking for an inner problem. If your
          honest answer is money, or loneliness, or sleep, start there.
        </p>

        <div className="mt-14 space-y-12">
          {byGroup.map((group) => (
            <section key={group.id} aria-labelledby={`group-${group.id}`}>
              <h2
                id={`group-${group.id}`}
                className="text-xs uppercase tracking-[0.22em] text-[#7ec8e3]/85"
              >
                {group.label}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.pages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      to="/problems/$slug"
                      params={{ slug: page.slug }}
                      className="relative block overflow-hidden rounded-xl border border-[#7ec8e3]/35 bg-[#7ec8e3]/[0.06] px-5 py-5 transition hover:border-[#7ec8e3]/55 hover:bg-[#7ec8e3]/10"
                    >
                      <span
                        className="absolute inset-y-0 left-0 w-[3px]"
                        style={{ backgroundColor: group.colour }}
                        aria-hidden
                      />
                      <h3 className="display text-2xl text-white">{page.title}</h3>
                      <p className="mt-2 text-[15px] leading-7 text-[#b8d4e8]">{page.opening}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-12">
          <p className="text-base leading-relaxed text-[#b8d4e8]/85 sm:text-[17px] sm:leading-8">
            Not sure which of these fits?{" "}
            <Link
              to="/practices/where-to-begin"
              className="text-[#7ec8e3] underline decoration-[#7ec8e3]/35 underline-offset-2 transition hover:text-white hover:decoration-white/50"
            >
              Where to begin
            </Link>{" "}
            maps the order of operations — or come to a{" "}
            <Link
              to="/gatherings"
              className="text-[#7ec8e3] underline decoration-[#7ec8e3]/35 underline-offset-2 transition hover:text-white hover:decoration-white/50"
            >
              gathering
            </Link>
            .
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
