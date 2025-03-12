import CustomText from "@/components/customText/CustomText";
import ProfileForm from "@/components/profileForm/ProfileForm";
import React from "react";
import { ToastContainer } from "react-toastify";
import { THEME_COLORS } from "@/constants/constants";

export default function Page() {
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
          title="Update your profile"
          description="Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience."
        />
        <ProfileForm />
      </div>
      <div></div>
    </main>
  );
}