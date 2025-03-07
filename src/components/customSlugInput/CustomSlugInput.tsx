"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/redux/reduxHook/reduxHook";
import { shortenUrl, fetchTrialUrls, fetchUrls, generateQrCode } from "@/redux/slices/urlSlice";
import { useSession } from "next-auth/react";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "../button/Button";
import { Link } from "lucide-react";
import { toast } from "react-toastify";

interface CustomSlugInputProps {
  title: string;
  placeholder: string;
  fetchAction: "trial" | "urls";
}

export default function CustomSlugInput({ title, placeholder, fetchAction }: CustomSlugInputProps) {
  const [url, setUrl] = useState("");
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();

  const isValidUrl = (input: string): boolean => {
    try {
      const urlObj = new URL(input);
      return !!urlObj.protocol && !!urlObj.hostname;
    } catch {
      return false;
    }
  };

  const isLongUrl = (input: string): boolean => {
    return input.length > 30;
  };

  const handleShorten = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      toast.error("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    if (!isLongUrl(url)) {
      toast.error("URL is too short to shorten (minimum 30 characters)");
      return;
    }

    if (fetchAction === "urls" && (status !== "authenticated" || !session?.user?.id)) {
      toast.error("Authentication required for dashboard URLs");
      console.error("Authentication required for dashboard URLs");
      return;
    }

    try {
      const result = await dispatch(shortenUrl({ originalUrl: url })).unwrap();
      console.log("Shortened URL Result:", result);
      const shortCode = result.url?.shortCode || result.shortUrl.split("/").pop();
      if (!shortCode) {
        throw new Error("Short code not found in response");
      }
      await dispatch(generateQrCode(shortCode)).unwrap();
      if (fetchAction === "trial") {
        await dispatch(fetchTrialUrls());
      } else if (fetchAction === "urls") {
        await dispatch(fetchUrls());
      }

      toast.success("URL shortened and QR code generated successfully!");
      setUrl("");
    } catch (err) {
      toast.error("Failed to shorten URL or generate QR code");
      console.error("Error:", err);
    }
  };

  return (
    <div className="bg-[#1A1F2E] rounded-[30px] p-1 flex border-2 border-[#353C4A] w-[100%]">
      <div className="flex items-center bg-transparent px-4 py-2 flex-1">
        <Link className="text-gray-400 mr-2" size={20} />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent border-none focus:outline-none text-white"
          value={url}
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