## Goal

Make the app deployable on Vercel with a free custom domain and no Lovable branding, while keeping Lovable Cloud as the backend (database, auth, storage, secrets).

## Important upfront decision

The current build is wired to Cloudflare Workers via `@lovable.dev/vite-tanstack-config` (which auto-injects the `@cloudflare/vite-plugin`) plus `src/server.ts` + `wrangler.jsonc`. If we change all of this directly in the Lovable project, the **Lovable preview and Lovable publishing will likely stop working** — you'd lose the ability to iterate inside Lovable.

**Recommended approach:** make the Vercel-specific changes on a **separate GitHub branch** (e.g. `vercel-deploy`) and point Vercel at that branch. The `main` branch stays Lovable-compatible so you can keep editing here, then merge updates into the `vercel-deploy` branch when you want to ship.

I'll do all the work below assuming we're producing the changes for that branch — you'll create the branch in GitHub and apply the diff there.

## Steps

### 1. Replace the Vite config preset
Swap `@lovable.dev/vite-tanstack-config` for a plain TanStack Start + Vite config that targets `vercel`:
- New `vite.config.ts` using `tanstackStart({ target: "vercel" })` directly from `@tanstack/react-start/plugin/vite`
- Add `@vitejs/plugin-react`, `@tailwindcss/vite`, `vite-tsconfig-paths` to the plugin list manually (Lovable's preset was bundling these)
- Keep `VITE_*` env injection, `@` alias, React/TanStack dedupe

### 2. Replace the server entry
- Delete `src/server.ts` (it's Cloudflare-Worker-shaped — uses `fetch(request, env, ctx)` signature)
- Delete `wrangler.jsonc`
- TanStack Start's Vercel target generates its own serverless handler automatically; no replacement file needed

### 3. Update `vercel.json`
```json
{
  "buildCommand": "bun run build",
  "outputDirectory": ".vercel/output",
  "installCommand": "bun install",
  "framework": null
}
```

### 4. Remove Cloudflare-only dependencies
- Remove `@cloudflare/vite-plugin` from `package.json`
- Remove `@lovable.dev/vite-tanstack-config` (or keep it — only used on the Lovable branch)

### 5. Audit server code for Workers-isms
Walk through every `createServerFn` + server route and confirm no code depends on Worker-specific globals. Current code uses `process.env`, `crypto.subtle`, `fetch`, `Buffer` — all fine on Node 20 (Vercel's runtime). No changes expected, but I'll verify.

### 6. Configure Vercel environment variables
In Vercel project Settings → Environment Variables (Production + Preview + Development), add all 15 variables listed in my previous message.

### 7. Update Stripe webhook endpoint
Once Vercel gives you the deployment URL (e.g. `sunya.vercel.app` or your custom domain):
- In Stripe Dashboard → Webhooks → edit your endpoint
- Change URL to `https://<your-vercel-domain>/api/public/payments/webhook?env=live`
- Copy the new signing secret into Vercel's `PAYMENTS_LIVE_WEBHOOK_SECRET`

### 8. Connect the custom domain on Vercel
- Vercel Project → Settings → Domains → Add your domain
- Update DNS at your registrar per Vercel's instructions (free, includes SSL)

### 9. Unpublish from Lovable (optional)
Once Vercel is serving traffic from your custom domain, you can either keep the Lovable preview as a dev sandbox or unpublish it.

## What I need from you

1. Confirm you can create a new branch in your GitHub repo (e.g. `vercel-deploy`)
2. Confirm you're okay with the approach above (keep Lovable working on `main`, Vercel deploys from `vercel-deploy`)

Once you confirm, I'll generate the exact file changes as a single diff you can apply to the `vercel-deploy` branch via GitHub's web editor or locally.

## Risks / honest caveats

- TanStack Start's Vercel target is **newer and less battle-tested** than its Cloudflare target. There's a small chance of runtime issues that need debugging on Vercel's side.
- The `crypto.subtle` webhook verification in `src/lib/stripe.server.ts` works on both runtimes, but if it misbehaves on Vercel Node we'd swap to Node's built-in `crypto.createHmac` (5-line change).
- All server functions hit Lovable Cloud over the public internet (same as today), so latency is unchanged.
- If Vercel deployment fails for any reason, you can keep using Lovable's hosting — nothing is destructive.