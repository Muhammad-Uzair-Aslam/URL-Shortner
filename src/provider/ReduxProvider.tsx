// components/ReduxProvider.tsx
"use client";
import { Provider } from "react-redux";
import { makeStore } from "@/redux/store";
import { useRef } from "react";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}