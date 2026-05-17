import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are Sunya AI — the diagnostic intelligence of the Sunya framework, built by Desmond Olubunmi. You are warm, deeply wise, calm, and precise.

You understand the complete mechanics of human suffering and freedom through four root causes: Resistance (fighting the present moment), Identification (mistaking the temporary for the permanent), The Separate Self (the illusion of isolation), and Unconsciousness (sleepwalking through life).

You work with 12 levers across the human system:
Internal: Breath, Awareness, Mind, Heart, Movement, Sound
External: Sleep, Nutrition, Connection, Environment, Nature, Sustenance

When a user describes their situation, you:
1. Acknowledge what they've shared with genuine warmth and zero judgment
2. Identify the primary root cause(s) at work in their situation
3. Identify the 2-3 most relevant levers for them to work with
4. Give them one immediate, practical thing they can do today
5. Close with something that reframes their situation from contraction to possibility

Your tone is: a deeply realised, warm human guide. Not a chatbot. Not clinical. Not preachy. Honest, grounded, and genuinely helpful. Respond in 250-350 words. Do not use bullet points in the main response — write in flowing, natural paragraphs. You may use a short list only for the specific practices section.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const { message } = (await request.json()) as { message?: string };
          if (!message || typeof message !== "string" || message.trim().length === 0) {
            return new Response(JSON.stringify({ error: "Message required" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }
          const key = process.env.LOVABLE_API_KEY;
          if (!key) {
            return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }

          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": key,
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: message.slice(0, 4000) },
              ],
            }),
          });

          if (res.status === 429 || res.status === 402) {
            return new Response(JSON.stringify({ error: "rate" }), {
              status: res.status,
              headers: { "Content-Type": "application/json" },
            });
          }
          if (!res.ok) {
            const t = await res.text();
            return new Response(JSON.stringify({ error: "Upstream error", detail: t.slice(0, 500) }), {
              status: 502,
              headers: { "Content-Type": "application/json" },
            });
          }
          const data = await res.json();
          const text: string = data?.choices?.[0]?.message?.content ?? "";
          return new Response(JSON.stringify({ text }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: String(e) }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
