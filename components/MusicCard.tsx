import React, { memo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { MusicCardTypes } from "@/types/MusicCardTypes";
import {
  PlayIconButton,
  TrackActions,
  TrackImage,
  TrackStats,
  TrendingBadge,
  DEFAULT_LABELS,
} from "./music-card";

export const MusicCard = memo(function MusicCard({
  track,
  onPlay,
  onDownload,
  variant = "grid",
  labels = DEFAULT_LABELS,
}: MusicCardTypes) {
  const handlePlay = useCallback(() => onPlay(track), [onPlay, track]);

  if (variant === "list") {
    return (
      <div className="flex items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-white/5 backdrop-blur-sm transition-all duration-300 group border border-white/5 hover:border-white/10">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden mr-3 sm:mr-4 group">
          <TrackImage
            src={track.cover}
            alt={track.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
          />
          <div className="absolute inset-0 bg-black/40 sm:bg-gradient-to-br sm:from-black/40 sm:to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <PlayIconButton
              isPlaying={track.isPlaying}
              onClick={handlePlay}
              size="sm"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="truncate text-white font-semibold text-sm sm:text-base">
            {track.title}
          </h4>
          <p className="text-gray-400 truncate text-xs sm:text-sm">
            {track.artist}
          </p>
        </div>

        <TrackStats
          duration={track.duration ?? undefined}
          plays={track.plays ?? undefined}
          compact
        />

        <TrackActions onDownload={onDownload} track={track} labels={labels} />
      </div>
    );
  }

  return (
    <Card className="group overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 rounded-2xl sm:rounded-3xl">
      <div className="relative aspect-square overflow-hidden">
        <TrackImage
          src={track.cover}
          alt={track.title || "آهنگ ناشناس"}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 bg-black/30 sm:bg-transparent">
          <PlayIconButton isPlaying={track.isPlaying} onClick={handlePlay} />
        </div>

        <TrendingBadge
          visible={!!(track.plays && track.plays > 100000)}
          label={labels.trending}
        />
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

        <TrackStats
          duration={track.duration ?? undefined}
          plays={track.plays ?? undefined}
          playsSuffix={labels.playsSuffix}
        />

        <div className="hidden sm:block w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-0 group-hover:w-1/3 transition-all duration-1000 delay-200" />
        </div>
      </div>
    </Card>
  );
});

export default MusicCard;
