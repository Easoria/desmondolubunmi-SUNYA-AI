import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AdminGate } from "@/components/admin/AdminGate";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import {
  calculateReadingTime,
  formatDate,
  slugify,
  WRITING_CATEGORIES,
  WRITING_CATEGORY_LABELS,
  type WritingCategory,
  writingCategoryLabel,
} from "@/lib/writing";

export const Route = createFileRoute("/admin/writing")({
  component: AdminWritingPage,
  head: () => ({
    meta: [
      { title: "Writing Admin — Sunya" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

type Article = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  meta_description: string | null;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  reading_time_minutes: number | null;
  category: WritingCategory | null;
  tags: string[];
  published: boolean;
  published_at: string | null;
  updated_at: string;
};

function emptyArticle(): Article {
  return {
    id: "",
    slug: "",
    title: "",
    subtitle: "",
    meta_description: "",
    excerpt: "",
    content: "",
    featured_image_url: "",
    reading_time_minutes: 0,
    category: null,
    tags: [],
    published: false,
    published_at: null,
    updated_at: new Date().toISOString(),
  };
}

function AdminWritingPage() {
  return (
    <AdminGate title="Writing Admin">
      <AdminWritingInner />
    </AdminGate>
  );
}

function AdminWritingInner() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Article | null>(null);
  const [fetchErr, setFetchErr] = useState<string | null>(null);

  async function refresh() {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) setFetchErr(error.message);
    else setArticles((data ?? []) as Article[]);
  }

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold">Writing Admin</h1>
            <p className="text-xs text-slate-500">Signed in as {user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/writing" className="text-sm text-blue-600 hover:underline">
              View writing →
            </Link>
            <button
              type="button"
              onClick={() => setEditing(emptyArticle())}
              className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
            >
              + New Article
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {fetchErr ? (
          <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {fetchErr}
          </div>
        ) : null}

        {editing ? (
          <ArticleEditor
            key={editing.id || "new"}
            article={editing}
            onCancel={() => setEditing(null)}
            onSaved={async (saved) => {
              if (saved) setEditing(saved);
              else setEditing(null);
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
    if (!a.published && !a.category) {
      alert("Choose a category before publishing.");
      onEdit(a);
      return;
    }
    await supabase
      .from("articles")
      .update({
        published: !a.published,
        published_at: !a.published
          ? a.published_at ?? new Date().toISOString()
          : a.published_at,
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
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Published</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.id} className="border-t border-slate-100">
              <td className="px-4 py-3 font-medium">{a.title || "(untitled)"}</td>
              <td className="px-4 py-3 text-xs text-slate-600">
                {writingCategoryLabel(a.category) || "—"}
              </td>
              <td className="px-4 py-3">
                {a.published ? (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                    Published
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                    Draft
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-xs text-slate-600">
                {formatDate(a.published_at) || "—"}
              </td>
              <td className="px-4 py-3 text-right text-xs">
                <button
                  type="button"
                  onClick={() => onEdit(a)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <span className="mx-2 text-slate-300">·</span>
                <button
                  type="button"
                  onClick={() => void togglePublish(a)}
                  className="text-blue-600 hover:underline"
                >
                  {a.published ? "Unpublish" : "Publish"}
                </button>
                <span className="mx-2 text-slate-300">·</span>
                <button
                  type="button"
                  onClick={() => void remove(a)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {articles.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                No articles yet.
              </td>
            </tr>
          ) : null}
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
  onSaved: (saved: Article | null) => void;
}) {
  const [id, setId] = useState(article.id);
  const [title, setTitle] = useState(article.title);
  const [subtitle, setSubtitle] = useState(article.subtitle ?? "");
  const [slug, setSlug] = useState(article.slug);
  const [category, setCategory] = useState<WritingCategory | "">(
    article.category ?? "",
  );
  const [metaDesc, setMetaDesc] = useState(article.meta_description ?? "");
  const [excerpt, setExcerpt] = useState(article.excerpt ?? "");
  const [featuredImageUrl, setFeaturedImageUrl] = useState(
    article.featured_image_url ?? "",
  );
  const [content, setContent] = useState(article.content);
  const [published, setPublished] = useState(article.published);
  const [publishedAt, setPublishedAt] = useState(article.published_at);
  const [saving, setSaving] = useState(false);
  const [autosaveNote, setAutosaveNote] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(article.id));
  const dirtyRef = useRef(false);
  const savingRef = useRef(false);

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  useEffect(() => {
    dirtyRef.current = true;
  }, [title, subtitle, slug, category, metaDesc, excerpt, featuredImageUrl, content, published]);

  const readingTime = useMemo(() => calculateReadingTime(content), [content]);

  async function persist(opts: {
    publish?: boolean;
    unpublish?: boolean;
    silent?: boolean;
  } = {}): Promise<Article | null> {
    if (savingRef.current) return null;
    if (!title.trim() && !content.trim()) {
      if (!opts.silent) setErr("Add a title or some content before saving.");
      return null;
    }

    const willPublish = opts.publish
      ? true
      : opts.unpublish
        ? false
        : published;

    if (willPublish && !category) {
      setErr("Category is required before publishing.");
      return null;
    }

    const nextSlug = slug || slugify(title) || `draft-${Date.now()}`;
    const nextPublishedAt =
      willPublish && !publishedAt ? new Date().toISOString() : publishedAt;

    savingRef.current = true;
    if (!opts.silent) {
      setSaving(true);
      setErr(null);
    }

    const payload = {
      slug: nextSlug,
      title: title.trim() || "Untitled",
      subtitle: subtitle.trim() || null,
      meta_description: metaDesc.trim() || null,
      excerpt: excerpt.trim() || null,
      content,
      featured_image_url: featuredImageUrl.trim() || null,
      reading_time_minutes: readingTime,
      category: category || null,
      tags: article.tags ?? [],
      published: willPublish,
      published_at: nextPublishedAt,
    };

    let saved: Article | null = null;

    if (!id) {
      const { data, error } = await supabase
        .from("articles")
        .insert(payload)
        .select("*")
        .single();
      if (error) {
        if (!opts.silent) setErr(error.message);
        else setAutosaveNote(`Autosave failed: ${error.message}`);
      } else {
        saved = data as Article;
        setId(saved.id);
        setSlug(saved.slug);
        setPublished(saved.published);
        setPublishedAt(saved.published_at);
        dirtyRef.current = false;
        if (opts.silent) {
          setAutosaveNote(`Draft autosaved ${formatDate(saved.updated_at) || "just now"}`);
        }
      }
    } else {
      const { data, error } = await supabase
        .from("articles")
        .update(payload)
        .eq("id", id)
        .select("*")
        .single();
      if (error) {
        if (!opts.silent) setErr(error.message);
        else setAutosaveNote(`Autosave failed: ${error.message}`);
      } else {
        saved = data as Article;
        setPublished(saved.published);
        setPublishedAt(saved.published_at);
        dirtyRef.current = false;
        if (opts.silent) {
          setAutosaveNote(`Draft autosaved ${new Date().toLocaleTimeString()}`);
        }
      }
    }

    savingRef.current = false;
    if (!opts.silent) setSaving(false);
    return saved;
  }

  // Autosave drafts every 30 seconds.
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!dirtyRef.current || published) return;
      void persist({ silent: true });
    }, 30_000);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional interval over latest persist
  }, [published, id, title, subtitle, slug, category, metaDesc, excerpt, featuredImageUrl, content]);

  async function handlePreview() {
    const saved = await persist({ silent: false });
    if (!saved) return;
    window.open(`/writing/${saved.slug}?preview=1`, "_blank", "noopener,noreferrer");
    onSaved(saved);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-slate-500 hover:text-slate-900"
        >
          ← Back to list
        </button>
        <div className="flex flex-wrap items-center gap-2">
          {autosaveNote ? (
            <span className="text-xs text-slate-500">{autosaveNote}</span>
          ) : null}
          <button
            type="button"
            onClick={() =>
              void persist().then((saved) => {
                if (saved) onSaved(saved);
              })
            }
            disabled={saving}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => void handlePreview()}
            disabled={saving}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-50"
          >
            Preview
          </button>
          {published ? (
            <button
              type="button"
              onClick={() =>
                void persist({ unpublish: true }).then((saved) => {
                  if (saved) {
                    setPublished(false);
                    onSaved(saved);
                  }
                })
              }
              disabled={saving}
              className="rounded-md bg-amber-600 px-3 py-1.5 text-sm text-white hover:bg-amber-700 disabled:opacity-50"
            >
              Unpublish
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                void persist({ publish: true }).then((saved) => {
                  if (saved) {
                    setPublished(true);
                    onSaved(saved);
                  }
                })
              }
              disabled={saving || !title.trim() || !category}
              className="rounded-md bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700 disabled:opacity-50"
            >
              Publish
            </button>
          )}
        </div>
      </div>

      {err ? (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {err}
        </div>
      ) : null}

      <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6">
        <Field label="Title">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-lg"
            placeholder="Article title"
          />
        </Field>

        <Field label="Subtitle (optional)">
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            placeholder="Optional supporting line"
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

        <Field label="Category">
          <select
            value={category}
            onChange={(e) =>
              setCategory((e.target.value || "") as WritingCategory | "")
            }
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">Select a category…</option>
            {WRITING_CATEGORIES.map((key) => (
              <option key={key} value={key}>
                {WRITING_CATEGORY_LABELS[key]}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-500">
            Required to publish. Practice · Philosophy · World.
          </p>
        </Field>

        <Field label="Excerpt (2–3 sentences for the index card)">
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          />
        </Field>

        <Field label={`Meta description (${metaDesc.length}/155)`}>
          <textarea
            value={metaDesc}
            onChange={(e) => setMetaDesc(e.target.value.slice(0, 155))}
            rows={2}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          />
        </Field>

        <Field label="Featured image URL (optional)">
          <input
            value={featuredImageUrl}
            onChange={(e) => setFeaturedImageUrl(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            placeholder="https://…"
          />
        </Field>

        <Field label="Published">
          <label className="inline-flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => {
                const next = e.target.checked;
                if (next && !category) {
                  setErr("Category is required before publishing.");
                  return;
                }
                setPublished(next);
                if (next && !publishedAt) {
                  setPublishedAt(new Date().toISOString());
                }
              }}
            />
            Published
          </label>
        </Field>

        <Field label={`Content (Markdown · ~${readingTime} min read)`}>
          <div className="grid gap-3 md:grid-cols-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-sm"
              placeholder={"# Heading\n\nWrite in markdown…"}
            />
            <div className="prose-article max-h-[500px] overflow-auto rounded border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
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
