import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * Server-only auth helpers for the dashboard.
 * - requireDashboardAuth(): redirects to the homepage (/) when not authenticated.
 * - getAuthUserId(): returns the authenticated user id or null.
 */
export async function requireDashboardAuth() {
  const { userId } = await auth();

  if (!userId) {
    // follow repo convention for redirect URL
    redirect("/");
  }

  return userId;
}

export async function getAuthUserId() {
  const { userId } = await auth();
  return userId ?? null;
}
