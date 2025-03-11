"use client";

import React from "react";
import { useSignInForm } from "@/hooks/useSigninForm";
import CustomInput from "../customInput/CustomInput";
import { Button } from "../button/Button";
import Loader from "../loader/Loader";
import Link from "next/link";

export default function SignInForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    LoginButtonHandler,
  } = useSignInForm();

  return (
    <form
      onSubmit={LoginButtonHandler}
      className="w-full max-w-[560px] space-y-4 flex flex-col items-center justify-center"
    >
      <CustomInput
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        width="w-full"
        value={email || ""}
      />
      <CustomInput
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        width="w-full"
        value={password || ""}
      />
      {error && <p className="text-red-500">{error}</p>}
      {loading && <Loader />}
      <Button title="Login" Type="submit" />
      <div className="text-gray-400 text-sm z-10 mb-5">
        <Link
          href="/password/forget"
          className="text-[#0066FF] hover:underline"
        >
          Forgot your password?
        </Link>{" "}
        Reset it here.
      </div>
    </form>
  );
}
