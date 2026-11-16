import type { Components } from "react-markdown";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@tanstack/react-router";
import { normalizeGradeLines } from "@/data/evidence";
import { withMappedPracticeLinks } from "@/data/evidence/practice-mechanism-map";

function childrenToText(children: ReactNode): string {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (typeof children === "object" && "props" in children) {
    return childrenToText((children as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

function slugifyHeading(children: ReactNode): string {
  return childrenToText(children)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

const components: Components = {
  a: ({ href, children }) => {
    if (!href) return <span>{children}</span>;
    if (href.startsWith("/") && href.includes("#")) {
      return (
        <a href={href} className="text-[#7ec8e3] underline underline-offset-2 hover:text-white">
          {children}
        </a>
      );
    }
    if (href.startsWith("/")) {
      return (
        <Link to={href} className="text-[#7ec8e3] underline underline-offset-2 hover:text-white">
          {children}
        </Link>
      );
    }
    if (href.startsWith("#")) {
      return (
        <a href={href} className="text-[#7ec8e3] no-underline hover:text-white">
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#7ec8e3] underline underline-offset-2 hover:text-white"
      >
        {children}
      </a>
    );
  },
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[32rem] border-collapse text-left text-[0.95rem]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-white/[0.04]">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-white/10 px-4 py-3 font-medium text-white">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-b border-white/5 px-4 py-3 align-top text-[#b8d4e8]">{children}</td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="evidence-callout my-8 rounded-2xl border border-[#7ec8e3]/25 bg-[#7ec8e3]/[0.06] px-5 py-5 sm:px-6">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-white/10" />,
  h1: ({ children }) => {
    const id = slugifyHeading(children);
    return (
      <h1 id={id || undefined} className="display mt-0 scroll-mt-28 text-4xl text-white sm:text-5xl">
        {children}
      </h1>
    );
  },
  h2: ({ children }) => {
    const id = slugifyHeading(children);
    return (
      <h2 id={id || undefined} className="display mt-12 scroll-mt-28 text-2xl text-white sm:text-3xl">
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = slugifyHeading(children);
    return (
      <h3 id={id || undefined} className="display mt-8 scroll-mt-28 text-xl text-white sm:text-2xl">
        {children}
      </h3>
    );
  },
};

export function EvidenceMarkdown({
  markdown,
  mechanismSlug,
}: {
  markdown: string;
  /** When set, replaces the Practices that rest on it list from SPEC 47. */
  mechanismSlug?: string;
}) {
  const mapped = mechanismSlug
    ? withMappedPracticeLinks(markdown, mechanismSlug)
    : markdown;
  const source = normalizeGradeLines(mapped);
  return (
    <div className="prose-article evidence-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  );
}
