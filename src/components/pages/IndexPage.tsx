import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { EmailCapture } from "@/components/site/EmailCapture";
import { fetchNextUpcomingGatheringClient } from "@/lib/gatherings-browser";
import {
  formatGatheringCardWhen,
  gatheringLocationLine,
} from "@/lib/gatherings";
import { FounderSection } from "@/components/site/FounderBio";
import heroJpg from "@/assets/desmond-hero.jpg";
import heroWebp from "@/assets/desmond-hero.webp";
import hero960Jpg from "@/assets/desmond-hero-960.jpg";
import hero960Webp from "@/assets/desmond-hero-960.webp";
import hero640Jpg from "@/assets/desmond-hero-640.jpg";
import hero640Webp from "@/assets/desmond-hero-640.webp";
import heroMobileJpg from "@/assets/desmond-hero-mobile.jpg";
import heroMobileWebp from "@/assets/desmond-hero-mobile.webp";
import heroMobile640Jpg from "@/assets/desmond-hero-mobile-640.jpg";
import heroMobile640Webp from "@/assets/desmond-hero-mobile-640.webp";

/** Homepage section CTAs — quiet text links below the hero. */
const sectionCtaClass =
  "inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#7ec8e3] transition hover:text-white";

const heroPrimaryBtn =
  "inline-flex items-center justify-center rounded-full border border-white bg-white px-8 py-3.5 text-sm font-semibold tracking-wide text-[#0a1628] transition hover:bg-white/90";

const heroSecondaryBtn =
  "inline-flex items-center justify-center rounded-full border border-white/45 bg-transparent px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:border-white/80 hover:bg-white/10";

/** Kept for quieter section CTAs below the hero. */
const heroGatheringsBtn = heroSecondaryBtn;

