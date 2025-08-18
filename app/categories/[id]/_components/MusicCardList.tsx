"use client";

import MusicCard from "@/components/MusicCard";
import { Track } from "@/types/tracksType";

interface MusicCardListProps {
  tracks: Track[];
  onPlayTrack: (track: Track) => void;
  onDownloadTrack?: (track: Track) => void;
}

export default function MusicCardList({
  tracks,
  onPlayTrack,
  onDownloadTrack,
}: MusicCardListProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl gap-3 p-3 flex flex-col border border-white/10 rounded-2xl overflow-hidden">
      {tracks.map((track, index) => (
        <div key={track.id}>
          <MusicCard
            track={track}
            variant="list"
            onPlay={onPlayTrack}
            onDownload={onDownloadTrack}
          />
          {index < tracks.length - 1 && (
            <div className="border-b border-white/5 mx-4 sm:mx-6" />
          )}
        </div>
      ))}
    </div>
  );
}
