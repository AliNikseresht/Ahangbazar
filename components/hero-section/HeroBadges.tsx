import { FeaturedTrack } from "@/types/heroSectionType";
import { Badge } from "../ui/badge";
import { TrendingUp, Headphones, Volume2 } from "lucide-react";

interface HeroBadgesProps {
  track: FeaturedTrack;
}

export function HeroBadges({ track }: HeroBadgesProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3">
      <Badge className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-white border border-purple-400/30 rounded-full hover:bg-purple-500/30 transition-all duration-300">
        <TrendingUp className="w-3 h-3 md:w-4 md:h-4 ml-1" />
        #1 در چارت
      </Badge>
      <Badge className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm text-white border border-cyan-400/30 rounded-full hover:bg-cyan-500/30 transition-all duration-300">
        <Headphones className="w-3 h-3 md:w-4 md:h-4 ml-1" />
        {track.genre}
      </Badge>
      <Badge className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm text-white border border-green-400/30 rounded-full hover:bg-green-500/30 transition-all duration-300">
        <Volume2 className="w-3 h-3 md:w-4 md:h-4 ml-1" />
        Hi-Fi کیفیت
      </Badge>
    </div>
  );
}
