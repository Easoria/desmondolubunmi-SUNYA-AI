import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy /index URL served the homepage shell without SEO tags — 301 to "/".
export const Route = createFileRoute("/index")({
  beforeLoad: () => {
    throw redirect({
      to: "/",
      statusCode: 301,
    });
  },
});
