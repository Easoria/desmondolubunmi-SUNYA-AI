/** Permanent removal response for retired indexed URLs (SPEC 38). */
export function goneResponse(
  message = "This page has been permanently removed.",
): Response {
  return new Response(message, {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
