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
    const title = "Sunya — A Universal System for Human Wellbeing";
    const description =
      "Every difficult state has a way out. A complete map of human wellbeing — what goes wrong, why, and exactly what to do about it. 112 practices, and a way of knowing which one you need.";

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
