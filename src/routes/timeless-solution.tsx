import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { GonePage } from "@/components/site/GonePage";
import { goneResponse } from "@/lib/gone";

/**
 * Retired Timeless Solution index (SPEC 38) — 410 Gone.
 * Child part routes own `/timeless-solution/$slug`.
 */
export const Route = createFileRoute("/timeless-solution")({
  server: {
    handlers: {
      GET: async () => goneResponse(),
    },
  },
  component: TimelessSolutionGoneShell,
});

function TimelessSolutionGoneShell() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname !== "/timeless-solution" && pathname !== "/timeless-solution/") {
    return <Outlet />;
  }

  return <GonePage title="The Timeless Solution has been removed" />;
}
