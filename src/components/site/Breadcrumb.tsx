import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function Breadcrumb() {
  return (
    <div className="relative z-20 mx-auto max-w-7xl px-6 pt-24">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#b8d4e8]/70 transition hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Home
      </Link>
    </div>
  );
}
