import { supabase } from "./supabase";

export type Artist = {
  id: string;
  name: string;
  faName: string | null;
  bio: string | null;
  folderName: string | null;
  coverUrl: string | null;
};

export async function getArtists(limit = 12): Promise<Artist[]> {
  const { data, error } = await supabase
    .from("artists")
    .select("id, name, fa_name, bio, folder_name, cover_url")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getArtists error:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    faName: row.fa_name ?? null,
    bio: row.bio,
    folderName: row.folder_name,
    coverUrl: row.cover_url ?? null,
  }));
}
