import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { buildSeoHead } from "@/lib/seo";

const CONTACT_EMAIL = "sunyawellbeing@gmail.com";

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
        <p className="mt-3 text-sm text-[#b8d4e8]/70">Last updated: 29 October 2026</p>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-[#b8d4e8]">
          <section>
            <h2 className="display text-2xl text-white">Who we are</h2>
            <p className="mt-4">
              Sunya is operated by Desmond Olubunmi, in Dublin, Ireland, through desmondolubunmi.com.
              Desmond is the controller of your personal data. This policy explains what we collect,
              why, and the choices you have.
            </p>
            <p className="mt-4">
              Contact:{" "}
              <a className="text-[#7ec8e3] underline-offset-2 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">What we collect, and why</h2>
            <div className="mt-5 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.04] text-[#e8f4fb]">
                    <th className="px-4 py-3 font-medium">When</th>
                    <th className="px-4 py-3 font-medium">What we collect</th>
                    <th className="px-4 py-3 font-medium">Why</th>
                    <th className="px-4 py-3 font-medium">Legal basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="px-4 py-3 align-top">
                      You register for Sunday Stillness or join the email list
                    </td>
                    <td className="px-4 py-3 align-top">
                      Your first name and email address; optionally, your answer to &quot;What brings
                      you here?&quot;
                    </td>
                    <td className="px-4 py-3 align-top">
                      To send you the session link, reminders and occasional emails from Desmond; to
                      understand what people are seeking, so sessions serve them better
                    </td>
                    <td className="px-4 py-3 align-top">
                      Your consent, which you can withdraw at any time
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      You book personal guidance or buy a course
                    </td>
                    <td className="px-4 py-3 align-top">Your name, email and payment details</td>
                    <td className="px-4 py-3 align-top">
                      To provide what you&apos;ve bought and to keep required records
                    </td>
                    <td className="px-4 py-3 align-top">
                      To perform our contract with you; legal obligations
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      You create an account (for example, for an online course)
                    </td>
                    <td className="px-4 py-3 align-top">
                      Your email address and an encrypted password; optionally your name
                    </td>
                    <td className="px-4 py-3 align-top">
                      To give you secure access to what you&apos;ve purchased
                    </td>
                    <td className="px-4 py-3 align-top">To perform our contract with you</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">You contact us</td>
                    <td className="px-4 py-3 align-top">Your message and contact details</td>
                    <td className="px-4 py-3 align-top">To reply to you</td>
                    <td className="px-4 py-3 align-top">
                      Our legitimate interest in responding
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="display text-2xl text-white">Live sessions and recordings</h2>
            <p className="mt-4">
              Sunday Stillness and other live sessions are held on Zoom.{" "}
              <span className="text-white">
                Sessions are recorded, but only Desmond is recorded.
              </span>{" "}
              Participants&apos; faces and voices never appear in anything we publish. If a
              participant asks a question, it may be shown as on-screen text with anything
              identifying removed.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">What we do not do</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>We do not sell or share your data with advertisers.</li>
              <li>We do not use tracking pixels or third-party analytics that profile you.</li>
              <li>We do not collect more than we need.</li>
            </ul>
          </section>

          <section>
            <h2 className="display text-2xl text-white">Services we use</h2>
            <p className="mt-4">
              We use a small number of trusted providers, each with its own privacy obligations:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <span className="text-white">MailerLite:</span> our email list and emails.
              </li>
              <li>
                <span className="text-white">Zoom:</span> live sessions.
              </li>
              <li>
                <span className="text-white">Stripe:</span> payments. We never see or store your
                full card details.
              </li>
              <li>
                <span className="text-white">Supabase:</span> account logins and our database.
              </li>
              <li>
                <span className="text-white">YouTube:</span> some course videos are hosted on
                YouTube and shown on our website.
              </li>
              <li>
                <span className="text-white">Telegram:</span> the optional community group, if you
                choose to join it. Members see usernames, not phone numbers.
              </li>
            </ul>
            <p className="mt-4">
              Some of these providers may process data outside the European Economic Area. Where
              they do, they rely on safeguards recognised under EU law, such as Standard Contractual
              Clauses.
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">How long we keep your data</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <span className="text-white">Email list:</span> until you unsubscribe.
              </li>
              <li>
                <span className="text-white">Purchases:</span> as long as the law requires for tax
                and accounting records.
              </li>
              <li>
                <span className="text-white">Accounts:</span> until you delete your account, or ask
                us to.
              </li>
              <li>
                <span className="text-white">Messages:</span> as long as needed to respond, and then
                deleted.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="display text-2xl text-white">Your rights</h2>
            <p className="mt-4">
              Under the GDPR, you can ask to access, correct, delete or download your data, to
              restrict or object to how we use it, and you can withdraw consent at any time. Every
              email includes an unsubscribe link. To use any of these rights, email us at{" "}
              <a className="text-[#7ec8e3] underline-offset-2 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>
            <p className="mt-4">
              If you&apos;re not satisfied with our response, you can complain to Ireland&apos;s
              Data Protection Commission (
              <a
                className="text-[#7ec8e3] underline-offset-2 hover:underline"
                href="https://www.dataprotection.ie"
                target="_blank"
                rel="noopener noreferrer"
              >
                dataprotection.ie
              </a>
              ).
            </p>
          </section>

          <section>
            <h2 className="display text-2xl text-white">Changes to this policy</h2>
            <p className="mt-4">
              If we make important changes, we&apos;ll update this page and the date above.
            </p>
          </section>

          <p className="border-t border-white/10 pt-8 text-sm">
            See also our{" "}
            <Link to="/terms" className="text-[#7ec8e3] underline-offset-2 hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
