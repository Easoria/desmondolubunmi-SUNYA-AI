import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { GatheringCard } from "@/components/gatherings/GatheringCard";
import { GatheringInterestCapture } from "@/components/gatherings/GatheringInterestCapture";
import { DUBLIN_GATHERING_CARD } from "@/data/gatherings/dublin-seed";
import { fetchPublishedGatheringsClient } from "@/lib/gatherings-browser";
import { isGatheringUpcoming, type GatheringCard as GatheringCardData } from "@/lib/gatherings";
import { buildSeoHead, canonicalUrl } from "@/lib/seo";

export const Route = createFileRoute("/gatherings")({
  // Instant SSR shell — Vercel→Supabase often hangs; browser anon reads are fast.
  loader: async (): Promise<{ gatherings: GatheringCardData[] }> => ({
    gatherings: [DUBLIN_GATHERING_CARD],
  }),
  head: ({ matches, loaderData }) => {
    if (!matches?.length || matches[matches.length - 1]?.routeId !== "/gatherings") {
      return {};
    }

    const gatherings = loaderData?.gatherings ?? [];
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Sunya Gatherings",
      itemListElement: gatherings.map((g, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: g.title,
        url: canonicalUrl(`/gatherings/${g.slug}`),
      })),
    };

    return {
      ...buildSeoHead({
        title: "Gatherings in Dublin & Online — Desmond Olubunmi | Sunya",
        description:
          "Small gatherings in Dublin and online for people curious about consciousness, inner life, and genuine human connection. Free and open to anyone.",
        path: "/gatherings",
        ogType: "website",
        imageKind: "core",
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(itemListSchema),
        },
      ],
    };
  },
  component: GatheringsRoutePage,
});

function GatheringsRoutePage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname !== "/gatherings" && pathname !== "/gatherings/") {
    return <Outlet />;
  }

  return <GatheringsIndexPage />;
}

function GatheringsIndexPage() {
  const { gatherings: initial } = Route.useLoaderData();
  const { data: gatherings = initial } = useQuery({
    queryKey: ["gatherings", "published"],
    queryFn: fetchPublishedGatheringsClient,
    // Seed paints instantly; mark stale so browser Supabase refreshes immediately.
    initialData: initial,
    initialDataUpdatedAt: 0,
    staleTime: 60_000,
  });

  const { upcoming, past } = useMemo(() => {
    const now = new Date();
    const up = gatherings
      .filter((g) => isGatheringUpcoming(g, now))
      .sort(
        (a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime(),
      );
    const pastItems = gatherings
      .filter((g) => !isGatheringUpcoming(g, now))
      .sort(
        (a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime(),
      );
    return { upcoming: up, past: pastItems };
  }, [gatherings]);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <header className="text-center">
          <div className="label-eyebrow">Gatherings</div>
          <h1 className="display mt-4 text-4xl text-white sm:text-5xl">
            In person and online.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#b8d4e8] sm:text-base">
            Small gatherings for people curious about consciousness, inner life, and genuine
            human connection. Some in Dublin, some online, all open to anyone.
          </p>
        </header>

        <section className="mt-14">
          {upcoming.length === 0 ? (
            <div className="border-t border-white/10 pt-10">
              <p className="text-center text-lg text-white">Nothing scheduled right now.</p>
              <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-[#b8d4e8]">
                Gatherings happen roughly monthly, in Dublin and online. Leave your email and
                you'll hear when the next one is announced.
              </p>
              <div className="mt-8">
                <GatheringInterestCapture />
              </div>
            </div>
          ) : (
            <div className="border-t border-white/10">
              {upcoming.map((g) => (
                <GatheringCard key={g.id} gathering={g} />
              ))}
            </div>
          )}
        </section>

        {upcoming.length > 0 ? (
          <section className="mt-16">
            <GatheringInterestCapture />
          </section>
        ) : null}

        {past.length > 0 ? (
          <section className="mt-20">
            <div className="label-eyebrow">Past gatherings</div>
            <div className="mt-6 border-t border-white/10">
              {past.map((g) => (
                <GatheringCard key={g.id} gathering={g} dimmed />
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
