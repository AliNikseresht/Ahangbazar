import React, { memo } from "react";
import { Button } from "../ui/button";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react";

interface MusicControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isRepeat: boolean;
  toggleRepeat: () => void;
  isShuffle: boolean;
  toggleShuffle: () => void;
}

export const MusicControls = memo(function MusicControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  isRepeat,
  toggleRepeat,
  isShuffle,
  toggleShuffle,
}: MusicControlsProps) {
  return (
    <div className="flex items-center space-x-2 sm:space-x-4">
      <Button variant="ghost" size="sm" onClick={toggleShuffle} className={isShuffle ? "text-purple-400" : "text-gray-400"}>
        <Shuffle className="w-4 h-4 sm:w-10 sm:h-10" />
      </Button>
      <Button variant="ghost" size="sm" onClick={onNext} className="text-gray-400">
        <SkipForward className="w-4 h-4 sm:w-10 sm:h-10" />
      </Button>
      <Button onClick={onPlayPause} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
        {isPlaying ? <Pause className="w-5 h-5 sm:w-10 sm:h-10 text-white" /> : <Play className="w-5 h-5 sm:w-10 sm:h-10 text-white" />}
      </Button>
      <Button variant="ghost" size="sm" onClick={onPrevious} className="text-gray-400">
        <SkipBack className="w-4 h-4 sm:w-10 sm:h-10" />
      </Button>
      <Button variant="ghost" size="sm" onClick={toggleRepeat} className={isRepeat ? "text-purple-400" : "text-gray-400"}>
        <Repeat className="w-4 h-4 sm:w-10 sm:h-10" />
      </Button>
    </div>
  );
});
