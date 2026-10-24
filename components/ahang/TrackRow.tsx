"use client";

import type { Language, Track } from "@/types";
import { image } from "@/data/ahang";

type Props = {
  track: Track;
  language: Language;
  index?: number;
  play: () => void;
  current?: boolean;
};

export function TrackRow({ track, language, index, play, current }: Props) {
  const title = language === "fa" ? track.faTitle || track.title : track.title;
  const artist =
    language === "fa" ? track.faArtist || track.artist : track.artist;

  return (
    <button
      type="button"
      className={`track-row ${current ? "current" : ""}`}
      onClick={play}
    >
      {typeof index === "number" && (
        <span className="track-index">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <img src={track.art || image.hero} alt="" />
      <span className="track-meta">
        <b>{title}</b>
        <small>{artist}</small>
      </span>
    </button>
  );
}
