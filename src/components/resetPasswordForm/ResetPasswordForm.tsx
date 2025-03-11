"use client";

import React from "react";
import { useResetPassword } from "@/hooks/useResetPassword";
import CustomInput from "@/components/customInput/CustomInput";
import { Button } from "@/components/button/Button";
import Loader from "@/components/loader/Loader";

export default function ResetPasswordForm() {
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    resetMessage,
    handleResetPassword,
  } = useResetPassword();

  return (
    <form
      onSubmit={handleResetPassword}
      className="w-full max-w-[560px] space-y-4 flex flex-col items-center"
    >
      <CustomInput
        type="password"
        placeholder="New Password"
        value={newPassword || ""}
        onChange={(e) => setNewPassword(e.target.value)}
        width="w-full"
      />
      <CustomInput
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword || ""}
        onChange={(e) => setConfirmPassword(e.target.value)}
        width="w-full"
      />
      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      {resetMessage && <p className="text-green-500">{resetMessage}</p>}
      <Button title="Reset Password" Type="submit" />
    </form>
  );
}
