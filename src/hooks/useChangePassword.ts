"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHook";
import { toast } from "react-toastify";
import { changePassword } from "@/redux/slices/authSlices";

export function useChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, resetMessage } = useAppSelector(
    (state) => state.auth
  );
  const { data: session, status } = useSession();

  const resetHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await dispatch(
        changePassword({
          email: session?.user?.email || "",
          oldPassword: oldPassword || "",
          newPassword: newPassword || "",
        })
      ).unwrap();
      toast.success(resetMessage || "Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch  {
      toast.error(error || "Failed to change password");
    }
  };

  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    loading,
    error,
    resetMessage,
    status,
    session,
    router,
    resetHandler,
  };
}
