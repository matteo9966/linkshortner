import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./db/schema";
const db = drizzle(process.env.DATABASE_URL!, { schema });

const seedData = {
  projectId: "empty-band-12106455",
  sql: "INSERT INTO links (short_code, original_url, user_id) VALUES \n('abc123', 'https://www.github.com', 'user_3A7LUFVycmT5o2JYesg55iCFqmO'),\n('xyz789', 'https://www.google.com', 'user_3A7LUFVycmT5o2JYesg55iCFqmO'),\n('def456', 'https://www.stackoverflow.com', 'user_3A7LUFVycmT5o2JYesg55iCFqmO'),\n('qwe321', 'https://www.reddit.com/r/programming', 'user_3A7LUFVycmT5o2JYesg55iCFqmO'),\n('zxc987', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'user_3A7LUFVycmT5o2JYesg55iCFqmO'),\n('poi654', 'https://www.linkedin.com', 'user_3A7LUFVycmT5o2JYesg55iCFqmO'),\n('lkj852', 'https://www.twitter.com', 'user_3A7LUFVycmT5o2JYesg55iCFqmO'),\n('mnb741', 'https://www.amazon.com', 'user_3A7LUFVycmT5o2JYesg55iCFqmO'),\n('vbn963', 'https://www.netflix.com', 'user_3A7LUFVycmT5o2JYesg55iCFqmO'),\n('fgh159', 'https://www.vercel.com', 'user_3A7LUFVycmT5o2JYesg55iCFqmO')",
};

async function seedDatabase() {
  console.log("Seeding database...");
  try {
    await db.execute(seedData.sql);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit();
  }
}

seedDatabase();
