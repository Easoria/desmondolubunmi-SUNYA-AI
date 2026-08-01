import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { listPublishedArticles, type PublishedArticleCard } from "@/lib/articles.functions";
import {
  formatDate,
  isWritingCategory,
  WRITING_CATEGORIES,
  WRITING_CATEGORY_LABELS,
  type WritingCategory,
  writingCategoryLabel,
} from "@/lib/writing";
import { buildSeoHead } from "@/lib/seo";

const PAGE_SIZE = 9;

type WritingSearch = {
  category?: WritingCategory;
  page?: number;
};

export const Route = createFileRoute("/writing")({
  validateSearch: (search: Record<string, unknown>): WritingSearch => {
    const category = isWritingCategory(search.category) ? search.category : undefined;
    const rawPage = search.page;
    const pageNum =
      typeof rawPage === "number"
        ? rawPage
        : typeof rawPage === "string"
          ? Number.parseInt(rawPage, 10)
          : NaN;
    const page = Number.isFinite(pageNum) && pageNum > 1 ? Math.floor(pageNum) : undefined;
    return { category, page };
  },
  head: ({ matches, search }) => {
    if (!matches?.length || matches[matches.length - 1]?.routeId !== "/writing") {
      return {};
    }

    const category = search?.category;
    const path = category ? `/writing?category=${category}` : "/writing";
    const label = category ? WRITING_CATEGORY_LABELS[category] : null;

    return buildSeoHead({
      title: label
        ? `${label} — Writing — Desmond Olubunmi`
        : "Writing — Desmond Olubunmi",
      description:
        "Essays on consciousness, inner practice, and the world. New writing from Desmond Olubunmi, founder of Sunya.",
      path,
      ogType: "website",
      imageKind: "blog",
    });
  },
  component: WritingRoutePage,
});

function WritingRoutePage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname !== "/writing" && pathname !== "/writing/") {
    return <Outlet />;
  }

  return <WritingIndexPage />;
}

function WritingIndexPage() {
  const { category, page: pageParam } = Route.useSearch();
  const navigate = useNavigate({ from: "/writing" });
  const fetchArticles = useServerFn(listPublishedArticles);
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["writing", "published", category ?? "all"],
    queryFn: () => fetchArticles({ data: category ? { category } : {} }),
  });

  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const currentPage = Math.min(pageParam ?? 1, totalPages);
  const paged = useMemo(
    () => articles.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [articles, currentPage],
  );

  function setCategory(next: WritingCategory | undefined) {
    navigate({
      search: (prev) => ({
        ...prev,
        category: next,
        page: undefined,
      }),
      replace: false,
    });
  }

  function setPage(next: number) {
    navigate({
      search: (prev) => ({
        ...prev,
        page: next > 1 ? next : undefined,
      }),
      replace: false,
    });
  }

  const filters: Array<{ key: WritingCategory | "all"; label: string }> = [
    { key: "all", label: "All" },
    ...WRITING_CATEGORIES.map((key) => ({
      key,
      label: WRITING_CATEGORY_LABELS[key],
    })),
  ];

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10">
        <header className="max-w-3xl">
          <div className="label-eyebrow">Writing</div>
          <h1 className="display mt-4 text-4xl text-white sm:text-5xl">
            Thinking in public.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#b8d4e8] sm:text-base">
            Essays on consciousness, practice, and the world. Written as they come rather than
            in order.
          </p>
          <p className="mt-4 text-sm text-[#b8d4e8]/80">
            <Link to="/essays" className="text-[#7ec8e3] transition hover:text-white">
              For the complete framework, start with the essays →
            </Link>
          </p>
        </header>

        <div className="mt-12 flex flex-wrap gap-x-4 gap-y-2 border-b border-white/10 pb-4 text-sm">
          {filters.map((filter) => {
            const active =
              filter.key === "all" ? !category : category === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() =>
                  setCategory(filter.key === "all" ? undefined : filter.key)
                }
                className={`transition ${
                  active
                    ? "text-white"
                    : "text-[#b8d4e8]/65 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <section className="mt-10">
          {isLoading ? (
            <div className="py-20 text-center text-sm text-[#b8d4e8]/60">Loading…</div>
          ) : articles.length === 0 ? (
            <div className="py-20 text-center text-sm text-[#b8d4e8]/70">
              Nothing here yet.
            </div>
          ) : (
            <>
              <div className="grid gap-10 sm:grid-cols-2">
                {paged.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-14 flex items-center justify-center gap-6 text-sm text-[#b8d4e8]">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setPage(currentPage - 1)}
                    className="transition hover:text-white disabled:opacity-30"
                  >
                    ← Previous
                  </button>
                  <span className="text-[#b8d4e8]/60">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setPage(currentPage + 1)}
                    className="transition hover:text-white disabled:opacity-30"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ArticleCard({ article }: { article: PublishedArticleCard }) {
  const categoryLabel = writingCategoryLabel(article.category);

  return (
    <Link
      to="/writing/$slug"
      params={{ slug: article.slug }}
      className="group block"
    >
      {article.featured_image_url ? (
        <div className="mb-5 overflow-hidden">
          <img
            src={article.featured_image_url}
            alt=""
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.015]"
          />
        </div>
      ) : null}

      {categoryLabel ? (
        <div className="text-[11px] uppercase tracking-[0.24em] text-[#7ec8e3]/85">
          {categoryLabel}
        </div>
      ) : null}

      <h2 className="display mt-2 text-2xl text-white transition group-hover:text-[#e8f4fb] sm:text-[1.65rem]">
        {article.title}
      </h2>

      {article.subtitle ? (
        <p className="mt-2 text-sm leading-relaxed text-[#b8d4e8]/90">{article.subtitle}</p>
      ) : null}

      {article.excerpt ? (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#b8d4e8]/80">
          {article.excerpt}
        </p>
      ) : null}

      <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[#b8d4e8]/50">
        {formatDate(article.published_at)}
        {article.reading_time_minutes
          ? ` · ${article.reading_time_minutes} min read`
          : ""}
      </p>
    </Link>
  );
}
