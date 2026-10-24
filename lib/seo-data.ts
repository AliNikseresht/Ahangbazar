import { cacheLife } from "next/cache";
import { getArtists } from "./artists";
import { enrichTracks } from "./enrich";
import { getTracks } from "./tracks";

export async function getAllArtists() {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 86400 });
  return getArtists(500);
}

export async function getAllTracks() {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 86400 });
  const [tracks, artists] = await Promise.all([
    getTracks(1000),
    getArtists(500),
  ]);
  return enrichTracks(tracks, artists);
}

export const normalizeName = (s: string) =>
  s.toLowerCase().replace(/[-_]/g, " ").trim();

// "3:42" -> "PT3M42S"
export function toIsoDuration(time: string): string | undefined {
  const p = String(time).split(":").map(Number);
  if (p.length < 2 || p.length > 3 || p.some((n) => Number.isNaN(n))) return;
  const [h, m, s] = p.length === 3 ? p : [0, p[0], p[1]];
  if (!h && !m && !s) return;
  return `PT${h ? `${h}H` : ""}${m}M${s}S`;
}