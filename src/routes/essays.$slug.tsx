import { createFileRoute } from "@tanstack/react-router";
import { GonePage } from "@/components/site/GonePage";
import { goneResponse } from "@/lib/gone";

/** Legacy `/essays/:slug` (formerly 301 → Timeless Solution) — 410 Gone. */
export const Route = createFileRoute("/essays/$slug")({
  server: {
    handlers: {
      GET: async () => goneResponse(),
    },
  },
  component: () => <GonePage title="This page has been removed" />,
});
