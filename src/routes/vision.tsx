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
          "Bigger than a wellness brand. The civilisational scope of Sunya — the ecosystem, the sanctuaries, the 50-year legacy.",
      },
    ],
  }),
});

const ECO = [
  { Icon: Sparkles, t: "Sunya AI", c: "The diagnostic intelligence." },
  { Icon: BookOpen, t: "Sunya Publishing", c: "The intellectual anchors — The Timeless Solution, The Sleep Rhythm Reset." },
  { Icon: Globe2, t: "Sunya Experiences", c: "Digital courses, communities, live events." },
  { Icon: ShoppingBag, t: "Sunya Shop", c: "Physical tools for the 12 levers." },
  { Icon: Leaf, t: "Sunya Superfoods", c: "Nutrition for peak consciousness." },
  { Icon: Building2, t: "Sunya Sanctuaries", c: "The physical retreat centres." },
];

const SANCTUARY = [
  "Situated in nature, near living water",
  "Futuristic dome architecture, white and ocean blue",
  "Solar powered, humanoid robots for physical work",
  "Consecrated mercury shivling meditation hall",
  "Community, devotional music, satsang, ecstatic dance",
  "Open to the public — a charging station for the world",
  "Teacher training — sending practitioners into schools, prisons, military",
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
          <p className="mx-auto mt-8 max-w-2xl text-lg text-[#b8d4e8]">
            This is bigger than a wellness brand. This is a civilisational project.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="relative bg-[#0a1628] py-28">
        <div className="relative z-10 mx-auto max-w-3xl space-y-6 px-6 text-[#b8d4e8]">
          <p className="display-italic text-2xl text-white">
            The vision is a world where human beings stop exporting their freedom to an imagined
            afterlife — and start living it here, now, in this body, in this lifetime.
          </p>
          <p>
            A world where technology and spirituality are not enemies, but partners in the
            liberation of human potential.
          </p>
          <p>
            A world with Sunya Sanctuaries — physical spaces of inner transformation powered by
            solar energy, AI, and the living transmission of truth.
          </p>
          <p className="text-white/90">
            A world where the mechanics of human wellbeing are taught in schools, offered in
            prisons, brought to the military, made available to everyone — regardless of religion,
            culture, or tradition.
          </p>
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
              <div key={e.t} className="glass-card p-7">
                <div className="font-display text-xs tracking-[0.4em] text-[#7ec8e3]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <e.Icon className="mt-4 h-6 w-6 text-[#7ec8e3]" />
                <h3 className="display mt-4 text-2xl text-white">{e.t}</h3>
                <p className="mt-3 text-sm text-[#b8d4e8]">{e.c}</p>
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

      <Footer />
    </div>
  );
}
