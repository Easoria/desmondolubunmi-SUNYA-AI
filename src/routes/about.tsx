import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { EmailCapture } from "@/components/site/EmailCapture";
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
      description: "Who Desmond Olubunmi is, and what Sunya is for.",
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

        <section className="mt-20">
          <h2 className="display text-3xl text-white sm:text-4xl">What Sunya is for</h2>
          <div className="mt-8 space-y-7 text-[15px] leading-8 text-[#b8d4e8] sm:text-base sm:leading-8">
            <p>
              We have developed the external world enormously, through scientific and
              technological advancement. Inwardly, we remain largely underdeveloped. We still
              operate from fear, tribalism, borrowed belief and limited identities — which
              produces much of the conflict and suffering we are trying to escape.
            </p>
            <p>The world is a collection of individuals. When individuals change, the world changes.</p>
            <p>
              We breathe the same air and we want the same things: freedom from suffering,
              genuine happiness, a life that feels worth living. Those run deeper than any belief
              that divides us.
            </p>
            <p>
              When a person creates genuine wellbeing within themselves, it begins to radiate
              outward — into the people around them, and into the world. Not because anyone
              preached unity, but because someone whose being is in order has less to defend, less
              to take, and less to prove.
            </p>
            <p className="display text-2xl font-semibold text-white sm:text-3xl">
              This is not idealism. This is mechanics.
            </p>
            <p>
              To give every human being a complete, non-sectarian map of their own wellbeing —
              body, mind, emotions, and the conditions around them — in plain language, free,
              with nothing required in exchange.
            </p>
            <p>
              Nothing to believe. Nothing to join. The map is public and it stays that way.
            </p>
          </div>

          <h3 className="display mt-16 text-2xl text-white sm:text-3xl">Where this is now</h3>
          <div className="mt-6 space-y-6 text-[15px] leading-8 text-[#b8d4e8] sm:text-base">
            <p>
              Sunya is early. There is a framework, a book, an app, a practice library, and
              occasional gatherings in Dublin and online. It is built and maintained by one
              person. What exists is real. What does not exist yet is not announced here.
            </p>
          </div>

          <div className="mt-14 space-y-8">
            <div>
              <p className="mb-4 text-sm text-[#b8d4e8]/85">Stay in touch</p>
              <EmailCapture id="about-signup" />
            </div>
            <div>
              <Link
                to="/gatherings"
                className="inline-flex text-sm text-[#7ec8e3] transition hover:text-white"
              >
                Gatherings →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
