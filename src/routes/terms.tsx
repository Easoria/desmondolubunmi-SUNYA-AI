import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { buildSeoHead } from "@/lib/seo";

const CONTACT_EMAIL = "sunyawellbeing@gmail.com";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () =>
    buildSeoHead({
      title: "Terms of Service — Sunya",
      description: "The terms that govern your use of Sunya.",
      path: "/terms",
      ogType: "website",
      imageKind: "core",
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
        <p className="mt-3 text-sm text-[#b8d4e8]/70">Last updated: 29 October 2026</p>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-[#b8d4e8]">
          <section>
            <h2 className="display text-2xl text-white">1. Who we are</h2>
            <p className="mt-4">
              Sunya is operated by Desmond Olubunmi, in Dublin, Ireland, through desmondolubunmi.com.
              By using this website or any of Sunya&apos;s offerings, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">2. What Sunya is</h2>
            <p className="mt-4">
              Sunya is a non-sectarian path of wellbeing and spiritual development. It offers free
              teachings and live sessions, personal guidance with Desmond, online courses and
              community. Sunya is not a medical, psychiatric or psychological service, and does not
              diagnose, treat or cure any medical or mental health condition.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">3. Not a substitute for professional care</h2>
            <p className="mt-4">
              Sunya does not replace professional medical or mental health care. If you are in
              crisis or need professional support, please contact a qualified professional or a
              crisis service:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>Ireland and UK: Samaritans, 116 123</li>
              <li>US: 988 Suicide &amp; Crisis Lifeline</li>
            </ul>
          </section>

          <section>
            <h2 className="display text-2xl text-white">4. Sunday Stillness and live sessions</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                Sunday Stillness is a free weekly live session on Zoom. Registration gives you the
                link.
              </li>
              <li>
                Sessions are recorded, but only Desmond is recorded. Participants never appear or
                are heard in anything published.
              </li>
              <li>
                Please take part respectfully. We may remove anyone who disrupts a session or harms
                others&apos; experience.
              </li>
              <li>
                We may occasionally change, move or cancel a session, and will let registered
                participants know where we can.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="display text-2xl text-white">5. Personal guidance</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                Personal guidance is a one-to-one online session with Desmond, booked and paid for
                in advance.
              </li>
              <li>
                <span className="text-white">Cancellation and rescheduling:</span>{" "}
                <span className="italic text-[#b8d4e8]/80">
                  Policy to be confirmed — for example, you may reschedule or cancel for a full
                  refund up to 24 hours before your session; later cancellations or missed sessions
                  are not refunded.
                </span>
              </li>
              <li>
                When you book, you ask for the session to take place within the 14-day period in
                which EU consumers can normally cancel. Once the session has been fully delivered,
                that right to cancel no longer applies.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="display text-2xl text-white">6. Online courses</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                When you buy an online course, you get personal access to its content for your own
                use.
              </li>
              <li>
                Because a course is digital content made available straight away, you agree when
                buying that access begins immediately, and you acknowledge that this means you lose
                the 14-day right to cancel once access has started.
              </li>
              <li>
                Course access is for you alone, and may not be shared, copied or redistributed.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="display text-2xl text-white">7. Payments</h2>
            <p className="mt-4">
              Payments are processed securely by Stripe. Prices are shown in euro at the time of
              purchase. Refunds are given where these terms or the law require.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">8. Accounts</h2>
            <p className="mt-4">
              You are responsible for keeping your login details secure. You must be at least 18
              years old to buy anything from Sunya, and at least 16 to create an account. Accounts
              are personal and cannot be transferred.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">9. Community</h2>
            <p className="mt-4">
              The Sunya community (for example, a Telegram group) is a space of mutual respect. We
              may remove anyone who harasses others, shares harmful content or misuses the space.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">10. Acceptable use</h2>
            <p className="mt-4">
              You agree not to use Sunya to harm yourself or others, to share harmful or illegal
              content, or to copy, scrape, resell or misuse Sunya&apos;s content or systems.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">11. Intellectual property</h2>
            <p className="mt-4">
              All teachings, recordings, courses, written content, designs and the Sunya framework
              belong to Desmond Olubunmi. You may share links to free content, but you may not copy,
              record, republish or sell any of it without written permission.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">12. Limitation of liability</h2>
            <p className="mt-4">
              Sunya is provided as it is. To the fullest extent the law allows, we are not liable
              for indirect, incidental or consequential losses arising from your use of Sunya.
              Nothing in these terms limits any rights you have as a consumer under Irish or EU law.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">13. Changes to these terms</h2>
            <p className="mt-4">
              We may update these terms from time to time. If we make important changes, we&apos;ll
              update this page and the date above, and tell account holders by email.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">14. Governing law</h2>
            <p className="mt-4">These terms are governed by the laws of Ireland.</p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">Contact</h2>
            <p className="mt-4">
              Questions about these terms? Email{" "}
              <a className="text-[#7ec8e3] underline-offset-2 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <p className="border-t border-white/10 pt-8 text-sm">
            See also our{" "}
            <Link to="/privacy" className="text-[#7ec8e3] underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
