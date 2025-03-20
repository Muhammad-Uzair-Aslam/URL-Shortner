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
        try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const svgString = new XMLSerializer().serializeToString(
        document.querySelector(`[data-qr-code="${shortCode}"]`) as SVGElement
      );
      
      canvas.width = 300;
      canvas.height = 300;
      
      const img = new Image();
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
            await new Promise((resolve) => {
        img.onload = resolve;
        img.src = url;
      });
            context?.drawImage(img, 0, 0, 300, 300);
            const imageBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });
      
      if (!imageBlob) {
        throw new Error("Failed to create image blob");
      }
            const file = new File([imageBlob], `qrcode-${shortCode}.png`, { 
        type: "image/png" 
      });
            if (navigator?.share) {
        await navigator.share({
          title: "Share QR Code",
          text: "Check out my short link with a QR code!",
          url: shareUrl,
          files: [file]
        });
        toast.success("QR code shared successfully!");
      } else {
        await navigator?.clipboard?.writeText(shareUrl);
        toast.info(
          "Web Share with files not supported. Short link copied to clipboard instead."
        );
      }
            URL.revokeObjectURL(url);
    } catch (err: unknown) {
      if ((err as Error)?.name !== "AbortError") {
        toast.error("Failed to share QR code");
        console.error("Share error:", err);
      }
    }
  };
  const handleClick = (shortCode: string) => {
    window.open(`/${shortCode}?click=true`, "_blank");
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
    handleClick,
    handleShareQr,
    getFaviconUrl,
  };
}
