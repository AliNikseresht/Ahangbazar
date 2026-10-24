"use client";

import { Heart, Play } from "lucide-react";
import { TrackRow } from "@/components/ahang/TrackRow";
import { copy, image } from "@/data/ahang";
import type { Track } from "@/types";
import { usePlayer } from "@/context/PlayerContext";

type Props = {
  tracks: Track[];
};

export function LibraryView({ tracks }: Props) {
  const { language, currentId, play, favorites } = usePlayer();
  const t = copy[language];
  const favTracks = tracks.filter((x) => favorites.includes(x.id));

  return (
    <section className="subpage">
      <div className="page-title">
        <span className="eyebrow">{t.library}</span>
        <h1>{t.libraryTitle}</h1>
        <p>{favorites.length} saved tracks</p>
      </div>
      <div className="tabs">
        <button className="active" type="button">
          {t.favorites}
        </button>
        <button type="button">{t.playlists}</button>
        <button type="button">{t.albums}</button>
      </div>
      <div className="library-hero">
        <div className="collage">
          {(favTracks.length ? favTracks : tracks)
            .slice(0, 4)
            .map((x) => (
              <img key={x.id} src={x.art || image.hero} alt="" />
            ))}
          <Heart size={28} fill="currentColor" />
        </div>
        <div>
          <span>{t.playlists}</span>
          <h2>{t.favorites}</h2>
          <p>{favorites.length} tracks</p>
          <button
            className="primary"
            type="button"
            onClick={() => (favorites[0] ? play(favorites[0]) : undefined)}
            disabled={!favorites.length}
          >
            <Play size={17} fill="currentColor" />
            {t.listen}
          </button>
        </div>
      </div>
      <div className="library-list">
        {favTracks.map((track, i) => (
          <TrackRow
            key={track.id}
            track={track}
            language={language}
            index={i}
            play={() => play(track.id)}
            current={track.id === currentId}
          />
        ))}
      </div>
    </section>
  );
}