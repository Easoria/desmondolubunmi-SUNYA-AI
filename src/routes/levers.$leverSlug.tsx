import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/levers/$leverSlug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/practices/$leverSlug",
      params: { leverSlug: params.leverSlug },
    });
  },
});
