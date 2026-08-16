import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { EmailCapture } from "@/components/site/EmailCapture";
import { buildSeoHead } from "@/lib/seo";

type ProblemCard = {
  slug: string;
  title: string;
  blurb: string;
  status: "live" | "soon";
};

const PROBLEM_CARDS: ProblemCard[] = [
  {
    slug: "insomnia",
    title: "Insomnia",
    blurb: "You are tired. Your body wants sleep. And still, somehow, you are awake.",
    status: "live",
  },
  {
    slug: "chronic-stress",
    title: "Chronic stress",
    blurb: "A braced system that cannot settle — scanning for threat that has not arrived.",
    status: "soon",
  },
  {
    slug: "people-pleasing",
    title: "People-pleasing",
    blurb: "Living for everyone else’s needs until there is nothing left of your own.",
    status: "soon",
  },
  {
    slug: "decision-fatigue",
    title: "Decision fatigue",
    blurb: "Too many choices, no clear yes — and every option costs energy you do not have.",
    status: "soon",
  },
  {
    slug: "emotional-numbness",
    title: "Emotional numbness",
    blurb: "Not sad, not angry — just flat. Disconnected from feeling and from yourself.",
    status: "soon",
  },
  {
    slug: "grief",
    title: "Grief",
    blurb: "Loss that will not finish — a weight that rearranges ordinary days.",
    status: "soon",
  },
];

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
          {PROBLEM_CARDS.map((card) => {
            if (card.status === "live") {
              return (
                <li key={card.slug}>
                  <Link
                    to="/problems/$slug"
                    params={{ slug: card.slug }}
                    className="block rounded-xl border border-[#7ec8e3]/35 bg-[#7ec8e3]/[0.06] px-5 py-5 transition hover:border-[#7ec8e3]/55 hover:bg-[#7ec8e3]/10"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="display text-2xl text-white">{card.title}</h2>
                      <span className="text-xs uppercase tracking-[0.2em] text-[#7ec8e3]/80">
                        Available
                      </span>
                    </div>
                    <p className="mt-2 text-[15px] leading-7 text-[#b8d4e8]">{card.blurb}</p>
                  </Link>
                </li>
              );
            }

            return (
              <li key={card.slug}>
                <div
                  className="rounded-xl border border-white/8 bg-white/[0.02] px-5 py-5 opacity-45"
                  aria-disabled="true"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="display text-2xl text-white/80">{card.title}</h2>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#b8d4e8]/60">
                      Coming soon
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] leading-7 text-[#b8d4e8]/70">{card.blurb}</p>
                </div>
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
