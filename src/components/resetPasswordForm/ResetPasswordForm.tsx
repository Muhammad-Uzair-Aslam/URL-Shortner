'use client'
import React from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHook/ReduxHook";
import { resetPassword } from "@/redux/slices/authSlices";
import { toast } from "react-toastify";
import CustomInput from "@/components/customInput/CustomInput";
import { Button } from "@/components/button/Button";
import Loader from "@/components/loader/Loader";

export default function ResetPasswordForm() {
    const [newPassword, setNewPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const dispatch = useAppDispatch();
      const { loading, error, resetMessage } = useAppSelector((state) => state.auth);
      const router = useRouter();
      const searchParams = useSearchParams();
      const token = searchParams.get("token");
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
          await dispatch(resetPassword({ token, newPassword })).unwrap();
          toast.success("Password reset successful! Please log in.");
          router.push("/signin");
        } catch (err) {
          toast.error(error || "Failed to reset password");
        }
      };
  return (
    <form
    onSubmit={handleResetPassword}
    className="w-full max-w-[560px] space-y-4 flex flex-col items-center"
  >
        <CustomInput
      type="password"
      placeholder="New Password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      width="w-full"
    />
    <CustomInput
      type="password"
      placeholder="Confirm New Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      width="w-full"
    />
    {loading && <Loader />}
    {error && <p className="text-red-500">{error}</p>}
    {resetMessage && <p className="text-green-500">{resetMessage}</p>}
    <Button title="Reset Password" Type="submit"  />
  </form>  )
}
