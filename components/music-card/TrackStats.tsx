import React, { memo } from "react";
import { Clock, Eye } from "lucide-react";
import { DEFAULT_LABELS } from "./default-labels";

export const TrackStats = memo(function TrackStats({
  duration,
  plays,
  compact,
  playsSuffix = DEFAULT_LABELS.playsSuffix,
}: {
  duration?: string | number | null;
  plays?: number | null;
  compact?: boolean;
  playsSuffix?: string;
}) {
  if (!duration && !plays) return null;

  const durationStr = duration != null ? duration.toString() : "-";
  const playsStr =
    plays != null
      ? compact
        ? `${(plays / 1000).toFixed(0)}K`
        : `${plays.toLocaleString()} ${playsSuffix}`
      : null;

  return (
    <div
      className={
        compact
          ? "hidden sm:flex items-center gap-2 text-gray-400 mr-6"
          : "flex items-center justify-between text-xs sm:text-sm"
      }
    >
      {duration != null && (
        <div
          className={
            compact
              ? "flex items-center space-x-1"
              : "flex items-center gap-1 sm:gap-2 text-gray-500"
          }
        >
          <Clock
            className={compact ? "w-4 h-4 mb-1" : "w-3 h-3 sm:w-4 sm:h-4"}
          />
          <span className="text-sm">{durationStr}</span>
        </div>
      )}
      {plays != null && (
        <div
          className={
            compact
              ? "flex items-center space-x-1"
              : "flex items-center gap-1 text-gray-500"
          }
        >
          <Eye className={compact ? "w-4 h-4" : "w-3 h-3 sm:w-4 sm:h-4"} />
          <span>{playsStr}</span>
        </div>
      )}
    </div>
  );
});
