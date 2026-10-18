import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { FounderBio, FOUNDER_SUBTITLE } from "@/components/site/FounderBio";
import { buildSeoHead, PERSON_SCHEMA } from "@/lib/seo";

const BOOK_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "The Sleep Rhythm Reset",
  author: { "@type": "Person", name: "Desmond Olubunmi" },
  url: "https://amzn.eu/d/0bzw0W4k",
};

const APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sunya Sleep",
  applicationCategory: "HealthApplication",
  operatingSystem: "iOS",
  author: { "@type": "Person", name: "Desmond Olubunmi" },
  url: "https://apps.apple.com/ie/app/sunya-sleep/id6764553926",
};

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    ...buildSeoHead({
      title: "About Desmond Olubunmi — Founder of Sunya | Sunya",
      description:
        "Desmond Olubunmi has dedicated his life to the physical, mental and spiritual wellbeing of humanity. Founder of Sunya, author of The Sleep Rhythm Reset, and creator of the Sunya Sleep app.",
      path: "/about",
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
        children: JSON.stringify(BOOK_SCHEMA),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(APP_SCHEMA),
      },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-12">
        <div className="label-eyebrow">The founder</div>
        <h1 className="display mt-4 text-4xl text-white sm:text-5xl">Desmond Olubunmi</h1>
        <p className="display-italic mt-3 text-lg text-[#b8d4e8]">{FOUNDER_SUBTITLE}</p>

        <FounderBio className="mt-10 space-y-4 text-[#b8d4e8]" />

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="display text-2xl text-white">Published work</h2>
          <ul className="mt-4 space-y-3 text-[#b8d4e8]">
            <li>
              <a
                href="https://amzn.eu/d/0bzw0W4k"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[#7ec8e3]/45 underline-offset-2 hover:text-white"
              >
                The Sleep Rhythm Reset
              </a>{" "}
              — a book on sleep and nervous system regulation, which reached #1 in its category on
              Amazon.
            </li>
            <li>
              <a
                href="https://apps.apple.com/ie/app/sunya-sleep/id6764553926"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[#7ec8e3]/45 underline-offset-2 hover:text-white"
              >
                Sunya Sleep
              </a>{" "}
              — an iOS app for sleep and nervous system regulation.
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
