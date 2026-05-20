import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Globe2,
  ShoppingBag,
  Leaf,
  Building2,
  Waves,
  Flame,
} from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { EmailCapture } from "@/components/site/EmailCapture";

export const Route = createFileRoute("/vision")({
  component: VisionPage,
  head: () => ({
    meta: [
      { title: "The Sunya Vision — A civilisational project" },
      {
        name: "description",
        content:
          "Imagine a world where every human being knows how to create peace within themselves. The Sunya ecosystem, mission, and legacy.",
      },
    ],
  }),
});

type EcoItem = {
  Icon: typeof Sparkles;
  t: string;
  c: string;
  items: { label: string; href?: string; to?: string; comingSoon?: boolean }[];
};

const ECO: EcoItem[] = [
  {
    Icon: Sparkles,
    t: "Sunya Superintelligence",
    c: "AI and technology in service of human wellbeing — for individuals, wellness creators, and organisations.",
    items: [
      { label: "Sunya AI →", to: "/sunya-ai" },
      { label: "Sunya Sleep →", href: "#" },
      { label: "Sunya Studio", comingSoon: true },
    ],
  },
  {
    Icon: BookOpen,
    t: "Sunya Publishing",
    c: "Timeless written guides distilling the framework into accessible, practical wisdom.",
    items: [
      { label: "The Sleep Rhythm Reset →", href: "#" },
      { label: "The Timeless Solution for Humanity", comingSoon: true },
    ],
  },
  {
    Icon: Globe2,
    t: "Sunya Experiences",
    c: "Live events, immersive retreats, digital courses, and conscious communities — structured pathways for deep inner transformation.",
    items: [{ label: "Coming Soon", comingSoon: true }],
  },
  {
    Icon: ShoppingBag,
    t: "Sunya Shop",
    c: "A curated collection of physical tools for human wellbeing — herbs, organic essentials, natural oils, copper vessels, and healing consumables.",
    items: [{ label: "Coming Soon", comingSoon: true }],
  },
  {
    Icon: Leaf,
    t: "Sunya Superfoods",
    c: "High-frequency nutrition for peak consciousness. Clean, living, nourishing food designed to fuel the human system at its highest.",
    items: [{ label: "Coming Soon", comingSoon: true }],
  },
  {
    Icon: Building2,
    t: "Sunya Sanctuaries",
    c: "Physical spaces of inner transformation and conscious living. Situated in nature, solar powered, open to the world. Not isolated communes — charging stations for humanity, integrated with society.",
    items: [{ label: "Coming Soon", comingSoon: true }],
  },
];

