import { supabase } from "@/libs/supabase/supabaseClient";
import { Artist } from "@/types/artistType";

export async function fetchArtists(): Promise<Artist[]> {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data as Artist[];
}