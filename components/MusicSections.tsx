"use client";

import { Track } from "@/types/tracksType";

import {
  TrendingSection,
  CategoriesSection,
  RecentPopularSection,
} from "./music-sections";
import { Category } from "@/types/categoryType";

interface MusicSectionsProps {
  onPlayTrack: (track: Track) => void;
  onDownloadTrack?: (track: Track) => void;
  currentTrack?: Track;
  trendingTracks: Track[];
  recentTracks: Track[];
  categories: Category[];
}

export function MusicSections({
  onPlayTrack,
  onDownloadTrack,
  trendingTracks,
  recentTracks,
  categories,
}: MusicSectionsProps) {
  return (
    <div className="container mx-auto px-6 space-y-20 md:mt-16">
      <TrendingSection
        tracks={trendingTracks}
        onPlayTrack={onPlayTrack}
        onDownloadTrack={onDownloadTrack}
      />

      <CategoriesSection
        categories={categories}
        isLoading={categories.length === 0}
      />

      <RecentPopularSection
        recentTracks={recentTracks}
        trendingTracks={trendingTracks}
        onPlayTrack={onPlayTrack}
        onDownloadTrack={onDownloadTrack}
      />
    </div>
  );
}