function HeroPhoto({
  className,
  sizes,
  priority = false,
}: {
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <picture>
      {/* Mobile: face-forward crop for the short stacked strip */}
      <source
        media="(max-width: 767px)"
        type="image/webp"
        srcSet={`${heroMobile640Webp} 640w, ${heroMobileWebp} 960w`}
        sizes={sizes}
      />
      <source
        media="(max-width: 767px)"
        type="image/jpeg"
        srcSet={`${heroMobile640Jpg} 640w, ${heroMobileJpg} 960w`}
        sizes={sizes}
      />
      {/* Desktop: left-biased landscape — subject left, sea open for copy */}
      <source
        type="image/webp"
        srcSet={`${hero640Webp} 640w, ${hero960Webp} 960w, ${heroWebp} 1280w`}
        sizes={sizes}
      />
      <img
        src={heroJpg}
        srcSet={`${hero640Jpg} 640w, ${hero960Jpg} 960w, ${heroJpg} 1280w`}
        sizes={sizes}
        alt="Desmond Olubunmi"
        width={1280}
        height={720}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}

function HeroCopy({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <h1 className="display text-[clamp(1.45rem,5.8vw,1.78rem)] leading-[1.12] tracking-[-0.02em] text-white sm:text-[1.9rem] md:text-[2.15rem] lg:text-[2.45rem] xl:text-[2.7rem]">
        Your wellbeing is only as strong as its weakest part.
      </h1>
      <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-[#d5e6f2] sm:mt-4 sm:text-lg sm:leading-8 md:mt-7 md:max-w-[36rem] md:text-[1.2rem] md:leading-8">
        Most approaches treat one part of a person. Sunya is a complete, non-sectarian system for
        finding where you&apos;re actually stuck — and what to do about it.
      </p>
      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-11">
        <Link
          to="/problems"
          className={`${heroPrimaryBtn} md:px-9 md:py-4 md:text-[0.95rem]`}
        >
          Find what helps
        </Link>
        <Link
          to="/gatherings"
          className={`${heroSecondaryBtn} md:px-9 md:py-4 md:text-[0.95rem]`}
        >
          Upcoming gatherings
        </Link>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#0a1628] md:h-[100dvh]">
      {/* One photograph — stacked crop on mobile, full-bleed cover on desktop */}
      <div className="relative h-[56vh] w-full overflow-hidden md:absolute md:inset-0 md:h-full">
        <HeroPhoto
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover object-[center_52%] md:-translate-x-[15%] md:origin-left md:scale-[1.15] md:object-[left_85%]"
        />
        {/* Soft fade pulled lower — more face/torso clear above; covers lower edge */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:h-32"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,22,40,0) 0%, rgba(10,22,40,0.22) 45%, rgba(10,22,40,0.7) 78%, #0a1628 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* Desktop right-edge contrast scrim — transparent until ~40% */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,22,40,0) 38%, rgba(10,22,40,0.28) 52%, rgba(10,22,40,0.62) 70%, rgba(10,22,40,0.78) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 md:flex md:h-full md:items-center">
        <div className="bg-gradient-to-b from-[#0a1628] via-[#0c1a2e] to-[#0a1628] px-5 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 md:ml-[44%] md:w-full md:max-w-[720px] md:translate-x-[25%] md:translate-y-[30%] md:bg-none md:bg-transparent md:px-6 md:py-0 md:pr-10 lg:pr-14">
          <HeroCopy />
        </div>
      </div>
    </section>
  );
}

function Reframe() {
  return (
    <section className="relative overflow-hidden bg-[#060d1c] pb-32 pt-44 md:pt-52">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, #7ec8e3 0%, #1b4f8a 25%, transparent 60%)",
          filter: "blur(20px)",
          opacity: 0.4,
          animation: "pulse-glow 6s ease-in-out infinite",
        }}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="display text-4xl text-white sm:text-5xl">Why nothing has held</h2>
        </div>

        <div className="mx-auto mt-12 max-w-2xl space-y-6 text-[15px] leading-7 text-[#b8d4e8] sm:mt-14 sm:text-base sm:leading-8">
          <p>
            You have probably tried something. Breathing, an app, the gym, a book, maybe therapy. It
            worked for a while and then it did not, and the usual explanation offered is that you
            stopped doing it.
          </p>
          <p>Here is a better one.</p>
          <p>
            A person&apos;s wellbeing is not one thing. It runs on a number of separate systems —
            how you breathe, how you sleep, how you move, what you eat, whether you have enough
            money, whether anyone really knows you — and
          </p>
        </div>

        <p className="display mx-auto mt-10 max-w-3xl text-center text-3xl leading-snug text-white sm:mt-12 sm:text-4xl">
          the whole thing performs at the level of whichever one is worst.
        </p>

        <div className="mx-auto mt-10 max-w-2xl space-y-6 text-[15px] leading-7 text-[#b8d4e8] sm:mt-12 sm:text-base sm:leading-8">
          <p>
            Improve the second-worst and very little changes. Improve the worst and everything
            moves.
          </p>
          <p>
            Almost nothing on offer addresses more than one of them. A breathing practice is
            excellent if your limit is your nervous system, and close to useless if your limit is
            that you are broke and alone. The practice was not wrong. It was aimed at the wrong part
            of you.
          </p>
          <p>
            This is also why the research in this field looks so unimpressive. When a study gives
            one practice to a room of people whose limits are all different, most of them are
            receiving the wrong thing, and their non-response goes into the average. What gets
            published as a small effect is often a large effect in the few people who happened to
            need that particular thing.
          </p>
          <p>
            So the first question is not what to practise. It is which part of you is actually
            weakest — and that is usually not the part making the most noise.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/problems" className={heroPrimaryBtn}>
            Find where you&apos;re stuck →
          </Link>
        </div>

        <div className="mx-auto mt-20 max-w-2xl border-t border-white/10 pt-12 sm:mt-24 sm:pt-14">
          <div className="space-y-5 text-[15px] leading-7 text-[#b8d4e8] sm:text-base sm:leading-8">
            <p>
              The traditions make one much larger claim: that all of this comes from taking yourself
              to be the things you can observe — your body, your thoughts, what you own — and that
              it ends when attention turns back on itself.
            </p>
            <p>
              That is the philosophy. It is a bigger claim than anything above, and it is not one
              that research can test.
            </p>
          </div>
          <div className="mt-8 flex justify-center sm:justify-start">
            <Link to="/philosophy" className={sectionCtaClass}>
              Read the philosophy →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <FounderSection
      actions={
        <div className="flex flex-col items-start gap-3">
          <Link to="/gatherings" className={heroGatheringsBtn}>
            Upcoming gatherings
          </Link>
          <Link to="/contact" className={heroGatheringsBtn}>
            Contact
          </Link>
        </div>
      }
    />
  );
}

function NextGathering() {
  const { data: gathering, isLoading } = useQuery({
    queryKey: ["gatherings", "next-upcoming"],
    queryFn: fetchNextUpcomingGatheringClient,
    staleTime: 60_000,
  });

  if (isLoading || !gathering) return null;

  const location = gatheringLocationLine(gathering);

  return (
    <section className="relative overflow-hidden bg-[#0a1628] py-20">
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="label-eyebrow">Next gathering</div>
        <p className="mt-5 font-display text-lg tracking-wide text-white sm:text-xl">
          {formatGatheringCardWhen(gathering.starts_at, gathering.timezone)} · {gathering.title}
        </p>
        {location ? (
          <p className="mt-3 text-sm text-[#b8d4e8]/80">{location}</p>
        ) : null}
        <Link
          to="/gatherings/$slug"
          params={{ slug: gathering.slug }}
          className={`mt-6 ${sectionCtaClass}`}
        >
          Details →
        </Link>
      </div>
    </section>
  );
}

export function IndexPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav overHero />
      <main>
        <Hero />
        <Reframe />
        <About />
        <section className="relative overflow-hidden bg-[#0a1628] py-16">
          <div className="relative z-10 mx-auto max-w-3xl px-6">
            <EmailCapture variant="home" />
          </div>
        </section>
        <NextGathering />
      </main>
      <Footer />
    </div>
  );
}
