import React from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPasswordForm from "@/components/forgetPasswordForm/ForgetPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-[#0B101B] flex flex-col items-center justify-between relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('../assets/images/Swirl.png')`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('../assets/images/Cubes.png')`,
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
        <div className="w-full max-w-md">
          <h2 className="text-4xl lg:text-[50px] font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-[#144EE3] to-[#EB568E] text-transparent bg-clip-text">
              For
            </span>
            <span className="bg-gradient-to-r from-[#EB568E] to-[#A353AA] text-transparent bg-clip-text">
              get{" "}
            </span>
            <span className="bg-gradient-to-r from-[#A353AA] to-[#144EE3] text-transparent bg-clip-text">
              password{" "}
            </span>
            <span className="text-[#144EE3]"></span>
          </h2>
          <p className="text-gray-400 mb-6 text-center">
            Enter your email address and we’ll send you a link to reset your
            password.
          </p>
        </div>
        <ForgetPasswordForm/>
      </div>
      <div className="text-gray-400 text-sm z-10 mb-5">
        <Link href="/signin" className="text-[#0066FF] hover:underline">
          Back to Login
        </Link>
      </div>
    </main>
  );
}
