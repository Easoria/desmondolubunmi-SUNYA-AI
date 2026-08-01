import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { buildSeoHead, PERSON_SCHEMA } from "@/lib/seo";

const FOUNDER_PARAGRAPHS = [
  "Everything humans do is an attempt to be happy.",
  "We earn degrees, build careers, raise children, enter relationships, pray, meditate. Every act — however it appears — is aimed at one thing: reducing suffering and realising happiness. This is the most universal human truth there is.",
  "We have more comfort, more information, and more options than any generation before us. But can we say we are happier?",
  "Born in Nigeria, raised in Ireland, I was exposed early to radically different cultures and ways of understanding life. Christians, Muslims, Hindus, Buddhists, scientists, therapists — all essentially trying to create human well-being. I wanted to know the truth of human life. Not what people believed. What was actually true.",
  "That curiosity was always in me — even as a child I had a deep sense of reverence for something sacred in life, even before I could name it.",
  "But it was suffering that made the question urgent.",
  "In my teens, my nervous system was constantly dysregulated. My mind wouldn't stop. I couldn't sleep. The inner chaos became intolerable — and that intolerance became the catalyst. I found mindful breathing practices — and for the first time, I experienced inner peace. Not by believing in something, but by working with the natural mechanics of my own system.",
  "This relief inspired a journey into deeper practice and curiosity — to understand the mechanisms of human life. I practiced daily for many years, long hours, multiple silent retreats, including several ten-day Vipassana retreats — where I sat until thought and time dissolved and what remained was pure awareness, totally alive and still.",
  "And gradually, what became clear was this:",
  "Every tradition, every religion, every healing modality — different brands, one human system, one truth.",
  "I began to distil. I traced every practice back to its essence — breathwork, movement, sound, meditation, devotion, nutrition, environment — asking: what is this fundamentally doing to the human system? What is it actually changing?",
  "That process became Sunya.",
  "Not a belief system. Not a tradition. A universal map — built on first principles, belonging to no culture, accessible to every human being.",
  "We all want the same thing: freedom from suffering and the realisation of lasting happiness. Sunya exists to make that available — without dogma, without belief, without asking you to convert to anything.",
  "I built this because I lived the problem. And found the path through it.",
  "Now it's yours.",
  "— Desmond",
] as const;

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
        "Nigerian-Irish teacher and founder of Sunya. Author of The Sleep Rhythm Reset, an Amazon #1 bestseller in its category, and creator of the Sunya Sleep app.",
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
        <h1 className="display mt-4 text-4xl text-white sm:text-5xl">
          Desmond Olubunmi
        </h1>
        <p className="mt-3 text-sm text-[#b8d4e8]/80">Spiritual teacher. Visionary.</p>

        <section className="mt-10 space-y-4 text-[#b8d4e8]">
          {FOUNDER_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </section>

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
