import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { GonePage } from "@/components/site/GonePage";
import { goneResponse } from "@/lib/gone";

/**
 * Legacy `/blog` (formerly 301 → Writing) — 410 Gone with Writing (SPEC 44).
 */
export const Route = createFileRoute("/blog")({
  server: {
    handlers: {
      GET: async () => goneResponse(),
    },
  },
  component: BlogGoneShell,
});

function BlogGoneShell() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname !== "/blog" && pathname !== "/blog/") {
    return <Outlet />;
  }

  return <GonePage title="This page has been removed" />;
}
