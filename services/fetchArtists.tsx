import { supabase } from "@/libs/supabase/supabaseClient";
import { Artists } from "@/types/artists";

export const fetchArtists = async (): Promise<Artists[]> => {
  const { data, error } = await supabase
    .from("artists")
    .select("id, name, bio, photo_url, created_at, name_fa, slug");

  if (error) throw new Error(error.message);

  return data || [];
};
