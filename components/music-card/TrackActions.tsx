import React, { memo, useCallback } from "react";
import { Download, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Track } from "@/types/tracksType";
import { MusicCardTypes } from "@/types/MusicCardTypes";
import { DEFAULT_LABELS } from "./default-labels";


export const TrackActions = memo(function TrackActions({
  onDownload,
  track,
  labels,
}: {
  onDownload?: (t: Track) => void;
  track: Track;
  labels?: MusicCardTypes["labels"];
}) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };

  const handleDownload = useCallback(() => onDownload?.(track), [onDownload, track]);

  return (
    <div className="flex items-center space-x-1 sm:space-x-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2">
      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-green-400 rounded-full w-8 h-8" onClick={handleDownload} aria-label="Download">
        <Download className="w-4 h-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white rounded-full w-8 h-8" aria-label="More actions">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl">
          <DropdownMenuItem>{mergedLabels.addToPlaylist}</DropdownMenuItem>
          <DropdownMenuItem>{mergedLabels.share}</DropdownMenuItem>
          <DropdownMenuItem>{mergedLabels.viewArtist}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
