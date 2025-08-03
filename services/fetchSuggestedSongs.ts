import { supabase } from "@/libs/supabase/supabaseClient";
import { SuggestedSong } from "@/types/suggestedSong";

export const fetchSuggestedSongs = async (): Promise<SuggestedSong[]> => {
  const { data, error } = await supabase
    .from("suggested_songs")
    .select("id, title, artist, created_at, title_fa")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
};
