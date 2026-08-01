import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X, LogOut, LayoutDashboard, History, Settings } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useSubscription } from "@/hooks/useSubscription";
import { oneToOneNavLabel } from "@/lib/one-to-one-offer";

// Navbar is capped at 4 items + CTA. Do not add more.
// New sections go in the footer and are surfaced contextually
// from related pages. A navbar with 7 items has no hierarchy.
// Mobile menu matches desktop primary links only — Timeless Solution,
// Writing, Gatherings, and About stay in the footer for focus.
const NAV_PRIMARY = [
  { label: "Philosophy", to: "/philosophy" as const },
  { label: "Practices", to: "/practices" as const },
  { label: oneToOneNavLabel(), to: "/work-with-me" as const },
  { label: "Vision", to: "/vision" as const },
];

function initials(name?: string | null, email?: string | null) {
  const base = (name || email || "U").trim();
  if (!base) return "U";
  const parts = base.split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return base.slice(0, 2).toUpperCase();
}

function AccountAvatar() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!menuOpen) return;
    const h = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [menuOpen]);

  const avatarUrl =
    (user?.user_metadata as { avatar_url?: string; picture?: string } | undefined)?.avatar_url ||
    (user?.user_metadata as { avatar_url?: string; picture?: string } | undefined)?.picture ||
    null;
  const displayName =
    (user?.user_metadata as { full_name?: string; name?: string } | undefined)?.full_name ||
    (user?.user_metadata as { full_name?: string; name?: string } | undefined)?.name ||
    null;

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Account"
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#7ec8e3]/40 bg-[#7ec8e3]/10 text-xs font-medium text-white shadow-[0_0_18px_-4px_rgba(126,200,227,0.4)] hover:bg-[#7ec8e3]/20"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          initials(displayName, user?.email)
        )}
      </button>
      {menuOpen && (
        <div className="absolute right-0 top-12 z-[60] w-56 rounded-2xl border border-white/10 bg-[#0a1628]/95 p-2 shadow-xl backdrop-blur-xl">
          <div className="px-3 py-2">
            <div className="text-sm text-white">{displayName || user?.email?.split("@")[0]}</div>
            <div className="truncate text-xs text-[#b8d4e8]/70">{user?.email}</div>
          </div>
          <div className="my-1 h-px bg-white/10" />
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#b8d4e8] hover:bg-white/5 hover:text-white"
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          <Link
            to="/sessions"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#b8d4e8] hover:bg-white/5 hover:text-white"
          >
            <History className="h-4 w-4" /> Session history
          </Link>
          <Link
            to="/account"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#b8d4e8] hover:bg-white/5 hover:text-white"
          >
            <Settings className="h-4 w-4" /> Account settings
          </Link>
          <div className="my-1 h-px bg-white/10" />
          <button
            onClick={async () => {
              setMenuOpen(false);
              await signOut();
              navigate({ to: "/" });
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#b8d4e8] hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}

function MobileLink({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="rounded-lg px-2 py-3 text-[#b8d4e8] transition hover:bg-white/5 hover:text-white"
    >
      {label}
    </Link>
  );
}

export function Nav() {
  const { user, signOut } = useAuth();
  const { isActive: hasPaidSubscription } = useSubscription();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ctaLabel = hasPaidSubscription ? "Sunya AI" : "Try Sunya AI";

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
          {NAV_PRIMARY.map((n) => (
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
            {ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          {user ? <AccountAvatar /> : null}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/sunya-ai"
            className="glow-btn inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium"
          >
            {ctaLabel} <ArrowRight className="h-3 w-3" />
          </Link>
          {user ? <AccountAvatar /> : null}
          <div className="flex flex-col items-center">
            <button
              aria-label="Menu"
              className="rounded-full border border-[#7ec8e3]/40 bg-[#7ec8e3]/10 p-2 text-white shadow-[0_0_18px_-2px_rgba(126,200,227,0.6)] hover:bg-[#7ec8e3]/20"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#b8d4e8]/80">
              {open ? "Close" : "View Menu"}
            </span>
          </div>
        </div>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-[#0a1628]/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {NAV_PRIMARY.map((n) => (
              <MobileLink
                key={n.to}
                to={n.to}
                label={n.label}
                onClick={() => setOpen(false)}
              />
            ))}
            <div className="my-2 h-px bg-white/10" />
            <Link
              to="/sunya-ai"
              onClick={() => setOpen(false)}
              className="glow-btn mt-1 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
            >
              {ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-[#b8d4e8] hover:bg-white/5 hover:text-white"
                >
                  Dashboard
                </Link>
                <button
                  onClick={async () => {
                    setOpen(false);
                    await signOut();
                    navigate({ to: "/" });
                  }}
                  className="rounded-lg px-2 py-3 text-left text-[#b8d4e8] hover:bg-white/5 hover:text-white"
                >
                  Sign out
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}
