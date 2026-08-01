import { Link } from "@tanstack/react-router";
import {
  formatBadge,
  formatGatheringCardWhen,
  gatheringLocationLine,
  type GatheringCard as GatheringCardData,
} from "@/lib/gatherings";

export function GatheringCard({
  gathering,
  dimmed = false,
}: {
  gathering: GatheringCardData;
  dimmed?: boolean;
}) {
  const location = gatheringLocationLine(gathering);

  return (
    <Link
      to="/gatherings/$slug"
      params={{ slug: gathering.slug }}
      className={`group block border-b border-white/10 py-7 transition last:border-b-0 hover:bg-white/[0.02] ${
        dimmed ? "opacity-60 hover:opacity-90" : ""
      }`}
    >
      <div className="text-[11px] uppercase tracking-[0.28em] text-[#7ec8e3]/85">
        {formatBadge(gathering.format)}
      </div>
      <p className="mt-3 font-display text-lg tracking-wide text-white sm:text-xl">
        {formatGatheringCardWhen(gathering.starts_at, gathering.timezone)}
      </p>
      <h2 className="display mt-2 text-2xl text-white transition group-hover:text-[#e8f4fb] sm:text-3xl">
        {gathering.title}
      </h2>
      {gathering.subtitle ? (
        <p className="mt-2 text-sm leading-relaxed text-[#b8d4e8]/90">
          {gathering.subtitle}
        </p>
      ) : null}
      {location ? (
        <p className="mt-3 text-sm text-[#b8d4e8]/75">{location}</p>
      ) : null}
      {gathering.price_label ? (
        <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#b8d4e8]/50">
          {gathering.price_label}
        </p>
      ) : null}
    </Link>
  );
}
