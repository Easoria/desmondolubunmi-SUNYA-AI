import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  beforeLoad: ({ location }) => {
    if (location.pathname !== "/blog" && location.pathname !== "/blog/") {
      return;
    }

    throw redirect({ to: "/writing", statusCode: 301 });
  },
});
