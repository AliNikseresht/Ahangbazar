import React, { memo } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Heart, Share2, Download } from "lucide-react";
import { Track } from "@/types/tracksType";
import { downloadTrack } from "@/utils/downloadTrack";
import { useFavoriteTrack } from "@/hooks/useFavoriteTrack";
import appLogo from "@/public/ahangbazar-logo.png";

interface TrackInfoProps {
  track: Track;
}

export const TrackInfo = memo(function TrackInfo({ track }: TrackInfoProps) {
  const { isLiked, toggleFavorite } = useFavoriteTrack(track);

  // Validate URL
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const imageSrc =
    track.cover && track.cover.trim() && isValidUrl(track.cover)
      ? track.cover
      : appLogo.src;

  return (
    <div className="flex items-center space-x-3 flex-1 min-w-0">
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-xl">
        <Image
          src={imageSrc}
          alt={track.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 4rem"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-white font-semibold text-xs md:text-lg">
          {track.title}
        </h4>
        <p className="truncate text-gray-400 text-xs md:text-sm">
          {track.artist}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFavorite}
          className={`text-gray-400 hover:text-pink-400 rounded-full transition-all duration-300 hover:scale-110`}
        >
          <Heart
            className={`w-4 h-4 sm:w-10 sm:h-10 ${
              isLiked ? "fill-pink-400 text-pink-400" : ""
            }`}
          />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-blue-400 rounded-full"
        >
          <Share2 className="w-4 h-4 sm:w-10 sm:h-10" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => downloadTrack(track)}
          className="text-gray-400 hover:text-green-400 rounded-full"
        >
          <Download className="w-4 h-4 sm:w-10 sm:h-10" />
        </Button>
      </div>
    </div>
  );
});
