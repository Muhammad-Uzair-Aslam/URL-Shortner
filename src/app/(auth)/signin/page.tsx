import Link from "next/link";
import CustomText from "@/components/customText/CustomText";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignInForm from "@/components/signInForm/SignInForm";
import React from "react";
export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B101B] flex flex-col items-center justify-between relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('./assets/images/Swirl.png')`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="absolute inset-0 "
          style={{
            backgroundImage: `url('./assets/images/Cubes.png')`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: "0.8",
          }}
        />
      </div>
      <div className="z-10 mt-5">
        <ToastContainer />
        <h1 className="text-[25px] font-semibold mb-6 bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text">
          Linkly
        </h1>
      </div>
      <div className="relative z-10 w-full px-4 flex flex-col items-center">
        <CustomText />
        <SignInForm />
      </div>
      <div className="text-gray-400 text-sm z-10 mb-5">
        <Link href="/signup" className="text-[#0066FF] hover:underline">
          Register
        </Link>{" "}
        if not already registered
      </div>
    </main>
  );
}
