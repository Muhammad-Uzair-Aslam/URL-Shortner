import Link from "next/link";
import InputField from "../components/customInput/CustomInput";
export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B101B] flex flex-col items-center justify-around relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-[#1A1A2E]/20 -right-[300px] -top-[300px]" />
        <div className="absolute w-[800px] h-[800px] rounded-full bg-[#1A1A2E]/20 -left-[300px] -bottom-[300px]" />
        <div className="absolute h-screen w-full">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 0%, #0A0A0F 70%)",
            }}
          />
        </div>
      </div>
      <div className="z-10">
      <h1 className="text-[25px]  font-semibold mb-6 bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text">
          Linkly
        </h1>
        </div>
      <div className="relative z-10 w-full px-4 flex flex-col items-center">
        
        <h2 className="text-4xl lg:text-[50px] font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-[#144EE3] to-[#EB568E] text-transparent bg-clip-text">
            Shorten{" "}
          </span>
          <span className="bg-gradient-to-r from-[#EB568E] to-[#A353AA] text-transparent bg-clip-text">
            Your Loooong{" "}
          </span>
          <span className="bg-gradient-to-r from-[#A353AA] to-[#144EE3] text-transparent bg-clip-text">
            Links{" "}
          </span>
          <span className="text-[#144EE3]">:)</span>
        </h2>

        <p className="text-gray-400 text-center  max-w-[560] my-5 ">
          Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.
        </p>

        <div className="w-full max-w-[560px] space-y-4 flex flex-col items-center justify-center">
          <InputField type="email" placeholder="Email" width="w-full" />
          <InputField type="password" placeholder="Password" width="w-full" />
          <button className="w-[200]  bg-[#0066FF] text-white py-3 rounded-lg hover:bg-[#0052CC] transition-all duration-200 font-medium">
            Register
          </button>
         
        </div>

        {/* Sign In Link */}
        
      </div>
      <div className="text-gray-400 text-sm z-10">
          <Link href="/signup" className="text-[#0066FF] hover:underline">
            Register
          </Link>{" "}
          if not already registered
        </div>
      {/* Dark overlay corners */}
      <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-[#0A0A0F] rotate-45 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-[#0A0A0F] rotate-45 transform translate-x-1/2 translate-y-1/2" />
    </main>
  );
}