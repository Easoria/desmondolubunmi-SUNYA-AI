import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const CONTRIBUTION_OPTIONS = [
  "volunteer",
  "teacher",
  "partner",
  "spread_word",
  "other",
] as const;

const Body = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  contribution_types: z.array(z.enum(CONTRIBUTION_OPTIONS)).min(1).max(5),
  message: z.string().trim().max(2000).optional().nullable(),
});

async function subscribeContributor(payload: z.infer<typeof Body>) {
  const apiKey = process.env.MAILERLITE_API_KEY!;
  const groupId = process.env.MAILERLITE_CONTRIBUTORS_GROUP_ID!;
  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email: payload.email,
      groups: [groupId],
      fields: {
        name: payload.name,
        contribution_types: payload.contribution_types.join(", "),
        message: payload.message ?? "",
      },
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Mailerlite ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

export const Route = createFileRoute("/api/contributor-signup")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = Body.parse(await request.json());
        } catch {
          return Response.json({ error: "Please complete all required fields." }, { status: 400 });
        }
        if (!process.env.MAILERLITE_API_KEY || !process.env.MAILERLITE_CONTRIBUTORS_GROUP_ID) {
          console.error("Mailerlite contributor env vars missing");
          return Response.json({ error: "Form is not configured yet." }, { status: 503 });
        }
        try {
          await subscribeContributor(parsed);
          return Response.json({ ok: true });
        } catch (e) {
          console.error(e);
          return Response.json({ error: "Could not submit. Please try again later." }, { status: 502 });
        }
      },
    },
  },
});
