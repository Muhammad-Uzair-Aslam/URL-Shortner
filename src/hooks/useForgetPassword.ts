"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHook";
import { toast } from "react-toastify";
import { forgotPassword } from "@/redux/slices/authSlices";

export function useForgetPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error, resetMessage } = useAppSelector(
    (state) => state.auth
  );
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(forgotPassword({ email: email || "" })).unwrap();
      toast.success("Reset link sent to your email!");
      setEmail("");
    } catch (err: unknown) {
      toast.error(error || "Failed to send reset link");
    }
  };

  return {
    email,
    setEmail,
    loading,
    error,
    resetMessage,
    handleForgotPassword,
  };
}
