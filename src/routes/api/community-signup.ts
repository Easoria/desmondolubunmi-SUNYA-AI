import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Body = z.object({
  email: z.string().trim().email().max(255),
});

async function subscribeToMailerlite(
  email: string,
  groupId: string,
  apiKey: string,
  fields?: Record<string, string>,
) {
  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      groups: [groupId],
      ...(fields ? { fields } : {}),
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Mailerlite ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

export const Route = createFileRoute("/api/community-signup")({
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
        const groupId = process.env.MAILERLITE_COMMUNITY_GROUP_ID;
        if (!apiKey || !groupId) {
          console.error("Mailerlite env vars missing (MAILERLITE_API_KEY / MAILERLITE_COMMUNITY_GROUP_ID)");
          return Response.json({ error: "Email signup is not configured yet." }, { status: 503 });
        }
        try {
          await subscribeToMailerlite(parsed.email, groupId, apiKey);
          return Response.json({ ok: true });
        } catch (e) {
          console.error(e);
          return Response.json({ error: "Could not subscribe. Please try again later." }, { status: 502 });
        }
      },
    },
  },
});

export { subscribeToMailerlite };
