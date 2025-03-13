import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  try {
    const shortCode = (await params).shortCode;
    const normalizedShortCode = shortCode.replace(/\/+$/, "").toLowerCase();
    const cookieName = `visited_${normalizedShortCode}`;

    if (!normalizedShortCode) {
      return NextResponse.json(
        { error: "Short code is required" },
        { status: 400 }
      );
    }
    if (request.cookies.has(cookieName)) {
      return handleExistingCookie(normalizedShortCode);
    }
    return handleNewVisit(normalizedShortCode, cookieName, request);

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

async function handleExistingCookie(shortCode: string) {
  const target = await findExistingUrl(shortCode);
  return target 
    ? NextResponse.redirect(target.originalUrl, 307)
    : NextResponse.json({ error: "URL not found" }, { status: 404 });
}

async function handleNewVisit(shortCode: string, cookieName: string, request: NextRequest) {
  const urlRecord = await findExistingUrl(shortCode);

  if (!urlRecord) {
    return NextResponse.json({ error: "URL not found" }, { status: 404 });
  }
  await recordVisit(urlRecord);
  const response = NextResponse.redirect(
    formatUrl(urlRecord.originalUrl),
    307 
  );
  response.cookies.set({
    name: cookieName,
    value: "true",
    maxAge: 86400, 
    path: "/",
    secure: true,
    sameSite: "lax",
    httpOnly: true
  });

  return response;
}

async function findExistingUrl(shortCode: string) {
  return await prisma.url.findUnique({ where: { shortCode } }) || 
         await prisma.trialUrl.findUnique({ where: { shortCode } });
}

async function recordVisit(urlRecord: any) {
  if (urlRecord.trialUrlId) {
    await prisma.trialUrlVisit.create({
      data: { trialUrlId: urlRecord.id, visitedAt: new Date() },
    });
  } else {
    await prisma.urlVisit.create({
      data: { urlId: urlRecord.id, visitedAt: new Date() },
    });
  }
}

function formatUrl(originalUrl: string) {
  try {
    new URL(originalUrl);
    return originalUrl;
  } catch {
    return `https://${originalUrl}`;
  }
}