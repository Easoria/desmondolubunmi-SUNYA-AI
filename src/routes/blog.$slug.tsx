import { createFileRoute } from "@tanstack/react-router";
import { GonePage } from "@/components/site/GonePage";
import { goneResponse } from "@/lib/gone";

/** Legacy `/blog/:slug` (formerly 301 → Writing) — 410 Gone with Writing (SPEC 44). */
export const Route = createFileRoute("/blog/$slug")({
  server: {
    handlers: {
      GET: async () => goneResponse(),
    },
  },
  component: () => <GonePage title="This page has been removed" />,
});
