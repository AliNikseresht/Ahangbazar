import { supabase } from "./supabase";

const STORAGE_BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/music-files`;

export type Track = {
  id: string;
  title: string;
  faTitle: string | null;
  artist: string;
  faArtist: string | null;
  art: string | null;
  audioUrl: string | null;
  time: string;
  plays: number;
  favorites: number;
};

function formatDuration(d: unknown): string {
  const n = Number(d);
  if (typeof d === "string" && d.includes(":")) return d;
  if (!Number.isFinite(n) || n <= 0) return "0:00";
  const m = Math.floor(n / 60);
  const s = Math.floor(n % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function toPublicAudioUrl(filePath: string | null): string | null {
  if (!filePath) return null;
  const encoded = filePath
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  return `${STORAGE_BASE}/${encoded}`;
}

export async function getTracks(limit = 200): Promise<Track[]> {
  const { data, error } = await supabase
    .from("songs")
    .select(
      `
      id,
      title,
      fa_title,
      duration,
      file_path,
      cover_url,
      plays,
      favorites,
      artists!artist_id (
        name,
        fa_name
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getTracks error:", JSON.stringify(error, null, 2));
    return [];
  }

  return (data ?? []).map((row: any) => {
    const artist = Array.isArray(row.artists) ? row.artists[0] : row.artists;

    return {
      id: row.id,
      title: row.title,
      faTitle: row.fa_title ?? null,
      artist: artist?.name ?? "Unknown",
      faArtist: artist?.fa_name ?? null,
      art: row.cover_url ?? null,
      audioUrl: toPublicAudioUrl(row.file_path),
      time: formatDuration(row.duration),
      plays: row.plays ?? 0,
      favorites: row.favorites ?? 0,
    };
  });
}
