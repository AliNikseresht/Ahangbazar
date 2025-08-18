"use client";

import { HeroBadges } from "./hero-section/HeroBadges";
import { HeroStats } from "./hero-section/HeroStats";
import { HeroActions } from "./hero-section/HeroActions";
import { AlbumArt } from "./hero-section/AlbumArt";
import { useHeroCarousel } from "@/hooks/useHeroCarousel";
import { BACKGROUND_BLUR, BACKGROUND_SCALE } from "./hero-section/hero";
import { Track } from "@/types/tracksType";

interface HeroSectionProps {
  onPlay?: (track: Track) => void;
  tracks?: Track[];
}

export function HeroSection({ onPlay, tracks }: HeroSectionProps) {
  const { currentTrack, handlePlay } = useHeroCarousel(tracks, onPlay);

  if (!currentTrack) return null;

  return (
    <section className="relative md:min-h-screen flex md:items-center justify-center overflow-hidden">
      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${currentTrack.cover})`,
          filter: `blur(${BACKGROUND_BLUR}px)`,
          transform: `scale(${BACKGROUND_SCALE})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/60 to-slate-900/80" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8">
            <HeroBadges track={currentTrack} />
            <div className="space-y-2 lg:space-y-4">
              <h2 className="text-lg md:text-xl lg:text-4xl font-black leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  {currentTrack.title}
                </span>
              </h2>
              <h3 className="text-base md:text-2xl text-gray-300">
                اثری از{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                  {currentTrack.artist}
                </span>
              </h3>
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
    </section>
  );
}
