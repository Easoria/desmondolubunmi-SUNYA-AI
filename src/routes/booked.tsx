import { createFileRoute, redirect } from "@tanstack/react-router";

/** Former Calendly booking confirmation — sessions removed. */
export const Route = createFileRoute("/booked")({
  beforeLoad: () => {
    throw redirect({
      to: "/gatherings",
      statusCode: 301,
    });
  },
});
