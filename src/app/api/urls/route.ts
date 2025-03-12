import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(AuthOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const urls = await prisma.url.findMany({
      where: { userId: session.user.id },
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
