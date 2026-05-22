// Vercel serverless entry. Bridges Node's IncomingMessage/ServerResponse to
// the Web fetch Request/Response that TanStack Start's server handler expects.
import "../src/lib/ssr-shims";
// The TanStack Start build emits a server bundle that exports a fetch handler.
// We import it via the published entry point used by Start at runtime.
// @ts-expect-error - virtual module resolved by the Start build output
import serverEntry from "@tanstack/react-start/server-entry";

import type { IncomingMessage, ServerResponse } from "node:http";

export const config = {
  runtime: "nodejs",
};

function nodeToWebRequest(req: IncomingMessage): Request {
  const host = req.headers.host ?? "localhost";
  const protocol = (req.headers["x-forwarded-proto"] as string) ?? "https";
  const url = new URL(req.url ?? "/", `${protocol}://${host}`);

  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (Array.isArray(v)) v.forEach((vv) => headers.append(k, vv));
    else if (v != null) headers.set(k, String(v));
  }

  const method = (req.method ?? "GET").toUpperCase();
  const hasBody = method !== "GET" && method !== "HEAD";
  const body = hasBody ? (req as unknown as ReadableStream) : undefined;

  return new Request(url.toString(), {
    method,
    headers,
    // @ts-expect-error duplex required for streaming bodies on Node
    duplex: hasBody ? "half" : undefined,
    body,
  });
}

async function webToNodeResponse(webRes: Response, res: ServerResponse) {
  res.statusCode = webRes.status;
  webRes.headers.forEach((value, key) => res.setHeader(key, value));
  if (!webRes.body) return res.end();
  const reader = webRes.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) res.write(Buffer.from(value));
  }
  res.end();
}

const handler =
  (serverEntry as { fetch: (req: Request) => Promise<Response> | Response }).fetch ??
  (serverEntry as unknown as (req: Request) => Promise<Response> | Response);

export default async function (req: IncomingMessage, res: ServerResponse) {
  try {
    const webReq = nodeToWebRequest(req);
    const webRes = await handler(webReq);
    await webToNodeResponse(webRes, res);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}
