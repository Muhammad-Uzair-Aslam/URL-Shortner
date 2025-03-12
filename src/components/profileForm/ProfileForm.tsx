"use client";

import React from "react";
import { Button } from "../button/Button";
import CustomInput from "../customInput/CustomInput";
import { useProfileForm } from "@/hooks/useProfileForm";
import Loader from "../loader/Loader";
import Link from "next/link";

export default function ProfileForm() {
  const { email, name, setName, loading, error, message, updateHandler } = useProfileForm();

  return (
    <form
      onSubmit={updateHandler}
      className="w-full max-w-[560px] space-y-4 flex flex-col items-center justify-center"
    >
      <CustomInput
        type="email"
        placeholder="Email"
        width="w-full"
        value={email || ""}
        disabled
      />
      <CustomInput
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
        width="w-full"
        value={name || ""}
      />
      {loading && <Loader />}
      {error && <p className={`text-red-500`}>{error}</p>}
      {message && <p className={`text-green-600`}>{message}</p>}
      <Button title="Update Profile" Type="submit" />
      <div>
        <Link href="/password/change">
          <Button title="Change Password" />
        </Link>
      </div>
    </form>
  );
}