import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getLinkBySlug } from "@/data/links";

export async function GET(
  request: Request,
   {params} :{params: Promise<{ slug: string } >}
) {
  const { slug } = await params;
  console.log("Received request for slug:", slug);
  // look up the link by short code (slug)
  const link = await getLinkBySlug(slug);

  if (!link) {
    // not found -> return 404
    return new NextResponse("Link not found", { status: 404 });
  }

  // ensure stored URL is valid
  try {
    // this will throw if the string is not a valid URL
    new URL(link.originalUrl);
  } catch (err) {
    // malformed URL stored in database
    return new NextResponse("Invalid target URL", { status: 400 });
  }

  // redirect to the original URL
  return NextResponse.redirect(link.originalUrl,301);
}
