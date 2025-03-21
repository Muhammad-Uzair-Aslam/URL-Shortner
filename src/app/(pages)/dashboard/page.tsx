import { History, BarChart2, Settings, Filter } from "lucide-react";
import NotificationLoggedIn from "@/components/notificationLoggedIn/NotificationLoggedIn";
import DashboardTable from "@/components/dashboardTable/DashboardTable";
import AutoPasteClipboard from "@/components/autoPasteClipboard/AutoPasteClipboard";
import CustomSlugInput from "@/components/customSlugInput/CustomSlugInput";
export default function Page() {
  return (
    <div className=" text-white ">
      <div className="bg-[#0B101B]/50 border-gray-800 pb-5">
        <nav className="relative z-10 flex flex-col md:flex-row justify-between items-center p-4">
          <div className="flex items-center justify-between md:hidden mb-16 ">
            <h1 className="absolute top-5 left-5 text-[24px] font-[700] bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Linkly
            </h1>
            <div className="absolute top-5 right-5">
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
      <div className="relative flex bg-[#181E29] justify-center gap-8 text-sm">
  <button className="flex items-center justify-center gap-2 text-white border-b-4 border-[#144EE3] pb-2 py-4 px-2 relative shadow-inner shadow-[#144EE3]/30">
    <History size={16} />
    <span style={{ textShadow: "-17px -15px 13px rgba(40, 100, 255, 0.8)" }}>History</span>
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

<div className="max-w-full bg-[#151A24]/50 min-h-[410px]">
      <main className="relative  max-w-[1250px] mx-auto px-6 py-8 ">
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
    </div>
  );
}