import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Body = z.object({
  firstName: z.string().trim().min(1, "First name is required.").max(120),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  whatBringsYou: z.string().trim().max(500).optional().nullable(),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "Consent is required to register." }),
  /** Honeypot — must be empty. */
  company: z.string().max(200).optional().nullable(),
});

function isAlreadySubscribedError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /already|exists|taken|subscribed/i.test(message);
}

async function mailerliteFetch(
  path: string,
  apiKey: string,
  init: RequestInit,
): Promise<Response> {
  return fetch(`https://connect.mailerlite.com/api${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...(init.headers ?? {}),
    },
  });
}

async function upsertSundaySessionSubscriber(input: {
  email: string;
  firstName: string;
  whatBringsYou: string;
  groupId: string;
  apiKey: string;
}) {
  const fields: Record<string, string> = {
    name: input.firstName,
    what_brings_you: input.whatBringsYou,
    sunday_session_consent: "yes",
  };

  const createRes = await mailerliteFetch("/subscribers", input.apiKey, {
    method: "POST",
    body: JSON.stringify({
      email: input.email,
      groups: [input.groupId],
      fields,
      status: "active",
    }),
  });

  if (createRes.ok) {
    return createRes.json().catch(() => ({ ok: true }));
  }

  const createText = await createRes.text().catch(() => "");
  const createError = new Error(`Mailerlite ${createRes.status}: ${createText.slice(0, 200)}`);

  if (!isAlreadySubscribedError(createError) && createRes.status !== 422) {
    throw createError;
  }

  // Already on the list — update fields and ensure they are in the Sunday group.
  const updateRes = await mailerliteFetch(
    `/subscribers/${encodeURIComponent(input.email)}`,
    input.apiKey,
    {
      method: "PUT",
      body: JSON.stringify({
        fields,
        groups: [input.groupId],
        status: "active",
      }),
    },
  );

  if (!updateRes.ok) {
    const updateText = await updateRes.text().catch(() => "");
    throw new Error(`Mailerlite ${updateRes.status}: ${updateText.slice(0, 200)}`);
  }

  return updateRes.json().catch(() => ({ ok: true }));
}

export const Route = createFileRoute("/api/sunday-session-signup")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed: z.infer<typeof Body>;
        try {
          parsed = Body.parse(await request.json());
        } catch (e) {
          const message =
            e instanceof z.ZodError
              ? e.issues[0]?.message || "Please complete all required fields."
              : "Please complete all required fields.";
          return Response.json({ error: message }, { status: 400 });
        }

        // Honeypot filled — pretend success, do not subscribe.
        if (parsed.company && parsed.company.trim().length > 0) {
          return Response.json({ ok: true });
        }

        const apiKey = process.env.MAILERLITE_API_KEY;
        const groupId = process.env.MAILERLITE_SUNDAY_SESSION_GROUP_ID;
        if (!apiKey || !groupId) {
          console.error(
            "Mailerlite env vars missing (MAILERLITE_API_KEY / MAILERLITE_SUNDAY_SESSION_GROUP_ID)",
          );
          return Response.json(
            { error: "Registration is not configured yet. Please try again later." },
            { status: 503 },
          );
        }

        try {
          await upsertSundaySessionSubscriber({
            email: parsed.email,
            firstName: parsed.firstName,
            whatBringsYou: parsed.whatBringsYou?.trim() || "",
            groupId,
            apiKey,
          });
          return Response.json({ ok: true });
        } catch (e) {
          console.error(e);
          return Response.json(
            {
              error:
                "Something went wrong registering you. Please try again in a moment.",
            },
            { status: 502 },
          );
        }
      },
    },
  },
});
