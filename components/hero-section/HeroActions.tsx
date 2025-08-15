import { Play, Heart, Download, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { FeaturedTrack } from "@/types/heroSectionType";
import { useState, useEffect } from "react";
import { supabase } from "@/libs/supabase/supabaseClient";

interface HeroActionsProps {
  track: FeaturedTrack;
  onPlay?: (track: FeaturedTrack) => void;
}

export function HeroActions({ track, onPlay }: HeroActionsProps) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(track.favorites > 0);
  }, [track]);

  const toggleFavorite = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    const currentFavorites = track.favorites ?? 0;

    try {
      const { error } = await supabase
        .from("songs")
        .update({
          favorites: newLikedState
            ? currentFavorites + 1
            : Math.max(currentFavorites - 1, 0),
        })
        .eq("id", track.id);

      if (error) {
        console.error("Failed to update favorite:", error);
        setIsLiked(!newLikedState);
      } else {
        track.favorites = newLikedState
          ? currentFavorites + 1
          : Math.max(currentFavorites - 1, 0);
      }
    } catch (err) {
      console.error(err);
      setIsLiked(!newLikedState);
    }
  };

  const handleDownload = async () => {
    if (!track.audio) {
      alert("فایل دانلود ندارد");
      return;
    }

    try {
      const response = await fetch(track.audio);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${track.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("دانلود انجام نشد");
    }
  };

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
        onClick={toggleFavorite}
        className={`border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 rounded-2xl px-8 py-4 transition-all duration-300 ${
          isLiked ? "fill-pink-400 text-pink-400" : ""
        }`}
      >
        <Heart className="w-5 h-5 ml-2" />
        علاقه‌مندی
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={handleDownload}
        className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 rounded-2xl px-6 py-4 transition-all duration-300"
      >
        <Download className="w-5 h-5" />
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
