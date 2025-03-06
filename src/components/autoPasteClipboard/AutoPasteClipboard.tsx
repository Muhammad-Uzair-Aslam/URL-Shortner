"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface AutoPasteClipboardProps {
  urlToCopy?: string; // Optional prop for the URL to auto-copy
}

export default function AutoPasteClipboard({ urlToCopy }: AutoPasteClipboardProps) {
  const [isAutoPasteEnabled, setIsAutoPasteEnabled] = useState(false);

  // Ensure clipboard logic runs only on the client
  useEffect(() => {
    if (isAutoPasteEnabled && urlToCopy && typeof window !== "undefined") {
      const copyToClipboard = async () => {
        try {
          await navigator.clipboard.writeText(urlToCopy);
          toast.success("URL copied to clipboard!");
        } catch (err) {
          toast.error("Failed to copy URL");
          console.error("Clipboard error:", err);
        }
      };
      copyToClipboard();
    }
  }, [isAutoPasteEnabled, urlToCopy]); // Re-run when toggle or URL changes

  const handleToggle = () => {
    setIsAutoPasteEnabled((prev) => !prev); // Toggle state
  };

  return (
    <div className="relative z-10 flex justify-center my-4">
      <label className="flex items-center gap-2 text-sm text-gray-400">
        <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800 border border-gray-700">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isAutoPasteEnabled}
            onChange={handleToggle}
          />
          <span
            className={`absolute inset-y-1 left-1 w-4 h-4 rounded-full bg-gray-600 peer-checked:bg-[#144EE3] peer-checked:left-7 transition-all duration-200`}
          ></span>
        </div>
        Auto Paste to Clipboard
      </label>
    </div>
  );
}