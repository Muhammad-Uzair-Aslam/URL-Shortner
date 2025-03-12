"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHook";
import {
  shortenUrl,
  checkSlugAvailability,
  resetShortenState,
  fetchUrls,
  fetchTrialUrls,
  generateQrCode,
} from "@/redux/slices/urlSlice";
import { toast } from "react-toastify";

export function useUrlShortener() {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const { shortenedUrl, loading, error, isSlugAvailable } = useAppSelector(
    (state) => state?.urls
  );

  const isValidUrl = (input: string) => {
    try {
      const urlObj = new URL(input);
      return !!urlObj?.protocol && !!urlObj?.hostname;
    } catch {
      return false;
    }
  };

  const handleAction = async (useCustomSlug = false) => {
    if (!url) {
      toast.error("Please enter a URL to shorten.");
      return;
    }
    if (!isValidUrl(url)) {
      toast.error("Please enter a valid URL (e.g., https://example.com)");
      return;
    }
    if (!session && customSlug) {
      toast.info("Custom slugs are available for logged-in users only.");
      setCustomSlug("");
    }
    if (session && useCustomSlug && customSlug) {
      const checkResult = await dispatch(checkSlugAvailability(customSlug));
      if (
        !checkSlugAvailability?.fulfilled?.match(checkResult) ||
        !checkResult?.payload
      ) {
        toast.error(
          checkResult?.payload
            ? "This slug is already taken. Try another."
            : "Error checking slug"
        );
        return;
      }
      toast.success("Slug is available! Shortening now...");
    }

    const result = await dispatch(
      shortenUrl({
        originalUrl: url,
        customSlug: session && customSlug ? customSlug : undefined,
      })
    );

    if (shortenUrl?.fulfilled?.match(result)) {
      toast.success(`Shortened URL: ${result?.payload?.shortUrl}`);
      setUrl("");
      setCustomSlug("");
      const fetchAction = session ? fetchUrls : fetchTrialUrls;
      dispatch(fetchAction());
      await dispatch(generateQrCode(result?.payload?.url?.shortCode || ""));
      dispatch(resetShortenState());
    }
  };

  return {
    url,
    setUrl,
    customSlug,
    setCustomSlug,
    loading,
    shortenedUrl,
    error,
    isSlugAvailable,
    status,
    handleAction,
  };
}
