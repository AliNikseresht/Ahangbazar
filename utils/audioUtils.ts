import { supabase } from "../libs/supabase/supabaseClient";

export function getPublicAudioUrl(path: string) {
  const cleanPath = path.replace(/^music-files\//, "");
  const { data } = supabase.storage.from("music-files").getPublicUrl(cleanPath);
  return data?.publicUrl || "";
}
