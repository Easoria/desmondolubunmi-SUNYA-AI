import { createServerFn } from "@tanstack/react-start";
import type { Gathering, GatheringCard } from "@/lib/gatherings";
import {
  loadGatheringBySlugForPreview,
  loadNextUpcomingGathering,
  loadPublishedGatheringBySlug,
  loadPublishedGatherings,
  loadRelatedGatherings,
  loadSitemapGatherings,
} from "@/lib/gatherings.server";

export const listPublishedGatherings = createServerFn({ method: "GET" }).handler(
  async (): Promise<GatheringCard[]> => loadPublishedGatherings(),
);

export const getNextUpcomingGathering = createServerFn({ method: "GET" }).handler(
  async (): Promise<GatheringCard | null> => loadNextUpcomingGathering(),
);

export const getPublishedGatheringBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }): Promise<Gathering | null> =>
    loadPublishedGatheringBySlug(data.slug),
  );

export const getGatheringBySlugForPreview = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }): Promise<Gathering | null> =>
    loadGatheringBySlugForPreview(data.slug),
  );

export const listRelatedGatherings = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string; limit?: number }) => d)
  .handler(async ({ data }): Promise<GatheringCard[]> =>
    loadRelatedGatherings(data.slug, data.limit ?? 3),
  );

export const listSitemapGatherings = createServerFn({ method: "GET" }).handler(
  async (): Promise<Array<{ slug: string; updated_at: string | null; starts_at: string }>> =>
    loadSitemapGatherings(),
);
