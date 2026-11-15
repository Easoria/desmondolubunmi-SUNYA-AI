import { createFileRoute, redirect } from "@tanstack/react-router";

/** Former 1-on-1 booking page — permanently redirected to Gatherings. */
export const Route = createFileRoute("/work-with-me")({
  beforeLoad: () => {
    throw redirect({
      to: "/gatherings",
      statusCode: 301,
    });
  },
});
