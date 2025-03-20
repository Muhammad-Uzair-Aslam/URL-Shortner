"use client";
import { FaBell } from "react-icons/fa";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import SignOutButton from "../signOutButton/SignOutButton";
import Link from "next/link";

export default function NotificationLoggedIn() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center ">
      <div className="relative ">
        <div
          className="flex items-center  px-8 py-2 mx-w-[300px] bg-[#1A1F2E] border border-gray-500 rounded-[30px] cursor-pointer"
          onClick={toggleDropdown}
        >
          <div className="flex flex-col ">
            <span className="text-[10px]">Welcome</span>
            <span className="text-[16px]">
              {session?.user?.name || "loading..."}
            </span>
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
          <div className="absolute left-0 bg-[#1A1F2E] rounded-lg shadow-xl ">
            <Link
              href="/edit"
              className="block px-4 py-2 text-white hover:bg-[#2A2F3E]"
              onClick={() => setIsOpen(false)}
            >
              Edit URL
            </Link>
            <Link
              href="/profile"
              className="block px-4 py-2 text-white hover:bg-[#2A2F3E]"
              onClick={() => setIsOpen(false)}
            >
              Update Profile
            </Link>
            <div className="border-t border-gray-600"></div>
            <SignOutButton className="block w-full z-0 text-left px-4 py-2 text-white hover:bg-red-600 rounded-b-lg" />
          </div>
        )}
      </div>

      <button className="p-4 ml-3 bg-[#144EE3] rounded-[30px] relative hidden md:block shadow-lg">
        <FaBell size={20} color="white" />
        <span className="absolute top-2 right-3  text-white text-xs rounded-full">2</span>
        </button>
    </div>
  );
}
