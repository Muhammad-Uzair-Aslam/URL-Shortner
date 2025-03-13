"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHook";
import { fetchUrls, deleteUrl, updateUrl,  } from "@/redux/slices/urlSlice";
import { Url } from "@/types/types";
import { toast } from "react-toastify";

export function useDashboardTable() {
  const dispatch = useAppDispatch();
  const { urls, loading, error } = useAppSelector((state) => state.urls);
  const { data: session, status } = useSession();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    originalUrl: string;
    isActive: boolean;
  }>({
    originalUrl: "",
    isActive: true,
  });

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      dispatch(fetchUrls());
    }
  }, [dispatch, session, status]);

  const handleCopy = async (text: string) => {
    try {
      const urlToCopy = `${process.env.NEXTAUTH_URL}/${text || ""}`;
      await navigator.clipboard.writeText(urlToCopy);
      toast.success("URL copied to clipboard!");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const handleShareQr = async (shortCode: string) => {
    const shareUrl = `${process.env.NEXTAUTH_URL}/${shortCode || ""}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share Short Link",
          text: "Check out my short link with a QR code!",
          url: shareUrl,
        });
        toast.success("Short link shared successfully!");
      } catch (err: unknown) {
        if ((err as Error).name !== "AbortError") {
          toast.error("Failed to share short link");
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.info(
          "Web Share not supported. Short link copied to clipboard instead."
        );
      } catch  {
        toast.error("Failed to copy short link");
      }
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      await dispatch(deleteUrl({ id })).unwrap();
      toast.success("URL deleted successfully");
      await dispatch(fetchUrls());
    } catch{
      toast.error((error as string) || "Failed to delete URL");
    }
  };

  const startEditing = (url: Url) => {
    setEditingId(url?.id || null);
    setEditForm({
      originalUrl: url?.originalUrl || "",
      isActive: url?.isActive ?? true,
    });
  };

  const handleUpdate = async (id: string) => {
    const updatedData = {
      id,
      originalUrl: editForm.originalUrl || "",
      isActive: editForm.isActive === true,
    };
    try {
      await dispatch(updateUrl(updatedData)).unwrap();
      toast.success("URL updated successfully");
      setEditingId(null);
      await dispatch(fetchUrls());
    } catch (error: unknown) {
      toast.error((error as string) || "Failed to update URL");
    }
  };

  const getPlatformIconUrl = (url: string) => {
    try {
      const urlObj = new URL(url || "");
      return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
    } catch {
      return "https://www.google.com/s2/favicons?domain=example.com&sz=32";
    }
  };

  return {
    urls,
    loading,
    error,
    editingId,
    setEditingId,
    editForm,
    setEditForm,
    handleCopy,
    handleShareQr,
    deleteHandler,
    startEditing,
    handleUpdate,
    getPlatformIconUrl,
  };
}
