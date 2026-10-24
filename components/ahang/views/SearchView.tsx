"use client";

import { Search } from "lucide-react";
import { SectionTitle } from "@/components/ahang/SectionTitle";
import { TrackRow } from "@/components/ahang/TrackRow";
import { copy } from "@/data/ahang";
import type { Track } from "@/types";
import { usePlayer } from "@/context/PlayerContext";

type Props = {
  results: Track[];
};

export function SearchView({ results }: Props) {
  const { language, currentId, play } = usePlayer();
  const t = copy[language];

  return (
    <section className="subpage">
      <div className="page-title">
        <span className="eyebrow">{t.explore}</span>
        <h1>{t.searchTitle}</h1>
        <p>{t.searchBody}</p>
      </div>
      <div className="results">
        <SectionTitle
          title={t.results}
          action={`${results.length} results`}
        />
        {results.length ? (
          results.map((track, i) => (
            <TrackRow
              key={track.id}
              track={track}
              language={language}
              index={i}
              play={() => play(track.id)}
              current={track.id === currentId}
            />
          ))
        ) : (
          <div className="empty">
            <Search size={28} />
            <h2>No music found</h2>
            <p>Try an artist, track, album, or another spelling.</p>
          </div>
        )}
      </div>
    </section>
  );
}