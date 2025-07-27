"use client";

import React, { useState } from "react";
import { useSongs } from "@/hooks/useSongs";
import AudioPlayer from "./AudioPlayer";
import { SongCard } from "./SongCard";

type Song = {
  id: string;
  title: string;
  artist_id: string;
  album: string;
  storage_path: string;
  cover_image_url?: string;
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
    <div className="w-full flex flex-col gap-1.5 lg:gap-3">
      <h2 className="text-xl font-semibold">برترین آهنگ ها</h2>
      <div className="w-full h-[400px] overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-2">
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
      <AudioPlayer
        currentSong={currentSong}
        onPause={handlePause}
        songsList={songsList}
        onNextSong={handleNextSong}
      />
    </div>
  );
};

export default PopularSongsSection;
