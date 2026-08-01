import { createFileRoute } from "@tanstack/react-router";
import { IndexPage } from "@/components/pages/IndexPage";
import {
  buildSeoHead,
  buildWebSiteSchema,
  ORGANIZATION_SCHEMA,
  PERSON_SCHEMA,
} from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: IndexPage,
  head: () => {
    const title = "Sunya — A Universal System for Inner Transformation";
    const description =
      "You are not broken. You are contracted. Sunya is a complete, practical framework for human wellbeing — rooted in the timeless mechanics of consciousness.";

    return {
      ...buildSeoHead({
        title,
        description,
        path: "/",
        ogType: "website",
        imageKind: "core",
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(PERSON_SCHEMA),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(ORGANIZATION_SCHEMA),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(buildWebSiteSchema()),
        },
      ],
    };
  },
});
