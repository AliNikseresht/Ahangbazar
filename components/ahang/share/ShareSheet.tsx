"use client";

import { Link2, MessageCircle, Send, Share2, X } from "lucide-react";
import { IconButton } from "@/components/ahang/IconButton";
import type { Track } from "@/types";
import { usePlayer } from "@/context/PlayerContext";

type Props = {
  track: Track;
  onClose: () => void;
  onCopyLink: (track: Track) => void;
  onNativeShare: (track: Track) => void;
};

export function ShareSheet({
  track,
  onClose,
  onCopyLink,
  onNativeShare,
}: Props) {
  const { language, trackLabel, trackUrl } = usePlayer();
  const url = trackUrl(track);
  const label = trackLabel(track);

  return (
    <div className="share-overlay" onClick={onClose}>
      <div
        className="share-sheet"
        role="dialog"
        aria-label="Share"
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <div>
            <b>{language === "fa" ? "اشتراک‌گذاری" : "Share"}</b>
            <small>{label}</small>
          </div>
          <IconButton label="Close" onClick={onClose}>
            <X size={18} />
          </IconButton>
        </header>
        <div className="share-options">
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(label)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            <span className="share-icon telegram">
              <Send size={20} />
            </span>
            Telegram
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${label} ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            <span className="share-icon whatsapp">
              <MessageCircle size={20} />
            </span>
            WhatsApp
          </a>
          <button type="button" onClick={() => onCopyLink(track)}>
            <span className="share-icon">
              <Link2 size={20} />
            </span>
            {language === "fa" ? "کپی لینک" : "Copy link"}
          </button>
          {typeof navigator !== "undefined" && "share" in navigator && (
            <button type="button" onClick={() => onNativeShare(track)}>
              <span className="share-icon">
                <Share2 size={20} />
              </span>
              {language === "fa" ? "بیشتر" : "More"}
            </button>
          )}
        </div>
        <div className="share-link">
          <input
            readOnly
            dir="ltr"
            value={url}
            onFocus={(e) => e.currentTarget.select()}
          />
          <button type="button" onClick={() => onCopyLink(track)}>
            {language === "fa" ? "کپی" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}