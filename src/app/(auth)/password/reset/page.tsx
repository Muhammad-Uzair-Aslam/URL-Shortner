import CustomText from "@/components/customText/CustomText";
import ResetPasswordForm from "@/components/resetPasswordForm/ResetPasswordForm";
import { ToastContainer } from "react-toastify";
import { THEME_COLORS } from "@/constants/constants";
import { Suspense } from "react";

export default function ResetPasswordPage() {
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
          title="Reset your password"
          description="Enter your new password below to reset your password."
        />
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
      <div className={`text-gray-400 text-sm z-10 mb-5`}></div>
    </main>
  );
}