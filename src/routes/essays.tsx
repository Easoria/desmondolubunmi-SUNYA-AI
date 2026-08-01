import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import {
  essayMetaDescription,
  essaysByGroup,
  readingMinutes,
  whereToBegin,
} from "@/data/essays";
import type { Essay } from "@/data/essays/types";
import { buildSeoHead, canonicalUrl } from "@/lib/seo";

export const Route = createFileRoute("/essays")({
  head: ({ matches }) => {
    if (!matches?.length || matches[matches.length - 1]?.routeId !== "/essays") {
      return {};
    }

    const { origin, system } = essaysByGroup();
    const all = [...origin, ...system];

    return {
      ...buildSeoHead({
        title: "The Essays — The Sunya Teaching Sequence | Sunya",
        description:
          "Twelve essays tracing the origin of suffering, the hidden system of the energy body, and the grand return. The full Sunya teaching sequence by Desmond Olubunmi.",
        path: "/essays",
        ogType: "website",
        imageKind: "core",
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "The Sunya Essays",
            itemListElement: all.map((essay, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: essay.title,
              url: canonicalUrl(`/essays/${essay.slug}`),
            })),
          }),
        },
      ],
    };
  },
  component: EssaysRoutePage,
});

function EssaysRoutePage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  // Parent of `/essays/$slug`; render the index only on the exact path.
  if (pathname !== "/essays" && pathname !== "/essays/") {
    return <Outlet />;
  }

  return <EssaysIndexPage />;
}

function EssayRow({ essay }: { essay: Essay }) {
  const blurb = essayMetaDescription(essay, 140);
  const minutes = readingMinutes(essay.wordCount);

  return (
    <Link
      to="/essays/$slug"
      params={{ slug: essay.slug }}
      className="group block border-b border-white/10 py-6 transition last:border-b-0 hover:bg-white/[0.02]"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-display text-sm tracking-[0.2em] text-[#7ec8e3]/80">
          {String(essay.number).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="display text-2xl text-white transition group-hover:text-[#e8f4fb] sm:text-3xl">
            {essay.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#b8d4e8]/85">{blurb}</p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-[#b8d4e8]/50">
            {minutes} min read
          </p>
        </div>
      </div>
    </Link>
  );
}

function EssaysIndexPage() {
  const { origin, system } = essaysByGroup();

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <header className="text-center">
          <div className="label-eyebrow">The Essays</div>
          <h1 className="display mt-4 text-4xl text-white sm:text-5xl">
            The teaching sequence
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#b8d4e8] sm:text-base">
            Twelve essays. From the origin of creation and the fall into
            separation, through the hidden system of the energy body, to what
            actually changes — and the grand return.
          </p>
        </header>

        <section className="mt-14">
          <div className="label-eyebrow">Part one</div>
          <h2 className="display mt-3 text-2xl text-[#d6effb] sm:text-3xl">
            The Origin and the Fall
          </h2>
          <div className="mt-6 border-t border-white/10">
            {origin.map((essay) => (
              <EssayRow key={essay.slug} essay={essay} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="label-eyebrow">Part two</div>
          <h2 className="display mt-3 text-2xl text-[#f0dcc8] sm:text-3xl">
            The System and the End
          </h2>
          <div className="mt-6 border-t border-white/10">
            {system.map((essay) => (
              <EssayRow key={essay.slug} essay={essay} />
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-[#7ec8e3]/25 bg-[#7ec8e3]/[0.05] px-6 py-8 text-center">
          <div className="label-eyebrow">Practical companion</div>
          <h2 className="display mt-3 text-2xl text-white sm:text-3xl">
            {whereToBegin.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#b8d4e8]">
            {whereToBegin.description}
          </p>
          <Link
            to="/practices/where-to-begin"
            className="mt-6 inline-flex text-sm text-[#7ec8e3] transition hover:text-white"
          >
            Read Where to Begin →
          </Link>
        </section>

        <p className="mt-12 text-center text-sm text-[#b8d4e8]/80">
          Prefer the condensed map first?{" "}
          <Link to="/philosophy" className="text-[#7ec8e3] hover:text-white">
            Read the philosophy
          </Link>
          .
        </p>
      </main>

      <Footer />
    </div>
  );
}
