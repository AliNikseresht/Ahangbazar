import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase/supabaseClient";
import { Track } from "@/types/tracksType";
import appLogo from "@/public/ahangbazar-logo.png";

interface SupabaseTrack {
  id: string;
  title: string;
  plays: number | null;
  duration: string | null;
  cover_url: string | null;
  file_path: string | null;
  artists?: { name: string } | { name: string }[];
}

export function useRecentTracks() {
  return useQuery<Track[]>({
    queryKey: ["recentTracks"],
    queryFn: async () => {
      const { data } = await supabase
        .from("songs")
        .select(
          `id, title, plays, duration, cover_url, file_path, favorites, artists(name)`
        )
        .order("created_at", { ascending: false })
        .limit(100);

      return (
        data?.map((track: SupabaseTrack & { favorites?: number }) => {
          const audioUrl = track.file_path
            ? supabase.storage.from("music-files").getPublicUrl(track.file_path)
                .data.publicUrl
            : undefined;

          let artistName = "ناشناس";
          if (track.artists) {
            if (Array.isArray(track.artists)) {
              artistName = track.artists[0]?.name || "ناشناس";
            } else {
              artistName = track.artists.name;
            }
          }

          return {
            id: track.id,
            title: track.title,
            artist: artistName,
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
