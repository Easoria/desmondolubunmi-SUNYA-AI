import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.24em] text-[#b8d4e8]/55">
        {label}
      </div>
      <nav className="mt-4 flex flex-col gap-2.5 text-sm text-[#b8d4e8]">
        {children}
      </nav>
    </div>
  );
}

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className="transition hover:text-white">
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060d1c]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="shrink-0">
            <Link to="/" className="inline-block">
              <div className="display text-xl tracking-[0.4em] text-white">SUNYA</div>
              <div className="mt-1 text-xs italic text-[#b8d4e8]/70">by Desmond Olubunmi</div>
            </Link>
          </div>

          <div className="grid flex-1 gap-10 sm:grid-cols-3">
            <FooterColumn label="The Work">
              <FooterLink to="/philosophy">Philosophy</FooterLink>
              <FooterLink to="/timeless-solution">The Timeless Solution</FooterLink>
              <FooterLink to="/practices">Practices</FooterLink>
              <FooterLink to="/writing">Writing</FooterLink>
            </FooterColumn>

            <FooterColumn label="Work With Me">
              <FooterLink to="/work-with-me">1-on-1 Sessions</FooterLink>
              <FooterLink to="/gatherings">Gatherings</FooterLink>
              <FooterLink to="/sunya-ai">Sunya AI</FooterLink>
            </FooterColumn>

            <FooterColumn label="About">
              <FooterLink to="/about">About Desmond</FooterLink>
              <FooterLink to="/vision">Vision</FooterLink>
              <a
                href="mailto:hello@desmondolubunmi.com"
                className="transition hover:text-white"
              >
                Contact
              </a>
            </FooterColumn>
          </div>
        </div>
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
