"use client";

import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCopy, FaLink, FaLinkSlash } from "react-icons/fa6";
import { Edit2 } from "lucide-react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { QRCodeSVG } from "qrcode.react";
import Loader from "../loader/Loader";
import { useDashboardTable } from "@/hooks/useDashboard";
import Image from "next/image";

export default function DashboardTable() {
  const {
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
  } = useDashboardTable();

  const getPlatformIcon = (url: string) => (
    <Image
      src={getPlatformIconUrl(url)}
      alt="Favicon"
      width={20}
      height={20}
      onError={(e) => (e.currentTarget.src = "/fallback-icon.png")}
    />
  );

  return (
    <div>
      <ToastContainer />
      {loading && (
        <div className="flex justify-center items-center ">
          <Loader />
        </div>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="bg-[#0B101B] overflow-x-auto rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#0D1117]">
            <tr className="text-[#C9CED6] text-center text-[15px] font-[700] border-b border-gray-800">
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
            {urls?.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-400">
                  No URLs found
                </td>
              </tr>
            ) : (
              urls?.map((item) => (
                <tr
                  key={item?.id || ""}
                  className="border-b bg-[#1A2333] border-gray-800"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {item?.isActive ? (
                        <>
                          <Link
                            href={`/${item?.shortCode || ""}`}
                            className="text-gray-300 hover:text-blue-500"
                            target="_blank"
                          >
                            {`${process.env.NEXT_PUBLIC_BASE_URL}/${item?.shortCode || ""}`}
                          </Link>
                          <div className="p-3 bg-gray-800 hover:bg-gray-900 rounded-[20px]">
                            <FaCopy
                              onClick={() => handleCopy(item?.shortCode || "")}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <span
                            className="text-gray-500 cursor-not-allowed"
                            aria-disabled="true"
                          >
                            {`${process.env.NEXT_PUBLIC_BASE_URL}/${item?.shortCode || ""}`}
                            </span>
                          <div>
                            <FaCopy onClick={() => {}} />
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    {editingId === item?.id ? (
                      <input
                        type="text"
                        value={editForm?.originalUrl || ""}
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
                        {getPlatformIcon(item?.originalUrl || "")}
                        <span className="text-gray-400">
                          {item?.originalUrl || ""}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    {item?.qrCode ? (
                      <div className="flex items-center gap-2">
                        {item?.isActive ? (
                          <button
                            onClick={() => handleShareQr(item?.shortCode || "")}
                            className=" p-1"
                            title="Share Short Link"
                          >
                            <QRCodeSVG
                              value={`${process.env.NEXT_PUBLIC_BASE_URL}/${item?.shortCode || ""}`}

                              size={32}
                              bgColor="#1A2333"
                              fgColor="#FFFFFF"
                            />
                          </button>
                        ) : (
                          <button
                            className=" p-1"
                            title="Share Short Link"
                            disabled
                          >
                            <QRCodeSVG
                              value={`${process.env.NEXT_PUBLIC_BASE_URL}/${item?.shortCode || ""}`}

                              size={32}
                              bgColor="#1A2333"
                              fgColor="#FFFFFF"
                            />
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">Generating...</span>
                    )}
                  </td>
                  <td className="p-4 text-gray-300">
                    {item?.visits?.length || 0}
                  </td>
                  <td className="p-4">
                    {editingId === item?.id ? (
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
                          item?.isActive ? "text-[#1EB036]" : "text-[#B0901E]"
                        }`}
                      >
                        {item?.isActive ? "Active" : "Inactive"}
                        {item?.isActive ? (
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
                    {new Date(item?.createdAt || "").toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {editingId === item?.id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(item?.id || "")}
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
                        onClick={() => deleteHandler(item?.id || "")}
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