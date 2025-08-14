import { HeroSectionProps } from "@/types/heroSectionType";
import React from "react";
import { HeroBadges } from "./hero-section/HeroBadges";
import { HeroStats } from "./hero-section/HeroStats";
import { HeroActions } from "./hero-section/HeroActions";
import { AlbumArt } from "./hero-section/AlbumArt";

export function HeroSection({ featuredTrack, onPlay }: HeroSectionProps) {
  const defaultTrack = {
    id: "1",
    title: "نور شب",
    artist: "ستاره موسیقی",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop",
    genre: "پاپ الکترونیک",
    plays: 2750000,
    rating: 4.9,
    duration: "4:32",
  };

  const track = featuredTrack || defaultTrack;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${track.cover})`,
          filter: "blur(20px)",
          transform: "scale(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/60 to-slate-900/80" />
      <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-60" />
      <div className="absolute top-40 right-32 w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-40" />
      <div className="absolute bottom-32 left-16 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-50" />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8">
            <HeroBadges track={track} />
            <div className="space-y-2 lg:space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  {track.title}
                </span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-300">
                اثری از{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                  {track.artist}
                </span>
              </p>
            </div>
            <HeroStats track={track} />
            <HeroActions track={track} onPlay={onPlay} />
          </div>
          <AlbumArt track={track} onPlay={onPlay} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 fill-slate-900"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
