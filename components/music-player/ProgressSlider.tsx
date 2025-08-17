import React, { memo } from "react";
import { Slider } from "../ui/slider";

interface ProgressSliderProps {
  progress: number;
  onChange: (v: number) => void;
  currentTime: string;
  duration: string;
}

export const ProgressSlider = memo(function ProgressSlider({ progress, onChange, currentTime, duration }: ProgressSliderProps) {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-96">
      <span className="text-xs sm:text-sm text-gray-400 font-mono">{currentTime}</span>
      <Slider value={[progress]} onValueChange={(v) => onChange(v[0])} max={100} step={1} className="flex-1" />
      <span className="text-xs sm:text-sm text-gray-400 font-mono">{duration}</span>
    </div>
  );
});
