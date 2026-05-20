import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight } from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { listPublishedArticles, type PublishedArticleCard } from "@/lib/articles.functions";
import { ALL_TAGS, SITE_URL, formatDate } from "@/lib/blog";

const PAGE_SIZE = 9;

export const Route = createFileRoute("/blog")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Sunya Blog — Insights on Inner Transformation and Human Wellbeing" },
      {
        name: "description",
        content:
          "Practical insights on anxiety, nervous system regulation, breathwork, sleep, and consciousness — written by Desmond Olubunmi.",
      },
      { property: "og:title", content: "Sunya Blog — Insights on Inner Transformation" },
      {
        property: "og:description",
        content: "Practical writing on anxiety, the nervous system, breathwork, sleep, and awareness.",
      },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
});

function BlogIndex() {
  const fetchArticles = useServerFn(listPublishedArticles);
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["blog", "published"],
    queryFn: () => fetchArticles(),
  });

  const [activeTag, setActiveTag] = useState<string>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (activeTag === "All") return articles;
    return articles.filter((a) => a.tags?.includes(activeTag));
  }, [articles, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />

      <section className="relative overflow-hidden pb-16 pt-16">
        <Starfield density={1.0} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="label-eyebrow">The blog</div>
          <h1 className="display mt-6 text-5xl text-white sm:text-7xl">
            Insights on inner transformation.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-[#b8d4e8]">
            Practical exploration of the mechanics of human wellbeing — anxiety, nervous system
            regulation, breathwork, sleep, consciousness, and what it actually means to be free.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#060d1c] py-16">
        <Starfield density={0.4} />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          {/* Tag filter */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {(["All", ...ALL_TAGS] as string[]).map((tag) => {
              const active = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => {
                    setActiveTag(tag);
                    setPage(1);
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs tracking-wide transition ${
                    active
                      ? "bg-[#7ec8e3] text-[#0a1628]"
                      : "border border-white/10 text-[#b8d4e8] hover:border-[#7ec8e3]/40 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {isLoading ? (
            <div className="py-20 text-center text-sm text-[#b8d4e8]/60">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-sm text-[#b8d4e8]/60">
              No articles published yet. Check back soon.
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paged.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-6 text-sm text-[#b8d4e8]">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="transition hover:text-white disabled:opacity-30"
                  >
                    ← Previous
                  </button>
                  <span className="text-[#b8d4e8]/60">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="transition hover:text-white disabled:opacity-30"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ArticleCard({ article }: { article: PublishedArticleCard }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: article.slug }}
      className="group glass-card flex flex-col overflow-hidden transition hover:ring-1 hover:ring-[#7ec8e3]/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#1a2f4e] via-[#0f1e3a] to-[#1e3a5f]">
        {article.featured_image_url ? (
          <img
            src={article.featured_image_url}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="display text-3xl tracking-[0.4em] text-white/20">SUNYA</div>
          </div>
        )}
        {article.reading_time_minutes ? (
          <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] tracking-wide text-white backdrop-blur">
            {article.reading_time_minutes} min read
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="display line-clamp-2 text-xl text-white">{article.title}</h2>
        {article.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#b8d4e8]">
            {article.excerpt}
          </p>
        )}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-[#b8d4e8]/80"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-5 flex items-center justify-between text-xs text-[#b8d4e8]/70">
          <span>{formatDate(article.published_at)}</span>
          <span className="inline-flex items-center gap-1 text-[#7ec8e3] transition group-hover:text-white">
            Read more <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
