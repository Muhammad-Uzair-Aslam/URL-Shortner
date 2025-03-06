"use client";

import React, { useState } from "react";
import { Button } from "../button/Button";
import { Link } from "lucide-react";
import { FaArrowRight } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHook/reduxHook";
import { shortenUrl, checkSlugAvailability, resetShortenState, fetchUrls, fetchTrialUrls, generateQrCode } from "@/redux/slices/urlSlice";

export default function EditForm() {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const { shortenedUrl, loading, error, isSlugAvailable } = useAppSelector((state) => state.urls);

  // Handle shortening the URL
  const handleShorten = async () => {
    if (!url) {
      toast.error("Please enter a URL to shorten.");
      return;
    }

    const result = await dispatch(
      shortenUrl({ originalUrl: url, customSlug: session && customSlug ? customSlug : undefined })
    );

    if (shortenUrl.fulfilled.match(result)) {
      toast.success(`Shortened URL: ${result.payload.shortUrl}`);
      setUrl("");
      setCustomSlug("");
      if (session) {
        dispatch(fetchUrls());
        await dispatch(generateQrCode(result.payload.url.shortCode)); // Trigger QR generation
      } else {
        dispatch(fetchTrialUrls());
        await dispatch(generateQrCode(result.payload.url.shortCode));
      }
      dispatch(resetShortenState());
    }
  };

  // Handle slug availability check and generate
  const handleGenerate = async () => {
    if (!url) {
      toast.error("Please enter a URL to shorten.");
      return;
    }

    if (!session) {
      toast.info("Custom slugs are available for logged-in users only.");
      setCustomSlug("");
      await handleShorten();
      return;
    }

    if (!customSlug) {
      toast.info("Enter a custom slug or proceed to generate a random one.");
      await handleShorten();
      return;
    }

    const checkResult = await dispatch(checkSlugAvailability(customSlug));
    if (checkSlugAvailability.fulfilled.match(checkResult)) {
      if (checkResult.payload) {
        toast.success("Slug is available! Shortening now...");
        await handleShorten();
      } else {
        toast.error("This slug is already taken. Try another.");
      }
    } else {
      toast.error(checkResult.error?.message || "Error checking slug");
    }
  };

  return (
    <div>
      <ToastContainer />
      <form
        className="relative z-10 max-w-4xl mx-auto px-4 pt-32"
        onSubmit={(e) => {
          e.preventDefault();
          handleShorten();
        }}
      >
        <div className="space-y-4">
          {/* URL Input */}
          <div className="bg-[#1A1F2E] border-2 border-[#353C4A] rounded-[30px] p-1 py-2">
            <div className="flex items-center bg-transparent px-4 py-2">
              <Link className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="Enter the link to shorten here"
                className="w-full bg-transparent border-none focus:outline-none text-white"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Custom Slug Input with Generate Button */}
          <div className="bg-[#1A1F2E] rounded-[30px] p-1 flex border-2 border-[#353C4A] w-[100%]">
            <div className="flex items-center bg-transparent px-4 py-2 flex-1">
              <Link className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="Enter Custom Slug (Logged-in users only)"
                className="w-full bg-transparent border-none focus:outline-none text-white"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value.trim().toLowerCase())} // Fixed
                disabled={loading || status !== "authenticated"}
              />
            </div>
            <div className="hidden md:block">
              <Button title="Generate" clickHandler={handleGenerate} disabled={loading} />
            </div>
            <div className="block md:hidden">
              <button
                className="w-[50px] bg-[#0066FF] text-white py-3 rounded-[25px] hover:bg-[#0052CC] transition-all duration-200 font-medium"
                onClick={handleGenerate}
                disabled={loading}
              >
                <div className="flex justify-center">
                  <FaArrowRight size={25} color="white" />
                </div>
              </button>
            </div>
          </div>

          {/* Shorten Button */}
          <div className="flex justify-center pt-4">
            <Button title="Shorten Now!" clickHandler={handleShorten} disabled={loading} />
          </div>
        </div>
      </form>
    </div>
  );
}