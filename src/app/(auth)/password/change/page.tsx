import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePasswordForm from "@/components/changePasswordForm/ChangePasswordForm";
import CustomText from "@/components/customText/CustomText";
import { THEME_COLORS } from "@/constants/constants";

export default function page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden">
      <div className="z-10 mt-5">
        <ToastContainer />
        <h1 className={`text-[25px] font-semibold mb-6 bg-gradient-to-r from-[${THEME_COLORS.PRIMARY_GRADIENT_START}] to-[${THEME_COLORS.PRIMARY_GRADIENT_END}] text-transparent bg-clip-text`}>
          Linkly
        </h1>
      </div>
      <div className="relative z-10 w-full px-4 flex flex-col items-center">
        <CustomText
          title="Change Password"
          description="Enter your old and new password below to change your password."
        />
        <ChangePasswordForm />
      </div>
      <div className={`text-gray-400 text-sm z-10 mb-5`}></div>
    </main>
  );
}