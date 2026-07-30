# AGENTS.md

## Cursor Cloud specific instructions

### What this app is

Single full-stack web app ("Sunya", a wellness/AI-diagnostic + subscription site).
One process serves the React UI (SSR), all `/api/*` routes, and server functions.
There is no separate backend, no local database, and no docker-compose.

- Framework: TanStack Start (React 19) + TanStack Router/Query, Vite 7, Nitro.
- Package manager / runtime: **Bun** (`bun.lock`). Node is present but use Bun for everything.
- Data/auth: **hosted** Supabase (remote SaaS). AI: Anthropic. Payments: Stripe. Email: MailerLite.

### Running it (standard scripts live in `package.json`)

- `bun install` — install deps (also the startup update script).
- `bun run dev` — dev server on **http://localhost:5173** (`vite.config.ts` sets `host: true`, port 5173).
- `bun run build` then `bun run preview` — production build (`preview` serves on 4173).
- `bun run lint` — ESLint. `bun run format` — Prettier.

### Non-obvious caveats

- `bun` is installed at `~/.bun/bin/bun` and symlinked to `/usr/local/bin/bun`, so it is on PATH
  in non-interactive shells (the update script relies on this). If `bun` is ever missing, reinstall
  with `curl -fsSL https://bun.sh/install | bash` and re-create the symlink.
- Env: `.env` (committed) already contains the hosted Supabase URL + anon/publishable key, so the
  site loads and **Supabase email auth works out of the box**. The project has `mailer_autoconfirm`
  enabled, so email signups are auto-confirmed with no email step — signing up immediately logs you
  in and lands on `/dashboard`. This is the easiest end-to-end smoke test.
- The Sunya AI chat (`POST /api/chat`, `/api/session-title`) requires a **server-only**
  `ANTHROPIC_API_KEY` (never prefix with `VITE_`). It is not set by default, so the chat returns
  HTTP 500 (`Missing ANTHROPIC_API_KEY`) until you add it. Everything else still works without it.
- Blog SSR (`/blog`), `sitemap.xml`, the admin CMS (`/admin/blog`), and the Stripe webhook need
  `SUPABASE_SERVICE_ROLE_KEY`. Stripe checkout needs `STRIPE_SECRET_KEY` + `VITE_PAYMENTS_CLIENT_TOKEN`
  (a Stripe **test** publishable key is in `.env.development`). MailerLite signups need
  `MAILERLITE_*`. All of these are optional and only required to exercise those specific flows.
- `bunfig.toml` enforces a 24h supply-chain guard (`minimumReleaseAge`); brand-new package versions
  are skipped on install. This is intentional — do not disable it casually.
- `bun run lint` currently reports many pre-existing Prettier/ESLint errors in the repo; they are not
  caused by environment setup.
