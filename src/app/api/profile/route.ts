import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const { email, name } = await req.json();
  const session = await getServerSession(AuthOptions);
  if (!session || !session.user || session.user.email !== email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { name: name },
  });
  return NextResponse.json({ message: "Profile updated Successfully" });
}