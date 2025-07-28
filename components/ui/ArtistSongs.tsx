"use client";

import React, { useState } from "react";
import { SongCard } from "./SongCard";
import { Song } from "@/types/song";

interface ArtistSongsProps {
  songs: Song[];
}

export default function ArtistSongs({ songs }: ArtistSongsProps) {
  const [activeSongId, setActiveSongId] = useState<string | null>(null);
  const [activePopupId, setActivePopupId] = useState<string | null>(null);

  const handlePlay = (song: Song) => {
    setActiveSongId(song.id);
  };

  return (
    <div>
      <h2>آهنگ‌ها:</h2>
      {songs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-2">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              isPlaying={activeSongId === song.id}
              onPlay={handlePlay}
              activePopupId={activePopupId}
              setActivePopupId={setActivePopupId}
            />
          ))}
        </div>
      ) : (
        <p>آهنگی موجود نیست</p>
      )}
    </div>
  );
}
