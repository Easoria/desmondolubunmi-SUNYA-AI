import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/essays/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/timeless-solution/$slug",
      params: { slug: params.slug },
      statusCode: 301,
    });
  },
});
