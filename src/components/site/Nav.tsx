import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const NAV = [
  { label: "Philosophy", to: "/philosophy" as const },
  { label: "Sunya AI", to: "/sunya-ai" as const },
  { label: "Work With Me", to: "/work-with-me" as const },
  { label: "Vision", to: "/vision" as const },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-white/10 bg-[#0a1628]/70 backdrop-blur-xl" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="group flex flex-col leading-tight">
          <span className="display text-2xl tracking-[0.4em] text-white">SUNYA</span>
          <span className="text-[10px] italic text-[#b8d4e8]/70 sm:text-xs">
            by Desmond Olubunmi
          </span>
        </Link>
        <div className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-[#b8d4e8] transition hover:text-white"
              activeProps={{ className: "text-white" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/sunya-ai"
            className="glow-btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
          >
            Try Sunya AI <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/sunya-ai"
            className="glow-btn inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium"
          >
            Try Sunya AI <ArrowRight className="h-3 w-3" />
          </Link>
          <button
            aria-label="Menu"
            className="rounded-md border border-white/10 p-2 text-white"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-[#0a1628]/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-[#b8d4e8] transition hover:bg-white/5 hover:text-white"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/sunya-ai"
              onClick={() => setOpen(false)}
              className="glow-btn mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
            >
              Try Sunya AI <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
