import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug")?.toLowerCase();

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const existingUrl = await prisma.url.findUnique({
      where: { shortCode: slug },
    });
    const existingTrialUrl = await prisma.trialUrl.findUnique({
      where: { shortCode: slug },
    });

    const isAvailable = !existingUrl && !existingTrialUrl;
    return NextResponse.json({ isAvailable }, { status: 200 });
  } catch  {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
