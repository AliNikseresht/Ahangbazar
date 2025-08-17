import { useState, useEffect, useCallback } from "react";
import { Track } from "@/types/tracksType";
import { supabase } from "@/libs/supabase/supabaseClient";

export function useFavoriteTrack(track: Track) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(track.favorites > 0);
  }, [track]);

  const toggleFavorite = useCallback(async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    const currentFavorites = track.favorites ?? 0;

    try {
      const { error } = await supabase
        .from("songs")
        .update({
          favorites: newLikedState
            ? currentFavorites + 1
            : Math.max(currentFavorites - 1, 0),
        })
        .eq("id", track.id);

      if (error) setIsLiked(!newLikedState);
      else track.favorites = newLikedState ? currentFavorites + 1 : Math.max(currentFavorites - 1, 0);
    } catch {
      setIsLiked(!newLikedState);
    }
  }, [isLiked, track]);

  return { isLiked, toggleFavorite };
}
