"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import {  Twitter, Youtube, Chrome, Image } from "lucide-react";
import { CiLogin } from "react-icons/ci";
import { Button } from "@/components/button/Button";
import CustomText from "@/components/customText/CustomText";
import CustomSlugInput from "@/components/customSlugInput/CustomSlugInput";
import Link from "next/link";
import { FaCopy, FaLink, FaLinkSlash } from "react-icons/fa6";
import { Router } from "next/router";
// import Link from 'next/link';
export default function Dashboard() {
const router=useRouter()
  const demoData = [
    {
      shortLink: "https://linkly.com/Rx43cQmg",
      originalLink: "https://www.twitter.com/tweets/NewGuDhal",
      platform: "Twitter",
      clicks: "1313",
      status: "Active",
      date: "Oct - 10 2023",
    },
    {
      shortLink: "https://linkly.com/Bx43cQmg",
      originalLink: "https://www.youtube.com/watch?v=BJ72HmHOUA",
      platform: "Youtube",
      clicks: "4513",
      status: "Inactive",
      date: "Oct - 06 2023",
    },
    {
      shortLink: "https://linkly.com/Ax43cQmg",
      originalLink: "https://www.adobe.com/sensei/services.com/",
      platform: "Chrome",
      clicks: "1813",
      status: "Active",
      date: "Oct - 01 2023",
    },
    {
      shortLink: "https://linkly.com/Bx43cQmg",
      originalLink: "https://vimeo.com/823257654",
      platform: "Vimeo",
      clicks: "1313",
      status: "Active",
      date: "Sep - 20 2023",
    },
    {
      shortLink: "https://linkly.com/Px43cQmg",
      originalLink: "https://unsplash.com/photos/2K8HwDzFWG",
      platform: "Image",
      clicks: "1423",
      status: "Active",
      date: "Sep - 18 2023",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B101B] text-white">
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
      <nav className="relative z-10 flex justify-between items-center p-6">
        <h1 className="text-[34px] font-[700] text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          Linkly
        </h1>
        <div className="flex gap-4">
          <button className="px-6 bg-[#181E29] rounded-[25px] py-2 flex text-[15px] items-center gap-2 text-gray-300 hover:text-white">
            {" "}
            <Link href={'./signin'}>Login</Link>
             <CiLogin size={25} color="white" />
          </button>
          <div className='hidden md:block'>
          <Button clickHandler={() => {router.push('./signup')}} title="Register Now" />{" "}
          </div>
        </div>
      </nav>
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <CustomText />
        <div className="max-w-xl mx-auto mb-12">
          <CustomSlugInput
            title="Shorten Now!"
            placeholder="Enter the link here"
            clickHandler={() => {}}
          />
          <div className="relative z-10 flex justify-center my-4">
            <label className="flex items-center gap-2 text-sm text-gray-400">
              <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800 border border-gray-700">
                <input type="checkbox" className="sr-only peer" />
                <span className="absolute inset-y-1 left-1 w-4 h-4 rounded-full bg-gray-600 peer-checked:bg-[#144EE3] peer-checked:left-7 transition-all duration-200"></span>
              </div>
              Auto Paste to Clipboard
            </label>
          </div>
          <div className="text-sm text-gray-400 mt-4 text-center">
            You can create <span className="text-pink-500">05</span> more links.{" "}
            <Link href="./signup" className="text-blue-500">
              Register Now
            </Link>{" "}
            to enjoy Unlimited usage <span className="text-gray-500">ⓘ</span>
          </div>
        </div>
        <div className="overflow-x-auto ">
          <table className="w-full">
            <thead>
              <tr className="text-gray-200 text-left bg-[#181E29]">
                <th className="p-4">Short Link</th>
                <th className="p-4">Original Link</th>
                <th className="p-4">QR Code</th>
                <th className="p-4">Clicks</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {demoData.map((item, index) => (
                <tr
                  key={index}
                  className=" bg-[#181E29] border-t border-gray-800"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {item.shortLink}
                      <div className="p-3 bg-gray-800 hover:bg-gray-900 rounded-[20]">
                        <FaCopy />
                      </div>{" "}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {item.platform === "Twitter" && (
                        <Twitter className="text-blue-400" size={20} />
                      )}
                      {item.platform === "Youtube" && (
                        <Youtube className="text-red-500" size={20} />
                      )}
                      {item.platform === "Chrome" && (
                        <Chrome className="text-blue-500" size={20} />
                      )}
                      {item.platform === "Image" && (
                        <Image className="text-purple-500" size={20} />
                      )}
                      <span className="truncate max-w-xs">
                        {item.originalLink}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <div className="w-6 h-6 bg-black" />
                    </div>
                  </td>
                  <td className="p-4">{item.clicks}</td>
                  <td className="p-4">
                    <span
                      className={`flex justify-center items-center px-2 py-1 rounded-full text-[14px] ${
                        item.status === "Active"
                          ? "text-[#1EB036]"
                          : "text-[#B0901E]"
                      }`}
                    >
                      {item.status}
                      {item.status === "Active" ? (
                        <div className="mx-2 p-3 rounded-[20] bg-[#1EB03624] text-white">
                          <FaLink />
                        </div>
                      ) : (
                        <div className="mx-2 p-3 rounded-[20] bg-[#B0901E30]">
                          <FaLinkSlash />
                        </div>
                      )}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
