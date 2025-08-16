import React from "react";
import {
  Play,
  Pause,
  Download,
  MoreHorizontal,
  Clock,
  Eye,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Track } from "@/types/tracksType";
import appLogo from "@/public/ahangbazar-logo.png";

interface MusicCardProps {
  track: Track;
  onPlay: (track: Track) => void;
  onDownload?: (track: Track) => void;
  variant?: "grid" | "list";
}

export function MusicCard({
  track,
  onPlay,
  onDownload,
  variant = "grid",
}: MusicCardProps) {
  if (variant === "list") {
    return (
      <div className="flex items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-white/5 backdrop-blur-sm transition-all duration-300 group border border-white/5 hover:border-white/10">
        {/* Cover */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden mr-3 sm:mr-4 group">
          <img
            src={track.cover && track.cover.trim() ? track.cover : appLogo.src}
            alt={track.title}
            onError={(e) => {
              e.currentTarget.src = appLogo.src;
            }}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
          />
          {/* Play button (always visible on mobile) */}
          <div className="absolute inset-0 bg-black/40 sm:bg-gradient-to-br sm:from-black/40 sm:to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPlay(track)}
              className="text-white hover:text-white hover:bg-white/20 rounded-full w-9 h-9 sm:w-10 sm:h-10"
            >
              {track.isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
              )}
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="truncate text-white font-semibold text-sm sm:text-base">
            {track.title}
          </h4>
          <p className="text-gray-400 truncate text-xs sm:text-sm">
            {track.artist}
          </p>
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-2 text-gray-400 mr-6">
          {track.plays && (
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span className="text-sm">
                {(track.plays / 1000).toFixed(0)}K
              </span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 mb-1" />
            <span className="text-sm">{track.duration}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-green-400 rounded-full w-8 h-8"
            onClick={() => onDownload?.(track)}
          >
            <Download className="w-4 h-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white rounded-full w-8 h-8"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl">
              <DropdownMenuItem className="text-white hover:bg-white/10 rounded-lg sm:rounded-xl">
                افزودن به پلی‌لیست
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10 rounded-lg sm:rounded-xl">
                اشتراک‌گذاری
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10 rounded-lg sm:rounded-xl">
                مشاهده هنرمند
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }

  return (
    <Card className="group overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 rounded-2xl sm:rounded-3xl">
      <div className="relative aspect-square overflow-hidden">
        {/* Cover */}
        <img
          src={track.cover}
          alt={track.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
        />
        {/* Overlay play button: visible on mobile, hover on desktop */}
        <div className="absolute inset-0 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 bg-black/30 sm:bg-transparent">
          <Button
            onClick={() => onPlay(track)}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xl sm:shadow-2xl backdrop-blur-sm border border-white/20 hover:scale-110 transition-all duration-300"
            variant="ghost"
          >
            {track.isPlaying ? (
              <Pause className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            ) : (
              <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-0.5" />
            )}
          </Button>
        </div>

        {/* Trending badge */}
        {track.plays && track.plays > 100000 && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              ترند
            </div>
          </div>
        )}
      </div>

      <div className="p-3 sm:p-6 space-y-1.5 sm:space-y-3">
        <div>
          <h3 className="truncate text-white font-semibold text-sm sm:text-lg group-hover:text-purple-300 transition-colors duration-300">
            {track.title}
          </h3>
          <p className="text-gray-400 truncate text-xs sm:text-sm group-hover:text-gray-300 transition-colors duration-300">
            {track.artist}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-1 sm:gap-2 text-gray-500">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{track.duration}</span>
          </div>
          {track.plays && (
            <div className="flex items-center gap-1 text-gray-500">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{track.plays.toLocaleString()} پخش</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="hidden sm:block w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-0 group-hover:w-1/3 transition-all duration-1000 delay-200"></div>
        </div>
      </div>
    </Card>
  );
}
