import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

prisma.$connect()
  .then(() => console.log("Prisma connected successfully"))
  .catch((err) => console.error("Prisma connection error:", err));