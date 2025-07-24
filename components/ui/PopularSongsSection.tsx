"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Download, Pause, Play } from "lucide-react";
import { useSongs } from "@/hooks/useSongs";
import { supabase } from "@/libs/supabase/supabaseClient";
import AudioPlayer from "./AudioPlayer";

type Song = {
  id: string;
  title: string;
  artist_id: string;
  album: string;
  storage_path: string;
  cover_image_url?: string;
};

export function getPublicCoverUrl(path: string) {
  const cleanPath = path.replace(/^music-files\//, "");
  const { data } = supabase.storage.from("music-files").getPublicUrl(cleanPath);
  return data?.publicUrl || "/ahangbazar-logo.png";
}

export function getPublicAudioUrl(path: string) {
  const cleanPath = path.replace(/^music-files\//, "");
  const { data } = supabase.storage.from("music-files").getPublicUrl(cleanPath);
  return data?.publicUrl || "";
}

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
  onPause: () => void;
}

const SongCard = ({ song, isPlaying, onPlay, onPause }: SongCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg flex flex-col items-center text-center shadow-sm hover:shadow-md transition">
      <Image
        src={getPublicCoverUrl(song.cover_image_url || "")}
        alt={song.title}
        width={120}
        height={120}
        className="w-full h-auto mb-1.5 object-contain rounded-t"
      />

      <h3 className="font-bold text-sm p-2">{song.title}</h3>
      <div className="flex items-center gap-3 mt-3 justify-between w-full p-2">
        <div className="flex items-center gap-1">
          <a
            href={getPublicAudioUrl(song.storage_path)}
            download
            className="p-1 hover:scale-110 transition"
          >
            <Download color="#08aadb" />
          </a>

          <button
            className="hover:scale-110 transition cursor-pointer"
            onClick={() => (isPlaying ? onPause() : onPlay(song))}
          >
            {isPlaying ? (
              <Pause size={20} color="#ff3b3b" />
            ) : (
              <Play size={20} color="#40ad6d" />
            )}
          </button>
        </div>
        <p className="text-gray-600 text-sm">{song.album}</p>
      </div>
    </div>
  );
};

const PopularSongsSection = () => {
  const { data: songs, isLoading, isError } = useSongs("");
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const handlePlay = (song: Song) => {
    setCurrentSong(song);
  };

  const handlePause = () => {
    setCurrentSong(null);
  };

  const handleNextSong = (nextSong: {
    title: string;
    storage_path: string;
  }) => {
    const nextFullSong = songs?.find(
      (s) => s.storage_path === nextSong.storage_path
    );
    if (nextFullSong) setCurrentSong(nextFullSong);
  };

  const songsList = songs
    ? songs.map((song) => ({
        title: song.title,
        storage_path: song.storage_path,
      }))
    : [];

  if (isLoading) {
    return (
      <div className="w-full p-5 text-center text-gray-500">
        <div className="loading loading-bars"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full p-5 text-center text-red-500">
        خطایی در دریافت داده‌ها رخ داده است.
      </div>
    );
  }

  return (
    <div className="w-full shadow rounded-xl p-5 flex flex-col gap-4 border border-gray-200">
      <AudioPlayer
        currentSong={currentSong}
        onPause={handlePause}
        songsList={songsList}
        onNextSong={handleNextSong}
      />

      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl font-semibold">برترین آهنگ ها</h2>
        <Link href="/all-tops" className="text-blue-600 hover:underline">
          مشاهده همه
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {songs?.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={currentSong?.id === song.id}
            onPlay={handlePlay}
            onPause={handlePause}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularSongsSection;
