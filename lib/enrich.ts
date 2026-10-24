import { Track } from "@/types";
import type { Artist } from "./artists";

const key = (s: string) => s.toLowerCase().replace(/[-_]/g, " ").trim();

export function enrichTracks(tracks: Track[], artists: Artist[]): Track[] {
  const cover = new Map<string, string>();
  const fa = new Map<string, string>();
  for (const a of artists) {
    if (a.coverUrl) cover.set(key(a.name), a.coverUrl);
    if (a.faName) fa.set(key(a.name), a.faName);
  }
  return tracks.map((t) => ({
    ...t,
    art: t.art || cover.get(key(t.artist)) || null,
    faArtist: t.faArtist || fa.get(key(t.artist)) || null,
  }));
}
