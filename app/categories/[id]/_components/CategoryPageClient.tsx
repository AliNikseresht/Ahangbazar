"use client";

import React, { useState, useEffect } from "react";
import { Track } from "@/types/tracksType";
import MusicCardList from "./MusicCardList";
import { MusicPlayer } from "@/components/music-player/MusicPlayer";
import { downloadTrack } from "@/utils/downloadTrack";
import { getAudioUrl } from "@/utils/getAudioUrl";

interface CategoryPageClientProps {
  tracks: Track[];
  categoryName: string;
}

export default function CategoryPageClient({
  tracks,
  categoryName,
}: CategoryPageClientProps) {
  const [trackList, _setTrackList] = useState<Track[]>(tracks);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (trackList.length) {
      const track = trackList[currentIndex];
      setCurrentTrack({ ...track, audio: getAudioUrl(track) });
    }
  }, [trackList, currentIndex]);

  const handlePlayTrack = (track: Track) => {
    const index = trackList.findIndex((t) => t.id === track.id);
    if (index === -1) return;
    setCurrentIndex(index);
    setCurrentTrack({ ...track, audio: getAudioUrl(track) });
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (!trackList.length) return;
    const nextIndex = (currentIndex + 1) % trackList.length;
    setCurrentIndex(nextIndex);
    setCurrentTrack({
      ...trackList[nextIndex],
      audio: getAudioUrl(trackList[nextIndex]),
    });
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!trackList.length) return;
    const prevIndex = (currentIndex - 1 + trackList.length) % trackList.length;
    setCurrentIndex(prevIndex);
    setCurrentTrack({
      ...trackList[prevIndex],
      audio: getAudioUrl(trackList[prevIndex]),
    });
    setIsPlaying(true);
  };

  const handleDownloadTrack = (track: Track) => {
    downloadTrack({ ...track, audio: getAudioUrl(track) });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-extrabold text-white">دسته‌بندی {categoryName}</h1>
      <h2 className="text-lg text-gray-400">آهنگ‌های این دسته‌بندی</h2>

      {trackList.length ? (
        <MusicCardList
          tracks={trackList}
          onPlayTrack={handlePlayTrack}
          onDownloadTrack={handleDownloadTrack}
        />
      ) : (
        <p className="text-center text-gray-400 mt-6">
          موردی برای نمایش وجود ندارد.
        </p>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 backdrop-blur-lg z-50">
        <MusicPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  );
}
