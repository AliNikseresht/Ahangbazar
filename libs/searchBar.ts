import { supabase } from "./supabase/supabaseClient";

interface SongFromDB {
  id: string;
  title: string;
  duration: string;
  cover_url: string;
  plays?: number;
  favorites: number;
  file_path: string;
  artist?: { name: string }[] | null;
}

export async function searchAll(query: string) {
  if (!query.trim()) return [];

  const { data, error } = await supabase
    .from("songs")
    .select(
      `
      id,
      title,
      duration,
      cover_url,
      plays,
      favorites,
      file_path,
      artist:artists(name)
    `
    )
    .ilike("title", `%${query}%`);

  if (error) {
    console.error("Search error:", error);
    return [];
  }

  return (
    data?.map((song: SongFromDB) => ({
      id: song.id,
      title: song.title,
      artist: song.artist?.[0]?.name || "ناشناس",
      cover: song.cover_url || "",
      duration: song.duration,
      plays: song.plays,
      favorites: song.favorites,
      audio: song.file_path
        ? song.file_path.startsWith("http")
          ? song.file_path
          : `https://qplnrrtqqytmbflqdpnb.supabase.co/storage/v1/object/public/music-files/${song.file_path
              .split("/")
              .map((part) => encodeURIComponent(part))
              .join("/")}`
        : "",
    })) || []
  );
}
