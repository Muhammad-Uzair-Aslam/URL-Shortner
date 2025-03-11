"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/reduxHook/reduxHook";
import {
  shortenUrl,
  fetchTrialUrls,
  fetchUrls,
  generateQrCode,
} from "@/redux/slices/urlSlice";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export function useCustomSlugInput(fetchAction: "trial" | "urls") {
  const [url, setUrl] = useState("");
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();

  const isValidUrl = (input: string): boolean => {
    try {
      const urlObj = new URL(input);
      return !!urlObj?.protocol && !!urlObj?.hostname;
    } catch {
      return false;
    }
  };

  const isLongUrl = (input: string): boolean => {
    return (input || "").length > 30;
  };

  const handleShorten = async () => {
    if (!url?.trim()) {
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

    if (
      fetchAction === "urls" &&
      (status !== "authenticated" || !session?.user?.id)
    ) {
      toast.error("Authentication required for dashboard URLs");
      return;
    }

    try {
      const result = await dispatch(
        shortenUrl({ originalUrl: url || "" })
      ).unwrap();
      const shortCode =
        result?.url?.shortCode || result?.shortUrl?.split("/").pop() || "";
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
    } catch (err: unknown) {
      toast.error("Failed to shorten URL or generate QR code");
    }
  };

  return {
    url,
    setUrl,
    handleShorten,
  };
}
