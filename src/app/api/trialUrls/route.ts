import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("trialSessionId")?.value;
    if (!sessionId) {
      return NextResponse.json([]);
    }
    const urls = await prisma.trialUrl.findMany({
      where: { sessionId },
      include: { visits: true },
    });
    return NextResponse.json(urls);
  } catch  {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
