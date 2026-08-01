import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/levers")({
  beforeLoad: () => {
    throw redirect({ to: "/practices" });
  },
});
