import { NextResponse } from "next/server";
import { getAuthUserId } from "@/models/auth";
import { getUserLinks } from "@/data/links";

export async function GET() {
  const userId = await getAuthUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userLinks = await getUserLinks(userId);
    return NextResponse.json(userLinks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 },
    );
  }
}
