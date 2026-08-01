import type { EssaySection } from "@/data/essays/types";

type EssayProseProps = {
  sections: EssaySection[];
  /** When a section heading matches this title, omit the repeated heading. */
  omitHeadingMatching?: string;
  /** Optional section id lookup (e.g. safety block anchors). */
  sectionIdForHeading?: (heading: string) => string | undefined;
  emphasizeHeading?: (heading: string) => boolean;
};

function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

export function EssayProse({
  sections,
  omitHeadingMatching,
  sectionIdForHeading,
  emphasizeHeading,
}: EssayProseProps) {
  const omit = omitHeadingMatching ? normalize(omitHeadingMatching) : null;

  return (
    <div className="space-y-12">
      {sections.map((section) => {
        const hideHeading = omit !== null && normalize(section.heading) === omit;
        const sectionId = sectionIdForHeading?.(section.heading);
        const emphasized = emphasizeHeading?.(section.heading) ?? false;

        return (
          <section
            key={section.heading}
            id={sectionId}
            className={
              emphasized
                ? "scroll-mt-28 rounded-2xl border border-[#dcb48d]/35 bg-[#dcb48d]/[0.06] px-5 py-6 sm:px-7 sm:py-8"
                : "scroll-mt-28"
            }
          >
            {!hideHeading && (
              <h2
                className={`display text-2xl text-white sm:text-3xl ${
                  emphasized ? "text-[#f0dcc8]" : ""
                }`}
              >
                {section.heading}
              </h2>
            )}
            <div className={`${hideHeading ? "" : "mt-5"} space-y-6`}>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={`${section.heading}-${paragraph.slice(0, 48)}`}
                  className="text-[17px] leading-[1.9] text-[#b8d4e8] sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
