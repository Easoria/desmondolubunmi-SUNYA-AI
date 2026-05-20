import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { BLOG_ADMIN_EMAIL, ALL_TAGS, slugify, calculateReadingTime, formatDate } from "@/lib/blog";

export const Route = createFileRoute("/admin/blog")({
  component: AdminBlogPage,
  head: () => ({
    meta: [
      { title: "Sunya Blog Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

type Article = {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  reading_time_minutes: number | null;
  tags: string[];
  published: boolean;
  published_at: string | null;
  updated_at: string;
};

function AdminBlogPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Article | null>(null);
  const [fetchErr, setFetchErr] = useState<string | null>(null);

  const isAdmin = !!user && user.email?.toLowerCase() === BLOG_ADMIN_EMAIL;

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate({ to: "/" });
    }
  }, [loading, isAdmin, navigate]);

  async function refresh() {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) setFetchErr(error.message);
    else setArticles((data ?? []) as Article[]);
  }

  useEffect(() => {
    if (isAdmin) refresh();
  }, [isAdmin]);

  if (loading || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold">Sunya Blog Admin</h1>
            <p className="text-xs text-slate-500">Signed in as {user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/blog" className="text-sm text-blue-600 hover:underline">
              View live blog →
            </Link>
            <button
              onClick={() =>
                setEditing({
                  id: "",
                  slug: "",
                  title: "",
                  meta_description: "",
                  excerpt: "",
                  content: "",
                  featured_image_url: "",
                  reading_time_minutes: 0,
                  tags: [],
                  published: false,
                  published_at: null,
                  updated_at: new Date().toISOString(),
                })
              }
              className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
            >
              + New Article
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {fetchErr && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {fetchErr}
          </div>
        )}

        {editing ? (
          <ArticleEditor
            article={editing}
            onCancel={() => setEditing(null)}
            onSaved={async () => {
              setEditing(null);
              await refresh();
            }}
          />
        ) : (
          <ArticleList
            articles={articles}
            onEdit={(a) => setEditing(a)}
            onChange={refresh}
          />
        )}
      </main>
    </div>
  );
}

function ArticleList({
  articles,
  onEdit,
  onChange,
}: {
  articles: Article[];
  onEdit: (a: Article) => void;
  onChange: () => void;
}) {
  async function togglePublish(a: Article) {
    await supabase
      .from("articles")
      .update({
        published: !a.published,
        published_at: !a.published ? new Date().toISOString() : a.published_at,
      })
      .eq("id", a.id);
    onChange();
  }
  async function remove(a: Article) {
    if (!confirm(`Delete "${a.title}"? This cannot be undone.`)) return;
    await supabase.from("articles").delete().eq("id", a.id);
    onChange();
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Tags</th>
            <th className="px-4 py-3">Published</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.id} className="border-t border-slate-100">
              <td className="px-4 py-3 font-medium">{a.title}</td>
              <td className="px-4 py-3">
                {a.published ? (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                    ✓ Published
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                    ✎ Draft
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-xs text-slate-600">{a.tags.join(", ")}</td>
              <td className="px-4 py-3 text-xs text-slate-600">
                {formatDate(a.published_at) || "—"}
              </td>
              <td className="px-4 py-3 text-right text-xs">
                <button
                  onClick={() => onEdit(a)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <span className="mx-2 text-slate-300">·</span>
                <button
                  onClick={() => togglePublish(a)}
                  className="text-blue-600 hover:underline"
                >
                  {a.published ? "Unpublish" : "Publish"}
                </button>
                <span className="mx-2 text-slate-300">·</span>
                <button
                  onClick={() => remove(a)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {articles.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                No articles yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function ArticleEditor({
  article,
  onCancel,
  onSaved,
}: {
  article: Article;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const isNew = !article.id;
  const [title, setTitle] = useState(article.title);
  const [slug, setSlug] = useState(article.slug);
  const [metaDesc, setMetaDesc] = useState(article.meta_description ?? "");
  const [excerpt, setExcerpt] = useState(article.excerpt ?? "");
  const [tagsInput, setTagsInput] = useState(article.tags.join(", "));
  const [featuredImageUrl, setFeaturedImageUrl] = useState(article.featured_image_url ?? "");
  const [content, setContent] = useState(article.content);
  const [published, setPublished] = useState(article.published);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(!isNew);

  // Auto-slug from title for new articles
  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  const readingTime = useMemo(() => calculateReadingTime(content), [content]);
  const tags = useMemo(
    () =>
      tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tagsInput],
  );

  async function save(opts: { publish?: boolean; unpublish?: boolean } = {}) {
    setSaving(true);
    setErr(null);
    const willPublish = opts.publish ? true : opts.unpublish ? false : published;
    const payload = {
      slug,
      title,
      meta_description: metaDesc || null,
      excerpt: excerpt || null,
      content,
      featured_image_url: featuredImageUrl || null,
      reading_time_minutes: readingTime,
      tags,
      published: willPublish,
      published_at:
        willPublish && !article.published_at ? new Date().toISOString() : article.published_at,
    };
    const { error } = isNew
      ? await supabase.from("articles").insert(payload)
      : await supabase.from("articles").update(payload).eq("id", article.id);
    setSaving(false);
    if (error) {
      setErr(error.message);
      return;
    }
    onSaved();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onCancel} className="text-sm text-slate-500 hover:text-slate-900">
          ← Back to list
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => save()}
            disabled={saving}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-50"
          >
            Save Draft
          </button>
          {published ? (
            <button
              onClick={() => save({ unpublish: true })}
              disabled={saving}
              className="rounded-md bg-amber-600 px-3 py-1.5 text-sm text-white hover:bg-amber-700 disabled:opacity-50"
            >
              Unpublish
            </button>
          ) : (
            <button
              onClick={() => save({ publish: true })}
              disabled={saving || !title || !slug}
              className="rounded-md bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700 disabled:opacity-50"
            >
              Publish →
            </button>
          )}
        </div>
      </div>

      {err && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>
      )}

      <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6">
        <Field label="Title">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-lg"
            placeholder="Article title"
          />
        </Field>
        <Field label="Slug">
          <input
            value={slug}
            onChange={(e) => {
              setSlug(slugify(e.target.value));
              setSlugTouched(true);
            }}
            className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-sm"
            placeholder="article-slug"
          />
        </Field>
        <Field label={`Meta Description (${metaDesc.length}/155)`}>
          <textarea
            value={metaDesc}
            onChange={(e) => setMetaDesc(e.target.value.slice(0, 155))}
            rows={2}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Excerpt (2-3 sentences for blog card)">
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Tags (comma-separated)">
          <input
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            placeholder="Anxiety, Breathwork"
          />
          <div className="mt-1 flex flex-wrap gap-1">
            {ALL_TAGS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  if (!tags.includes(t)) setTagsInput([...tags, t].join(", "));
                }}
                className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-600 hover:bg-slate-100"
              >
                + {t}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Featured Image URL">
          <input
            value={featuredImageUrl}
            onChange={(e) => setFeaturedImageUrl(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            placeholder="https://…"
          />
        </Field>
        <Field label={`Content (Markdown · ~${readingTime} min read)`}>
          <div className="grid gap-3 md:grid-cols-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-sm"
              placeholder="# Heading&#10;&#10;Write in markdown…"
            />
            <div className="prose-article max-h-[500px] overflow-auto rounded border border-slate-200 bg-slate-50 p-4 text-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || "*Live preview appears here.*"}
              </ReactMarkdown>
            </div>
          </div>
        </Field>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}
