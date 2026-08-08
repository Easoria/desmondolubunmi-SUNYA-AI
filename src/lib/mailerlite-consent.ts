const CONSENT_KEY = "sunya_mailerlite_consent";

/** Mark that the next successful signup should join the Sunya Mailerlite list. */
export function setMailerliteConsentPending(consent: boolean) {
  try {
    if (consent) sessionStorage.setItem(CONSENT_KEY, "1");
    else sessionStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
}

/** If consent was given at signup, add email to Mailerlite (source: sunya-ai). */
export async function flushMailerliteConsent(email: string | null | undefined) {
  if (!email) return;
  try {
    if (sessionStorage.getItem(CONSENT_KEY) !== "1") return;
    sessionStorage.removeItem(CONSENT_KEY);
  } catch {
    return;
  }
  try {
    await fetch("/api/email-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "sunya-ai" }),
    });
  } catch {
    /* non-blocking — account creation must succeed regardless */
  }
}
