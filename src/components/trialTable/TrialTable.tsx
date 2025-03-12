"use client";

import React from "react";
import { FaCopy, FaLink, FaLinkSlash } from "react-icons/fa6";
import { useTrialTable } from "@/hooks/useTrialTable";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { ToastContainer } from "react-toastify";
import Loader from "../loader/Loader";
import Image from "next/image";

export default function TrialTable() {
  const {
    trialUrls,
    loading,
    error,
    remainingTrials,
    handleCopy,
    handleShareQr,
    getFaviconUrl,
  } = useTrialTable();

  return (
    <div className="overflow-x-auto">
      <ToastContainer />
      <div className="text-sm text-gray-400 text-center">
        You can create{" "}
        <span className="text-pink-500">
          {remainingTrials > 0 ? remainingTrials : 0}
        </span>{" "}
        more links.{" "}
        <Link href="./signup" className="text-blue-500">
          Register Now
        </Link>{" "}
        to enjoy Unlimited usage <span className="text-gray-500">ⓘ</span>
      </div>
      {error && <p className="text-center text-red-500 mt-2">{error}</p>}
      {loading && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
      <table className="w-full mt-4">
        <thead>
          <tr className="text-gray-200 text-center bg-[#181E29]">
            <th className="p-4">Short Link</th>
            <th className="p-4">Original Link</th>
            <th className="p-4">QR Code</th>
            <th className="p-4">Clicks</th>
            <th className="p-4">Status</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {trialUrls?.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-400">
                No URLs found
              </td>
            </tr>
          ) : (
            trialUrls?.map((item) => (
              <tr
                key={item?.id || ""}
                className="bg-[#181E29] text-center mx-auto border-t border-gray-800"
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/${item?.shortCode || ""}`}
                      className="text-gray-300 hover:text-blue-500"
                      target="_blank"
                    >
                            {`${process.env.NEXT_PUBLIC_SITE_URL}/${item?.shortCode || ""}`}
                            </Link>
                    <button
                      className="p-3 bg-gray-800 hover:bg-gray-900 rounded-[20px]"
                      onClick={() => handleCopy(item?.shortCode || "")}
                    >
                      <FaCopy />
                    </button>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={getFaviconUrl(item?.originalUrl || "")}
                      alt="Favicon"
                      width={20}
                      height={20}
                      onError={(e) =>
                        (e.currentTarget.src = "/fallback-icon.png")
                      }
                    />
                    <span className="truncate max-w-xs">
                      {item?.originalUrl || ""}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShareQr(item?.shortCode || "")}
                      className="p-1"
                      title="Share Short Link"
                    >
                      <QRCodeSVG
                        value={`${process.env.NEXT_PUBLIC_SITE_URL}/${item?.shortCode || ""}`}
                        size={32}
                        bgColor="#181E29"
                        fgColor="#FFFFFF"
                      />
                    </button>
                  </div>
                </td>
                <td className="p-4">{item?.visits?.length || 0}</td>
                <td className="p-4">
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
                </td>
                <td className="p-4 text-gray-400">
                  {new Date(item?.createdAt || "").toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}