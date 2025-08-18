"use client";

import React, { useRef, useState, useEffect } from "react";

import { ChevronLeft, Flame } from "lucide-react";
import { useTrendingTracks } from "@/hooks/useTrendingTracks";
import { Track } from "@/types/tracksType";
import { MusicCard } from "../MusicCard";
import { Button } from "../ui/button";

interface TrendingSectionProps {
  tracks: Track[];
  onPlayTrack: (track: Track) => void;
  onDownloadTrack?: (track: Track) => void;
}

export function TrendingSection({
  onPlayTrack,
  onDownloadTrack,
}: TrendingSectionProps) {
  const [visibleCount, setVisibleCount] = useState(5);
  const { data: trendingTracks = [] } = useTrendingTracks(visibleCount);
  const trendingSectionRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
    setShouldScroll(true);
  };

  useEffect(() => {
    if (shouldScroll) {
      trendingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [trendingTracks, shouldScroll]);

  return (
    <section className="space-y-8" ref={trendingSectionRef}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-4xl font-black text-white">
                داغ‌ترین‌ها
              </h2>
              <h3 className="text-gray-400">آهنگ‌های پرشنونده این هفته</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {trendingTracks.map((track) => (
          <MusicCard
            key={track.id}
            track={track}
            onPlay={onPlayTrack}
            onDownload={onDownloadTrack}
            variant="grid"
          />
        ))}
      </div>

      {trendingTracks.length >= visibleCount && (
        <div className="flex justify-center mt-6">
          <Button
            variant="ghost"
            onClick={handleLoadMore}
            className="text-purple-400 hover:text-white hover:bg-white/10 rounded-xl group transition-all duration-300"
          >
            نمایش بیشتر
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      )}
    </section>
  );
}
