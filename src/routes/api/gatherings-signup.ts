import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { subscribeToMailerlite } from "@/routes/api/community-signup";

const Body = z.object({
  email: z.string().trim().email().max(255),
});

function isAlreadySubscribedError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /already|exists|taken|subscribed/i.test(message);
}

export const Route = createFileRoute("/api/gatherings-signup")({
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
        // Prefer a dedicated gatherings group when set; otherwise reuse the
        // existing community list so no new Mailerlite group is required.
        const groupId =
          process.env.MAILERLITE_GATHERINGS_GROUP_ID ||
          process.env.MAILERLITE_COMMUNITY_GROUP_ID;
        if (!apiKey || !groupId) {
          console.error(
            "Mailerlite env vars missing (MAILERLITE_API_KEY / MAILERLITE_COMMUNITY_GROUP_ID)",
          );
          return Response.json(
            { error: "Email signup is not configured yet." },
            { status: 503 },
          );
        }

        try {
          await subscribeToMailerlite(parsed.email, groupId, apiKey);
          return Response.json({ ok: true });
        } catch (e) {
          // Already on the list is still success — do not surface an error.
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
