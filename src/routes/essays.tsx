import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { GonePage } from "@/components/site/GonePage";
import { goneResponse } from "@/lib/gone";

/**
 * Legacy `/essays` index (formerly 301 → Timeless Solution).
 * Permanent removal — 410 Gone (SPEC 38).
 */
export const Route = createFileRoute("/essays")({
  server: {
    handlers: {
      GET: async () => goneResponse(),
    },
  },
  component: EssaysGoneShell,
});

function EssaysGoneShell() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname !== "/essays" && pathname !== "/essays/") {
    return <Outlet />;
  }

  return <GonePage title="This page has been removed" />;
}
