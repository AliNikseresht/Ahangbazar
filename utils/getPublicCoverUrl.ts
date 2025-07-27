import { supabase } from "@/libs/supabase/supabaseClient";

export function getPublicCoverUrl(path?: string) {
  if (!path) return "/ahangbazar-logo.png";
  const cleanPath = path.replace(/^music-files\//, "");
  const { data } = supabase.storage.from("music-files").getPublicUrl(cleanPath);
  return data?.publicUrl || "/ahangbazar-logo.png";
}
