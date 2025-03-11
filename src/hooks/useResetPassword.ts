"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHook/reduxHook";
import { resetPassword } from "@/redux/slices/authSlices";
import { toast } from "react-toastify";

export function useResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error, resetMessage } = useAppSelector(
    (state) => state.auth
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || "";

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await dispatch(
        resetPassword({ token, newPassword: newPassword || "" })
      ).unwrap();
      toast.success("Password reset successful! Please log in.");
      router.push("/signin");
    } catch (err: unknown) {
      toast.error(error || "Failed to reset password");
    }
  };

  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    resetMessage,
    handleResetPassword,
  };
}
