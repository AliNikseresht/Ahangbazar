"use client";

import { HeroSection } from "@/components/HeroSection";
import { Header } from "@/components/layout/Header";
import { MusicPlayer } from "@/components/MusicPlayer";
import { MusicSections } from "@/components/MusicSections";
import { Toaster } from "@/components/ui/sonner";
import { useRecentTracks } from "@/hooks/useRecentTracks";
import { useTrendingTracks } from "@/hooks/useTrendingTracks";
import { Track } from "@/types/tracksType";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function App() {
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>(
    undefined
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trackList, setTrackList] = useState<Track[]>([]);

  const { data: trendingTracks = [] } = useTrendingTracks(10);
  const { data: recentTracks = [] } = useRecentTracks();

  const handlePlayTrack = (track: Track) => {
    const index = trackList.findIndex((t) => t.id === track.id);
    if (index === -1) return;
    setCurrentIndex(index);
    setCurrentTrack(trackList[index]);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = (isShuffle = false) => {
    if (!trackList.length) return;
    const nextIndex = isShuffle
      ? Math.floor(Math.random() * trackList.length)
      : (currentIndex + 1) % trackList.length;

    setCurrentIndex(nextIndex);
    setCurrentTrack(trackList[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!trackList.length) return;
    const prevIndex = (currentIndex - 1 + trackList.length) % trackList.length;
    setCurrentIndex(prevIndex);
    setCurrentTrack(trackList[prevIndex]);
    setIsPlaying(true);
  };

  const handleDownload = async (track: Track) => {
    if (!track.audio) return;

    try {
      const response = await fetch(track.audio);
      if (!response.ok) throw new Error("Failed to download");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = track.title + ".mp3";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast("خطا در دانلود فایل");
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      toast.success(`جستجو برای: ${query}`);
    }
  };

  const handleUpload = () => {
    toast.info("صفحه آپلود موزیک به زودی...");
  };

  useEffect(() => {
    const newList = [...recentTracks, ...trendingTracks];
    const isEqual =
      newList.length === trackList.length &&
      newList.every((t, i) => t.id === trackList[i].id);

    if (!isEqual) {
      setTrackList(newList);
    }
  }, [recentTracks, trendingTracks, trackList]);

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
        onNext={() => handleNext(false)}
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
