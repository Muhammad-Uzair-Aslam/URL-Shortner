import NextAuth from "next-auth";

declare module "next-auth" {
  type Session ={
    user: {
      id: string;
      name?: string | null;
      email: string; 
      image?: string | null;
    };
  }

  type User ={
    id: string;
    name?: string | null;
    email: string;
  }
}

declare module "next-auth/jwt" {
  type JWT ={
    id: string;
    email: string;
    name?: string | null;
  }
}