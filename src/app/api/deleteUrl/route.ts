import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(req: Request) {
  let body;
  try {
    body = await req.json();
    const { id } = body;
    const session = await getServerSession(AuthOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { message: "Invalid or missing URL ID" },
        { status: 400 }
      );
    }
    const [deletedVisits, deletedUrl] = await prisma.$transaction([
      prisma.urlVisit.deleteMany({
        where: { urlId: id },
      }),
      prisma.url.delete({
        where: { id },
      }),
    ]);

    return NextResponse.json(
      {
        message: "URL and its visits deleted successfully",
        url: deletedUrl,
        deletedVisitCount: deletedVisits.count,
      },
      { status: 200 }
    );
  } catch (_error: any) {
    if (_error.code === "P2025") {
      return NextResponse.json(
        { message: "URL not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "An error occurred while deleting the URL",
        error: _error.message || "Unknown server error",
      },
      { status: 500 }
    );
  }
}