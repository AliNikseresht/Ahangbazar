import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase/supabaseClient";
import { Track } from "@/types/tracksType";

interface SupabaseTrack {
  id: string;
  title: string;
  plays: number | null;
  duration: string | null;
  cover: string | null;
  file_path: string | null;
  // ممکن است آرایه یا یک آبجکت باشد
  artists?: { name: string } | { name: string }[];
}

export function useRecentTracks() {
  return useQuery<Track[]>({
    queryKey: ["recentTracks"],
    queryFn: async () => {
      const { data } = await supabase
        .from("songs")
        .select(`id, title, plays, duration, cover, file_path, artists(name)`)
        .order("created_at", { ascending: false })
        .limit(100);

      console.log(JSON.stringify(data, null, 2));

      return (
        data?.map((track: SupabaseTrack) => {
          const audioUrl = track.file_path
            ? supabase.storage.from("music-files").getPublicUrl(track.file_path)
                .data.publicUrl
            : undefined;

          // گرفتن اسم هنرمند به شکل امن
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
            cover: track.cover || "/images/default-cover.jpg",
            plays: track.plays || 0,
            audio: audioUrl,
          };
        }) || []
      );
    },
  });
}
