import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/email";
export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const resetToken = randomUUID();
  const resetExpiry = new Date(Date.now() + 3600000);
  await prisma.user.update({
    where: { email },
    data: {
      resetToken,
      resetTokenExpiry: resetExpiry,
    },
  });
  const resetLink = `${process.env.NEXTAUTH_URL}/password/reset?token=${resetToken}`;
  await sendEmail(
    email,
    "Password Reset",
    `Click here to reset your password: ${resetLink}`
  );
  return NextResponse.json({ message: "Reset link sent to your email" });
}
