import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import {
  getArticleBySlugForPreview,
  getPublishedArticleBySlug,
  listRelatedArticles,
  type PublishedArticleCard,
  type PublishedArticleFull,
} from "@/lib/articles.functions";
import {
  formatDate,
  isWritingCategory,
  writingCategoryLabel,
} from "@/lib/writing";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildSeoHead,
} from "@/lib/seo";

type LoaderData = {
  article: PublishedArticleFull;
  related: PublishedArticleCard[];
  isPreview: boolean;
};

export const Route = createFileRoute("/writing/$slug")({
  validateSearch: (search: Record<string, unknown>) => ({
    preview: search.preview === "1" || search.preview === 1 || search.preview === true,
  }),
  loaderDeps: ({ search }: { search: { preview?: boolean } }) => ({
    preview: !!search.preview,
  }),
  loader: async ({ params, deps }): Promise<LoaderData> => {
    const preview = deps.preview;

    const article = preview
      ? await getArticleBySlugForPreview({ data: { slug: params.slug } })
      : await getPublishedArticleBySlug({ data: { slug: params.slug } });

    if (!article) throw notFound();

    // Published pages never show drafts; preview may show unpublished.
    if (!preview && !article.published) throw notFound();

    let related: PublishedArticleCard[] = [];
    if (article.category && isWritingCategory(article.category)) {
      related = await listRelatedArticles({
        data: { slug: article.slug, category: article.category, limit: 3 },
      });
    }

    return { article, related, isPreview: preview && !article.published };
  },
  head: ({ loaderData, params }) => {
    const a = loaderData?.article;
    const path = `/writing/${params.slug}`;
    const title = a ? `${a.title} — Desmond Olubunmi` : "Writing — Desmond Olubunmi";
    const description = a?.meta_description ?? a?.excerpt ?? "";
    const sectionLabel = writingCategoryLabel(a?.category) || "Writing";
    const hideFromIndex = Boolean(loaderData?.isPreview || (a && !a.published));

    return {
      ...buildSeoHead({
        title,
        description,
        path,
        ogType: "article",
        imageKind: "blog",
        imageUrl: a?.featured_image_url,
        extraMeta: hideFromIndex
          ? [{ name: "robots", content: "noindex,nofollow" }]
          : [],
      }),
      scripts: [
        ...(a
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify(
                  buildArticleSchema({
                    headline: a.title,
                    description,
                    datePublished: a.published_at,
                    articleSection: sectionLabel,
                    sectionName: "Writing",
                  }),
                ),
              },
            ]
          : []),
        {
          type: "application/ld+json",
          children: JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Writing", path: "/writing" },
              { name: a?.title ?? "Article", path },
            ]),
          ),
        },
      ],
    };
  },
  component: WritingArticlePage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <div>
          <h1 className="display text-4xl">Article not found</h1>
          <Link
            to="/writing"
            className="mt-6 inline-flex items-center gap-2 text-[#7ec8e3]"
          >
            ← Back to writing
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  ),
});

function WritingArticlePage() {
  const { article, related, isPreview } = Route.useLoaderData() as LoaderData;
  const categoryLabel = writingCategoryLabel(article.category);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <Breadcrumb />

      <article className="mx-auto max-w-3xl px-6 pb-20 pt-10">
        {isPreview ? (
          <div className="mb-8 rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-center text-sm text-amber-100">
            Draft preview — not published
          </div>
        ) : null}

        <header className="text-center">
          {categoryLabel ? (
            <div className="label-eyebrow">{categoryLabel}</div>
          ) : null}
          <h1 className="display mt-5 text-4xl text-white sm:text-5xl">
            {article.title}
          </h1>
          {article.subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#b8d4e8]/90">
              {article.subtitle}
            </p>
          ) : null}
          <p className="mt-4 text-sm text-[#b8d4e8]/70">
            By Desmond Olubunmi
            {article.published_at ? ` · ${formatDate(article.published_at)}` : ""}
            {article.reading_time_minutes
              ? ` · ${article.reading_time_minutes} min read`
              : ""}
          </p>
        </header>

        {article.featured_image_url ? (
          <div className="mt-10 overflow-hidden">
            <img
              src={article.featured_image_url}
              alt=""
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}

        <div className="mx-auto mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="prose-article mx-auto mt-12 max-w-[680px]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content || "*This article is being prepared.*"}
          </ReactMarkdown>
        </div>

        <div className="mx-auto mt-16 max-w-[680px] border-t border-white/10 pt-10 text-center">
          <Link
            to="/timeless-solution"
            className="text-sm text-[#7ec8e3] transition hover:text-white"
          >
            The complete framework →
          </Link>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-white/10 bg-[#060d1c] py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="label-eyebrow">Related</div>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to="/writing/$slug"
                  params={{ slug: item.slug }}
                  className="group block"
                >
                  {writingCategoryLabel(item.category) ? (
                    <div className="text-[11px] uppercase tracking-[0.24em] text-[#7ec8e3]/80">
                      {writingCategoryLabel(item.category)}
                    </div>
                  ) : null}
                  <h3 className="display mt-2 text-xl text-white transition group-hover:text-[#e8f4fb]">
                    {item.title}
                  </h3>
                  {item.excerpt ? (
                    <p className="mt-2 line-clamp-2 text-sm text-[#b8d4e8]/80">
                      {item.excerpt}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
    </div>
  );
}
