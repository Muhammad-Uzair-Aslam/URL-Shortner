import React from 'react'
import { FaCopy, FaLink, FaLinkSlash } from "react-icons/fa6";
import {  Twitter, Youtube, Chrome, Image } from "lucide-react";

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
export default function TrialTable() {
  return (
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
                      <div className="p-3 bg-gray-800 hover:bg-gray-900 rounded-[20px]">
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
                        <div className="mx-2 p-3 rounded-[20px] bg-[#1EB03624] text-white">
                          <FaLink />
                        </div>
                      ) : (
                        <div className="mx-2 p-3 rounded-[20px] bg-[#B0901E30]">
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
        </div>  )
}
