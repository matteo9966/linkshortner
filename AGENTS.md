
# LLM Agent Instructions (Project Standards)

This file is the **entry point** for AI/LLM coding standards in this repository.

## How instructions are organized

- `AGENTS.md` stays **short and stable**: it is an index + a few global non-negotiables.
- Detailed instructions are split into separate Markdown files under **`/docs`**.
	- If you need to add or change guidance, prefer updating the relevant `/docs/*.md` file.

## Read these first (in order)

1. `docs/llm-entrypoint.md`
2. `docs/nextjs-app-router.md`
3. `docs/auth-clerk.md`
4. `docs/db-drizzle-neon.md`

## Global non-negotiables

- This repo uses **Next.js App Router** only (`app/`), not `pages/` and not `_app.tsx`.
- Do **not** write real secrets into tracked files. Use placeholders in examples; real values belong in `.env.local`.
- Keep changes minimal and consistent with existing patterns and folder structure.

## If instructions conflict

Prefer the most relevant `/docs/*.md` guidance and the existing codebase patterns. If something appears outdated, do not guess—update the relevant `/docs` instruction doc as part of the change.

