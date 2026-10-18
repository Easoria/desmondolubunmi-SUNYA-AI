import type { ReactNode } from "react";
import desmondImg from "@/assets/desmond.jpg";

/** Shared founder copy — keep homepage, About, and work-with-me in sync. */
export const FOUNDER_SUBTITLE = "Spiritual teacher";

export const FOUNDER_PARAGRAPHS = [
  "Desmond Olubunmi has dedicated his life to the physical, mental and spiritual wellbeing of humanity.",
  "A naturally gifted seeker of truth, he spent his teens and early twenties in long daily contemplative practice across diverse traditions, distilling the science of human wellbeing down to its absolute essence.",
  "Desmond offers a complete framework for human wellbeing that is timeless and universal. His presence and guidance help people realise the natural peace and bliss of their inner being, and live it in their daily lives.",
] as const;

export function FounderBio({ className = "space-y-4 text-[#b8d4e8]" }: { className?: string }) {
  return (
    <div className={className}>
      {FOUNDER_PARAGRAPHS.map((paragraph) => (
        <p key={paragraph} className="leading-relaxed">
          {paragraph}
        </p>
      ))}
      <p className="leading-relaxed">
        He is the author of{" "}
        <em className="italic font-medium text-white">The Sleep Rhythm Reset</em>, an Amazon #1
        bestseller in its category, and the creator of the Sunya Sleep app. He currently teaches
        through writing, practice, and gatherings, in Dublin and online.
      </p>
    </div>
  );
}

type FounderSectionProps = {
  /** CTA row under the bio (page-specific). */
  actions?: ReactNode;
};

/** Photo + bio layout used on the homepage and /work-with-me. */
export function FounderSection({ actions }: FounderSectionProps) {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-32"
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #1a1530 50%, #2a1a1f 100%)",
      }}
    >
      <div className="relative z-10 mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-5 lg:items-center">
        <div className="lg:col-span-2">
          <div className="glass relative overflow-hidden rounded-3xl">
            <img
              src={desmondImg}
              alt="Desmond Olubunmi"
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-[4/5] h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1628]/40 via-transparent to-transparent" />
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="label-eyebrow">The founder</div>
          <h2 className="display mt-5 text-4xl text-white sm:text-6xl">Desmond Olubunmi</h2>
          <p className="display-italic mt-3 text-lg text-[#b8d4e8]">{FOUNDER_SUBTITLE}</p>
          <FounderBio className="mt-8 space-y-4 text-[#b8d4e8]" />
          {actions ? <div className="mt-9">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
