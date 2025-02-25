import React from 'react'

export default function CustomText() {
  return (
    <div>
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

        <p className="text-gray-400 text-center mx-auto max-w-[560px] my-5">
          Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.
        </p>
    </div>
  )
}
