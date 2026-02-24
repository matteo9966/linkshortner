# Plan: Simple Links Table Schema

Create a bare-bones `links` table in [db/schema.ts](db/schema.ts) using Drizzle for PostgreSQL (Neon). The schema stores shortened links with user ownership, timestamps, and permanent delete capability—no analytics or soft deletes.

## Steps

### 1. Define the `links` table in [db/schema.ts](db/schema.ts)

- Import Drizzle PostgreSQL types: `pgTable`, `serial`, `text`, `timestamp` from `drizzle-orm/pg-core`
- Create table named `"links"` with columns:
  - `id`: `serial("id").primaryKey()` — auto-incrementing primary key
  - `shortCode`: `text("short_code").notNull().unique()` — the shortened identifier (e.g., "abc123"), unique indexed
  - `originalUrl`: `text("original_url").notNull()` — the full URL to redirect to
  - `userId`: `text("user_id").notNull()` — Clerk user ID (string format like "user_xxx")
  - `createdAt`: `timestamp("created_at", { mode: "date" }).defaultNow().notNull()` — creation timestamp
  - `updatedAt`: `timestamp("updated_at", { mode: "date" }).defaultNow().notNull()` — last update timestamp
- Export as named export: `export const links = pgTable(...)`

### 2. Update [db/db.ts](db/db.ts) to include schema

- Import the schema: `import * as schema from "./schema"`
- Pass schema to drizzle instance: `drizzle(process.env.DATABASE_URL!, { schema })`
- This enables relational queries and proper typing

## Verification

- TypeScript compilation: `npm run build` or check for type errors in IDE
- Schema can be pushed to DB later with: `npx drizzle-kit push` (when ready to apply)
- Verify exports are accessible: `import { links } from "@/db/schema"` in any server component/route

## Decisions

- **Auto-incrementing ID**: Chose `serial` PK + unique `short_code` for standard relational pattern and easier foreign key references if needed later
- **Column naming**: Used camelCase in code (`shortCode`) with snake_case in DB (`short_code`) per Drizzle conventions
- **Timestamp mode**: `{ mode: "date" }` returns JavaScript Date objects (stricter typing than string mode)
- **No cascades**: User deletions won't auto-delete links (Clerk manages users externally)
- **text() vs varchar()**: Used `text()` for all strings (PostgreSQL optimizes both identically, text is more flexible)
