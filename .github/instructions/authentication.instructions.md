---
description: This file describes the authentication rules and steps for the project.
applyTo: **/*.ts, **/*.tsx
---

# Authentication (Clerk)

This repo uses Clerk for all authentication. No other auth methods are allowed.

## Rules

- Clerk is the only authentication system.
- Only /dashboard is protected.
- Unauthenticated users must be redirected to the sign-in page.
- Auth logic lives in a server-only model module.

## Steps

1. Add a server-only model at models/auth.ts.
2. In the model, use Clerk server helpers to read auth state and redirect when needed.
3. Use that model in /dashboard (page or layout) to enforce authentication.
4. Configure Clerk middleware to match only /dashboard.
5. Use the sign-in page for redirect: /sign-in?redirect_url=/dashboard.

## Recommended model API

- requireDashboardAuth(): redirects to /sign-in?redirect_url=/dashboard if not signed in.
- getAuthUserId(): returns the current user id for server code.

## Notes

- Do not check auth in client components.
- Keep all redirects in server code.
