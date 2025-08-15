import { Play, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { FeaturedTrack } from "@/types/heroSectionType";

interface HeroActionsProps {
  track: FeaturedTrack;
  onPlay?: (track: FeaturedTrack) => void;
}

export function HeroActions({ track, onPlay }: HeroActionsProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <Button
        onClick={() => onPlay?.(track)}
        size="lg"
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-2xl px-8 py-4 shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 text-lg"
      >
        <Play className="w-6 h-6 ml-2" />
        پخش آهنگ
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 rounded-2xl px-6 py-4 transition-all duration-300"
      >
        <Share2 className="w-5 h-5" />
      </Button>
    </div>
  );
}
