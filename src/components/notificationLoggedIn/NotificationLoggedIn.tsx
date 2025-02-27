'use client'
import { Bell } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'
import SignOutButton from '../signOutButton/SignOutButton'
export default function NotificationLoggedIn() {
    const { data:session } = useSession()
  
  return (
    <div className="flex items-center gap-4">
        <SignOutButton/>
        <div className="flex items-center gap-2 px-8 py-2 bg-[#1A1F2E] rounded-[30px]">
          <div className="flex flex-col">
          <span className="text-[10px]">Welcome</span>
          <span className="text-[16px]">{session?.user?.name}</span>
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
          
          <button className="p-3 bg-blue-500 rounded-[30px] relative">
            <Bell size={30} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></span>
          </button>
          
        </div>
  )
}
