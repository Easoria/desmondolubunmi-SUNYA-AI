import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { buildSeoHead } from "@/lib/seo";

const CONTACT_EMAIL = "sunyawellbeing@gmail.com";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () =>
    buildSeoHead({
      title: "Contact — Sunya | Sunya",
      description: "How to reach Desmond Olubunmi.",
      path: "/contact",
      ogType: "website",
      imageKind: "core",
    }),
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />
      <main className="mx-auto max-w-2xl px-6 pb-24 pt-12">
        <div className="label-eyebrow">Contact</div>
        <h1 className="display mt-4 text-4xl text-white sm:text-5xl">Get in touch</h1>
        <p className="mt-6 text-[15px] leading-8 text-[#b8d4e8] sm:text-base">
          For anything that is not answered by the site — email Desmond directly.
        </p>
        <p className="mt-8">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-lg text-[#7ec8e3] transition hover:text-white"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="mt-10 text-sm leading-relaxed text-[#b8d4e8]/80">
          Free gatherings in Dublin and online are listed on the{" "}
          <Link to="/gatherings" className="text-[#7ec8e3] transition hover:text-white">
            Gatherings
          </Link>{" "}
          page.
        </p>
      </main>
      <Footer />
    </div>
  );
}
