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
                      `${supabaseUrl}/rest/v1/user_profiles?id=eq.${u.id}&select=subscription_status,sessions_today,last_session_date`,
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
                        sessions_today: number;
                        last_session_date: string | null;
                      }>;
                      const p = rows[0];
                      if (p && p.subscription_status !== "paid") {
                        const today = new Date().toISOString().slice(0, 10);
                        const todays = p.last_session_date === today ? p.sessions_today : 0;
                        // First user-turn of a session counts. We approximate by counting only first message.
                        const userTurns = messages.filter((m) => m.role === "user").length;
                        if (userTurns <= 1 && todays >= 3) {
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
