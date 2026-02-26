---
description: Read this before editing or reading the application code in this project! This file describes how to fetch data from the database using Drizzle ORM.
applyTo: **/*.ts, **/*.tsx 
---

# Data Fetching with Drizzle ORM

## In nextJS use servercomponents for data fetching. This allows you to fetch data directly from the database without needing to create API routes or use client-side fetching.

Never use client components for data fetching!

## Add data fetching methods

Always user helper functions in the /data directory never fetch data directly in the server components. This allows you to reuse the same data fetching logic across multiple components and keeps your code organized.

All fetcher functions use drizzle ORM to interact with the database. You can use the `db` instance from `db/db.ts` to perform queries.

## Mutations

All user mutations should be performed in server actions. This allows you to perform database updates directly from your components without needing to create API routes or use client-side fetching.
The server actions file shoul be called `actions.ts` and be located in the same directory as the component that uses it. For example, if you have a component at `app/dashboard/page.tsx`, the server actions file should be at `app/dashboard/actions.ts`. This keeps the actions co-located with the components that use them, making it easier to understand and maintain the code.
All data recieved from the user should be validated using Zod schemas before being used in any database operations. This prevents any errors.
