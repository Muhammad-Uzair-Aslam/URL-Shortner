"use client";
import { SessionProvider } from "next-auth/react";
import React, { useEffect } from "react";

export default function NextAuthSessionProvider({ children }: {
  children: React.ReactNode;
}) {
  // useEffect(() => {
  // }, []);
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
