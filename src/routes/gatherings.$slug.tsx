import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { GatheringCard } from "@/components/gatherings/GatheringCard";
import { GatheringInterestCapture } from "@/components/gatherings/GatheringInterestCapture";
import {
  getGatheringBySlugForPreview,
  getPublishedGatheringBySlug,
  listRelatedGatherings,
} from "@/lib/gatherings.functions";
import {
  firstMarkdownParagraph,
  firstSentence,
  formatBadge,
  formatGatheringDetailsWhen,
  buildGatheringMetaTitle,
  gatheringLocationLine,
  googleMapsEmbedUrl,
  googleMapsSearchUrl,
  isGatheringUpcoming,
  type Gathering,
  type GatheringCard as GatheringCardData,
} from "@/lib/gatherings";
import { buildGatheringEventSchema } from "@/lib/gathering-schema";
import { buildBreadcrumbSchema, buildSeoHead } from "@/lib/seo";

type LoaderData = {
  gathering: Gathering;
  related: GatheringCardData[];
  isPreview: boolean;
  isUpcoming: boolean;
};

export const Route = createFileRoute("/gatherings/$slug")({
  validateSearch: (search: Record<string, unknown>) => {
    const preview =
      search.preview === "1" ||
      search.preview === 1 ||
      search.preview === true;
    // Only include preview when true so URLs stay clean (no ?preview=false).
    return preview ? { preview: true as const } : {};
  },
  loaderDeps: ({ search }: { search: { preview?: boolean } }) => ({
    preview: !!search.preview,
  }),
  loader: async ({ params, deps }): Promise<LoaderData> => {
    const preview = deps.preview;
    const gathering = preview
      ? await getGatheringBySlugForPreview({ data: { slug: params.slug } })
      : await getPublishedGatheringBySlug({ data: { slug: params.slug } });

    if (!gathering) throw notFound();
    if (!preview && !gathering.published) throw notFound();

    const related = await listRelatedGatherings({
      data: { slug: gathering.slug, limit: 3 },
    });

    return {
      gathering,
      related,
      isPreview: preview && !gathering.published,
      isUpcoming: isGatheringUpcoming(gathering),
    };
  },
  head: ({ loaderData, params }) => {
    const g = loaderData?.gathering;
    const path = `/gatherings/${params.slug}`;
    const title = g ? buildGatheringMetaTitle(g) : "Gatherings";
    const description = g
      ? g.subtitle?.trim() ||
        firstSentence(firstMarkdownParagraph(g.description)) ||
        "A Sunya gathering with Desmond Olubunmi."
      : "";

    return {
      ...buildSeoHead({
        title,
        description,
        path,
        ogType: "website",
        imageKind: "core",
        imageUrl: g?.featured_image_url ?? undefined,
        extraMeta:
          loaderData?.isPreview || (g && !g.published)
            ? [{ name: "robots", content: "noindex,nofollow" }]
            : [],
      }),
      scripts: [
        ...(g
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify(buildGatheringEventSchema(g)),
              },
            ]
          : []),
        {
          type: "application/ld+json",
          children: JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Gatherings", path: "/gatherings" },
              { name: g?.title ?? "Gathering", path },
            ]),
          ),
        },
      ],
    };
  },
  component: GatheringPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <div>
          <h1 className="display text-4xl">Gathering not found</h1>
          <Link
            to="/gatherings"
            className="mt-6 inline-flex items-center gap-2 text-[#7ec8e3]"
          >
            ← Back to gatherings
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  ),
});

