import { Link } from "@tanstack/react-router";

/** Client-visible stand-in when a retired URL is opened in-app. */
export function GonePage({ title = "This page has been removed" }: { title?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a1628] px-4 text-white">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-white/90">410</h1>
        <h2 className="mt-4 text-xl font-semibold text-white">{title}</h2>
        <p className="mt-2 text-sm text-[#b8d4e8]/80">
          This content has been permanently removed from the site.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-[#0a1628] transition hover:bg-white/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