function VisionPage() {
  return (
    <div className="min-h-screen bg-[#060d1c] text-white">
      <Nav />
      <Breadcrumb />

      {/* Hero */}
      <section className="relative overflow-hidden pb-32 pt-16">
        <Starfield density={1.8} />
        <div
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 spin-slow"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #2e6db4 0%, #1a1530 40%, transparent 70%)",
            boxShadow: "0 0 200px 60px rgba(126,200,227,0.2)",
          }}
        />
        <div
          className="absolute right-[5%] top-[20%] h-72 w-72 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #a85a8c 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="label-eyebrow">The mission</div>
          <h1 className="display mt-6 text-5xl text-white sm:text-7xl">
            The Sunya
            <br />
            <span className="display-italic text-[#b8d4e8]">Vision.</span>
          </h1>
        </div>
      </section>

      {/* The Vision */}
      <section className="relative bg-[#0a1628] py-28">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">The vision</div>
          </div>
          <div className="mt-12 space-y-7 text-[#b8d4e8]">
            <p className="display-italic text-2xl text-white">
              Imagine a world where every human being knows how to create peace within
              themselves.
            </p>
            <p>
              Where the restlessness that drives conflict, addiction, and endless seeking
              finally has an answer. Not in doctrine, not in an imagined afterlife — but here,
              in this body, in this lifetime, in this breath.
            </p>
            <p>
              We have developed the external world enormously. But inwardly, we remain largely
              underdeveloped. We still operate from fear, tribalism, and borrowed beliefs —
              creating the very conflict and suffering we are trying to escape.
            </p>
            <p>
              The world is simply a collection of individuals. When individuals change, the
              world changes. This is what Sunya exists to address — to empower every human
              being with universal tools to create genuine wellbeing within themselves.
            </p>
            <p>
              We breathe the same air. We want the same things. Freedom from suffering.
              Genuine happiness. A life that feels worth living. These truths run deeper than
              any belief or ideology that divides us.
            </p>
            <p>
              When people learn to create real inner peace — conflict loses its fuel. Division
              loses its grip. Not because unity was preached, but because inner freedom
              naturally dissolves the fear that drives separation.
            </p>
            <p className="display pt-2 text-2xl font-semibold text-white sm:text-3xl">
              This is not idealism. This is mechanics.
            </p>
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="relative overflow-hidden bg-[#060d1c] py-28">
        <Starfield density={0.4} />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">The ecosystem</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              Six arms. <span className="display-italic text-[#b8d4e8]">One mission.</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ECO.map((e, i) => (
              <div key={e.t} className="glass-card flex flex-col p-7">
                <div className="font-display text-xs tracking-[0.4em] text-[#7ec8e3]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <e.Icon className="mt-4 h-6 w-6 text-[#7ec8e3]" />
                <h3 className="display mt-4 text-2xl text-white">{e.t}</h3>
                <p className="mt-3 text-sm text-[#b8d4e8]">{e.c}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.items.map((item) =>
                    item.to ? (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="rounded-full border border-[#7ec8e3]/40 bg-white/[0.04] px-3 py-1 text-[11px] tracking-wide text-[#b8d4e8] transition hover:border-[#7ec8e3] hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ) : item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        className="rounded-full border border-[#7ec8e3]/40 bg-white/[0.04] px-3 py-1 text-[11px] tracking-wide text-[#b8d4e8] transition hover:border-[#7ec8e3] hover:text-white"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span
                        key={item.label}
                        className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] tracking-wide text-white/40"
                      >
                        {item.label}
                      </span>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sanctuaries */}
      <section className="relative overflow-hidden bg-[#0a1628] py-28">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, #2e6db4 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">The sanctuaries</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              Charging stations
              <br />
              <span className="display-italic text-[#b8d4e8]">for the world.</span>
            </h2>
          </div>
          <ul className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-2">
            {SANCTUARY.map((s, i) => (
              <li
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-[#b8d4e8]"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 50-year legacy */}
      <section className="relative overflow-hidden bg-[#060d1c] py-32">
        <Starfield density={1.2} />
        <div className="relative z-10 mx-auto max-w-3xl space-y-6 px-6 text-center">
          <div className="label-eyebrow">The 50-year legacy</div>
          <h2 className="display text-4xl text-white sm:text-5xl">
            What we are building
            <br />
            <span className="display-italic text-[#b8d4e8]">will outlive us all.</span>
          </h2>
          <div className="space-y-5 pt-4 text-left text-[#b8d4e8]">
            <p>
              Fifty years from now, the work begun today will have become infrastructure. Not a
              brand. Not a movement. Infrastructure — as ordinary and as essential as electricity.
            </p>
            <p>
              Children will grow up understanding the mechanics of their own nervous systems.
              Workers will know how to discharge stress before it accumulates. The dying will face
              death without terror. The seeking will know exactly where to look — and what they
              will find.
            </p>
            <p className="text-white/90">
              This is not a vision of a perfect world. It is a vision of an honest one. A world in
              which human beings finally meet themselves — and discover there was never anything to
              fix in the first place.
            </p>
            <p className="display-italic pt-2 text-xl text-white">
              We are at the beginning. You are part of this.
            </p>
          </div>
          <div className="pt-8">
            <Link
              to="/sunya-ai"
              className="glow-btn inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium"
            >
              Begin your part in this → Try Sunya AI
            </Link>
          </div>
        </div>
      </section>

      {/* Three Paths */}
      <section className="relative overflow-hidden bg-[#0a1628] py-28">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(217, 165, 80, 0.10) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center">
            <div className="label-eyebrow">Three paths in</div>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl">
              Where do <span className="display-italic text-[#b8d4e8]">you stand?</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <div className="glass-card flex flex-col p-7">
              <Waves className="h-7 w-7 text-[#7ec8e3]" />
              <div className="label-eyebrow mt-5">The Seeker</div>
              <h3 className="display mt-3 text-2xl text-white">
                I'm here for my own transformation
              </h3>
              <p className="mt-3 flex-1 text-sm text-[#b8d4e8]">
                Start with Sunya AI or book a 1-on-1 session with Desmond.
              </p>
              <Link
                to="/sunya-ai"
                className="mt-6 inline-flex items-center gap-2 text-sm text-[#7ec8e3] hover:text-white"
              >
                Begin here <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="glass-card flex flex-col p-7">
              <Sparkles className="h-7 w-7 text-[#7ec8e3]" />
              <div className="label-eyebrow mt-5">The Believer</div>
              <h3 className="display mt-3 text-2xl text-white">
                I resonate with this mission
              </h3>
              <p className="mt-3 flex-1 text-sm text-[#b8d4e8]">
                Stay connected. Be part of Sunya as it grows into something larger.
              </p>
              <a
                href="#community-signup"
                className="mt-6 inline-flex items-center gap-2 text-sm text-[#7ec8e3] hover:text-white"
              >
                Stay connected <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="glass-card flex flex-col p-7">
              <Flame className="h-7 w-7 text-[#7ec8e3]" />
              <div className="label-eyebrow mt-5">The Builder</div>
              <h3 className="display mt-3 text-2xl text-white">
                I want to contribute
              </h3>
              <p className="mt-3 flex-1 text-sm text-[#b8d4e8]">
                Volunteers, collaborators, future teachers — Sunya needs people like you.
              </p>
              <Link
                to="/join"
                className="mt-6 inline-flex items-center gap-2 text-sm text-[#7ec8e3] hover:text-white"
              >
                Tell us about yourself <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Be Part of This */}
      <section className="relative overflow-hidden bg-[#0a1628] py-32">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(217, 165, 80, 0.14) 0%, transparent 60%), radial-gradient(ellipse at 10% 100%, rgba(217, 165, 80, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 90% 0%, rgba(217, 165, 80, 0.08) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <div className="label-eyebrow">This is just the beginning</div>
          <h2 className="display display-italic mt-6 text-4xl text-white sm:text-6xl">
            You found this for a reason.
          </h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-5 text-left text-[#b8d4e8]">
            <p>
              Sunya is not a finished product. It is a living project — a framework, a community,
              and eventually a civilisation being built from the ground up.
            </p>
            <p>
              If something here has resonated with you — the philosophy, the mission, the vision of
              what human life could actually be — then you are already part of this.
            </p>
            <p className="text-white/90">
              Stay connected. Be the first to know as Sunya grows. Receive philosophy, practices,
              and early access to everything being built.
            </p>
            <p className="display-italic text-lg text-white">No noise. No spam. Just signal.</p>
          </div>

          <div className="mt-10">
            <EmailCapture id="community-signup" />
          </div>

          <div className="mt-10">
            <Link
              to="/join"
              className="display-italic text-sm text-[#b8d4e8] underline-offset-4 hover:text-white hover:underline"
            >
              Want to contribute, volunteer, or collaborate? →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
