"use client";
// pages/shorten.js
import { useState } from "react";
import { Link, Bell } from "lucide-react";

export default function Shorten() {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Background Pattern */}
      <div
        className="fixed inset-0"
        style={{
          background: `
            repeating-radial-gradient(
              circle at 50% 50%,
              transparent 0px,
              transparent 199px,
              rgba(51, 51, 51, 0.1) 200px,
              transparent 201px,
              transparent 400px
            ),
            repeating-radial-gradient(
              circle at 50% 50%,
              transparent 0px,
              transparent 299px,
              rgba(51, 51, 51, 0.07) 300px,
              transparent 301px,
              transparent 600px
            )
          `,
          maskImage:
            "radial-gradient(circle at 50% 50%, black 0%, transparent 90%)",
        }}
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#1A1F2E]/20 rounded-3xl transform rotate-12" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1A1F2E]/20 rounded-3xl transform -rotate-12" />
      </div>
      {/* Top Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Linkly
        </h1>
        <div className="flex items-center gap-4">
          <button className="p-2 bg-[#1A1F2E] rounded-lg relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1F2E] rounded-lg">
            <span>Mohammed</span>
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
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-2xl mx-auto px-4 pt-20">
        <div className="space-y-4">
          {/* URL Input */}
          <div className="bg-[#1A1F2E]/50 rounded-xl p-1">
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

          {/* Custom Slug Input */}
          <div className="bg-[#1A1F2E]/50 rounded-xl p-1 flex">
            <div className="flex items-center bg-transparent px-4 py-2 flex-1">
              <Link className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="Enter custom slug"
                className="w-full bg-transparent border-none focus:outline-none text-white"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
              />
            </div>
            <button className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200">
              Auto Generate
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button className="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
              Shorten Now!
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
