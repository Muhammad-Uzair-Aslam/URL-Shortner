import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const userExist = await prisma.user.findUnique({
      where: { email },
    });
    if (userExist) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return NextResponse.json(
      { user, message: "User Registered Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user" },
      { status: 500 }
    );
  }
}
