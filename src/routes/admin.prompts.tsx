import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import {
  SYSTEM_PROMPT,
  SESSION_TITLE_SYSTEM_PROMPT,
  SESSION_TITLE_USER_PROMPT,
  SOLUTION_PARSER_RULES,
  CHAT_LIMIT_LOGIC,
  COMBINED_PROMPT_EXPORT,
} from "@/lib/sunya-prompts";

export const Route = createFileRoute("/admin/prompts")({
  component: AdminPromptsPage,
  head: () => ({
    meta: [
      { title: "Sunya AI Prompts — Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

const SECTIONS = [
  {
    label: "Main Chat System Prompt",
    detail: "Sent to Claude Sonnet 4-6 · max_tokens 1024 · last 12 messages, truncated to 4000 chars",
    content: SYSTEM_PROMPT,
  },
  {
    label: "Session Title System Prompt",
    detail: "Sent to Claude 3.5 Haiku · max_tokens 200",
    content: SESSION_TITLE_SYSTEM_PROMPT,
  },
  {
    label: "Session Title User Prompt",
    detail: "Rendered with the conversation transcript at call time",
    content: SESSION_TITLE_USER_PROMPT("[PASTE TRANSCRIPT HERE]"),
  },
  {
    label: "Solution Parser Rules",
    detail: "Frontend post-processing after the model returns the solution (not sent to the model)",
    content: SOLUTION_PARSER_RULES,
  },
  {
    label: "Free-Session Limit Logic",
    detail: "Server-side enforcement before calling the model (not sent to the model)",
    content: CHAT_LIMIT_LOGIC,
  },
];

function AdminPromptsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("user_profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single()
      .then(({ data }) => setIsAdmin(!!data?.is_admin));
  }, [user]);

  useEffect(() => {
    if (!loading && isAdmin === false) {
      navigate({ to: "/" });
    }
  }, [loading, isAdmin, navigate]);

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(COMBINED_PROMPT_EXPORT());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard errors
    }
  }

  if (loading || isAdmin !== true) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-semibold">Sunya AI Prompts</h1>
            <p className="text-xs text-slate-500">Signed in as {user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/blog" className="text-sm text-blue-600 hover:underline">
              Blog admin →
            </Link>
            <button
              onClick={copyAll}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              {copied ? "Copied!" : "Copy everything — one button"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <p className="mb-6 text-sm text-slate-600">
          This page shows every prompt and post-processing rule that currently shapes Sunya AI.
          Click the button above to copy the full bundle as a single plain-text document.
        </p>

        <div className="space-y-6">
          {SECTIONS.map((section) => (
            <section
              key={section.label}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white"
            >
              <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
                <h2 className="font-semibold text-slate-900">{section.label}</h2>
                <p className="text-xs text-slate-500">{section.detail}</p>
              </div>
              <div className="relative">
                <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap break-words p-4 text-sm leading-relaxed text-slate-800">
                  {section.content}
                </pre>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
