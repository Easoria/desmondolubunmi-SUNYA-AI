import { createFileRoute } from "@tanstack/react-router";
import { GonePage } from "@/components/site/GonePage";
import { goneResponse } from "@/lib/gone";

/** Retired Timeless Solution part pages (SPEC 38) — 410 Gone. */
export const Route = createFileRoute("/timeless-solution/$slug")({
  server: {
    handlers: {
      GET: async () => goneResponse(),
    },
  },
  component: () => <GonePage title="This part has been removed" />,
});
