import Link from "next/link";
import CustomText from "@/components/customText/CustomText";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SignUpForm from "@/components/signUpForm/SignUpForm";
import { THEME_COLORS } from "@/constants/constants";

export default function Page() {
  return (
    <main className="min-h-screen  flex flex-col items-center justify-between relative overflow-hidden">
      <div className="z-10 mt-5">
        <ToastContainer />
        <h1 className={`text-[25px] font-semibold mb-6 bg-gradient-to-r from-[${THEME_COLORS.PRIMARY_GRADIENT_START}] to-[${THEME_COLORS.PRIMARY_GRADIENT_END}] text-transparent bg-clip-text`}>
          Linkly
        </h1>
      </div>
      <div className="relative z-10 w-full px-4 flex flex-col items-center">
        <CustomText
          title="Shorten Your Loooong Links :)"
          description="Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience."
        />
        <SignUpForm />
      </div>
      <div className={`text-gray-400 text-sm z-10 mb-5`}>
        <Link href="/signin" className={`text-blue-500 hover:underline`}>
          Sign In
        </Link>{" "}
        if already registered
      </div>
    </main>
  );
}