"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../button/Button";
import CustomInput from "../customInput/CustomInput";
import { useSession } from "next-auth/react";

export default function ProfileForm() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    setEmail(session?.user?.email ?? "");
    setName(session?.user?.name ?? "");
  }, [session]);

  const updateHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated values:", { email, name });
  };
  return (
    <form
      onSubmit={updateHandler}
      className="w-full max-w-[560px] space-y-4 flex flex-col items-center justify-center"
    >
      <CustomInput
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        value={email}
        width="w-full"
      />
      <CustomInput
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
        width="w-full"
        value={name}
      />
      <Button title="Update Profile" Type="submit" />
    </form>
  );
}
