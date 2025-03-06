import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { originalUrl, customSlug } = await req.json();
    if (!originalUrl || typeof originalUrl !== "string") {
      return NextResponse.json({ error: "Valid original URL is required" }, { status: 400 });
    }

    const session = await getServerSession(AuthOptions);
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("trialSessionId")?.value || nanoid();

    let shortCode = customSlug && session ? customSlug.toLowerCase() : nanoid(8).toLowerCase();

    if (customSlug && session) {
      const existingUrl = await prisma.url.findUnique({ where: { shortCode } });
      const existingTrialUrl = await prisma.trialUrl.findUnique({ where: { shortCode } });
      if (existingUrl || existingTrialUrl) {
        return NextResponse.json({ error: "Custom slug is already taken" }, { status: 409 });
      }
    }

    if (session && session.user) {
      const shortUrl = await prisma.url.create({
        data: {
          originalUrl,
          shortCode,
          userId: session.user.id,
          isActive: true,
          createdAt: new Date(),
        },
      });
      console.log("Created logged-in URL:", shortUrl);
      return NextResponse.json({
        shortUrl: `http://localhost:3000/${shortCode}`,
        url: shortUrl,
        message: "URL shortened successfully",
      }, { status: 200 });
    }

    const trialCount = await prisma.trialUrl.count({ where: { sessionId } });
    if (trialCount >= 5) {
      return NextResponse.json({ error: "Trial limit reached. Please log in." }, { status: 403 });
    }

    const shortUrl = await prisma.trialUrl.create({
      data: {
        originalUrl,
        shortCode,
        sessionId,
        isActive: true,
        createdAt: new Date(),
      },
    });
    console.log("Created trial URL:", shortUrl);
    cookieStore.set("trialSessionId", sessionId, { maxAge: 30 * 24 * 60 * 60 });
    return NextResponse.json({
      shortUrl: `http://localhost:3000/${shortCode}`,
      url: shortUrl,
      message: "URL shortened successfully",
    }, { status: 200 });
  } catch (error: any) {
    console.error("Error in /api/shorten:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}