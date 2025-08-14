"use client";

import { HeroSection } from "@/components/HeroSection";
import { Header } from "@/components/layout/Header";
import { MusicPlayer } from "@/components/MusicPlayer";
import { MusicSections } from "@/components/MusicSections";
import { Toaster } from "@/components/ui/sonner";
import React, { useState } from "react";
import { toast } from "sonner";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  plays?: number;
  isPlaying?: boolean;
}

export default function App() {
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>(
    undefined
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
    toast.success(`در حال پخش: ${track.title}`, {
      description: track.artist,
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    toast.info("آهنگ بعدی");
  };

  const handlePrevious = () => {
    toast.info("آهنگ قبلی");
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      toast.success(`جستجو برای: ${query}`);
    }
  };

  const handleUpload = () => {
    toast.info("صفحه آپلود موزیک به زودی...");
  };

  const handleDownload = (track: Track) => {
    toast.success(`در حال دانلود: ${track.title}`);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden"
      dir="rtl"
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Header onSearch={handleSearch} onUpload={handleUpload} />

      <main className="pb-24 relative z-10">
        <HeroSection onPlay={handlePlayTrack} />
        <MusicSections
          onPlayTrack={handlePlayTrack}
          onDownloadTrack={handleDownload}
          currentTrack={currentTrack}
        />
      </main>

      <MusicPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      <Toaster position="top-center" richColors />

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
