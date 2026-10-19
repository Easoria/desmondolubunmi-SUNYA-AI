import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { ContentBlock, EssaySection, TextSpan } from "@/data/essays/types";
import { blocksToParagraphs } from "@/data/essays/types";
import {
  getFrameworkLinkTerms,
  segmentFrameworkLinks,
  type FrameworkLinkTerm,
} from "@/lib/framework-links";

export type EssaySectionPresentation = {
  /** Small uppercase label above the heading */
  eyebrow?: string;
  /** Large faded mark behind/beside the heading (e.g. "01", "Z2") */
  mark?: string;
  /** Override the visible heading text (anchor/key still use the real heading). */
  title?: string;
  /** Classes on the outer <section> shell */
  shellClassName?: string;
  /** Classes on the <h2> */
  headingClassName?: string;
  /** Classes on the blocks wrapper */
  bodyClassName?: string;
};

type EssayProseProps = {
  sections: EssaySection[];
  /** When a section heading matches this title, omit the repeated heading. */
  omitHeadingMatching?: string;
  /** Optional section id lookup (e.g. safety block anchors). */
  sectionIdForHeading?: (heading: string) => string | undefined;
  emphasizeHeading?: (heading: string) => boolean;
  /**
   * When true, auto-link lever names, Lever N refs, and practice names
   * that have pages in the library (and Zone N → in-page anchors).
   */
  autoLinkFramework?: boolean;
  /** Per-section visual chrome — does not change Timeless Solution defaults. */
  presentationForHeading?: (heading: string) => EssaySectionPresentation | undefined;
  /** Denser, higher-contrast body for long operational guides. */
  density?: "essay" | "guide";
};

const FRAMEWORK_LINK_CLASS =
  "text-[#7ec8e3] underline decoration-[#7ec8e3]/35 underline-offset-[3px] transition hover:text-white hover:decoration-white/50";

function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function FrameworkHref({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={FRAMEWORK_LINK_CLASS}>
        {children}
      </a>
    );
  }

  const practiceMatch = href.match(/^\/practices\/([^/]+)\/([^/]+)\/?$/);
  if (practiceMatch) {
    return (
      <Link
        to="/practices/$leverSlug/$practiceSlug"
        params={{ leverSlug: practiceMatch[1]!, practiceSlug: practiceMatch[2]! }}
        className={FRAMEWORK_LINK_CLASS}
      >
        {children}
      </Link>
    );
  }

  const leverMatch = href.match(/^\/practices\/([^/]+)\/?$/);
  if (leverMatch) {
    return (
      <Link
        to="/practices/$leverSlug"
        params={{ leverSlug: leverMatch[1]! }}
        className={FRAMEWORK_LINK_CLASS}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link to={href} className={FRAMEWORK_LINK_CLASS}>
      {children}
    </Link>
  );
}

function RichText({
  spans,
  linkTerms,
}: {
  spans: TextSpan[];
  linkTerms: FrameworkLinkTerm[] | null;
}) {
  return (
    <>
      {spans.map((span, index) => {
        const segments = linkTerms ? segmentFrameworkLinks(span.text, linkTerms) : null;

        let node: ReactNode = segments ? (
          <>
            {segments.map((segment, segmentIndex) =>
              segment.type === "link" ? (
                <FrameworkHref key={`l-${index}-${segmentIndex}`} href={segment.href}>
                  {segment.text}
                </FrameworkHref>
              ) : (
                <span key={`t-${index}-${segmentIndex}`}>{segment.text}</span>
              ),
            )}
          </>
        ) : (
          span.text
        );

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

function BlockView({
  block,
  linkTerms,
  density,
}: {
  block: ContentBlock;
  linkTerms: FrameworkLinkTerm[] | null;
  density: "essay" | "guide";
}) {
  const bodyTone =
    density === "guide"
      ? "text-[15px] leading-7 text-[#d2e4f0] sm:text-base sm:leading-8"
      : "text-[17px] leading-[1.9] text-[#b8d4e8] sm:text-lg";

  if (block.type === "subheading") {
    return (
      <h3
        className={
          density === "guide"
            ? "pt-2 text-sm font-semibold tracking-[0.04em] text-[#9fd4ea] sm:text-[15px]"
            : "text-[15px] font-semibold tracking-wide text-white sm:text-base"
        }
      >
        <RichText spans={block.spans} linkTerms={linkTerms} />
      </h3>
    );
  }

  if (block.type === "list") {
    return (
      <ul
        className={`list-disc space-y-2.5 pl-5 marker:text-[#7ec8e3] ${bodyTone} ${
          density === "guide" ? "space-y-2" : ""
        }`}
      >
        {block.items.map((item, index) => (
          <li key={`${spansKey(item)}-${index}`} className="pl-1">
            <RichText spans={item} linkTerms={linkTerms} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className={bodyTone}>
      <RichText spans={block.spans} linkTerms={linkTerms} />
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
  autoLinkFramework = false,
  presentationForHeading,
  density = "essay",
}: EssayProseProps) {
  const omit = omitHeadingMatching ? normalize(omitHeadingMatching) : null;
  const linkTerms = autoLinkFramework ? getFrameworkLinkTerms() : null;

  return (
    <div className={density === "guide" ? "space-y-8" : "space-y-12"}>
      {sections.map((section) => {
        const hideHeading = omit !== null && normalize(section.heading) === omit;
        const sectionId = sectionIdForHeading?.(section.heading);
        const emphasized = emphasizeHeading?.(section.heading) ?? false;
        const presentation = presentationForHeading?.(section.heading);
        const blocks = sectionBlocks(section);

        const shellClass = [
          presentation?.shellClassName ??
            (emphasized
              ? "scroll-mt-28 rounded-2xl border border-[#dcb48d]/35 bg-[#dcb48d]/[0.06] px-5 py-6 sm:px-7 sm:py-8"
              : "scroll-mt-28"),
          presentation?.mark ? "relative overflow-hidden" : "",
        ]
          .filter(Boolean)
          .join(" ");

        const headingClass =
          presentation?.headingClassName ??
          `display text-2xl sm:text-3xl ${emphasized ? "text-[#f0dcc8]" : "text-white"}`;

        return (
          <section key={section.heading} id={sectionId} className={shellClass}>
            {presentation?.mark ? (
              <div
                className="pointer-events-none absolute right-3 top-2 select-none font-display text-5xl leading-none text-white/[0.06] sm:right-5 sm:top-3 sm:text-6xl"
                aria-hidden
              >
                {presentation.mark}
              </div>
            ) : null}
            {!hideHeading && (
              <div className="relative">
                {presentation?.eyebrow ? (
                  <div className="label-eyebrow mb-3 text-[#7ec8e3]/85">{presentation.eyebrow}</div>
                ) : null}
                <h2 className={headingClass}>{presentation?.title ?? section.heading}</h2>
              </div>
            )}
            <div
              className={
                presentation?.bodyClassName ??
                `${hideHeading ? "" : "mt-5"} space-y-5`
              }
            >
              {blocks.map((block, index) => (
                <BlockView
                  key={`${section.heading}-${block.type}-${index}-${blocksToParagraphs([block])[0]?.slice(0, 32) ?? ""}`}
                  block={block}
                  linkTerms={linkTerms}
                  density={density}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
