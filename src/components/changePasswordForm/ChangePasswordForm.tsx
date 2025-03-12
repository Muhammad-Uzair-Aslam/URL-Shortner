"use client";

import React from "react";
import { Button } from "../button/Button";
import CustomInput from "../customInput/CustomInput";
import { useChangePassword } from "@/hooks/useChangePassword";
import Loader from "../loader/Loader";

export default function ChangePasswordForm() {
  const {
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
    router,
    resetHandler,
  } = useChangePassword();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") {
    router.push("/signin");
    return null;
  }

  return (
    <form
      onSubmit={resetHandler}
      className="w-full max-w-[560px] space-y-4 flex flex-col items-center justify-center"
    >
      <CustomInput
        onChange={(e) => setOldPassword(e.target.value)}
        type="password"
        placeholder="Old Password"
        width="w-full"
        value={oldPassword || ""}
      />
      <CustomInput
        onChange={(e) => setNewPassword(e.target.value)}
        type="password"
        placeholder="New Password"
        width="w-full"
        value={newPassword || ""}
      />
      <CustomInput
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        type="password"
        placeholder="Confirm Password"
        width="w-full"
        value={confirmNewPassword || ""}
      />
      {loading && <Loader />}
      {error && <p className={`text-red-500`}>{error}</p>}
      {resetMessage && <p className={`text-green-600`}>{resetMessage}</p>}
      <Button title="Change Password" Type="submit" />
    </form>
  );
}