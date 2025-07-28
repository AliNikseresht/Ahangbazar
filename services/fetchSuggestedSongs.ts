import { supabase } from "@/libs/supabase/supabaseClient";

export type SuggestedSong = {
  id: string;
  title: string;
  artist: string;
  created_at?: string;
};

export const fetchSuggestedSongs = async (): Promise<SuggestedSong[]> => {
  const { data, error } = await supabase
    .from("suggested_songs")
    .select("id, title, artist, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
};
