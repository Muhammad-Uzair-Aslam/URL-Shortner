import { History, BarChart2, Settings, Filter } from "lucide-react";
import NotificationLoggedIn from "@/components/notificationLoggedIn/NotificationLoggedIn";
import DashboardTable from "@/components/dashboardTable/DashboardTable";
import AutoPasteClipboard from "@/components/autoPasteClipboard/AutoPasteClipboard";
import CustomSlugInput from "@/components/customSlugInput/CustomSlugInput";
export default function Page() {
  return (
    <div className="min-h-screen text-white">
      <div className="bg-[#0B101B]/50 border-gray-800 pb-5">
        <nav className="relative z-10 flex flex-col md:flex-row justify-between items-center p-4">
          <div className="flex items-center justify-between md:hidden ">
          
            <h1 className="absolute top-5 left-5 text-[24px] font-[700] bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Linkly
            </h1>
          <div className="-mr-64">
            <NotificationLoggedIn />
            </div>
          </div>
          <div className="hidden md:block items-center gap-8 ">
            <h1 className="text-[34px] md:mr-5 lg:mr-10 font-[700] bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Linkly
            </h1>
          </div>
          <CustomSlugInput
            title="Shorten Now"
            placeholder="Enter the link here"
            fetchAction="urls" 
          />
          <div className="my-5 md:my-0 md:ml-5 pt-5 lg:md-10 hidden md:block">
            <NotificationLoggedIn />
          </div>
        </nav>
        <AutoPasteClipboard /> 
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
          <h2 className="text-lg flex items-center gap-2">History</h2>
          <button className="flex items-center gap-2 text-sm text-gray-200 border border-gray-700 bg-[#1A1F2E] px-3 py-1.5 rounded-[25px]">
            <Filter size={16} />
            Filter
          </button>
        </div>
        <DashboardTable />
      </main>
    </div>
  );
}

