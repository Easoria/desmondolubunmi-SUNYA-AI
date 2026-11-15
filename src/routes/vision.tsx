import { createFileRoute, redirect } from "@tanstack/react-router";

/** Former Vision page — content merged into /about. */
export const Route = createFileRoute("/vision")({
  beforeLoad: () => {
    throw redirect({
      to: "/about",
      statusCode: 301,
    });
  },
});
