import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { subscribeToMailerlite } from "@/routes/api/community-signup";

const VARIANTS = [
  "framework",
  "practice",
  "philosophy",
  "home",
  "writing",
  "vision",
  "sunya-ai",
  "problem",
] as const;

const Body = z.object({
  email: z.string().trim().email().max(255),
  source: z.enum(VARIANTS),
});

function isAlreadySubscribedError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /already|exists|taken|subscribed/i.test(message);
}

export const Route = createFileRoute("/api/email-capture")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = Body.parse(await request.json());
        } catch {
          return Response.json({ error: "Please enter a valid email." }, { status: 400 });
        }

        const apiKey = process.env.MAILERLITE_API_KEY;
        // Single Sunya list — MAILERLITE_SUNYA_GROUP_ID, else community group.
        const groupId =
          process.env.MAILERLITE_SUNYA_GROUP_ID ||
          process.env.MAILERLITE_COMMUNITY_GROUP_ID;

        if (!apiKey || !groupId) {
          console.error(
            "Mailerlite env vars missing (MAILERLITE_API_KEY / MAILERLITE_SUNYA_GROUP_ID or MAILERLITE_COMMUNITY_GROUP_ID)",
          );
          return Response.json(
            { error: "Email signup is not configured yet." },
            { status: 503 },
          );
        }

        try {
          await subscribeToMailerlite(parsed.email, groupId, apiKey, {
            source: parsed.source,
          });
          return Response.json({ ok: true });
        } catch (e) {
          if (isAlreadySubscribedError(e)) {
            return Response.json({ ok: true });
          }
          console.error(e);
          return Response.json(
            { error: "Could not subscribe. Please try again later." },
            { status: 502 },
          );
        }
      },
    },
  },
});
