# LLM Agent Instructions (Project Standards)

This file is the **entry point** for AI/LLM coding standards in this repository. Follow this when generating or modifying code.

## Repo stack (source of truth = existing code)

- **Next.js App Router** (`app/`) + React + TypeScript (strict) — see [app/layout.tsx](app/layout.tsx), [app/page.tsx](app/page.tsx), [tsconfig.json](tsconfig.json)
- **Clerk authentication** — see [`ClerkProvider`](app/layout.tsx) usage and Clerk middleware in [proxy.ts](proxy.ts)
- **Drizzle ORM + Neon (HTTP driver)** — see [`db`](db/db.ts) in [db/db.ts](db/db.ts)
- **Tailwind CSS v4 + shadcn/ui conventions** — see [app/globals.css](app/globals.css), [components.json](components.json), and [`cn`](lib/utils.ts) in [lib/utils.ts](lib/utils.ts)
- **ESLint (Next core-web-vitals + TypeScript)** — see [eslint.config.mjs](eslint.config.mjs)

## How guidance is organized

- Keep `AGENTS.md` **short and stable**: global non‑negotiables + pointers.
- If guidance grows, add **focused docs under `/docs/*.md`** and link them here (prefer that over expanding this file).
- Auth guidance: [docs/authentication.md](docs/authentication.md)

## Global non‑negotiables (must follow)

1. **App Router only**
   - Use `app/` routing and conventions (e.g. `app/**/page.tsx`, `app/**/layout.tsx`, `app/api/**/route.ts`).
   - Do not introduce `pages/` or `_app.tsx`.

2. **Secrets and environment variables**
   - Do **not** write real secrets into tracked files.
   - Use placeholders in examples; real values belong in `.env.local`.
   - Server-only env access (e.g. `process.env.DATABASE_URL`) must never be used in client components.

3. **Auth (Clerk)**
   - Use Clerk primitives from `@clerk/nextjs` as in [app/layout.tsx](app/layout.tsx).
   - If changing request protection/routing rules, follow the existing middleware pattern in [proxy.ts](proxy.ts) (exports `clerkMiddleware()` and `config.matcher`).

4. **Database (Drizzle/Neon)**
   - Use the shared Drizzle instance [`db`](db/db.ts) from [db/db.ts](db/db.ts).
   - Keep DB code server-side (Route Handlers, Server Components, Server Actions).
   - Prefer typed Drizzle queries over ad-hoc patterns.

5. **UI + styling**
   - Use Tailwind utilities and the `cn(...)` helper [`cn`](lib/utils.ts) from [lib/utils.ts](lib/utils.ts).
   - Respect `components.json` aliases and shadcn folder conventions (e.g. `@/components`, `@/components/ui`, `@/lib`).

6. **TypeScript + lint**
   - Keep TypeScript **strict** and avoid `any`.
   - Match existing import/module style (ESM).
   - Ensure changes pass `npm run lint` (see [package.json](package.json)).

## Change policy

- Keep changes **minimal**, consistent with existing patterns, and localized to the feature.
- If a standard seems missing/outdated, codify it by adding a `/docs/*.md` file and linking it here (do not guess silently).

