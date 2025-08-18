import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase/supabaseClient";
import { Track } from "@/types/tracksType";
import appLogo from "@/public/ahangbazar-logo.png";
import { SupabaseTrack } from "@/types/supabaseTrack";

export function useTrendingTracks(limit = 5) {
  return useQuery<Track[]>({
    queryKey: ["trendingTracks", limit],
    queryFn: async () => {
      const { data } = await supabase
        .from("songs")
        .select(
          `id, title, favorites, duration, cover_url, file_path, artists(name)`
        )
        .gt("favorites", 0)
        .order("favorites", { ascending: false })
        .limit(limit);

      return (
        data?.map((track: SupabaseTrack) => {
          const audioUrl = track.file_path
            ? supabase.storage.from("music-files").getPublicUrl(track.file_path)
                .data.publicUrl
            : undefined;

          const artistName = Array.isArray(track.artists)
            ? track.artists.map((a) => a.name).join(", ")
            : track.artists?.name || "";

          return {
            id: track.id,
            title: track.title,
            artist: artistName,
            duration: track.duration || "0:00",
            cover: track.cover_url || appLogo.src,
            favorites: track.favorites ?? 0,
            audio: audioUrl,
          };
        }) || []
      );
    },
  });
}
