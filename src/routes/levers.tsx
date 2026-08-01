import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/levers")({
  beforeLoad: ({ location }) => {
    if (location.pathname !== "/levers" && location.pathname !== "/levers/") {
      return;
    }

    throw redirect({ to: "/practices", statusCode: 308 });
  },
});
