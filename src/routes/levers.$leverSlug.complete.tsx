import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/levers/$leverSlug/complete")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/practices/$leverSlug/complete",
      params: { leverSlug: params.leverSlug },
      statusCode: 308,
    });
  },
});
