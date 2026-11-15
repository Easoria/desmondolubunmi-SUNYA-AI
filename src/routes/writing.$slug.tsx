import { createFileRoute } from "@tanstack/react-router";
import { GonePage } from "@/components/site/GonePage";
import { goneResponse } from "@/lib/gone";

/** Writing article pages removed (SPEC 44) — 410 Gone. */
export const Route = createFileRoute("/writing/$slug")({
  server: {
    handlers: {
      GET: async () => goneResponse(),
    },
  },
  component: () => <GonePage title="This piece has been removed" />,
});
