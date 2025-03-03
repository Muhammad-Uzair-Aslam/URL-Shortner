
import CustomText from '@/components/customText/CustomText'
import ProfileForm from '@/components/profileForm/ProfileForm'
import Link from 'next/link'
import React from 'react'
import { ToastContainer } from 'react-toastify'

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
            <ProfileForm />
          </div>
          <div></div>
        </main>
      )
}

