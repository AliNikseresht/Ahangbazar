"use client";

import { useMemo } from "react";
import { Heart, Pause, Play, Search } from "lucide-react";
import { SectionTitle } from "@/components/ahang/SectionTitle";
import { TrackRow } from "@/components/ahang/TrackRow";
import { copy, image } from "@/data/ahang";
import { GENRE_COLORS } from "@/lib/music/ui-utils";
import type { Artist, Category, Track } from "@/types";
import { usePlayer } from "@/context/PlayerContext";

type Props = {
  tracks: Track[];
  artists: Artist[];
  categories: Category[];
  onOpenSearch: () => void;
  onOpenArtist: (artist: Artist) => void;
};

export function HomeView({
  tracks,
  artists,
  categories,
  onOpenSearch,
  onOpenArtist,
}: Props) {
  const {
    language,
    current,
    currentId,
    playing,
    play,
    favorites,
    toggleFavorite,
  } = usePlayer();
  const t = copy[language];

  const artistCovers = useMemo(() => {
    const map = new Map<string, string>();
    for (const tr of tracks) {
      if (tr.art && tr.artist && !map.has(tr.artist)) {
        map.set(tr.artist, tr.art);
      }
    }
    return map;
  }, [tracks]);

  if (!current) return null;

  return (
    <>
      <div className="mobile-intro">
        <div>
          <p>{t.hello}</p>
          <h1>{t.intro}</h1>
        </div>
        <button onClick={onOpenSearch} aria-label="Search" type="button">
          <Search size={21} />
        </button>
      </div>

      <section className="hero">
        <img src={current.art || image.hero} alt={current.title} />
        <i className="shade" />
        <div className="hero-copy">
          <span className="eyebrow">{t.exclusive}</span>
          <h1>
            {language === "fa"
              ? current.faTitle || current.title
              : current.title}
          </h1>
          <p>
            {language === "fa"
              ? current.faArtist || current.artist
              : current.artist}
          </p>
          <div>
            <button
              className="primary"
              type="button"
              onClick={() => play(current.id)}
            >
              {playing && currentId === current.id ? (
                <Pause size={17} fill="currentColor" />
              ) : (
                <Play size={17} fill="currentColor" />
              )}
              {t.listen}
            </button>
            <button
              className="secondary"
              type="button"
              onClick={() => toggleFavorite(current.id)}
            >
              <Heart
                size={17}
                fill={
                  favorites.includes(current.id) ? "currentColor" : "none"
                }
              />
              {t.save}
            </button>
          </div>
        </div>
        <small>01 / {String(tracks.length).padStart(2, "0")}</small>
      </section>

      <section className="content-section">
        <SectionTitle title={t.artists} action={t.see} />
        <div className="artist-row">
          {artists.map((artist) => (
            <button
              key={artist.id}
              type="button"
              onClick={() => onOpenArtist(artist)}
            >
              <img
                src={
                  artist.coverUrl ||
                  artistCovers.get(artist.name) ||
                  image.hero
                }
                alt={artist.name}
              />
              <b>
                {language === "fa"
                  ? artist.faName || artist.name
                  : artist.name}
              </b>
              <small>Artist</small>
            </button>
          ))}
        </div>
      </section>

      <section className="split">
        <div>
          <SectionTitle title={t.releases} action={t.see} />
          {tracks.slice(0, 5).map((track, i) => (
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
        <article className="editorial">
          <img src={tracks[1]?.art || image.dusk} alt="Featured" />
          <div>
            <span>EDITOR&apos;S NOTE</span>
            <h2>{t.curated}</h2>
            <p>Slow-burning songs for when the city finally softens.</p>
            <button
              type="button"
              onClick={() => tracks[1] && play(tracks[1].id)}
            >
              <Play size={18} fill="currentColor" />
            </button>
          </div>
        </article>
      </section>

      <section className="content-section genres">
        <SectionTitle title={t.genres} action={t.see} />
        <div className="genre-row">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              type="button"
              style={
                {
                  "--genre": GENRE_COLORS[i % GENRE_COLORS.length],
                } as React.CSSProperties
              }
            >
              <small>{String(i + 1).padStart(2, "0")}</small>
              <b>{cat.name}</b>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}