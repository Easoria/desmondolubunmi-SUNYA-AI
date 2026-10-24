import { Link, createFileRoute } from "@tanstack/react-router";
import { buildSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/framework")({
  head: () =>
    buildSeoHead({
      title: "The Sunya Framework — Philosophy, Practices, and Where to Start",
      description:
        "Three ways into the complete framework for human wellbeing: the philosophy of why we suffer, 112 practices across twelve levers, and a direct route from what you are struggling with to what helps.",
      path: "/framework",
      ogType: "website",
      imageKind: "core",
    }),
  component: FrameworkHubPage,
});

const verticalDividerStyle = {
  background:
    "linear-gradient(180deg, transparent 0%, rgba(126,200,227,0.12) 18%, rgba(232,244,251,0.65) 50%, rgba(126,200,227,0.12) 82%, transparent 100%)",
  boxShadow: "0 0 24px 1px rgba(126,200,227,0.25)",
} as const;

const horizontalDividerStyle = {
  background:
    "linear-gradient(90deg, transparent, rgba(126,200,227,0.15), rgba(232,244,251,0.55), rgba(126,200,227,0.15), transparent)",
} as const;

/** Same outlined treatment as homepage CTAs — visual affordance only; the whole panel is the link. */
const doorBtnClass =
  "mt-3 inline-flex items-center justify-center rounded-full border border-white/45 bg-transparent px-7 py-2.5 text-sm font-medium tracking-wide text-white transition group-hover:border-white/80 group-hover:bg-white/10 lg:mt-6 lg:px-8 lg:py-3.5";

function FrameworkHubPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#060d1c] text-white">
      <div className="shrink-0 px-6 pb-2 pt-14 text-center sm:pt-16 lg:pb-2 lg:pt-16">
        <h1 className="display text-xl text-white sm:text-3xl">The Sunya Framework</h1>
        <p className="mt-1.5 text-sm tracking-wide text-[#b8d4e8]/65 sm:mt-2">Three ways in.</p>
      </div>

      {/* Mobile: three equal panels — all visible in first viewport */}
      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        <Link
          to="/philosophy"
          className="group relative flex min-h-0 flex-1 cursor-pointer flex-col justify-center px-6 py-3"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40 transition group-hover:opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(126,200,227,0.18), transparent 70%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-sm text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#7ec8e3]/80">
              The Philosophy
            </p>
            <h2 className="display mt-1.5 text-xl leading-tight text-white sm:text-2xl">
              Why we suffer, and how it ends.
            </h2>
            <span className={doorBtnClass}>Explore the philosophy</span>
          </div>
        </Link>

        <div className="relative h-px shrink-0" style={horizontalDividerStyle} aria-hidden />

        <Link
          to="/problems"
          className="group relative flex min-h-0 flex-1 cursor-pointer flex-col justify-center px-6 py-3"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40 transition group-hover:opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(158,201,192,0.18), transparent 70%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-sm text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#9ec9c0]/90">
              Find what helps
            </p>
            <h2 className="display mt-1.5 text-xl leading-tight text-white sm:text-2xl">
              Start where you actually are.
            </h2>
            <span className={doorBtnClass}>Find what helps</span>
          </div>
        </Link>

        <div className="relative h-px shrink-0" style={horizontalDividerStyle} aria-hidden />

        <Link
          to="/practices"
          className="group relative flex min-h-0 flex-1 cursor-pointer flex-col justify-center px-6 py-3"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40 transition group-hover:opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 55%, rgba(196,165,116,0.16), transparent 70%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-sm text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#c4a574]/90">
              The Practices
            </p>
            <h2 className="display mt-1.5 text-xl leading-tight text-white sm:text-2xl">
              112 practices.
            </h2>
            <span className={doorBtnClass}>Explore the practices</span>
          </div>
        </Link>
      </div>

      {/* Desktop: three equal panels with two vertical light dividers */}
      <div className="relative hidden min-h-0 flex-1 lg:grid lg:grid-cols-3">
        <Link
          to="/philosophy"
          className="group relative flex cursor-pointer flex-col justify-center px-10 xl:px-14"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-35 transition duration-500 group-hover:opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 40% 50%, rgba(126,200,227,0.22), transparent 65%)",
            }}
          />
          <div className="relative z-10 max-w-md">
            <p className="text-xs uppercase tracking-[0.3em] text-[#7ec8e3]/85">The Philosophy</p>
            <h2 className="display mt-5 text-3xl leading-[1.15] text-white xl:text-4xl">
              Why we suffer, and how it ends.
            </h2>
            <span className={doorBtnClass}>Explore the philosophy</span>
          </div>
        </Link>

        <div
          className="pointer-events-none absolute inset-y-0 left-1/3 z-20 w-px -translate-x-1/2"
          style={verticalDividerStyle}
          aria-hidden
        />

        <Link
          to="/problems"
          className="group relative flex cursor-pointer flex-col justify-center px-10 xl:px-14"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-35 transition duration-500 group-hover:opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(158,201,192,0.2), transparent 65%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-md text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9ec9c0]/90">Find what helps</p>
            <h2 className="display mt-5 text-3xl leading-[1.15] text-white xl:text-4xl">
              Start where you actually are.
            </h2>
            <span className={doorBtnClass}>Find what helps</span>
          </div>
        </Link>

        <div
          className="pointer-events-none absolute inset-y-0 left-2/3 z-20 w-px -translate-x-1/2"
          style={verticalDividerStyle}
          aria-hidden
        />

        <Link
          to="/practices"
          className="group relative flex cursor-pointer flex-col justify-center px-10 xl:px-14"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-35 transition duration-500 group-hover:opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(196,165,116,0.2), transparent 65%)",
            }}
          />
          <div className="relative z-10 ml-auto max-w-md text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-[#c4a574]/90">The Practices</p>
            <h2 className="display mt-5 text-3xl leading-[1.15] text-white xl:text-4xl">
              112 practices.
            </h2>
            <span className={doorBtnClass}>Explore the practices</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
