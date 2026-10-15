import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { buildSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () =>
    buildSeoHead({
      title: "Privacy Policy — Sunya",
      description: "How Sunya collects, stores, and protects your data.",
      path: "/privacy",
      ogType: "website",
      imageKind: "core",
    }),
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-12">
        <div className="label-eyebrow">Privacy Policy</div>
        <h1 className="display mt-4 text-4xl text-white sm:text-5xl">Your privacy matters.</h1>
        <p className="mt-3 text-sm text-[#b8d4e8]/70">Last updated: June 2026</p>

        <div className="prose-sunya mt-10 space-y-8 text-[15px] leading-relaxed text-[#b8d4e8]">
          <section>
            <h2 className="display text-2xl text-white">Who We Are</h2>
            <p className="mt-3">
              Sunya is operated by Desmond Olubunmi. This policy explains what we collect, how we
              use it, and the controls you have.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">What We Collect</h2>
            <p className="mt-3">
              <span className="text-white">Account information:</span> If you create an account, we
              store your email address and an encrypted password hash. Optionally your name if you
              provide it.
            </p>
            <p className="mt-3">
              <span className="text-white">Payment information:</span> Payments are processed
              entirely by Stripe. We never see, store, or have access to your payment card details.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">What We Do Not Collect</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>We do not collect your name unless you voluntarily provide it</li>
              <li>We do not use tracking pixels or third-party analytics that profile you</li>
              <li>We do not sell or share your data with advertisers</li>
            </ul>
          </section>

          <section>
            <h2 className="display text-2xl text-white">Third-Party Services</h2>
            <p className="mt-3">
              We use Supabase for authentication and database, and Stripe for payment processing.
              Each of these providers operates under their own privacy obligations.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">Your Controls</h2>
            <p className="mt-3">From your account settings you can:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Download your account data as a JSON file</li>
              <li>Permanently delete your account and all associated data</li>
            </ul>
          </section>

          <section>
            <h2 className="display text-2xl text-white">Contact</h2>
            <p className="mt-3">
              Questions about this policy? Email{" "}
              <a className="text-white underline" href="mailto:support@sunyasleep.com">
                support@sunyasleep.com
              </a>
              .
            </p>
          </section>

          <p className="pt-6 text-sm">
            See also our <Link to="/terms" className="text-white underline">Terms of Service</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
