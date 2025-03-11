"use client";

import React from "react";
import { Button } from "../button/Button";
import CustomInput from "../customInput/CustomInput";
import { useForgetPassword } from "@/hooks/useForgetPassword";
import Loader from "../loader/Loader";

export default function ForgetPasswordForm() {
  const {
    email,
    setEmail,
    loading,
    error,
    resetMessage,
    handleForgotPassword,
  } = useForgetPassword();

  return (
    <form
      onSubmit={handleForgotPassword}
      className="w-full max-w-[560px] space-y-4 flex flex-col items-center justify-center"
    >
      <CustomInput
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        width="w-full"
        value={email || ""}
      />
      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      {resetMessage && <p className="text-green-500">{resetMessage}</p>}
      <Button title="Reset Password" Type="submit" />
    </form>
  );
}
