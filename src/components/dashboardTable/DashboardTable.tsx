"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCopy, FaLink, FaLinkSlash } from "react-icons/fa6";
import { FaVimeo, FaYoutube } from "react-icons/fa";
import { Edit2 } from "lucide-react";
import { deleteUrl, Url, updateUrl } from "@/redux/slices/urlSlice";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHook/reduxHook";
import { fetchUrls } from "@/redux/slices/urlSlice";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { QRCodeSVG } from "qrcode.react";
import Loader from "../loader/Loader";
export default function DashboardTable() {
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
      const urlToCopy = `http://localhost:3000/${text}`;
      await navigator.clipboard.writeText(urlToCopy);
      toast.success("URL copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy URL");
      console.error("Clipboard error:", err);
    }
  };

  const handleShareQr = async (shortCode: string) => {
    const shareUrl = `http://localhost:3000/${shortCode}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share Short Link",
          text: "Check out my short link with a QR code!",
          url: shareUrl,
        });
        toast.success("Short link shared successfully!");
      } catch (err: any) {
        if (err.name !== "AbortError") {
          toast.error("Failed to share short link");
          console.error("Share error:", err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.info(
          "Web Share not supported. Short link copied to clipboard instead."
        );
      } catch (err) {
        toast.error("Failed to copy short link");
        console.error("Clipboard error:", err);
      }
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      await dispatch(deleteUrl({ id })).unwrap();
      toast.success("URL deleted successfully");
      await dispatch(fetchUrls());
    } catch (error: any) {
      toast.error(error || "Failed to delete URL");
    }
  };

  const startEditing = (url: Url) => {
    setEditingId(url.id);
    setEditForm({ originalUrl: url.originalUrl, isActive: url.isActive });
  };

  const handleUpdate = async (id: string) => {
    const updatedData = {
      id,
      originalUrl: editForm.originalUrl,
      isActive: editForm.isActive === true,
    };
    try {
      await dispatch(updateUrl(updatedData)).unwrap();
      toast.success("URL updated successfully");
      setEditingId(null);
      await dispatch(fetchUrls());
    } catch (error: any) {
      toast.error(error || "Failed to update URL");
    }
  };

  const getPlatformIcon = (url: string) => {
    if (url.includes("twitter"))
      return (
        <div className="w-7 h-7 bg-blue-400 rounded-full flex items-center justify-center">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
          </svg>
        </div>
      );
    if (url.includes("youtube")) return <FaYoutube size={25} color="red" />;
    return <FaVimeo size={25} color="white" />;
  };

  return (
    <div>
      <ToastContainer />
      {loading && (
        <div className="flex justify-center items-center ">
          <Loader />
        </div>
      )}{" "}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="bg-[#0B101B] overflow-x-auto rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#0D1117]">
            <tr className="text-[#C9CED6] text-left text-[15px] font-[700] border-b border-gray-800">
              <th className="p-4">Short Link</th>
              <th className="p-4">Original Link</th>
              <th className="p-4">QR Code</th>
              <th className="p-4">Clicks</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {urls.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-400">
                  No URLs found
                </td>
              </tr>
            ) : (
              urls.map((item) => (
                <tr
                  key={item.id}
                  className="border-b bg-[#1A2333] border-gray-800"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {item.isActive ? (
                        <>
                          <Link
                            href={`/${item.shortCode}`}
                            className="text-gray-300 hover:text-blue-500"
                            target="_blank"
                          >
                            {`http://localhost:3000/${item.shortCode}`}
                          </Link>
                          <div className="p-3 bg-gray-800 hover:bg-gray-900 rounded-[20px]">
                            <FaCopy
                              onClick={() => handleCopy(item.shortCode)}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <span
                            className="text-gray-500 cursor-not-allowed"
                            aria-disabled="true"
                          >
                            {`http://localhost:3000/${item.shortCode}`}
                          </span>
                          <div>
                            <FaCopy onClick={() => {}} />
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    {editingId === item.id ? (
                      <input
                        type="text"
                        value={editForm.originalUrl}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            originalUrl: e.target.value,
                          })
                        }
                        className="p-2 bg-gray-800 text-white rounded w-full max-w-xs"
                      />
                    ) : (
                      <div className="flex items-center gap-2 max-w-xs truncate">
                        {getPlatformIcon(item.originalUrl)}
                        <span className="text-gray-400">
                          {item.originalUrl}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    {item.qrCode ? (
                      <div className="flex items-center gap-2">
                        {item.isActive ? (
                          <button
                            onClick={() => handleShareQr(item.shortCode)}
                            className=" p-1"
                            title="Share Short Link"
                          >
                            <QRCodeSVG
                              value={`http://localhost:3000/${item.shortCode}`}
                              size={32}
                              bgColor="#1A2333"
                              fgColor="#FFFFFF"
                            />{" "}
                          </button>
                        ) : (
                          <button
                            className=" p-1"
                            title="Share Short Link"
                            disabled
                          >
                            <QRCodeSVG
                              value={`http://localhost:3000/${item.shortCode}`}
                              size={32}
                              bgColor="#1A2333"
                              fgColor="#FFFFFF"
                            />{" "}
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">Generating...</span>
                    )}
                  </td>
                  <td className="p-4 text-gray-300">
                    {item.visits?.length || 0}
                  </td>
                  <td className="p-4">
                    {editingId === item.id ? (
                      <select
                        value={editForm.isActive.toString()}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            isActive: e.target.value === "true",
                          })
                        }
                        className="p-2 bg-gray-800 text-white rounded"
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    ) : (
                      <span
                        className={`flex justify-center items-center px-2 py-1 rounded-full text-[14px] ${
                          item.isActive ? "text-[#1EB036]" : "text-[#B0901E]"
                        }`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                        {item.isActive ? (
                          <div className="mx-2 p-3 rounded-[20px] bg-[#1EB03624] text-white">
                            <FaLink />
                          </div>
                        ) : (
                          <div className="mx-2 p-3 rounded-[20px] bg-[#B0901E30]">
                            <FaLinkSlash />
                          </div>
                        )}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {editingId === item.id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(item.id)}
                            className="p-3 bg-green-600 rounded-[20px] hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-3 bg-gray-600 rounded-[20px] hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => startEditing(item)}
                          className="p-3 bg-gray-800 rounded-[20px] hover:bg-gray-700"
                        >
                          <Edit2 size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteHandler(item.id)}
                        className="p-3 bg-gray-800 rounded-[20px] hover:bg-gray-700"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
