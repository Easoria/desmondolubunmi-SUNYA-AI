import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Starfield } from "@/components/Starfield";
import { getLeversInOrder, getLeverPracticeCount } from "@/data/levers";
import type { Lever } from "@/data/levers/types";
import { buildSeoHead, canonicalUrl } from "@/lib/seo";

const INTERNAL_SLUGS = ["breath", "movement", "mind", "sound", "heart", "awareness"] as const;
const EXTERNAL_SLUGS = [
  "sustenance",
  "sleep",
  "nutrition",
  "connection",
  "nature",
  "environment",
] as const;

/** Index-only card copy — keeps lever pages and SEO summaries unchanged. */
const INDEX_CARD_DESCRIPTIONS: Record<string, string> = {
  conservation:
    "Conservation helps you stabilise your life and build the life force energy needed to fuel lasting transformation. Without this step, you may find that you quickly lose whatever inner progress you have made, or that you do not have enough energy to start or maintain steady practice. Through energy conservation, inner practice becomes consistent and transformation happens faster.",
  breath:
    "Your breath. The one faculty that is both automatic and voluntary, which makes it a direct handle on the nervous system and the flow of life force. It is free, always available, and can be used anywhere without drawing attention.",
  movement:
    "Your body. Conscious movement increases flexibility and robustness, and grounds you in physicality in a healthy way. It reduces physical tension and helps the life force flow upward. When the mind feels restless or ungrounded, movement is often the easier way into inner stillness.",
  mind: "Your capacity to think, reflect and imagine. Untrained, it runs compulsively between past and future and scatters your energy in every direction. Trained, it becomes a powerful tool for creating the life that you want, both within and externally.",
  sound:
    "Your voice. Sound vibrations such as chanting, singing, or humming can be used to calm the nervous system, focus the mind, and vibrate open the subtle energy pathways through which life force flows.",
  heart:
    "Your capacity to feel. Positive emotional states are the juice of life and the fruit of the path. A closed heart dulls everything, and an open one changes the quality of ordinary experience. The Heart lever empowers you to be in any emotional state you want, and to transform negative emotions.",
  awareness:
    "Consciousness itself, turning back to recognise its own nature. Unconsciousness is the main cause of suffering, which makes this the most fundamental lever — and the one the others prepare you for.",
  sustenance:
    "How you earn your living, and whether it is secure. Money and work are not separate from inner life. No practice takes root while survival is uncertain, and no amount of meditation resolves an empty cupboard.",
  sleep:
    "Ensuring proper sleep is necessary for physical rejuvenation, consolidating learning, and daily productivity. This lever helps us harness the power of sleep for health, longevity, and accessing altered states of consciousness.",
  nutrition:
    "The quality of your food determines the quality of your thoughts and feelings. Food either lightens the system or burdens it — and the burden is felt in the mind as much as the body.",
  connection:
    "For most people, their relationships are either a cause of major happiness or of major distress in their life. This is because relationships serve as a mirror that can challenge us to evolve and overcome duality. The Connection lever empowers you to transform how you relate with yourself and others.",
  nature:
    "The body evolved in continuous relationship with sunlight, water, earth and the turning of the seasons. Modern life has distanced us from that relationship, and our wellbeing has suffered for it. This lever is about living in harmony with the intelligence of nature, and using nature itself as a means to wellbeing and presence.",
  environment:
    "Where you live, what you wear, the items around you, the room you sleep in — all of these constantly influence your wellbeing. So does the culture around you, the people you are among, and what your senses and mind are exposed to. No amount of practice fully overrides your environment, which is why it matters to curate one that is conducive to wellbeing.",
};

export const Route = createFileRoute("/practices")({
  component: PracticesRoutePage,
  head: ({ matches }) => {
    if (!matches?.length || matches[matches.length - 1]?.routeId !== "/practices") {
      return {};
    }

    const title = "The Practices — Conservation + 12 Levers, 112 Techniques | Sunya";
    const description =
      "Conservation plus twelve levers arrived at from first principles: every means by which a human being can transform their wellbeing, stripped of cultural form. 112 practices across the complete Sunya library.";
    const levers = getLeversInOrder();

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: levers.map((lever, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: lever.name,
        url: canonicalUrl(`/practices/${lever.slug}`),
      })),
    };

    return {
      ...buildSeoHead({
        title,
        description,
        path: "/practices",
        ogType: "website",
        imageKind: "lever",
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(itemListSchema),
        },
      ],
    };
  },
});

function PracticesRoutePage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  // This route is a parent of deeper practice routes; render the index only
  // on the exact `/practices` path, and delegate child URLs to <Outlet />.
  if (pathname !== "/practices" && pathname !== "/practices/") {
    return <Outlet />;
  }

  return <PracticesIndexPage />;
}

