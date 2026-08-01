import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060d1c]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-2 md:items-center">
        <div>
          <div className="display text-xl tracking-[0.4em] text-white">SUNYA</div>
          <div className="mt-1 text-xs italic text-[#b8d4e8]/70">by Desmond Olubunmi</div>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#b8d4e8]">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/philosophy" className="hover:text-white">Philosophy</Link>
          <Link to="/essays" className="hover:text-white">Essays</Link>
          <Link to="/writing" className="hover:text-white">Writing</Link>
          <Link to="/sunya-ai" className="hover:text-white">Sunya AI</Link>
          <Link to="/work-with-me" className="hover:text-white">Work With Me</Link>
          <Link to="/vision" className="hover:text-white">Vision</Link>
          <Link to="/about" className="hover:text-white">About</Link>
          <Link
            to="/practices"
            className="group inline-flex items-center gap-1.5 rounded-full border border-[#7ec8e3]/40 bg-white/5 px-3 py-1 text-[#e8f4fb] shadow-[0_0_18px_-4px_rgba(126,200,227,0.55)] backdrop-blur-sm transition hover:border-[#7ec8e3]/70 hover:bg-white/10 hover:shadow-[0_0_24px_-2px_rgba(126,200,227,0.8)]"
          >
            <span aria-hidden className="text-[#7ec8e3]">✦</span>
            <span>Practices</span>
          </Link>
        </nav>
      </div>

      <div className="border-t border-white/5 px-6 py-6">
        <p className="mx-auto max-w-3xl text-center text-[11px] leading-relaxed text-[#b8d4e8]/60">
          Sunya AI is a wellness and personal development tool. It is not a substitute for medical
          or mental health care. If you are in crisis or need professional support, please reach
          out to a qualified professional or crisis service — Ireland &amp; UK: Samaritans 116 123 ·
          US: 988.
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 text-xs text-[#b8d4e8]/60 sm:flex-row sm:gap-6">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          <a href="mailto:hello@desmondolubunmi.com" className="hover:text-white">hello@desmondolubunmi.com</a>
        </div>
        <div className="mt-4 text-center text-[10px] tracking-[0.3em] text-[#b8d4e8]/40">
          © 2026 DESMOND OLUBUNMI · BUILT ON TRUTH · POWERED BY SUNYA
        </div>
      </div>
    </footer>
  );
}
