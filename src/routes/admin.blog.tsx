import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/blog")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/writing", statusCode: 301 });
  },
});
