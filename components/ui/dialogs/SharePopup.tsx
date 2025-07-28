"use client";

import { Copy, X } from "lucide-react";
import React, { useState } from "react";

interface SharePopupProps {
  title: string;
  url: string;
  onClose: () => void;
}

const SharePopup = ({ title, url, onClose }: SharePopupProps) => {
  const [copied, setCopied] = useState(false);

  const titleEncoded = encodeURIComponent(title);
  const urlEncoded = encodeURIComponent(url);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("خطا در کپی:", err);
    }
  };

  return (
    <div className="absolute -top-0 left-20 -translate-x-1/2 mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-max flex flex-col gap-2 text-xs animate-fade-in duration-200">
      <button
        className="absolute top-1 left-1 text-gray-400 hover:text-red-500"
        onClick={onClose}
      >
        <X size={14} />
      </button>

      <a
        href={`https://t.me/share/url?url=${urlEncoded}&text=${titleEncoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        اشتراک‌گذاری در تلگرام
      </a>
      <a
        href={`https://wa.me/?text=${urlEncoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 hover:underline"
      >
        اشتراک‌گذاری در واتساپ
      </a>
      <a
        href={`sms:?body=${urlEncoded}`}
        className="text-gray-700 hover:underline"
      >
        ارسال با SMS
      </a>
      <button
        onClick={handleCopy}
        className="text-gray-600 hover:text-black flex items-center gap-1"
      >
        <Copy size={14} />
        {copied ? "کپی شد!" : "کپی لینک"}
      </button>
    </div>
  );
};

export default SharePopup;
