import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Starfield } from "@/components/Starfield";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import {
  getPublishedArticleBySlug,
  listPublishedArticles,
} from "@/lib/articles.functions";
import type { PublishedArticleCard, PublishedArticleFull } from "@/lib/articles.functions";
import { SITE_URL, formatDate } from "@/lib/blog";

type LoaderData = { article: PublishedArticleFull; related: PublishedArticleCard[] };

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }): Promise<LoaderData> => {
    const article = await getPublishedArticleBySlug({ data: { slug: params.slug } });
    if (!article) throw notFound();
    const all = await listPublishedArticles();
    const related = all
      .filter(
        (a: PublishedArticleCard) =>
          a.slug !== article.slug &&
          a.tags?.some((t: string) => article.tags?.includes(t)),
      )
      .slice(0, 3);
    return { article, related };
  },
  head: ({ loaderData, params }) => {
    const a = loaderData?.article;
    const url = `${SITE_URL}/blog/${params.slug}`;
    const title = a ? `${a.title} — Sunya` : "Article — Sunya";
    const description = a?.meta_description ?? a?.excerpt ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(a?.featured_image_url
          ? [
              { property: "og:image", content: a.featured_image_url },
              { name: "twitter:image", content: a.featured_image_url },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: a
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: a.title,
                description,
                image: a.featured_image_url || undefined,
                datePublished: a.published_at,
                author: { "@type": "Person", name: "Desmond Olubunmi" },
                publisher: { "@type": "Organization", name: "Sunya" },
                mainEntityOfPage: url,
              }),
            },
          ]
        : [],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <div>
          <h1 className="display text-4xl">Article not found</h1>
          <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-[#7ec8e3]">
            ← Back to the blog
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  ),
});

function ArticlePage() {
  const { article, related } = Route.useLoaderData() as LoaderData;

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />

      <article className="relative overflow-hidden pb-16 pt-12">
        <Starfield density={0.6} />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          {/* Header */}
          <header className="text-center">
            {article.tags && article.tags.length > 0 && (
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-[#b8d4e8]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <h1 className="display text-4xl text-white sm:text-5xl">{article.title}</h1>
            <p className="mt-6 text-sm text-[#b8d4e8]/70">
              By Desmond Olubunmi · {formatDate(article.published_at)}
              {article.reading_time_minutes
                ? ` · ${article.reading_time_minutes} min read`
                : ""}
            </p>
          </header>

          {article.featured_image_url && (
            <div className="mt-12 overflow-hidden rounded-2xl shadow-[0_0_60px_-20px_rgba(126,200,227,0.4)]">
              <img
                src={article.featured_image_url}
                alt={article.title}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          {/* Body */}
          <div className="prose-article mx-auto mt-14 max-w-[680px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content || "*This article is being prepared.*"}
            </ReactMarkdown>
          </div>

          {/* CTA */}
          <div className="mx-auto mt-16 max-w-[680px]">
            <div className="glass-strong rounded-2xl p-8 text-center ring-1 ring-[#7ec8e3]/30 shadow-[0_0_60px_-20px_rgba(126,200,227,0.4)]">
              <div className="label-eyebrow text-[#7ec8e3]">✦ Experience this directly</div>
              <p className="mt-4 text-lg leading-relaxed text-[#b8d4e8]">
                Sunya AI will apply these insights to your specific situation — and give you a
                personalised practice protocol.
              </p>
              <Link
                to="/sunya-ai"
                className="glow-btn mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
              >
                Try Sunya AI Free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="relative overflow-hidden bg-[#060d1c] py-20">
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="label-eyebrow text-center">Continue reading</div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((a) => (
                <Link
                  key={a.id}
                  to="/blog/$slug"
                  params={{ slug: a.slug }}
                  className="group glass-card flex flex-col overflow-hidden transition hover:ring-1 hover:ring-[#7ec8e3]/40"
                >
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-[#1a2f4e] to-[#1e3a5f]">
                    {a.featured_image_url && (
                      <img
                        src={a.featured_image_url}
                        alt={a.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="display line-clamp-2 text-lg text-white">{a.title}</h3>
                    {a.excerpt && (
                      <p className="mt-2 line-clamp-2 text-xs text-[#b8d4e8]">{a.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