function MarkdownBlock({ content }: { content: string }) {
  return (
    <div className="prose-article">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

function GatheringPage() {
  const { gathering, related, isPreview, isUpcoming } = Route.useLoaderData();
  const locationLine = gatheringLocationLine(gathering);
  const hasCoords = gathering.latitude != null && gathering.longitude != null;
  const mapsUrl = googleMapsSearchUrl(gathering);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />

      <article className="mx-auto max-w-3xl px-6 pb-20 pt-10">
        {isPreview ? (
          <div className="mb-8 rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-center text-sm text-amber-100">
            Draft preview — not published
          </div>
        ) : null}

        <header>
          <div className="text-[11px] uppercase tracking-[0.28em] text-[#7ec8e3]">
            {formatBadge(gathering.format)}
          </div>
          <h1 className="display mt-4 text-4xl text-white sm:text-5xl">
            {gathering.title}
          </h1>
          {gathering.subtitle ? (
            <p className="mt-4 text-lg text-[#b8d4e8]/90">{gathering.subtitle}</p>
          ) : null}
        </header>

        {gathering.featured_image_url ? (
          <div className="mt-10 -mx-6 sm:mx-0">
            <img
              src={gathering.featured_image_url}
              alt={gathering.title}
              className="h-auto w-full object-cover sm:rounded-none"
            />
          </div>
        ) : null}

        {!isUpcoming ? (
          <p className="mt-10 text-center text-sm text-[#b8d4e8]/70">
            This gathering has passed.
          </p>
        ) : null}

        <dl className="mt-8 grid gap-4 border border-white/10 bg-white/[0.03] px-5 py-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.22em] text-[#b8d4e8]/55">
              When
            </dt>
            <dd className="mt-1.5 text-[#e8f4fb]">
              {formatGatheringDetailsWhen(
                gathering.starts_at,
                gathering.ends_at,
                gathering.timezone,
              )}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.22em] text-[#b8d4e8]/55">
              Where
            </dt>
            <dd className="mt-1.5 text-[#e8f4fb]">{locationLine || "—"}</dd>
          </div>
          {gathering.price_label ? (
            <div>
              <dt className="text-[11px] uppercase tracking-[0.22em] text-[#b8d4e8]/55">
                Cost
              </dt>
              <dd className="mt-1.5 text-[#e8f4fb]">{gathering.price_label}</dd>
            </div>
          ) : null}
          {gathering.capacity_note ? (
            <div>
              <dt className="text-[11px] uppercase tracking-[0.22em] text-[#b8d4e8]/55">
                Places
              </dt>
              <dd className="mt-1.5 text-[#e8f4fb]">{gathering.capacity_note}</dd>
            </div>
          ) : null}
        </dl>

        {gathering.format === "in_person" ? (
          <div className="mt-6">
            {hasCoords ? (
              <div className="overflow-hidden border border-white/10">
                <iframe
                  title="Map"
                  src={googleMapsEmbedUrl(
                    Number(gathering.latitude),
                    Number(gathering.longitude),
                  )}
                  className="h-56 w-full border-0 sm:h-64"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : gathering.address || gathering.venue_name ? (
              <p className="text-sm text-[#b8d4e8]/80">
                {[gathering.venue_name, gathering.address, gathering.city]
                  .filter(Boolean)
                  .join(", ")}{" "}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7ec8e3] transition hover:text-white"
                >
                  Open in Google Maps →
                </a>
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mx-auto mt-12 max-w-[680px] space-y-12">
          <MarkdownBlock content={gathering.description} />

          {gathering.what_to_expect?.trim() ? (
            <section>
              <h2 className="display text-2xl text-white">What to expect</h2>
              <div className="mt-4">
                <MarkdownBlock content={gathering.what_to_expect} />
              </div>
            </section>
          ) : null}

          {gathering.who_its_for?.trim() ? (
            <section>
              <h2 className="display text-2xl text-white">Who it's for</h2>
              <div className="mt-4">
                <MarkdownBlock content={gathering.who_its_for} />
              </div>
            </section>
          ) : null}

          {gathering.practical_notes?.trim() ? (
            <section>
              <h2 className="display text-2xl text-white">Practical notes</h2>
              <div className="mt-4">
                <MarkdownBlock content={gathering.practical_notes} />
              </div>
            </section>
          ) : null}
        </div>

        {isUpcoming ? (
          <div className="mx-auto mt-14 max-w-[680px] border-t border-white/10 pt-10 text-center">
            {gathering.registration_url ? (
              <>
                <a
                  href={gathering.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-[#7ec8e3]/55 bg-[#7ec8e3]/10 px-6 py-3 text-sm text-white transition hover:bg-[#7ec8e3]/20"
                >
                  Reserve your place →
                </a>
                {gathering.registration_platform ? (
                  <p className="mt-4 text-xs text-[#b8d4e8]/50">
                    Registration is handled through {gathering.registration_platform}.
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <p className="text-sm text-[#b8d4e8]">
                  Registration opens soon. Leave your email to be notified.
                </p>
                <div className="mt-6">
                  <GatheringInterestCapture />
                </div>
              </>
            )}
          </div>
        ) : null}

        {/* Always capture interest; skip duplicate when the registration-opens block already showed the form. */}
        {!(isUpcoming && !gathering.registration_url) ? (
          <div className="mx-auto mt-16 max-w-[680px] border-t border-white/10 pt-10">
            <GatheringInterestCapture variant={isUpcoming ? "default" : "past"} />
          </div>
        ) : null}

        {related.length > 0 ? (
          <section className="mt-16 border-t border-white/10 pt-10">
            <div className="label-eyebrow">Other gatherings</div>
            <div className="mt-4">
              {related.map((item) => (
                <GatheringCard
                  key={item.id}
                  gathering={item}
                  dimmed={!isGatheringUpcoming(item)}
                />
              ))}
            </div>
          </section>
        ) : null}

        <p className="mt-14 text-center text-sm text-[#b8d4e8]/80">
          <Link to="/work-with-me" className="text-[#7ec8e3] transition hover:text-white">
            Work with Desmond one-to-one →
          </Link>
        </p>
      </article>

      <Footer />
    </div>
  );
}
