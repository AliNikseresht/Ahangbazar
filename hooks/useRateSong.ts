import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase/supabaseClient";
import { Song } from "@/types/song";

export function useRateSong() {
  return useMutation({
    mutationFn: async ({ song, rating }: { song: Song; rating: number }) => {
      if (!song.title || !song.artist_id) {
        throw new Error("Song data is incomplete.");
      }

      const { data: artistData, error: artistError } = await supabase
        .from("artists")
        .select("name_fa")
        .eq("id", song.artist_id)
        .single();

      if (artistError || !artistData?.name_fa) {
        console.warn("Artist not found, using fallback name.");
      }

      const artistName = artistData?.name_fa || "ناشناس";

      const { data: existingSong, error: fetchError } = await supabase
        .from("suggested_songs")
        .select("*")
        .eq("artist_id", song.artist_id)
        .like("title", song.title)
        .maybeSingle();

      if (fetchError) {
        console.error("Fetch existingSong error:", fetchError);
      }

      let songId = existingSong?.id;

      if (!songId) {
        const { data: insertedSong, error: insertError } = await supabase
          .from("suggested_songs")
          .insert({
            title: song.title,
            artist: artistName,
            artist_id: song.artist_id,
          })
          .select()
          .single();

        if (insertError || !insertedSong) {
          console.error("Insert song failed", insertError);
          throw new Error("Failed to insert song");
        }

        songId = insertedSong.id;
      }

      const { error: ratingError } = await supabase
        .from("song_ratings")
        .insert({
          song_id: songId,
          rating,
          user_identifier: null,
        });

      if (ratingError) {
        throw new Error("Failed to submit rating");
      }

      return { songId };
    },
  });
}
