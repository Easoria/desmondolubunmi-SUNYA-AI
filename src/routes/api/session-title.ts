import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

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

          const key = process.env.LOVABLE_API_KEY;
          if (!key) return Response.json({ title: null, lever_tags: [] });

          const transcript = msgs
            .map((m) => `${m.role === "user" ? "User" : "Sunya"}: ${m.content}`)
            .join("\n\n");

          const prompt = `Based on the conversation below, return a short JSON object with:
- "title": 4-6 word session title capturing the core theme (no punctuation at end, sentence case).
- "lever_tags": array of 1-3 levers most central to the session, chosen ONLY from: Breath, Awareness, Mind, Heart, Movement, Sound, Sleep, Nutrition, Connection, Environment, Nature, Sustenance.

Return ONLY the JSON object, no markdown fences, no commentary.

Conversation:
${transcript}`;

          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                { role: "system", content: "You return only valid JSON. No prose, no markdown." },
                { role: "user", content: prompt },
              ],
            }),
          });
          if (!res.ok) return Response.json({ title: null, lever_tags: [] });
          const data = await res.json();
          const raw: string = data?.choices?.[0]?.message?.content ?? "";
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
            "Breath",
            "Awareness",
            "Mind",
            "Heart",
            "Movement",
            "Sound",
            "Sleep",
            "Nutrition",
            "Connection",
            "Environment",
            "Nature",
            "Sustenance",
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
