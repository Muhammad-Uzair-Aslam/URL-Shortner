import React from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { FaCopy, FaLink, FaLinkSlash } from "react-icons/fa6";
import { FaVimeo, FaYoutube } from "react-icons/fa";
import { Edit2 } from 'lucide-react';
const demoData = [
    {
      shortLink: "https://linkly.com/Rx43cQmg",
      originalLink: "https://www.twitter.com/tweets/NewsDhGu",
      platform: "Twitter",
      clicks: "1313",
      status: "Active",
      date: "Oct - 10 2023",
    },
    {
      shortLink: "https://linkly.com/Bx43cQmg",
      originalLink: "https://www.youtube.com/watch?v=8J72HmH6UA",
      platform: "Youtube",
      clicks: "4313",
      status: "Inactive",
      date: "Oct - 08 2023",
    },
    {
      shortLink: "https://linkly.com/Ax43cQmg",
      originalLink: "https://www.advertisementsmarket.com/",
      platform: "Chrome",
      clicks: "1013",
      status: "Active",
      date: "Oct - 01 2023",
    },
  ];
export default function DashboardTable() {
  return (
    <div className="bg-[#0B101B] overflow-x-auto rounded-lg overflow-hidden">
    <table className="w-full">
      <thead className="bg-[#0D1117]">
        <tr className="text-[#C9CED6] text-left text-[15px] font-[700] border-b border-gray-800">
          <th className="p-4">Short Link</th>
          <th className="p-4">Original Link</th>
          <th className="p-4">QR Code</th>
          <th className="p-4">Clicks</th>
          <th className="p-4">Status</th>
          <th className="p-4">Date</th>
          <th className="p-4">Action</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {demoData.map((item, index) => (
          <tr key={index} className="border-b bg-[#1A2333] border-gray-800">
            <td className="p-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-300">{item.shortLink}</span>
                <div className="p-3 bg-gray-800 hover:bg-gray-900 rounded-[20px]">
                <FaCopy />
                </div>
              </div>
            </td>
            <td className="p-4">
              <div className="flex items-center gap-2 max-w-xs truncate">
                {item.platform === "Twitter" && (
                  <div className="w-7 h-7 bg-blue-400 rounded-full flex items-center justify-center">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                  </div>
                )}
                {item.platform==="Youtube" && <div className=""><FaYoutube size={25} color="red"/></div> }
                {item.platform==="Chrome" && <div className=""><FaVimeo size={25} color=""/></div> }

                <span className="text-gray-400">{item.originalLink}</span>
              </div>
            </td>
            <td className="p-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <div className="w-6 h-6 bg-black" />
              </div>
            </td>
            <td className="p-4 text-gray-300">{item.clicks}</td>
            <td className="p-4">
              <span
                className={`flex justify-center items-center px-2 py-1 rounded-full text-[14px] ${
                  item.status === "Active"
                    ? "text-[#1EB036]"
                    : "text-[#B0901E]"
                }`}
              >
                {item.status}
                {item.status==="Active"?<div className="mx-2 p-3 rounded-[20px] bg-[#1EB03624] text-white">
                   <FaLink/>
                </div>:<div className="mx-2 p-3 rounded-[20px] bg-[#B0901E30]">
                  <FaLinkSlash/>
                  </div>}
              </span>
            </td>
            <td className="p-4 text-gray-400">{item.date}</td>
            <td className="p-4">
              <div className="flex gap-2">
                <button className="p-3  bg-gray-800 rounded-[20px] hover:bg-gray-700">
                  <Edit2 size={14} />
                </button>
                <button className="p-3 bg-gray-800 rounded-[20px] hover:bg-gray-700">
                <AiOutlineDelete />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
