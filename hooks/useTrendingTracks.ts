import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase/supabaseClient";
import { Track } from "@/types/tracksType";
import appLogo from "@/public/ahangbazar-logo.png";

export function useTrendingTracks(limit = 5) {
  return useQuery<Track[], number>({
    queryKey: ["trendingTracks", limit],
    queryFn: async () => {
      const { data } = await supabase
        .from("songs")
        .select(
          `id, title, plays, duration, cover_url, file_path, favorites, artists(name)`
        )
        .order("plays", { ascending: false })
        .limit(limit);

      return (
        data?.map((track: any) => {
          const audioUrl = track.file_path
            ? supabase.storage.from("music-files").getPublicUrl(track.file_path)
                .data.publicUrl
            : undefined;

          return {
            id: track.id,
            title: track.title,
            artist: track.artists?.name,
            duration: track.duration || "0:00",
            cover: track.cover_url || appLogo.src,
            plays: track.plays || 0,
            audio: audioUrl,
            favorites: track.favorites ?? 0,
          };
        }) || []
      );
    },
  });
}
