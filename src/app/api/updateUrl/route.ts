import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(req: Request) {
  try {
    const body = await req.json() || {};
    const { id, originalUrl, isActive } = body;

    const session = await getServerSession(AuthOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!id || typeof id !== "string" || !originalUrl || typeof originalUrl !== "string") {
      return NextResponse.json(
        { message: "Invalid or missing URL ID or original URL" },
        { status: 400 }
      );
    }

    const updatedUrl = await prisma.url.update({
      where: { id, userId: session.user.id },
      data: {
        originalUrl,
        isActive: isActive === undefined ? undefined : Boolean(isActive),
      },
      include: { visits: true },
    });

    return NextResponse.json(updatedUrl, { status: 200 });
  } catch (_error: unknown) {
    if (
      typeof _error === "object" &&
      _error !== null &&
      "code" in _error &&
      _error.code === "P2025"
    ) {
      return NextResponse.json({ message: "URL not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "An error occurred while updating the URL",
        error: _error instanceof Error ? _error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
