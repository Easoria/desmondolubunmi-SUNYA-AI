import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AdminGate } from "@/components/admin/AdminGate";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import {
  formatBadge,
  formatGatheringCardWhen,
  isGatheringUpcoming,
  slugify,
  type Gathering,
  type GatheringFormat,
} from "@/lib/gatherings";

export const Route = createFileRoute("/admin/gatherings")({
  component: AdminGatheringsPage,
  head: () => ({
    meta: [
      { title: "Gatherings Admin — Sunya" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function emptyGathering(): Gathering {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() + 14);
  start.setHours(12, 0, 0, 0);
  const end = new Date(start);
  end.setHours(14, 0, 0, 0);

  return {
    id: "",
    slug: "",
    title: "",
    subtitle: "",
    format: "in_person",
    starts_at: start.toISOString(),
    ends_at: end.toISOString(),
    timezone: "Europe/Dublin",
    venue_name: "",
    address: "",
    city: "Dublin",
    latitude: null,
    longitude: null,
    platform: "",
    description: "",
    what_to_expect: "",
    who_its_for: "",
    practical_notes: "",
    registration_url: "",
    registration_platform: "Eventbrite",
    price_label: "Free",
    capacity_note: "",
    featured_image_url: "",
    published: false,
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
  };
}

function AdminGatheringsPage() {
  return (
    <AdminGate title="Gatherings Admin">
      <AdminGatheringsInner />
    </AdminGate>
  );
}

function AdminGatheringsInner() {
  const { user } = useAuth();
  const [items, setItems] = useState<Gathering[]>([]);
  const [editing, setEditing] = useState<Gathering | null>(null);
  const [fetchErr, setFetchErr] = useState<string | null>(null);

  async function refresh() {
    const { data, error } = await supabase.from("gatherings").select("*");
    if (error) {
      setFetchErr(error.message);
      return;
    }
    const rows = (data ?? []) as Gathering[];
    const now = new Date();
    rows.sort((a, b) => {
      const aUp = isGatheringUpcoming(a, now) ? 0 : 1;
      const bUp = isGatheringUpcoming(b, now) ? 0 : 1;
      if (aUp !== bUp) return aUp - bUp;
      if (aUp === 0) {
        return new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime();
      }
      return new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime();
    });
    setItems(rows);
  }

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold">Gatherings Admin</h1>
            <p className="text-xs text-slate-500">Signed in as {user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/gatherings" className="text-sm text-blue-600 hover:underline">
              View gatherings →
            </Link>
            <button
              type="button"
              onClick={() => setEditing(emptyGathering())}
              className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
            >
              + New gathering
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
          <GatheringEditor
            key={editing.id || "new"}
            gathering={editing}
            onCancel={() => setEditing(null)}
            onSaved={async (saved) => {
              if (saved) setEditing(saved);
              else setEditing(null);
              await refresh();
            }}
          />
        ) : (
          <GatheringList
            items={items}
            onEdit={(g) => setEditing(g)}
            onChange={refresh}
          />
        )}
      </main>
    </div>
  );
}

function GatheringList({
  items,
  onEdit,
  onChange,
}: {
  items: Gathering[];
  onEdit: (g: Gathering) => void;
  onChange: () => void;
}) {
  async function togglePublish(g: Gathering) {
    await supabase
      .from("gatherings")
      .update({ published: !g.published })
      .eq("id", g.id);
    onChange();
  }

  async function duplicate(g: Gathering) {
    const { id: _id, created_at: _c, updated_at: _u, ...rest } = g;
    const payload = {
      ...rest,
      title: `${g.title} (copy)`,
      slug: `${g.slug}-copy-${Date.now().toString(36)}`,
      published: false,
    };
    const { data, error } = await supabase
      .from("gatherings")
      .insert(payload)
      .select("*")
      .single();
    if (error) {
      alert(error.message);
      return;
    }
    onEdit(data as Gathering);
  }

  async function remove(g: Gathering) {
    if (!confirm(`Delete "${g.title}"? This cannot be undone.`)) return;
    await supabase.from("gatherings").delete().eq("id", g.id);
    onChange();
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Format</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((g) => {
            const upcoming = isGatheringUpcoming(g);
            return (
              <tr key={g.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium">{g.title}</td>
                <td className="px-4 py-3 text-xs text-slate-600">
                  {formatGatheringCardWhen(g.starts_at, g.timezone)}
                  <div className="text-[10px] uppercase tracking-wide text-slate-400">
                    {upcoming ? "Upcoming" : "Past"}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600">
                  {formatBadge(g.format)}
                </td>
                <td className="px-4 py-3">
                  {g.published ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                      Published
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      Draft
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-xs">
                  <button
                    type="button"
                    onClick={() => onEdit(g)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <span className="mx-2 text-slate-300">·</span>
                  <button
                    type="button"
                    onClick={() => void togglePublish(g)}
                    className="text-blue-600 hover:underline"
                  >
                    {g.published ? "Unpublish" : "Publish"}
                  </button>
                  <span className="mx-2 text-slate-300">·</span>
                  <button
                    type="button"
                    onClick={() => void duplicate(g)}
                    className="text-blue-600 hover:underline"
                  >
                    Duplicate
                  </button>
                  <span className="mx-2 text-slate-300">·</span>
                  <button
                    type="button"
                    onClick={() => void remove(g)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                No gatherings yet.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

function toLocalInputValue(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromLocalInputValue(value: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function GatheringEditor({
  gathering,
  onCancel,
  onSaved,
}: {
  gathering: Gathering;
  onCancel: () => void;
  onSaved: (saved: Gathering | null) => void;
}) {
  const [id, setId] = useState(gathering.id);
  const [title, setTitle] = useState(gathering.title);
  const [subtitle, setSubtitle] = useState(gathering.subtitle ?? "");
  const [slug, setSlug] = useState(gathering.slug);
  const [format, setFormat] = useState<GatheringFormat>(gathering.format);
  const [startsLocal, setStartsLocal] = useState(toLocalInputValue(gathering.starts_at));
  const [endsLocal, setEndsLocal] = useState(toLocalInputValue(gathering.ends_at));
  const [timezone, setTimezone] = useState(gathering.timezone || "Europe/Dublin");
  const [venueName, setVenueName] = useState(gathering.venue_name ?? "");
  const [address, setAddress] = useState(gathering.address ?? "");
  const [city, setCity] = useState(gathering.city ?? "");
  const [latitude, setLatitude] = useState(
    gathering.latitude != null ? String(gathering.latitude) : "",
  );
  const [longitude, setLongitude] = useState(
    gathering.longitude != null ? String(gathering.longitude) : "",
  );
  const [platform, setPlatform] = useState(gathering.platform ?? "");
  const [description, setDescription] = useState(gathering.description);
  const [whatToExpect, setWhatToExpect] = useState(gathering.what_to_expect ?? "");
  const [whoItsFor, setWhoItsFor] = useState(gathering.who_its_for ?? "");
  const [practicalNotes, setPracticalNotes] = useState(gathering.practical_notes ?? "");
  const [registrationUrl, setRegistrationUrl] = useState(gathering.registration_url ?? "");
  const [registrationPlatform, setRegistrationPlatform] = useState(
    gathering.registration_platform ?? "",
  );
  const [priceLabel, setPriceLabel] = useState(gathering.price_label ?? "");
  const [capacityNote, setCapacityNote] = useState(gathering.capacity_note ?? "");
  const [featuredImageUrl, setFeaturedImageUrl] = useState(
    gathering.featured_image_url ?? "",
  );
  const [published, setPublished] = useState(gathering.published);
  const [slugTouched, setSlugTouched] = useState(Boolean(gathering.id));
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  const payload = useMemo(() => {
    const starts_at = fromLocalInputValue(startsLocal);
    const ends_at = fromLocalInputValue(endsLocal);
    return {
      slug: slug || slugify(title) || `gathering-${Date.now()}`,
      title: title.trim() || "Untitled gathering",
      subtitle: subtitle.trim() || null,
      format,
      starts_at: starts_at ?? new Date().toISOString(),
      ends_at,
      timezone: timezone.trim() || "Europe/Dublin",
      venue_name: format === "in_person" ? venueName.trim() || null : null,
      address: format === "in_person" ? address.trim() || null : null,
      city: format === "in_person" ? city.trim() || null : null,
      latitude:
        format === "in_person" && latitude.trim()
          ? Number(latitude)
          : null,
      longitude:
        format === "in_person" && longitude.trim()
          ? Number(longitude)
          : null,
      platform: format === "online" ? platform.trim() || null : null,
      description,
      what_to_expect: whatToExpect.trim() || null,
      who_its_for: whoItsFor.trim() || null,
      practical_notes: practicalNotes.trim() || null,
      registration_url: registrationUrl.trim() || null,
      registration_platform: registrationPlatform.trim() || null,
      price_label: priceLabel.trim() || null,
      capacity_note: capacityNote.trim() || null,
      featured_image_url: featuredImageUrl.trim() || null,
      published,
    };
  }, [
    slug,
    title,
    subtitle,
    format,
    startsLocal,
    endsLocal,
    timezone,
    venueName,
    address,
    city,
    latitude,
    longitude,
    platform,
    description,
    whatToExpect,
    whoItsFor,
    practicalNotes,
    registrationUrl,
    registrationPlatform,
    priceLabel,
    capacityNote,
    featuredImageUrl,
    published,
  ]);

  async function persist(opts?: { published?: boolean }): Promise<Gathering | null> {
    if (!payload.starts_at) {
      setErr("Start date/time is required.");
      return null;
    }
    if (!description.trim()) {
      setErr("Description is required.");
      return null;
    }
    const nextPublished = opts?.published ?? published;
    const body = { ...payload, published: nextPublished };
    setSaving(true);
    setErr(null);

    if (!id) {
      const { data, error } = await supabase
        .from("gatherings")
        .insert(body)
        .select("*")
        .single();
      setSaving(false);
      if (error) {
        setErr(error.message);
        return null;
      }
      const saved = data as Gathering;
      setId(saved.id);
      setSlug(saved.slug);
      setPublished(saved.published);
      return saved;
    }

    const { data, error } = await supabase
      .from("gatherings")
      .update(body)
      .eq("id", id)
      .select("*")
      .single();
    setSaving(false);
    if (error) {
      setErr(error.message);
      return null;
    }
    const saved = data as Gathering;
    setPublished(saved.published);
    return saved;
  }

  async function handlePreview() {
    const saved = await persist();
    if (!saved) return;
    window.open(`/gatherings/${saved.slug}?preview=1`, "_blank", "noopener,noreferrer");
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
        <div className="flex flex-wrap gap-2">
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
            Save
          </button>
          <button
            type="button"
            onClick={() => void handlePreview()}
            disabled={saving}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-50"
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() =>
              void persist({ published: true }).then((saved) => {
                if (saved) onSaved(saved);
              })
            }
            disabled={saving}
            className="rounded-md bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700 disabled:opacity-50"
          >
            Publish
          </button>
        </div>
      </div>

      {err ? (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {err}
        </div>
      ) : null}

      <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Basics
        </h2>
        <Field label="Title">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-lg"
          />
        </Field>
        <Field label="Subtitle">
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
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
          />
        </Field>
        <Field label="Format">
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as GatheringFormat)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="in_person">In person</option>
            <option value="online">Online</option>
          </select>
        </Field>
      </section>

      <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          When
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Starts">
            <input
              type="datetime-local"
              value={startsLocal}
              onChange={(e) => setStartsLocal(e.target.value)}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            />
          </Field>
          <Field label="Ends">
            <input
              type="datetime-local"
              value={endsLocal}
              onChange={(e) => setEndsLocal(e.target.value)}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            />
          </Field>
        </div>
        <Field label="Timezone">
          <input
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            placeholder="Europe/Dublin"
          />
        </Field>
      </section>

      <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Where
        </h2>
        {format === "in_person" ? (
          <>
            <Field label="Venue name">
              <input
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Address">
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </Field>
            <Field label="City">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Latitude">
                <input
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
              </Field>
              <Field label="Longitude">
                <input
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
              </Field>
            </div>
          </>
        ) : (
          <Field label="Platform">
            <input
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              placeholder="Google Meet, Zoom…"
            />
          </Field>
        )}
      </section>

      <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Content
        </h2>
        <MarkdownField label="Description" value={description} onChange={setDescription} />
        <MarkdownField
          label="What to expect"
          value={whatToExpect}
          onChange={setWhatToExpect}
        />
        <MarkdownField label="Who it's for" value={whoItsFor} onChange={setWhoItsFor} />
        <MarkdownField
          label="Practical notes"
          value={practicalNotes}
          onChange={setPracticalNotes}
        />
      </section>

      <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Registration
        </h2>
        <Field label="Registration URL">
          <input
            value={registrationUrl}
            onChange={(e) => setRegistrationUrl(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            placeholder="https://…"
          />
        </Field>
        <Field label="Registration platform">
          <input
            value={registrationPlatform}
            onChange={(e) => setRegistrationPlatform(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            placeholder="Eventbrite, Google Meet, Meetup"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Price label">
            <input
              value={priceLabel}
              onChange={(e) => setPriceLabel(e.target.value)}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              placeholder="Free, €15…"
            />
          </Field>
          <Field label="Capacity note">
            <input
              value={capacityNote}
              onChange={(e) => setCapacityNote(e.target.value)}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              placeholder="Limited to 20 people"
            />
          </Field>
        </div>
      </section>

      <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Media & publish
        </h2>
        <Field label="Featured image URL">
          <input
            value={featuredImageUrl}
            onChange={(e) => setFeaturedImageUrl(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          />
        </Field>
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Published
        </label>
      </section>
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

function MarkdownField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <div className="grid gap-3 md:grid-cols-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-sm"
        />
        <div className="prose-article max-h-[280px] overflow-auto rounded border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {value || "*Preview*"}
          </ReactMarkdown>
        </div>
      </div>
    </Field>
  );
}
