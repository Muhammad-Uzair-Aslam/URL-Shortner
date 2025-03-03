import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const AuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required");
        }
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (!user) {
            throw new Error("User not found");
          }
          if(!user?.password){
            throw new Error("User password not set");
          }
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch) {
            throw new Error("Invalid credentials");
          }
          return user;
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
};

const handlers = NextAuth(AuthOptions);

export { handlers as GET, handlers as POST };
