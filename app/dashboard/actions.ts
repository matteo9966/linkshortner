"use server";
import { z } from "zod";
import {
  createLink as createLinkHelper,
  getUserLinks,
//   deleteLink as deleteLinkHelper,
//   updateLink as updateLinkHelper,
} from "@/data/links";
import { requireDashboardAuth } from "@/models/auth";
// import { db } from "@/db/db";
// import { links } from "@/db/schema";
// import { eq } from "drizzle-orm";

const CreateLinkSchema = z.object({
  url: z.string(),
  slug: z.string().optional(),
});

export async function createLinkAction(input: unknown) {
  const userId = await requireDashboardAuth();

  const parsedInput = CreateLinkSchema.safeParse(input);
  if (!parsedInput.success) {
    return { error: "Invalid input" };
  }

  const { url, slug } = parsedInput.data;

  try {
    const newLink = await createLinkHelper({ url, slug, userId });
    return { success: true, data: newLink };
  } catch (error) {
    console.error("Error creating link:", error);
    return { error: "Failed to create link" };
  }
}

export async function getLinksAction() {
  const userId = await requireDashboardAuth();

  try {
    const links = await getUserLinks(userId);
    return { success: true, data: links };
  } catch (error) {
    console.error("Error fetching links:", error);
    return { error: "Failed to fetch links" };
  }
}

// export async function updateLinkAction(
//   linkId: string,
//   input: { url?: string; slug?: string },
// ) {
//   const userId = await requireDashboardAuth();

//   if (
//     !input ||
//     (typeof input.url !== "string" && typeof input.slug !== "string")
//   ) {
//     return { error: "Invalid input" };
//   }

//   try {
//     const [updatedLink] = await db
//       .update(links)
//       .set({
//         originalUrl: input.url,
//         shortCode: input.slug,
//         updatedAt: new Date(),
//       })
//       .where(eq(links.id, parseInt(linkId, 10)))
//       .returning();

//     if (!updatedLink) {
//       return { error: "Link not found or not authorized" };
//     }

//     return { success: true, data: updatedLink };
//   } catch (error) {
//     console.error("Error updating link:", error);
//     return { error: "Failed to update link" };
//   }
// }

// export async function deleteLinkAction(linkId: string) {
//   const userId = await requireDashboardAuth();

//   try {
//     const deletedCount = await db
//       .delete(links)
//       .where(eq(links.id, parseInt(linkId, 10)));

//     if (deletedCount.rowCount === 0) {
//       return { error: "Link not found or not authorized" };
//     }

//     return { success: true };
//   } catch (error) {
//     console.error("Error deleting link:", error);
//     return { error: "Failed to delete link" };
//   }
// }
