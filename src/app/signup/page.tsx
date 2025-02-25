'use client'
import Link from "next/link";
import InputField from "../../components/customInput/CustomInput";
import { Button } from "../../components/button/Button";
import CustomText from "../../components/customText/CustomText";
const SignupButtonHandler=()=>{
   console.log("Signup button clicked")
}
export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B101B] flex flex-col items-center justify-around relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
         backgroundImage: `url('./assets/images/Swirl.png')`, 
         backgroundSize: '100% 100%',
         backgroundRepeat: 'no-repeat',
        }} />
        <div className="absolute inset-0 " style={{
          backgroundImage: `url('./assets/images/Cubes.png')`, 
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: '0.8' 
        }} />
      </div>

      <div className="z-10">
        <h1 className="text-[25px] font-semibold mb-6 bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text">
          Linkly
        </h1>
      </div>

      <div className="relative z-10 w-full px-4 flex flex-col items-center">
        <CustomText/>
        <div className="w-full max-w-[560px] space-y-4 flex flex-col items-center justify-center">
          <InputField type="email" placeholder="Email" width="w-full" />
          <InputField type="text" placeholder="Name" width="w-full" />
          <InputField type="password" placeholder="Password" width="w-full" />
          <InputField
            type="password"
            placeholder="Confirm Password"
            width="w-full"
          />
        <Button title="Register" clickHandler={SignupButtonHandler}/>
        </div>
      </div>
      <div className="text-gray-400 text-sm z-10">
        <Link href="/signin" className="text-[#0066FF] hover:underline">
          Sign In
        </Link>{" "}
        if already registered
      </div>
    </main>
  );
}