'use client'
import { Bell } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import SignOutButton from '../signOutButton/SignOutButton'
import Link from 'next/link'
export default function NotificationLoggedIn() {
  const [isOpen,setIsOpen]=useState(false) 
    const { data:session } = useSession()
    const toggleDropdown=()=>{
      setIsOpen(!isOpen);
    }
  return (
    <div className="flex items-center gap-4">
        <SignOutButton/>
        <div className="relative">
      <div
        className="flex items-center w-[270px] gap-2 px-8 py-2 bg-[#1A1F2E] rounded-[30px] cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex flex-col">
          <span className="text-[10px]">Welcome</span>
          <span className="text-[16px]">{session?.user?.name || 'loading...'}</span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-[270px] bg-[#1A1F2E] rounded-lg shadow-lg z-20">
          <Link
            href="/edit"
            className="block px-4 py-2 text-white hover:bg-[#2A2F3E] rounded-t-lg"
            onClick={() => setIsOpen(false)} 
          >
            Edit URL
          </Link>
          <Link
            href="/profile"
            className="block px-4 py-2 text-white hover:bg-[#2A2F3E] rounded-b-lg"
            onClick={() => setIsOpen(false)} 
          >
            Update Profile
          </Link>
        </div>
      )}
     
    </div>
          <button className="p-3 bg-blue-500 rounded-[30px] relative">
            <Bell size={30} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></span>
          </button>
          
        </div>
  )
}
