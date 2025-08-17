"use client";

import { useTrendingTracks } from "@/hooks/useTrendingTracks";
import { useRecentTracks } from "@/hooks/useRecentTracks";
import { useCategories } from "@/hooks/useCategories";
import { Track } from "@/types/tracksType";

import {
  TrendingSection,
  CategoriesSection,
  RecentPopularSection,
} from "./music-sections";

interface MusicSectionsProps {
  onPlayTrack: (track: Track) => void;
  onDownloadTrack?: (track: Track) => void;
  currentTrack?: Track;
}

export function MusicSections({
  onPlayTrack,
  onDownloadTrack,
}: MusicSectionsProps) {
  const { data: trendingTracks = [] } = useTrendingTracks();
  const { data: recentTracks = [] } = useRecentTracks();
  const { data: categories = [] } = useCategories();

  return (
    <div className="container mx-auto px-6 pt-20 pb-36 md:pb-0 md:pt-0 space-y-20 md:mt-16">
      <TrendingSection
        tracks={trendingTracks}
        onPlayTrack={onPlayTrack}
        onDownloadTrack={onDownloadTrack}
      />

      <CategoriesSection categories={categories} />

      <RecentPopularSection
        recentTracks={recentTracks}
        trendingTracks={trendingTracks}
        onPlayTrack={onPlayTrack}
        onDownloadTrack={onDownloadTrack}
      />
    </div>
  );
}
