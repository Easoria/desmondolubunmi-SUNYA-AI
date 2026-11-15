import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { GonePage } from "@/components/site/GonePage";
import { goneResponse } from "@/lib/gone";

/**
 * Writing index removed (SPEC 44) — content paused indefinitely.
 * Permanent removal — 410 Gone (no equivalent destination).
 */
export const Route = createFileRoute("/writing")({
  server: {
    handlers: {
      GET: async () => goneResponse(),
    },
  },
  component: WritingGoneShell,
});

function WritingGoneShell() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname !== "/writing" && pathname !== "/writing/") {
    return <Outlet />;
  }

  return <GonePage title="Writing has been removed" />;
}
