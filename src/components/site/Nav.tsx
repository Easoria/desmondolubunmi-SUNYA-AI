import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, LogOut, LayoutDashboard, Settings, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const FRAMEWORK_CHILDREN = [
  { label: "Find what helps", to: "/problems" as const },
  { label: "Philosophy", to: "/philosophy" as const },
  { label: "Practices", to: "/practices" as const },
];

const NAV_ITEMS = [
  { label: "Writing", to: "/writing" as const },
  { label: "Gatherings", to: "/gatherings" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
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
  indent = false,
}: {
  to: string;
  label: string;
  onClick: () => void;
  indent?: boolean;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`rounded-lg px-2 py-3 text-[#b8d4e8] transition hover:bg-white/5 hover:text-white ${
        indent ? "pl-6 text-sm" : ""
      }`}
    >
      {label}
    </Link>
  );
}

function FrameworkMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const childActive = FRAMEWORK_CHILDREN.some(
    (c) => pathname === c.to || pathname.startsWith(`${c.to}/`),
  );
  const parentActive = pathname === "/framework" || pathname.startsWith("/framework/") || childActive;

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 text-sm transition hover:text-white ${
          parentActive ? "text-white" : "text-[#b8d4e8]"
        }`}
      >
        Sunya Framework
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-[60] mt-3 min-w-[13rem] rounded-2xl border border-white/10 bg-[#0a1628]/95 p-2 shadow-xl backdrop-blur-xl">
          <Link
            to="/framework"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm text-[#b8d4e8] hover:bg-white/5 hover:text-white"
          >
            Overview
          </Link>
          <div className="my-1 h-px bg-white/10" />
          {FRAMEWORK_CHILDREN.map((child) => (
            <Link
              key={child.to}
              to={child.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-[#b8d4e8] hover:bg-white/5 hover:text-white"
            >
              {child.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

type NavProps = {
  /** Homepage photographic hero — top scrim while the nav sits over the image. */
  overHero?: boolean;
};

export function Nav({ overHero = false }: NavProps) {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const solidChrome = scrolled || open;
  const heroScrim = overHero && !solidChrome;

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
        solidChrome
          ? "border-b border-white/10 bg-[#0a1628]/70 backdrop-blur-xl"
          : heroScrim
            ? "bg-gradient-to-b from-[rgba(10,22,40,0.62)] via-[rgba(10,22,40,0.28)] to-transparent"
            : ""
      }`}
    >
      <nav className="pointer-events-auto relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-4 sm:px-6 sm:py-5">
        <Link to="/" className="group min-w-0 shrink leading-tight">
          <span className="display whitespace-nowrap text-[1.05rem] tracking-wide text-white sm:text-2xl">
            Desmond Olubunmi
          </span>
        </Link>
        <div className="hidden items-center gap-9 md:flex">
          <FrameworkMenu />
          {NAV_ITEMS.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-[#b8d4e8] transition hover:text-white"
              activeProps={{ className: "text-white" }}
            >
              {n.label}
            </Link>
          ))}
          {user ? <AccountAvatar /> : null}
        </div>
        <div className="relative z-10 flex shrink-0 items-center gap-1.5 md:hidden">
          {user ? <AccountAvatar /> : null}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            className="relative z-[110] -mr-1 inline-flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 rounded-xl px-1.5 py-1 text-white transition hover:bg-[#7ec8e3]/10 active:bg-[#7ec8e3]/15"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen((v) => !v);
            }}
          >
            <span className="pointer-events-none inline-flex items-center justify-center rounded-full border border-[#7ec8e3]/55 bg-[#7ec8e3]/15 p-2 shadow-[0_0_18px_-2px_rgba(126,200,227,0.6)]">
              {open ? (
                <X className="h-[18px] w-[18px]" aria-hidden />
              ) : (
                <Menu className="h-[18px] w-[18px]" aria-hidden />
              )}
            </span>
            <span className="pointer-events-none text-[9px] font-medium uppercase tracking-[0.16em] text-white">
              {open ? "Close" : "View Menu"}
            </span>
          </button>
        </div>
      </nav>
      {open ? (
        <div
          id="mobile-nav-menu"
          className="pointer-events-auto relative z-10 max-h-[min(70vh,calc(100dvh-5.5rem))] overflow-y-auto border-t border-white/10 bg-[#0a1628]/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            <MobileLink to="/framework" label="Sunya Framework" onClick={() => setOpen(false)} />
            {FRAMEWORK_CHILDREN.map((child) => (
              <MobileLink
                key={child.to}
                to={child.to}
                label={child.label}
                indent
                onClick={() => setOpen(false)}
              />
            ))}
            <div className="my-2 h-px bg-white/10" />
            {NAV_ITEMS.map((n) => (
              <MobileLink key={n.to} to={n.to} label={n.label} onClick={() => setOpen(false)} />
            ))}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-[#b8d4e8] transition hover:bg-white/5 hover:text-white"
                >
                  Dashboard
                </Link>
                <Link
                  to="/account"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-[#b8d4e8] transition hover:bg-white/5 hover:text-white"
                >
                  Account
                </Link>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
