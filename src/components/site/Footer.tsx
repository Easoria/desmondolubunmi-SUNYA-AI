import { Link } from "@tanstack/react-router";
import { Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060d1c]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3 md:items-center">
        <div>
          <div className="display text-xl tracking-[0.4em] text-white">SUNYA</div>
          <div className="mt-1 text-xs italic text-[#b8d4e8]/70">by Desmond Olubunmi</div>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#b8d4e8]">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/philosophy" className="hover:text-white">Philosophy</Link>
          <Link to="/sunya-ai" className="hover:text-white">Sunya AI</Link>
          <Link to="/work-with-me" className="hover:text-white">Work With Me</Link>
          <Link to="/vision" className="hover:text-white">Vision</Link>
        </nav>
        <div className="flex justify-start gap-3 md:justify-end">
          {[Instagram, Youtube].map((Ic, i) => (
            <a
              key={i}
              href="#"
              aria-label="social"
              className="rounded-full border border-white/10 p-2.5 text-[#b8d4e8] transition hover:border-[#7ec8e3]/40 hover:text-white"
            >
              <Ic className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-white/5 px-6 py-6 text-center text-xs text-[#b8d4e8]/50">
        © 2026 Desmond Olubunmi · desmondolubunmi.com
        <div className="mt-1 text-[10px] tracking-[0.3em]">BUILT ON TRUTH · POWERED BY SUNYA</div>
      </div>
    </footer>
  );
}
