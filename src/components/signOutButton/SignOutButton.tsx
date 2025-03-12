"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { signoutProp } from "@/types/types";
export default function SignOutButton({ className }: signoutProp) {
  return (
    <button onClick={() => signOut()} className={className}>
      Logout
    </button>
  );
}
