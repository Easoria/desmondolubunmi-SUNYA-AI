import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { SESSION_TITLE_SYSTEM_PROMPT, SESSION_TITLE_USER_PROMPT } from "@/lib/sunya-prompts";

// Generates a short title + lever tags for a session, using Anthropic directly.
// Requires ANTHROPIC_API_KEY env var on Vercel.
export const Route = createFileRoute("/api/session-title")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const body = (await request.json()) as {
            messages?: { role: "user" | "assistant"; content: string }[];
          };
          const msgs = (body.messages ?? [])
            .filter((m) => m && typeof m.content === "string")
            .slice(-12);
          if (msgs.length === 0) {
            return Response.json({ title: null, lever_tags: [] });
          }

          const key = process.env.ANTHROPIC_API_KEY;
          if (!key) return Response.json({ title: null, lever_tags: [] });

          const transcript = msgs
            .map((m) => `${m.role === "user" ? "User" : "Sunya"}: ${m.content}`)
            .join("\n\n");

          const prompt = SESSION_TITLE_USER_PROMPT(transcript);

          const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": key,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model: "claude-3-5-haiku-latest",
              max_tokens: 200,
              system: SESSION_TITLE_SYSTEM_PROMPT,
              messages: [{ role: "user", content: prompt }],
            }),
          });
          if (!res.ok) return Response.json({ title: null, lever_tags: [] });
          const data = (await res.json()) as {
            content?: Array<{ type: string; text?: string }>;
          };
          const raw =
            data?.content?.filter((c) => c.type === "text").map((c) => c.text ?? "").join("") ?? "";
          const cleaned = raw.replace(/```json|```/g, "").trim();
          let parsed: { title?: string; lever_tags?: string[] } = {};
          try {
            parsed = JSON.parse(cleaned);
          } catch {
            const match = cleaned.match(/\{[\s\S]*\}/);
            if (match) {
              try {
                parsed = JSON.parse(match[0]);
              } catch {
                /* ignore */
              }
            }
          }
          const VALID = new Set([
            "Conservation", "Breath", "Movement", "Mind", "Sound", "Heart", "Awareness",
            "Sleep", "Nutrition", "Connection", "Environment", "Nature", "Sustenance",
          ]);
          const tags = Array.isArray(parsed.lever_tags)
            ? parsed.lever_tags.filter((t) => typeof t === "string" && VALID.has(t)).slice(0, 3)
            : [];
          const title =
            typeof parsed.title === "string" ? parsed.title.slice(0, 80).trim() : null;
          return Response.json({ title, lever_tags: tags });
        } catch {
          return Response.json({ title: null, lever_tags: [] });
        }
      },
    },
  },
});
