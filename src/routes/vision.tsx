import { createFileRoute, Link } from "@tanstack/react-router";
import { Starfield } from "@/components/Starfield";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { EmailCapture } from "@/components/site/EmailCapture";
import { buildSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/vision")({
  component: VisionPage,
  head: () =>
    buildSeoHead({
      title: "The Sunya Vision | Sunya",
      description:
        "What Sunya is for — a complete, non-sectarian map of human wellbeing, free and public.",
      path: "/vision",
      ogType: "website",
      imageKind: "core",
    }),
});

function VisionPage() {
  return (
    <div className="min-h-screen bg-[#060d1c] text-white">
      <Nav />
      <Breadcrumb />

      <section className="relative overflow-hidden pb-20 pt-16 sm:pb-28">
        <Starfield density={1.2} />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">The mission</div>
            <h1 className="display mt-6 text-4xl text-white sm:text-6xl">
              The Sunya Vision
            </h1>
          </div>

          <div className="mt-12 space-y-7 text-[15px] leading-8 text-[#b8d4e8] sm:text-base sm:leading-8">
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
          </div>

          <div className="mt-16">
            <h2 className="display text-3xl text-white sm:text-4xl">What Sunya is for</h2>
            <div className="mt-6 space-y-6 text-[15px] leading-8 text-[#b8d4e8] sm:text-base">
              <p>
                To give every human being a complete, non-sectarian map of their own wellbeing —
                body, mind, emotions, and the conditions around them — in plain language, free,
                with nothing required in exchange.
              </p>
              <p>
                Nothing to believe. Nothing to join. The map is public and it stays that way.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="display text-3xl text-white sm:text-4xl">Where this is now</h2>
            <div className="mt-6 space-y-6 text-[15px] leading-8 text-[#b8d4e8] sm:text-base">
              <p>
                Sunya is early. There is a framework, a book, an app, a practice library, and
                occasional gatherings in Dublin and online. It is built and maintained by one
                person. What exists is real. What does not exist yet is not announced here.
              </p>
            </div>
          </div>

          <div className="mt-14 space-y-8">
            <div>
              <p className="mb-4 text-sm text-[#b8d4e8]/85">Stay in touch</p>
              <EmailCapture id="vision-signup" />
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
