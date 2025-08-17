import React, { memo } from "react";
import { TrendingUp } from "lucide-react";
import { DEFAULT_LABELS } from "./default-labels";

export const TrendingBadge = memo(function TrendingBadge({
  visible,
  label = DEFAULT_LABELS.trending,
}: {
  visible: boolean;
  label?: string;
}) {
  if (!visible) return null;
  return (
    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1">
        <TrendingUp className="w-3 h-3" />
        {label}
      </div>
    </div>
  );
});
