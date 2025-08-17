import React, { memo } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PlayIconButton = memo(function PlayIconButton({
  isPlaying,
  onClick,
  size = "default",
  className,
}: {
  isPlaying?: boolean;
  onClick: () => void;
  size?: "default" | "sm";
  className?: string;
}) {
  const iconSize = size === "sm" ? "w-4 h-4 sm:w-5 sm:h-5" : "w-6 h-6 sm:w-7 sm:h-7";
  const btnSize = size === "sm" ? "w-9 h-9 sm:w-10 sm:h-10" : "w-12 h-12 sm:w-16 sm:h-16";

  return (
    <Button
      variant="ghost"
      size={size === "sm" ? "icon" : undefined}
      onClick={onClick}
      aria-label={isPlaying ? "Pause" : "Play"}
      className={[
        className,
        btnSize,
        size === "sm"
          ? "text-white hover:text-white hover:bg-white/20 rounded-full"
          : "rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xl sm:shadow-2xl backdrop-blur-sm border border-white/20 hover:scale-110 transition-all duration-300",
      ].filter(Boolean).join(" ")}
    >
      {isPlaying ? (
        <Pause className={`${iconSize} text-white`} />
      ) : (
        <Play className={`${iconSize} text-white ml-0.5`} />
      )}
    </Button>
  );
});
