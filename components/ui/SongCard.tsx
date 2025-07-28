"use client";

import { Song } from "@/types/song";
import { getPublicAudioUrl } from "@/utils/getPublicAudioUrl";
import { Download, Pause, Play, Share2 } from "lucide-react";
import SharePopup from "./dialogs/SharePopup";

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
  activePopupId: string | null;
  setActivePopupId: (id: string | null) => void;
}

export const SongCard = ({
  song,
  onPlay,
  activePopupId,
  setActivePopupId,
}: SongCardProps) => {
  const showPopup = activePopupId === song.id;

  const songUrl = getPublicAudioUrl(song.storage_path);

  return (
    <div className="relative w-full border border-[#40ad6d] rounded-lg shadow-sm p-2 flex flex-col gap-2 bg-white">
      {/* Title and Album always on top */}
      <div className="text-left">
        <h3 className="font-bold text-xs lg:text-sm truncate">{song.title}</h3>
        <p className="text-gray-500 text-xs">{song.album || ""}</p>
      </div>

      {/* Buttons always below title */}
      <div className="flex items-center  flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <a
            href={songUrl}
            download
            className="text-[#08aadb] p-1.5 hover:text-[#0883db] transition flex items-center text-xs gap-1 cursor-pointer"
          >
            <Download size={18} />
            دانلود
          </a>
          <button
            className="text-[#40ad6d] p-1.5 hover:text-[#40ad54] transition flex items-center text-xs gap-1 cursor-pointer"
            onClick={() => onPlay(song)}
          >
            <Play size={18} />
            پخش
          </button>
        </div>

        <button
          onClick={() => setActivePopupId(showPopup ? null : song.id)}
          className="text-[#08aadb] hover:text-[#0883db] transition flex items-center text-xs gap-1 cursor-pointer"
        >
          <Share2 size={16} />
          اشتراک‌گذاری
        </button>
      </div>

      {/* Popup box */}
      {showPopup && (
        <SharePopup
          title={song.title}
          url={songUrl}
          onClose={() => setActivePopupId(null)}
        />
      )}
    </div>
  );
};
