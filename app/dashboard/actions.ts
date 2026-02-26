"use server";
import { z } from "zod";
import {
  createLink as createLinkHelper,
  getUserLinks,
  deleteLink as deleteLinkHelper,
  updateLink as updateLinkHelper,
} from "@/data/links";
import { requireDashboardAuth } from "@/models/auth";
import { revalidatePath } from "next/cache";

function revalidateDashboard() {
  revalidatePath("/dashboard");
}

const CreateLinkSchema = z.object({
  url: z.string(),
  slug: z.string().optional(),
});

/**
 * Server action to create a new link. Validates input and ensures the user is authenticated before creating the link in the database.
 * @param input
 * @returns
 */
export async function createLinkAction(input: unknown) {
  const userId = await requireDashboardAuth();

  const parsedInput = CreateLinkSchema.safeParse(input);
  if (!parsedInput.success) {
    return { error: "Invalid input" };
  }

  const { url, slug } = parsedInput.data;

  try {
    const newLink = await createLinkHelper({ url, slug, userId });
    revalidateDashboard();
    return { success: true, data: newLink };
  } catch (error) {
    console.error("Error creating link:", error);
    return { error: "Failed to create link" };
  }
}

/**
 * server action to fetch all links for the authenticated user. Ensures the user is authenticated before querying the database for their links.
 * @returns
 */
export async function getLinksAction() {
  const userId = await requireDashboardAuth();

  try {
    const links = await getUserLinks(userId);
    revalidateDashboard();
    //  revalidatePath("/dashboard");

    return { success: true, data: links };
  } catch (error) {
    console.error("Error fetching links:", error);
    return { error: "Failed to fetch links" };
  }
}

/**
 * server action to update an existing link. Validates input and ensures the user is authenticated before updating the link in the database.
 * @param linkId
 * @param input
 * @returns
 */
const UpdateLinkSchema = z
  .object({
    url: z.string().optional(),
    slug: z.string().optional(),
  })
  .refine((data) => data.url || data.slug, {
    message: "At least one of url or slug must be provided",
  });

export async function updateLinkAction(linkId: string, input: unknown) {
  const userId = await requireDashboardAuth();

  const parsed = UpdateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Invalid input" };
  }

  const updates = parsed.data;

  try {
    const updatedLink = await updateLinkHelper(
      parseInt(linkId, 10),
      userId,
      updates,
    );
    // revalidateDashboard();
    if (!updatedLink) {
      return { error: "Link not found or not authorized" };
    }

    revalidateDashboard();
    return { success: true, data: updatedLink };
  } catch (error) {
    console.error("Error updating link:", error);
    return { error: "Failed to update link" };
  }
}

/**
 * server action to delete an existing link. Ensures the user is authenticated before deleting the link from the database.
 * @param linkId
 * @returns
 */
export async function deleteLinkAction(linkId: string) {
  const userId = await requireDashboardAuth();

  try {
    const success = await deleteLinkHelper(parseInt(linkId, 10), userId);

    if (!success) {
      return { error: "Link not found or not authorized" };
    }
    revalidateDashboard();
    return { success: true };
  } catch (error) {
    console.error("Error deleting link:", error);
    return { error: "Failed to delete link" };
  }
}
