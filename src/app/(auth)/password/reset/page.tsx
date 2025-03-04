import ResetPasswordForm from "@/components/resetPasswordForm/ResetPasswordForm";
import { ToastContainer } from "react-toastify";

export default function ResetPasswordPage() {
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
          className="absolute inset-0 "
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
          <h2 className="text-4xl lg:text-[50px] font-bold text-center mb-2 bg-custom-gradient text-transparent bg-clip-text leading-[1.2] p-2 tracking-normal">
            Reset your password
          </h2>
          <p className="text-gray-400 mb-6 text-center">
            Enter your new password below to reset your password.
          </p>
        <ResetPasswordForm />
      </div>
      <div className="text-gray-400 text-sm z-10 mb-5"></div>
    </main>
  );
}
