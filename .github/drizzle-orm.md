# ADD DRIZZLE TO NEXTJS PROJECT - APP Router - 

## 1 Overview
 
- **Installation**  start with installing the drizzle dependency
install the dependencies:

npm i drizzle-orm @neondatabase/serverless dotenv
npm i -D drizzle-kit tsx


- **Environment variables**  Add the DATABASE_URL= environment variable to .env file

- **Setup the database connection** if not existing, create inside root folder a db/ folder, inside this db/ folder, add the drizzle connection and export it.

- **Setup the schema for the db** for now simply create a empty file inside the /db/ folder called schema.ts


## 1.1 Example

```ts
//this is inside the /db/db.ts file

import { drizzle } from 'drizzle-orm/neon-http';
export const db = drizzle(process.env.DATABASE_URL);

```

```ts
//this is inside the /db/schema.ts file, it shoudl be an empty file inside the db folder 


```


## 2 Instructions for the model

1. Always use the latest documentation available.
2. Nextjs project uses only the App router course.
3. **Do not** reference the old **`_app.tsx`** or **pages-based** instructions.
4. **Do not print, echo, or write actual keys** into code blocks, files, or logs. Only placeholders.
5. **Do not create or edit tracked files** (`.ts`, `.tsx`, `.md`, etc.) containing real key values.

## 3 Patterns to avoid

## 4 AI model verification steps: 
- You should use the Quick start section as an example for creating and setting up the entireproject
- dont use any deprecated insstructionsd
- check the verification steps after you have finished 



