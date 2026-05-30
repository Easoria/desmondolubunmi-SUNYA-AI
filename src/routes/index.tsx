import { createFileRoute } from "@tanstack/react-router";
import { IndexPage } from "@/components/pages/IndexPage";

export const Route = createFileRoute("/")({
  component: IndexPage,
  head: () => ({
    meta: [
      { title: "Sunya — A universal system for inner transformation" },
      {
        name: "description",
        content:
          "You are not broken. You are contracted. Sunya is a complete, practical framework for human wellbeing — rooted in the timeless mechanics of consciousness.",
      },
    ],
  }),
});
