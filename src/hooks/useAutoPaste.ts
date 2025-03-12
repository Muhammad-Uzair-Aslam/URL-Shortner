"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function useAutoPasteClipboard(urlToCopy?: string) {
  const [isAutoPasteEnabled, setIsAutoPasteEnabled] = useState(false);

  useEffect(() => {
    if (isAutoPasteEnabled && urlToCopy && typeof window !== "undefined") {
      const copyToClipboard = async () => {
        try {
          await navigator?.clipboard?.writeText(urlToCopy);
          toast.success("URL copied to clipboard!");
        } catch  {
          toast.error("Failed to copy URL");
        }
      };
      copyToClipboard();
    }
  }, [isAutoPasteEnabled, urlToCopy]);

  const handleToggle = () => {
    setIsAutoPasteEnabled((prev) => !prev);
  };

  return {
    isAutoPasteEnabled,
    handleToggle,
  };
}
