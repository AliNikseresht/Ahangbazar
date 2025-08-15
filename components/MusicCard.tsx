import React, { useEffect, useState } from "react";
import {
  Play,
  Pause,
  Download,
  Heart,
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
import { supabase } from "@/libs/supabase/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";

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
  const [isLiked, setIsLiked] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsLiked(track.favorites > 0);
  }, [track]);

  const toggleFavorite = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    try {
      const { error } = await supabase
        .from("songs")
        .update({
          favorites: newLikedState
            ? track.favorites + 1
            : Math.max(track.favorites - 1, 0),
        })
        .eq("id", track.id);

      if (error) throw error;

      queryClient.setQueryData<Track[]>(["recentTracks"], (old) =>
        old?.map((t) =>
          t.id === track.id
            ? {
                ...t,
                favorites: newLikedState
                  ? t.favorites + 1
                  : Math.max(t.favorites - 1, 0),
              }
            : t
        )
      );
    } catch (err) {
      console.error(err);
      setIsLiked(!newLikedState);
    }
  };

  if (variant === "list") {
    return (
      <div className="flex items-center p-4 rounded-2xl hover:bg-white/5 backdrop-blur-sm transition-all duration-300 group border border-white/5 hover:border-white/10">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden mr-4 group">
          <img
            src={track.cover && track.cover.trim() ? track.cover : appLogo.src}
            alt={track.title}
            onError={(e) => {
              e.currentTarget.src = appLogo.src;
            }}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPlay(track)}
              className="text-white hover:text-white hover:bg-white/20 rounded-full w-10 h-10"
            >
              {track.isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="truncate text-white font-semibold">{track.title}</h4>
          <p className="text-gray-400 truncate">{track.artist}</p>
        </div>

        <div className="flex items-center gap-2 text-gray-400 mr-6">
          {track.plays && (
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span className="text-sm">
                {(track.plays / 1000).toFixed(0)}K
              </span>
            </div>
          )}{" "}
          -
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 mb-1" />
            <span className="text-sm">{track.duration}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="sm"
            className={`text-gray-400 hover:text-pink-400 rounded-full ${
              isLiked ? "fill-pink-400 text-pink-400" : ""
            }`}
            onClick={toggleFavorite}
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-green-400 rounded-full"
            onClick={() => onDownload?.(track)}
          >
            <Download className="w-4 h-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white rounded-full"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-2xl">
              <DropdownMenuItem className="text-white hover:bg-white/10 rounded-xl">
                افزودن به پلی‌لیست
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10 rounded-xl">
                اشتراک‌گذاری
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10 rounded-xl">
                مشاهده هنرمند
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }

  return (
    <Card className="group overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 rounded-3xl">
      <div className="relative aspect-square overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <img
          src={track.cover}
          alt={track.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            onClick={() => onPlay(track)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-2xl backdrop-blur-sm border border-white/20 hover:scale-110 transition-all duration-300"
            variant="ghost"
          >
            {track.isPlaying ? (
              <Pause className="w-7 h-7 text-white" />
            ) : (
              <Play className="w-7 h-7 text-white ml-0.5" />
            )}
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className={`bg-black/40 backdrop-blur-md hover:bg-black/60 text-white border border-white/20 rounded-full w-10 h-10 hover:scale-110 transition-all duration-300 ${
                isLiked ? "fill-pink-400 text-pink-400" : ""
              }`}
              onClick={toggleFavorite}
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/40 backdrop-blur-md hover:bg-black/60 text-white border border-white/20 rounded-full w-10 h-10 hover:scale-110 transition-all duration-300"
              onClick={() => onDownload?.(track)}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Trending Badge */}
        {track.plays && track.plays > 100000 && (
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              ترند
            </div>
          </div>
        )}
      </div>

      <div className="p-6 space-y-3">
        <div>
          <h3 className="truncate text-white font-semibold text-lg group-hover:text-purple-300 transition-colors duration-300">
            {track.title}
          </h3>
          <p className="text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">
            {track.artist}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{track.duration}</span>
          </div>
          {track.plays && (
            <div className="flex items-center space-x-1 text-gray-500">
              <Eye className="w-4 h-4" />
              <span>{track.plays.toLocaleString()} پخش</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-0 group-hover:w-1/3 transition-all duration-1000 delay-200"></div>
        </div>
      </div>
    </Card>
  );
}
