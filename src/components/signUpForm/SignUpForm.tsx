"use client";

import React from "react";
import { useSignUpForm } from "@/hooks/useSignupForm";
import CustomInput from "../customInput/CustomInput";
import { Button } from "../button/Button";
import Loader from "../loader/Loader";

export default function SignUpForm() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    SignupButtonHandler,
  } = useSignUpForm();

  return (
    <form
      onSubmit={SignupButtonHandler}
      className="w-full max-w-[560px] space-y-4 flex flex-col items-center justify-center"
    >
      <CustomInput
        value={email || ""}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        width="w-full"
      />
      <CustomInput
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
        width="w-full"
      />
      <CustomInput
        value={password || ""}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        width="w-full"
      />
      <CustomInput
        value={confirmPassword || ""}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        placeholder="Confirm Password"
        width="w-full"
      />
      {loading && <Loader />}
      {error && <div className="text-red-600">{error}</div>}
      <Button title="Register" Type="submit" />
    </form>
  );
}
