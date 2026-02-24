import { db } from "@/db/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserLinks(userId: string) {
  return db.select().from(links).where(eq(links.userId, userId));
}