"use client";
import { useState } from "react";
import { Link, Bell } from "lucide-react";
import { Button } from "../../components/button/Button";
import CustomSlugInput from "../../components/customSlugInput/CustomSlugInput";
import NotificationLoggedIn from "../../components/notificationLoggedIn/NotificationLoggedIn";

export default function Shorten() {
  const [url, setUrl] = useState("");
  return (
    <div className="min-h-screen bg-[#0B101B] text-white">
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
            <nav className="relative z-10 flex justify-between items-center p-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Linkly
        </h1>
        <NotificationLoggedIn/>
        </nav>

      <main className="relative  z-10 max-w-4xl mx-auto px-4 pt-32">
        <div className="space-y-4">
          <div className="bg-[#1A1F2E] border-2 border-[#353C4A] rounded-[30] p-1 py-2">
            <div className="flex items-center bg-transparent px-4 py-2">
              <Link className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="Enter the link to shorten here"
                className="w-full bg-transparent border-none focus:outline-none text-white"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          <CustomSlugInput placeholder="Enter Custom Slug" clickHandler={()=>{}} title="Auto Generate"/>

          <div className="flex justify-center pt-4">
            <Button title="Shorten Now!"clickHandler={()=>{}}/>
          </div>
        </div>
      </main>
    </div>
  );
}
