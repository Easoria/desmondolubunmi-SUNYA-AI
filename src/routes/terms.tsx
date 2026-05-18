import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service — Sunya" },
      { name: "description", content: "The terms that govern your use of Sunya and Sunya AI." },
    ],
  }),
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-12">
        <div className="label-eyebrow">Terms of Service</div>
        <h1 className="display mt-4 text-4xl text-white sm:text-5xl">Terms of Service</h1>
        <p className="mt-3 text-sm text-[#b8d4e8]/70">Last updated: June 2026</p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[#b8d4e8]">
          <section>
            <h2 className="display text-2xl text-white">1. Who We Are</h2>
            <p className="mt-3">
              Sunya is operated by Desmond Olubunmi. By using this website or Sunya AI you agree to
              these terms.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">2. What Sunya Is</h2>
            <p className="mt-3">
              Sunya is a wellness and personal development tool. It provides educational content, a
              diagnostic AI interface, and optional 1-on-1 sessions with Desmond. Sunya is not a
              medical, psychiatric, or psychological service. It does not diagnose, treat, or cure
              any medical or mental health condition.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">3. Not a Substitute for Professional Care</h2>
            <p className="mt-3">
              Sunya AI is an AI-powered guide and is not a replacement for professional medical or
              mental health care. If you are in crisis or need professional support, please reach
              out to a qualified professional or crisis service:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Ireland &amp; UK: Samaritans 116 123</li>
              <li>US: 988 Suicide &amp; Crisis Lifeline</li>
            </ul>
          </section>

          <section>
            <h2 className="display text-2xl text-white">4. Accounts</h2>
            <p className="mt-3">
              You are responsible for maintaining the security of your account credentials. You
              must be at least 16 years of age to create an account. One account per person —
              accounts are non-transferable.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">5. Subscriptions and Payments</h2>
            <p className="mt-3">
              Paid subscriptions are billed monthly via Stripe. You may cancel at any time from your
              account dashboard. Cancellation takes effect at the end of the current billing
              period. We do not offer pro-rated refunds for partial periods.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">6. Acceptable Use</h2>
            <p className="mt-3">
              You agree not to use Sunya AI to harm yourself or others, to generate harmful or
              illegal content, or to attempt to reverse-engineer, scrape, or abuse the system.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">7. Intellectual Property</h2>
            <p className="mt-3">
              All content, design, and the Sunya framework remain the intellectual property of
              Desmond Olubunmi. You retain ownership of the content of your own session messages.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">8. Limitation of Liability</h2>
            <p className="mt-3">
              Sunya is provided as-is. To the maximum extent permitted by law, we are not liable
              for indirect, incidental, or consequential damages arising from your use of the
              service.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">9. Changes to These Terms</h2>
            <p className="mt-3">
              We may update these terms from time to time. Material changes will be communicated to
              authenticated users by email. Continued use of the service after changes constitutes
              acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">10. Governing Law</h2>
            <p className="mt-3">These terms are governed by the laws of Ireland.</p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">Contact</h2>
            <p className="mt-3">
              Questions about these terms? Email{" "}
              <a className="text-white underline" href="mailto:support@sunyasleep.com">
                support@sunyasleep.com
              </a>
              .
            </p>
          </section>

          <p className="pt-6 text-sm">
            See also our <Link to="/privacy" className="text-white underline">Privacy Policy</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
