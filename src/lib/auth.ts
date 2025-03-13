import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
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
        const user = await prisma?.user?.findUnique({
          where: { email: credentials?.email },
        });
        if (!user || !user.password) {
          throw new Error("User not found or no password set");
        }
        const passwordMatch = await bcrypt.compare(credentials?.password, user?.password);
        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }
        console.log("Authorize success, returning user:", user);
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      console.log("Session callback - token:", token, "session:", session);
      if (token?.email && session?.user) {
        const user = await prisma?.user?.findUnique({
          where: { email: token?.email },
        });
        if (user) {
          session.user.name = user.name;
          session.user.email = user.email;
          session.user.id = user.id;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async redirect({baseUrl}) {
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/signin",
  },
};