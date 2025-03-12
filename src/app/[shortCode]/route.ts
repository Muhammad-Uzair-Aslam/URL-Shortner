import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  try {
    if (!params?.shortCode) {
      return NextResponse.json(
        { error: "Short code is required" },
        { status: 400 }
      );
    }

    const normalizedShortCode = params.shortCode.replace(/\/+$/, "").toLowerCase();

    const loggedInUrl = await prisma.url.findUnique({
      where: { shortCode: normalizedShortCode },
    });

    if (loggedInUrl) {
      await prisma.urlVisit.create({
        data: { urlId: loggedInUrl.id, visitedAt: new Date() },
      });
      const redirectUrl = loggedInUrl.originalUrl.startsWith("http")
        ? loggedInUrl.originalUrl
        : `https://${loggedInUrl.originalUrl}`;
      return NextResponse.redirect(redirectUrl);
    }

    const trialUrl = await prisma.trialUrl.findUnique({
      where: { shortCode: normalizedShortCode },
    });

    if (trialUrl) {
      await prisma.trialUrlVisit.create({
        data: { trialUrlId: trialUrl.id, visitedAt: new Date() },
      });
      const redirectUrl = trialUrl.originalUrl.startsWith("http")
        ? trialUrl.originalUrl
        : `https://${trialUrl.originalUrl}`;
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.json({ error: "URL not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error },
      { status: 500 }
    );
  }
}
