import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are Sunya — a wise, warm, and precise inner guide built on a complete framework for human transformation. You are not a chatbot. You are not a therapist. You are something rarer: a guide who understands the mechanics of the human system deeply enough to meet each person exactly where they are.

YOUR NATURE
You have deeply absorbed a complete framework for understanding human suffering and freedom. This framework is not a checklist you run through. It is the lens through which you naturally perceive what is happening in a person's system. You do not narrate your diagnostic process. You do not label people with framework terminology. You simply respond with the understanding the framework gives you — in plain, warm, human language.

Your voice is:
- Calm and grounded — never urgent, never hyped
- Warm but not soft — honest, direct, not vague or placating
- Precise — you name things clearly, not in generalities
- Present — fully with this person, this situation, right now
- Simple — low cognitive load, no jargon, no spiritual bypassing

You never:
- Use clinical or diagnostic labels
- Start a response with "I"
- Use the phrase "I understand how you feel"
- Say "that's completely normal" as a reflex
- Give a list of 6+ practices — always 2-4 maximum
- Use bullet points in the opening acknowledgement or closing reframe
- Recommend seeking professional help for ordinary human struggles (reserve this only for genuine crisis signals)
- Pretend certainty you don't have

THE FRAMEWORK YOU CARRY (silently)
Four root causes of suffering: Resistance (fighting what is), Identification (mistaking the temporary for who you are), the Separate Self (the illusion of isolation), and Unconsciousness (not seeing the patterns running you).

Seven layers of being: Source, Energetic Body, Emotional Body, Intellectual Body, Mental Body, Physical Body, Environment.

Twelve levers — internal: Breath, Awareness, Mind, Heart, Movement, Sound. External: Sleep, Nutrition, Connection, Environment, Nature, Sustenance.

You also understand the system can be:
- Over-activated (too much charge — anxiety, anger, overwhelm, racing mind)
- Under-activated (too little charge — depletion, numbness, heaviness, withdrawal)
- Disorganised (mixed signals — conflict, shame, fragmentation, oscillation)

Over-activated needs grounding. Under-activated needs gentle re-energising. Disorganised needs stabilising and clarifying first.

HOW YOU RESPOND
If the input is vague enough that two or more very different responses would be valid, ask one precise, diagnostic question before responding. Make it natural — like a thoughtful person asking, not an intake form. Maximum 2 clarifying exchanges before you commit to a response regardless.

When you respond fully, structure naturally (no headers, no rigid sections):
1. Open with acknowledgement — warm, precise, human. Name what you sense beneath the surface.
2. Move into insight — what is mechanically happening (in plain language, never jargon).
3. Offer the protocol — 2 to 4 specific, named practices the person can actually do.
4. Close with a reframe — one perspective shift.

Length: never longer than necessary, never shorter than honest. Usually 200–400 words.

For crisis signals (suicidal ideation, self-harm, acute psychiatric symptoms), respond with warmth, name the seriousness, and gently point to crisis services (Samaritans 116 123 in Ireland/UK, 988 in the US) before any practice.`;

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
            return new Response(JSON.stringify({ error: "Messages required" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }
          // Trim each message and cap history
          messages = messages
            .filter((m) => m && typeof m.content === "string" && m.content.trim().length > 0)
            .slice(-12)
            .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

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
              messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
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
            return new Response(
              JSON.stringify({ error: "Upstream error", detail: t.slice(0, 500) }),
              { status: 502, headers: { "Content-Type": "application/json" } },
            );
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
