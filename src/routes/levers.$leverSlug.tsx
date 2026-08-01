import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/levers/$leverSlug")({
  beforeLoad: ({ params, location }) => {
    const exactPath = `/levers/${params.leverSlug}`;
    if (location.pathname !== exactPath && location.pathname !== `${exactPath}/`) {
      return;
    }

    throw redirect({
      to: "/practices/$leverSlug",
      params: { leverSlug: params.leverSlug },
      statusCode: 308,
    });
  },
});
