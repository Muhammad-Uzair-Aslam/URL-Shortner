import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const { email, oldPassword, newPassword } = await req.json();

  if (!email || !oldPassword || !newPassword) {
    return NextResponse.json(
      { error: "Email, old password, and new password are required" },
      { status: 400 }
    );
  }

  try {
    const session = await getServerSession(AuthOptions);
    if (!session || !session.user || session.user.email !== email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.password) {
      return NextResponse.json(
        { error: "No password set for this user" },
        { status: 400 }
      );
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Incorrect old password" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}