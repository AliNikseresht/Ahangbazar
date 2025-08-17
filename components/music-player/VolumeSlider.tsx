import React, { memo } from "react";
import { Button } from "../ui/button";
import { Volume2, MoreHorizontal } from "lucide-react";
import { Slider } from "../ui/slider";

interface VolumeSliderProps {
  volume: number;
  onVolumeChange: (v: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

export const VolumeSlider = memo(function VolumeSlider({ volume, onVolumeChange, toggleMute }: VolumeSliderProps) {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3 mt-2 sm:mt-0 w-74 sm:w-44">
      <Button variant="ghost" size="sm" onClick={toggleMute} className="text-gray-400">
        <Volume2 className="w-4 h-4 sm:w-10 sm:h-10" />
      </Button>
      <Slider value={[volume]} onValueChange={(v) => onVolumeChange(v[0])} max={100} step={1} className="flex-1 sm:w-24" />
      <Button variant="ghost" size="sm" className="text-gray-400">
        <MoreHorizontal className="w-4 h-4 sm:w-10 sm:h-10" />
      </Button>
    </div>
  );
});
