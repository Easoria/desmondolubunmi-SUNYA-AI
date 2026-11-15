import { createFileRoute } from "@tanstack/react-router";
import { IndexPage } from "@/components/pages/IndexPage";
import {
  buildSeoHead,
  buildWebSiteSchema,
  ORGANIZATION_SCHEMA,
  PERSON_SCHEMA,
} from "@/lib/seo";
import heroWebp from "@/assets/desmond-hero.webp";

export const Route = createFileRoute("/")({
  component: IndexPage,
  head: () => {
    const title = "Desmond Olubunmi — Sunya";
    const description =
      "Desmond Olubunmi founded Sunya — a complete, non-sectarian map of human wellbeing. Philosophy, practices, gatherings and evidence for finding where you're stuck.";

    const seo = buildSeoHead({
      title,
      description,
      path: "/",
      ogType: "website",
      imageKind: "core",
      imageUrl: heroWebp,
    });

    return {
      ...seo,
      links: [
        ...(seo.links ?? []),
        {
          rel: "preload",
          as: "image",
          href: heroWebp,
          type: "image/webp",
        },
      ],
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
