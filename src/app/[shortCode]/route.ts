import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  try {
    const { shortCode } = await params;
    const normalizedShortCode = shortCode.replace(/\/+$/, "").toLowerCase();
    if (!normalizedShortCode) {
      return NextResponse.json(
        { error: "Short code is required" },
        { status: 400 }
      );
    }
    const loggedInUrl = await prisma.url.findUnique({
      where: { shortCode: normalizedShortCode },
    });
    console.log("Logged-in URL:", loggedInUrl);

    if (loggedInUrl) {
      await prisma.urlVisit.create({
        data: { urlId: loggedInUrl.id, visitedAt: new Date() },
      });
      const redirectUrl = loggedInUrl.originalUrl.startsWith("http")
        ? loggedInUrl.originalUrl
        : `https://${loggedInUrl.originalUrl}`;
      console.log("Redirecting to:", redirectUrl);
      return NextResponse.redirect(redirectUrl);
    }
    const trialUrl = await prisma.trialUrl.findUnique({
      where: { shortCode: normalizedShortCode },
    });
    console.log("Trial URL:", trialUrl);

    if (trialUrl) {
      await prisma.trialUrlVisit.create({
        data: { trialUrlId: trialUrl.id, visitedAt: new Date() },
      });
      const redirectUrl = trialUrl.originalUrl.startsWith("http")
        ? trialUrl.originalUrl
        : `https://${trialUrl.originalUrl}`;
      console.log("Redirecting to:", redirectUrl);
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.json({ error: "URL not found" }, { status: 404 });
  } catch (error) {
    console.error("Error in /[shortCode]:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
