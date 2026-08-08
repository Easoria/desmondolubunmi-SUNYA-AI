import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { SYSTEM_PROMPT } from "@/lib/sunya-prompts";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const body = (await request.json()) as {
            messages?: { role: "user" | "assistant"; content: string }[];
            message?: string;
          };
          let messages = body.messages;
          if (!messages && typeof body.message === "string") {
            messages = [{ role: "user", content: body.message }];
          }
          if (!messages || messages.length === 0) {
            return Response.json({ error: "Messages required" }, { status: 400 });
          }
          messages = messages
            .filter((m) => m && typeof m.content === "string" && m.content.trim().length > 0)
            .slice(-12)
            .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

          // Enforce session limit for authenticated free users
          const authHeader = request.headers.get("authorization") || "";
          const token = authHeader.toLowerCase().startsWith("bearer ")
            ? authHeader.slice(7)
            : "";
          if (token) {
            try {
              const supabaseUrl = process.env.SUPABASE_URL;
              const anon = process.env.SUPABASE_PUBLISHABLE_KEY;
              if (supabaseUrl && anon) {
                const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
                  headers: { apikey: anon, Authorization: `Bearer ${token}` },
                });
                if (userRes.ok) {
                  const u = (await userRes.json()) as { id?: string };
                  if (u.id) {
                    const profRes = await fetch(
                      `${supabaseUrl}/rest/v1/user_profiles?id=eq.${u.id}&select=subscription_status,sessions_this_week,week_start,has_used_first_session`,
                      {
                        headers: {
                          apikey: anon,
                          Authorization: `Bearer ${token}`,
                          Accept: "application/json",
                        },
                      },
                    );
                    if (profRes.ok) {
                      const rows = (await profRes.json()) as Array<{
                        subscription_status: string;
                        sessions_this_week: number | null;
                        week_start: string | null;
                        has_used_first_session: boolean | null;
                      }>;
                      const p = rows[0];
                      if (p && p.subscription_status !== "paid") {
                        // ISO week key, e.g. 2026-W32
                        const now = new Date();
                        const utc = new Date(
                          Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
                        );
                        const dayNum = utc.getUTCDay() || 7;
                        utc.setUTCDate(utc.getUTCDate() + 4 - dayNum);
                        const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
                        const weekNo = Math.ceil(
                          ((utc.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
                        );
                        const week = `${utc.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
                        const weekly =
                          p.week_start === week ? (p.sessions_this_week ?? 0) : 0;
                        const firstUsed = Boolean(p.has_used_first_session);
                        // First-ever session is free; then 2/week.
                        const userTurns = messages.filter((m) => m.role === "user").length;
                        if (userTurns <= 1 && firstUsed && weekly >= 2) {
                          return Response.json({ error: "limit" }, { status: 429 });
                        }
                      }
                    }
                  }
                }
              }
            } catch {
              // soft-fail on limit check; never block due to enforcement bug
            }
          }

          const anthropicKey = process.env.ANTHROPIC_API_KEY;
          if (!anthropicKey) {
            return Response.json({ error: "Missing ANTHROPIC_API_KEY" }, { status: 500 });
          }

          const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": anthropicKey,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-6",
              max_tokens: 1024,
              system: SYSTEM_PROMPT,
              messages: messages.map((m) => ({ role: m.role, content: m.content })),
            }),
          });

          if (res.status === 429 || res.status === 402) {
            return Response.json({ error: "rate" }, { status: res.status });
          }
          if (!res.ok) {
            const t = await res.text();
            return Response.json(
              { error: "Upstream error", detail: t.slice(0, 500) },
              { status: 502 },
            );
          }
          const data = (await res.json()) as {
            content?: Array<{ type: string; text?: string }>;
          };
          const text: string =
            data?.content?.filter((c) => c.type === "text").map((c) => c.text ?? "").join("") ?? "";
          return Response.json({ text });
        } catch (e) {
          return Response.json({ error: String(e) }, { status: 500 });
        }
      },
    },
  },
});
