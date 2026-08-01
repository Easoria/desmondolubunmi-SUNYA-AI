import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/essays")({
  beforeLoad: ({ location }) => {
    if (location.pathname !== "/essays" && location.pathname !== "/essays/") {
      return;
    }

    throw redirect({ to: "/timeless-solution", statusCode: 301 });
  },
});
