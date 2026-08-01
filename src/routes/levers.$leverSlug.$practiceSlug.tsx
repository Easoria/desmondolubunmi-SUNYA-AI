import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/levers/$leverSlug/$practiceSlug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/practices/$leverSlug/$practiceSlug",
      params: {
        leverSlug: params.leverSlug,
        practiceSlug: params.practiceSlug,
      },
      statusCode: 308,
    });
  },
});
