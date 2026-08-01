import type { ReactNode } from "react";
import type { ContentBlock, EssaySection, TextSpan } from "@/data/essays/types";
import { blocksToParagraphs } from "@/data/essays/types";

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

function RichText({ spans }: { spans: TextSpan[] }) {
  return (
    <>
      {spans.map((span, index) => {
        let node: ReactNode = span.text;
        if (span.italic) node = <em key={`i-${index}`}>{node}</em>;
        if (span.bold) {
          node = (
            <strong key={`b-${index}`} className="font-semibold text-white">
              {node}
            </strong>
          );
        }
        return <span key={index}>{node}</span>;
      })}
    </>
  );
}

function BlockView({ block }: { block: ContentBlock }) {
  if (block.type === "subheading") {
    return (
      <h3 className="text-[15px] font-semibold tracking-wide text-[#7ec8e3] sm:text-base">
        <RichText spans={block.spans} />
      </h3>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="list-disc space-y-2 pl-5 text-[17px] leading-[1.9] text-[#e8eef4] marker:text-[#7ec8e3] sm:text-lg">
        {block.items.map((item, index) => (
          <li key={`${spansKey(item)}-${index}`} className="pl-1">
            <RichText spans={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="text-[17px] leading-[1.9] text-[#e8eef4] sm:text-lg">
      <RichText spans={block.spans} />
    </p>
  );
}

function spansKey(spans: TextSpan[]) {
  return spans.map((span) => span.text).join("").slice(0, 48);
}

function sectionBlocks(section: EssaySection): ContentBlock[] {
  if (section.blocks?.length) return section.blocks;
  return (section.paragraphs ?? []).map((paragraph) => ({
    type: "paragraph" as const,
    spans: [{ text: paragraph }],
  }));
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
        const blocks = sectionBlocks(section);

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
                className={`display text-2xl sm:text-3xl ${
                  emphasized ? "text-[#f0dcc8]" : "text-[#7ec8e3]"
                }`}
              >
                {section.heading}
              </h2>
            )}
            <div className={`${hideHeading ? "" : "mt-5"} space-y-5`}>
              {blocks.map((block, index) => (
                <BlockView
                  key={`${section.heading}-${block.type}-${index}-${blocksToParagraphs([block])[0]?.slice(0, 32) ?? ""}`}
                  block={block}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
