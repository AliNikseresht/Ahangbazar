"use client";

import { useMemo } from "react";
import type { Artist, Track } from "@/types";
import { normalizeText } from "@/lib/music/ui-utils";

export function useTrackSearch(
  tracks: Track[],
  artists: Artist[],
  query: string,
  limit = 8,
) {
  const artistFa = useMemo(() => {
    const m = new Map<string, string>();
    for (const a of artists) {
      if (a.faName) m.set(normalizeText(a.name), a.faName);
    }
    return m;
  }, [artists]);

  const results = useMemo(() => {
    const q = normalizeText(query);
    if (!q) return tracks.slice(0, limit);
    return tracks.filter((track) =>
      [
        track.title,
        track.faTitle,
        track.artist,
        track.faArtist,
        artistFa.get(normalizeText(track.artist)),
      ]
        .filter(Boolean)
        .some((v) => normalizeText(String(v)).includes(q)),
    );
  }, [query, tracks, artistFa, limit]);

  return { results, artistFa };
}