import { db } from "@/db/db";
import { links } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function getUserLinks(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

export async function getLinkBySlug(slug: string) {
  const results = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, slug))
    .limit(1);

  return results[0] || null;
}

export async function createLink({
  url,
  slug,
  userId,
}: {
  url: string;
  slug?: string;
  userId: string;
}) {
  const shortCode = slug || nanoid(8);

  const [newLink] = await db
    .insert(links)
    .values({
      originalUrl: url,
      shortCode: shortCode,
      // slug: shortCode,
      userId,
      createdAt: new Date(),
    })
    .returning();

  return newLink;
}


export async function updateLink(linkId: number, userId: string, updates: { url?: string; slug?: string }) {
  const updatedAt = new Date();

  const [updatedLink] = await db
    .update(links)
    .set({
      ...(updates.url && { originalUrl: updates.url }),
      ...(updates.slug && { shortCode: updates.slug }),
      updatedAt,
    })
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning();

  return updatedLink;
}

export async function deleteLink(linkId: number, userId: string) {
  const deletedCount = await db
    .delete(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)));

  return deletedCount.rowCount > 0;
}