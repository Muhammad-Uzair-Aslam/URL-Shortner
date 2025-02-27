"use client";
import { SessionProvider } from "next-auth/react";
import React, { useEffect } from "react";

export default function NextAuthSessionProvider({ children }: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    console.log("SessionProvider initialized");
  }, []);
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
