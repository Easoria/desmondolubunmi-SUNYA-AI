import { useId, useState } from "react";
import type { Lever } from "@/data/levers/types";

type Props = {
  lever: Pick<Lever, "summaryLine" | "intro">;
  className?: string;
};

/**
 * Visible first paragraph (summaryLine) with optional expandable remainder (intro).
 * Expandable copy stays in the HTML when collapsed for indexing.
 * A noscript style keeps the remainder open when JavaScript is disabled.
 */
export function LeverIntro({ lever, className }: Props) {
  const moreId = useId();
  const visible = (lever.summaryLine ?? "").trim();
  const more = lever.intro.map((p) => p.trim()).filter(Boolean);
  const hasMore = more.length > 0;
  const [expanded, setExpanded] = useState(false);

  if (!visible && !hasMore) return null;

  return (
    <div
      className={
        className ?? "mx-auto mt-8 max-w-4xl text-[#b8d4e8] sm:mt-10"
      }
    >
      {hasMore ? (
        <noscript>
          <style>{`
            .lever-intro-more { grid-template-rows: 1fr !important; }
            .lever-intro-toggle { display: none !important; }
          `}</style>
        </noscript>
      ) : null}

      {visible ? (
        <p className="text-[15px] leading-8 sm:text-base">{visible}</p>
      ) : null}

      {hasMore ? (
        <>
          <div
            id={moreId}
            className={`lever-intro-more grid transition-[grid-template-rows] duration-300 ease-out ${
              expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-6 pt-6">
                {more.map((paragraph, index) => (
                  <p key={index} className="text-[15px] leading-8 sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="lever-intro-toggle mt-4 text-sm text-[#7ec8e3] transition hover:text-white"
            aria-expanded={expanded}
            aria-controls={moreId}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Show less ⌃" : "Read more ⌄"}
          </button>
        </>
      ) : null}
    </div>
  );
}
