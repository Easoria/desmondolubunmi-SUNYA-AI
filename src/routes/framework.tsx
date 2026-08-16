import { Link, createFileRoute } from "@tanstack/react-router";
import { buildSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/framework")({
  head: () =>
    buildSeoHead({
      title: "The Sunya Framework — Philosophy and Practice",
      description:
        "The complete framework for human wellbeing. The philosophy explains why we suffer; the practices are what to do about it. One hundred and twelve practices across twelve levers.",
      path: "/framework",
      ogType: "website",
      imageKind: "core",
    }),
  component: FrameworkHubPage,
});

function FrameworkHubPage() {
  return (
    <div className="min-h-[100dvh] bg-[#060d1c] text-white">
      {/* Mobile: stacked halves, both visible at 375px without scroll */}
      <div className="flex min-h-[100dvh] flex-col lg:hidden">
        <Link
          to="/philosophy"
          className="group relative flex min-h-0 flex-1 flex-col justify-center px-6 py-8"
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
            <h1 className="display mt-2 text-2xl leading-tight text-white sm:text-3xl">
              Why we suffer, and how it ends.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#b8d4e8]/90">
              The five-link chain, the seven layers of being, and the complete map of the human
              condition.
            </p>
          </div>
        </Link>

        <div
          className="relative h-px shrink-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(126,200,227,0.15), rgba(232,244,251,0.55), rgba(126,200,227,0.15), transparent)",
          }}
          aria-hidden
        />

        <Link
          to="/practices"
          className="group relative flex min-h-0 flex-1 flex-col justify-center px-6 py-8"
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
            <h2 className="display mt-2 text-2xl leading-tight text-white sm:text-3xl">
              One hundred and twelve practices.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#b8d4e8]/90">
              Twelve levers, arrived at from first principles. Every means by which a human being
              can transform their wellbeing.
            </p>
          </div>
        </Link>
      </div>

      {/* Desktop: equal split with vertical light divider */}
      <div className="relative hidden min-h-[100dvh] lg:grid lg:grid-cols-2">
        <Link
          to="/philosophy"
          className="group relative flex flex-col justify-center px-12 xl:px-20"
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
            <h1 className="display mt-5 text-4xl leading-[1.15] text-white xl:text-5xl">
              Why we suffer, and how it ends.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-[#b8d4e8]">
              The five-link chain, the seven layers of being, and the complete map of the human
              condition.
            </p>
          </div>
        </Link>

        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-px -translate-x-1/2"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(126,200,227,0.12) 18%, rgba(232,244,251,0.65) 50%, rgba(126,200,227,0.12) 82%, transparent 100%)",
            boxShadow: "0 0 24px 1px rgba(126,200,227,0.25)",
          }}
          aria-hidden
        />

        <Link
          to="/practices"
          className="group relative flex flex-col justify-center px-12 xl:px-20"
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
            <h2 className="display mt-5 text-4xl leading-[1.15] text-white xl:text-5xl">
              One hundred and twelve practices.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#b8d4e8]">
              Twelve levers, arrived at from first principles. Every means by which a human being
              can transform their wellbeing.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
