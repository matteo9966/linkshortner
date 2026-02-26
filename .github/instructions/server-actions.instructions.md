---
name: Server Actions
applyTo: **/*.ts, **/*.tsx
---

# Server Actions Guidelines

## Overview

This document outlines the standards for implementing server actions in this project. Server actions are used for all data mutations and must adhere to the following guidelines to ensure consistency, security, and maintainability.

## Key Principles

1. **Mandatory TypeScript**
   - All server actions must use TypeScript.
   - Avoid using the `FormData` TypeScript type. Instead, define strict types for all inputs and outputs.

2. **Authentication**
   - Every server action must validate the authenticated user before performing any database operations.

3. **Data Validation**
   - Use [Zod](https://zod.dev/) for validating all input data.
   - Define schemas for the expected data structure and validate inputs against these schemas.

4. **Error Handling**
   - Server actions must not throw errors.
   - Instead, return an object with either an `error` or `success` property to indicate the outcome.
     ```typescript
     return { error: "Unauthorized" };
     // or
     return { success: true, data: result };
     ```

5. **Helper Functions**
   - Server actions must not directly execute database queries.
   - Wrap all database queries in helper functions located in the `/data` directory.
   - Import and use these helper functions within server actions.

6. **Colocation**
   - Server actions must be colocated in the same directory as the client component that calls them.
   - This ensures that the server action is tightly coupled with the component it serves.

## Implementation Steps

1. **Define Input Types**
   - Create strict TypeScript definitions for the data your server action will handle.

2. **Validate Input Data**
   - Use Zod to validate the input data:

     ```typescript
     import { z } from "zod";

     const InputSchema = z.object({
       field1: z.string(),
       field2: z.number(),
     });

     const validatedData = InputSchema.parse(inputData);
     ```

3. **Check Authentication**
   - Ensure the user is authenticated before proceeding:

     ```typescript
     import { getAuthUserId } from "@/models/auth";

     const userId = await getAuthUserId();
     if (!userId) {
       return { error: "Unauthorized" };
     }
     ```

4. **Use Helper Functions**
   - Call helper functions from the `/data` directory to interact with the database:

     ```typescript
     import { someDatabaseHelper } from "@/data/someHelper";

     const result = await someDatabaseHelper(validatedData);
     return { success: true, data: result };
     ```

5. **Colocate Server Actions**
   - Place the server action in the same directory as the client component that invokes it.
     ```
     /components/
       /SomeComponent/
         index.tsx
         actions.ts
     ```

## Example Server Action

```typescript
// actions.ts
import { z } from "zod";
import { getAuthUserId } from "@/models/auth";
import { someDatabaseHelper } from "@/data/someHelper";

const InputSchema = z.object({
  field1: z.string(),
  field2: z.number(),
});

export async function someServerAction(inputData: unknown) {
  // Validate input
  const validatedData = InputSchema.parse(inputData);

  // Check authentication
  const userId = await getAuthUserId();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  // Perform database operation
  const result = await someDatabaseHelper(validatedData);
  return { success: true, data: result };
}
```

dont write db queries in the server action, wrap them in helper functions in the /data directory and import those helper functions into the server action
