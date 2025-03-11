"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "../button/Button";
import { Link } from "lucide-react";
import { useCustomSlugInput } from "@/hooks/useCustomSlugInput";
import {CustomSlugInputProps} from '@/types/types'

export default function CustomSlugInput({
  title,
  placeholder,
  fetchAction,
}: CustomSlugInputProps) {
  const { url, setUrl, handleShorten } = useCustomSlugInput(fetchAction);

  return (
    <div className="bg-[#1A1F2E] rounded-[30px] p-1 flex border-2 w-[80%] mt-4 border-[#353C4A] md:w-[60%]">
      <div className="flex items-center bg-transparent px-4 py-2 flex-1">
        <Link className="text-gray-400 mr-2" size={20} />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent border-none focus:outline-none text-white"
          value={url || ""}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="hidden md:block">
        <Button title={title} clickHandler={handleShorten} />
      </div>
      <div className="block md:hidden">
        <button
          className="w-[50px] bg-[#0066FF] text-white py-3 rounded-[25px] hover:bg-[#0052CC] transition-all duration-200 font-medium"
          onClick={handleShorten}
        >
          <div className="flex justify-center">
            <FaArrowRight size={25} color="white" />
          </div>
        </button>
      </div>
    </div>
  );
}