function PracticesIndexPage() {
  const levers = getLeversInOrder();
  const conservation = levers.find((lever) => lever.slug === "conservation");
  const internal = levers.filter((lever) => INTERNAL_SLUGS.includes(lever.slug as (typeof INTERNAL_SLUGS)[number]));
  const external = levers.filter((lever) => EXTERNAL_SLUGS.includes(lever.slug as (typeof EXTERNAL_SLUGS)[number]));

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <section className="relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32">
        <Starfield density={0.4} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h1 className="display text-3xl text-white sm:text-6xl">THE SUNYA PRACTICES</h1>
            <p className="mx-auto mt-5 max-w-5xl text-lg text-[#b8d4e8] sm:mt-6 sm:text-xl">
              The twelve foundational means of human wellbeing
            </p>
          </div>

          <div className="mx-auto mt-6 max-w-5xl space-y-5 text-sm leading-relaxed text-[#b8d4e8] sm:mt-7 sm:text-base">
            <p>
              When every approach to human wellbeing is distilled to its essence, twelve foundational
              means remain.
            </p>
            <p>
              Six are fundamental faculties of your own being, which you can use to transform yourself
              from within: breath, body, mind, voice, emotions, awareness. Six are the fundamental
              external factors that influence your wellbeing. However refined your inner practice, it
              will not hold if you are starving, isolated, sleepless, or surrounded by what degrades
              you.
            </p>
            <p>
              Almost every method ever devised is a branch of one of these twelve, or a combination of
              them.
            </p>
          </div>

          {conservation && (
            <div className="mx-auto mt-14 max-w-5xl">
              <LeverCard lever={conservation} band="prerequisite" />
              <div className="mx-auto mt-9 h-px w-full bg-gradient-to-r from-transparent via-[#dcb48d]/40 to-transparent" />
            </div>
          )}

          <div className="mt-12">
            <h2 className="display mb-6 text-center text-2xl text-[#d6effb] sm:text-3xl">
              The Six Internal Levers
            </h2>
            <div className="rounded-3xl border border-[#7ec8e3]/40 bg-[#7ec8e3]/[0.08] p-3 shadow-[0_0_42px_-24px_rgba(126,200,227,0.85)] sm:p-4">
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
                {internal.map((lever, index) => (
                  <LeverCard key={lever.slug} lever={lever} band="internal" index={index} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="display mb-6 text-center text-2xl text-[#f0dcc8] sm:text-3xl">
              The Six External Pillars
            </h2>
            <div className="rounded-3xl border border-[#dcb48d]/25 bg-[#dcb48d]/[0.05] p-3 sm:p-4">
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
                {external.map((lever) => (
                  <LeverCard key={lever.slug} lever={lever} band="external" />
                ))}
              </div>
            </div>
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-center text-sm text-[#b8d4e8]">
            Not sure where to start? Use the order of operations — which zone you are in, which
            lever matters first, and what can wait.
          </p>
          <div className="mt-4 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
            <Link
              to="/practices/where-to-begin"
              className="inline-flex items-center gap-2 text-sm text-[#7ec8e3] transition hover:text-white"
            >
              Where to begin →
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function LeverCard({
  lever,
  band,
  index = 0,
}: {
  lever: Lever;
  band: "prerequisite" | "internal" | "external";
  index?: number;
}) {
  const practiceCount = getLeverPracticeCount(lever);
  const number = String(lever.number).padStart(2, "0");

  const internalTint = 0.03 + index * 0.012;
  const internalGlow = 0.38 + index * 0.09;

  const shared =
    "group relative block overflow-hidden rounded-2xl border p-4 sm:p-5 transition duration-300 hover:-translate-y-0.5";

  const className =
    band === "prerequisite"
      ? `${shared} border-[#dcb48d]/45 bg-[#120f1a]/85 shadow-[0_0_38px_-18px_rgba(220,180,141,0.65)]`
      : band === "internal"
        ? `${shared} border-[#7ec8e3]/55 ring-1 ring-[#7ec8e3]/35`
        : `${shared} border-[#dcb48d]/35 bg-[#070f1f]/88 ring-1 ring-[#dcb48d]/20 shadow-[0_0_24px_-18px_rgba(220,180,141,0.45)]`;

  const style =
    band === "internal"
      ? {
          backgroundColor: `rgba(10, 22, 40, ${0.67 - internalTint})`,
          boxShadow: `0 0 ${24 + index * 4}px -14px rgba(126, 200, 227, ${internalGlow * 0.6})`,
        }
      : undefined;

  const headingClass = band === "external" ? "text-white" : "text-white";
  const summary = INDEX_CARD_DESCRIPTIONS[lever.slug] ?? lever.summaryLine ?? lever.intro[0];

  return (
    <Link
      to="/practices/$leverSlug"
      params={{ leverSlug: lever.slug }}
      className={className}
      style={style}
    >
      <div className="pointer-events-none absolute right-3 top-2 font-display text-3xl text-[#7ec8e3]/18 sm:text-4xl">
        {number}
      </div>
      <div className="relative z-10">
        <h2 className={`display mt-4 text-2xl sm:mt-5 sm:text-3xl ${headingClass}`}>{lever.name}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#b8d4e8]">{summary}</p>
        <p className="mt-5 text-xs uppercase tracking-[0.24em] text-[#7ec8e3]/85">
          {practiceCount} practices
        </p>
      </div>
    </Link>
  );
}
