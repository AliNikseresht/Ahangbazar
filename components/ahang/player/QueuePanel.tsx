"use client";

import { X } from "lucide-react";
import { IconButton } from "@/components/ahang/IconButton";
import { TrackRow } from "@/components/ahang/TrackRow";
import { copy, image } from "@/data/ahang";
import type { Track } from "@/types";
import { usePlayer } from "@/context/PlayerContext";

type Props = {
  tracks: Track[];
  onClose: () => void;
};

export function QueuePanel({ tracks, onClose }: Props) {
  const { language, current, play } = usePlayer();
  const t = copy[language];

  if (!current) return null;

  return (
    <aside className="queue">
      <header>
        <div>
          <span>{t.now}</span>
          <h2>{t.queue}</h2>
        </div>
        <IconButton label="Close" onClick={onClose}>
          <X size={20} />
        </IconButton>
      </header>
      <div className="queue-current">
        <img src={current.art || image.hero} alt="" />
        <div>
          <span>{t.now}</span>
          <b>
            {language === "fa"
              ? current.faTitle || current.title
              : current.title}
          </b>
          <small>
            {language === "fa"
              ? current.faArtist || current.artist
              : current.artist}
          </small>
        </div>
      </div>
      <div className="queue-label">
        <b>{t.queue}</b>
        <small>{t.drag}</small>
      </div>
      {tracks
        .filter((x) => x.id !== current.id)
        .map((track, i) => (
          <TrackRow
            key={track.id}
            track={track}
            language={language}
            index={i}
            play={() => play(track.id)}
          />
        ))}
    </aside>
  );
}