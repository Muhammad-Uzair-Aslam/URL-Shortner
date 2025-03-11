"use client";

import React from "react";
import { Button } from "../button/Button";
import { Link } from "lucide-react";
import { FaArrowRight } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loader/Loader";
import { useUrlShortener } from "@/hooks/useCustomSlug";

export default function EditForm() {
  const {
    url,
    setUrl,
    customSlug,
    setCustomSlug,
    loading,
    status,
    handleAction,
  } = useUrlShortener();

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
      <ToastContainer />
      <form
        className="relative z-10 max-w-4xl mx-auto px-4 pt-32"
        onSubmit={(e) => {
          e.preventDefault();
          handleAction();
        }}
      >
        <div className="space-y-4">
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
          <div className="bg-[#1A1F2E] rounded-[30px] p-1 flex border-2 border-[#353C4A] w-[100%]">
            <div className="flex items-center bg-transparent px-4 py-2 flex-1">
              <Link className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="Enter Custom Slug (Logged-in users only)"
                className="w-full bg-transparent border-none focus:outline-none text-white"
                value={customSlug}
                onChange={(e) =>
                  setCustomSlug(e.target.value.trim().toLowerCase())
                }
                disabled={loading || status !== "authenticated"}
              />
            </div>
            <div className="hidden md:block">
              <Button
                title="Generate"
                clickHandler={() => handleAction(true)}
                disabled={loading}
              />
            </div>
            <div className="block md:hidden">
              <button
                className="w-[50px] bg-[#0066FF] text-white py-3 rounded-[25px] hover:bg-[#0052CC] transition-all duration-200 font-medium"
                onClick={() => handleAction(true)}
                disabled={loading}
              >
                <div className="flex justify-center">
                  <FaArrowRight size={25} color="white" />
                </div>
              </button>
            </div>
          </div>
          <div className="flex justify-center pt-4">
            <Button
              title="Shorten Now!"
              clickHandler={() => handleAction()}
              disabled={loading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
