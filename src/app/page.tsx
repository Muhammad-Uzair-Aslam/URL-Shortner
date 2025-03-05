import { CiLogin } from "react-icons/ci";
import CustomText from "@/components/customText/CustomText";
import CustomSlugInput from "@/components/customSlugInput/CustomSlugInput";
import Link from "next/link";
import TrialTable from '@/components/trialTable/TrialTable';
import AutoPasteClipboard from '@/components/autoPasteClipboard/AutoPasteClipboard';
export default function Page() {
  
  return (
    <div className="min-h-screen  text-white">
      
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
          <button className='px-7 py-3 rounded-[30px] bg-[#0066FF]'><Link href='./signup'>Register Now</Link></button>{" "}
          </div>
        </div>
      </nav>
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <CustomText title="Shorten Your Loooong Links :)" description="Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience."/>
        <div className="max-w-xl mx-auto mb-12">
          <CustomSlugInput
            title="Shorten Now!"
            placeholder="Enter the link here"
            // clickHandler={() => {}}
          />
          <AutoPasteClipboard/>
          <div className="text-sm text-gray-400 mt-4 text-center">
            You can create <span className="text-pink-500">05</span> more links.{" "}
            <Link href="./signup" className="text-blue-500">
              Register Now
            </Link>{" "}
            to enjoy Unlimited usage <span className="text-gray-500">ⓘ</span>
          </div>
        </div>
        <TrialTable/>
      </main>
    </div>
  );
}
