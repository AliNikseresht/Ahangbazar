import { Play } from "lucide-react";
import { Button } from "../ui/button";
import { FeaturedTrack } from "@/types/heroSectionType";

interface AlbumArtProps {
  track: FeaturedTrack;
  onPlay?: (track: FeaturedTrack) => void;
}

export function AlbumArt({ track, onPlay }: AlbumArtProps) {
  return (
    <div className="flex justify-center lg:justify-end">
      <div className="relative group w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96">
        <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-3xl opacity-20 md:opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-500" />
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-black shadow-2xl group-hover:rotate-180 transition-transform duration-[3000ms] ease-in-out">
          <div className="absolute inset-4 rounded-full border border-gray-700 opacity-50" />
          <div className="absolute inset-8 rounded-full border border-gray-700 opacity-30" />
          <div className="absolute inset-12 rounded-full overflow-hidden shadow-xl">
            <img
              src={track.cover}
              alt={track.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Button
            onClick={() => onPlay?.(track)}
            className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-2xl opacity-0 group-hover:opacity-100"
          >
            <Play className="w-8 h-8 text-white ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
