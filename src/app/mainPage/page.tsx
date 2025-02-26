import {
  
  History,
  BarChart2,
  Settings,
  Filter,
  Edit2,
} from "lucide-react";
import CustomSlugInput from "../../components/customSlugInput/CustomSlugInput";
import NotificationLoggedIn from "../../components/notificationLoggedIn/NotificationLoggedIn";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCopy, FaLink, FaLinkSlash } from "react-icons/fa6";
import { FaVimeo, FaYoutube } from "react-icons/fa";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Dashboard() {
  const session=await auth()
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

  return (
    <div className="min-h-screen bg-[#151A24] text-white">
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
      <div className="bg-[#0B101B]/50 border-gray-800  pb-5">
      <nav className="relative z-10 flex flex-col   md:flex-row justify-between items-center p-4  ">
        <div className="flex items-center gap-8">
          <h1 className="text-[34px] md:mr-5 lg:mr-10 font-[700] bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Linkly
          </h1>
        </div>
          {/* <CustomSlugInput placeholder="Enter the link here" clickHandler={()=>{}} title="Shorten Now" />  */}
          <div className="my-5 md:my-0 md:ml-5 lg:md-10">
          {session?.user?(        <NotificationLoggedIn/>
):<Link href={''}>logout</Link>}
        <NotificationLoggedIn/>
        </div>
      </nav>
  <div className="relative z-10 flex justify-center">
  <label className="flex items-center gap-2 text-sm text-gray-400">
    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800 border border-gray-700">
      <input
        type="checkbox"
        className="sr-only peer"
      />
      <span className="absolute inset-y-1 left-1 w-4 h-4 rounded-full bg-gray-600 peer-checked:bg-[#144EE3] peer-checked:left-7 transition-all duration-200"></span>
    </div>
    Auto Paste to Clipboard
  </label>
</div>
      </div>
      <div className="relative z-10 flex bg-[#181E29] justify-center gap-8 py-3 text-sm shadow-md">
        <button className="flex items-center gap-2 text-blue-500 border-b-2 border-blue-500 pb-2">
          <History size={16} />
          History
        </button>
        <button className="flex items-center gap-2 text-gray-200 hover:text-gray-300">
          <BarChart2 size={16} />
          Statistics
        </button>
        <button className="flex items-center gap-2 text-gray-200 hover:text-gray-300">
          <Settings size={16} />
          Settings
        </button>
      </div>
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg flex items-center gap-2">
            History <span className="text-sm text-gray-200">(143)</span>
          </h2>
          <button className="flex items-center gap-2 text-sm text-gray-200 border border-gray-700 bg-[#1A1F2E] px-3 py-1.5 rounded-[25]">
            <Filter size={16} />
            Filter
          </button>
        </div>

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
                      <div className="p-3 bg-gray-800 hover:bg-gray-900 rounded-[20]">
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
                      {item.status==="Active"?<div className="mx-2 p-3 rounded-[20] bg-[#1EB03624] text-white">
                         <FaLink/>
                      </div>:<div className="mx-2 p-3 rounded-[20] bg-[#B0901E30]">
                        <FaLinkSlash/>
                        </div>}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{item.date}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-3  bg-gray-800 rounded-[20] hover:bg-gray-700">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-3 bg-gray-800 rounded-[20] hover:bg-gray-700">
                      <AiOutlineDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
