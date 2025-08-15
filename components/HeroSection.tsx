"use client";

import React, { useEffect, useState, useCallback } from "react";
import { HeroBadges } from "./hero-section/HeroBadges";
import { HeroStats } from "./hero-section/HeroStats";
import { HeroActions } from "./hero-section/HeroActions";
import { AlbumArt } from "./hero-section/AlbumArt";
import { MusicPlayer } from "./music-player/MusicPlayer";
import { useTrendingTracks } from "@/hooks/useTrendingTracks";
import { FeaturedTrack } from "@/types/heroSectionType";
import { Track } from "@/types/tracksType";

interface HeroSectionProps {
  onPlay?: (track: Track) => void;
}

export function HeroSection({ onPlay }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<FeaturedTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoSlide, setAutoSlide] = useState(true);

  const { data } = useTrendingTracks();
  const tracks = data as Track[] | undefined;

  useEffect(() => {
    if (!tracks || tracks.length === 0) return;
    const track = tracks[currentIndex];
    if (!track) return;

    setCurrentTrack({
      ...track,
      plays: track.plays ?? 0,
      genre: "Unknown",
      rating: 0,
    });
  }, [currentIndex, tracks]);

  useEffect(() => {
    if (!tracks || tracks.length === 0 || !autoSlide) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tracks.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [tracks, autoSlide]);

  const handlePlay = useCallback(
    (track?: FeaturedTrack) => {
      setIsPlaying(true);
      setAutoSlide(false);
      if (track) setCurrentTrack(track);
      if (onPlay && track) {
        onPlay(track);
      }
    },
    [onPlay]
  );

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    if (!tracks || tracks.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
  }, [tracks]);

  const handlePrevious = useCallback(() => {
    if (!tracks || tracks.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  }, [tracks]);

  if (!currentTrack) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${currentTrack.cover})`,
          filter: "blur(20px)",
          transform: "scale(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/60 to-slate-900/80" />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8">
            <HeroBadges track={currentTrack} />
            <div className="space-y-2 lg:space-y-4">
              <h1 className="text-xl md:text-xl lg:text-5xl font-black leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  {currentTrack.title}
                </span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-300">
                اثری از{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                  {currentTrack.artist}
                </span>
              </p>
            </div>
            <HeroStats track={currentTrack} />
            <HeroActions
              track={currentTrack}
              onPlay={() => handlePlay(currentTrack)}
            />
          </div>
          <AlbumArt
            track={currentTrack}
            onPlay={() => handlePlay(currentTrack)}
          />
        </div>
      </div>

      <MusicPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </section>
  );
}
