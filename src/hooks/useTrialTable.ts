"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHook";
import { fetchTrialUrls } from "@/redux/slices/urlSlice";
import { toast } from "react-toastify";

export function useTrialTable() {
  const dispatch = useAppDispatch();
  const { trialUrls, loading, error } = useAppSelector((state) => state.urls);

  useEffect(() => {
    dispatch(fetchTrialUrls());
  }, [dispatch]);

  const trialLimit = 5;
  const remainingTrials = trialLimit - (trialUrls?.length || 0);

  const handleCopy = async (text: string) => {
    try {
      const urlToCopy = `${process.env.NEXT_PUBLIC_BASE_URL}/${text || ""}`;
      await navigator?.clipboard?.writeText(urlToCopy);
      toast.success("URL copied to clipboard!");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const handleShareQr = async (shortCode: string) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode || ""}`;
    if (navigator?.share) {
      try {
        await navigator.share({
          title: "Share Short Link",
          text: "Check out my trial short link with a QR code!",
          url: shareUrl,
        });
        toast.success("Short link shared successfully!");
      } catch (err: unknown) {
        if ((err as Error)?.name !== "AbortError") {
          toast.error("Failed to share short link");
        }
      }
    } else {
      try {
        await navigator?.clipboard?.writeText(shareUrl);
        toast.info(
          "Web Share not supported. Short link copied to clipboard instead."
        );
      } catch  {
        toast.error("Failed to copy short link");
      }
    }
  };

  const getFaviconUrl = (url: string) => {
    try {
      const urlObj = new URL(url || "");
      return `https://www.google.com/s2/favicons?domain=${
        urlObj?.hostname || ""
      }&sz=32`;
    } catch {
      return "https://www.google.com/s2/favicons?domain=example.com&sz=32";
    }
  };

  return {
    trialUrls,
    loading,
    error,
    remainingTrials,
    handleCopy,
    handleShareQr,
    getFaviconUrl,
  };
}
